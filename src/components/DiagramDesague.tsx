import React, { useState } from 'react';
import { ComponentInfo } from '../types';
import { SIDEREA_COMPONENTS } from '../data/sideReaData';
import { Info, Play, Pause, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface DiagramDesagueProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onSelectComponent: (component: ComponentInfo) => void;
}

export const DiagramDesague: React.FC<DiagramDesagueProps> = ({
  isPlaying,
  onTogglePlay,
  speed,
  onSelectComponent,
}) => {
  const [simulateOverflow, setSimulateOverflow] = useState(false);
  const [simulateFlush, setSimulateFlush] = useState(false);

  const getComponent = (id: string) => SIDEREA_COMPONENTS.find(c => c.id === id);

  const triggerFlushSimulation = () => {
    setSimulateFlush(true);
    setTimeout(() => setSimulateFlush(false), 3500);
  };

  const triggerOverflowSimulation = () => {
    setSimulateOverflow(prev => !prev);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col">
      {/* Top Diagram Header matching Page VII */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
              PÁGINA VII
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              DESAGÜE
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Separación de efluentes: aguas cloacales directas a red pública y válvula de rebalse del recuperador.
          </p>
        </div>

        {/* Interactive Simulation triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerFlushSimulation}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              simulateFlush
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping"></span>
            Simular Descarga Inodoro
          </button>

          <button
            onClick={triggerOverflowSimulation}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              simulateOverflow
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {simulateOverflow ? 'Rebalse Activo (100%)' : 'Simular Tanque Lleno / Rebalse'}
          </button>
        </div>
      </div>

      {/* SVG Canvas Area for Page VII */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px] bg-slate-50/50 rounded-xl border border-slate-200 mt-4 overflow-hidden select-none">
        
        {/* Architectural layout guidelines */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#b91c1c_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <svg
          viewBox="0 0 1000 620"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="chamberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fce7f3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Dividing architectural walls (Page VII) */}
          <g stroke="#fed7aa" strokeWidth="14" opacity="0.6" strokeLinecap="round">
            {/* Horizontal wall upper */}
            <line x1="120" y1="210" x2="380" y2="210" />
            {/* Horizontal wall lower */}
            <line x1="120" y1="335" x2="380" y2="335" />
            {/* Vertical interior shaft */}
            <line x1="380" y1="160" x2="380" y2="450" />
          </g>

          {/* RED DASHED NETWORK: AGUAS CLOACALES (from Inodoro straight to Cámara de inspección -> A Red) */}
          <g id="cloacal-network">
            {/* Main horizontal cloacal line from Toilet to Chamber */}
            <line
              x1="220"
              y1="300"
              x2="480"
              y2="300"
              stroke="#b91c1c"
              strokeWidth="14"
              strokeDasharray="14 10"
              strokeLinecap="butt"
              className={isPlaying || simulateFlush ? 'animate-pipe-red' : 'animate-pipe-paused'}
              style={{ animationDuration: `${1.1 / speed}s` }}
            />

            {/* Vertical exit line from Chamber down to municipal sewer */}
            <line
              x1="550"
              y1="400"
              x2="550"
              y2="520"
              stroke="#b91c1c"
              strokeWidth="14"
              strokeDasharray="14 10"
              strokeLinecap="butt"
              className={isPlaying || simulateFlush ? 'animate-pipe-red' : 'animate-pipe-paused'}
              style={{ animationDuration: `${1.1 / speed}s` }}
            />

            {/* Text label "A red" at bottom */}
            <text x="550" y="550" fill="#0f172a" fontSize="18" fontWeight="bold" textAnchor="middle">
              A red
            </text>
          </g>

          {/* OVERFLOW LINE FROM RECUPERATOR (Válvula de rebalse) */}
          <g id="overflow-network">
            {/* Vertical pipe from Recuperator downward into the Chamber */}
            <path
              d="M 550 250 L 550 330"
              stroke={simulateOverflow ? "#d97706" : "#475569"}
              strokeWidth={simulateOverflow ? "7" : "5"}
              fill="none"
              className={simulateOverflow ? "animate-pipe-grey" : ""}
            />

            {/* Flow indicator when overflow is active */}
            {simulateOverflow && (
              <g>
                <circle cx="550" cy="275" r="5" fill="#f59e0b" className="animate-bounce" />
                <circle cx="550" cy="305" r="5" fill="#f59e0b" className="animate-bounce" />
              </g>
            )}
          </g>

          {/* GREYWATER INFLOWS (Passing to recycling instead of cloacas) */}
          <g id="grey-drain-inflows" stroke="#475569" strokeWidth="4" fill="none">
            {/* Shower drain line going toward recuperator */}
            <path d="M 240 230 L 240 200 L 460 200" strokeDasharray="6 4" />
            {/* Washing machine / kitchen drain going toward recuperator */}
            <path d="M 350 400 L 440 400 L 440 240" strokeDasharray="6 4" />
          </g>

          {/* COMPONENT: TANQUE RECUPERADOR DE AGUAS GRISES (Top-Center) */}
          <g
            id="comp-tanque-recuperador-vii"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectComponent(getComponent('tanque-recuperador')!)}
          >
            <circle
              cx="500"
              cy="180"
              r="70"
              fill="#f8fafc"
              stroke="#475569"
              strokeWidth="12"
            />
            {/* Water level inside */}
            <circle
              cx="500"
              cy="180"
              r="58"
              fill={simulateOverflow ? "#fef3c7" : "#cbd5e1"}
              opacity="0.8"
            />
            
            <text x="500" y="175" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">
              Tanque recuperador
            </text>
            <text x="500" y="195" fill="#334155" fontSize="13" fontWeight="bold" textAnchor="middle">
              de aguas grises
            </text>
            {simulateOverflow && (
              <text x="500" y="215" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
                ¡Nivel 100% - Rebalsando!
              </text>
            )}
          </g>

          {/* COMPONENT: VÁLVULA DE REBALSE (Page VII: at edge of recuperator) */}
          <g
            id="comp-valvula-rebalse"
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSelectComponent(getComponent('valvula-rebalse')!)}
          >
            <rect
              x="538"
              y="235"
              width="24"
              height="24"
              rx="4"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            <polygon points="542,242 558,247 542,252" fill="#d97706" />
            <text x="575" y="222" fill="#0f172a" fontSize="11" fontWeight="bold">
              Válvula de
            </text>
            <text x="575" y="236" fill="#0f172a" fontSize="11" fontWeight="bold">
              rebalse
            </text>
          </g>

          {/* COMPONENT: CÁMARA DE INSPECCIÓN (Page VII: Center, heavy square) */}
          <g
            id="comp-camara-inspeccion"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectComponent(getComponent('camara-inspeccion')!)}
          >
            {/* Outer thick square */}
            <rect
              x="475"
              y="255"
              width="150"
              height="150"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="14"
            />
            {/* Inner fill */}
            <rect
              x="485"
              y="265"
              width="130"
              height="130"
              fill="url(#chamberGrad)"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            
            <text x="645" y="325" fill="#0f172a" fontSize="18" fontWeight="bold">
              Cámara de
            </text>
            <text x="645" y="348" fill="#0f172a" fontSize="18" fontWeight="bold">
              inspección
            </text>
          </g>

          {/* FIXTURES ON LEFT (Matching Page VII layout) */}

          {/* DUCHA (Upper left) */}
          <g transform="translate(220, 160)">
            <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M 20 8 L 20 20" stroke="#0f172a" strokeWidth="2" />
            <circle cx="330" cy="50" r="12" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          </g>

          {/* INODORO (Page VII: Main source of blackwater cloacales) */}
          <g transform="translate(160, 260)">
            <rect x="0" y="0" width="46" height="75" rx="14" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
            <circle cx="23" cy="50" r="14" fill="#0f172a" />
            <circle cx="23" cy="20" r="6" fill="#0f172a" />
            <text x="23" y="94" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
              Inodoro
            </text>
          </g>

          {/* BIDET / LAVATORIO (Between toilet and chamber) */}
          <g transform="translate(240, 265)">
            <circle cx="20" cy="20" r="15" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            <line x1="20" y1="8" x2="20" y2="32" stroke="#0f172a" strokeWidth="2" />
            <circle cx="80" cy="20" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          </g>

          {/* SINK & WASHING MACHINE (Lower left) */}
          <g transform="translate(160, 370)">
            {/* Kitchen sink */}
            <rect x="0" y="0" width="55" height="34" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="40" cy="17" r="6" fill="#0f172a" />
            <line x1="12" y1="6" x2="12" y2="28" stroke="#0f172a" strokeWidth="2" />
            <line x1="18" y1="6" x2="18" y2="28" stroke="#0f172a" strokeWidth="2" />
            <line x1="24" y1="6" x2="24" y2="28" stroke="#0f172a" strokeWidth="2" />
          </g>

          <g transform="translate(300, 365)">
            {/* Washing machine */}
            <rect x="0" y="0" width="50" height="56" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="25" cy="34" r="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="15" cy="12" r="3" fill="#0f172a" />
            <rect x="24" y="10" width="18" height="4" fill="#0f172a" rx="1" />
            {/* Drain trap */}
            <circle cx="75" cy="28" r="11" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          </g>

          {/* OFFICIAL LEGEND (Matching Page VII) */}
          <g id="legend-page-vii" transform="translate(640, 440)">
            <rect x="0" y="0" width="310" height="110" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            
            {/* Grey water legend */}
            <line x1="20" y1="40" x2="80" y2="40" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <text x="95" y="46" fill="#0f172a" fontSize="20" fontWeight="bold">
              Aguas <tspan fill="#475569">grises</tspan>
            </text>

            {/* Black/Sewage water legend (Thick red dashed) */}
            <line x1="20" y1="85" x2="80" y2="85" stroke="#b91c1c" strokeWidth="10" strokeDasharray="10 8" />
            <text x="95" y="92" fill="#0f172a" fontSize="20" fontWeight="bold">
              Aguas <tspan fill="#b91c1c">cloacales</tspan>
            </text>
          </g>

          {/* Page number bottom-right VII */}
          <text x="940" y="590" fill="#0f172a" fontSize="24" fontWeight="bold" textAnchor="end">
            VII
          </text>
        </svg>

        {/* Floating status */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-3 shadow-xs">
          <button
            onClick={onTogglePlay}
            className="p-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="text-xs text-slate-700 font-medium">
            <span className="font-semibold text-slate-900">
              {simulateFlush ? '🌊 Descargando inodoro a cámara' : simulateOverflow ? '⚠️ Válvula de rebalse activa' : 'Separación cloacal activa'}
            </span>
          </div>
        </div>
      </div>

      {/* Explanatory callouts */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">Separación Estricta de Efluentes</span>
            <p className="text-slate-600 mt-0.5">
              El inodoro desagua directamente mediante caño cloacal (rojo discontinuo) a la cámara de inspección. Jamás se mezclan las aguas negras con el tanque de reciclado.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900 block">Seguridad por Válvula de Rebalse</span>
            <p className="text-amber-800 mt-0.5">
              Si se supera la capacidad del tanque recuperador de aguas grises, el exceso rebalsa por gravedad directo a la cámara de inspección, evitando cualquier desborde domiciliario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
