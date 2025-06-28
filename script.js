// Language translations
const translations = {
    en: {
        // Navigation
        'Home': 'Home',
        'About': 'About',
        'Projects': 'Projects',
        'Experience': 'Experience',
        'Tutorials': 'Tutorials',
        'Contact': 'Contact',
        
        // Hero Section
        'Hi, I\'m ': 'Hi, I\'m ',
        'A future automation engineer': 'A future automation engineer',
        'I build this website to share my projects and experience. Maybe you can find something useful here!': 'I build this website to share my projects and experience. Maybe you can find something useful here!',
        'View Projects': 'View Projects',
        'Get In Touch': 'Get In Touch',
        
        // About Section
        'About Me': 'About Me',
        'I\'m passionate about automation and technology. I love setting myself objectives and sharing my work with the community of makers.': 'I\'m passionate about automation and technology. I love setting myself objectives and sharing my work with the community of makers.',
        'Skills & Technologies': 'Skills & Technologies',
        'Industrial Robotics': 'Industrial Robotics',
        '3D Printing': '3D Printing',
        
        // Projects Section
        'Featured Projects': 'Featured Projects',
        'Automation Project': 'Automation Project',
        'An industrial automation system built with Siemens PLC. Features include real-time monitoring, safety protocols, and efficient production control.': 'An industrial automation system built with Siemens PLC. Features include real-time monitoring, safety protocols, and efficient production control.',
        'Robotics Control System': 'Robotics Control System',
        'A ROS2-based control system for industrial robots with advanced path planning and collision detection capabilities.': 'A ROS2-based control system for industrial robots with advanced path planning and collision detection capabilities.',
        '3D Printing Optimization': '3D Printing Optimization',
        'Custom firmware and slicing algorithms to optimize 3D printing quality and speed for industrial applications.': 'Custom firmware and slicing algorithms to optimize 3D printing quality and speed for industrial applications.',
        'Code': 'Code',
        'Live Demo': 'Live Demo',
        
        // Experience Section
        'Experience': 'Experience',
        'Automation Engineer': 'Automation Engineer',
        'February 2025 - Present': 'February 2025 - Present',
        'Leading the development of full machines for different applications from research to aeronautics.': 'Leading the development of full machines for different applications from research to aeronautics.',
        'Assistant in Electronics Development': 'Assistant in Electronics Development',
        'March 2024 - Present': 'March 2024 - Present',
        'Developing and maintaining electronic systems using modern frameworks. Collaborating with cross-functional teams to deliver high-quality solutions.': 'Developing and maintaining electronic systems using modern frameworks. Collaborating with cross-functional teams to deliver high-quality solutions.',
        'Engineering Student': 'Engineering Student',
        'University': 'University',
        '2019 - 2024': '2019 - 2024',
        'Started my professional journey, learned industry best practices, and contributed to various projects while building foundational skills.': 'Started my professional journey, learned industry best practices, and contributed to various projects while building foundational skills.',
        
        // Tutorials Section
        'Tutorials & Articles': 'Tutorials & Articles',
        'Getting Started with PLC Programming': 'Getting Started with PLC Programming',
        'Learn the fundamentals of PLC programming and how to use them in industrial automation projects effectively.': 'Learn the fundamentals of PLC programming and how to use them in industrial automation projects effectively.',
        'Dec 2023': 'Dec 2023',
        '5 min read': '5 min read',
        'Building Robotic Systems with ROS2': 'Building Robotic Systems with ROS2',
        'A comprehensive guide to creating robust and scalable robotic systems using ROS2 framework.': 'A comprehensive guide to creating robust and scalable robotic systems using ROS2 framework.',
        'Nov 2023': 'Nov 2023',
        '8 min read': '8 min read',
        '3D Printing Best Practices': '3D Printing Best Practices',
        'Essential principles for optimizing 3D printing quality and efficiency in industrial applications.': 'Essential principles for optimizing 3D printing quality and efficiency in industrial applications.',
        'Oct 2023': 'Oct 2023',
        '12 min read': '12 min read',
        'Read More': 'Read More',
        
        // Contact Section
        'Get In Touch': 'Get In Touch',
        'I\'m always interested in new opportunities and collaborations. Feel free to reach out!': 'I\'m always interested in new opportunities and collaborations. Feel free to reach out!',
        
        // Footer
        '&copy; 2024 Radermacker Alexandre. All rights reserved.': '&copy; 2024 Radermacker Alexandre. All rights reserved.'
    },
    fr: {
        // Navigation
        'Home': 'Accueil',
        'About': 'À propos',
        'Projects': 'Projets',
        'Experience': 'Expérience',
        'Tutorials': 'Tutoriels',
        'Contact': 'Contact',
        
        // Hero Section
        'Hi, I\'m ': 'Salut, je suis ',
        'A future automation engineer': 'Un futur ingénieur en automatisation',
        'I build this website to share my projects and experience. Maybe you can find something useful here!': 'J\'ai créé ce site web pour partager mes projets et mon expérience. Peut-être que vous y trouverez quelque chose d\'utile !',
        'View Projects': 'Voir les projets',
        'Get In Touch': 'Me contacter',
        
        // About Section
        'About Me': 'À propos de moi',
        'I\'m passionate about automation and technology. I love setting myself objectives and sharing my work with the community of makers.': 'Je suis passionné par l\'automatisation et la technologie. J\'aime me fixer des objectifs et partager mon travail avec la communauté des makers.',
        'Skills & Technologies': 'Compétences & Technologies',
        'Industrial Robotics': 'Robotique industrielle',
        '3D Printing': 'Impression 3D',
        
        // Projects Section
        'Featured Projects': 'Projets en vedette',
        'Automation Project': 'Projet d\'automatisation',
        'An industrial automation system built with Siemens PLC. Features include real-time monitoring, safety protocols, and efficient production control.': 'Un système d\'automatisation industrielle construit avec un automate Siemens. Les fonctionnalités incluent la surveillance en temps réel, les protocoles de sécurité et le contrôle efficace de la production.',
        'Robotics Control System': 'Système de contrôle robotique',
        'A ROS2-based control system for industrial robots with advanced path planning and collision detection capabilities.': 'Un système de contrôle basé sur ROS2 pour robots industriels avec planification de trajectoire avancée et détection de collision.',
        '3D Printing Optimization': 'Optimisation d\'impression 3D',
        'Custom firmware and slicing algorithms to optimize 3D printing quality and speed for industrial applications.': 'Firmware personnalisé et algorithmes de découpage pour optimiser la qualité et la vitesse d\'impression 3D pour les applications industrielles.',
        'Code': 'Code',
        'Live Demo': 'Démo en direct',
        
        // Experience Section
        'Experience': 'Expérience',
        'Automation Engineer': 'Ingénieur en automatisation',
        'February 2025 - Present': 'Février 2025 - Présent',
        'Leading the development of full machines for different applications from research to aeronautics.': 'Dirigeant le développement de machines complètes pour différentes applications de la recherche à l\'aéronautique.',
        'Assistant in Electronics Development': 'Assistant en développement électronique',
        'March 2024 - Present': 'Mars 2024 - Présent',
        'Developing and maintaining electronic systems using modern frameworks. Collaborating with cross-functional teams to deliver high-quality solutions.': 'Développement et maintenance de systèmes électroniques utilisant des frameworks modernes. Collaboration avec des équipes transversales pour livrer des solutions de haute qualité.',
        'Engineering Student': 'Étudiant ingénieur',
        'University': 'Université',
        '2019 - 2024': '2019 - 2024',
        'Started my professional journey, learned industry best practices, and contributed to various projects while building foundational skills.': 'J\'ai commencé mon parcours professionnel, appris les meilleures pratiques de l\'industrie et contribué à divers projets tout en développant des compétences fondamentales.',
        
        // Tutorials Section
        'Tutorials & Articles': 'Tutoriels & Articles',
        'Getting Started with PLC Programming': 'Débuter avec la programmation d\'automates',
        'Learn the fundamentals of PLC programming and how to use them in industrial automation projects effectively.': 'Apprenez les fondamentaux de la programmation d\'automates et comment les utiliser efficacement dans les projets d\'automatisation industrielle.',
        'Dec 2023': 'Déc 2023',
        '5 min read': '5 min de lecture',
        'Building Robotic Systems with ROS2': 'Construire des systèmes robotiques avec ROS2',
        'A comprehensive guide to creating robust and scalable robotic systems using ROS2 framework.': 'Un guide complet pour créer des systèmes robotiques robustes et évolutifs en utilisant le framework ROS2.',
        'Nov 2023': 'Nov 2023',
        '8 min read': '8 min de lecture',
        '3D Printing Best Practices': 'Meilleures pratiques d\'impression 3D',
        'Essential principles for optimizing 3D printing quality and efficiency in industrial applications.': 'Principes essentiels pour optimiser la qualité et l\'efficacité de l\'impression 3D dans les applications industrielles.',
        'Oct 2023': 'Oct 2023',
        '12 min read': '12 min de lecture',
        'Read More': 'Lire plus',
        
        // Contact Section
        'Get In Touch': 'Me contacter',
        'I\'m always interested in new opportunities and collaborations. Feel free to reach out!': 'Je suis toujours intéressé par de nouvelles opportunités et collaborations. N\'hésitez pas à me contacter !',
        
        // Footer
        '&copy; 2024 Radermacker Alexandre. All rights reserved.': '&copy; 2024 Radermacker Alexandre. Tous droits réservés.'
    }
};

// Current language
let currentLanguage = 'en';

// Language switching function
function switchLanguage(lang) {
    currentLanguage = lang;
    
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
        const key = element.getAttribute(`data-${lang}`);
        if (key && translations[lang] && translations[lang][key]) {
            if (element.innerHTML.includes('&copy;')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Initialize language system
function initializeLanguage() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
    const initialLang = savedLang || browserLang;
    
    switchLanguage(initialLang);
    
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

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
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Active navigation link highlighting
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
function typeWriter(element, text, speed = 100) {
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const highlightSpan = document.querySelector('.hero-title .highlight');
    if (highlightSpan) {
        const originalText = highlightSpan.textContent;
        highlightSpan.textContent = '';
        setTimeout(() => {
            typeWriter(highlightSpan, originalText, 50);
        }, 500);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
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
    
    .nav-link.active {
        color: var(--accent-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Form validation and submission (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy loading for images (when you add real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Theme toggle functionality (for future enhancement)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    // Initialize language system
    initializeLanguage();
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    highlightNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);