// Translations for Portfolio
const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            experience: "Experience",
            research: "Research",
            skills: "Skills",
            projects: "Projects",
            achievements: "Achievements",
            contact: "Contact"
        },
        // Hero Section
        hero: {
            greeting: "Hi, I'm",
            name: "Md Saiful Islam",
            roles: [
                'Software Engineer',
                'Backend Developer',
                'AI Researcher',
                'Problem Solver'
            ],
            description: "Software Engineer specializing in Backend Development with Go and AI Research. Currently pursuing MSc in Data Science at TU Dortmund University.",
            getInTouch: "Get In Touch",
            downloadCV: "Download CV"
        },
        // About Section
        about: {
            title: "About Me",
            subtitle: "Get to know me better",
            intro: "I'm a passionate Software Engineer with expertise in backend development and a strong foundation in AI research. Currently working at Shikho Technologies, I specialize in building scalable microservices using Go, gRPC, and modern cloud technologies.",
            stats: {
                experience: "Years Experience",
                companies: "Companies Worked",
                publications: "Publications",
                problems: "Problems Solved"
            },
            education: {
                title: "Education",
                msc: {
                    degree: "MSc in Data Science",
                    university: "TU Dortmund University",
                    location: "Dortmund, Germany",
                    date: "Starting April 2026"
                },
                bsc: {
                    degree: "BSc in Computer Science and Engineering",
                    university: "Jagannath University",
                    location: "Dhaka, Bangladesh",
                    date: "Jan 2018 - Jan 2023",
                    gpa: "CGPA: 3.40/4.0 | Last Sem GPA: 3.96/4.0"
                }
            }
        },
        // Experience Section
        experience: {
            title: "Software Engineering Experience",
            subtitle: "My professional journey in software development",
            jobs: {
                shikho: {
                    title: "Software Engineer (Backend)",
                    company: "Shikho Technologies Bangladesh Limited",
                    date: "July 2023 - Present",
                    location: "Dhaka, Hybrid",
                    responsibilities: [
                        "Researched, designed, and implemented KPI service for data sync between PostgresDB and MongoDB using MongoStream",
                        "Designed low level APIs and developed Analytics service for report-card using Nats, MongoStream, GORM (Bun)",
                        "Implemented low level features for portal and CMS including sorting order, 100ms live-class integration, 2Factor OTP integration",
                        "Maintained technical documentation using Postman and ClickUp"
                    ]
                },
                ahom: {
                    title: "Blockchain Developer (Intern)",
                    company: "AHOM Limited",
                    date: "May 2023 - July 2023",
                    location: "Dhaka, Remote",
                    responsibilities: [
                        "Studied and reverse-engineered selected modules of the Cosmos SDK"
                    ]
                },
                smartbridge: {
                    title: "Student Partner (Intern)",
                    company: "SmartBridge",
                    date: "Mar 2021 - June 2021",
                    location: "India, Remote",
                    responsibilities: [
                        "Built a project named Smart Attendance System using OpenCV and Flask"
                    ]
                }
            }
        },
        // Research Section
        research: {
            title: "AI Research & Publications",
            subtitle: "My contributions to AI and blockchain research",
            viewPaper: "View Paper",
            publications: [
                {
                    title: "IoT Framework for Chronic Kidney Disease Detection Using Deep Learning",
                    authors: "M. M. Ali, M. S. Islam, M. N. Uddin, and M. A. Uddin",
                    venue: "Intelligence-Based Medicine, Volume 10, 2024",
                    description: "A conceptual IoT framework based on ANOVA-F feature selection for chronic kidney disease detection using deep learning approach.",
                    tags: ["Deep Learning", "IoT", "Healthcare", "Feature Selection"]
                },
                {
                    title: "A Blockchain-Based Digital Classified Forensic Image Preservation Framework",
                    authors: "M. S. Islam, M. M. Ali, M. N. Uddin, et al.",
                    venue: "Authorea, 2024",
                    description: "A novel framework for preserving digital forensic images using blockchain technology to ensure data integrity and classification.",
                    tags: ["Blockchain", "Digital Forensics", "Security", "Image Processing"]
                }
            ]
        },
        // Skills Section
        skills: {
            title: "Skills & Technologies",
            subtitle: "My technical expertise",
            categories: {
                backend: "Backend Development",
                frontend: "Frontend Development",
                devops: "DevOps & Cloud",
                ai: "AI & Machine Learning",
                databases: "Databases",
                other: "Other Technologies"
            }
        },
        // Projects Section
        projects: {
            title: "Featured Projects",
            subtitle: "Some of my notable work",
            list: [
                {
                    title: "ORDER-NEST",
                    description: "Developed an order management system with low-level design and user authentication using Golang and GORM. Features include order processing, inventory management, and role-based access control.",
                    link: "View Code"
                },
                {
                    title: "BOOKS-AUTHORS",
                    description: "Implemented REST and GraphQL APIs for book and author management using Golang, JWT for authentication, Zap for logging, and Prometheus for monitoring. Supports CRUD operations and advanced queries.",
                    link: "View Code"
                },
                {
                    title: "Smart Attendance System",
                    description: "Built an intelligent attendance system using computer vision and machine learning. Uses OpenCV for face detection and recognition, with a Flask web interface for easy management.",
                    link: "View Code"
                }
            ]
        },
        // Achievements Section
        achievements: {
            title: "Achievements & Awards",
            subtitle: "Recognition for my work",
            companyAcademic: {
                title: "Company and Academic Achievement",
                list: [
                    {
                        title: "Academic Excellence",
                        description: "Last Semester GPA: 3.96/4.0 at Jagannath University"
                    },
                    {
                        title: "Microsoft MSLA",
                        description: "Beta Level Achievement"
                    },
                    {
                        title: "JnU IEEE Student Branch",
                        description: "Organizing Secretary"
                    },
                    {
                        title: "Cheese Ownership",
                        description: "Q1 2025 - Shikho Technologies Bangladesh Limited"
                    }
                ]
            },
            hackathons: {
                title: "Hackathons",
                list: [
                    {
                        name: "Affine Blockchain Hackathon 2022",
                        rank: "Top 9 out of 50 teams",
                        team: "Team: Crying-Obsidian"
                    },
                    {
                        name: "BUET Blockchain Hackathon 2022",
                        rank: "Top 12 out of 50 teams",
                        team: "Team: Crying-Obsidian"
                    },
                    {
                        name: "Code Samurai Hackathon 2022",
                        rank: "Top 43 out of 500 teams",
                        team: "Team: Crying-Obsidian"
                    }
                ]
            },
            problemSolving: {
                title: "Problem Solving",
                list: [
                    {
                        platform: "GeeksforGeeks",
                        achievement: "Rank 2 at Jagannath University"
                    },
                    {
                        platform: "LeetCode",
                        achievement: "200+ problems solved"
                    },
                    {
                        platform: "HackerRank",
                        achievement: "5★ Coder"
                    },
                    {
                        platform: "Multiple Platforms",
                        achievement: "500+ problems on Codeforces, CodeChef, LightOJ, UVa"
                    }
                ]
            },
            community: {
                title: "Open Source & Community",
                list: [
                    {
                        event: "Hacktoberfest 2020",
                        achievement: "Winner"
                    },
                    {
                        event: "Hacktoberfest 2022",
                        achievement: "Contributor"
                    }
                ]
            }
        },
        // Contact Section
        contact: {
            title: "Get In Touch",
            subtitle: "Let's work together",
            email: "Email",
            phone: "Phone",
            location: "Location",
            locationText: "Dhaka, Bangladesh",
            locationText2: "Moving to Dortmund, Germany (April 2026)",
            connectWith: "Connect with me"
        },
        // Footer
        footer: {
            rights: "All rights reserved.",
            built: "Built with",
            and: "and",
            passion: "passion"
        }
    },
    de: {
        // Navigation
        nav: {
            home: "Startseite",
            about: "Über mich",
            experience: "Erfahrung",
            research: "Forschung",
            skills: "Fähigkeiten",
            projects: "Projekte",
            achievements: "Erfolge",
            contact: "Kontakt"
        },
        // Hero Section
        hero: {
            greeting: "Hallo, ich bin",
            name: "Md Saiful Islam",
            roles: [
                'Software Engineer',
                'Backend-Entwickler',
                'KI-Forscher',
                'Problemlöser'
            ],
            description: "Software Engineer mit Schwerpunkt Backend-Entwicklung mit Go und KI-Forschung. Derzeit verfolge ich einen MSc in Data Science an der TU Dortmund.",
            getInTouch: "Kontaktieren",
            downloadCV: "Lebenslauf herunterladen"
        },
        // About Section
        about: {
            title: "Über mich",
            subtitle: "Lernen Sie mich besser kennen",
            intro: "Ich bin ein leidenschaftlicher Software Engineer mit Expertise in Backend-Entwicklung und einer starken Grundlage in KI-Forschung. Derzeit arbeite ich bei Shikho Technologies und spezialisiere mich auf die Entwicklung skalierbarer Microservices mit Go, gRPC und modernen Cloud-Technologien.",
            stats: {
                experience: "Jahre Erfahrung",
                companies: "Unternehmen",
                publications: "Veröffentlichungen",
                problems: "Gelöste Probleme"
            },
            education: {
                title: "Ausbildung",
                msc: {
                    degree: "MSc in Data Science",
                    university: "TU Dortmund",
                    location: "Dortmund, Deutschland",
                    date: "Ab April 2026"
                },
                bsc: {
                    degree: "BSc in Informatik und Ingenieurwesen",
                    university: "Jagannath Universität",
                    location: "Dhaka, Bangladesch",
                    date: "Jan 2018 - Jan 2023",
                    gpa: "Durchschnitt: 3.40/4.0 | Letztes Semester: 3.96/4.0"
                }
            }
        },
        // Experience Section
        experience: {
            title: "Software Engineering Erfahrung",
            subtitle: "Meine berufliche Entwicklung in der Softwareentwicklung",
            jobs: {
                shikho: {
                    title: "Software Engineer (Backend)",
                    company: "Shikho Technologies Bangladesh Limited",
                    date: "Juli 2023 - Heute",
                    location: "Dhaka, Hybrid",
                    responsibilities: [
                        "Recherchiert, entworfen und implementiert KPI-Service für Datensynchronisation zwischen PostgresDB und MongoDB mit MongoStream",
                        "Low-Level-APIs entworfen und Analytics-Service für Zeugnis entwickelt mit Nats, MongoStream, GORM (Bun)",
                        "Low-Level-Features für Portal und CMS implementiert, einschließlich Sortierreihenfolge, 100ms Live-Klassen-Integration, 2-Faktor-OTP-Integration",
                        "Technische Dokumentation mit Postman und ClickUp gepflegt"
                    ]
                },
                ahom: {
                    title: "Blockchain-Entwickler (Praktikant)",
                    company: "AHOM Limited",
                    date: "Mai 2023 - Juli 2023",
                    location: "Dhaka, Remote",
                    responsibilities: [
                        "Ausgewählte Module des Cosmos SDK studiert und rückentwickelt"
                    ]
                },
                smartbridge: {
                    title: "Studentischer Partner (Praktikant)",
                    company: "SmartBridge",
                    date: "März 2021 - Juni 2021",
                    location: "Indien, Remote",
                    responsibilities: [
                        "Ein Projekt namens Smart Attendance System mit OpenCV und Flask entwickelt"
                    ]
                }
            }
        },
        // Research Section
        research: {
            title: "KI-Forschung & Veröffentlichungen",
            subtitle: "Meine Beiträge zur KI- und Blockchain-Forschung",
            viewPaper: "Paper ansehen",
            publications: [
                {
                    title: "IoT-Framework zur Erkennung chronischer Nierenerkrankungen mit Deep Learning",
                    authors: "M. M. Ali, M. S. Islam, M. N. Uddin, und M. A. Uddin",
                    venue: "Intelligence-Based Medicine, Band 10, 2024",
                    description: "Ein konzeptionelles IoT-Framework basierend auf ANOVA-F-Merkmalsauswahl zur Erkennung chronischer Nierenerkrankungen mit Deep-Learning-Ansatz.",
                    tags: ["Deep Learning", "IoT", "Gesundheitswesen", "Merkmalsauswahl"]
                },
                {
                    title: "Blockchain-basiertes Framework zur Aufbewahrung klassifizierter digitaler forensischer Bilder",
                    authors: "M. S. Islam, M. M. Ali, M. N. Uddin, et al.",
                    venue: "Authorea, 2024",
                    description: "Ein neuartiges Framework zur Aufbewahrung digitaler forensischer Bilder mithilfe der Blockchain-Technologie zur Gewährleistung der Datenintegrität und Klassifizierung.",
                    tags: ["Blockchain", "Digitale Forensik", "Sicherheit", "Bildverarbeitung"]
                }
            ]
        },
        // Skills Section
        skills: {
            title: "Fähigkeiten & Technologien",
            subtitle: "Meine technische Expertise",
            categories: {
                backend: "Backend-Entwicklung",
                frontend: "Frontend-Entwicklung",
                devops: "DevOps & Cloud",
                ai: "KI & Machine Learning",
                databases: "Datenbanken",
                other: "Weitere Technologien"
            }
        },
        // Projects Section
        projects: {
            title: "Ausgewählte Projekte",
            subtitle: "Einige meiner bemerkenswerten Arbeiten",
            list: [
                {
                    title: "ORDER-NEST",
                    description: "Entwicklung eines Auftragsverwaltungssystems mit Low-Level-Design und Benutzerauthentifizierung mit Golang und GORM. Funktionen umfassen Auftragsverarbeitung, Bestandsverwaltung und rollenbasierte Zugriffskontrolle.",
                    link: "Code ansehen"
                },
                {
                    title: "BOOKS-AUTHORS",
                    description: "Implementierung von REST- und GraphQL-APIs für Buch- und Autorenverwaltung mit Golang, JWT für Authentifizierung, Zap für Logging und Prometheus für Monitoring. Unterstützt CRUD-Operationen und erweiterte Abfragen.",
                    link: "Code ansehen"
                },
                {
                    title: "Intelligentes Anwesenheitssystem",
                    description: "Entwicklung eines intelligenten Anwesenheitssystems mit Computer Vision und maschinellem Lernen. Verwendet OpenCV zur Gesichtserkennung mit einer Flask-Weboberfläche für einfache Verwaltung.",
                    link: "Code ansehen"
                }
            ]
        },
        // Achievements Section
        achievements: {
            title: "Erfolge & Auszeichnungen",
            subtitle: "Anerkennung für meine Arbeit",
            companyAcademic: {
                title: "Unternehmens- und akademische Erfolge",
                list: [
                    {
                        title: "Akademische Exzellenz",
                        description: "Letztes Semester Durchschnitt: 3.96/4.0 an der Jagannath Universität"
                    },
                    {
                        title: "Microsoft MSLA",
                        description: "Beta Level Auszeichnung"
                    },
                    {
                        title: "JnU IEEE Student Branch",
                        description: "Organisationssekretär"
                    },
                    {
                        title: "Cheese Ownership",
                        description: "Q1 2025 - Shikho Technologies Bangladesh Limited"
                    }
                ]
            },
            hackathons: {
                title: "Hackathons",
                list: [
                    {
                        name: "Affine Blockchain Hackathon 2022",
                        rank: "Top 9 von 50 Teams",
                        team: "Team: Crying-Obsidian"
                    },
                    {
                        name: "BUET Blockchain Hackathon 2022",
                        rank: "Top 12 von 50 Teams",
                        team: "Team: Crying-Obsidian"
                    },
                    {
                        name: "Code Samurai Hackathon 2022",
                        rank: "Top 43 von 500 Teams",
                        team: "Team: Crying-Obsidian"
                    }
                ]
            },
            problemSolving: {
                title: "Problemlösung",
                list: [
                    {
                        platform: "GeeksforGeeks",
                        achievement: "Rang 2 an der Jagannath Universität"
                    },
                    {
                        platform: "LeetCode",
                        achievement: "Über 200 gelöste Probleme"
                    },
                    {
                        platform: "HackerRank",
                        achievement: "5★ Programmierer"
                    },
                    {
                        platform: "Mehrere Plattformen",
                        achievement: "Über 500 Probleme auf Codeforces, CodeChef, LightOJ, UVa"
                    }
                ]
            },
            community: {
                title: "Open Source & Community",
                list: [
                    {
                        event: "Hacktoberfest 2020",
                        achievement: "Gewinner"
                    },
                    {
                        event: "Hacktoberfest 2022",
                        achievement: "Mitwirkender"
                    }
                ]
            }
        },
        // Contact Section
        contact: {
            title: "Kontaktieren Sie mich",
            subtitle: "Lassen Sie uns zusammenarbeiten",
            email: "E-Mail",
            phone: "Telefon",
            location: "Standort",
            locationText: "Dhaka, Bangladesch",
            locationText2: "Umzug nach Dortmund, Deutschland (April 2026)",
            connectWith: "Verbinden Sie sich mit mir"
        },
        // Footer
        footer: {
            rights: "Alle Rechte vorbehalten.",
            built: "Erstellt mit",
            and: "und",
            passion: "Leidenschaft"
        }
    }
};
