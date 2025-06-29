import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import serverless from 'serverless-http';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo (in production, use a real database)
let projects = [
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

const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin'
  }
];

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
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
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
app.get('/projects', async (req, res) => {
  try {
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single project
app.get('/projects/:id', async (req, res) => {
  try {
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
app.post('/projects', authenticateToken, async (req, res) => {
  try {
    const newProject = {
      id: req.body.id || Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.push(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update project
app.put('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const projectIndex = projects.findIndex(p => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json(projects[projectIndex]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete project
app.delete('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const projectIndex = projects.findIndex(p => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects.splice(projectIndex, 1);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const handler = serverless(app);