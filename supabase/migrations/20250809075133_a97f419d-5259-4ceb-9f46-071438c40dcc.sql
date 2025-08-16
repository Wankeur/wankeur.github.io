-- Ensure trigger to auto-create profiles on new auth users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- Backfill profiles for existing users without a profile
INSERT INTO public.profiles (user_id, email, first_name, last_name)
SELECT 
  u.id,
  u.email,
  COALESCE(
    u.raw_user_meta_data ->> 'first_name',
    u.raw_user_meta_data ->> 'given_name',
    CASE 
      WHEN COALESCE(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', '') <> '' THEN
        split_part(COALESCE(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name'), ' ', 1)
      ELSE split_part(u.email, '@', 1)
    END
  ) AS first_name,
  COALESCE(
    u.raw_user_meta_data ->> 'last_name',
    u.raw_user_meta_data ->> 'family_name',
    CASE 
      WHEN COALESCE(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', '') <> ''
        AND position(' ' in COALESCE(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name')) > 0
      THEN substring(
        COALESCE(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name')
        from position(' ' in COALESCE(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name')) + 1
      )
      ELSE ''
    END
  ) AS last_name
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
WHERE p.user_id IS NULL;

-- Policy: allow public to read names of commenters on approved projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE polname = 'Public can view profiles of comment authors on approved projects' 
      AND schemaname = 'public' AND tablename = 'profiles'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Public can view profiles of comment authors on approved projects"
      ON public.profiles
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1
          FROM public.comments c
          JOIN public.projects pr ON pr.id = c.project_id
          WHERE c.user_id = profiles.user_id
            AND pr.status = 'approved'
        )
      );
    $$;
  END IF;
END $$;
