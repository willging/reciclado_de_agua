import React, { useState } from 'react';
import { 
  BarChart3, 
  Droplets, 
  TrendingDown, 
  Users, 
  Sparkles, 
  Check, 
  X,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ComparativaAhorro: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<number>(4);

  // Per person metrics according to SiDeReA document:
  // 4 persons: 550 L/day traditional -> 137.5 L/person/day
  // 4 persons: 330 L/day SiDeReA -> 82.5 L/person/day
  // Savings: 220 L/day for 4 persons -> 55 L/person/day (40% savings)
  const traditionalDaily = Math.round(familyMembers * 137.5);
  const sideReaDaily = Math.round(familyMembers * 82.5);
  const dailySavings = traditionalDaily - sideReaDaily;
  const annualTraditional = Math.round(traditionalDaily * 365);
  const annualSideRea = Math.round(sideReaDaily * 365);
  const annualSavings = annualTraditional - annualSideRea;

  return (
    <div className="space-y-6">
      {/* Top Banner comparing Traditional vs SiDeReA (Pages II & III) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                PÁGINAS II & III
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Comparativa de Esquemas: Tradicional vs. SiDeReA
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Cómo se distribuye el caudal y por qué SiDeReA elimina el 40% de consumo potable al reutilizar las aguas grises.
            </p>
          </div>
        </div>

        {/* Side by side diagrams matching Pages II & III */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          {/* PÁGINA II: SISTEMA TRADICIONAL */}
          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-rose-200/80 pb-3 mb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-rose-700 uppercase tracking-wider">
                    Página II
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    SISTEMA TRADICIONAL
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                  Desperdicio 100% potable
                </span>
              </div>

              {/* Flow schematic */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-rose-100 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0">
                    Red
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block">Red de Agua → Tanque de Reserva</span>
                    <span className="text-slate-500 text-[11px]">Agua 100% potable y tratada</span>
                  </div>
                </div>

                <div className="pl-6 space-y-2 border-l-2 border-dashed border-rose-300 ml-4 py-1">
                  {/* 10% */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🚰</span>
                      <span className="font-medium text-slate-800">Canilla (beber / cocinar)</span>
                    </div>
                    <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100">10%</span>
                  </div>

                  {/* 50% */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🚿</span>
                      <span className="font-medium text-slate-800">Ducha, Lavarropas, Lavamanos, Bidet</span>
                    </div>
                    <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100">50%</span>
                  </div>

                  {/* 40% WASTED */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-rose-100 border border-rose-300">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🚽</span>
                      <div>
                        <span className="font-bold text-rose-900 block">Inodoro (Descargas)</span>
                        <span className="text-[10px] text-rose-700">¡Usa agua potable pura!</span>
                      </div>
                    </div>
                    <span className="font-black text-rose-700 px-2 py-0.5 rounded bg-rose-200">40%</span>
                  </div>
                </div>

                {/* Cloacas destination */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    100%
                  </div>
                  <div className="text-[11px] text-slate-700">
                    <strong>Red de Cloacas:</strong> Todo el volumen (550 L/día) va a vertido cloacal sin ningún tipo de recuperación.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-200/60 text-xs text-rose-800 font-medium">
              ⚠️ Consumo medio por familia de 4 personas: <strong>550 litros/día (201.000 L/año)</strong>.
            </div>
          </div>

          {/* PÁGINA III: SiDeReA */}
          <div className="p-5 rounded-2xl bg-teal-50/40 border border-teal-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-teal-200/80 pb-3 mb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-teal-700 uppercase tracking-wider">
                    Página III
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    SISTEMA SiDeReA
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-900 border border-teal-300">
                  Ahorro del 40%
                </span>
              </div>

              {/* Flow schematic */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-teal-100 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    Red
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block">Red de Agua → Tanque de Reserva</span>
                    <span className="text-teal-700 text-[11px]">Suministro reducido en un 40%</span>
                  </div>
                </div>

                <div className="pl-6 space-y-2 border-l-2 border-dashed border-teal-400 ml-4 py-1">
                  {/* 10% */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🚰</span>
                      <span className="font-medium text-slate-800">Canilla (beber / cocinar)</span>
                    </div>
                    <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100">10%</span>
                  </div>

                  {/* 50% captured */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-300">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🚿</span>
                      <div>
                        <span className="font-bold text-emerald-900 block">Ducha, Lavarropas, Lavamanos</span>
                        <span className="text-[10px] text-emerald-700">50% captado hacia reciclaje</span>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-200">50%</span>
                  </div>

                  {/* RECOVERY TANK TO TOILET */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-teal-300 shadow-2xs">
                    <span className="text-lg">🔄</span>
                    <div className="flex-1">
                      <span className="font-bold text-teal-900 block">Tanque de Captación de Aguas Grises</span>
                      <div className="flex items-center gap-1.5 text-[11px] text-teal-800 mt-0.5">
                        <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                        <span>Abastece al 100% las descargas del Inodoro</span>
                      </div>
                    </div>
                  </div>

                  {/* CONNECTION ELIMINATED */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 border border-slate-200 line-through opacity-70">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-600 stroke-[3]" />
                      <span className="text-slate-600">Alimentación de agua potable a Inodoro</span>
                    </div>
                    <span className="text-rose-600 font-bold">ELIMINADA</span>
                  </div>
                </div>

                {/* Only blackwater to sewer */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    -40%
                  </div>
                  <div className="text-[11px] text-slate-700">
                    <strong>Red de Cloacas:</strong> Solo efluentes negros del inodoro y eventuales rebalses. Caudal volcado reducido.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-teal-200/60 text-xs text-teal-900 font-semibold">
              ✅ Consumo medio SiDeReA: <strong>330 litros/día (120.000 L/año)</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Pages IV & V: Liters Saved Breakdown and Interactive Calculator */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                PÁGINAS IV & V
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Cuantificación Estadística del Ahorro
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Reducción de 220 litros por día y 80.000 litros anuales por familia tipo de 4 personas.
            </p>
          </div>

          {/* Family Size Selector */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <span className="text-xs font-semibold text-slate-600 pl-2 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Personas:
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setFamilyMembers(num)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    familyMembers === num
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block">Consumo Tradicional</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-black text-rose-600">{traditionalDaily}</span>
              <span className="text-xs font-bold text-slate-600">L / día</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              {(annualTraditional / 1000).toFixed(0)}.000 L al año
            </span>
          </div>

          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
            <span className="text-xs font-semibold text-teal-700 block">Consumo con SiDeReA</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-black text-teal-700">{sideReaDaily}</span>
              <span className="text-xs font-bold text-teal-900">L / día</span>
            </div>
            <span className="text-[11px] text-teal-700 mt-0.5 block">
              {(annualSideRea / 1000).toFixed(0)}.000 L al año
            </span>
          </div>

          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
            <span className="text-xs font-semibold text-sky-700 block">Ahorro Diario</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-black text-sky-700">-{dailySavings}</span>
              <span className="text-xs font-bold text-sky-900">L / día</span>
            </div>
            <span className="text-[11px] text-sky-600 font-semibold mt-0.5 block">
              Reducción del 40% de agua
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-semibold text-emerald-700 block">Ahorro Anual Total</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-black text-emerald-700">
                {(annualSavings / 1000).toFixed(0)} M
              </span>
              <span className="text-xs font-bold text-emerald-900">litros/año</span>
            </div>
            <span className="text-[11px] text-emerald-700 mt-0.5 block font-medium">
              = {(annualSavings / 1000).toFixed(0)} m³ de agua potable
            </span>
          </div>
        </div>

        {/* Visual Charts (Recreating Pages IV & V pie comparisons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
          
          {/* Daily Consumption (Page IV) */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              Página IV • Consumo Diario ({familyMembers} personas)
            </span>
            <h4 className="text-base font-bold text-slate-900 mt-1 mb-4">
              Reducción de {dailySavings} litros por día
            </h4>

            <div className="flex items-center justify-center gap-8 w-full max-w-sm">
              {/* Tradicional circle */}
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full border-4 border-slate-300 flex items-center justify-center bg-white shadow-2xs overflow-hidden">
                  <div className="absolute inset-0 bg-rose-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)' }}></div>
                  <div className="absolute inset-0 bg-sky-500" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }}></div>
                  <div className="relative z-10 text-white font-black text-sm bg-slate-900/60 px-2 py-0.5 rounded">
                    {traditionalDaily} L
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-800 mt-2">SISTEMA TRADICIONAL</span>
                <span className="text-[11px] text-slate-500">100% del consumo</span>
              </div>

              {/* SiDeReA circle */}
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full border-4 border-teal-400 flex items-center justify-center bg-white shadow-2xs overflow-hidden">
                  <div className="absolute inset-0 bg-teal-600" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 0 100%, 0 50%)' }}></div>
                  <div className="relative z-10 text-slate-900 font-black text-sm bg-white/90 px-2 py-0.5 rounded shadow-xs">
                    {sideReaDaily} L
                  </div>
                </div>
                <span className="text-xs font-bold text-teal-800 mt-2">SiDeReA</span>
                <span className="text-[11px] text-teal-600 font-semibold">-40% Ahorro</span>
              </div>
            </div>
          </div>

          {/* Annual Consumption (Page V) */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              Página V • Consumo Anual ({familyMembers} personas)
            </span>
            <h4 className="text-base font-bold text-slate-900 mt-1 mb-4">
              Reducción ANUAL {(annualSavings / 1000).toFixed(0)} M litros (m³)
            </h4>

            <div className="flex items-center justify-center gap-8 w-full max-w-sm">
              {/* Tradicional anual */}
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full border-4 border-slate-300 flex items-center justify-center bg-rose-600 text-white shadow-2xs">
                  <div className="text-center">
                    <span className="font-black text-lg block">{(annualTraditional / 1000).toFixed(0)} M</span>
                    <span className="text-[10px] font-medium opacity-90">litros/año</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-800 mt-2">SISTEMA TRADICIONAL</span>
                <span className="text-[11px] text-slate-500">201 m³ promedio</span>
              </div>

              {/* SiDeReA anual */}
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-600 text-white shadow-2xs">
                  <div className="text-center">
                    <span className="font-black text-lg block">{(annualSideRea / 1000).toFixed(0)} M</span>
                    <span className="text-[10px] font-medium opacity-90">litros/año</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 mt-2">SiDeReA</span>
                <span className="text-[11px] text-emerald-700 font-bold">120 m³ promedio</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
