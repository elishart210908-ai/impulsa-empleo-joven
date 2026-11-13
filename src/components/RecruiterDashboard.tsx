import React, { useState } from 'react';
import { Building2, PlusCircle, Briefcase, Users, CheckCircle2, DollarSign, MapPin, Sparkles } from 'lucide-react';
import { Opportunity, OpportunityType, ModalityType, FieldType } from '../types';

interface RecruiterDashboardProps {
  opportunities: Opportunity[];
  onAddOpportunity: (newOpp: Opportunity) => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  opportunities,
  onAddOpportunity
}) => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Mi Empresa S.A.');
  const [type, setType] = useState<OpportunityType>('empleo');
  const [modality, setModality] = useState<ModalityType>('remoto');
  const [field, setField] = useState<FieldType>('Tecnología');
  const [location, setLocation] = useState('Ciudad de México');
  const [stipendOrSalary, setStipendOrSalary] = useState('$20,000 MXN / mes');
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [benefitsText, setBenefitsText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title,
      company,
      type,
      modality,
      field,
      location,
      stipendOrSalary,
      description,
      requirements: requirementsText ? requirementsText.split('\n').filter(Boolean) : ['Ganas de aprender y proactividad'],
      benefits: benefitsText ? benefitsText.split('\n').filter(Boolean) : ['Ambiente flexible', 'Mentoría'],
      postedDate: 'Hoy',
      deadline: '31 de Diciembre, 2026',
      applicantsCount: 0
    };

    onAddOpportunity(newOpp);
    setTitle('');
    setDescription('');
    setRequirementsText('');
    setBenefitsText('');
    setShowNewForm(false);
    alert('¡Oportunidad publicada con éxito en TalentoJoven!');
  };

  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Portal de Reclutadores y Empresas</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Panel de Gestión de Talento
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Publica vacantes para primer empleo, prácticas o becas y conecta con miles de jóvenes talentosos.
            </p>
          </div>

          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showNewForm ? 'Cancelar' : 'Publicar Nueva Oportunidad'}</span>
          </button>
        </div>

        {/* New Opportunity Form Modal / Card */}
        {showNewForm && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mb-10 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Detalles de la Nueva Oportunidad</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Título del Puesto / Beca
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej. Desarrollador Frontend Junior"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Nombre de la Empresa o Institución
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Tipo de Oportunidad
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as OpportunityType)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  >
                    <option value="empleo">Primer Empleo</option>
                    <option value="practicas">Prácticas Profesionales</option>
                    <option value="beca">Beca Académica</option>
                    <option value="taller">Taller / Capacitación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Área o Sector
                  </label>
                  <select
                    value={field}
                    onChange={(e) => setField(e.target.value as FieldType)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  >
                    <option value="Tecnología">Tecnología</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Diseño">Diseño</option>
                    <option value="Ingeniería">Ingeniería</option>
                    <option value="Educación">Educación</option>
                    <option value="Salud">Salud</option>
                    <option value="Administración">Administración</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Modalidad
                  </label>
                  <select
                    value={modality}
                    onChange={(e) => setModality(e.target.value as ModalityType)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  >
                    <option value="remoto">Remoto</option>
                    <option value="hibrido">Híbrido</option>
                    <option value="presencial">Presencial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Compensación / Salario / Estipendio
                  </label>
                  <input
                    type="text"
                    required
                    value={stipendOrSalary}
                    onChange={(e) => setStipendOrSalary(e.target.value)}
                    placeholder="Ej. $18,000 MXN / mes"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Descripción Detallada
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe las responsabilidades y el impacto del puesto..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Requisitos (uno por línea)
                  </label>
                  <textarea
                    rows={3}
                    value={requirementsText}
                    onChange={(e) => setRequirementsText(e.target.value)}
                    placeholder="Estudiante avanzado&#10;Manejo de React&#10;Inglés básico"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Beneficios (uno por línea)
                  </label>
                  <textarea
                    rows={3}
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                    placeholder="Horario flexible&#10;Seguro médico&#10;Capacitación"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewForm(false)}
                  className="px-5 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition-all shadow-md"
                >
                  Publicar Vacante
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Posted Opportunities */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tus Vacantes Publicadas</h3>
          
          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase">
                      {opp.type}
                    </span>
                    <span className="text-xs text-slate-400">{opp.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{opp.title}</h4>
                  <div className="text-xs text-slate-500 mt-1">Salud/Compensación: <strong className="text-slate-700 dark:text-slate-300">{opp.stipendOrSalary}</strong></div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 tabular-nums">{opp.applicantsCount || 12}</div>
                    <div className="text-[11px] text-slate-400">Postulantes</div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition-colors">
                    Ver Candidatos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
