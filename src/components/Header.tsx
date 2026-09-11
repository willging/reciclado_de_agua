import React from 'react';
import { ViewMode } from '../types';
import { 
  GitFork, 
  ArrowDownToDot, 
  Layers, 
  BarChart3, 
  Leaf, 
  Settings2,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenComponentsModal: () => void;
  onOpenInfoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenComponentsModal,
  onOpenInfoModal,
}) => {
  const navItems: { id: ViewMode; label: string; sub: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      id: 'distribucion',
      label: 'Distribución',
      sub: 'Página VI',
      icon: GitFork
    },
    {
      id: 'desague',
      label: 'Desagüe',
      sub: 'Página VII',
      icon: ArrowDownToDot
    },
    {
      id: 'completo',
      label: 'Ciclo Completo',
      sub: 'Simulación',
      icon: Layers
    },
    {
      id: 'comparativa',
      label: 'Comparativa',
      sub: 'Págs. II-V (40% Ahorro)',
      icon: BarChart3
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          
          {/* Logo and project identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  SiDeReA
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  EPET 1 • TEIE
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Sistema Domiciliario de Reutilización de Agua • Educación, Innovación, Diseño e Implementación
              </p>
            </div>
          </div>

          {/* Quick reference actions */}
          <div className="flex items-center gap-2">
            <button
              id="btn-open-components"
              onClick={onOpenComponentsModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
              title="Ver listado oficial de componentes de la Página VIII"
            >
              <Settings2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Componentes (Pág. VIII)</span>
            </button>

            <button
              id="btn-open-guide"
              onClick={onOpenInfoModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
              title="Beneficios ambientales y fundamento ecológico"
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Beneficios Ambientales</span>
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-2">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => onSelectView(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="font-semibold">{tab.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-sky-700 text-sky-100' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
