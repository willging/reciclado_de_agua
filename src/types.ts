export type ViewMode = 'distribucion' | 'desague' | 'completo' | 'comparativa';

export interface ComponentInfo {
  id: string;
  name: string;
  category: 'captacion' | 'tratamiento' | 'almacenamiento' | 'impulsion' | 'seguridad' | 'desague';
  description: string;
  roleInSideReA: string;
  pageRef: 'VI' | 'VII' | 'VIII';
  location: string;
  iconName: string;
}

export interface AnimationState {
  isPlaying: boolean;
  speed: number;
  currentStep: number;
  particlesEnabled: boolean;
  selectedComponent: string | null;
}

export interface WaterStats {
  householdMembers: number;
  traditionalDailyLiters: number;
  sideReaDailyLiters: number;
  dailySavingsLiters: number;
  annualSavingsLiters: number;
  savingsPercentage: number;
}
