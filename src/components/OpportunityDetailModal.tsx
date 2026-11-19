import React, { useState } from 'react';
import { X, Building2, MapPin, Calendar, CheckCircle2, Sparkles, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { Opportunity, Application } from '../types';

interface OpportunityDetailModalProps {
  opportunity: Opportunity;
  onClose: () => void;
  onApply: (opportunity: Opportunity, notes?: string) => void;
  alreadyApplied: boolean;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onApply,
  alreadyApplied
}) => {
  const [notes, setNotes] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(alreadyApplied);

  const handleApplyClick = () => {
    onApply(opportunity, notes);
    setAppliedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                opportunity.type === 'empleo' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' :
                opportunity.type === 'practicas' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' :
                opportunity.type === 'beca' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300' :
                'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
              }`}>
                {opportunity.type === 'empleo' ? 'Primer Empleo' : opportunity.type === 'practicas' ? 'Prácticas' : opportunity.type === 'beca' ? 'Beca' : 'Taller'}
              </span>
              <span className="text-xs text-slate-400">Cierre: {opportunity.deadline}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {opportunity.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-1">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">{opportunity.company}</span>
              <span aria-hidden="true">·</span>
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{opportunity.location}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">

          {/* AI Match Reason Banner */}
          {opportunity.matchReason && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-1">¿Por qué coincide con tu perfil?</h4>
                <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">{opportunity.matchReason}</p>
              </div>
            </div>
          )}
          
          {/* Compensation & Modality card */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Compensación / Estipendio</div>
              <div className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {opportunity.stipendOrSalary}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Modalidad de Trabajo</div>
              <div className="text-base font-bold text-slate-900 dark:text-white capitalize">
                {opportunity.modality}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Acerca de la Oportunidad
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Requisitos Principales
            </h3>
            <ul className="space-y-2">
              {opportunity.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Beneficios y Ventajas
            </h3>
            <ul className="space-y-2">
              {opportunity.benefits.map((ben, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional Note / Cover letter snippet */}
          {!appliedSuccess && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Nota opcional para el reclutador (ej. enlace a tu portafolio o LinkedIn)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Hola, me entusiasma mucho esta oportunidad porque..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 resize-none"
              />
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verificado por TalentoJoven Trust System</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={handleApplyClick}
              disabled={appliedSuccess}
              className={`flex items-center gap-2 px-6 py-2.5 text-xs font-medium text-white rounded-xl transition-all shadow-md ${
                appliedSuccess ? 'bg-emerald-600 cursor-default' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
              }`}
            >
              {appliedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Postulado con éxito!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Postularme Ahora</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
