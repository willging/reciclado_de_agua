import React from 'react';
import { ViewMode } from '../types';
import { Play, Pause, RotateCcw, FastForward, SlidersHorizontal, Droplets } from 'lucide-react';

interface ControlsBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onChangeSpeed: (speed: number) => void;
  onReset: () => void;
  currentView: ViewMode;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  onReset,
  currentView,
}) => {
  const speeds = [0.5, 1, 1.5, 2];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
      {/* Left playback controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePlay}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-2xs ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-sky-600 hover:bg-sky-700 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pausar Animación</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Reproducir Flujo</span>
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
          title="Reiniciar flujo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Center status message */}
      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
        <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
        <span>
          {isPlaying ? 'Circulación de agua activa en cañerías' : 'Flujo en pausa'}
        </span>
      </div>

      {/* Right speed selector */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
        <span className="text-[11px] font-semibold text-slate-500 px-1.5 flex items-center gap-1">
          <FastForward className="w-3.5 h-3.5" /> Vel:
        </span>
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => onChangeSpeed(s)}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
              speed === s
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
};
