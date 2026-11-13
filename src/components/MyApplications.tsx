import React from 'react';
import { BookmarkCheck, Building2, Calendar, Clock, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { Application, ApplicationStatus } from '../types';

interface MyApplicationsProps {
  applications: Application[];
  onUpdateStatus: (appId: string, newStatus: ApplicationStatus) => void;
  onDeleteApplication: (appId: string) => void;
  onExploreClick: () => void;
}

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  'Guardada': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  'Enviada': 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  'En Revisión': 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  'Entrevista Programada': 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
  'Oferta Recibida': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  'Descartada': 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
};

export const MyApplications: React.FC<MyApplicationsProps> = ({
  applications,
  onUpdateStatus,
  onDeleteApplication,
  onExploreClick
}) => {
  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Mis Postulaciones y Seguimiento
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Gestiona el estado de tus candidaturas a empleos, prácticas y becas ({applications.length} registradas)
            </p>
          </div>
          <button
            onClick={onExploreClick}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition-colors shadow-md shadow-blue-600/20 whitespace-nowrap"
          >
            Explorar Más Oportunidades
          </button>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <BookmarkCheck className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No tienes postulaciones activas</h3>
            <p className="text-sm text-slate-500 mb-6">Explora las ofertas disponibles y postúlate con 1 clic.</p>
            <button
              onClick={onExploreClick}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition-colors shadow-md"
            >
              Ver Oportunidades
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="p-4 pl-6">Oportunidad</th>
                    <th className="p-4">Empresa</th>
                    <th className="p-4">Fecha Postulación</th>
                    <th className="p-4">Estado Actual</th>
                    <th className="p-4 pr-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-slate-900 dark:text-white">
                        {app.opportunityTitle}
                        {app.notes && (
                          <div className="text-xs font-normal text-slate-500 mt-0.5 truncate max-w-xs">
                            Nota: {app.notes}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {app.company}
                      </td>
                      <td className="p-4 text-slate-500 text-xs tabular-nums">
                        {app.appliedDate}
                      </td>
                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-none outline-none cursor-pointer ${STATUS_COLORS[app.status]}`}
                        >
                          <option value="Guardada">Guardada</option>
                          <option value="Enviada">Enviada</option>
                          <option value="En Revisión">En Revisión</option>
                          <option value="Entrevista Programada">Entrevista Programada</option>
                          <option value="Oferta Recibida">Oferta Recibida</option>
                          <option value="Descartada">Descartada</option>
                        </select>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => onDeleteApplication(app.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Eliminar postulación"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
