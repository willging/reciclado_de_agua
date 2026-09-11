import React from 'react';
import { ComponentInfo } from '../types';
import { SIDEREA_COMPONENTS } from '../data/sideReaData';
import { X, Wrench, Shield, Check, BookOpen, Layers } from 'lucide-react';

interface ComponentInspectorModalProps {
  selectedComponent: ComponentInfo | null;
  onClose: () => void;
  onSelectComponent: (component: ComponentInfo) => void;
}

export const ComponentInspectorModal: React.FC<ComponentInspectorModalProps> = ({
  selectedComponent,
  onClose,
  onSelectComponent,
}) => {
  if (!selectedComponent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-sky-700 uppercase">
                Página {selectedComponent.pageRef} • Ficha Técnica
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                {selectedComponent.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-sm">
          {/* Main Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Descripción del Componente
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm">
              {selectedComponent.description}
            </p>
          </div>

          {/* Role in SiDeReA */}
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100">
            <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-sky-600" />
              Función Clave en SiDeReA
            </h4>
            <p className="text-xs text-sky-800 leading-relaxed">
              {selectedComponent.roleInSideReA}
            </p>
          </div>

          {/* Location & Category */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Ubicación Típica:</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">{selectedComponent.location}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Referencia en Plano:</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">Página {selectedComponent.pageRef}</span>
            </div>
          </div>

          {/* Quick Component Switcher (Page VIII) */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Ver otros componentes (Página VIII):
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {SIDEREA_COMPONENTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectComponent(item)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    selectedComponent.id === item.id
                      ? 'bg-slate-900 text-white shadow-2xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
