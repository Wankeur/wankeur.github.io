-- Fix security warnings by setting search_path for the functions
CREATE OR REPLACE FUNCTION public.notify_admin_project_submission()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  PERFORM pg_notify('project_submitted', json_build_object(
    'project_id', NEW.id,
    'title', NEW.title,
    'user_id', NEW.user_id
  )::text);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_admin_tutorial_submission()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  PERFORM pg_notify('tutorial_submitted', json_build_object(
    'tutorial_id', NEW.id,
    'title', NEW.title,
    'created_by', NEW.created_by
  )::text);
  RETURN NEW;
END;
$$;