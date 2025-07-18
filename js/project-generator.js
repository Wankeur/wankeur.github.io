// Project Generator - Automatically creates project cards and pages
class ProjectGenerator {
    constructor() {
        this.currentLanguage = 'en';
    }

    // Set current language
    setLanguage(lang) {
        this.currentLanguage = lang;
    }

    // Get text in current language
    getText(textObj) {
        if (typeof textObj === 'string') return textObj;
        return textObj[this.currentLanguage] || textObj.en || '';
    }

    // Generate project card HTML
    generateProjectCard(project) {
        const statusClass = project.status;
        const statusText = {
            completed: { en: 'Completed', fr: 'Terminé' },
            'in-progress': { en: 'In Progress', fr: 'En cours' },
            planning: { en: 'Planning', fr: 'Planification' }
        };

        return `
            <div class="project-card" onclick="this.openProject('${project.id}')">
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

    // Generate featured projects for homepage
    generateFeaturedProjects() {
        const featuredProjects = projects.filter(p => p.featured);
        return featuredProjects.map(project => this.generateProjectCard(project)).join('');
    }

    // Generate all projects for projects page
    generateAllProjects() {
        return projects.map(project => this.generateProjectCard(project)).join('');
    }

    // Generate project detail page
    generateProjectPage(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return '';

        return `
            <!DOCTYPE html>
            <html lang="${this.currentLanguage}">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${this.getText(project.title)} - DÆDALE</title>
                <link rel="stylesheet" href="../style.css">
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <link rel="icon" type="image/png" href="../Images/favicon.png">
            </head>
            <body>
                ${this.generateNavigation()}
                ${this.generateProjectHeader(project)}
                ${this.generateProjectContent(project)}
                ${this.generateFooter()}
                <script src="../script.js"></script>
            </body>
            </html>
        `;
    }

    // Generate navigation
    generateNavigation() {
        return `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo">
                        <a href="../index.html">DÆDALE</a>
                    </div>
                    <div class="nav-menu" id="nav-menu">
                        <a href="../index.html" class="nav-link" data-en="Home" data-fr="Accueil">Home</a>
                        <a href="../index.html#about" class="nav-link" data-en="About" data-fr="À propos">About</a>
                        <a href="../projects.html" class="nav-link" data-en="Projects" data-fr="Projets">Projects</a>
                        <a href="../index.html#experience" class="nav-link" data-en="Experience" data-fr="Expérience">Experience</a>
                        <a href="../index.html#tutorials" class="nav-link" data-en="Tutorials" data-fr="Tutoriels">Tutorials</a>
                        <a href="../index.html#contact" class="nav-link" data-en="Contact" data-fr="Contact">Contact</a>
                    </div>
                    <div class="nav-right">
                        <div class="language-toggle">
                            <button class="lang-btn active" data-lang="en">EN</button>
                            <button class="lang-btn" data-lang="fr">FR</button>
                        </div>
                        <div class="nav-toggle" id="nav-toggle">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    // Generate project header
    generateProjectHeader(project) {
        return `
            <section class="project-header">
                <div class="container">
                    <div class="project-breadcrumb">
                        <a href="../projects.html" data-en="← Back to Projects" data-fr="← Retour aux projets">← Back to Projects</a>
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
        `;
    }

    // Generate project content
    generateProjectContent(project) {
        if (!project.details) return '';

        return `
            <section class="project-content">
                <div class="container">
                    <div class="project-layout">
                        <div class="project-main">
                            ${this.generateOverview(project.details)}
                            ${this.generateFeatures(project.details)}
                            ${this.generateChallenges(project.details)}
                            ${this.generateResults(project.details)}
                            ${this.generateGallery(project)}
                        </div>
                        ${this.generateSidebar(project)}
                    </div>
                </div>
            </section>
        `;
    }

    // Generate overview section
    generateOverview(details) {
        if (!details.overview) return '';
        return `
            <div class="content-section">
                <h2 data-en="Project Overview" data-fr="Aperçu du projet">Project Overview</h2>
                <p>${this.getText(details.overview)}</p>
            </div>
        `;
    }

    // Generate features section
    generateFeatures(details) {
        if (!details.features || details.features.length === 0) return '';
        return `
            <div class="content-section">
                <h2 data-en="Key Features" data-fr="Fonctionnalités clés">Key Features</h2>
                <ul class="feature-list">
                    ${details.features.map(feature => `<li>${this.getText(feature)}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Generate challenges section
    generateChallenges(details) {
        if (!details.challenges || details.challenges.length === 0) return '';
        return `
            <div class="content-section">
                <h2 data-en="Challenges and Solutions" data-fr="Défis et solutions">Challenges and Solutions</h2>
                ${details.challenges.map(challenge => `
                    <div class="challenge-item">
                        <h4>${this.getText(challenge.title)}</h4>
                        <p>${this.getText(challenge.description)}</p>
                        ${challenge.solution ? `<p><strong data-en="Solution:" data-fr="Solution :">Solution:</strong> ${this.getText(challenge.solution)}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Generate results section
    generateResults(details) {
        if (!details.results || details.results.length === 0) return '';
        return `
            <div class="content-section">
                <h2 data-en="Results and Impact" data-fr="Résultats et impact">Results and Impact</h2>
                <div class="results-grid">
                    ${details.results.map(result => `
                        <div class="result-item">
                            <div class="result-number">${result.value}</div>
                            <div class="result-label">${this.getText(result.label)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Generate image gallery
    generateGallery(project) {
        if (!project.gallery || project.gallery.length === 0) return '';
        return `
            <div class="content-section">
                <h2 data-en="Project Gallery" data-fr="Galerie du projet">Project Gallery</h2>
                <div class="project-gallery">
                    ${project.gallery.map(image => `
                        <div class="gallery-item">
                            <img src="../${image}" alt="${this.getText(project.title)}" onclick="this.openImageModal('${image}')">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Generate sidebar
    generateSidebar(project) {
        return `
            <div class="project-sidebar">
                ${this.generateProjectDetails(project)}
                ${this.generateTechnologies(project)}
                ${this.generateLinks(project)}
            </div>
        `;
    }

    // Generate project details sidebar section
    generateProjectDetails(project) {
        if (!project.details || !project.details.projectDetails) return '';
        
        const details = project.details.projectDetails;
        return `
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

    // Generate technologies sidebar section
    generateTechnologies(project) {
        return `
            <div class="sidebar-section">
                <h3 data-en="Technologies Used" data-fr="Technologies utilisées">Technologies Used</h3>
                <div class="tech-list">
                    ${project.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // Generate links sidebar section
    generateLinks(project) {
        if (!project.details || !project.details.links || project.details.links.length === 0) return '';
        
        return `
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

    // Generate footer
    generateFooter() {
        return `
            <footer class="footer">
                <div class="container">
                    <p data-en="&copy; 2025 Radermacker Alexandre. All rights reserved." data-fr="&copy; 2025 Radermacker Alexandre. Tous droits réservés.">&copy; 2025 Radermacker Alexandre. All rights reserved.</p>
                </div>
            </footer>
        `;
    }

    // Open project page
    openProject(projectId) {
        window.location.href = `projects/${projectId}.html`;
    }

    // Open image modal (for gallery)
    openImageModal(imageSrc) {
        // Create modal for image viewing
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <img src="../${imageSrc}" alt="Project Image">
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// Initialize project generator
const projectGenerator = new ProjectGenerator();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectGenerator;
}