-- Create storage buckets for project and tutorial files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES 
  ('project-files', 'project-files', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']),
  ('tutorial-files', 'tutorial-files', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']);

-- Create policies for project files
CREATE POLICY "Anyone can view project files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-files');

CREATE POLICY "Authenticated users can upload project files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own project files OR admins can update any" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-files' AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin()));

CREATE POLICY "Users can delete their own project files OR admins can delete any" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-files' AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin()));

-- Create policies for tutorial files
CREATE POLICY "Anyone can view tutorial files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tutorial-files');

CREATE POLICY "Authenticated users can upload tutorial files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'tutorial-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own tutorial files OR admins can update any" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'tutorial-files' AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin()));

CREATE POLICY "Users can delete their own tutorial files OR admins can delete any" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'tutorial-files' AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin()));

-- Add file_urls column to projects table
ALTER TABLE public.projects 
ADD COLUMN file_urls TEXT[] DEFAULT '{}';

-- Add file_urls column to tutorials table  
ALTER TABLE public.tutorials 
ADD COLUMN file_urls TEXT[] DEFAULT '{}';

-- Create function to notify admin when project is submitted
CREATE OR REPLACE FUNCTION public.notify_admin_project_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- This will be called by the edge function
  PERFORM pg_notify('project_submitted', json_build_object(
    'project_id', NEW.id,
    'title', NEW.title,
    'user_id', NEW.user_id
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to notify admin when tutorial is submitted  
CREATE OR REPLACE FUNCTION public.notify_admin_tutorial_submission()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('tutorial_submitted', json_build_object(
    'tutorial_id', NEW.id,
    'title', NEW.title,
    'created_by', NEW.created_by
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for notifications
CREATE TRIGGER project_submission_notification
  AFTER INSERT ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_project_submission();

CREATE TRIGGER tutorial_submission_notification
  AFTER INSERT ON public.tutorials  
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_tutorial_submission();