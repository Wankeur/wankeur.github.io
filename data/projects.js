// Project data - Easy to edit and add new projects
const projects = [
    {
        id: "final-year-project",
        title: {
            en: "Final Year Automation Project",
            fr: "Travail de fin d'études en automatisation"
        },
        description: {
            en: "A full custom machine build for research on insulated panels.",
            fr: "Une machine entièrement personnalisée construite pour de la recherche sur des panneaux isolants."
        },
        image: "Images/projects/final-year-project/main.jpg", // Main project image
        gallery: [ // Additional images for gallery
            "Images/projects/final-year-project/gallery1.jpg",
            "Images/projects/final-year-project/gallery2.jpg",
            "Images/projects/final-year-project/gallery3.jpg"
        ],
        icon: "fas fa-robot",
        status: "completed", // completed, in-progress, planning
        date: {
            en: "Completed: June 2025",
            fr: "Terminé : Juin 2025"
        },
        duration: {
            en: "Duration: 6 months",
            fr: "Durée : 6 mois"
        },
        technologies: ["Siemens", "TIA Portal", "HMI", "SCADA"],
        featured: true, // Show on homepage
        details: {
            overview: {
                en: "This final year project involved designing and building a complete custom machine for research on insulated panels. The machine was developed to test thermal properties and structural integrity of various insulation materials used in construction and industrial applications.",
                fr: "Ce projet de fin d'études consistait à concevoir et construire une machine personnalisée complète pour la recherche sur les panneaux isolants. La machine a été développée pour tester les propriétés thermiques et l'intégrité structurelle de divers matériaux d'isolation utilisés dans la construction et les applications industrielles."
            },
            features: [
                {
                    en: "Automated testing sequences for thermal conductivity",
                    fr: "Séquences de test automatisées pour la conductivité thermique"
                },
                {
                    en: "Precision temperature control and monitoring",
                    fr: "Contrôle et surveillance précis de la température"
                },
                {
                    en: "Data logging and analysis capabilities",
                    fr: "Capacités d'enregistrement et d'analyse des données"
                }
            ],
            challenges: [
                {
                    title: {
                        en: "Precise Temperature Control",
                        fr: "Contrôle précis de la température"
                    },
                    description: {
                        en: "Maintaining stable temperatures across different test zones while minimizing thermal interference.",
                        fr: "Maintenir des températures stables dans différentes zones de test tout en minimisant les interférences thermiques."
                    },
                    solution: {
                        en: "Implemented PID control algorithms with zone-specific heating elements and thermal isolation barriers.",
                        fr: "Mise en place d'algorithmes de contrôle PID avec des éléments chauffants spécifiques aux zones et des barrières d'isolation thermique."
                    }
                }
            ],
            results: [
                {
                    value: "±0.1°C",
                    label: {
                        en: "Temperature Accuracy",
                        fr: "Précision de température"
                    }
                },
                {
                    value: "50+",
                    label: {
                        en: "Samples Tested",
                        fr: "Échantillons testés"
                    }
                },
                {
                    value: "95%",
                    label: {
                        en: "Test Repeatability",
                        fr: "Répétabilité des tests"
                    }
                }
            ],
            projectDetails: {
                institution: "Henallux",
                role: {
                    en: "Lead Developer",
                    fr: "Développeur principal"
                },
                teamSize: "1 student",
                grade: {
                    en: "Distinction",
                    fr: "Grande distinction"
                }
            },
            links: [
                {
                    title: {
                        en: "Final Report",
                        fr: "Rapport final"
                    },
                    icon: "fas fa-file-pdf",
                    url: "#"
                },
                {
                    title: {
                        en: "Project Gallery",
                        fr: "Galerie du projet"
                    },
                    icon: "fas fa-images",
                    url: "#"
                }
            ]
        }
    },
    {
        id: "tfe-desimone",
        title: {
            en: "Industrial Automation System - Desimone",
            fr: "Système d'automatisation industrielle - Desimone"
        },
        description: {
            en: "Complete programming of a special machine for a research and development center, creating prototypes of insulating panels.",
            fr: "Programmation complète d'une machine spéciale destinée à un centre recherche et développement pour créer des prototypes de panneaux isolants."
        },
        image: "Images/projects/tfe-desimone/main.jpg",
        gallery: [
            "Images/projects/tfe-desimone/gallery1.jpg",
            "Images/projects/tfe-desimone/gallery2.jpg",
            "Images/projects/tfe-desimone/gallery3.jpg"
        ],
        icon: "fas fa-industry",
        status: "completed",
        date: {
            en: "Completed: June 2025",
            fr: "Terminé : Juin 2025"
        },
        duration: {
            en: "Duration: 4 months",
            fr: "Durée : 4 mois"
        },
        technologies: ["Siemens", "TIA Portal", "HMI", "WinCC Unified"],
        featured: true,
        details: {
            overview: {
                en: "This project involved the complete programming of a special machine intended for a research and development center. It was carried out as part of my final year internship in automation. This machine is designed to create prototypes of insulating panels.",
                fr: "Ce projet à consisté a la programmation complète d'une machine spéciale destinée à un centre recherche et développement. Il a été réalisé dans le cadre de mon stage de fin d'études en automatisation. Cette machine a pour but de réaliser des prototypes de panneaux isolants."
            },
            features: [
                {
                    en: "Complete management of manufacturing parameters",
                    fr: "Gestion complète des paramètres de fabrication"
                },
                {
                    en: "Revamping of an old hydraulic press",
                    fr: "Revamping d'une ancienne presse hydraulique"
                },
                {
                    en: "Production data logging and analytics",
                    fr: "Rapport au format excel des données mesurée et encodée en fin de cycle"
                },
                {
                    en: "Position and temperature regulation",
                    fr: "Régulation de position et de température"
                }
            ],
            challenges: [
                {
                    title: {
                        en: "Precise Regulation with an Old Press",
                        fr: "Régulation précise avec une vieille presse"
                    },
                    description: {
                        en: "The old press was not designed for the precision required by the client.",
                        fr: "L'ancienne presse réutilisée n'était pas prévue pour être précise tel que le client l'exigeait."
                    },
                    solution: {
                        en: "Implemented a new control algorithm and two different ascent speeds to improve precision.",
                        fr: "Mise en place d'une regulation et de deux vitesse de montée différente pour améliorer la précision."
                    }
                }
            ],
            results: [
                {
                    value: "0.1 mm",
                    label: {
                        en: "Positioning Precision",
                        fr: "Précision de positionnement"
                    }
                },
                {
                    value: "3 mins",
                    label: {
                        en: "Cycle Duration",
                        fr: "Durée du cycle"
                    }
                },
                {
                    value: "1 °C",
                    label: {
                        en: "Temperature Precision",
                        fr: "Précision de la température"
                    }
                }
            ],
            projectDetails: {
                client: "Desimone",
                role: {
                    en: "Automation Programmer",
                    fr: "Automaticien"
                },
                teamSize: "2 Automation Programmers, 1 Electrical Engineer, 1 Mechanical Engineer",
                budget: "€180,000"
            },
            links: [
                {
                    title: {
                        en: "Technical Documentation",
                        fr: "Documentation technique"
                    },
                    icon: "fas fa-file-pdf",
                    url: "#"
                },
                {
                    title: {
                        en: "Demo Video",
                        fr: "Vidéo de démonstration"
                    },
                    icon: "fas fa-video",
                    url: "#"
                }
            ]
        }
    },
    {
        id: "robotics-control",
        title: {
            en: "ROS2 Robotics Control System",
            fr: "Système de contrôle robotique ROS2"
        },
        description: {
            en: "A ROS2-based control system for industrial robots with advanced path planning and collision detection capabilities.",
            fr: "Un système de contrôle basé sur ROS2 pour robots industriels avec planification de trajectoire avancée et détection de collision."
        },
        image: "Images/projects/robotics-control/main.jpg",
        gallery: [
            "Images/projects/robotics-control/gallery1.jpg",
            "Images/projects/robotics-control/gallery2.jpg"
        ],
        icon: "fas fa-cog",
        status: "in-progress",
        date: {
            en: "In Progress: Started January 2024",
            fr: "En cours : Commencé en janvier 2024"
        },
        duration: {
            en: "Expected Duration: 8 months",
            fr: "Durée prévue : 8 mois"
        },
        technologies: ["ROS2", "C++", "Python", "Gazebo"],
        featured: true,
        details: {
            overview: {
                en: "Development of an advanced robotics control system using ROS2 framework for industrial applications. The system focuses on precise motion control, path planning, and real-time collision detection for robotic arms in manufacturing environments.",
                fr: "Développement d'un système de contrôle robotique avancé utilisant le framework ROS2 pour les applications industrielles. Le système se concentre sur le contrôle de mouvement précis, la planification de trajectoire et la détection de collision en temps réel pour les bras robotiques dans les environnements de fabrication."
            },
            features: [
                {
                    en: "Motion Controller Node (C++)",
                    fr: "Nœud de contrôleur de mouvement (C++)"
                },
                {
                    en: "Path Planning Service (Python)",
                    fr: "Service de planification de trajectoire (Python)"
                },
                {
                    en: "Sensor Fusion Node",
                    fr: "Nœud de fusion de capteurs"
                }
            ],
            projectDetails: {
                role: {
                    en: "Lead Developer",
                    fr: "Développeur principal"
                },
                teamSize: "2 developers",
                targetRobot: "6-DOF Industrial Arm"
            }
        }
    },
    {
        id: "3d-printing-optimization",
        title: {
            en: "3D Printing Optimization Suite",
            fr: "Suite d'optimisation d'impression 3D"
        },
        description: {
            en: "Custom firmware and slicing algorithms to optimize 3D printing quality and speed for industrial applications.",
            fr: "Firmware personnalisé et algorithmes de découpage pour optimiser la qualité et la vitesse d'impression 3D pour les applications industrielles."
        },
        image: "Images/projects/3d-printing/main.jpg",
        gallery: [],
        icon: "fas fa-cube",
        status: "completed",
        date: {
            en: "Completed: October 2023",
            fr: "Terminé : Octobre 2023"
        },
        duration: {
            en: "Duration: 4 months",
            fr: "Durée : 4 mois"
        },
        technologies: ["C++", "Marlin", "CAD", "Python"],
        featured: true,
        details: {
            overview: {
                en: "A comprehensive optimization suite for 3D printing that includes custom firmware modifications, advanced slicing algorithms, and quality control systems.",
                fr: "Une suite d'optimisation complète pour l'impression 3D qui comprend des modifications de firmware personnalisées, des algorithmes de découpage avancés et des systèmes de contrôle qualité."
            }
        }
    },
    {
        id: "iot-monitoring",
        title: {
            en: "IoT Monitoring Dashboard",
            fr: "Tableau de bord de surveillance IoT"
        },
        description: {
            en: "Real-time monitoring system for industrial equipment using IoT sensors and cloud analytics.",
            fr: "Système de surveillance en temps réel pour équipements industriels utilisant des capteurs IoT et l'analyse cloud."
        },
        image: "Images/projects/iot-monitoring/main.jpg",
        gallery: [],
        icon: "fas fa-wifi",
        status: "planning",
        date: {
            en: "Planning Phase: 2025",
            fr: "Phase de planification : 2025"
        },
        duration: {
            en: "Expected Duration: 4 months",
            fr: "Durée prévue : 4 mois"
        },
        technologies: ["Arduino", "ESP32", "MQTT", "Node.js"],
        featured: false,
        details: {
            overview: {
                en: "Development of a comprehensive IoT monitoring system for industrial equipment.",
                fr: "Développement d'un système de surveillance IoT complet pour les équipements industriels."
            }
        }
    },
    {
        id: "cnc-controller",
        title: {
            en: "Custom CNC Controller",
            fr: "Contrôleur CNC personnalisé"
        },
        description: {
            en: "High-precision CNC controller with custom G-code interpreter and advanced motion control algorithms.",
            fr: "Contrôleur CNC haute précision avec interpréteur G-code personnalisé et algorithmes de contrôle de mouvement avancés."
        },
        image: "Images/projects/cnc-controller/main.jpg",
        gallery: [],
        icon: "fas fa-tools",
        status: "in-progress",
        date: {
            en: "In Progress: Started March 2024",
            fr: "En cours : Commencé en mars 2024"
        },
        duration: {
            en: "Expected Duration: 6 months",
            fr: "Durée prévue : 6 mois"
        },
        technologies: ["C++", "Real-time", "G-code", "Motion Control"],
        featured: false,
        details: {
            overview: {
                en: "Development of a high-precision CNC controller with custom G-code interpreter.",
                fr: "Développement d'un contrôleur CNC haute précision avec interpréteur G-code personnalisé."
            }
        }
    },
    {
        id: "machine-vision",
        title: {
            en: "Machine Vision Quality Control",
            fr: "Contrôle qualité par vision machine"
        },
        description: {
            en: "AI-powered quality control system using computer vision for automated defect detection.",
            fr: "Système de contrôle qualité alimenté par IA utilisant la vision par ordinateur pour la détection automatisée de défauts."
        },
        image: "Images/projects/machine-vision/main.jpg",
        gallery: [],
        icon: "fas fa-eye",
        status: "completed",
        date: {
            en: "Completed: January 2024",
            fr: "Terminé : Janvier 2024"
        },
        duration: {
            en: "Duration: 5 months",
            fr: "Durée : 5 mois"
        },
        technologies: ["OpenCV", "Python", "TensorFlow", "Machine Learning"],
        featured: false,
        details: {
            overview: {
                en: "Development of an AI-powered quality control system using computer vision.",
                fr: "Développement d'un système de contrôle qualité alimenté par IA utilisant la vision par ordinateur."
            }
        }
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projects;
}