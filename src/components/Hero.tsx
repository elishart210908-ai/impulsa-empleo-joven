import React from 'react';
import { Search, MapPin, Sparkles, GraduationCap, Building, Award } from 'lucide-react';
import { FieldType } from '../types';

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedField: string;
  setSelectedField: (field: string) => void;
  onExploreClick: () => void;
}

const FIELDS: FieldType[] = [
  'Tecnología',
  'Marketing',
  'Finanzas',
  'Diseño',
  'Ingeniería',
  'Educación',
  'Salud',
  'Administración'
];

export const Hero: React.FC<HeroProps> = ({
  searchTerm,
  setSearchTerm,
  selectedField,
  setSelectedField,
  onExploreClick
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Impulsa tu carrera desde el primer día</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6" style={{ textWrap: 'balance' }}>
            Tu primer empleo, prácticas y becas en un solo lugar
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            Conectamos a estudiantes, recién graduados y jóvenes talentos con empresas líderes, fundaciones y universidades con oportunidades reales diseñadas para tu crecimiento.
          </p>

          {/* Search & Filter Bar */}
          <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca por puesto, empresa o palabra clave..."
                className="bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 w-full"
              />
            </div>

            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap shrink-0"
            >
              Buscar Oportunidades
            </button>
          </div>

          {/* Quick Categories Filter */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedField('')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${!selectedField ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}
            >
              Todas las áreas
            </button>
            {FIELDS.map((field) => (
              <button
                key={field}
                onClick={() => setSelectedField(field)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedField === field ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {field}
              </button>
            ))}
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">+1,500</div>
            <div className="text-xs text-slate-500 mt-1">Vacantes Junior & Prácticas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">+400</div>
            <div className="text-xs text-slate-500 mt-1">Empresas Aliadas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">98%</div>
            <div className="text-xs text-slate-500 mt-1">Estudiantes Satisfechos</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">$5M+</div>
            <div className="text-xs text-slate-500 mt-1">En Becas Otorgadas</div>
          </div>
        </div>

      </div>
    </section>
  );
};
