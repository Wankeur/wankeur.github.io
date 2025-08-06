-- Add foreign key constraint between comments and profiles
ALTER TABLE public.comments 
ADD CONSTRAINT comments_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update comments to use proper relationship with profiles
-- Since comments.user_id references auth.users.id, we need to adjust the query approach