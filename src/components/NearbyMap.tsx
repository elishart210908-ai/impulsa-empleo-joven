import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Opportunity } from '../types';
import { MapPin, Navigation, Building2, ExternalLink, Sparkles } from 'lucide-react';

interface NearbyMapProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
}

export const NearbyMap: React.FC<NearbyMapProps> = ({ opportunities, onSelectOpportunity }) => {
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [userCenter, setUserCenter] = useState({ lat: 19.4326, lng: -99.1332 });
  const [userLocationName, setUserLocationName] = useState('Ciudad de México (Centro)');

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setUserLocationName('Tu ubicación actual (GPS)');
        },
        () => {
          alert('No se pudo obtener tu ubicación GPS. Usando ubicación predeterminada.');
        }
      );
    }
  };

  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Geolocalización de Empleo y Prácticas</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Oportunidades Cerca de Ti
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explora en el mapa interactivo las vacantes, becas y centros presenciales o híbridos en tu región.
            </p>
          </div>

          <button
            onClick={handleLocateMe}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap"
          >
            <Navigation className="w-4 h-4" />
            <span>Usar Mi Ubicación Actual</span>
          </button>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Map View */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[550px] relative">
            <APIProvider apiKey={apiKey}>
              <Map
                defaultCenter={userCenter}
                center={userCenter}
                defaultZoom={12}
                mapId="DEMO_MAP_ID"
                style={{ width: '100%', height: '100%' }}
                internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
              >
                {opportunities.map((opp) => {
                  if (!opp.lat || !opp.lng) return null;
                  return (
                    <AdvancedMarker
                      key={opp.id}
                      position={{ lat: opp.lat, lng: opp.lng }}
                      onClick={() => setSelectedOpp(opp)}
                    >
                      <Pin
                        background={opp.type === 'empleo' ? '#10B981' : opp.type === 'practicas' ? '#3B82F6' : '#8B5CF6'}
                        glyphColor="#FFFFFF"
                        borderColor="#FFFFFF"
                      />
                    </AdvancedMarker>
                  );
                })}
              </Map>
            </APIProvider>

            {/* Floating Info Card */}
            {selectedOpp && (
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 z-20 animate-fadeIn">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {selectedOpp.type}
                    </span>
                    <span className="text-xs text-slate-500">{selectedOpp.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{selectedOpp.title}</h4>
                  <div className="text-xs text-slate-600 dark:text-slate-300">{selectedOpp.company} · <strong className="text-slate-900 dark:text-white">{selectedOpp.stipendOrSalary}</strong></div>
                </div>

                <button
                  onClick={() => onSelectOpportunity(selectedOpp)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition-all shadow-md whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>Ver Detalles</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar list of nearby items */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 h-[550px] overflow-y-auto flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Ubicaciones Cercanas ({opportunities.filter(o => o.lat).length})
            </h3>
            
            <div className="space-y-3 flex-1">
              {opportunities.filter(o => o.lat).map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpp(opp)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedOpp?.id === opp.id 
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {opp.modality}
                    </span>
                    <span className="text-xs text-slate-400">{opp.location}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{opp.title}</h4>
                  <div className="text-xs text-slate-500 mt-1">{opp.company}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
