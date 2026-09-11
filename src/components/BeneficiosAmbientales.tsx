import React, { useState } from 'react';
import { ENVIRONMENTAL_BENEFITS } from '../data/sideReaData';
import { 
  Leaf, 
  Droplet, 
  Activity, 
  Globe, 
  Sparkles, 
  Building2, 
  Home, 
  TreePine, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const BeneficiosAmbientales: React.FC = () => {
  const [scaleHomes, setScaleHomes] = useState<number>(100);

  // 80,000 liters/year saved per home
  const litersSavedYear = scaleHomes * 80000;
  const m3SavedYear = litersSavedYear / 1000;
  // Olympic swimming pool = 2,500,000 liters
  const poolsEquivalent = (litersSavedYear / 2500000).toFixed(1);
  // CO2 equivalent ~ 35kg CO2 per 80k liters saved
  const co2SavedKg = Math.round(scaleHomes * 35);

  return (
    <div className="space-y-6">
      {/* Top Banner explaining Environmental Purpose */}
      <div className="bg-gradient-to-br from-teal-900 to-slate-900 rounded-2xl text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-400/20 text-teal-200 border border-teal-400/30 mb-3">
            <Leaf className="w-3.5 h-3.5 text-teal-300" />
            Un proyecto sostenible con un propósito sustentable
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Beneficios Ambientales del Reciclado Domiciliario de Agua
          </h2>
          <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
            El sistema SiDeReA redefine el metabolismo hídrico del hogar. Al desacoplar la evacuación del inodoro del suministro de agua potable tratada, transforma una de las prácticas más ineficientes de la vivienda moderna en un circuito circular de altísimo impacto ecológico.
          </p>
        </div>

        {/* Highlight badge stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/60">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Ahorro Hídrico Directo</span>
            <span className="text-2xl font-black text-teal-300 mt-0.5 block">40%</span>
            <span className="text-[11px] text-slate-300">menos agua potable extraída</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Ahorro Anual por Hogar</span>
            <span className="text-2xl font-black text-sky-300 mt-0.5 block">80.000 L</span>
            <span className="text-[11px] text-slate-300">80 m³ de agua dulce cuidada</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Carga a Red Cloacal</span>
            <span className="text-2xl font-black text-emerald-300 mt-0.5 block">-40%</span>
            <span className="text-[11px] text-slate-300">alivio a plantas de tratamiento</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block font-medium">Modelo Ecológico</span>
            <span className="text-2xl font-black text-amber-300 mt-0.5 block">Circular</span>
            <span className="text-[11px] text-slate-300">Reuso in situ sin químicos tóxicos</span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of Environmental Benefit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ENVIRONMENTAL_BENEFITS.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-teal-300 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
                  {item.impactCategory}
                </span>
                <span className="text-lg font-black text-teal-700">
                  {item.metric}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{item.submetric}</span>
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Neighborhood Scale Simulator */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
              Simulador de Escala Comunitaria
            </span>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
              ¿Qué ocurre si implementamos SiDeReA a nivel barrial o urbano?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Desplaza el selector para calcular el volumen de agua salvada y el alivio ecológico según la cantidad de viviendas.
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5">
            {[10, 50, 100, 500, 1000].map(val => (
              <button
                key={val}
                onClick={() => setScaleHomes(val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  scaleHomes === val
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {val} casas
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider */}
        <div className="my-6">
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Escala: {scaleHomes} viviendas equipadas</span>
            <span className="text-teal-700 font-bold">{scaleHomes * 4} personas beneficiadas</span>
          </div>
          <input
            type="range"
            min="1"
            max="1000"
            step="5"
            value={scaleHomes}
            onChange={(e) => setScaleHomes(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        {/* Projected Community Impact Figures */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
            <span className="text-xs font-semibold text-teal-800 block">Agua Potable Ahorrada / Año</span>
            <span className="text-2xl font-black text-teal-900 mt-1 block">
              {(litersSavedYear / 1000000).toFixed(2)} Millones
            </span>
            <span className="text-xs text-teal-700 mt-0.5 block font-medium">
              = {m3SavedYear.toLocaleString()} m³ anuales
            </span>
          </div>

          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
            <span className="text-xs font-semibold text-sky-800 block">Equivalente en Piscinas Olímpicas</span>
            <span className="text-2xl font-black text-sky-900 mt-1 block">
              ~{poolsEquivalent} piscinas
            </span>
            <span className="text-xs text-sky-700 mt-0.5 block font-medium">
              (2.500.000 litros cada una)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-semibold text-emerald-800 block">Emisiones de CO₂ Evitadas</span>
            <span className="text-2xl font-black text-emerald-900 mt-1 block">
              {co2SavedKg.toLocaleString()} kg CO₂
            </span>
            <span className="text-xs text-emerald-700 mt-0.5 block font-medium">
              Menor energía de potabilización y bombeo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
