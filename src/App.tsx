import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OpportunityList } from './components/OpportunityList';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { AICareerAdvisor } from './components/AICareerAdvisor';
import { MyApplications } from './components/MyApplications';
import { EventsList } from './components/EventsList';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { NearbyMap } from './components/NearbyMap';
import { ResourcesSection } from './components/ResourcesSection';
import { ProfileModal } from './components/ProfileModal';
import { INITIAL_OPPORTUNITIES, INITIAL_EVENTS } from './data/mockData';
import { Opportunity, Application, CareerEvent, UserProfile, ApplicationStatus } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('explore');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app-1',
      opportunityId: 'op-1',
      opportunityTitle: 'Desarrollador Frontend Junior (React / TypeScript)',
      company: 'TechNova Solutions',
      type: 'empleo',
      appliedDate: '10 de Noviembre, 2026',
      status: 'En Revisión',
      notes: 'Envié enlace a mi portafolio de GitHub'
    }
  ]);
  const [events, setEvents] = useState<CareerEvent[]>(INITIAL_EVENTS);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alejandro Ruiz',
    email: 'alejandro.ruiz@universidad.edu',
    role: 'estudiante',
    career: 'Ingeniería en Sistemas Computacionales',
    university: 'Universidad Nacional Autónoma',
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Git'],
    bio: 'Estudiante de último año apasionado por el desarrollo web y la creación de experiencias digitales excepcionales.'
  });

  const handleApply = (opp: Opportunity, notes?: string) => {
    // Check if already applied
    const existing = applications.find((a) => a.opportunityId === opp.id);
    if (existing) return;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      company: opp.company,
      type: opp.type,
      appliedDate: 'Hoy',
      status: 'Enviada',
      notes: notes || 'Postulación rápida con 1 clic'
    };

    setApplications([newApp, ...applications]);
  };

  const handleUpdateApplicationStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(applications.map((app) => app.id === appId ? { ...app, status: newStatus } : app));
  };

  const handleDeleteApplication = (appId: string) => {
    setApplications(applications.filter((app) => app.id !== appId));
  };

  const handleToggleRegisterEvent = (eventId: string) => {
    setEvents(events.map((ev) => ev.id === eventId ? { ...ev, registered: !ev.registered } : ev));
  };

  const handleAddOpportunity = (newOpp: Opportunity) => {
    setOpportunities([newOpp, ...opportunities]);
  };

  const alreadyAppliedSelected = selectedOpportunity ? applications.some(a => a.opportunityId === selectedOpportunity.id) : false;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Router */}
      <main>
        {currentView === 'explore' && (
          <>
            <Hero
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              onExploreClick={() => {
                const el = document.getElementById('oportunidades-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <div id="oportunidades-section">
              <OpportunityList
                opportunities={opportunities}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
              />
            </div>
          </>
        )}

        {currentView === 'map' && (
          <NearbyMap
            opportunities={opportunities}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
          />
        )}

        {currentView === 'ai-advisor' && <AICareerAdvisor />}

        {currentView === 'applications' && (
          <MyApplications
            applications={applications}
            onUpdateStatus={handleUpdateApplicationStatus}
            onDeleteApplication={handleDeleteApplication}
            onExploreClick={() => setCurrentView('explore')}
          />
        )}

        {currentView === 'events' && (
          <EventsList
            events={events}
            onToggleRegister={handleToggleRegisterEvent}
          />
        )}

        {currentView === 'resources' && <ResourcesSection />}

        {currentView === 'recruiter' && (
          <RecruiterDashboard
            opportunities={opportunities}
            onAddOpportunity={handleAddOpportunity}
          />
        )}
      </main>

      {/* Opportunity Detail Modal */}
      {selectedOpportunity && (
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onApply={handleApply}
          alreadyApplied={alreadyAppliedSelected}
        />
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          userProfile={userProfile}
          onSaveProfile={(updated) => setUserProfile(updated)}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              TJ
            </div>
            <span className="text-white font-bold text-base">TalentoJoven</span>
            <span className="text-xs text-slate-500">© 2026 Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <button onClick={() => setCurrentView('explore')} className="hover:text-white transition-colors">Oportunidades</button>
            <button onClick={() => setCurrentView('ai-advisor')} className="hover:text-white transition-colors">Orientación IA</button>
            <button onClick={() => setCurrentView('applications')} className="hover:text-white transition-colors">Mis Postulaciones</button>
            <button onClick={() => setCurrentView('events')} className="hover:text-white transition-colors">Ferias y Eventos</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
