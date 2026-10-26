
-- Fulsap production security migration — REVIEW DRAFT
-- Target: Supabase PostgreSQL
--
-- Implements:
--   1. Submission moderation audit columns and field relationship.
--   2. Super-admin-only payment verification, approval, rejection.
--   3. Database guard: active fields require an approved, paid submission.
--   4. Restrict direct INSERT/UPDATE privileges.
--   5. Admin read access to all submissions.
--
-- IMPORTANT:
--   - Review before executing.
--   - Existing active fields without a matching approved and
--     verified submission will be deactivated.
--   - The admin UUID below is the verified UUID supplied for
--     the Zonofal super-admin account.
--   - This does not build the admin UI.

BEGIN;

-- ============================================================
-- 1. Add moderation audit columns and submission-to-field link.
-- ============================================================

ALTER TABLE public.field_submissions
    ADD COLUMN reviewed_by uuid
        REFERENCES public.profiles(id) ON DELETE SET NULL,
    ADD COLUMN payment_verified_by uuid
        REFERENCES public.profiles(id) ON DELETE SET NULL,
    ADD COLUMN field_id text;

ALTER TABLE public.field_submissions
    ADD CONSTRAINT field_submissions_field_id_fkey
        FOREIGN KEY (field_id)
        REFERENCES public.fields(id)
        ON DELETE SET NULL;

ALTER TABLE public.field_submissions
    ADD CONSTRAINT field_submissions_field_id_unique
        UNIQUE (field_id);


-- ============================================================
-- 2. Admin-only read access to submissions.
--    Existing submitter SELECT policy remains in place.
-- ============================================================

CREATE POLICY "Super-admin can view all field submissions"
ON public.field_submissions
FOR SELECT
TO authenticated
USING (
    (SELECT auth.uid()) =
    'adc8b099-152c-4153-9f48-e09c8dacccd6'::uuid
);


-- ============================================================
-- 3. Restrict direct INSERT on field_submissions.
--    Remove every existing per-column INSERT grant for
--    authenticated, revoke table-level INSERT, then grant
--    only the columns sent by addFieldForm.js.
-- ============================================================

DO $$
DECLARE
    col record;
BEGIN
    FOR col IN
        SELECT a.attname
        FROM pg_attribute AS a
        WHERE a.attrelid = 'public.field_submissions'::regclass
          AND a.attnum > 0
          AND NOT a.attisdropped
    LOOP
        EXECUTE format(
            'REVOKE INSERT (%I) ON TABLE public.field_submissions FROM authenticated',
            col.attname
        );
    END LOOP;
END;
$$;

REVOKE INSERT ON TABLE public.field_submissions FROM authenticated;

GRANT INSERT (
    submitted_by,
    name,
    whatsapp,
    province,
    city,
    zone,
    address,
    latitude,
    longitude,
    type,
    description,
    price_from,
    price_to,
    sizes,
    allowed_boots,
    surface,
    week_schedule,
    weekend_schedule,
    features,
    cook_type,
    grill_fee,
    cook_service_fee,
    barbecue_notes,
    buffet,
    available_jerseys,
    extra_info,
    image_urls
)
ON TABLE public.field_submissions
TO authenticated;


-- ============================================================
-- 4. Restrict direct UPDATE on fields.
--    Owners retain access to the 21 columns used by editField.js.
-- ============================================================

DO $$
DECLARE
    col record;
BEGIN
    FOR col IN
        SELECT a.attname
        FROM pg_attribute AS a
        WHERE a.attrelid = 'public.fields'::regclass
          AND a.attnum > 0
          AND NOT a.attisdropped
    LOOP
        EXECUTE format(
            'REVOKE UPDATE (%I) ON TABLE public.fields FROM authenticated',
            col.attname
        );
    END LOOP;
END;
$$;

REVOKE UPDATE ON TABLE public.fields FROM authenticated;

GRANT UPDATE (
    name,
    description,
    address,
    city,
    province,
    zone,
    phone,
    whatsapp,
    price_from,
    price_to,
    type,
    surface,
    sizes,
    features,
    extra_info,
    barbecue_cook_type,
    grill_available,
    cook_service_available,
    grill_fee,
    cook_service_fee,
    barbecue_notes
)
ON TABLE public.fields
TO authenticated;


