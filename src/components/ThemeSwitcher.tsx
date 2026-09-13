import React from 'react';
import { motion } from 'motion/react';
import { Palette, CheckCircle2, Sparkles } from 'lucide-react';
import { AppTheme } from '../types';
import { ALL_THEMES, THEME_CONFIGS } from '../utils/theme';
import { soundManager } from '../utils/sound';

interface ThemeSwitcherProps {
  currentTheme?: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  soundEffects?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme = 'classic-dark',
  onSelectTheme,
  soundEffects = true,
}) => {
  const handleSelect = (themeId: AppTheme) => {
    if (themeId !== currentTheme) {
      if (soundEffects) {
        soundManager.playClick();
      }
      onSelectTheme(themeId);
    }
  };

  return (
    <div id="theme-switcher-section" className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <span>Visual Theme & Backgrounds</span>
              <span className="text-[11px] text-cyan-300 font-normal">(ডিসপ্লে থিম পরিবর্তন)</span>
            </h4>
            <p className="text-xs text-slate-400">
              Customize dashboard and quiz backgrounds with eye-friendly color palettes
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Active: </span>
          <strong className="text-cyan-300 capitalize">{THEME_CONFIGS[currentTheme]?.name || 'Classic Dark'}</strong>
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {ALL_THEMES.map((themeId) => {
          const config = THEME_CONFIGS[themeId];
          const isSelected = (currentTheme || 'classic-dark') === themeId;

          return (
            <button
              key={themeId}
              id={`theme-btn-${themeId}`}
              type="button"
              onClick={() => handleSelect(themeId)}
              className={`relative text-left p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-3 group cursor-pointer ${
                isSelected
                  ? `${config.activeRingClass} bg-slate-900/90`
                  : 'bg-slate-900/40 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
            >
              {/* Card Header with Radio/Checkmark */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{config.name}</span>
                  </div>
                  <div className="text-[10px] text-cyan-300/90 font-medium">
                    {config.nameBangla}
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                      : 'border-2 border-slate-700 text-transparent group-hover:border-slate-500'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              {/* Mini Interactive Preview Thumbnail */}
              <div
                className={`w-full h-20 rounded-xl bg-gradient-to-b ${config.previewGradientClass} p-2 border border-white/10 flex flex-col justify-between overflow-hidden shadow-inner`}
              >
                {/* Simulated Header Bar */}
                <div className="h-3 rounded bg-white/10 flex items-center justify-between px-1.5">
                  <div className="w-12 h-1 rounded-full bg-white/30" />
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: config.colors.primary }}
                  />
                </div>

                {/* Simulated Question Card and Options */}
                <div className="bg-white/5 rounded p-1.5 space-y-1 border border-white/5">
                  <div className="w-3/4 h-1 rounded-full bg-white/40" />
                  <div className="flex items-center gap-1">
                    <div
                      className="w-8 h-1.5 rounded"
                      style={{ backgroundColor: `${config.colors.primary}55` }}
                    />
                    <div className="w-8 h-1.5 rounded bg-white/20" />
                  </div>
                </div>
              </div>

              {/* Color Swatch Dots */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-400">Palette:</span>
                <div className="flex items-center gap-1.5">
                  {config.swatches.map((color, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Tagline / Description */}
              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                {config.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
