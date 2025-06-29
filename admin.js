// Admin panel functionality
let authToken = localStorage.getItem('authToken');
let currentProjects = [];
let editingProject = null;
let currentTechnologies = [];

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    if (authToken) {
        showAdminPanel();
        loadProjects();
    } else {
        showLoginForm();
    }
});

// Show/hide sections
function showLoginForm() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('logout-btn').classList.add('hidden');
}

function showAdminPanel() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    document.getElementById('logout-btn').classList.remove('hidden');
}

// Login functionality
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            showAdminPanel();
            loadProjects();
            errorDiv.classList.add('hidden');
        } else {
            errorDiv.textContent = data.error || 'Login failed';
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Login error:', error);
        errorDiv.textContent = 'Network error. Please try again.';
        errorDiv.classList.remove('hidden');
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    authToken = null;
    localStorage.removeItem('authToken');
    showLoginForm();
    document.getElementById('login-form').reset();
});

// Load projects
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        if (response.ok) {
            currentProjects = projects;
            renderProjects();
        } else {
            console.error('Failed to load projects:', projects.error);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Render projects in admin panel
function renderProjects() {
    const container = document.getElementById('projects-container');
    
    if (currentProjects.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">No projects found.</p>';
        return;
    }
    
    container.innerHTML = currentProjects.map(project => `
        <div class="admin-project-card">
            <div class="project-actions">
                <button class="action-btn edit-btn" onclick="editProject('${project.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteProject('${project.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            
            <div class="project-image" style="height: 100px; margin-bottom: 1rem; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; border-radius: 0.5rem;">
                <i class="${project.icon}" style="font-size: 2rem; color: white;"></i>
            </div>
            
            <h3 style="margin-bottom: 0.5rem; color: var(--text-primary);">${project.title.en}</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">${project.description.en.substring(0, 100)}...</p>
            
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 1rem;">
                ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="status-badge ${project.status}">${project.status.replace('-', ' ')}</span>
                ${project.featured ? '<span style="color: var(--accent-color); font-size: 0.8rem;"><i class="fas fa-star"></i> Featured</span>' : ''}
            </div>
        </div>
    `).join('');
}

// Modal functionality
function openModal(title = 'Add Project') {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('project-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('project-form').reset();
    document.getElementById('form-error').classList.add('hidden');
    document.getElementById('form-success').classList.add('hidden');
    editingProject = null;
    currentTechnologies = [];
    renderTechnologies();
}

// Add project button
document.getElementById('add-project-btn').addEventListener('click', () => {
    editingProject = null;
    currentTechnologies = [];
    renderTechnologies();
    openModal('Add Project');
});

// Technology management
function addTechnology() {
    const input = document.getElementById('new-tech');
    const tech = input.value.trim();
    
    if (tech && !currentTechnologies.includes(tech)) {
        currentTechnologies.push(tech);
        renderTechnologies();
        input.value = '';
    }
}

function removeTechnology(tech) {
    currentTechnologies = currentTechnologies.filter(t => t !== tech);
    renderTechnologies();
}

function renderTechnologies() {
    const container = document.getElementById('tech-container');
    container.innerHTML = currentTechnologies.map(tech => `
        <div class="tech-tag-input">
            ${tech}
            <button type="button" class="remove-tech" onclick="removeTechnology('${tech}')">×</button>
        </div>
    `).join('');
}

// Allow Enter key to add technology
document.getElementById('new-tech').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTechnology();
    }
});

// Edit project
function editProject(projectId) {
    const project = currentProjects.find(p => p.id === projectId);
    if (!project) return;
    
    editingProject = project;
    currentTechnologies = [...project.technologies];
    
    // Fill form with project data
    document.getElementById('project-id').value = project.id;
    document.getElementById('title-en').value = project.title.en;
    document.getElementById('title-fr').value = project.title.fr;
    document.getElementById('description-en').value = project.description.en;
    document.getElementById('description-fr').value = project.description.fr;
    document.getElementById('status').value = project.status;
    document.getElementById('icon').value = project.icon;
    document.getElementById('featured').checked = project.featured || false;
    
    renderTechnologies();
    openModal('Edit Project');
}

// Delete project
async function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            loadProjects(); // Reload projects
        } else {
            const error = await response.json();
            alert('Failed to delete project: ' + (error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        alert('Network error. Please try again.');
    }
}

// Form submission
document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const errorDiv = document.getElementById('form-error');
    const successDiv = document.getElementById('form-success');
    
    // Clear previous messages
    errorDiv.classList.add('hidden');
    successDiv.classList.add('hidden');
    
    // Prepare project data
    const projectData = {
        id: formData.get('id'),
        title: {
            en: formData.get('title-en'),
            fr: formData.get('title-fr')
        },
        description: {
            en: formData.get('description-en'),
            fr: formData.get('description-fr')
        },
        status: formData.get('status'),
        icon: formData.get('icon'),
        featured: formData.has('featured'),
        technologies: currentTechnologies
    };
    
    try {
        const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
        const method = editingProject ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(projectData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            successDiv.textContent = editingProject ? 'Project updated successfully!' : 'Project created successfully!';
            successDiv.classList.remove('hidden');
            
            // Reload projects and close modal after a short delay
            setTimeout(() => {
                loadProjects();
                closeModal();
            }, 1500);
        } else {
            errorDiv.textContent = result.error || 'Failed to save project';
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error saving project:', error);
        errorDiv.textContent = 'Network error. Please try again.';
        errorDiv.classList.remove('hidden');
    }
});