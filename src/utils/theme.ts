import { AppTheme } from '../types';

export interface ThemeOption {
  id: AppTheme;
  name: string;
  nameBangla: string;
  tagline: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
    card: string;
  };
  swatches: string[];
  rootBgClass: string;
  headerBgClass: string;
  welcomeCardBgClass: string;
  quizCardBgClass: string;
  cardBorderClass: string;
  previewGradientClass: string;
  accentBadgeClass: string;
  activeRingClass: string;
}

export const ALL_THEMES: AppTheme[] = ['classic-dark', 'soft-blue', 'zen-forest'];

export const THEME_CONFIGS: Record<AppTheme, ThemeOption> = {
  'classic-dark': {
    id: 'classic-dark',
    name: 'Classic Dark',
    nameBangla: 'ক্লাসিক ডার্ক',
    tagline: 'High-Contrast Midnight Slate',
    description: 'Deep midnight slate and charcoal background with vivid cyan & amber highlights. Crisp, sharp, and iconic.',
    colors: {
      primary: '#06b6d4',
      secondary: '#3b82f6',
      background: '#0B1120',
      accent: '#22d3ee',
      card: '#0F172A',
    },
    swatches: ['#0B1120', '#1E293B', '#06B6D4'],
    rootBgClass:
      'bg-[#0B1120] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1E293B] via-[#0F172A] to-[#050811]',
    headerBgClass: 'bg-[#0F172A]/90 border-blue-500/25',
    welcomeCardBgClass:
      'bg-gradient-to-r from-slate-950/90 via-slate-900/85 to-cyan-950/80 border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.25)]',
    quizCardBgClass: 'bg-[#0F172A]/90 border-blue-500/35 shadow-[0_0_40px_rgba(30,58,138,0.3)]',
    cardBorderClass: 'border-cyan-500/30',
    previewGradientClass: 'from-[#1E293B] via-[#0F172A] to-[#050811]',
    accentBadgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    activeRingClass: 'ring-2 ring-cyan-400 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]',
  },
  'soft-blue': {
    id: 'soft-blue',
    name: 'Soft Blue',
    nameBangla: 'সফট ব্লু',
    tagline: 'Soothing Twilight & Oceanic Navy',
    description: 'Calming twilight indigo and deep sapphire oceanic background. Gentle on the eyes for comfortable extended study.',
    colors: {
      primary: '#38bdf8',
      secondary: '#6366f1',
      background: '#071226',
      accent: '#7dd3fc',
      card: '#0D2044',
    },
    swatches: ['#071226', '#132C5E', '#38BDF8'],
    rootBgClass:
      'bg-[#071226] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#132c5e] via-[#0b1c3d] to-[#040b17]',
    headerBgClass: 'bg-[#0b1c3d]/90 border-sky-500/30',
    welcomeCardBgClass:
      'bg-gradient-to-r from-[#061124]/95 via-[#0d2247]/90 to-[#163872]/85 border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.25)]',
    quizCardBgClass: 'bg-[#0c1f42]/90 border-sky-500/35 shadow-[0_0_40px_rgba(14,165,233,0.25)]',
    cardBorderClass: 'border-sky-500/35',
    previewGradientClass: 'from-[#132c5e] via-[#0b1c3d] to-[#040b17]',
    accentBadgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    activeRingClass: 'ring-2 ring-sky-400 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.4)]',
  },
  'zen-forest': {
    id: 'zen-forest',
    name: 'Zen Forest',
    nameBangla: 'জেন ফরেস্ট',
    tagline: 'Organic Deep Pine & Emerald Moss',
    description: 'Serene botanical pine and calming dark moss. Organic, tranquil earth tones designed to foster deep cognitive focus.',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      background: '#041611',
      accent: '#34d399',
      card: '#08281F',
    },
    swatches: ['#041611', '#0D3628', '#10B981'],
    rootBgClass:
      'bg-[#041611] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d3628] via-[#06241b] to-[#020d09]',
    headerBgClass: 'bg-[#06241b]/90 border-emerald-500/30',
    welcomeCardBgClass:
      'bg-gradient-to-r from-[#02120d]/95 via-[#082b20]/90 to-[#0e4433]/85 border-emerald-400/40 shadow-[0_0_40px_rgba(16,185,129,0.25)]',
    quizCardBgClass: 'bg-[#06261d]/90 border-emerald-500/35 shadow-[0_0_40px_rgba(16,185,129,0.25)]',
    cardBorderClass: 'border-emerald-500/35',
    previewGradientClass: 'from-[#0d3628] via-[#06241b] to-[#020d09]',
    accentBadgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    activeRingClass: 'ring-2 ring-emerald-400 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]',
  },
};

export function getAppTheme(theme?: AppTheme): ThemeOption {
  if (theme && THEME_CONFIGS[theme]) {
    return THEME_CONFIGS[theme];
  }
  return THEME_CONFIGS['classic-dark'];
}
