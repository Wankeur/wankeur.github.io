-- Insert a sample approved project for testing
INSERT INTO public.projects (
  title,
  description,
  image_url,
  technologies,
  status,
  github_url,
  demo_url,
  user_id,
  approved_at,
  approved_by
) VALUES (
  'Sample Industrial Automation Project',
  'A comprehensive automation system for manufacturing processes using modern PLC programming and HMI design. This project demonstrates advanced control algorithms and real-time monitoring capabilities.',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  ARRAY['Siemens TIA Portal', 'WinCC Unified', 'Industrial Ethernet', 'Safety Systems'],
  'approved',
  'https://github.com/example/automation-project',
  'https://demo.example.com',
  (SELECT user_id FROM public.profiles LIMIT 1),
  now(),
  (SELECT user_id FROM public.profiles WHERE role = 'admin' LIMIT 1)
);