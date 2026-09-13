import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  X,
  Sparkles,
  CheckCircle2,
  Lock,
  Filter,
  Zap,
  Award,
  Crown,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BadgeProgress, StudentProfile, BadgeCategory, BadgeTier } from '../types';
import { getTierStyle } from '../utils/badges';
import { BadgeIcon } from './BadgeIcon';
import { soundManager } from '../utils/sound';

interface TrophiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: BadgeProgress[];
  studentProfile: StudentProfile;
  soundEffects: boolean;
}

export const TrophiesModal: React.FC<TrophiesModalProps> = ({
  isOpen,
  onClose,
  badges,
  studentProfile,
  soundEffects,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'locked' | BadgeCategory>('all');
  const [selectedBadge, setSelectedBadge] = useState<BadgeProgress | null>(null);

  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const totalCount = badges.length;
  const overallProgress = Math.round((unlockedCount / totalCount) * 100);

  const filteredBadges = badges.filter((b) => {
    if (activeFilter === 'unlocked') return b.isUnlocked;
    if (activeFilter === 'locked') return !b.isUnlocked;
    if (activeFilter === 'all') return true;
    return b.category === activeFilter;
  });

  const handleCardClick = (badge: BadgeProgress) => {
    if (badge.isUnlocked) {
      if (soundEffects) soundManager.playCelebration();
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
      });
    } else {
      if (soundEffects) soundManager.playOptionSelect();
    }
    setSelectedBadge(badge);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0F172A] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-white overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-blue-500/25 bg-[#0B132B]/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.4)] shrink-0">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                  Trophies & Badges Cabinet
                </h3>
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  {unlockedCount} / {totalCount} Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Honors earned by candidate <strong>{studentProfile.name}</strong> (Roll: {studentProfile.roll})
              </p>
            </div>
          </div>

          <button
            id="close-trophies-modal-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress & Milestone Overview */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-2/3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Overall Trophy Collection</span>
              <span className="font-mono font-bold text-cyan-300">{overallProgress}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Complete quizzes with high speed & accuracy to unlock elite trophies</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All (${totalCount})` },
            { id: 'unlocked', label: `Unlocked (${unlockedCount})` },
            { id: 'locked', label: `Locked (${totalCount - unlockedCount})` },
            { id: 'score', label: 'High Scores' },
            { id: 'speed', label: 'Speed' },
            { id: 'completion', label: 'Quizzes Taken' },
            { id: 'mastery', label: 'Mastery' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (soundEffects) soundManager.playClick();
                setActiveFilter(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredBadges.map((badge) => {
            const tierStyle = getTierStyle(badge.tier);

            return (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleCardClick(badge)}
                className={`relative group rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer border ${
                  badge.isUnlocked
                    ? `${tierStyle.badgeBg} ${tierStyle.badgeBorder} ${tierStyle.glow} hover:scale-[1.02]`
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Tier Pill + Status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <BadgeIcon
                      iconName={badge.iconName}
                      tier={badge.tier}
                      isUnlocked={badge.isUnlocked}
                      size="md"
                    />

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${tierStyle.pillBg}`}
                      >
                        {badge.tier}
                      </span>

                      {badge.isUnlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Unlocked
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                          <Lock className="w-3 h-3 text-slate-500" /> Locked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                    <span>{badge.title}</span>
                  </h4>
                  <p className={`text-xs font-semibold mt-0.5 ${badge.isUnlocked ? tierStyle.textColor : 'text-slate-400'}`}>
                    {badge.subtitle}
                  </p>

                  <p className="text-xs text-slate-300/90 mt-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Progress / Requirement Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Requirement:</span>
                    <span className="font-semibold text-white">{badge.requirement}</span>
                  </div>

                  {badge.isUnlocked ? (
                    <div className="flex items-center justify-between text-[11px] text-emerald-300 pt-0.5">
                      <span>Earned On:</span>
                      <strong className="font-mono text-white">{badge.unlockedAt || 'Recently'}</strong>
                    </div>
                  ) : (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Progress:</span>
                        <span className="font-mono font-bold text-cyan-300">{badge.progressLabel}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${badge.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Footer with quick encouragement */}
        <div className="p-3.5 sm:p-4 bg-[#0B132B]/90 border-t border-blue-500/25 flex items-center justify-between text-xs text-slate-400">
          <div>
            Click any unlocked digital trophy to replay its celebration chime and confetti!
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition cursor-pointer"
          >
            Close Cabinet
          </button>
        </div>
      </motion.div>
    </div>
  );
};
