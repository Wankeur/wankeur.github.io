-- Make created_by nullable in tutorials table temporarily to allow sample data
ALTER TABLE public.tutorials ALTER COLUMN created_by DROP NOT NULL;

-- Insert a sample tutorial
INSERT INTO public.tutorials (
  title,
  description,
  content,
  image_url,
  difficulty,
  tags,
  published
) VALUES (
  'Getting Started with Siemens TIA Portal',
  'A comprehensive guide to setting up and programming your first automation project with TIA Portal.',
  '# Getting Started with Siemens TIA Portal

Welcome to this comprehensive tutorial on Siemens TIA Portal! In this guide, we will walk through everything you need to know to get started with automation programming.

## What is TIA Portal?

TIA Portal (Totally Integrated Automation Portal) is Siemens engineering framework for automation projects. It provides a unified environment for configuring, programming, testing, and diagnosing basic, advanced, distributed, and safety programs.

## Prerequisites

Before we begin, make sure you have:
- Basic understanding of automation concepts
- Windows PC with TIA Portal installed
- Basic knowledge of ladder logic (helpful but not required)

## Step 1: Setting up your first project

1. Open TIA Portal
2. Click on "Create new project"
3. Enter a project name and location
4. Select your PLC model from the hardware catalog

## Step 2: Hardware Configuration

The hardware configuration is crucial for your automation project:

1. Add your CPU to the configuration
2. Configure the I/O modules
3. Set up network connections if required
4. Compile the hardware configuration

## Step 3: Programming Basics

Now lets start with basic programming:

### Creating your first program block

1. Right-click on "Program blocks" in the project tree
2. Select "Add new block"
3. Choose "Function Block (FB)" or "Function (FC)"
4. Name your block appropriately

### Basic Ladder Logic

Here is a simple example of a start/stop circuit:

```
--| Start |--+--( Motor )--
             |
--| Stop  |--+
```

## Best Practices

1. **Use meaningful names**: Always use descriptive names for your variables and blocks
2. **Comment your code**: Add comments to explain complex logic
3. **Organize your code**: Use function blocks to organize related functionality
4. **Test thoroughly**: Always test your programs in simulation before deployment

## Conclusion

This tutorial covered the basics of getting started with TIA Portal. Practice these concepts and explore more advanced features as you become comfortable with the basics.

Happy programming!',
  '/src/assets/project-automation.jpg',
  'beginner',
  ARRAY['TIA Portal', 'PLC', 'HMI', 'Siemens'],
  true
);