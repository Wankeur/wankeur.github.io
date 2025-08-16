import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.tutorials': 'Tutorials',
    'nav.founder': 'Founder',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    
    // Hero Section
    'hero.welcome': 'Welcome to',
    'hero.subtitle': 'Resources for automated systems by Alexandre Radermacker',
    'hero.description': 'DÆDALE stands for **Dynamics Automation & Electronics for Digital Advanced Learning in Engineering**. This project aims to build a project sharing and learning platform for anyone.',
    'hero.viewProjects': 'View Projects',
    'hero.contact': 'Contact Me',
    
    // About Section
    'about.title': 'About DÆDALE',
    'about.mission': 'Our Mission',
    'about.missionDesc': 'To create the most comprehensive and accessible platform for automation knowledge sharing.',
    'about.community': 'Community',
    'about.communityDesc': 'Building a global community of automation engineers and enthusiasts.',
    'about.innovation': 'Innovation',
    'about.innovationDesc': 'Driving technological advancement through collaborative learning.',
    'about.projectVision': 'Project Vision',
    'about.projectVisionDesc': 'DÆDALE aims to bridge the gap between academic knowledge and practical implementation in automation. We provide a platform where engineers can share real-world projects, learn from each other, and contribute to the advancement of the automation industry.',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Discover the latest automation and robotics projects',
    'projects.viewDetails': 'View Details',
    'projects.viewAll': 'View All Projects',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Let\'s discuss your automation projects',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.description': 'Platform for sharing automation and robotics projects.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.followMe': 'Follow Me',
    'footer.rights': 'All rights reserved.',
    
    // Founder Section
    'founder.title': 'About the Founder',
    'founder.bio1': 'Still studying to obtain an engineering degree, I already have a Bachelor\'s degree in Automation, a field I am passionate about.',
    'founder.bio2': 'During my experience learning and working on projects, I never found a platform that allows easy and intuitive knowledge sharing. This is why I created my project: to share knowledge and resources with others, especially anything related to automation.',
    'founder.skillsTitle': 'Skills & Technologies',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    
    // Auth
    'auth.signedOut': 'Signed out',
    'auth.signedOutDesc': 'You have been successfully signed out.',
    'auth.signOutError': 'Failed to sign out. Please try again.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.experience': 'Expérience',
    'nav.tutorials': 'Tutoriels',
    'nav.founder': 'Fondateur',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Tableau de bord',
    'nav.signIn': 'Se connecter',
    'nav.signOut': 'Se déconnecter',
    
    // Hero Section
    'hero.welcome': 'Bienvenue sur',
    'hero.subtitle': 'Des ressources pour systèmes automatisés par Alexandre Radermacker',
    'hero.description': 'DÆDALE signifie **Dynamics Automation & Electronics for Digital Advanced Learning in Engineering**. Ce projet vise à créer une plateforme de partage de projets et d\'apprentissage pour tous.',
    'hero.viewProjects': 'Voir les projets',
    'hero.contact': 'Me contacter',
    
    // About Section
    'about.title': 'À propos de DÆDALE',
    'about.mission': 'Notre Mission',
    'about.missionDesc': 'Créer la plateforme la plus complète et accessible pour le partage de connaissances en automatisation.',
    'about.community': 'Communauté',
    'about.communityDesc': 'Construire une communauté mondiale d\'ingénieurs et de passionnés d\'automatisation.',
    'about.innovation': 'Innovation',
    'about.innovationDesc': 'Stimuler l\'avancement technologique grâce à l\'apprentissage collaboratif.',
    'about.projectVision': 'Vision du Projet',
    'about.projectVisionDesc': 'DÆDALE vise à combler le fossé entre les connaissances académiques et la mise en œuvre pratique en automatisation. Nous fournissons une plateforme où les ingénieurs peuvent partager des projets concrets, apprendre les uns des autres et contribuer à l\'avancement de l\'industrie de l\'automatisation.',
    
    // Projects Section
    'projects.title': 'Projets en Vedette',
    'projects.subtitle': 'Découvrez les derniers projets d\'automatisation et de robotique',
    'projects.viewDetails': 'Voir les détails',
    'projects.viewAll': 'Voir tous les projets',
    
    // Contact Section
    'contact.title': 'Contactez-moi',
    'contact.subtitle': 'Discutons de vos projets d\'automatisation',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le message',
    
    // Footer
    'footer.description': 'Plateforme de partage de projets d\'automatisation et de robotique.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.contact': 'Contact',
    'footer.followMe': 'Suivez-moi',
    'footer.rights': 'Tous droits réservés.',
    
    // Founder Section
    'founder.title': 'À propos du Fondateur',
    'founder.bio1': 'Encore étudiant pour obtenir un diplôme d\'ingénieur, j\'ai déjà un diplôme de Bachelor en Automatisation, un domaine qui me passionne.',
    'founder.bio2': 'Pendant mon expérience d\'apprentissage et de travail sur des projets, je n\'ai jamais trouvé de plateforme permettant un partage de connaissances facile et intuitif. C\'est pourquoi j\'ai créé mon projet : partager des connaissances et des ressources avec d\'autres, surtout tout ce qui concerne l\'automatisation.',
    'founder.skillsTitle': 'Compétences et Technologies',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.submit': 'Soumettre',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.back': 'Retour',
    
    // Auth
    'auth.signedOut': 'Déconnecté',
    'auth.signedOutDesc': 'Vous avez été déconnecté avec succès.',
    'auth.signOutError': 'Échec de la déconnexion. Veuillez réessayer.',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};