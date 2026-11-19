import React from 'react';
import { Briefcase, User, Building2, Sparkles, Calendar, BookmarkCheck, PlusCircle, MapPin, BookOpen } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  userProfile,
  onOpenProfile
}) => {
  if (!userProfile) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setCurrentView('explore')}>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Talento<span className="text-blue-600 dark:text-blue-400">Joven</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => setCurrentView('explore')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white ${currentView === 'explore' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
          >
            Oportunidades
          </button>
          <button 
            onClick={() => setCurrentView('map')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white ${currentView === 'map' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
          >
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>Mapa Cercano</span>
          </button>
          <button 
            onClick={() => setCurrentView('ai-advisor')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white ${currentView === 'ai-advisor' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Orientación IA</span>
          </button>
          <button 
            onClick={() => setCurrentView('applications')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white ${currentView === 'applications' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Mis Postulaciones</span>
          </button>
          <button 
            onClick={() => setCurrentView('events')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white ${currentView === 'events' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
          >
            <Calendar className="w-4 h-4" />
            <span>Ferias y Eventos</span>
          </button>
          <button 
            onClick={() => setCurrentView('resources')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white ${currentView === 'resources' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
          >
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>Recursos</span>
          </button>
          {userProfile.role === 'empresa' && (
            <button 
              onClick={() => setCurrentView('recruiter')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white ${currentView === 'recruiter' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
            >
              <Building2 className="w-4 h-4" />
              <span>Panel Reclutador</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Role switcher badge / button */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => {}}
              className={`px-2.5 py-1 rounded-md transition-all ${userProfile.role === 'estudiante' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Estudiante
            </button>
            <button
              onClick={() => {
                // Toggle to recruiter mode or open panel
                setCurrentView(userProfile.role === 'estudiante' ? 'recruiter' : 'explore');
              }}
              className={`px-2.5 py-1 rounded-md transition-all ${userProfile.role === 'empresa' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Empresa
            </button>
          </div>

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="hidden md:inline">{userProfile.name}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
