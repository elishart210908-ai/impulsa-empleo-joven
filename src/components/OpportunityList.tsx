import React, { useState } from 'react';
import { Briefcase, MapPin, Building2, Calendar, Sparkles, Filter, CheckCircle2, Bookmark } from 'lucide-react';
import { Opportunity, OpportunityType, ModalityType } from '../types';

interface OpportunityListProps {
  opportunities: Opportunity[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedField: string;
  setSelectedField: (field: string) => void;
  onSelectOpportunity: (opp: Opportunity) => void;
  onRegenerateOpportunities?: () => void;
  isRegenerating?: boolean;
}

export const OpportunityList: React.FC<OpportunityListProps> = ({
  opportunities,
  searchTerm,
  setSearchTerm,
  selectedField,
  setSelectedField,
  onSelectOpportunity,
  onRegenerateOpportunities,
  isRegenerating
}) => {
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [selectedModality, setSelectedModality] = useState<string>('todas');

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesField = !selectedField || opp.field === selectedField;
    const matchesType = selectedType === 'todos' || opp.type === selectedType;
    const matchesModality = selectedModality === 'todas' || opp.modality === selectedModality;

    return matchesSearch && matchesField && matchesType && matchesModality;
  });

  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Filters Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Oportunidades Disponibles
              </h2>
              {onRegenerateOpportunities && (
                <button
                  onClick={onRegenerateOpportunities}
                  disabled={isRegenerating}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  <span>{isRegenerating ? 'Generando con IA...' : '✨ Regenerar según mi perfil'}</span>
                </button>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Mostrando {filteredOpportunities.length} resultados para tu búsqueda
            </p>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'todos', label: 'Todas' },
              { id: 'empleo', label: 'Primer Empleo' },
              { id: 'practicas', label: 'Prácticas' },
              { id: 'beca', label: 'Becas' },
              { id: 'taller', label: 'Talleres' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${selectedType === type.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Modality Filters */}
        <div className="flex items-center gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Filter className="w-4 h-4" />
            <span>Modalidad:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'remoto', label: 'Remoto' },
              { id: 'hibrido', label: 'Híbrido' },
              { id: 'presencial', label: 'Presencial' }
            ].map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSelectedModality(mod.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${selectedModality === mod.id ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {mod.label}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunity Grid */}
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No se encontraron oportunidades</h3>
            <p className="text-sm text-slate-500">Intenta ajustar tus filtros de búsqueda o términos clave.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedField('');
                setSelectedType('todos');
                setSelectedModality('todas');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                onClick={() => onSelectOpportunity(opp)}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-lg"
              >
                <div>
                  {/* Top row: Type badge & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      opp.type === 'empleo' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' :
                      opp.type === 'practicas' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' :
                      opp.type === 'beca' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300' :
                      'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      {opp.type === 'empleo' ? 'Primer Empleo' : opp.type === 'practicas' ? 'Prácticas' : opp.type === 'beca' ? 'Beca' : 'Taller'}
                    </span>
                    <span className="text-xs text-slate-400">{opp.postedDate}</span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                    {opp.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{opp.company}</span>
                  </div>

                  {/* Description preview */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
                    {opp.description}
                  </p>

                  {/* AI Match Reason Preview */}
                  {opp.matchReason && (
                    <div className="mb-4 p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-blue-800 dark:text-blue-200 line-clamp-2">{opp.matchReason}</p>
                    </div>
                  )}
                </div>

                <div>
                  {/* Metadata unboxed text with dots */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {opp.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{opp.modality}</span>
                  </div>

                  {/* Stipend & Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Compensación</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                        {opp.stipendOrSalary}
                      </div>
                    </div>
                    <button className="px-4 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg transition-colors">
                      Ver Detalles
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
