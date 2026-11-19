import React, { useState } from 'react';
import { Briefcase, User, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginModalProps {
  onLogin: (profile: UserProfile) => void;
  onLoadDemoProfile: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onLoadDemoProfile }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [career, setCareer] = useState('Ingeniería en Sistemas');
  const [university, setUniversity] = useState('Universidad Nacional');
  const [role, setRole] = useState<'estudiante' | 'empresa'>('estudiante');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    // Check if profile exists in localStorage for this email
    const storageKey = `talentojoven_profile_${email.trim().toLowerCase()}`;
    const saved = localStorage.getItem(storageKey);

    let userProfile: UserProfile;
    if (saved) {
      try {
        userProfile = JSON.parse(saved);
      } catch (err) {
        userProfile = createNewProfile();
      }
    } else {
      userProfile = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        career: career.trim(),
        university: university.trim(),
        skills: ['JavaScript', 'React', 'Comunicación', 'Trabajo en equipo'],
        bio: `Estudiante de ${career} en ${university}. Apasionado por aprender y aportar valor.`
      };
      localStorage.setItem(storageKey, JSON.stringify(userProfile));
    }

    localStorage.setItem('talentojoven_current_email', userProfile.email);
    onLogin(userProfile);
  };

  const createNewProfile = (): UserProfile => ({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    career: career.trim(),
    university: university.trim(),
    skills: ['JavaScript', 'React'],
    bio: 'Estudiante motivado buscando mi primera oportunidad profesional.'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-blue-500/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bienvenido a Talento<span className="text-blue-600">Joven</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Inicia sesión o crea tu cuenta individual para acceder a tu perfil y recomendaciones de IA.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Correo Electrónico (Tu cuenta única)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@universidad.edu"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="María Pérez"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Carrera
              </label>
              <input
                type="text"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Universidad
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>Ingresar con mi cuenta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <span className="relative px-3 bg-white dark:bg-slate-900 text-[11px] text-slate-400 uppercase">o prueba rápida</span>
        </div>

        {/* Demo profile quick load */}
        <button
          onClick={onLoadDemoProfile}
          className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Cargar perfil de demostración (Alejandro Ruiz)</span>
        </button>

      </div>
    </div>
  );
};
