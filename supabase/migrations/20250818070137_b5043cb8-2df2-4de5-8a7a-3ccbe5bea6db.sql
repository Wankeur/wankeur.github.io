-- Add project phase field to distinguish from approval status
ALTER TABLE public.projects 
ADD COLUMN project_phase TEXT NOT NULL DEFAULT 'idea';

-- Add check constraint for valid phases
ALTER TABLE public.projects 
ADD CONSTRAINT projects_project_phase_check 
CHECK (project_phase IN ('legacy', 'completed', 'in_development', 'idea'));