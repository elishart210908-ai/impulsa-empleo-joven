import React from 'react';
import { X, Download, Printer, FileText, CheckCircle, GraduationCap, Mail, User } from 'lucide-react';
import { UserProfile } from '../types';

interface CvPdfModalProps {
  userProfile: UserProfile;
  onClose: () => void;
}

export const CvPdfModal: React.FC<CvPdfModalProps> = ({ userProfile, onClose }) => {
  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col my-auto">
        
        {/* Modal Toolbar (hidden when printing) */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Vista Previa de CV Profesional</h3>
              <p className="text-xs text-slate-500">Listo para descargar como PDF y adjuntar a tus postulaciones</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-blue-600/20"
            >
              <Printer className="w-4 h-4" />
              <span>Guardar como PDF / Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Layout */}
        <div className="p-8 md:p-12 print:p-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex-1 space-y-8">
          
          {/* CV Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {userProfile.name}
            </h1>
            <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
              {userProfile.career}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-3">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                {userProfile.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                {userProfile.university}
              </span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold uppercase text-[10px]">
                Talento Verificado
              </span>
            </div>
          </div>

          {/* Profile Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Perfil Profesional
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {userProfile.bio || 'Estudiante apasionado por el desarrollo profesional y la creación de soluciones innovadoras.'}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Habilidades y Competencias
            </h2>
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-xl border border-blue-100 dark:border-blue-900"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Experience placeholder */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Formación Académica y Proyectos
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{userProfile.career}</h3>
                  <span className="text-xs text-slate-500">2023 - Presente</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{userProfile.university}</p>
                <p className="text-xs text-slate-500 mt-2">
                  Enfoque en desarrollo práctico, proyectos colaborativos y aplicación de tecnologías modernas.
                </p>
              </div>
            </div>
          </div>

          {/* Footer note for PDF */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400 print:block">
            CV generado a través de TalentoJoven Platform · Conectando el talento joven con oportunidades laborales.
          </div>

        </div>

      </div>
    </div>
  );
};
