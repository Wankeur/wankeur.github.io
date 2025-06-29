// API helper functions for the main website (updated for static hosting)
class ProjectAPI {
    constructor() {
        this.baseURL = window.location.origin;
    }

    async getProjects() {
        try {
            // First try to get projects from localStorage (updated by admin panel)
            const storedProjects = localStorage.getItem('websiteProjects') || localStorage.getItem('staticProjects');
            if (storedProjects) {
                return JSON.parse(storedProjects);
            }
            
            // Fallback to default projects
            return this.getFallbackProjects();
        } catch (error) {
            console.error('Error fetching projects:', error);
            return this.getFallbackProjects();
        }
    }

    async getProject(id) {
        try {
            const projects = await this.getProjects();
            return projects.find(p => p.id === id) || null;
        } catch (error) {
            console.error('Error fetching project:', error);
            return null;
        }
    }

    getFallbackProjects() {
        // Fallback projects in case nothing is stored
        return [
            {
                id: 'final-year-project',
                title: {
                    en: 'Final year automation project',
                    fr: 'Travail de fin d\'études en automatisation'
                },
                description: {
                    en: 'A full custom machine build for research on insulated panels.',
                    fr: 'Une machine entièrement personnalisée construite pour de la recherche sur des panneaux isolants.'
                },
                technologies: ['Siemens', 'TIA Portal', 'HMI'],
                status: 'completed',
                icon: 'fas fa-robot',
                featured: true
            },
            {
                id: 'robotics-control',
                title: {
                    en: 'Robotics Control System',
                    fr: 'Système de contrôle robotique'
                },
                description: {
                    en: 'A ROS2-based control system for industrial robots with advanced path planning and collision detection capabilities.',
                    fr: 'Un système de contrôle basé sur ROS2 pour robots industriels avec planification de trajectoire avancée et détection de collision.'
                },
                technologies: ['ROS2', 'C++', 'Python'],
                status: 'in-progress',
                icon: 'fas fa-cog',
                featured: true
            },
            {
                id: '3d-printing-optimization',
                title: {
                    en: '3D Printing Optimization',
                    fr: 'Optimisation d\'impression 3D'
                },
                description: {
                    en: 'Custom firmware and slicing algorithms to optimize 3D printing quality and speed for industrial applications.',
                    fr: 'Firmware personnalisé et algorithmes de découpage pour optimiser la qualité et la vitesse d\'impression 3D pour les applications industrielles.'
                },
                technologies: ['C++', 'Marlin', 'CAD'],
                status: 'completed',
                icon: 'fas fa-cube',
                featured: true
            }
        ];
    }
}

// Initialize API
const projectAPI = new ProjectAPI();

// Function to load and render projects dynamically
async function loadDynamicProjects() {
    const projects = await projectAPI.getProjects();
    const currentLanguage = localStorage.getItem('preferred-language') || 'en';
    
    // Update featured projects on homepage
    const featuredContainer = document.querySelector('#projects .projects-grid');
    if (featuredContainer) {
        const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
        
        featuredContainer.innerHTML = featuredProjects.map(project => `
            <div class="project-card" onclick="window.location.href='projects/${project.id}.html'">
                <div class="project-image">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3 data-en="${project.title.en}" data-fr="${project.title.fr}">${project.title[currentLanguage]}</h3>
                    <p data-en="${project.description.en}" data-fr="${project.description.fr}">${project.description[currentLanguage]}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="#" class="project-link">
                            <i class="fab fa-github"></i> <span data-en="Code" data-fr="Code">Code</span>
                        </a>
                        <a href="#" class="project-link">
                            <i class="fas fa-external-link-alt"></i> <span data-en="Live Demo" data-fr="Démo en direct">Live Demo</span>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update all projects page
    const allProjectsContainer = document.querySelector('.projects-listing .projects-grid');
    if (allProjectsContainer) {
        allProjectsContainer.innerHTML = projects.map(project => `
            <div class="project-card" onclick="window.location.href='projects/${project.id}.html'">
                <div class="project-image">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3 data-en="${project.title.en}" data-fr="${project.title.fr}">${project.title[currentLanguage]}</h3>
                    <p data-en="${project.description.en}" data-fr="${project.description.fr}">${project.description[currentLanguage]}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-status">
                        <span class="status-badge ${project.status}" data-en="${project.status.replace('-', ' ')}" data-fr="${getStatusTranslation(project.status)}">${getStatusText(project.status, currentLanguage)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function getStatusTranslation(status) {
    const translations = {
        'planning': 'Planification',
        'in-progress': 'En cours',
        'completed': 'Terminé'
    };
    return translations[status] || status;
}

function getStatusText(status, language) {
    if (language === 'fr') {
        return getStatusTranslation(status);
    }
    return status.replace('-', ' ');
}

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only load dynamic projects if we're not in admin panel
    if (!window.location.pathname.includes('admin.html')) {
        loadDynamicProjects();
        
        // Listen for storage changes to update projects when admin makes changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'websiteProjects' || e.key === 'staticProjects') {
                loadDynamicProjects();
            }
        });
    }
});

// Export for use in other scripts
window.projectAPI = projectAPI;