-- Create storage bucket for tutorial files
INSERT INTO storage.buckets (id, name, public) VALUES ('tutorial-files', 'tutorial-files', true);

-- Create policies for tutorial file uploads
CREATE POLICY "Users can view tutorial files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tutorial-files');

CREATE POLICY "Authenticated users can upload tutorial files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'tutorial-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own tutorial files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'tutorial-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own tutorial files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'tutorial-files' AND auth.uid()::text = (storage.foldername(name))[1]);