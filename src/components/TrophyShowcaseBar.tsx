import React from 'react';
import { Trophy, Zap, Award, ChevronRight, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { BadgeProgress } from '../types';
import { getTierStyle } from '../utils/badges';
import { BadgeIcon } from './BadgeIcon';
import { soundManager } from '../utils/sound';

interface TrophyShowcaseBarProps {
  badges: BadgeProgress[];
  onOpenTrophiesModal: () => void;
  soundEffects: boolean;
}

export const TrophyShowcaseBar: React.FC<TrophyShowcaseBarProps> = ({
  badges,
  onOpenTrophiesModal,
  soundEffects,
}) => {
  const unlockedBadges = badges.filter((b) => b.isUnlocked);
  const unlockedCount = unlockedBadges.length;
  const totalCount = badges.length;
  const percentComplete = Math.round((unlockedCount / totalCount) * 100);

  // Pick 3 notable badges to highlight in showcase:
  // e.g. 'grammar-guru', 'speed-demon', and the first locked or recent unlocked
  const grammarGuru = badges.find((b) => b.id === 'grammar-guru');
  const speedDemon = badges.find((b) => b.id === 'speed-demon');
  const nextTarget = badges.find((b) => !b.isUnlocked && b.id !== 'grammar-guru' && b.id !== 'speed-demon') || badges[2];

  const showcaseBadges = [grammarGuru, speedDemon, nextTarget].filter(Boolean) as BadgeProgress[];

  const handleClick = () => {
    if (soundEffects) soundManager.playClick();
    onOpenTrophiesModal();
  };

  return (
    <div className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl bg-[#0F172A]/90 backdrop-blur-xl border border-blue-500/30 p-4 sm:p-5 shadow-lg flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
      {/* Left: Summary & Progress */}
      <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-0.5 shadow-[0_0_20px_rgba(251,191,36,0.35)] flex items-center justify-center shrink-0">
          <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
            <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
              Digital Trophies & Badges
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
              {unlockedCount} / {totalCount} Earned
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Earn elite recognition for high accuracy, lightning speed, and test endurance.
          </p>

          {/* Mini progress bar */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-28 sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-cyan-300 font-bold">{percentComplete}% Complete</span>
          </div>
        </div>
      </div>

      {/* Middle: Highlighted badges preview (Grammar Guru, Speed Demon, etc.) */}
      <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1">
        {showcaseBadges.map((badge) => {
          const tierStyle = getTierStyle(badge.tier);
          return (
            <div
              key={badge.id}
              onClick={handleClick}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition cursor-pointer shrink-0 ${
                badge.isUnlocked
                  ? `${tierStyle.badgeBg} ${tierStyle.badgeBorder} ${tierStyle.glow} hover:brightness-110`
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <BadgeIcon
                iconName={badge.iconName}
                tier={badge.tier}
                isUnlocked={badge.isUnlocked}
                size="sm"
                showGlow={false}
              />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-white">{badge.title}</span>
                  {badge.isUnlocked && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-slate-400">
                  {badge.isUnlocked ? (
                    <span className="text-emerald-400 font-medium">Trophy Unlocked</span>
                  ) : (
                    <span>{badge.requirement}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Open Cabinet Button */}
      <button
        id="dashboard-open-trophies-btn"
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm transition shadow-md shadow-cyan-500/20 cursor-pointer shrink-0"
      >
        <span>View Trophy Cabinet</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
