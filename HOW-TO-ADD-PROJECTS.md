# 📁 How to Add and Manage Projects

This guide shows you how to easily add, modify, and manage projects on your website.

## 🎯 Quick Start

### 1. **Add a New Project**
Edit the file: `data/projects.js`

```javascript
// Add this to the projects array:
{
    id: "my-new-project",
    title: {
        en: "My New Project",
        fr: "Mon nouveau projet"
    },
    description: {
        en: "Description in English",
        fr: "Description en français"
    },
    image: "Images/projects/my-new-project/main.jpg",
    gallery: [
        "Images/projects/my-new-project/gallery1.jpg",
        "Images/projects/my-new-project/gallery2.jpg"
    ],
    icon: "fas fa-robot", // FontAwesome icon
    status: "completed", // completed, in-progress, planning
    date: {
        en: "Completed: January 2024",
        fr: "Terminé : Janvier 2024"
    },
    duration: {
        en: "Duration: 3 months",
        fr: "Durée : 3 mois"
    },
    technologies: ["Technology1", "Technology2"],
    featured: true, // Show on homepage
    details: {
        // Add detailed information here
    }
}
```

### 2. **Add Project Images**
Create folder structure:
```
Images/
└── projects/
    └── my-new-project/
        ├── main.jpg          (Main project image)
        ├── gallery1.jpg      (Gallery image 1)
        ├── gallery2.jpg      (Gallery image 2)
        └── gallery3.jpg      (Gallery image 3)
```

### 3. **Regenerate Website**
Run: `npm run build` to update your website with the new project.

## 📋 Project Structure Explained

### **Basic Information**
- `id`: Unique identifier (used for URLs)
- `title`: Project name in English and French
- `description`: Short description for project cards
- `image`: Main project image path
- `gallery`: Array of additional images
- `icon`: FontAwesome icon class
- `status`: Project status (completed/in-progress/planning)
- `featured`: Show on homepage (true/false)

### **Detailed Information**
```javascript
details: {
    overview: {
        en: "Detailed project description in English",
        fr: "Description détaillée du projet en français"
    },
    features: [
        {
            en: "Feature 1 in English",
            fr: "Fonctionnalité 1 en français"
        }
    ],
    challenges: [
        {
            title: {
                en: "Challenge Title",
                fr: "Titre du défi"
            },
            description: {
                en: "Challenge description",
                fr: "Description du défi"
            },
            solution: {
                en: "How you solved it",
                fr: "Comment vous l'avez résolu"
            }
        }
    ],
    results: [
        {
            value: "95%",
            label: {
                en: "Success Rate",
                fr: "Taux de réussite"
            }
        }
    ],
    projectDetails: {
        client: "Client Name",
        role: {
            en: "Your Role",
            fr: "Votre rôle"
        },
        teamSize: "3 developers",
        budget: "€50,000"
    },
    links: [
        {
            title: {
                en: "Source Code",
                fr: "Code source"
            },
            icon: "fab fa-github",
            url: "https://github.com/..."
        }
    ]
}
```

## 🖼️ Image Management

### **Image Sizes (Recommended)**
- **Main Image**: 800x600px
- **Gallery Images**: 1200x800px
- **Format**: JPG or PNG
- **File Size**: Under 500KB each

### **Image Naming Convention**
```
Images/projects/[project-id]/
├── main.jpg           (Main project image)
├── gallery1.jpg       (First gallery image)
├── gallery2.jpg       (Second gallery image)
└── gallery3.jpg       (Third gallery image)
```

### **Adding Images**
1. Create project folder: `Images/projects/your-project-name/`
2. Add main image: `main.jpg`
3. Add gallery images: `gallery1.jpg`, `gallery2.jpg`, etc.
4. Update project data with image paths

## 🔧 Status Types

- **`completed`**: Green badge, project is finished
- **`in-progress`**: Yellow badge, currently working on it
- **`planning`**: Blue badge, in planning phase

## 🌟 Featured Projects

Set `featured: true` to show project on homepage. Only featured projects appear in the main projects section.

## 📝 Quick Templates

### **Simple Project Template**
```javascript
{
    id: "project-name",
    title: { en: "Project Name", fr: "Nom du projet" },
    description: { en: "Short description", fr: "Description courte" },
    image: "Images/projects/project-name/main.jpg",
    icon: "fas fa-cog",
    status: "completed",
    technologies: ["Tech1", "Tech2"],
    featured: true
}
```

### **Detailed Project Template**
Copy the "tfe-desimone" project from `data/projects.js` and modify it with your information.

## 🚀 Publishing Changes

1. **Edit** `data/projects.js`
2. **Add images** to `Images/projects/[project-id]/`
3. **Run** `npm run build`
4. **Upload** the `dist` folder to your website

## 💡 Tips

- **Use descriptive IDs**: They become part of the URL
- **Optimize images**: Compress them for faster loading
- **Test locally**: Use `npm run dev` to preview changes
- **Backup**: Keep a copy of your `data/projects.js` file
- **Consistent naming**: Use the same naming pattern for all projects

## 🆘 Need Help?

- Check existing projects in `data/projects.js` for examples
- All text supports English and French
- Images are optional - projects work without them
- FontAwesome icons: https://fontawesome.com/icons