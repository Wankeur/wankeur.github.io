// DÆDALE Portfolio Application
class DaedaleApp {
    constructor() {
        this.currentLanguage = 'en';
        this.projects = [];
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.initializeLanguage();
        this.initializeNavigation();
        this.initializeRouting();
        this.initializeAnimations();
    }

    // Language Management
    initializeLanguage() {
        // Check for saved language preference
        const savedLang = localStorage.getItem('preferred-language');
        const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
        const initialLang = savedLang || browserLang;
        
        this.switchLanguage(initialLang);
        
        // Add event listeners to language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchLanguage(btn.dataset.lang);
            });
        });
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update all translatable elements
        document.querySelectorAll('[data-en]').forEach(element => {
            const englishText = element.getAttribute('data-en');
            const frenchText = element.getAttribute('data-fr');
            
            if (lang === 'en' && englishText) {
                if (element.innerHTML.includes('&copy;')) {
                    element.innerHTML = englishText;
                } else {
                    element.textContent = englishText;
                }
            } else if (lang === 'fr' && frenchText) {
                if (element.innerHTML.includes('&copy;')) {
                    element.innerHTML = frenchText;
                } else {
                    element.textContent = frenchText;
                }
            }
        });
        
        // Save language preference
        localStorage.setItem('preferred-language', lang);
        
        // Refresh dynamic content
        this.refreshDynamicContent();
    }

    getText(textObj) {
        if (typeof textObj === 'string') return textObj;
        return textObj[this.currentLanguage] || textObj.en || '';
    }

    // Project Management
    async loadProjects() {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                this.projects = await response.json();
            } else {
                console.error('Failed to load projects');
                this.projects = [];
            }
        } catch (error) {
            console.error('Error loading projects:', error);
            this.projects = [];
        }
    }

    async loadProject(id) {
        try {
            const response = await fetch(`/api/projects/${id}`);
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Project not found');
            }
        } catch (error) {
            console.error('Error loading project:', error);
            return null;
        }
    }

    // Project Card Generation
    generateProjectCard(project) {
        const statusClass = project.status;
        const statusText = {
            completed: { en: 'Completed', fr: 'Terminé' },
            'in-progress': { en: 'In Progress', fr: 'En cours' },
            planning: { en: 'Planning', fr: 'Planification' }
        };

        return `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-image">
                    ${project.image ? 
                        `<img src="${project.image}" alt="${this.getText(project.title)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <i class="${project.icon}" style="display:none;"></i>` :
                        `<i class="${project.icon}"></i>`
                    }
                </div>
                <div class="project-content">
                    <h3>${this.getText(project.title)}</h3>
                    <p>${this.getText(project.description)}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-status">
                        <span class="status-badge ${statusClass}">${this.getText(statusText[project.status])}</span>
                    </div>
                </div>
            </div>
        `;
    }

    generateFeaturedProjects() {
        const featuredProjects = this.projects.filter(p => p.featured);
        return featuredProjects.map(project => this.generateProjectCard(project)).join('');
    }

    generateAllProjects() {
        return this.projects.map(project => this.generateProjectCard(project)).join('');
    }

    // Project Detail Generation
    generateProjectDetail(project) {
        if (!project) return '<div class="error">Project not found</div>';

        return `
            <!-- Project Header -->
            <section class="project-header">
                <div class="container">
                    <div class="project-breadcrumb">
                        <a href="/projects" data-en="← Back to Projects" data-fr="← Retour aux projets">← Back to Projects</a>
                    </div>
                    <h1 class="project-title">${this.getText(project.title)}</h1>
                    <div class="project-meta">
                        <span class="project-date">${this.getText(project.date)}</span>
                        <span class="project-duration">${this.getText(project.duration)}</span>
                    </div>
                    <div class="project-tech-header">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </section>

            <!-- Project Content -->
            <section class="project-content-section">
                <div class="container">
                    <div class="project-layout">
                        <div class="project-main">
                            ${this.generateProjectContent(project)}
                        </div>
                        ${this.generateProjectSidebar(project)}
                    </div>
                </div>
            </section>
        `;
    }

    generateProjectContent(project) {
        if (!project.details) return '';

        let content = '';

        // Overview
        if (project.details.overview) {
            content += `
                <div class="content-section">
                    <h2 data-en="Project Overview" data-fr="Aperçu du projet">Project Overview</h2>
                    <p>${this.getText(project.details.overview)}</p>
                </div>
            `;
        }

        // Features
        if (project.details.features && project.details.features.length > 0) {
            content += `
                <div class="content-section">
                    <h2 data-en="Key Features" data-fr="Fonctionnalités clés">Key Features</h2>
                    <ul class="feature-list">
                        ${project.details.features.map(feature => `<li>${this.getText(feature)}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Challenges
        if (project.details.challenges && project.details.challenges.length > 0) {
            content += `
                <div class="content-section">
                    <h2 data-en="Challenges and Solutions" data-fr="Défis et solutions">Challenges and Solutions</h2>
                    ${project.details.challenges.map(challenge => `
                        <div class="challenge-item">
                            <h4>${this.getText(challenge.title)}</h4>
                            <p>${this.getText(challenge.description)}</p>
                            ${challenge.solution ? `<p><strong data-en="Solution:" data-fr="Solution :">Solution:</strong> ${this.getText(challenge.solution)}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Results
        if (project.details.results && project.details.results.length > 0) {
            content += `
                <div class="content-section">
                    <h2 data-en="Results and Impact" data-fr="Résultats et impact">Results and Impact</h2>
                    <div class="results-grid">
                        ${project.details.results.map(result => `
                            <div class="result-item">
                                <div class="result-number">${result.value}</div>
                                <div class="result-label">${this.getText(result.label)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        return content;
    }

    generateProjectSidebar(project) {
        let sidebar = '<div class="project-sidebar">';

        // Project Details
        if (project.details && project.details.projectDetails) {
            const details = project.details.projectDetails;
            sidebar += `
                <div class="sidebar-section">
                    <h3 data-en="Project Details" data-fr="Détails du projet">Project Details</h3>
                    ${Object.entries(details).map(([key, value]) => `
                        <div class="detail-item">
                            <strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                            <span>${this.getText(value)}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Technologies
        sidebar += `
            <div class="sidebar-section">
                <h3 data-en="Technologies Used" data-fr="Technologies utilisées">Technologies Used</h3>
                <div class="tech-list">
                    ${project.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                </div>
            </div>
        `;

        // Links
        if (project.details && project.details.links && project.details.links.length > 0) {
            sidebar += `
                <div class="sidebar-section">
                    <h3 data-en="Project Links" data-fr="Liens du projet">Project Links</h3>
                    <div class="project-links">
                        ${project.details.links.map(link => `
                            <a href="${link.url}" class="project-link-btn">
                                <i class="${link.icon}"></i>
                                <span>${this.getText(link.title)}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        sidebar += '</div>';
        return sidebar;
    }

    // Navigation
    initializeNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                } else {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            }
        });

        // Active navigation link highlighting
        this.initializeActiveNavigation();
    }

    initializeActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function highlightNavLink() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightNavLink);
    }

    // Routing
    initializeRouting() {
        // Handle page-specific initialization
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') {
            this.initializeHomePage();
        } else if (path === '/projects' || path === '/projects.html') {
            this.initializeProjectsPage();
        } else if (path.startsWith('/projects/')) {
            this.initializeProjectDetailPage();
        }
    }

    initializeHomePage() {
        const featuredProjectsContainer = document.getElementById('featured-projects');
        if (featuredProjectsContainer) {
            if (this.projects.length > 0) {
                featuredProjectsContainer.innerHTML = this.generateFeaturedProjects();
                this.addProjectClickHandlers();
            } else {
                featuredProjectsContainer.innerHTML = '<div class="loading">Loading projects...</div>';
            }
        }
    }

    initializeProjectsPage() {
        const allProjectsContainer = document.getElementById('all-projects');
        if (allProjectsContainer) {
            if (this.projects.length > 0) {
                allProjectsContainer.innerHTML = this.generateAllProjects();
                this.addProjectClickHandlers();
            } else {
                allProjectsContainer.innerHTML = '<div class="loading">Loading projects...</div>';
            }
        }
    }

    async initializeProjectDetailPage() {
        const projectId = window.location.pathname.split('/').pop();
        const projectContent = document.getElementById('project-content');
        
        if (projectContent) {
            try {
                const project = await this.loadProject(projectId);
                if (project) {
                    projectContent.innerHTML = this.generateProjectDetail(project);
                    // Update page title
                    document.title = `${this.getText(project.title)} - DÆDALE`;
                    // Apply language to new content
                    this.switchLanguage(this.currentLanguage);
                } else {
                    projectContent.innerHTML = `
                        <div class="error-page">
                            <div class="container">
                                <div class="error-content">
                                    <div class="error-icon">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <h1 class="error-title">Project Not Found</h1>
                                    <p class="error-description">The project you're looking for doesn't exist.</p>
                                    <div class="error-buttons">
                                        <a href="/projects" class="btn btn-primary">View All Projects</a>
                                        <a href="/" class="btn btn-secondary">Go Home</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Error loading project detail:', error);
                projectContent.innerHTML = '<div class="error">Failed to load project</div>';
            }
        }
    }

    addProjectClickHandlers() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project-id');
                if (projectId) {
                    window.location.href = `/projects/${projectId}`;
                }
            });
        });
    }

    refreshDynamicContent() {
        // Refresh projects if they're loaded
        const featuredProjectsContainer = document.getElementById('featured-projects');
        const allProjectsContainer = document.getElementById('all-projects');
        
        if (featuredProjectsContainer && this.projects.length > 0) {
            featuredProjectsContainer.innerHTML = this.generateFeaturedProjects();
            this.addProjectClickHandlers();
        }
        
        if (allProjectsContainer && this.projects.length > 0) {
            allProjectsContainer.innerHTML = this.generateAllProjects();
            this.addProjectClickHandlers();
        }
    }

    // Animations
    initializeAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.project-card, .tutorial-card, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Typing effect for hero title
        this.initializeTypingEffect();

        // Parallax effect for hero section
        this.initializeParallaxEffect();

        // Add hover effects to project cards
        this.initializeHoverEffects();
    }

    initializeTypingEffect() {
        const highlightSpan = document.querySelector('.hero-title .highlight');
        if (highlightSpan) {
            const originalText = highlightSpan.textContent;
            highlightSpan.textContent = '';
            setTimeout(() => {
                this.typeWriter(highlightSpan, originalText, 50);
            }, 500);
        }
    }

    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    initializeParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    initializeHoverEffects() {
        // Add hover effects to project cards
        document.addEventListener('mouseover', function(e) {
            if (e.target.closest('.project-card')) {
                const card = e.target.closest('.project-card');
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        document.addEventListener('mouseout', function(e) {
            if (e.target.closest('.project-card')) {
                const card = e.target.closest('.project-card');
                card.style.transform = 'translateY(0) scale(1)';
            }
        });

        // Add click effects to buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('.btn')) {
                const button = e.target.closest('.btn');
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.daedaleApp = new DaedaleApp();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);