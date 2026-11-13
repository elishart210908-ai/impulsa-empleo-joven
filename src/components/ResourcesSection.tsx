import React, { useState } from 'react';
import { BookOpen, FileText, Video, Download, Search, CheckCircle, Clock, ArrowRight, Bookmark, Share2, Play, ExternalLink } from 'lucide-react';

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Búsqueda' | 'Currículum' | 'Entrevistas' | 'Habilidades' | 'Carrera';
  type: 'Artículo' | 'Guía Descargable' | 'Video Masterclass';
  readTime: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  description: string;
  content: string[];
  author: string;
  date: string;
  downloadUrl?: string;
}

const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Guía Definitiva: Cómo Optimizar tu CV para Sistemas ATS',
    category: 'Currículum',
    type: 'Guía Descargable',
    readTime: '12 min lectura',
    level: 'Principiante',
    description: 'Aprende a estructurar tu currículum de manera que supere los filtros automáticos de las empresas y capte la atención de los reclutadores en 6 segundos.',
    author: 'Sofía Martínez (Head of Talent)',
    date: 'Actualizado Nov 2026',
    content: [
      'Por qué el 75% de los CVs son rechazados por sistemas ATS antes de ser leídos por humanos.',
      'Estructura recomendada de una sola página para perfiles junior y graduados.',
      'Uso estratégico de palabras clave según la vacante (Hard Skills vs Soft Skills).',
      'Formatos prohibidos (tablas complejas, gráficos de barras de nivel, fuentes exóticas).'
    ],
    downloadUrl: '#'
  },
  {
    id: 'res-2',
    title: 'Domina la Entrevista por Competencias con la Técnica STAR',
    category: 'Entrevistas',
    type: 'Video Masterclass',
    readTime: '18 min video',
    level: 'Intermedio',
    description: 'Estrategia paso a paso para estructurar tus respuestas a preguntas conductuales ("Cuéntame de una vez que...") usando Situación, Tarea, Acción y Resultado.',
    author: 'Carlos Mendoza (Career Coach)',
    date: 'Octubre 2026',
    content: [
      'Desglose profundo de cada letra del método STAR.',
      'Ejemplos reales aplicados a proyectos universitarios y primeros empleos.',
      'Cómo cuantificar tus resultados incluso si aún no tienes experiencia laboral formal.',
      'Errores comunes al responder preguntas de resolución de conflictos.'
    ]
  },
  {
    id: 'res-3',
    title: 'Estrategia de Mercado Oculto: Consigue Empleo sin Postularte en Portales',
    category: 'Búsqueda',
    type: 'Artículo',
    readTime: '8 min lectura',
    level: 'Avanzado',
    description: 'El 70% de las vacantes nunca se publican. Descubre cómo hacer networking efectivo en LinkedIn y contactar directamente a hiring managers.',
    author: 'Alejandro Ruiz (TalentoJoven Expert)',
    date: 'Noviembre 2026',
    content: [
      'Qué es el mercado oculto de talento y por qué es tu mejor aliado al iniciar tu carrera.',
      'Cómo redactar mensajes en frío en LinkedIn que generen respuestas reales (sin sonar spam).',
      'Estrategia de coffee chats informales para conocer la cultura de las empresas.',
      'Plantillas de mensajes adaptadas a diferentes industrias.'
    ]
  },
  {
    id: 'res-4',
    title: 'Habilidades Blandas más Demandadas por Líderes de Tecnología',
    category: 'Habilidades',
    type: 'Artículo',
    readTime: '6 min lectura',
    level: 'Principiante',
    description: 'La inteligencia emocional, la adaptabilidad y la comunicación asertiva superan al conocimiento técnico en las evaluaciones de los reclutadores.',
    author: 'Dra. Elena Vargas (Psicología Laboral)',
    date: 'Septiembre 2026',
    content: [
      'Comunicación asertiva en equipos multidisciplinarios e híbridos.',
      'Gestión de la frustración y resiliencia frente a proyectos complejos.',
      'Trabajo en equipo y colaboración intergeneracional.',
      'Cómo evidenciar tus habilidades blandas en una entrevista.'
    ]
  },
  {
    id: 'res-5',
    title: 'Plan de Carrera: Cómo Diseñar tus Primeros 3 Años Profesionales',
    category: 'Carrera',
    type: 'Guía Descargable',
    readTime: '15 min lectura',
    level: 'Intermedio',
    description: 'Una hoja de ruta estratégica para elegir tu primer rol, identificar mentores, negociar salarios iniciales y planificar ascensos o especializaciones.',
    author: 'Mateo Silva (Director de RRHH)',
    date: 'Noviembre 2026',
    content: [
      'El dilema inicial: ¿Startup, multinacional o agencia?',
      'Cómo encontrar un mentor que acelere tu curva de aprendizaje un 300%.',
      'Cuándo y cómo pedir una revisión salarial o cambio de rol.',
      'Construcción de tu marca personal desde la universidad.'
    ],
    downloadUrl: '#'
  },
  {
    id: 'res-6',
    title: 'Masterclass: Errores Fatales en Entrevistas Técnicas y Remotas',
    category: 'Entrevistas',
    type: 'Video Masterclass',
    readTime: '25 min video',
    level: 'Intermedio',
    description: 'Consejos clave sobre iluminación, audio, control de nervios, pruebas técnicas en vivo y cómo manejar preguntas difíciles sobre tu falta de experiencia.',
    author: 'Equipo TalentoJoven Tech',
    date: 'Octubre 2026',
    content: [
      'Configuración de tu espacio para entrevistas virtuales impecables.',
      'Cómo verbalizar tu proceso mental al resolver un problema en vivo.',
      'Qué decir cuando no sabes la respuesta a una pregunta técnica.',
      'Preguntas inteligentes que debes hacerle al entrevistador al finalizar.'
    ]
  }
];

