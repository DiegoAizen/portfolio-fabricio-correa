export const personalInfo = {
  name: "Diego Correa",
  fullName: "Diego Fabricio Correa Marquinez",
  title: "Full Stack Developer",
  location: "España - Madrid",
  email: "diegoxcorrea94@gmail.com",
  phone: "+34 632271380",
  bio: "Soy un programador dedicado impulsado por una profunda pasión por la codificación y una sed constante de conocimiento. Con cada proyecto me esfuerzo por superar los límites de lo que puedo lograr y busco constantemente nuevos desafíos para crecer como desarrollador. Me entusiasma colaborar con personas con ideas afines y contribuir en proyectos que dan forma al futuro de la tecnología.",
  avatar: "/developer-diego.jpg",
  cv: "/CV - Desarrollador_compressed.pdf"
};

export const socialLinks = {
  github: "https://github.com/DiegoAizen",
  linkedin: "https://www.linkedin.com/in/diego-correa-2b02742a8/",
  email: "mailto:diegoxcorrea94@gmail.com"
};

export const skills = [
  { name: "Design Process", level: 78, category: "frontend" },
  { name: "Project Management", level: 81, category: "tools" },
  { name: "JavaScript", level: 66, category: "frontend" },
  { name: "TypeScript", level: 50, category: "frontend" },
  { name: "HTML", level: 80, category: "frontend" },
  { name: "CSS", level: 78, category: "frontend" },
  { name: "Node", level: 75, category: "backend" },
  { name: "SQLite", level: 85, category: "backend" },
  { name: "MongoDB", level: 78, category: "backend" },
  { name: "Cloud Function", level: 81, category: "backend" },
  { name: "Firebase", level: 86, category: "backend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 82, category: "frontend" },
  { name: "Vue.js, Angular", level: 70, category: "frontend" }
];

export const experience = [
  {
    id: 1,
    title: "Desarrollador Freelance - Proyecto Integral de App Móvil y Plataforma Web",
    company: "Freelance",
    period: "2022 - 2023",
    description: [
      "Diseñé y desarrollé una aplicación móvil completa junto con una plataforma web asociada para brindar a los usuarios una solución integral.",
      "Utilicé tecnologías como Firebase, Cloud Functions, React.js y Node.js para implementar todas las funcionalidades necesarias tanto en el backend como en el frontend.",
      "Implementé un sólido sistema de autenticación y administración de usuarios que incluye inicio de sesión, registro y perfiles de usuario personalizados.",
      "Colaboré con diseñadores y otros desarrolladores para garantizar una experiencia de usuario intuitiva y atractiva en todas las plataformas."
    ]
  },
  {
    id: 2,
    title: "Desarrollador Freelance - Proyecto de Rediseño de Sitio Web",
    company: "Freelance",
    period: "2022 - 2023",
    description: [
      "Lideré el proceso completo de rediseño de un sitio web existente para mejorar su apariencia y funcionalidad.",
      "Utilicé tecnologías modernas como HTML5, CSS3 y JavaScript para crear un diseño atractivo y responsivo que se adapta a diferentes dispositivos y tamaños de pantalla.",
      "Implementé nuevas características y funcionalidades para mejorar la experiencia del usuario y promover la interacción con el sitio.",
      "Trabajé en estrecha colaboración con el cliente para comprender sus necesidades y objetivos, garantizando la entrega oportuna y satisfactoria del proyecto."
    ]
  },
  {
    id: 3,
    title: "Desarrollador Freelance - Proyecto de Desarrollo Web Full-Stack",
    company: "Freelance",
    period: "2023 - 2024",
    description: [
      "Desarrollé un proyecto web integral desde cero, cubriendo todas las etapas desde la planificación inicial hasta la implementación final.",
      "Utilicé tecnologías como React.js, Node.js y MongoDB para crear una aplicación web dinámica y escalable.",
      "Diseñé e implementé características y funcionalidades específicas para satisfacer los requisitos del cliente y mejorar la experiencia del usuario.",
      "Trabajé de forma autónoma y en equipo para asegurar la calidad y el éxito del proyecto, cumpliendo los plazos establecidos y superando las expectativas del cliente."
    ]
  }
];

export const education = [
  {
    id: 1,
    institution: "Instituto Ismael Perez Pazmiño",
    degree: "Técnico Superior en Gestión de Producción y Servicios",
    period: "2018 - 2021"
  },
  {
    id: 2,
    institution: "Programacion (Auto Didacta)",
    degree: "Full Stack Developer",
    period: "2021 - Actualmente"
  }
];

export const courses = [
  "Introduction to Software Enginnering (IBM)",
  "Introduction to HTML, CSS & JavaScript (IBM)",
  "Introduction to Containers w/ Docker, Kubernetes & OpenShift (IBM)",
  "Digital Marketing",
  "Developing Back-End Apps with Node.js and Express (IBM)",
  "Get Started with Cloud Native, DevOps, Agile, and NoSQL (IBM)",
  "JavaScript Programming Essentials (IBM)",
  "Application Development using Microservices and Serverless (IBM)",
  "Developing Front-End Apps with React (IBM)",
  "Software Developer Career Guide and Interview Preparation (IBM)",
  "Getting Started with Git and GitHub (IBM)",
  "Critical Thinking",
  "Leadership"
];

export const projects = [
  {
    id: "1",
    title: "Building Once UI: a Customizable Design System",
    description: "Desarrollé un flexible y altamente customizable design system usando Next.js UI for React and Next.js para agilizar la colaboración entre diseño y desarrollo. Este proyecto incluye componentes reutilizables, documentación completa y temas personalizables.",
    longDescription: "Este proyecto nació de la necesidad de crear un sistema de diseño consistente y escalable. Implementé más de 50 componentes reutilizables con documentación completa, soporte para temas oscuros y claros, y un playground interactivo para probar los componentes en tiempo real. El sistema está construido pensando en la accesibilidad (WCAG 2.1) y el rendimiento.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Storybook"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/design-system",
    liveUrl: "https://design-system-demo.vercel.app",
    featured: true,
    order: 1,
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "2",
    title: "E-Commerce Platform con Next.js y Stripe",
    description: "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos integrada con Stripe, panel de administración y gestión de inventario en tiempo real.",
    longDescription: "Una solución e-commerce completa que incluye catálogo de productos con filtros avanzados, sistema de autenticación, carrito de compras persistente, integración con Stripe para pagos seguros, panel de administración para gestión de productos y pedidos, y notificaciones por email. Implementé optimizaciones de rendimiento como ISR y lazy loading de imágenes.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Firebase", "Tailwind CSS", "React Query"],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
    order: 2,
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "3",
    title: "Task Management App - Gestión de Proyectos",
    description: "Aplicación web colaborativa para gestión de tareas y proyectos con tableros Kanban, asignación de tareas, notificaciones en tiempo real y colaboración en equipo.",
    longDescription: "Herramienta de gestión de proyectos inspirada en Trello y Asana. Permite crear múltiples proyectos, organizar tareas en tableros Kanban con drag & drop, asignar tareas a miembros del equipo, establecer fechas límite, adjuntar archivos, comentar en tareas y recibir notificaciones en tiempo real. Implementé websockets para colaboración en vivo.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Material-UI"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/task-manager",
    liveUrl: "https://task-manager-demo.vercel.app",
    featured: true,
    order: 3,
    gallery: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "4",
    title: "App Móvil de Fitness con React Native",
    description: "Aplicación móvil para seguimiento de ejercicios, planes de entrenamiento personalizados, contador de calorías y estadísticas de progreso.",
    longDescription: "Aplicación móvil multiplataforma (iOS y Android) para fitness. Incluye biblioteca de ejercicios con videos demostrativos, planes de entrenamiento personalizados basados en objetivos del usuario, seguimiento de progreso con gráficos, contador de calorías integrado, recordatorios de entrenamiento y sincronización en la nube. Integré Firebase para autenticación y almacenamiento de datos.",
    technologies: ["React Native", "TypeScript", "Firebase", "Expo", "Native Base"],
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/fitness-app",
    featured: false,
    order: 4,
    gallery: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "5",
    title: "Blog Personal con CMS Headless",
    description: "Blog moderno con sistema de gestión de contenido headless, soporte para MDX, syntax highlighting para código y comentarios.",
    longDescription: "Blog personal construido con arquitectura headless CMS. Permite escribir artículos en MDX con soporte para componentes React embebidos, syntax highlighting para bloques de código, categorización de posts, búsqueda de contenido, sistema de comentarios, newsletter y modo oscuro/claro. Optimizado para SEO con meta tags dinámicos y sitemap automático.",
    technologies: ["Next.js", "Contentful", "MDX", "TypeScript", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/blog-cms",
    liveUrl: "https://blog-demo.vercel.app",
    featured: false,
    order: 5,
    gallery: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "6",
    title: "Dashboard de Analytics en Tiempo Real",
    description: "Panel de control para visualización de datos en tiempo real con gráficos interactivos, KPIs y reportes personalizables.",
    longDescription: "Dashboard empresarial para análisis de datos en tiempo real. Incluye múltiples tipos de gráficos (líneas, barras, donas, mapas de calor), KPIs personalizables, filtros avanzados por fecha y categoría, exportación de reportes en PDF y Excel, y actualizaciones en vivo. Implementé websockets para datos en tiempo real y optimizaciones de rendimiento para manejar grandes volúmenes de datos.",
    technologies: ["React", "D3.js", "Chart.js", "Node.js", "PostgreSQL", "Redis"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/analytics-dashboard",
    liveUrl: "https://analytics-demo.vercel.app",
    featured: false,
    order: 6,
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
    ]
  }
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];
