-- Update the handle_new_user function to better handle Google auth metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Handle Google auth: extract names from various possible metadata fields
  DECLARE
    extracted_first_name text;
    extracted_last_name text;
    full_name text;
    given_name text;
    family_name text;
  BEGIN
    -- Try to get names from various possible metadata fields
    extracted_first_name := COALESCE(
      NEW.raw_user_meta_data ->> 'first_name',
      NEW.raw_user_meta_data ->> 'given_name',
      ''
    );
    
    extracted_last_name := COALESCE(
      NEW.raw_user_meta_data ->> 'last_name',
      NEW.raw_user_meta_data ->> 'family_name',
      ''
    );
    
    -- If we still don't have names, try to extract from full_name or name
    IF extracted_first_name = '' AND extracted_last_name = '' THEN
      full_name := COALESCE(
        NEW.raw_user_meta_data ->> 'full_name',
        NEW.raw_user_meta_data ->> 'name',
        ''
      );
      
      -- Split full_name into first and last name
      IF full_name != '' AND position(' ' in full_name) > 0 THEN
        extracted_first_name := split_part(full_name, ' ', 1);
        extracted_last_name := substring(full_name from position(' ' in full_name) + 1);
      ELSIF full_name != '' THEN
        extracted_first_name := full_name;
        extracted_last_name := '';
      END IF;
    END IF;
    
    -- If we still don't have a first name, use email prefix as fallback
    IF extracted_first_name = '' THEN
      extracted_first_name := split_part(NEW.email, '@', 1);
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