import React, { useState } from 'react';
import { Sparkles, FileText, MessageSquare, Compass, Send, CheckCircle2, AlertCircle, Award, ArrowRight, RefreshCw } from 'lucide-react';

export const AICareerAdvisor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cv' | 'interview' | 'roadmap'>('cv');

  // CV Analyzer state
  const [cvText, setCvText] = useState('');
  const [targetRole, setTargetRole] = useState('Desarrollador Frontend Junior');
  const [cvAnalysis, setCvAnalysis] = useState<any>(null);
  const [loadingCv, setLoadingCv] = useState(false);

  // AI Interview state
  const [interviewRole, setInterviewRole] = useState('Desarrollador Frontend Junior');
  const [interviewHistory, setInterviewHistory] = useState<Array<{ role: string; text: string }>>([]);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('¡Hola! Bienvenido a tu simulación de entrevista. Cuéntanos brevemente quién eres, qué tecnologías dominas y por qué te interesa esta posición.');
  const [lastFeedback, setLastFeedback] = useState('');
  const [loadingInterview, setLoadingInterview] = useState(false);

  // Roadmap state
  const [careerGoal, setCareerGoal] = useState('Ingeniero de Datos Junior');
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  // Handlers
  const handleAnalyzeCv = async () => {
    if (!cvText.trim()) return;
    setLoadingCv(true);
    try {
      const res = await fetch('/api/gemini/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, targetRole })
      });
      const data = await res.json();
      setCvAnalysis(data);
    } catch (err) {
      console.error(err);
      alert('Error al analizar CV con IA');
    } finally {
      setLoadingCv(false);
    }
  };

  const handleStartInterview = async () => {
    setLoadingInterview(true);
    setInterviewHistory([]);
    setLastFeedback('');
    try {
      const res = await fetch('/api/gemini/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: interviewRole, history: [], candidateAnswer: '' })
      });
      const data = await res.json();
      setCurrentQuestion(data.nextQuestion || '¿Cuál es tu mayor fortaleza técnica?');
      setLastFeedback(data.feedback || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInterview(false);
    }
  };

  const handleSendAnswer = async () => {
    if (!candidateAnswer.trim()) return;
    const newHistory = [...interviewHistory, { role: 'user', parts: [{ text: candidateAnswer }] }, { role: 'model', parts: [{ text: currentQuestion }] }];
    setLoadingInterview(true);
    try {
      const res = await fetch('/api/gemini/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: interviewRole, history: newHistory, candidateAnswer })
      });
      const data = await res.json();
      setInterviewHistory([
        ...interviewHistory,
        { role: 'user', text: candidateAnswer },
        { role: 'model', text: currentQuestion }
      ]);
      setCurrentQuestion(data.nextQuestion);
      setLastFeedback(data.feedback);
      setCandidateAnswer('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInterview(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!careerGoal.trim()) return;
    setLoadingRoadmap(true);
    try {
      const res = await fetch('/api/gemini/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerGoal })
      });
      const data = await res.json();
      setRoadmapData(data);
    } catch (err) {
      console.error(err);
      alert('Error al generar ruta de carrera');
    } finally {
      setLoadingRoadmap(false);
    }
  };

  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Asistente de Empleabilidad con IA (Gemini)</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Potencia tu perfil profesional con Inteligencia Artificial
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Mejora tu currículum, practica entrevistas reales y descubre qué habilidades necesitas para destacar en tu sector.
          </p>

          {/* Subtabs */}
          <div className="flex items-center justify-center gap-2 mt-8 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setActiveTab('cv')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === 'cv' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Analizador de CV</span>
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === 'interview' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Simulador de Entrevista</span>
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === 'roadmap' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <Compass className="w-4 h-4" />
              <span>Ruta de Carrera (Roadmap)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: CV Analyzer */}
        {activeTab === 'cv' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Paso 1: Ingresa tu perfil o CV</h3>
              <p className="text-xs text-slate-500 mb-4">Pega el texto de tu currículum actual, resumen académico o proyectos destacados.</p>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Puesto o área objetivo
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Texto de tu CV / Resumen
                </label>
                <textarea
                  rows={8}
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Ej: Estudiante de 7mo semestre de Computación. Conocimientos en JavaScript, React, HTML/CSS. Proyecto final: Aplicación de gestión de tareas con API REST..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                onClick={handleAnalyzeCv}
                disabled={loadingCv || !cvText.trim()}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loadingCv ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analizando CV con Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Evaluar y Mejorar con IA</span>
                  </>
                )}
              </button>
            </div>

            {/* Results */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Resultado del Análisis</h3>
              
              {!cvAnalysis ? (
                <div className="text-center py-16 text-slate-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Completa el formulario y haz clic en evaluar para obtener retroalimentación instantánea de IA.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
                    <div>
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Puntuación de Empleabilidad</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">Basado en estándares para juniors</div>
                    </div>
                    <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                      {cvAnalysis.score}/100
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Resumen de IA</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl">
                      {cvAnalysis.summary}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Fortalezas Identificadas</div>
                    <ul className="space-y-1.5">
                      {cvAnalysis.strengths?.map((str: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Áreas de Mejora y Sugerencias</div>
                    <ul className="space-y-1.5">
                      {cvAnalysis.improvements?.map((imp: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: AI Mock Interview */}
        {activeTab === 'interview' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Simulador de Entrevista IA</h3>
                <p className="text-xs text-slate-500">Practica tus respuestas con un reclutador virtual experto.</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  value={interviewRole}
                  onChange={(e) => setInterviewRole(e.target.value)}
                  placeholder="Puesto ej. Frontend Junior"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
                />
                <button
                  onClick={handleStartInterview}
                  disabled={loadingInterview}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl transition-all shadow-md whitespace-nowrap"
                >
                  Reiniciar Simulación
                </button>
              </div>
            </div>

            {/* Chat history & current question */}
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {interviewHistory.map((item, index) => (
                <div key={index} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    item.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
                  }`}>
                    <div className="text-[10px] opacity-70 mb-1">{item.role === 'user' ? 'Tú' : 'Reclutador IA'}</div>
                    {item.text}
                  </div>
                </div>
              ))}

              {/* Current Active Question */}
              <div className="flex justify-start">
                <div className="max-w-[85%] p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-slate-900 dark:text-white rounded-bl-none">
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mb-1">Reclutador IA (Pregunta Actual)</div>
                  <p className="text-sm font-medium">{currentQuestion}</p>
                </div>
              </div>
            </div>

            {lastFeedback && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200">
                <span className="font-bold">Feedback anterior: </span> {lastFeedback}
              </div>
            )}

            {/* Answer Input */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAnswer()}
                placeholder="Escribe tu respuesta aquí..."
                className="flex-1 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendAnswer}
                disabled={loadingInterview || !candidateAnswer.trim()}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {loadingInterview ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Enviar</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Career Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl mx-auto text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Genera tu Ruta de Carrera</h3>
              <p className="text-xs text-slate-500 mb-4">Dinos qué rol profesional deseas alcanzar y la IA creará un plan paso a paso.</p>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="Ej. Desarrollador FullStack, Data Scientist..."
                  className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none"
                />
                <button
                  onClick={handleGenerateRoadmap}
                  disabled={loadingRoadmap || !careerGoal.trim()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl transition-all shadow-md whitespace-nowrap"
                >
                  {loadingRoadmap ? 'Generando...' : 'Crear Roadmap'}
                </button>
              </div>
            </div>

            {roadmapData && (
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{roadmapData.title}</h3>
                  <p className="text-sm text-slate-500">{roadmapData.description}</p>
                  <div className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                    Duración estimada: {roadmapData.estimatedDuration}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roadmapData.phases?.map((phase: any, idx: number) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                            {phase.phaseNumber || idx + 1}
                          </span>
                          <span className="text-xs text-slate-400">Fase</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{phase.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">{phase.description}</p>
                        
                        <div className="mb-4">
                          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Habilidades clave</div>
                          <div className="flex flex-wrap gap-1">
                            {phase.keySkills?.map((sk: string, sIdx: number) => (
                              <span key={sIdx} className="px-2 py-0.5 text-[11px] bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-600">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Recomendado: {phase.recommendedAction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
