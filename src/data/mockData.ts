import { Opportunity, CareerEvent } from '../types';

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'op-1',
    title: 'Desarrollador Frontend Junior (React / TypeScript)',
    company: 'Mercado Libre',
    type: 'empleo',
    modality: 'hibrido',
    field: 'Tecnología',
    location: 'Ciudad de México, MX',
    stipendOrSalary: '$32,000 - $38,000 MXN / mes',
    description: 'Únete a nuestro equipo de ingeniería en Mercado Libre. Participarás en el desarrollo de experiencias de comercio electrónico de alto tráfico utilizadas por millones de usuarios en toda Latinoamérica.',
    requirements: [
      'Estudiante avanzado o graduado en Ciencias de la Computación, Ingeniería o afín',
      'Experiencia sólida o proyectos académicos avanzados en React, JavaScript y TypeScript',
      'Familiaridad con control de versiones (Git) y pruebas unitarias',
      'Capacidad de trabajo en equipo y resolución de problemas'
    ],
    benefits: [
      'Esquema híbrido flexible',
      'Prepaga de primer nivel y seguro de vida',
      'Descuentos exclusivos en Mercado Libre y Mercado Pago',
      'Presupuesto para capacitación y certificaciones'
    ],
    postedDate: 'Hace 2 días',
    deadline: '30 de Noviembre, 2026',
    featured: true,
    applicantsCount: 84,
    lat: 19.4326,
    lng: -99.1332
  },
  {
    id: 'op-2',
    title: 'Software Engineer Intern (Prácticas Profesionales)',
    company: 'Google',
    type: 'practicas',
    modality: 'hibrido',
    field: 'Tecnología',
    location: 'Ciudad de México, MX',
    stipendOrSalary: 'Competitivo + Beneficios de GGE',
    description: 'El programa de pasantías de ingeniería de software en Google está diseñado para estudiantes que están cursando su penúltimo o último año de universidad. Trabajarás codo a codo con ingenieros experimentados en proyectos reales.',
    requirements: [
      'Estar cursando licenciatura o maestría en Ciencias de la Computación o carrera técnica afín',
      'Experiencia en programación con C++, Java, Python, Go o JavaScript',
      'Fundamentos sólidos en estructuras de datos y algoritmos',
      'Fluidez en inglés y español'
    ],
    benefits: [
      'Mentores dedicados y acompañamiento constante',
      'Comidas y snacks gratuitos en oficina',
      'Oportunidad de contratación de planta basada en desempeño',
      'Horarios flexibles para estudiantes'
    ],
    postedDate: 'Hace 1 día',
    deadline: '15 de Diciembre, 2026',
    featured: true,
    applicantsCount: 240,
    lat: 19.3550,
    lng: -99.2000
  },
  {
    id: 'op-3',
    title: 'Beca Talento Digital STEM BBVA 2026',
    company: 'Fundación BBVA',
    type: 'beca',
    modality: 'remoto',
    field: 'Tecnología',
    location: 'Nacional (México / Colombia / España)',
    stipendOrSalary: '$6,500 MXN / mes + Cobertura de colegiatura',
    description: 'Beca integral para jóvenes universitarios de excelencia académica en carreras STEM (Ciencia, Tecnología, Ingeniería y Matemáticas). Incluye mentoría ejecutiva y participación en hackatones exclusivos.',
    requirements: [
      'Promedio mínimo acumulado de 9.0 o equivalente',
      'Estar inscrito en universidad pública o privada',
      'Demostrar liderazgo, proyectos extracurriculares o impacto social',
      'Pasión por la tecnología y la transformación digital'
    ],
    benefits: [
      'Apoyo económico mensual durante toda la carrera',
      'Programa de mentoría con directivos de BBVA',
      'Acceso prioritario a procesos de selección para pasantías y empleos',
      'Cursos especializados en ciberseguridad, datos y desarrollo'
    ],
    postedDate: 'Hace 3 días',
    deadline: '10 de Diciembre, 2026',
    featured: true,
    applicantsCount: 312,
    lat: 19.4284,
    lng: -99.1677
  },
  {
    id: 'op-4',
    title: 'Analista de Datos Junior (SQL & Python)',
    company: 'Nubank',
    type: 'empleo',
    modality: 'remoto',
    field: 'Tecnología',
    location: 'Remoto (Latinoamérica)',
    stipendOrSalary: 'USD $1,800 - $2,400 / mes',
    description: 'Buscamos analistas junior analíticos y orientados a datos para unirse al neobanco líder de América Latina. Analizarás millones de transacciones, construirás dashboards y optimizarás modelos de riesgo.',
    requirements: [
      'Recién graduados de Ingeniería, Matemáticas, Economía, Estadística o afines',
      'Dominio de SQL y Python o R para análisis de datos',
      'Fuertes habilidades de comunicación y pensamiento crítico',
      'Inglés intermedio/avanzado'
    ],
    benefits: [
      'Trabajo 100% remoto desde cualquier lugar de LatAm',
      'Presupuesto para equipamiento de oficina en casa',
      'Seguro médico internacional',
      'Oportunidades de crecimiento acelerado en fintech'
    ],
    postedDate: 'Hace 4 días',
    deadline: '20 de Diciembre, 2026',
    featured: false,
    applicantsCount: 156,
    lat: 4.7110,
    lng: -74.0721
  },
  {
    id: 'op-5',
    title: 'Practicante de Marketing Digital y Growth',
    company: 'Rappi',
    type: 'practicas',
    modality: 'hibrido',
    field: 'Marketing',
    location: 'Bogotá, Colombia',
    stipendOrSalary: '$2,200,000 COP / mes',
    description: 'Ven a hacer tus prácticas en la superapp de LatAm. Trabajarás en campañas de adquisición de usuarios, análisis de métricas de crecimiento y optimización de canales digitales.',
    requirements: [
      'Estudiante activo de Administración, Mercadotecnia, Ingeniería Industrial o afines',
      'Manejo de Excel intermedio/avanzado',
      'Alta energía, orientación a resultados y mentalidad analítica',
      'Disponibilidad de tiempo completo o 30 hrs/semana'
    ],
    benefits: [
      'Créditos mensuales en Rappi',
      'Ambiente vibrante, joven y de startup de alto crecimiento',
      'Posibilidad de contratación directa'
    ],
    postedDate: 'Hace 2 días',
    deadline: '18 de Diciembre, 2026',
    featured: false,
    applicantsCount: 92,
    lat: 4.6097,
    lng: -74.0817
  },
  {
    id: 'op-6',
    title: 'UX/UI Designer Junior',
    company: 'Globant',
    type: 'empleo',
    modality: 'hibrido',
    field: 'Diseño',
    location: 'Guadalajara, JAL',
    stipendOrSalary: '$25,000 - $30,000 MXN / mes',
    description: 'Buscamos diseñador UX/UI junior con pasión por crear experiencias digitales memorables para clientes globales de la industria tecnológica, entretenimiento y financiera.',
    requirements: [
      'Dominio profesional de Figma y metodologías de diseño centrado en el usuario',
      'Portafolio que demuestre investigación de usuarios, wireframes y prototipos',
      'Trabajo colaborativo con equipos ágiles (Scrum)',
      'Inglés conversacional fluido'
    ],
    benefits: [
      'Horarios flexibles y esquema híbrido',
      'Clases de inglés y certificaciones pagadas',
      'StarMeUp y beneficios corporativos de bienestar'
    ],
    postedDate: 'Hace 5 días',
    deadline: '22 de Diciembre, 2026',
    featured: false,
    applicantsCount: 64,
    lat: 20.6597,
    lng: -103.3496
  },
  {
    id: 'op-7',
    title: 'Taller Práctico: Preparación para Entrevistas en FAANG y Unicornios',
    company: 'TalentoJoven & Tech Mentors',
    type: 'taller',
    modality: 'remoto',
    field: 'Educación',
    location: 'Online en vivo',
    stipendOrSalary: 'Gratuito para miembros',
    description: 'Sesión intensiva en vivo donde simularemos entrevistas técnicas de código, resolución de casos de negocio y preguntas de comportamiento en empresas como Google, Meta y Mercado Libre.',
    requirements: [
      'Ser estudiante o recién graduado registrado en TalentoJoven',
      'Interés en desarrollo tecnológico y corporativo'
    ],
    benefits: [
      'Grabación y recursos descargables',
      'Feedback personalizado de ingenieros senior',
      'Certificado de participación'
    ],
    postedDate: 'Hoy',
    deadline: '25 de Noviembre, 2026',
    featured: true,
    applicantsCount: 280,
    lat: 19.4360,
    lng: -99.1330
  }
];

export const INITIAL_EVENTS: CareerEvent[] = [
  {
    id: 'ev-1',
    title: 'Feria Virtual de Primer Empleo y Prácticas LatAm 2026',
    organizer: 'TalentoJoven & Empresas Aliadas (Google, Mercado Libre, BBVA)',
    date: '25 de Noviembre, 2026',
    time: '10:00 AM - 04:00 PM',
    type: 'Feria Virtual',
    description: 'Conéctate con reclutadores de las empresas tecnológicas y financieras más importantes de la región. Stands interactivos, entrevistas express y networking en vivo.',
    speaker: 'Directores de Talento de Mercado Libre y Google',
    registered: false
  },
  {
    id: 'ev-2',
    title: 'Masterclass: Cómo Conseguir tu Primer Empleo en Tecnología sin Experiencia Previa',
    organizer: 'TalentoJoven Academy',
    date: '28 de Noviembre, 2026',
    time: '05:00 PM - 06:30 PM',
    type: 'Webinar',
    description: 'Aprende a estructurar un portafolio de proyectos que enamore a los reclutadores, optimiza tu CV para ATS y domina el networking en LinkedIn.',
    speaker: 'Sofía Martínez (Head of Talent & Career Coach)',
    registered: true
  }
];
