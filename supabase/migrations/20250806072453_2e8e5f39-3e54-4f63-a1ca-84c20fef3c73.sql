-- Update the handle_new_user function to better handle Google auth data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Handle Google auth: extract names from full_name if first_name/last_name are not provided
  DECLARE
    extracted_first_name text;
    extracted_last_name text;
    full_name text;
  BEGIN
    -- Try to get first_name and last_name from user metadata
    extracted_first_name := COALESCE(NEW.raw_user_meta_data ->> 'first_name', '');
    extracted_last_name := COALESCE(NEW.raw_user_meta_data ->> 'last_name', '');
    
    -- If first_name is empty but we have a full_name (common with Google auth)
    IF extracted_first_name = '' AND NEW.raw_user_meta_data ->> 'full_name' IS NOT NULL THEN
      full_name := NEW.raw_user_meta_data ->> 'full_name';
      
      -- Split full_name into first and last name
      IF position(' ' in full_name) > 0 THEN
        extracted_first_name := split_part(full_name, ' ', 1);
        extracted_last_name := substring(full_name from position(' ' in full_name) + 1);
      ELSE
        extracted_first_name := full_name;
        extracted_last_name := '';
      END IF;
    END IF;
    
    -- Insert the profile
    INSERT INTO public.profiles (user_id, email, first_name, last_name)
    VALUES (
      NEW.id,
      NEW.email,
      extracted_first_name,
      extracted_last_name
    );
    
    RETURN NEW;
  END;
END;
$$;