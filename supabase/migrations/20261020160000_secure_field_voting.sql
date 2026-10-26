
-- Fulsap: secure field voting
-- LOCAL DRAFT ONLY — review before applying to Supabase.
-- Implements a rolling limit of 10 accepted requests per identifier
-- in any 10-minute window.

BEGIN;

-- 1. Private storage for individual rate-limit events.
CREATE SCHEMA IF NOT EXISTS private;

REVOKE ALL ON SCHEMA private
    FROM PUBLIC, anon, authenticated, service_role;

CREATE TABLE IF NOT EXISTS private.field_vote_rate_limits (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    key_hash text NOT NULL,
    requested_at timestamptz NOT NULL,
    CONSTRAINT field_vote_rate_limits_hash_format
        CHECK (key_hash ~ '^[a-f0-9]{64}$')
);

CREATE INDEX IF NOT EXISTS field_vote_rate_limits_key_time_idx
ON private.field_vote_rate_limits (key_hash, requested_at);

CREATE INDEX IF NOT EXISTS field_vote_rate_limits_time_idx
ON private.field_vote_rate_limits (requested_at);

REVOKE ALL ON TABLE private.field_vote_rate_limits
FROM PUBLIC, anon, authenticated, service_role;


-- 2. Atomically enforce a rolling 10-request / 10-minute limit.
-- The Edge Function must generate the HMAC-SHA256 key.
CREATE OR REPLACE FUNCTION public.consume_field_vote_rate_limit(
    p_key_hash text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
    v_now timestamptz;
    v_request_count integer;
    v_oldest_request timestamptz;
    v_retry_after_seconds integer;
BEGIN
    IF p_key_hash IS NULL
       OR p_key_hash !~ '^[a-f0-9]{64}$' THEN
        RAISE EXCEPTION 'Invalid rate-limit key';
    END IF;

    IF pg_catalog.current_setting('transaction_isolation')
   <> 'read committed' THEN
    RAISE EXCEPTION
        'Rate limiter requires READ COMMITTED isolation';
    END IF;

    -- Serialize requests using the same identifier.
    PERFORM pg_catalog.pg_advisory_xact_lock(
        pg_catalog.hashtextextended(p_key_hash, 0)
    );

    v_now := pg_catalog.clock_timestamp();

    -- Count accepted requests in the preceding 10 minutes.
    SELECT
        COUNT(*)::integer,
        MIN(requested_at)
    INTO
        v_request_count,
        v_oldest_request
    FROM private.field_vote_rate_limits
    WHERE key_hash = p_key_hash
      AND requested_at > v_now - INTERVAL '10 minutes';

    -- Reject without adding another event.
    IF v_request_count >= 10 THEN
        v_retry_after_seconds := GREATEST(
            1,
            CEIL(
                EXTRACT(
                    EPOCH FROM (
                        v_oldest_request
                        + INTERVAL '10 minutes'
                        - v_now
                    )
                )
            )::integer
        );

        RETURN pg_catalog.jsonb_build_object(
            'allowed', false,
            'request_count', v_request_count,
            'retry_after_seconds', v_retry_after_seconds
        );
    END IF;

    -- Record only requests allowed by the limiter.
    INSERT INTO private.field_vote_rate_limits (
        key_hash,
        requested_at
    )
    VALUES (
        p_key_hash,
        v_now
    );

    RETURN pg_catalog.jsonb_build_object(
        'allowed', true,
        'request_count', v_request_count + 1,
        'retry_after_seconds', 0
    );
END;
$function$;

REVOKE ALL ON FUNCTION
    public.consume_field_vote_rate_limit(text)
FROM PUBLIC, anon, authenticated, service_role;

GRANT EXECUTE ON FUNCTION
    public.consume_field_vote_rate_limit(text)
TO service_role;




CREATE OR REPLACE FUNCTION public.cleanup_field_vote_rate_limits()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
    v_keys text[];
    v_key text;
    v_deleted integer := 0;
    v_batch_deleted integer;
BEGIN
    IF pg_catalog.current_setting('transaction_isolation')
       <> 'read committed' THEN
        RAISE EXCEPTION
            'Rate limiter cleanup requires READ COMMITTED isolation';
    END IF;

    -- Discover up to 500 candidate keys without row locks.
    -- Order by the advisory-lock key, then by key_hash.
    SELECT pg_catalog.array_agg(
        candidates.key_hash
        ORDER BY
            pg_catalog.hashtextextended(candidates.key_hash, 0),
            candidates.key_hash
    )
    INTO v_keys
    FROM (
    SELECT distinct_keys.key_hash
    FROM (
        SELECT limits.key_hash
        FROM private.field_vote_rate_limits AS limits
        WHERE limits.requested_at
            <= pg_catalog.clock_timestamp() - INTERVAL '10 minutes'
        GROUP BY limits.key_hash
    ) AS distinct_keys
    ORDER BY
        pg_catalog.hashtextextended(distinct_keys.key_hash, 0),
        distinct_keys.key_hash
    LIMIT 500
) AS candidates;

    -- Acquire all advisory locks before deleting any rows.
    FOREACH v_key IN ARRAY
        COALESCE(v_keys, ARRAY[]::text[])
    LOOP
        PERFORM pg_catalog.pg_advisory_xact_lock(
            pg_catalog.hashtextextended(v_key, 0)
        );
    END LOOP;

    -- Recheck expiry after the lock waits.
    -- Never delete more than 500 rows in this invocation.
    FOREACH v_key IN ARRAY
        COALESCE(v_keys, ARRAY[]::text[])
    LOOP
        EXIT WHEN v_deleted >= 500;

        WITH expired AS (
            SELECT limits.id
            FROM private.field_vote_rate_limits AS limits
            WHERE limits.key_hash = v_key
              AND limits.requested_at
                  <= pg_catalog.clock_timestamp()
                     - INTERVAL '10 minutes'
            ORDER BY limits.requested_at, limits.id
            LIMIT (500 - v_deleted)
        )
        DELETE FROM private.field_vote_rate_limits AS limits
        USING expired
        WHERE limits.id = expired.id;

        GET DIAGNOSTICS v_batch_deleted = ROW_COUNT;
        v_deleted := v_deleted + v_batch_deleted;
    END LOOP;

    RETURN v_deleted;
END;
$function$;


REVOKE ALL ON FUNCTION public.cleanup_field_vote_rate_limits()
    FROM PUBLIC, anon, authenticated, service_role;

GRANT EXECUTE ON FUNCTION public.cleanup_field_vote_rate_limits()
    TO service_role;





-- Prevent browser clients from accessing vote records directly.
REVOKE ALL PRIVILEGES ON TABLE public.field_votes
FROM PUBLIC, anon, authenticated;

REVOKE ALL PRIVILEGES (
    id,
    created_at,
    field_id,
    fingerprint,
    rating,
    last_updated,
    update_count
) ON TABLE public.field_votes
FROM PUBLIC, anon, authenticated;

-- Remove permissive public policies that allowed direct access.
DROP POLICY IF EXISTS "Allow vote inserts"
ON public.field_votes;

DROP POLICY IF EXISTS "Allow vote reads"
ON public.field_votes;

DROP POLICY IF EXISTS "Allow vote updates"
ON public.field_votes;



COMMIT;