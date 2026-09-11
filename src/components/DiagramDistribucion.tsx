import React, { useState } from 'react';
import { ComponentInfo } from '../types';
import { SIDEREA_COMPONENTS } from '../data/sideReaData';
import { Info, Play, Pause, RefreshCw, CheckCircle2, Droplet, Sparkles } from 'lucide-react';

interface DiagramDistribucionProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onSelectComponent: (component: ComponentInfo) => void;
}

export const DiagramDistribucion: React.FC<DiagramDistribucionProps> = ({
  isPlaying,
  onTogglePlay,
  speed,
  onSelectComponent,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'potable' | 'grises'>('all');
  const [hoveredComponentId, setHoveredComponentId] = useState<string | null>(null);

  const getComponent = (id: string) => SIDEREA_COMPONENTS.find(c => c.id === id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col">
      {/* Top Diagram Header matching Page VI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
              PÁGINA VI
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              DISTRIBUCIÓN
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Esquema del circuito de alimentación de Agua Potable y recolección/reutilización de Aguas Grises.
          </p>
        </div>

        {/* Filter / Layer selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ver Ambas Redes
          </button>
          <button
            onClick={() => setActiveTab('potable')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'potable'
                ? 'bg-sky-600 text-white shadow-xs font-semibold'
                : 'text-sky-700 hover:text-sky-900'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>
            Solo Potable
          </button>
          <button
            onClick={() => setActiveTab('grises')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'grises'
                ? 'bg-slate-700 text-white shadow-xs font-semibold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block"></span>
            Solo Aguas Grises
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px] bg-slate-50/50 rounded-xl border border-slate-200 mt-4 overflow-hidden select-none">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <svg
          viewBox="0 0 1000 620"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients for Tanks */}
            <linearGradient id="potableWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="greyWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.95" />
            </linearGradient>

            {/* Pipe markers */}
            <marker id="arrowBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
            </marker>
            <marker id="arrowGrey" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
            </marker>
          </defs>

          {/* Architectural floor & wall dividing guidelines */}
          <g stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" opacity="0.6">
            <line x1="80" y1="260" x2="480" y2="260" /> {/* Floor bathroom */}
            <line x1="80" y1="420" x2="480" y2="420" /> {/* Floor kitchen */}
            <line x1="480" y1="80" x2="480" y2="580" /> {/* Vertical dividing shaft */}
          </g>

          {/* PIPES LAYER - AGUA POTABLE (BLUE) */}
          {(activeTab === 'all' || activeTab === 'potable') && (
            <g id="potable-network" opacity={activeTab === 'potable' ? 1 : 0.95}>
              {/* Main Potable feed pipe from Tanque de reaseguro downward */}
              <path
                d="M 220 180 L 220 540"
                stroke="#0284c7"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-blue' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.2 / speed}s` }}
              />

              {/* Branch to Shower */}
              <path
                d="M 220 280 L 290 280"
                stroke="#0284c7"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-blue' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.2 / speed}s` }}
              />

              {/* Branch to Lavatorio */}
              <path
                d="M 220 380 L 320 380"
                stroke="#0284c7"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-blue' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.2 / speed}s` }}
              />

              {/* Branch to Kitchen Sink and Washing Machine */}
              <path
                d="M 220 480 L 300 480 M 220 520 L 400 520"
                stroke="#0284c7"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-blue' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.2 / speed}s` }}
              />

              {/* Reaseguro connection line toward toilet as emergency backup */}
              <path
                d="M 240 160 L 510 160 L 510 210"
                stroke="#0284c7"
                strokeWidth="3.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <text x="360" y="152" fill="#0284c7" fontSize="11" fontWeight="600" textAnchor="middle">
                Línea de respaldo potable (Reaseguro)
              </text>
            </g>
          )}

          {/* PIPES LAYER - AGUAS GRISES (GREY) */}
          {(activeTab === 'all' || activeTab === 'grises') && (
            <g id="grey-network" opacity={activeTab === 'grises' ? 1 : 0.95}>
              {/* Collection from Shower (Ducha) */}
              <path
                d="M 330 310 L 410 310 L 410 360"
                stroke="#475569"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-grey' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.5 / speed}s` }}
              />

              {/* Collection from Lavatorio & Bidet */}
              <path
                d="M 350 400 L 410 400"
                stroke="#475569"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-grey' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.5 / speed}s` }}
              />

              {/* Through Solid Filter to vertical collector */}
              <path
                d="M 410 360 L 410 440"
                stroke="#475569"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Collection from Kitchen Sink & Washing Machine through Grease Interceptor */}
              <path
                d="M 320 495 L 430 495 M 430 520 L 470 520 L 470 470"
                stroke="#475569"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-grey' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.5 / speed}s` }}
              />

              {/* Collector line through Asegurador de Caudal going into Tanque Recuperador */}
              <path
                d="M 455 440 L 455 240 L 515 240 L 515 270"
                stroke="#475569"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-grey' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.5 / speed}s` }}
              />

              {/* Recycled greywater line from Recuperator / Bomba toward Inodoro */}
              <path
                d="M 545 220 L 510 220 L 510 235 L 210 235 L 210 330 L 195 330"
                stroke="#475569"
                strokeWidth="5.5"
                fill="none"
                strokeLinecap="round"
                className={isPlaying ? 'animate-pipe-grey' : 'animate-pipe-paused'}
                style={{ animationDuration: `${1.5 / speed}s` }}
              />
              <text x="360" y="227" fill="#475569" fontSize="12" fontWeight="bold" textAnchor="middle">
                Reutilización: Agua gris tratada hacia el Inodoro (40% Ahorro)
              </text>
            </g>
          )}

          {/* COMPONENT: TANQUE DE REASEGURO (Page VI: top-left) */}
          <g
            id="comp-tanque-reaseguro"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectComponent(getComponent('tanque-reaseguro')!)}
            onMouseEnter={() => setHoveredComponentId('tanque-reaseguro')}
            onMouseLeave={() => setHoveredComponentId(null)}
          >
            <circle
              cx="220"
              cy="160"
              r="40"
              fill="#f0f9ff"
              stroke="#0284c7"
              strokeWidth="6"
            />
            <circle cx="220" cy="160" r="28" fill="url(#potableWaterGrad)" opacity="0.75" />
            <text x="220" y="156" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
              Tanque de
            </text>
            <text x="220" y="171" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="middle">
              reaseguro
            </text>
            <circle cx="250" cy="135" r="7" fill="#38bdf8" className="animate-ping" opacity="0.75" />
          </g>

          {/* COMPONENT: TANQUE RECUPERADOR DE AGUAS GRISES (Page VI: central right) */}
          <g
            id="comp-tanque-recuperador"
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectComponent(getComponent('tanque-recuperador')!)}
            onMouseEnter={() => setHoveredComponentId('tanque-recuperador')}
            onMouseLeave={() => setHoveredComponentId(null)}
          >
            <circle
              cx="570"
              cy="340"
              r="75"
              fill="#f8fafc"
              stroke="#334155"
              strokeWidth="11"
            />
            {/* Water volume fill inside */}
            <circle cx="570" cy="340" r="62" fill="url(#greyWaterGrad)" opacity="0.65" />
            
            {/* Animated water surface line */}
            <path
              d="M 520 340 Q 545 334 570 340 T 620 340 L 620 395 A 62 62 0 0 1 520 395 Z"
              fill="#475569"
              opacity="0.35"
            />

            <text x="570" y="335" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">
              Tanque recuperador
            </text>
            <text x="570" y="352" fill="#334155" fontSize="12" fontWeight="bold" textAnchor="middle">
              de aguas grises
            </text>
            <text x="570" y="370" fill="#0369a1" fontSize="10" fontWeight="600" textAnchor="middle">
              Nivel: ~75% activo
            </text>
          </g>

          {/* COMPONENT: DISPENSER DE PURIFICADOR (Page VI: adosado abajo del recuperador) */}
          <g
            id="comp-dispenser-purificador"
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSelectComponent(getComponent('dispenser-purificador')!)}
            onMouseEnter={() => setHoveredComponentId('dispenser-purificador')}
            onMouseLeave={() => setHoveredComponentId(null)}
          >
            <rect
              x="535"
              y="420"
              width="70"
              height="34"
              rx="6"
              fill="#ffffff"
              stroke="#475569"
              strokeWidth="2.5"
            />
            <text x="570" y="434" fill="#0f172a" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              Dispenser de
            </text>
            <text x="570" y="446" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">
              purificador
            </text>
          </g>

          {/* COMPONENT: BOMBA DE IMPULSIÓN (Page VI: salida superior) */}
          <g
            id="comp-bomba-impulsion"
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSelectComponent(getComponent('bomba-impulsion')!)}
            onMouseEnter={() => setHoveredComponentId('bomba-impulsion')}
            onMouseLeave={() => setHoveredComponentId(null)}
          >
            <rect
              x="475"
              y="200"
              width="60"
              height="30"
              rx="4"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            <circle cx="505" cy="215" r="7" fill={isPlaying ? "#10b981" : "#94a3b8"} />
            <text x="490" y="193" fill="#0f172a" fontSize="10" fontWeight="bold">
              Bomba de impulsión
            </text>
          </g>

          {/* COMPONENT: ASEGURADOR DE CAUDAL (Page VI: regulador en línea) */}
          <g
            id="comp-asegurador-caudal"
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSelectComponent(getComponent('asegurador-caudal')!)}
            onMouseEnter={() => setHoveredComponentId('asegurador-caudal')}
            onMouseLeave={() => setHoveredComponentId(null)}
          >
            <polygon
              points="445,260 465,270 445,280"
              fill="#f59e0b"
              stroke="#78350f"
              strokeWidth="1.5"
            />
            <polygon
              points="465,260 445,270 465,280"
              fill="#f59e0b"
              stroke="#78350f"
              strokeWidth="1.5"
            />
            <text x="455" y="248" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">
              Asegurador de caudal
            </text>
          </g>

          {/* COMPONENT: FILTRO INTERCEPTOR DE SÓLIDOS (PP BAÑO) */}
          <g
            id="comp-filtro-solidos"
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSelectComponent(getComponent('filtro-solidos')!)}
            onMouseEnter={() => setHoveredComponentId('filtro-solidos')}
            onMouseLeave={() => setHoveredComponentId(null)}
          >
            <rect
              x="385"
              y="345"
              width="48"
              height="32"
              rx="4"
              fill="#f1f5f9"
              stroke="#334155"
              strokeWidth="2.5"
            />
            <line x1="392" y1="352" x2="425" y2="352" stroke="#64748b" strokeWidth="2" strokeDasharray="2 2" />
            <line x1="392" y1="361" x2="425" y2="361" stroke="#64748b" strokeWidth="2" strokeDasharray="2 2" />
            <line x1="392" y1="370" x2="425" y2="370" stroke="#64748b" strokeWidth="2" strokeDasharray="2 2" />
            <text x="410" y="336" fill="#0f172a" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              Filtro interceptor
            </text>
            <text x="410" y="344" fill="#475569" fontSize="8.5" fontWeight="bold" textAnchor="middle">
              de sólidos
            </text>
          </g>

          {/* COMPONENT: INTERCEPTOR DE GRASAS (PP COCINA / LAVARROPAS) */}
          <g
            id="comp-interceptor-grasas"
            className="cursor-pointer hover:opacity-80"
            onClick={() => onSelectComponent(getComponent('interceptor-grasas')!)}
            onMouseEnter={() => setHoveredComponentId('interceptor-grasas')}
            onMouseLeave={() => setHoveredComponentId(null)}
          >
            <rect
              x="455"
              y="485"
              width="34"
              height="34"
              rx="4"
              fill="#fef3c7"
              stroke="#b45309"
              strokeWidth="2.5"
            />
            <circle cx="472" cy="502" r="9" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            <text x="495" y="497" fill="#0f172a" fontSize="10" fontWeight="bold">
              Interceptor
            </text>
            <text x="495" y="509" fill="#b45309" fontSize="9" fontWeight="bold">
              de grasas
            </text>
          </g>

          {/* FIXTURE ICONS / ARTWORK (Matching Page VI icons) */}

          {/* 1. DUCHA (Shower) */}
          <g id="fixture-ducha" transform="translate(285, 255)">
            {/* Pipe & showerhead */}
            <path d="M 0 25 L 30 25 L 30 15 L 42 15" stroke="#334155" strokeWidth="3" fill="none" />
            <path d="M 38 10 L 48 20" stroke="#0284c7" strokeWidth="4" />
            {/* Water spray */}
            <g stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3">
              <line x1="45" y1="20" x2="52" y2="40" />
              <line x1="43" y1="20" x2="42" y2="42" />
              <line x1="41" y1="20" x2="32" y2="38" />
            </g>
            <text x="45" y="52" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
              Ducha
            </text>
          </g>

          {/* 2. INODORO (Page VI: Recibe AGUA RECICLADA) */}
          <g id="fixture-inodoro" transform="translate(130, 310)">
            {/* Toilet graphic */}
            <path
              d="M 30 10 L 55 10 L 55 45 L 30 45 Z"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="3"
            /> {/* Cistern */}
            <path
              d="M 15 45 Q 15 68 35 68 L 50 68 Q 65 68 65 45 Z"
              fill="#f1f5f9"
              stroke="#0f172a"
              strokeWidth="3"
            /> {/* Bowl */}
            <rect x="24" y="68" width="22" height="15" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" /> {/* Base */}
            <circle cx="43" cy="22" r="3" fill="#0284c7" /> {/* Flush button */}
            
            <text x="40" y="100" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">
              Inodoro
            </text>
            <text x="40" y="114" fill="#059669" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              Alimentado con AGUA GRIS
            </text>
          </g>

          {/* 3. LAVATORIO (Sink) */}
          <g id="fixture-lavatorio" transform="translate(310, 365)">
            <path d="M 10 20 L 45 20 Q 38 38 28 38 Q 18 38 10 20 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M 28 8 L 28 18 M 28 8 Q 28 4 33 4" stroke="#0284c7" strokeWidth="2" fill="none" />
            <text x="28" y="50" fill="#0f172a" fontSize="10.5" fontWeight="bold" textAnchor="middle">
              Lavatorio
            </text>
          </g>

          {/* 4. BIDET */}
          <g id="fixture-bidet" transform="translate(235, 365)">
            <ellipse cx="22" cy="22" rx="14" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M 14 26 L 14 38 L 30 38 L 30 26" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
            <text x="22" y="50" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
              Bidet
            </text>
          </g>

          {/* 5. PILETA DE COCINA */}
          <g id="fixture-cocina" transform="translate(265, 470)">
            <rect x="5" y="10" width="44" height="24" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="27" cy="22" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
            {/* Drying rack bars */}
            <line x1="12" y1="14" x2="12" y2="28" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="17" y1="14" x2="17" y2="28" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="27" y="46" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
              Cocina
            </text>
          </g>

          {/* 6. LAVARROPAS (Washing machine) */}
          <g id="fixture-lavarropas" transform="translate(380, 465)">
            <rect x="5" y="10" width="42" height="48" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="26" cy="38" r="14" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2" />
            <circle cx="26" cy="38" r="8" fill={isPlaying ? "#bae6fd" : "#e2e8f0"} stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="15" cy="18" r="2.5" fill="#0f172a" />
            <rect x="22" y="16" width="16" height="4" rx="1" fill="#cbd5e1" />
            <text x="26" y="70" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
              Lavarropas
            </text>
          </g>

          {/* OFFICIAL LEGEND (Directly from Page VI) */}
          <g id="legend-page-vi" transform="translate(680, 480)">
            <rect x="0" y="0" width="280" height="95" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            
            {/* Potable water legend */}
            <line x1="20" y1="35" x2="80" y2="35" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <text x="95" y="40" fill="#0f172a" fontSize="18" fontWeight="bold">
              Agua <tspan fill="#0284c7">POTABLE</tspan>
            </text>

            {/* Grey water legend */}
            <line x1="20" y1="70" x2="80" y2="70" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <text x="95" y="75" fill="#0f172a" fontSize="18" fontWeight="bold">
              Aguas <tspan fill="#475569">grises</tspan>
            </text>
          </g>

          {/* Page Indicator bottom-right */}
          <text x="950" y="595" fill="#0f172a" fontSize="24" fontWeight="bold" textAnchor="end">
            VI
          </text>
        </svg>

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-3 shadow-xs">
          <button
            id="btn-toggle-play-dist"
            onClick={onTogglePlay}
            className="p-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            title={isPlaying ? 'Pausar animación' : 'Reanudar animación'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="text-xs text-slate-700 font-medium">
            <span className="font-semibold text-slate-900">{isPlaying ? 'Animación en curso' : 'Pausado'}</span>
            <span className="text-slate-400 mx-1.5">•</span>
            <span className="text-slate-500">Velocidad: {speed}x</span>
          </div>
        </div>
      </div>

      {/* Interactive Legend and Component Hotspots bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Haz clic en cualquier componente o equipo (tanques, filtros, bomba) para ver su ficha técnica oficial de <strong>Página VIII</strong>.</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {SIDEREA_COMPONENTS.filter(c => c.pageRef === 'VI').map(comp => (
            <button
              key={comp.id}
              onClick={() => onSelectComponent(comp)}
              className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-800 border border-slate-200 transition-colors font-medium"
            >
              {comp.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