-- ============================================================
-- 5. Publication guard.
--    Any new activation must have a linked submission that is
--    both approved and payment-verified.
-- ============================================================

CREATE OR REPLACE FUNCTION public.guard_field_publication()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
BEGIN
    IF NEW.is_active IS TRUE THEN
        IF NOT EXISTS (
            SELECT 1
            FROM public.field_submissions AS s
            WHERE s.field_id = NEW.id
              AND s.status IS NOT DISTINCT FROM 'approved'
              AND s.payment_status IS NOT DISTINCT FROM 'verified'
              AND s.payment_verified_at IS NOT NULL
              AND s.payment_verified_by IS NOT NULL
        ) THEN
            RAISE EXCEPTION
                'A field cannot be activated without an approved, payment-verified submission'
                USING ERRCODE = '23514';
        END IF;
    END IF;

    RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.guard_field_publication()
FROM PUBLIC, anon, authenticated, service_role;

CREATE TRIGGER fields_publication_guard
BEFORE INSERT OR UPDATE OF is_active
ON public.fields
FOR EACH ROW
EXECUTE FUNCTION public.guard_field_publication();



-- Keep publication synchronized if a linked submission changes.
-- A field is deactivated if its submission no longer qualifies.

CREATE OR REPLACE FUNCTION public.sync_field_publication_with_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
BEGIN
    IF OLD.field_id IS NOT NULL
       AND (
           NEW.field_id IS DISTINCT FROM OLD.field_id
           OR NEW.status IS DISTINCT FROM 'approved'
           OR NEW.payment_status IS DISTINCT FROM 'verified'
           OR NEW.payment_verified_at IS NULL
           OR NEW.payment_verified_by IS NULL
       ) THEN
        UPDATE public.fields
        SET is_active = false
        WHERE id = OLD.field_id
          AND is_active IS TRUE;
    END IF;

    IF NEW.field_id IS NOT NULL
       AND NEW.field_id IS DISTINCT FROM OLD.field_id
       AND (
           NEW.status IS DISTINCT FROM 'approved'
           OR NEW.payment_status IS DISTINCT FROM 'verified'
           OR NEW.payment_verified_at IS NULL
           OR NEW.payment_verified_by IS NULL
       ) THEN
        UPDATE public.fields
        SET is_active = false
        WHERE id = NEW.field_id
          AND is_active IS TRUE;
    END IF;

    RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.sync_field_publication_with_submission()
FROM PUBLIC, anon, authenticated, service_role;

CREATE TRIGGER field_submission_publication_sync
BEFORE UPDATE OF
    status,
    payment_status,
    payment_verified_at,
    payment_verified_by,
    field_id
ON public.field_submissions
FOR EACH ROW
EXECUTE FUNCTION public.sync_field_publication_with_submission();


CREATE OR REPLACE FUNCTION public.deactivate_field_after_submission_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
BEGIN
    IF OLD.field_id IS NOT NULL THEN
        UPDATE public.fields
        SET is_active = false
        WHERE id = OLD.field_id
          AND is_active IS TRUE;
    END IF;

    RETURN OLD;
END;
$function$;

REVOKE ALL ON FUNCTION public.deactivate_field_after_submission_delete()
FROM PUBLIC, anon, authenticated, service_role;

CREATE TRIGGER field_submission_delete_publication_sync
AFTER DELETE ON public.field_submissions
FOR EACH ROW
EXECUTE FUNCTION public.deactivate_field_after_submission_delete();




-- ============================================================
-- 6. Payment verification — super-admin only.
-- ============================================================

