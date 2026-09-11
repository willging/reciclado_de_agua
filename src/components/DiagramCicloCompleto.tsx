import React, { useState, useEffect } from 'react';
import { ANIMATION_STEPS, SIDEREA_COMPONENTS } from '../data/sideReaData';
import { ComponentInfo } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Droplet, 
  Waves, 
  Sparkles,
  Zap,
  CheckCircle2,
  Info
} from 'lucide-react';

interface DiagramCicloCompletoProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onSelectComponent: (component: ComponentInfo) => void;
}

export const DiagramCicloCompleto: React.FC<DiagramCicloCompletoProps> = ({
  isPlaying,
  onTogglePlay,
  speed,
  onSelectComponent,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeFixture, setActiveFixture] = useState<'none' | 'ducha' | 'lavarropas' | 'inodoro'>('none');
  const [greyTankLevel, setGreyTankLevel] = useState(65);
  const [recycledLitersCount, setRecycledLitersCount] = useState(0);

  // Auto-advance step when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev >= 6 ? 1 : prev + 1;
        // Simulate tank level change
        if (next === 2 || next === 3) {
          setGreyTankLevel(lvl => Math.min(lvl + 10, 95));
          setActiveFixture('ducha');
        } else if (next === 5) {
          setGreyTankLevel(lvl => Math.max(lvl - 15, 30));
          setActiveFixture('inodoro');
          setRecycledLitersCount(c => c + 10);
        } else {
          setActiveFixture('none');
        }
        return next;
      });
    }, 4500 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const stepInfo = ANIMATION_STEPS.find(s => s.id === currentStep) || ANIMATION_STEPS[0];
  const getComp = (id: string) => SIDEREA_COMPONENTS.find(c => c.id === id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col">
      {/* Title and Controls header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
              Simulación Integrada
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Ciclo Completo SiDeReA
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Recorrido interactivo paso a paso: desde el ingreso de agua potable hasta su recuperación, purificación y reuso en el inodoro.
          </p>
        </div>

        {/* Step progress pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {ANIMATION_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                currentStep === step.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{step.id}</span>
              <span className="hidden sm:inline text-[11px] font-normal opacity-90">
                {step.title.split('. ')[1]?.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active step explanation banner */}
      <div className="my-3 p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            {stepInfo.id}
          </div>
          <div>
            <h3 className="text-sm font-bold text-sky-950">
              {stepInfo.title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
              {stepInfo.description}
            </p>
          </div>
        </div>

        {/* Step navigational arrows */}
        <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
          <button
            onClick={() => setCurrentStep(prev => prev > 1 ? prev - 1 : 6)}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs"
            title="Paso anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onTogglePlay}
            className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pausar' : 'Auto-reproducir'}</span>
          </button>
          <button
            onClick={() => setCurrentStep(prev => prev < 6 ? prev + 1 : 1)}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs"
            title="Paso siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas for Full House Cross-Section Simulation */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden select-none">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="potableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="greyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>

          {/* House Structure Outline */}
          <g id="house-architecture">
            {/* Ground line */}
            <line x1="30" y1="520" x2="970" y2="520" stroke="#94a3b8" strokeWidth="4" />
            <rect x="30" y="520" width="940" height="70" fill="#f8fafc" />

            {/* House outline */}
            <path
              d="M 120 520 L 120 180 L 500 70 L 880 180 L 880 520 Z"
              fill="url(#wallGradient)"
              stroke="#cbd5e1"
              strokeWidth="4"
            />
            {/* Internal room partition lines */}
            <line x1="120" y1="340" x2="680" y2="340" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4 4" />
            <line x1="450" y1="180" x2="450" y2="520" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4 4" />
            <line x1="680" y1="180" x2="680" y2="520" stroke="#cbd5e1" strokeWidth="4" />

            {/* Room labels */}
            <text x="140" y="210" fill="#94a3b8" fontSize="12" fontWeight="bold">PLANTA ALTA: BAÑO</text>
            <text x="140" y="370" fill="#94a3b8" fontSize="12" fontWeight="bold">PLANTA BAJA: LAVADERO & COCINA</text>
            <text x="700" y="210" fill="#94a3b8" fontSize="12" fontWeight="bold">ÁREA TÉCNICA SiDeReA</text>
            <text x="700" y="550" fill="#94a3b8" fontSize="12" fontWeight="bold">CONEXIÓN CLOACAL EXTERIOR</text>
          </g>

          {/* POTABLE WATER MAINS SUPPLY (Step 1) */}
          <g id="mains-supply" opacity={currentStep === 1 || currentStep === 2 ? 1 : 0.4}>
            {/* Mains street line */}
            <path d="M 40 480 L 100 480 L 100 130 L 730 130" stroke="#0284c7" strokeWidth="5" fill="none" strokeDasharray="6 4" className={isPlaying ? "animate-pipe-blue" : ""} />
            <text x="50" y="470" fill="#0284c7" fontSize="11" fontWeight="bold">Red de Agua Pública</text>
          </g>

          {/* TANQUE DE RESERVA GENERAL (Rooftop / attic) */}
          <g transform="translate(460, 85)">
            <rect x="0" y="0" width="70" height="50" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            <rect x="6" y="16" width="58" height="28" rx="4" fill="url(#potableGradient)" opacity="0.85" />
            <text x="35" y="12" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">Tanque Reserva</text>
            <text x="35" y="32" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Potable</text>
          </g>

          {/* POTABLE DISTRIBUTION LINE TO FIXTURES */}
          <g id="potable-distribution-flow">
            <path
              d="M 460 110 L 200 110 L 200 480"
              stroke="#0284c7"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className={isPlaying && (currentStep === 1 || currentStep === 2) ? "animate-pipe-blue" : ""}
            />
            {/* Branch to shower */}
            <line x1="200" y1="230" x2="260" y2="230" stroke="#0284c7" strokeWidth="3.5" />
            {/* Branch to sink */}
            <line x1="200" y1="290" x2="360" y2="290" stroke="#0284c7" strokeWidth="3.5" />
            {/* Branch to washer & kitchen */}
            <line x1="200" y1="420" x2="280" y2="420" stroke="#0284c7" strokeWidth="3.5" />
            <line x1="200" y1="470" x2="380" y2="470" stroke="#0284c7" strokeWidth="3.5" />
          </g>

          {/* FIXTURE 1: DUCHA (Bathroom) */}
          <g transform="translate(250, 205)">
            <rect x="0" y="0" width="40" height="40" rx="4" fill="none" stroke="#0f172a" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <path d="M 10 25 L 25 25 L 25 15 L 35 15" stroke="#0284c7" strokeWidth="2.5" fill="none" />
            <line x1="33" y1="12" x2="40" y2="20" stroke="#0284c7" strokeWidth="3" />
            {/* Flowing drops */}
            {(currentStep === 2 || activeFixture === 'ducha') && (
              <g stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 3">
                <line x1="38" y1="20" x2="45" y2="35" />
                <line x1="35" y1="20" x2="38" y2="35" />
              </g>
            )}
            <text x="25" y="46" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">Ducha</text>
          </g>

          {/* FIXTURE 2: LAVAMANOS / BIDET */}
          <g transform="translate(340, 265)">
            <path d="M 10 18 L 36 18 Q 30 32 23 32 Q 16 32 10 18 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <text x="23" y="43" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">Lavatorio</text>
          </g>

          {/* FIXTURE 3: INODORO (Bathroom) */}
          <g transform="translate(140, 250)">
            <rect x="15" y="8" width="18" height="26" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <path d="M 5 28 Q 5 44 20 44 L 30 44 Q 40 44 40 28 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <rect x="12" y="44" width="16" height="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <text x="22" y="64" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">Inodoro</text>
            <text x="22" y="74" fill="#059669" fontSize="8" fontWeight="bold" textAnchor="middle">40% Reciclado</text>
          </g>

          {/* FIXTURE 4: LAVARROPAS (Laundry) */}
          <g transform="translate(260, 420)">
            <rect x="0" y="0" width="46" height="52" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="23" cy="30" r="14" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
            <circle cx="23" cy="30" r="8" fill={currentStep === 2 ? "#bae6fd" : "#e2e8f0"} />
            <text x="23" y="64" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">Lavarropas</text>
          </g>

          {/* FIXTURE 5: COCINA (Kitchen sink) */}
          <g transform="translate(360, 440)">
            <rect x="0" y="0" width="45" height="28" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="30" cy="14" r="5" fill="#cbd5e1" />
            <text x="23" y="40" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">Cocina</text>
          </g>

          {/* FILTERS AND INTERCEPTORS (Step 3) */}
          {/* PP Baño solid filter */}
          <g
            id="sim-filtro-solidos"
            className="cursor-pointer hover:opacity-80"
            transform="translate(420, 280)"
            onClick={() => onSelectComponent(getComp('filtro-solidos')!)}
          >
            <rect x="0" y="0" width="30" height="24" rx="3" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
            <line x1="5" y1="8" x2="25" y2="8" stroke="#64748b" strokeWidth="1.5" strokeDasharray="1 1" />
            <line x1="5" y1="14" x2="25" y2="14" stroke="#64748b" strokeWidth="1.5" strokeDasharray="1 1" />
            <text x="15" y="-4" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">Filtro Sólidos</text>
          </g>

          {/* PP Cocina grease interceptor */}
          <g
            id="sim-interceptor-grasas"
            className="cursor-pointer hover:opacity-80"
            transform="translate(430, 450)"
            onClick={() => onSelectComponent(getComp('interceptor-grasas')!)}
          >
            <rect x="0" y="0" width="30" height="24" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <circle cx="15" cy="12" r="6" fill="#fde68a" />
            <text x="15" y="-4" fill="#b45309" fontSize="8" fontWeight="bold" textAnchor="middle">Trampa Grasas</text>
          </g>

          {/* GREYWATER PIPES TO RECUPERATOR (Grey line) */}
          <g id="grey-drain-to-tank">
            {/* Drains from bathroom */}
            <path
              d="M 285 245 L 285 292 L 420 292"
              stroke="#475569"
              strokeWidth="4"
              fill="none"
              className={isPlaying && (currentStep === 2 || currentStep === 3) ? "animate-pipe-grey" : ""}
            />
            {/* Drains from laundry/kitchen */}
            <path
              d="M 306 470 L 430 470 M 380 470 L 430 470"
              stroke="#475569"
              strokeWidth="4"
              fill="none"
              className={isPlaying && (currentStep === 2 || currentStep === 3) ? "animate-pipe-grey" : ""}
            />
            {/* Main collector into recuperator tank */}
            <path
              d="M 450 292 L 540 292 L 540 380 L 710 380"
              stroke="#475569"
              strokeWidth="5"
              fill="none"
              className={isPlaying && (currentStep === 3 || currentStep === 4) ? "animate-pipe-grey" : ""}
            />
          </g>

          {/* AREA TECNICA SIDEREA (Right section) */}
          
          {/* TANQUE DE REASEGURO (Page VI) */}
          <g
            transform="translate(730, 110)"
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSelectComponent(getComp('tanque-reaseguro')!)}
          >
            <circle cx="35" cy="35" r="32" fill="#f0f9ff" stroke="#0284c7" strokeWidth="4" />
            <circle cx="35" cy="35" r="22" fill="url(#potableGradient)" opacity="0.8" />
            <text x="35" y="32" fill="#0f172a" fontSize="8.5" fontWeight="bold" textAnchor="middle">Tanque de</text>
            <text x="35" y="44" fill="#0284c7" fontSize="8.5" fontWeight="bold" textAnchor="middle">reaseguro</text>
          </g>

          {/* TANQUE RECUPERADOR DE AGUAS GRISES (Page VI / VII) */}
          <g
            transform="translate(710, 240)"
            className="cursor-pointer hover:opacity-90"
            onClick={() => onSelectComponent(getComp('tanque-recuperador')!)}
          >
            {/* Tank shell */}
            <circle cx="70" cy="70" r="65" fill="#f8fafc" stroke="#334155" strokeWidth="8" />
            
            {/* Water level based on state */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="url(#greyGradient)"
              opacity="0.8"
            />
            
            <text x="70" y="60" fill="#0f172a" fontSize="10.5" fontWeight="bold" textAnchor="middle">Tanque Recuperador</text>
            <text x="70" y="74" fill="#334155" fontSize="10.5" fontWeight="bold" textAnchor="middle">Aguas Grises</text>
            <text x="70" y="90" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">
              Capacidad: {greyTankLevel}%
            </text>

            {/* Purifier dispenser attached below */}
            <rect x="42" y="136" width="56" height="24" rx="4" fill="#ffffff" stroke="#475569" strokeWidth="2" />
            <text x="70" y="148" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">Dispenser</text>
            <text x="70" y="156" fill="#0284c7" fontSize="7.5" fontWeight="bold" textAnchor="middle">Purificador</text>
          </g>

          {/* BOMBA DE IMPULSION & ASEGURADOR DE CAUDAL */}
          <g transform="translate(620, 240)">
            {/* Pump */}
            <rect x="0" y="0" width="40" height="26" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="20" cy="13" r="6" fill={currentStep === 5 ? "#10b981" : "#94a3b8"} />
            <text x="20" y="-4" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">Bomba Impulsión</text>

            {/* Flow regulator */}
            <polygon points="50,6 62,13 50,20" fill="#f59e0b" />
            <polygon points="62,6 50,13 62,20" fill="#f59e0b" />
            <text x="56" y="32" fill="#b45309" fontSize="7" fontWeight="bold" textAnchor="middle">Caudal</text>
          </g>

          {/* RECYCLED WATER REUSE LINE: FROM RECUPERATOR TO TOILET (Step 5) */}
          <g id="recycled-to-toilet-line">
            <path
              d="M 710 270 L 660 270 L 620 253 L 480 253 L 480 215 L 160 215 L 160 250"
              stroke="#475569"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className={isPlaying && currentStep === 5 ? "animate-pipe-grey" : ""}
            />
            {currentStep === 5 && (
              <text x="320" y="210" fill="#059669" fontSize="11" fontWeight="bold" textAnchor="middle">
                💧 Suministrando agua gris purificada a la mochila del inodoro
              </text>
            )}
          </g>

          {/* BLACKWATER DRAIN LINE (Página VII): FROM TOILET TO CÁMARA DE INSPECCIÓN */}
          <g id="blackwater-cloacas-line">
            <path
              d="M 160 300 L 160 540 L 780 540"
              stroke="#b91c1c"
              strokeWidth="10"
              strokeDasharray="10 6"
              fill="none"
              className={isPlaying && currentStep === 6 ? "animate-pipe-red" : ""}
            />

            {/* Overflow from greywater tank into chamber */}
            <path
              d="M 830 310 L 830 500"
              stroke="#475569"
              strokeWidth="3.5"
              fill="none"
              strokeDasharray="4 4"
            />
            <text x="830" y="380" fill="#475569" fontSize="8" fontWeight="bold" transform="rotate(90, 830, 380)">
              Válvula de Rebalse
            </text>

            {/* CÁMARA DE INSPECCIÓN (Page VII) */}
            <g
              transform="translate(780, 480)"
              className="cursor-pointer hover:opacity-90"
              onClick={() => onSelectComponent(getComp('camara-inspeccion')!)}
            >
              <rect x="0" y="0" width="70" height="70" fill="#ffffff" stroke="#0f172a" strokeWidth="6" />
              <rect x="8" y="8" width="54" height="54" fill="#fce7f3" />
              <text x="35" y="32" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">Cámara de</text>
              <text x="35" y="44" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">Inspección</text>
            </g>

            {/* Line out to municipal sewer */}
            <line x1="850" y1="515" x2="960" y2="515" stroke="#b91c1c" strokeWidth="10" strokeDasharray="10 6" />
            <text x="910" y="540" fill="#b91c1c" fontSize="10" fontWeight="bold">A red cloacal</text>
          </g>
        </svg>

        {/* Live Simulation Stats Panel */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-3 shadow-xs max-w-xs text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-sky-600" />
              Métricas del Ciclo
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              SiDeReA Activo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <span className="text-slate-500 block text-[10px]">Tanque Grises:</span>
              <span className="font-bold text-slate-800 text-sm">{greyTankLevel}%</span>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
              <span className="text-emerald-700 block text-[10px]">Agua Ahorrada:</span>
              <span className="font-bold text-emerald-800 text-sm">+{recycledLitersCount} L</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 pt-1 leading-tight">
            * Cada descarga de inodoro reutiliza ~10L de agua gris, ahorrando agua 100% potable.
          </div>
        </div>
      </div>

      {/* Actionable Fixture Simulation buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Probar artefactos en vivo:
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveFixture('ducha');
              setCurrentStep(2);
              setGreyTankLevel(lvl => Math.min(lvl + 15, 95));
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 transition-colors"
          >
            🚿 Abrir Ducha (Genera agua gris)
          </button>

          <button
            onClick={() => {
              setActiveFixture('lavarropas');
              setCurrentStep(2);
              setGreyTankLevel(lvl => Math.min(lvl + 20, 95));
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200 transition-colors"
          >
            🧺 Encender Lavarropas (+filtro grasas)
          </button>

          <button
            onClick={() => {
              setActiveFixture('inodoro');
              setCurrentStep(5);
              setGreyTankLevel(lvl => Math.max(lvl - 10, 20));
              setRecycledLitersCount(c => c + 10);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs transition-colors"
          >
            🚽 Descargar Inodoro (Reutiliza 10L reciclados)
          </button>
        </div>
      </div>
    </div>
  );
};
