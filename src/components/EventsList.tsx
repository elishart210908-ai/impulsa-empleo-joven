import React from 'react';
import { Calendar, Clock, User, CheckCircle2, Video, Sparkles } from 'lucide-react';
import { CareerEvent } from '../types';

interface EventsListProps {
  events: CareerEvent[];
  onToggleRegister: (eventId: string) => void;
}

export const EventsList: React.FC<EventsListProps> = ({ events, onToggleRegister }) => {
  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Capacitación y Networking</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Ferias de Empleo, Webinars y Talleres
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Conéctate con reclutadores en vivo, asiste a masterclasses y potencia tus habilidades profesionales sin costo.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 uppercase tracking-wider">
                    {ev.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ev.time}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {ev.title}
                </h3>
                
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  Organiza: {ev.organizer}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {ev.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Ponente / Speaker: <strong className="text-slate-900 dark:text-white">{ev.speaker}</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{ev.date}</span>
                </div>

                <button
                  onClick={() => onToggleRegister(ev.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl transition-all ${
                    ev.registered 
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                  }`}
                >
                  {ev.registered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Inscrito / Asistiré</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4" />
                      <span>Reservar Mi Lugar Gratis</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
