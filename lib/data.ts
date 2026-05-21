import { ApplicationResponse, Deliverable, DeliverableDTO, TaskProps } from "@/types";

  export const tasksA:TaskProps[] = [
      {
        id: 'task_001',
        client_id: 'client_001',
        title: 'Création API REST pour application de réservation',
        description: 'Développer une API complète avec authentification JWT, documentation Swagger, endpoints pour gérer les réservations, utilisateurs et paiements.',
        budget: 2500,
        deadline: '2026-06-15',
        status: 'EN_COURS',
        created_at: '2026-04-01T10:30:00Z',
      },
      {
        id: 'task_002',
        client_id: 'client_002',
        title: 'Refonte UI/UX du tableau de bord utilisateur',
        description: 'Redesign complet de l’interface dashboard avec maquettes Figma, intégration responsive et optimisation des performances.',
        budget: 1200,
        deadline: '2026-05-30',
        status: 'OUVERTE',
        created_at: '2026-04-10T08:45:00Z',
      },
      {
        id: 'task_003',
        client_id: 'client_003',
        title: 'Migration base de données PostgreSQL vers MySQL',
        description: 'Migrer 500Go de données avec scripts de conversion, validation des données et mise en place de réplication.',
        budget: 3800,
        deadline: '2026-07-10',
        status: 'LIVREE',
        created_at: '2026-03-15T14:20:00Z',
      },
      {
        id: 'task_004',
        client_id: 'client_001',
        title: 'Intégration du widget de paiement FedaPay',
        description: 'Intégrer FedaPay checkout.js sur la page de paiement, gérer les webhooks et implémenter l’escrow.',
        budget: 950,
        deadline: '2026-05-20',
        status: 'OUVERTE',
        created_at: '2026-04-18T09:12:00Z',
      },
      {
        id: 'task_005',
        client_id: 'client_004',
        title: 'Optimisation SEO pour site e-commerce',
        description: 'Audit SEO technique, optimisation des balises, amélioration des temps de chargement, création de backlinks.',
        budget: 700,
        deadline: '2026-05-25',
        status: 'EN_COURS',
        created_at: '2026-04-05T11:05:00Z',
      },
      {
        id: 'task_006',
        client_id: 'client_005',
        title: 'Développement d’un plugin WordPress sur mesure',
        description: 'Plugin de synchronisation des produits entre WooCommerce et un ERP externe via API REST.',
        budget: 1800,
        deadline: '2026-06-30',
        status: 'VALIDEE',
        created_at: '2026-03-20T16:30:00Z',
      },
      {
        id: 'task_007',
        client_id: 'client_006',
        title: 'Tests de sécurité et pentest applicatif',
        description: 'Réaliser des tests d’intrusion, fournir un rapport de vulnérabilités avec recommandations.',
        budget: 2200,
        deadline: '2026-06-01',
        status: 'OUVERTE',
        created_at: '2026-04-12T13:47:00Z',
      },
      {
        id: 'task_008',
        client_id: 'client_002',
        title: 'Création de contenu vidéo pour formation React',
        description: 'Produire 5 tutoriels vidéo (10-15 min) sur React.js avec montage, sous-titres et miniatures.',
        budget: 850,
        deadline: '2026-05-18',
        status: 'LIVREE',
        created_at: '2026-04-02T10:00:00Z',
      },
      {
        id: 'task_009',
        client_id: 'client_007',
        title: 'Mise en place CI/CD avec GitHub Actions',
        description: 'Configurer des pipelines automatiques de test, linting, build et déploiement sur Vercel.',
        budget: 1100,
        deadline: '2026-05-12',
        status: 'VALIDEE',
        created_at: '2026-03-28T09:23:00Z',
      },
      {
        id: 'task_010',
        client_id: 'client_008',
        title: 'Design d’une application mobile fitness',
        description: 'Création des maquettes UI/UX, design system et prototypes interactifs pour iOS/Android.',
        budget: 1450,
        deadline: '2026-06-20',
        status: 'OUVERTE',
        created_at: '2026-04-20T15:15:00Z',
      },
  ];

  export const applicationsMock: ApplicationResponse[] = [
    {
      id: 'app_001',
      task_id: 'task_001',
      prestataire_id: 'prestataire_001',
      message: 'Je propose de construire votre API REST sécurisée avec authentification JWT, gestion des réservations, et documentation Swagger.',
      status: 'EN_ATTENTE',
      created_at: '2026-04-20T11:00:00Z',
      prestataire: {
        name: 'Léa Martin',
        email: 'lea.martin@example.com',
        role: 'prestataire',
        phone: '+33712345678',
        rating_avg: 4.7,
        created_at: new Date('2025-09-10T09:00:00Z'),
      },
    },
    {
      id: 'app_002',
      task_id: 'task_002',
      prestataire_id: 'prestataire_002',
      message: 'Je peux refondre votre dashboard avec un design moderne, responsive et une navigation plus fluide.',
      status: 'EN_ATTENTE',
      created_at: '2026-04-22T14:30:00Z',
      prestataire: {
        name: 'Nicolas Petit',
        email: 'nicolas.petit@example.com',
        role: 'prestataire',
        phone: '+33798765432',
        rating_avg: 4.9,
        created_at: new Date('2025-11-02T15:20:00Z'),
      },
    },
    {
      id: 'app_003',
      task_id: 'task_004',
      prestataire_id: 'prestataire_003',
      message: 'J’ai déjà intégré des widgets de paiement et je peux gérer l’authentification, l’escrow et les webhooks FedaPay.',
      status: 'ACCEPTEE',
      created_at: '2026-04-25T09:45:00Z',
      prestataire: {
        name: 'Sofia Bernard',
        email: 'sofia.bernard@example.com',
        role: 'prestataire',
        phone: '+33765432198',
        rating_avg: 4.6,
        created_at: new Date('2025-10-18T12:10:00Z'),
      },
    },
    {
      id: 'app_004',
      task_id: 'task_007',
      prestataire_id: 'prestataire_004',
      message: 'Je peux réaliser vos tests de sécurité, identifier les vulnérabilités et proposer des correctifs exploitables.',
      status: 'REJETEE',
      created_at: '2026-04-28T16:10:00Z',
      prestataire: {
        name: 'Marc Dubois',
        email: 'marc.dubois@example.com',
        role: 'prestataire',
        phone: '+33711223344',
        rating_avg: 4.5,
        created_at: new Date('2025-08-25T10:55:00Z'),
      },
    },
    {
      id: 'app_005',
      task_id: 'task_010',
      prestataire_id: 'prestataire_005',
      message: 'Je suis prêt à concevoir vos maquettes et prototypes pour mobile avec un focus sur l’ergonomie et l’expérience utilisateur.',
      status: 'EN_ATTENTE',
      created_at: '2026-05-01T13:20:00Z',
      prestataire: {
        name: 'Emma François',
        email: 'emma.francois@example.com',
        role: 'prestataire',
        phone: '+33766778899',
        rating_avg: 4.8,
        created_at: new Date('2025-12-06T08:40:00Z'),
      },
    },
  ];
  export const deliverablesWithVariedFiles: DeliverableDTO[] = [
    {
      id:'d1',
      content: "Capture d'écran interface mobile",
      prestataire:{
        name: "Thomas Dubois",
        rating_avg : 4.8
      },      
      file: {
        file_url: "https://storage.upply.com/deliverables/task_006/screenshot_mobile.png",
        file_name: "screenshot_homepage.png",
        file_size: "512 KB",
        file_type: "pdf"
      },
      created_at: "2026-06-01T08:15:00Z"
    },
    {
      id:'d2',
      content: "Démonstration fonctionnelle (vidéo)",
      prestataire:{
        name: "Thomas Dubois",
        rating_avg : 4.8
      },
      file: {
        file_url: "https://storage.upply.com/deliverables/task_007/demo_app.mp4",
        file_name: "demo_application.mp4",
        file_size: "15.8 MB",
        file_type: "pdf"
      },
      created_at: "2026-06-02T13:45:00Z"
    },
    {
      id:'d3',
      content: "Assets graphiques (logo, icônes, bannières)",
      prestataire:{
        name: "Thomas Dubois",
        rating_avg : 4.8
      },      
      file: {
        file_url: "https://storage.upply.com/deliverables/task_008/assets_pack.zip",
        file_name: "brand_assets_2026.zip",
        file_size: "3.2 MB",
        file_type: "zip"
      },
      created_at: "2026-06-03T10:30:00Z"
    },
    {
      id:'d3',
      content: "Fichier de configuration déploiement",
      prestataire:{
        name: "Thomas Dubois",
        rating_avg : 4.8
      },      
      file: {
        file_url: "https://storage.upply.com/deliverables/task_009/docker_config.json",
        file_name: "docker-compose.prod.json",
        file_size: "4 KB",
        file_type: "png"
      },
      created_at: "2026-06-04T16:20:00Z"
    },
    {
      id:'d4',
      content: "Certificat SSL et documentation sécurité",
      prestataire:{
        name: "Thomas Dubois",
        rating_avg : 4.8
      },      
      file: {
        file_url: "https://storage.upply.com/deliverables/task_010/ssl_certificate.crt",
        file_name: "wildcard_upply_com.crt",
        file_size: "2 KB",
        file_type: "pdf"
      },
      created_at: "2026-06-05T09:00:00Z"
    }
  ];