export const ResourcesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [activeResource, setActiveResource] = useState<ResourceItem | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(['res-1']);

  const categories = ['Todos', 'Búsqueda', 'Currículum', 'Entrevistas', 'Habilidades', 'Carrera'];
  const types = ['Todos', 'Artículo', 'Guía Descargable', 'Video Masterclass'];

  const filteredResources = INITIAL_RESOURCES.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || res.category === selectedCategory;
    const matchesType = selectedType === 'Todos' || res.type === selectedType;
    return matchesSearch && matchesCat && matchesType;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(i => i !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-950/55 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Centro de Orientación y Recursos Profesionales</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Impulsa Tu Carrera con Guías de Expertos
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Artículos estratégicos, guías descargables en PDF y masterclasses en video diseñadas por reclutadores y líderes de la industria para ayudarte a destacar en cada etapa de tu búsqueda laboral.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por tema, CV, entrevista, soft skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Type Filter */}
            <div className="w-full md:w-auto shrink-0">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full md:w-48 px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              >
                {types.map(t => (
                  <option key={t} value={t}>{t === 'Todos' ? 'Todos los formatos' : t}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-6 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isSaved = savedIds.includes(res.id);
            return (
              <div
                key={res.id}
                onClick={() => setActiveResource(res)}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      res.type === 'Artículo' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
                      res.type === 'Guía Descargable' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {res.type}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(res.id, e)}
                      className={`p-2 rounded-xl transition-colors ${
                        isSaved ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                      title={isSaved ? 'Guardado' : 'Guardar recurso'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-6">
                    {res.description}
                  </p>
                </div>

                {/* Footer metadata */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{res.readTime}</span>
                  </div>
                  <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1">
                    Ver recurso <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No se encontraron recursos</h3>
            <p className="text-xs text-slate-500 mt-1">Intenta con otros términos de búsqueda o categorías.</p>
          </div>
        )}

      </div>

      {/* Resource Detail Modal */}
      {activeResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-slate-200 dark:border-slate-800 animate-fadeIn">
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase tracking-wider">
                {activeResource.category} · {activeResource.type}
              </span>
              <button
                onClick={() => setActiveResource(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {activeResource.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <span>Por {activeResource.author}</span>
              <span>•</span>
              <span>{activeResource.date}</span>
              <span>•</span>
              <span>{activeResource.readTime}</span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 font-medium">
              {activeResource.description}
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Puntos clave del contenido:</h4>
              {activeResource.content.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">{point}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
              {activeResource.type === 'Guía Descargable' && (
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`¡Descarga iniciada! Guardando "${activeResource.title}" en formato PDF.`);
                  }}
                  className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Guía PDF</span>
                </a>
              )}

              {activeResource.type === 'Video Masterclass' && (
                <button
                  onClick={() => alert(`Reproduciendo Masterclass: "${activeResource.title}". (Simulador de video interactivo)`)}
                  className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-blue-600/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Ver Masterclass</span>
                </button>
              )}

              {activeResource.type === 'Artículo' && (
                <button
                  onClick={() => alert('¡Artículo completo leído! Has ganado 50 puntos de experiencia en tu perfil.')}
                  className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-blue-600/20"
                >
                  <span>Marcar como Leído</span>
                </button>
              )}

              <button
                onClick={() => setActiveResource(null)}
                className="px-5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
