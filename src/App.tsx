import React, { useState } from 'react';
import { ViewMode, ComponentInfo } from './types';
import { SIDEREA_COMPONENTS } from './data/sideReaData';
import { Header } from './components/Header';
import { ControlsBar } from './components/ControlsBar';
import { DiagramDistribucion } from './components/DiagramDistribucion';
import { DiagramDesague } from './components/DiagramDesague';
import { DiagramCicloCompleto } from './components/DiagramCicloCompleto';
import { ComparativaAhorro } from './components/ComparativaAhorro';
import { BeneficiosAmbientales } from './components/BeneficiosAmbientales';
import { ComponentInspectorModal } from './components/ComponentInspectorModal';
import { 
  Droplet, 
  Leaf, 
  GitFork, 
  ArrowDownToDot, 
  Layers, 
  BarChart3, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('distribucion');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);
  const [showBenefitsModal, setShowBenefitsModal] = useState<boolean>(false);

  const handleSelectComponent = (comp: ComponentInfo) => {
    setSelectedComponent(comp);
  };

  const handleResetAnimation = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 50);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased">
      {/* Top Main Navigation */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenComponentsModal={() => setSelectedComponent(SIDEREA_COMPONENTS[0])}
        onOpenInfoModal={() => setShowBenefitsModal(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        
        {/* Playback & Circulation Controls */}
        <ControlsBar
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(prev => !prev)}
          speed={speed}
          onChangeSpeed={setSpeed}
          onReset={handleResetAnimation}
          currentView={currentView}
        />

        {/* View Switcher */}
        {currentView === 'distribucion' && (
          <div className="space-y-6">
            <DiagramDistribucion
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(prev => !prev)}
              speed={speed}
              onSelectComponent={handleSelectComponent}
            />

            {/* Quick Context Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <GitFork className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Clave de la Distribución (Página VI)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    El agua potable (línea azul) abastece exclusivamente los puntos que exigen pureza higiénica o consumo alimenticio. Las aguas grises generadas en duchas, lavatorios y lavarropas se filtran por sólidos y grasas, se almacenan en el <strong>Tanque Recuperador</strong>, se desinfectan mediante el <strong>Dispenser Purificador</strong> y se impulsan para rellenar el <strong>Inodoro</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('desague')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition-colors shrink-0"
              >
                <span>Ver Esquema de Desagüe (Pág. VII)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentView === 'desague' && (
          <div className="space-y-6">
            <DiagramDesague
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(prev => !prev)}
              speed={speed}
              onSelectComponent={handleSelectComponent}
            />

            {/* Quick Context Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <ArrowDownToDot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Clave del Desagüe (Página VII)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    Las aguas cloacales del inodoro viajan de forma estanca e independiente (línea discontinua roja) hacia la <strong>Cámara de Inspección</strong> y a la red cloacal. En caso de exceso de producción de aguas grises, la <strong>Válvula de Rebalse</strong> deriva el sobrante de manera segura a la cámara.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('completo')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition-colors shrink-0"
              >
                <span>Ver Simulación Ciclo Completo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentView === 'completo' && (
          <div className="space-y-6">
            <DiagramCicloCompleto
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(prev => !prev)}
              speed={speed}
              onSelectComponent={handleSelectComponent}
            />
          </div>
        )}

        {currentView === 'comparativa' && (
          <div className="space-y-6">
            <ComparativaAhorro />
          </div>
        )}

        {/* Dedicated Environmental Benefits section */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Beneficios Ambientales y Sustentabilidad de SiDeReA
            </h3>
          </div>
          <BeneficiosAmbientales />
        </section>

      </main>

      {/* Component Inspector Modal (Page VIII) */}
      <ComponentInspectorModal
        selectedComponent={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        onSelectComponent={handleSelectComponent}
      />

      {/* Environmental Benefits Modal when clicking header button */}
      {showBenefitsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Beneficios Ambientales de SiDeReA
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fundamentos ecológicos del Sistema Domiciliario de Reutilización de Agua
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBenefitsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                El agua dulce es uno de los recursos naturales más amenazados por el cambio climático, la sobreexplotación de cuencas y el crecimiento demográfico. En los hogares tradicionales, <strong>el 40% del agua potable pura y tratada se utiliza exclusivamente para evacuar el inodoro</strong>, un desperdicio ecológico insostenible.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
                  <span className="font-bold text-teal-900 block text-sm">💧 Reducción del 40% de Demanda Potable</span>
                  <p className="text-teal-800 text-xs mt-1">
                    Cada familia de 4 personas ahorra <strong>220 litros diarios</strong> (80.000 litros al año), protegiendo acuíferos subterráneos y ríos contra el estrés hídrico.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200">
                  <span className="font-bold text-sky-900 block text-sm">🌐 Alivio a la Red Cloacal Urbana</span>
                  <p className="text-sky-800 text-xs mt-1">
                    Disminuye la saturación y sobrecarga en cañerías municipales y plantas depuradoras, reduciendo vertidos contaminantes sin tratar.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-900 block text-sm">⚡ Menor Huella de Carbono</span>
                  <p className="text-emerald-800 text-xs mt-1">
                    Evita la energía eléctrica y químicos necesarios para potabilizar y bombear 80.000 L de agua a la red pública cada año por vivienda.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-900 block text-sm">🔄 Economía Circular en la Vivienda</span>
                  <p className="text-amber-800 text-xs mt-1">
                    Reemplaza el modelo lineal de "usar y desechar" por un ciclo cerrado y seguro de reutilización in situ.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowBenefitsModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-800">SiDeReA</span> • Sistema Domiciliario de Reutilización de Agua
            <p className="text-[11px] text-slate-400 mt-0.5">
              Proyecto Técnico Escolar EPET 1 - 5° II - TEIE • Educación, Innovación, Diseño e Implementación
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="font-medium text-slate-700">Páginas VI (Distribución), VII (Desagüe) y VIII (Componentes)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