CREATE OR REPLACE FUNCTION public.verify_field_submission_payment(
    p_submission_id uuid,
    p_payment_method text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
DECLARE
    v_submission public.field_submissions%ROWTYPE;
    v_method text;
BEGIN
    IF (SELECT auth.uid()) IS DISTINCT FROM
       'adc8b099-152c-4153-9f48-e09c8dacccd6'::uuid THEN
        RAISE EXCEPTION 'Not authorized'
            USING ERRCODE = '42501';
    END IF;

    v_method := NULLIF(btrim(p_payment_method), '');

    IF v_method IS NULL THEN
        RAISE EXCEPTION 'Payment method is required'
            USING ERRCODE = '22023';
    END IF;

    SELECT *
    INTO v_submission
    FROM public.field_submissions
    WHERE id = p_submission_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Field submission not found'
            USING ERRCODE = 'P0002';
    END IF;

    IF v_submission.status IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'Only pending submissions can have payment verified';
    END IF;

    IF v_submission.payment_status IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'Payment is not in pending status';
    END IF;

    UPDATE public.field_submissions
    SET
        payment_status = 'verified',
        payment_method = v_method,
        payment_verified_at = now(),
        payment_verified_by = (SELECT auth.uid())
    WHERE id = p_submission_id;

    RETURN 'verified';
END;
$function$;


-- ============================================================
-- 7. Approval — super-admin only, payment must be verified.
--    The field is created inactive first. The submission is
--    linked and approved, and only then is the field activated.
-- ============================================================

CREATE OR REPLACE FUNCTION public.approve_field_submission(
    p_submission_id uuid
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
DECLARE
    v_submission public.field_submissions%ROWTYPE;
    v_slug text;
    v_candidate_id text;
    v_field_id text;
    v_attempt integer;
BEGIN
    IF (SELECT auth.uid()) IS DISTINCT FROM
       'adc8b099-152c-4153-9f48-e09c8dacccd6'::uuid THEN
        RAISE EXCEPTION 'Not authorized'
            USING ERRCODE = '42501';
    END IF;

    SELECT *
    INTO v_submission
    FROM public.field_submissions
    WHERE id = p_submission_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Field submission not found'
            USING ERRCODE = 'P0002';
    END IF;

    IF v_submission.status IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'Only pending submissions can be approved';
    END IF;

    IF v_submission.payment_status IS DISTINCT FROM 'verified'
       OR v_submission.payment_verified_at IS NULL
       OR v_submission.payment_verified_by IS NULL THEN
        RAISE EXCEPTION 'Payment must be verified by an administrator before approval';
    END IF;

    IF v_submission.submitted_by IS NULL THEN
        RAISE EXCEPTION 'This submission has no registered owner account';
    END IF;

    v_slug := lower(
        regexp_replace(
            v_submission.name,
            '[^a-zA-Z0-9]+',
            '-',
            'g'
        )
    );

    IF v_slug IS NULL OR v_slug = '' THEN
        v_slug := 'field-' || substring(v_submission.id::text, 1, 8);
    END IF;

    -- Try the original slug, then a submission-specific fallback.
    -- The primary key handles collisions between concurrent requests.
    FOR v_attempt IN 1..2 LOOP
        IF v_attempt = 1 THEN
            v_candidate_id := v_slug;
        ELSE
            v_candidate_id :=
                v_slug || '-' || substring(v_submission.id::text, 1, 8);
        END IF;

        v_field_id := NULL;

        INSERT INTO public.fields (
            id,
            name,
            description,
            location,
            province,
            city,
            zone,
            address,
            type,
            price_from,
            price_to,
            latitude,
            longitude,
            image_url,
            images,
            allowed_boots,
            features,
            sizes,
            surface,
            buffet,
            extra_info,
            barbecue_cook_type,
            grill_available,
            cook_service_available,
            grill_fee,
            cook_service_fee,
            barbecue_notes,
            phone,
            whatsapp,
            is_active,
            owner_id
        )
        VALUES (
            v_candidate_id,
            v_submission.name,
            v_submission.description,
            v_submission.address,
            v_submission.province,
            v_submission.city,
            v_submission.zone,
            v_submission.address,
            v_submission.type,
            v_submission.price_from,
            v_submission.price_to,
            v_submission.latitude,
            v_submission.longitude,
            CASE
                WHEN v_submission.image_urls IS NOT NULL
                     AND cardinality(v_submission.image_urls) > 0
                THEN v_submission.image_urls[1]
                ELSE NULL
            END,
            COALESCE(v_submission.image_urls, '{}'::text[]),
            COALESCE(v_submission.allowed_boots, '{}'::text[]),
            COALESCE(v_submission.features, '{}'::text[]),
            COALESCE(v_submission.sizes, '{}'::text[]),
            COALESCE(v_submission.surface, '{}'::text[]),
            COALESCE(v_submission.buffet, '{}'::text[]),
            COALESCE(v_submission.extra_info, '{}'::text[]),
            COALESCE(v_submission.cook_type, 'none'),
            COALESCE(v_submission.cook_type, 'none') <> 'none',
            COALESCE(v_submission.cook_service_fee, 0) > 0,
            COALESCE(v_submission.grill_fee, 0),
            COALESCE(v_submission.cook_service_fee, 0),
            COALESCE(v_submission.barbecue_notes, '{}'::text[]),
            v_submission.whatsapp,
            v_submission.whatsapp,
            false,
            v_submission.submitted_by
        )
        ON CONFLICT (id) DO NOTHING
        RETURNING id INTO v_field_id;

        EXIT WHEN v_field_id IS NOT NULL;
    END LOOP;

    IF v_field_id IS NULL THEN
        RAISE EXCEPTION 'Could not generate a unique field ID';
    END IF;

    UPDATE public.field_submissions
    SET
        status = 'approved',
        reviewed_at = now(),
        reviewed_by = (SELECT auth.uid()),
        field_id = v_field_id,
        rejection_reason = NULL
    WHERE id = p_submission_id;

    -- The publication trigger now sees the approved, verified
    -- submission linked to this field.
    UPDATE public.fields
    SET is_active = true
    WHERE id = v_field_id;

    RETURN v_field_id;
END;
$function$;


-- ============================================================
-- 8. Rejection — super-admin only.
-- ============================================================

CREATE OR REPLACE FUNCTION public.reject_field_submission(
    p_submission_id uuid,
    p_reason text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
DECLARE
    v_submission public.field_submissions%ROWTYPE;
    v_reason text;
BEGIN
    IF (SELECT auth.uid()) IS DISTINCT FROM
       'adc8b099-152c-4153-9f48-e09c8dacccd6'::uuid THEN
        RAISE EXCEPTION 'Not authorized'
            USING ERRCODE = '42501';
    END IF;

    v_reason := NULLIF(btrim(p_reason), '');

    IF v_reason IS NULL THEN
        RAISE EXCEPTION 'A rejection reason is required'
            USING ERRCODE = '22023';
    END IF;

    SELECT *
    INTO v_submission
    FROM public.field_submissions
    WHERE id = p_submission_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Field submission not found'
            USING ERRCODE = 'P0002';
    END IF;

    IF v_submission.status IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'Only pending submissions can be rejected';
    END IF;

    UPDATE public.field_submissions
    SET
        status = 'rejected',
        rejection_reason = v_reason,
        reviewed_at = now(),
        reviewed_by = (SELECT auth.uid())
    WHERE id = p_submission_id;

    RETURN 'rejected';
END;
$function$;


-- ============================================================
-- 9. Function execution permissions.
--    Authenticated sessions can call the functions, but each
--    function independently checks the super-admin UUID.
-- ============================================================

REVOKE ALL ON FUNCTION public.verify_field_submission_payment(uuid, text)
FROM PUBLIC, anon, authenticated, service_role;

REVOKE ALL ON FUNCTION public.approve_field_submission(uuid)
FROM PUBLIC, anon, authenticated, service_role;

REVOKE ALL ON FUNCTION public.reject_field_submission(uuid, text)
FROM PUBLIC, anon, authenticated, service_role;

GRANT EXECUTE ON FUNCTION public.verify_field_submission_payment(uuid, text)
TO authenticated;

GRANT EXECUTE ON FUNCTION public.approve_field_submission(uuid)
TO authenticated;

GRANT EXECUTE ON FUNCTION public.reject_field_submission(uuid, text)
TO authenticated;


-- ============================================================
-- 10. Deactivate existing fields without a qualifying submission.
--     Existing records are test data; they must not bypass the
--     new publication guard merely because they predate it.
-- ============================================================

UPDATE public.fields AS f
SET is_active = false
WHERE f.is_active IS TRUE
  AND NOT EXISTS (
      SELECT 1
      FROM public.field_submissions AS s
      WHERE s.field_id = f.id
        AND s.status IS NOT DISTINCT FROM 'approved'
        AND s.payment_status IS NOT DISTINCT FROM 'verified'
        AND s.payment_verified_at IS NOT NULL
        AND s.payment_verified_by IS NOT NULL
  );

COMMIT;
