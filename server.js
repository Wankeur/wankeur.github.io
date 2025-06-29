import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Data file paths
const PROJECTS_FILE = path.join(__dirname, 'data', 'projects.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    
    // Initialize projects file if it doesn't exist
    try {
      await fs.access(PROJECTS_FILE);
    } catch {
      const defaultProjects = [
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
          featured: true,
          createdAt: new Date().toISOString()
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
          featured: true,
          createdAt: new Date().toISOString()
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
          featured: true,
          createdAt: new Date().toISOString()
        }
      ];
      await fs.writeFile(PROJECTS_FILE, JSON.stringify(defaultProjects, null, 2));
    }

    // Initialize users file if it doesn't exist
    try {
      await fs.access(USERS_FILE);
    } catch {
      // Hash the password "password" for the admin user
      const hashedPassword = await bcrypt.hash('password', 10);
      const defaultUsers = [
        {
          id: 1,
          username: 'admin',
          password: hashedPassword,
          role: 'admin'
        }
      ];
      await fs.writeFile(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
    }
  } catch (error) {
    console.error('Error ensuring data directory:', error);
  }
}

// Helper functions
async function readProjects() {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

async function writeProjects(projects) {
  try {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing projects:', error);
    return false;
  }
}

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Routes

// Authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await readUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await readProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const projects = await readProjects();
    const project = projects.find(p => p.id === req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new project
app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await readProjects();
    const newProject = {
      id: req.body.id || Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.push(newProject);
    const success = await writeProjects(projects);

    if (success) {
      res.status(201).json(newProject);
    } else {
      res.status(500).json({ error: 'Failed to save project' });
    }
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update project
app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const projects = await readProjects();
    const projectIndex = projects.findIndex(p => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    const success = await writeProjects(projects);

    if (success) {
      res.json(projects[projectIndex]);
    } else {
      res.status(500).json({ error: 'Failed to update project' });
    }
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete project
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const projects = await readProjects();
    const projectIndex = projects.findIndex(p => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects.splice(projectIndex, 1);
    const success = await writeProjects(projects);

    if (success) {
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Initialize and start server
async function startServer() {
  await ensureDataDirectory();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Admin login: username=admin, password=password`);
  });
}

startServer();