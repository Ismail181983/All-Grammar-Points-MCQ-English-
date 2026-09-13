import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Calendar,
  Sparkles,
  Award,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Zap,
  Bell,
  BellRing,
  BellOff,
} from 'lucide-react';
import { ModelQuestionSet } from '../types';
import { DailyChallengeState } from '../utils/dailyChallenge';
import { soundManager } from '../utils/sound';
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  triggerTestNotification,
  isDailyReminderEnabled,
  setDailyReminderEnabled,
} from '../utils/browserNotifications';

interface DailyChallengeCardProps {
  challengeState: DailyChallengeState;
  targetSet: ModelQuestionSet;
  soundEffects: boolean;
  onStartChallenge: (setId: number) => void;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challengeState,
  targetSet,
  soundEffects,
  onStartChallenge,
}) => {
  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission | 'unsupported'>('default');
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    setNotificationStatus(getNotificationPermission());
    setRemindersEnabled(isDailyReminderEnabled());
  }, []);

  const handleStart = () => {
    if (soundEffects) soundManager.playClick();
    onStartChallenge(challengeState.targetSetId);
  };

  const handleToggleOrRequestNotifications = useCallback(async () => {
    if (soundEffects) soundManager.playClick();

    if (!isNotificationSupported()) {
      setFeedbackMessage('Web notifications are not supported in this browser.');
      setTimeout(() => setFeedbackMessage(null), 4000);
      return;
    }

    if (notificationStatus === 'granted') {
      const nextState = !remindersEnabled;
      setDailyReminderEnabled(nextState);
      setRemindersEnabled(nextState);
      setFeedbackMessage(nextState ? '24h Daily Reminders activated!' : 'Daily Reminders paused.');
      setTimeout(() => setFeedbackMessage(null), 3000);
      return;
    }

    // Request permission
    const result = await requestNotificationPermission();
    setNotificationStatus(result);
    if (result === 'granted') {
      setRemindersEnabled(true);
      setFeedbackMessage('24h Daily Reminders enabled! You will be notified if away for 24h.');
    } else if (result === 'denied') {
      setFeedbackMessage('Notifications blocked. Please enable them in your browser site settings.');
    }
    setTimeout(() => setFeedbackMessage(null), 4000);
  }, [soundEffects, notificationStatus, remindersEnabled]);

  const handleTestNotification = useCallback(() => {
    if (soundEffects) soundManager.playClick();
    const sent = triggerTestNotification();
    if (sent) {
      setFeedbackMessage('Test reminder sent to your desktop/browser notification center!');
    } else {
      setFeedbackMessage('Please allow notification permission first.');
    }
    setTimeout(() => setFeedbackMessage(null), 3000);
  }, [soundEffects]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      id="daily-challenge-card"
      className={`mb-6 sm:mb-8 p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border relative overflow-hidden backdrop-blur-2xl shadow-xl transition-all ${
        challengeState.isCompletedToday
          ? 'bg-gradient-to-r from-slate-950/95 via-emerald-950/30 to-slate-900/95 border-emerald-500/40 shadow-emerald-500/10'
          : 'bg-gradient-to-r from-slate-950/95 via-cyan-950/40 to-slate-900/95 border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.15)]'
      }`}
    >
      {/* Top Gradient Stripe */}
      <div
        className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${
          challengeState.isCompletedToday
            ? 'from-emerald-400 via-teal-400 to-cyan-400'
            : 'from-amber-400 via-cyan-400 to-blue-500 animate-pulse'
        }`}
      />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6">
        {/* Left Side: Challenge Info & Set Details */}
        <div className="space-y-2.5 flex-1">
          {/* Header Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Daily Challenge
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-850 border border-slate-700 text-slate-300 text-xs font-medium">
              <Calendar className="w-3 h-3 text-cyan-400" />
              {challengeState.formattedDate}
            </span>

            {/* Streak Counter */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border ${
                challengeState.currentStreak > 0
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-sm'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400'
              }`}
              title={`Consecutive days completing the daily challenge. Best: ${challengeState.bestStreak} days`}
            >
              <Flame className={`w-3.5 h-3.5 ${challengeState.currentStreak > 0 ? 'text-amber-400 animate-bounce' : 'text-slate-500'}`} />
              <span>{challengeState.currentStreak} Day {challengeState.currentStreak === 1 ? 'Streak' : 'Streak'}</span>
            </span>

            {/* Bonus Points Chip */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold">
              <Zap className="w-3 h-3 text-amber-400" />
              +100 Bonus XP
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Today&apos;s Target: {targetSet.title}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Set #{targetSet.id}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-cyan-300/90 font-medium mt-0.5">
              {targetSet.subtitle}
            </p>
            <p className="text-xs text-slate-300/80 mt-1 max-w-2xl leading-relaxed">
              Complete today&apos;s selected model question set to earn <strong>+100 Bonus Points</strong>, keep your daily study streak alive, and strengthen grammar retention.
            </p>
          </div>

          {/* Set Metadata Chips */}
          <div className="flex items-center gap-3 pt-1 text-xs text-slate-400 flex-wrap">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              {targetSet.questions.length} MCQs with Explanations
            </span>
            <span className="h-3 w-px bg-slate-700" />
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              ~15-20 Mins Practice
            </span>
            <span className="h-3 w-px bg-slate-700" />
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              All Competitive Exam Topics
            </span>
          </div>
        </div>

        {/* Right Side: Status Badge & CTA Button */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
          {challengeState.isCompletedToday ? (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="text-right sm:text-left lg:text-right">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs sm:text-sm font-black">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Completed Today!</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Score: <strong className="text-white">{challengeState.todayScore}</strong> / {targetSet.questions.length} ({challengeState.todayPercentage}%)
                </div>
              </div>

              <button
                type="button"
                id="daily-challenge-retake-btn"
                onClick={handleStart}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-emerald-500/50 text-emerald-200 hover:text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                title="Practice today's challenge again to improve your score"
              >
                <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                <span>Practice Again</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              id="daily-challenge-start-btn"
              onClick={handleStart}
              className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-sm transition shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
              title="Start Today's Daily Challenge and claim +100 bonus points"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Daily Challenge</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Notification & Return Reminder Bar */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Bell className="w-3.5 h-3.5 text-cyan-400" />
            24-Hour Return Reminder:
          </span>

          <button
            type="button"
            id="toggle-daily-notification-btn"
            onClick={handleToggleOrRequestNotifications}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold text-[11px] border transition cursor-pointer ${
              notificationStatus === 'granted' && remindersEnabled
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-slate-800/90 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20'
            }`}
            title="Toggle or enable browser notifications prompting you to return if inactive for over 24 hours"
          >
            {notificationStatus === 'granted' && remindersEnabled ? (
              <>
                <BellRing className="w-3 h-3 text-emerald-400" />
                <span>Reminders Active (Notify after 24h away)</span>
              </>
            ) : (
              <>
                <Bell className="w-3 h-3 text-cyan-300" />
                <span>Enable 24h Return Reminders</span>
              </>
            )}
          </button>

          {notificationStatus === 'granted' && remindersEnabled && (
            <button
              type="button"
              id="test-notification-btn"
              onClick={handleTestNotification}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-300 border border-slate-700 transition cursor-pointer"
              title="Test how the browser notification will appear"
            >
              Test Notification
            </button>
          )}
        </div>

        {feedbackMessage && (
          <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-lg border border-cyan-500/30 animate-fade-in">
            {feedbackMessage}
          </span>
        )}
      </div>
    </motion.div>
  );
};
