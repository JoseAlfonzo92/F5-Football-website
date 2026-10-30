
BEGIN;



-- 1. Add a permanent soft-delete marker.
ALTER TABLE public.teams
ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

-- 2. Private authorization table used to ensure deleted_at can
-- only be set through the authorized RPC.
CREATE TABLE IF NOT EXISTS public.team_deletion_authorizations (
    team_id uuid PRIMARY KEY
        REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id uuid NOT NULL,
    authorized_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.team_deletion_authorizations
ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.team_deletion_authorizations
FROM PUBLIC, anon, authenticated;

-- 3. Guard the deleted_at transition.
CREATE OR REPLACE FUNCTION public.guard_team_deleted_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
    IF OLD.deleted_at IS DISTINCT FROM NEW.deleted_at THEN
        -- Deletion is one-way: never clear deleted_at.
        IF OLD.deleted_at IS NOT NULL OR NEW.deleted_at IS NULL THEN
            RAISE EXCEPTION 'A deleted team cannot be restored';
        END IF;

        IF (SELECT auth.uid()) IS NULL
           OR NOT EXISTS (
                SELECT 1
                FROM public.team_deletion_authorizations AS authz
                WHERE authz.team_id = OLD.id
                  AND authz.user_id = (SELECT auth.uid())
           )
           OR NOT EXISTS (
                SELECT 1
                FROM public.team_members AS tm
                WHERE tm.team_id = OLD.id
                  AND tm.user_id = (SELECT auth.uid())
                  AND tm.role = 'captain'
           )
        THEN
            RAISE EXCEPTION
                'Team deletion must be authorized by its current captain';
        END IF;

        IF NEW.is_active IS DISTINCT FROM false THEN
            RAISE EXCEPTION 'A deleted team must be inactive';
        END IF;
    END IF;

    -- A deleted team must never become active again.
    IF OLD.deleted_at IS NOT NULL
       AND NEW.is_active IS DISTINCT FROM false THEN
        RAISE EXCEPTION 'A deleted team cannot be reactivated';
    END IF;

    RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS guard_team_deleted_status_trigger
ON public.teams;

CREATE TRIGGER guard_team_deleted_status_trigger
BEFORE UPDATE OF deleted_at, is_active
ON public.teams
FOR EACH ROW
EXECUTE FUNCTION public.guard_team_deleted_status();


CREATE OR REPLACE FUNCTION public.reactivate_team(p_team_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
    v_user_id uuid := (SELECT auth.uid());
    v_deleted_at timestamptz;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required';
    END IF;

    SELECT t.deleted_at
    INTO v_deleted_at
    FROM public.teams AS t
    WHERE t.id = p_team_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Team not found';
    END IF;

    IF v_deleted_at IS NOT NULL THEN
        RAISE EXCEPTION 'A deleted team cannot be reactivated';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM public.team_members AS tm
        WHERE tm.team_id = p_team_id
          AND tm.user_id = v_user_id
          AND tm.role = 'captain'
    ) THEN
        RAISE EXCEPTION
            'Only the team captain can reactivate this team';
    END IF;

    INSERT INTO public.team_reactivation_authorizations (
        team_id,
        user_id
    )
    VALUES (p_team_id, v_user_id)
    ON CONFLICT (team_id)
    DO UPDATE SET
        user_id = EXCLUDED.user_id,
        authorized_at = now();

    UPDATE public.teams
    SET is_active = true
    WHERE id = p_team_id
      AND is_active = false;

    DELETE FROM public.team_reactivation_authorizations
    WHERE team_id = p_team_id
      AND user_id = v_user_id;
END;
$function$;


-- 4. Extend the existing activity guard so that deleted teams
-- are treated as inactive, including when a new row is inserted.
CREATE OR REPLACE FUNCTION public.require_active_teams_for_new_activity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
DECLARE
    v_team_id uuid;
    v_is_active boolean;
    v_team_ids uuid[] := ARRAY[]::uuid[];
BEGIN
    IF TG_TABLE_NAME IN (
        'team_members',
        'team_invitations',
        'team_availability',
        'team_schedules'
    ) THEN
        v_team_ids := ARRAY[
            (to_jsonb(NEW)->>'team_id')::uuid
        ];

    ELSIF TG_TABLE_NAME = 'team_challenges' THEN
        v_team_ids := ARRAY[
            (to_jsonb(NEW)->>'challenger_team_id')::uuid,
            (to_jsonb(NEW)->>'challenged_team_id')::uuid
        ];

    ELSIF TG_TABLE_NAME = 'matches' THEN
        v_team_ids := ARRAY[
            (to_jsonb(NEW)->>'team_a_id')::uuid,
            (to_jsonb(NEW)->>'team_b_id')::uuid
        ];

    ELSIF TG_TABLE_NAME = 'team_matches' THEN
        v_team_ids := ARRAY[
            (to_jsonb(NEW)->>'home_team_id')::uuid,
            (to_jsonb(NEW)->>'away_team_id')::uuid
        ];

    ELSIF TG_TABLE_NAME = 'field_requests' THEN
        IF to_jsonb(NEW)->>'team_id' IS NULL THEN
            RETURN NEW;
        END IF;

        v_team_ids := ARRAY[
            (to_jsonb(NEW)->>'team_id')::uuid
        ];
    END IF;

    -- Preserve existing match editing for scorekeeping/history.
    IF TG_OP = 'UPDATE'
       AND TG_TABLE_NAME IN ('matches', 'team_matches') THEN
        RETURN NEW;
    END IF;

    -- Allow existing invitations to be rejected/cancelled.
    IF TG_OP = 'UPDATE'
       AND TG_TABLE_NAME = 'team_invitations' THEN
        RETURN NEW;
    END IF;



    -- Allow challenge rejection/cancellation. Check teams when
    -- a challenge transitions to accepted.
    IF TG_OP = 'UPDATE'
       AND TG_TABLE_NAME = 'team_challenges'
       AND NOT (
           NEW.status = 'accepted'
           AND OLD.status IS DISTINCT FROM 'accepted'
       ) THEN
        RETURN NEW;
    END IF;

    -- Keep the existing optimization for unchanged rows.
    IF TG_OP = 'UPDATE'
       AND TG_TABLE_NAME NOT IN ('team_challenges') THEN
        IF to_jsonb(NEW) - 'updated_at'
           = to_jsonb(OLD) - 'updated_at' THEN
            RETURN NEW;
        END IF;
    END IF;

    FOR v_team_id IN
        SELECT DISTINCT x
        FROM unnest(v_team_ids) AS x
        WHERE x IS NOT NULL
        ORDER BY x
    LOOP
        SELECT t.is_active AND t.deleted_at IS NULL
        INTO v_is_active
        FROM public.teams AS t
        WHERE t.id = v_team_id
        FOR SHARE;

        IF NOT FOUND OR v_is_active IS DISTINCT FROM true THEN
            RAISE EXCEPTION
                'This activity cannot involve an inactive, deleted, or missing team';
        END IF;
    END LOOP;

    RETURN NEW;
END;
$function$;

-- 5. RPC for permanent team deletion.
CREATE OR REPLACE FUNCTION public.delete_team(p_team_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
    v_user_id uuid := (SELECT auth.uid());
    v_deleted_at timestamptz := now();
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required';
    END IF;

    -- Lock the team row so concurrent activity/deletion cannot
    -- silently race past the deletion operation.
    PERFORM 1
    FROM public.teams AS t
    WHERE t.id = p_team_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Team not found';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM public.team_members AS tm
        WHERE tm.team_id = p_team_id
          AND tm.user_id = v_user_id
          AND tm.role = 'captain'
    ) THEN
        RAISE EXCEPTION 'Only the current team captain can delete this team';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM public.teams AS t
        WHERE t.id = p_team_id
          AND t.deleted_at IS NOT NULL
    ) THEN
        RAISE EXCEPTION 'Team has already been deleted';
    END IF;

    INSERT INTO public.team_deletion_authorizations (team_id, user_id)
    VALUES (p_team_id, v_user_id)
    ON CONFLICT (team_id)
    DO UPDATE SET
        user_id = EXCLUDED.user_id,
        authorized_at = now();

    UPDATE public.teams
    SET deleted_at = v_deleted_at,
        is_active = false
    WHERE id = p_team_id;

    DELETE FROM public.team_deletion_authorizations
    WHERE team_id = p_team_id
      AND user_id = v_user_id;

    -- Cancel pending operational records; retain completed history.
    UPDATE public.team_challenges
    SET status = 'cancelled',
        cancelled_at = COALESCE(cancelled_at, v_deleted_at),
        cancelled_by = v_user_id,
        responded_at = COALESCE(responded_at, v_deleted_at)
    WHERE status = 'pending'
      AND (
          challenger_team_id = p_team_id
          OR challenged_team_id = p_team_id
      );

    UPDATE public.team_invitations
    SET status = 'cancelled',
        responded_at = COALESCE(responded_at, v_deleted_at)
    WHERE team_id = p_team_id
      AND status = 'pending';

    UPDATE public.field_requests
    SET status = 'cancelled',
        responded_at = COALESCE(responded_at, v_deleted_at)
    WHERE team_id = p_team_id
      AND status = 'pending';

    UPDATE public.team_availability
    SET status = 'cancelled'
    WHERE team_id = p_team_id
      AND status IN ('available', 'pending');

    -- Cancel scheduled matches; don't delete their records.
    UPDATE public.team_matches
    SET status = 'cancelled'
    WHERE status = 'scheduled'
      AND (
          home_team_id = p_team_id
          OR away_team_id = p_team_id
      );

    UPDATE public.matches
    SET status = 'cancelled'
    WHERE status IN ('scheduled', 'confirmed')
      AND (
          team_a_id = p_team_id
          OR team_b_id = p_team_id
      );
END;
$function$;

-- 6. Remove direct physical-delete permission/policy.
DROP POLICY IF EXISTS "Team creators can delete their teams"
ON public.teams;

REVOKE DELETE ON TABLE public.teams
FROM anon, authenticated;


DROP POLICY IF EXISTS "Team creators can update their teams"
ON public.teams;

CREATE POLICY "Team creators can update their teams"
ON public.teams
FOR UPDATE
TO authenticated
USING (
    auth.uid() = created_by
    AND deleted_at IS NULL
)
WITH CHECK (
    auth.uid() = created_by
    AND deleted_at IS NULL
);


DROP POLICY IF EXISTS "Users can create teams"
ON public.teams;

CREATE POLICY "Users can create teams"
ON public.teams
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = created_by
    AND deleted_at IS NULL
);



-- Restrict RPC execution to authenticated callers.
REVOKE ALL ON FUNCTION public.delete_team(uuid)
FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.delete_team(uuid)
TO authenticated;

COMMIT;
