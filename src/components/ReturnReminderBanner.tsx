import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BellRing,
  Clock,
  Flame,
  Play,
  X,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';
import { formatElapsedHours, requestNotificationPermission } from '../utils/browserNotifications';
import { soundManager } from '../utils/sound';

interface ReturnReminderBannerProps {
  studentName: string;
  hoursElapsed: number;
  currentStreak: number;
  targetSetTitle: string;
  targetSetId: number;
  notificationPermission: NotificationPermission | 'unsupported';
  soundEffects: boolean;
  onStartChallenge: (setId: number) => void;
  onDismiss: () => void;
}

export const ReturnReminderBanner: React.FC<ReturnReminderBannerProps> = ({
  studentName,
  hoursElapsed,
  currentStreak,
  targetSetTitle,
  targetSetId,
  notificationPermission,
  soundEffects,
  onStartChallenge,
  onDismiss,
}) => {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(
    notificationPermission
  );

  const handleStart = () => {
    if (soundEffects) soundManager.playClick();
    onStartChallenge(targetSetId);
  };

  const handleDismiss = () => {
    if (soundEffects) soundManager.playClick();
    onDismiss();
  };

  const handleEnableNotifications = async () => {
    if (soundEffects) soundManager.playClick();
    const result = await requestNotificationPermission();
    setPermission(result);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      id="return-reminder-banner"
      className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-indigo-950/90 to-slate-950/95 border border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.25)] relative overflow-hidden backdrop-blur-xl text-slate-100"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-400 animate-pulse" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left info */}
        <div className="flex items-start gap-3.5 flex-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
            <Flame className="w-5 h-5 fill-slate-950" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                24-Hour Return Alert
              </span>

              <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Away for {formatElapsedHours(hoursElapsed)}
              </span>

              {currentStreak > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                  {currentStreak}-Day Streak at Risk!
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Welcome back, <span className="text-cyan-300">{studentName}</span>! Your Daily Challenge is ready!
            </h3>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              It has been over 24 hours since your last session. Complete today&apos;s challenge (
              <strong className="text-cyan-300">{targetSetTitle}</strong>) right now to protect your daily study streak and claim{' '}
              <strong className="text-amber-300">+100 Bonus XP</strong>!
            </p>
          </div>
        </div>

        {/* Right CTA buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end flex-wrap">
          {permission !== 'granted' && permission !== 'unsupported' && (
            <button
              type="button"
              onClick={handleEnableNotifications}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-400/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Get notified directly in your browser if you haven't visited in 24 hours"
            >
              <BellRing className="w-3.5 h-3.5 text-cyan-400" />
              <span>Enable Browser Alerts</span>
            </button>
          )}

          <button
            type="button"
            id="start-challenge-from-reminder-btn"
            onClick={handleStart}
            className="min-h-[42px] px-5 py-2 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/30"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Start Daily Challenge</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
