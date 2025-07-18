// Project Manager - Easy way to add and modify projects
class ProjectManager {
    constructor() {
        this.projects = [...projects]; // Copy of projects array
    }

    // Add a new project
    addProject(projectData) {
        // Generate ID from title
        const id = projectData.title.en.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');

        const newProject = {
            id: id,
            title: projectData.title,
            description: projectData.description,
            image: projectData.image || `Images/projects/${id}/main.jpg`,
            gallery: projectData.gallery || [],
            icon: projectData.icon || 'fas fa-cog',
            status: projectData.status || 'planning',
            date: projectData.date,
            duration: projectData.duration,
            technologies: projectData.technologies || [],
            featured: projectData.featured || false,
            details: projectData.details || {}
        };

        this.projects.push(newProject);
        return newProject;
    }

    // Update existing project
    updateProject(projectId, updates) {
        const projectIndex = this.projects.findIndex(p => p.id === projectId);
        if (projectIndex === -1) return null;

        this.projects[projectIndex] = { ...this.projects[projectIndex], ...updates };
        return this.projects[projectIndex];
    }

    // Delete project
    deleteProject(projectId) {
        const projectIndex = this.projects.findIndex(p => p.id === projectId);
        if (projectIndex === -1) return false;

        this.projects.splice(projectIndex, 1);
        return true;
    }

    // Get project by ID
    getProject(projectId) {
        return this.projects.find(p => p.id === projectId);
    }

    // Get all projects
    getAllProjects() {
        return this.projects;
    }

    // Get featured projects
    getFeaturedProjects() {
        return this.projects.filter(p => p.featured);
    }

    // Generate project data file
    generateProjectsFile() {
        return `// Auto-generated project data
const projects = ${JSON.stringify(this.projects, null, 4)};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projects;
}`;
    }

    // Create project folder structure
    createProjectFolders(projectId) {
        const folders = [
            `Images/projects/${projectId}`,
            `Images/projects/${projectId}/gallery`
        ];
        
        console.log(`Create these folders for project "${projectId}":`);
        folders.forEach(folder => console.log(`- ${folder}`));
        
        return folders;
    }

    // Generate project page file
    generateProjectPageFile(projectId) {
        const generator = new ProjectGenerator();
        return generator.generateProjectPage(projectId);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectManager;
}