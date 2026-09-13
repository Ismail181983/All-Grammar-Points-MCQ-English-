import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  Share2,
  Filter,
  Check,
  Award,
  ArrowRight,
  Zap,
  Layers,
  BarChart3,
  TrendingUp,
  Target,
  Activity,
  CheckCheck,
} from 'lucide-react';
import { ModelQuestionSet, Question, QuizSettings, StudentProfile, ScoreRecord, BadgeProgress, GrammarCategory } from '../types';
import { speechManager } from '../utils/speech';
import { soundManager } from '../utils/sound';
import { getTierStyle } from '../utils/badges';
import { determineQuestionCategory, CATEGORY_META_MAP } from '../utils/categories';
import { getAppTheme } from '../utils/theme';
import { BadgeIcon } from './BadgeIcon';
import { HeaderClock } from './HeaderClock';
import { Footer } from './Footer';
import { ShareProgressModal } from './ShareProgressModal';
import { ShareCardData } from '../utils/shareCard';

interface ResultViewProps {
  modelSet: ModelQuestionSet;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  timeSpentSeconds: number;
  studentProfile: StudentProfile;
  settings: QuizSettings;
  newlyUnlockedBadges?: BadgeProgress[];
  allBadges?: BadgeProgress[];
  onRetake: () => void;
  onSmartReplay?: (missedQuestions: Question[]) => void;
  onReturnToDashboard: () => void;
  onOpenScoreBoard: () => void;
  onOpenTrophiesModal: () => void;
  onOpenFlashcards?: (modelId: number) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  modelSet,
  userAnswers,
  timeSpentSeconds,
  studentProfile,
  settings,
  newlyUnlockedBadges = [],
  allBadges = [],
  onRetake,
  onSmartReplay,
  onReturnToDashboard,
  onOpenScoreBoard,
  onOpenTrophiesModal,
  onOpenFlashcards,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong'>('all');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const activeTheme = getAppTheme(settings.theme);

  // Compute performance metrics
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  modelSet.questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (!ans) {
      unansweredCount++;
    } else if (ans === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const totalQuestions = modelSet.questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const attemptedCount = totalQuestions - unansweredCount;
  const attemptAccuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const attemptRate = Math.round((attemptedCount / totalQuestions) * 100);
  const rightPercentage = Math.round((correctCount / totalQuestions) * 100);
  const wrongPercentage = Math.round((wrongCount / totalQuestions) * 100);
  const skippedPercentage = Math.round((unansweredCount / totalQuestions) * 100);
  const avgPaceSeconds = (timeSpentSeconds / Math.max(1, totalQuestions)).toFixed(1);

  // Compute questions missed in this quiz session for Smart Replay
  const missedQuestions = useMemo(() => {
    return modelSet.questions.filter((q) => {
      const ans = userAnswers[q.id];
      return ans && ans !== q.correctAnswer;
    });
  }, [modelSet.questions, userAnswers]);

  // Category breakdown calculation
  const categoryBreakdown = useMemo(() => {
    const map: Record<
      string,
      { category: GrammarCategory; total: number; correct: number; wrong: number; skipped: number }
    > = {};

    modelSet.questions.forEach((q) => {
      const cat: GrammarCategory = q.category || determineQuestionCategory(modelSet.topic, q.question);
      if (!map[cat]) {
        map[cat] = { category: cat, total: 0, correct: 0, wrong: 0, skipped: 0 };
      }
      map[cat].total += 1;
      const ans = userAnswers[q.id];
      if (!ans) {
        map[cat].skipped += 1;
      } else if (ans === q.correctAnswer) {
        map[cat].correct += 1;
      } else {
        map[cat].wrong += 1;
      }
    });

    return Object.values(map).sort((a, b) => b.total - a.total);
  }, [modelSet, userAnswers]);

  // Prepare Share Progress Card Data
  const shareCardData: ShareCardData = useMemo(() => {
    const effectiveBadges = allBadges && allBadges.length > 0 ? allBadges : newlyUnlockedBadges;
    return {
      studentName: studentProfile.name,
      roll: studentProfile.roll,
      modelTitle: modelSet.title,
      score: correctCount,
      totalQuestions,
      percentage,
      timeSpentSeconds,
      correctCount,
      wrongCount,
      unansweredCount,
      badges: effectiveBadges,
    };
  }, [
    studentProfile,
    modelSet.title,
    correctCount,
    totalQuestions,
    percentage,
    timeSpentSeconds,
    wrongCount,
    unansweredCount,
    allBadges,
    newlyUnlockedBadges,
  ]);

  // Praising words and phrases based on score
  let praisePhrase = '';
  let praiseSpeech = '';
  if (percentage >= 90) {
    praisePhrase = 'Outstanding Brilliance! Phenomenal Mastery of English Grammar!';
    praiseSpeech = `Tremendous accomplishment, ${studentProfile.name}! You scored ${correctCount} out of ${totalQuestions} with ${percentage} percent accuracy! Your grammatical reasoning is truly phenomenal!`;
  } else if (percentage >= 75) {
    praisePhrase = 'Excellent Achievement! Strong & Confident Grasp of Concepts!';
    praiseSpeech = `Congratulations ${studentProfile.name}! You scored ${correctCount} right answers and ${wrongCount} wrong answers. Great job on this model question!`;
  } else if (percentage >= 50) {
    praisePhrase = 'Good Effort! Solid foundation, keep refining your skills!';
    praiseSpeech = `Good work ${studentProfile.name}! You answered ${correctCount} out of ${totalQuestions} correctly. Reviewing the explanations will help you master every rule!`;
  } else {
    praisePhrase = 'Keep Practicing! Every mistake is a step toward perfection!';
    praiseSpeech = `Courageous attempt ${studentProfile.name}. You got ${correctCount} correct and ${wrongCount} wrong. Thoroughly read each grammatical explanation below to build confidence!`;
  }

  // Trigger colorful congratulations effect & read aloud on mount
  useEffect(() => {
    // 1. Play celebration fanfare sound
    if (settings.soundEffects) {
      soundManager.playCelebration();
    }

    // 2. Multi-stage colorful confetti fireworks
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#22d3ee', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#a855f7'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 3. Read aloud score, right/wrong count and praising phrases
    if (settings.enableSpeech) {
      setIsSpeaking(true);
      speechManager.speak(
        praiseSpeech,
        {
          rate: settings.speechRate,
          pitch: settings.speechPitch,
          volume: settings.speechVolume,
        },
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }

    return () => {
      speechManager.stop();
    };
  }, []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      speechManager.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechManager.speak(
        praiseSpeech,
        {
          rate: settings.speechRate,
          pitch: settings.speechPitch,
          volume: settings.speechVolume,
        },
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const filteredQuestions = modelSet.questions.filter((q) => {
    const ans = userAnswers[q.id];
    if (filterType === 'correct') return ans === q.correctAnswer;
    if (filterType === 'wrong') return ans !== q.correctAnswer;
    return true;
  });

  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-slate-100 z-10">
      {/* Top Header */}
      <header className="relative z-30 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 bg-[#0F172A]/90 backdrop-blur-xl border-b border-blue-500/25 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-base font-extrabold text-white tracking-tight">
              Test Evaluation & Score Report
            </h1>
            <p className="text-[10px] sm:text-xs text-cyan-300 truncate max-w-[200px] xs:max-w-[300px] sm:max-w-none">
              {modelSet.title} • Candidate: <strong>{studentProfile.name}</strong> (Roll: {studentProfile.roll})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            id="result-header-trophies-btn"
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              onOpenTrophiesModal();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 text-xs font-bold transition cursor-pointer"
            title="View Trophies & Badges"
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
            <span className="hidden xs:inline">Trophies</span>
          </button>

          {/* Share Score Button in Header */}
          <button
            id="result-header-share-btn"
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              setIsShareModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold transition cursor-pointer shadow-sm"
            title="Share Score, Image Card & Badges"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
            <span className="hidden xs:inline">Share Score</span>
          </button>

          <button
            type="button"
            onClick={toggleSpeech}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              isSpeaking
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            <span className="hidden xs:inline">{isSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
          </button>

          <HeaderClock />
        </div>
      </header>

      {/* Main Content: Congratulations Hero Card & Explanation List */}
      <main className="relative z-20 flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {/* Colorful Congratulations Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0F172A]/95 via-[#1E3A8A]/30 to-[#0F172A]/90 backdrop-blur-2xl border-2 border-cyan-400/50 p-4 sm:p-7 md:p-9 shadow-[0_0_60px_rgba(30,58,138,0.4)] relative overflow-hidden mb-6 sm:mb-8 text-center"
        >
          {/* Shimmer background flare */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Trophy & Congratulating Header */}
          <div className="inline-flex p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.6)] mb-3 sm:mb-4 animate-bounce">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="inline-block px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
            Assessment Completed
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {praisePhrase}
          </h2>

          <p className="text-xs sm:text-base text-cyan-200 font-medium max-w-2xl mx-auto mt-2 leading-relaxed">
            Candidate <strong className="text-white font-bold">{studentProfile.name}</strong> (Roll{' '}
            <strong className="text-white font-mono">{studentProfile.roll}</strong>) completed{' '}
            <strong className="text-white">{modelSet.title}</strong> in {timeFormatted}.
          </p>

          {/* Score Badges Row with Animated Entry Score Bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto mt-5 sm:mt-7">
            {/* Total Score Percentage */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-inner flex flex-col justify-between">
              <div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  Score
                </div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono mt-0.5 sm:mt-1">
                  {percentage}%
                </div>
                <div className="text-[10px] sm:text-[11px] text-cyan-400 font-semibold mt-0.5">
                  {correctCount} / {totalQuestions}
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2.5">
                <motion.div
                  key={`badge-score-${animationKey}`}
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.7)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                />
              </div>
            </div>

            {/* Right Answers */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-950/70 border border-emerald-500/40 shadow-inner flex flex-col justify-between">
              <div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Right
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-0.5 sm:mt-1">
                  {correctCount}
                </div>
                <div className="text-[10px] sm:text-[11px] text-emerald-300/80 font-medium mt-0.5">
                  Correct Answers
                </div>
              </div>
              <div className="w-full h-1.5 bg-emerald-950/80 rounded-full overflow-hidden mt-2.5">
                <motion.div
                  key={`badge-right-${animationKey}`}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${rightPercentage}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
              </div>
            </div>

            {/* Wrong Answers */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-950/70 border border-rose-500/40 shadow-inner flex flex-col justify-between">
              <div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center justify-center gap-1">
                  <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Wrong
                </div>
                <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-0.5 sm:mt-1">
                  {wrongCount}
                </div>
                <div className="text-[10px] sm:text-[11px] text-rose-300/80 font-medium mt-0.5">
                  Incorrect Answers
                </div>
              </div>
              <div className="w-full h-1.5 bg-rose-950/80 rounded-full overflow-hidden mt-2.5">
                <motion.div
                  key={`badge-wrong-${animationKey}`}
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-400 shadow-[0_0_8px_rgba(244,63,94,0.7)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${wrongPercentage}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </div>
            </div>

            {/* Time Taken */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-amber-500/40 shadow-inner flex flex-col justify-between">
              <div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Duration
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-0.5 sm:mt-1">
                  {timeFormatted}
                </div>
                <div className="text-[10px] sm:text-[11px] text-amber-400/80 font-medium mt-0.5">
                  {unansweredCount > 0 ? `${unansweredCount} Skipped` : 'All Attempted'}
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2.5">
                <motion.div
                  key={`badge-duration-${animationKey}`}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${attemptRate}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                />
              </div>
            </div>
          </div>

          {/* Newly Unlocked Trophies Celebration Banner */}
          {newlyUnlockedBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 sm:mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-yellow-900/40 to-slate-900 border-2 border-yellow-400/70 shadow-[0_0_35px_rgba(234,179,8,0.3)] text-left"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-yellow-400/20">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-yellow-400/20 text-yellow-300">
                    <Sparkles className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-yellow-300 tracking-tight uppercase">
                      New Digital Trophy Unlocked!
                    </h4>
                    <p className="text-xs text-slate-300">
                      Congratulations! You achieved honors during this test attempt.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="result-unlocked-badge-share-btn"
                    type="button"
                    onClick={() => {
                      if (settings.soundEffects) soundManager.playClick();
                      setIsShareModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-bold text-xs transition cursor-pointer shadow-sm"
                    title="Share your new badge achievement"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Progress</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (settings.soundEffects) soundManager.playCelebration();
                      onOpenTrophiesModal();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs transition cursor-pointer shadow-sm"
                  >
                    View in Cabinet
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {newlyUnlockedBadges.map((badge) => {
                  const style = getTierStyle(badge.tier);
                  return (
                    <div
                      key={badge.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${style.badgeBg} ${style.badgeBorder} ${style.glow}`}
                    >
                      <BadgeIcon
                        iconName={badge.iconName}
                        tier={badge.tier}
                        isUnlocked={true}
                        size="md"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-sm font-black text-white">{badge.title}</strong>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded border ${style.pillBg}`}>
                            {badge.tier}
                          </span>
                        </div>
                        <p className={`text-xs font-semibold ${style.textColor}`}>{badge.subtitle}</p>
                        <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{badge.requirement}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Action Buttons Row */}
          <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-5 sm:mt-7 pt-5 sm:pt-6 border-t border-slate-800">
            {/* Retake Full Test Button */}
            <button
              id="result-retake-btn"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                onRetake();
              }}
              className="w-full xs:w-auto min-h-[44px] flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-400 text-white text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>

            {/* Smart Replay (Retake Missed Questions) Button */}
            {onSmartReplay && missedQuestions.length > 0 && (
              <button
                id="result-smart-replay-action-btn"
                type="button"
                onClick={() => {
                  if (settings.soundEffects) soundManager.playClick();
                  onSmartReplay(missedQuestions);
                }}
                className="w-full xs:w-auto min-h-[44px] flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-black text-xs sm:text-sm transition shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:brightness-110 cursor-pointer"
                title="Retake only the questions you got wrong in this quiz"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Smart Replay ({missedQuestions.length} Incorrect)</span>
              </button>
            )}

            {/* Share Score Button */}
            <button
              id="result-share-score-btn"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                setIsShareModalOpen(true);
              }}
              className="w-full xs:w-auto min-h-[44px] flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-500/30 text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer hover:border-cyan-300"
              title="Share progress summary card image or copy performance text"
            >
              <Share2 className="w-4 h-4 text-cyan-300" />
              <span>Share Score</span>
            </button>

            <button
              id="result-view-trophies-btn"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                onOpenTrophiesModal();
              }}
              className="w-full xs:w-auto min-h-[44px] flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Trophies Cabinet</span>
            </button>

            {onOpenFlashcards && (
              <button
                id="result-view-flashcards-btn"
                onClick={() => {
                  if (settings.soundEffects) soundManager.playClick();
                  onOpenFlashcards(modelSet.id);
                }}
                className="w-full xs:w-auto min-h-[44px] flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer"
              >
                <Layers className="w-4 h-4 text-purple-300" />
                <span>Study in Flashcards</span>
              </button>
            )}

            <button
              id="result-view-scoreboard-btn"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                onOpenScoreBoard();
              }}
              className="w-full xs:w-auto min-h-[44px] flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span>Score Board</span>
            </button>

            <button
              id="result-dashboard-btn"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                onReturnToDashboard();
              }}
              className="w-full xs:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 text-xs sm:text-sm font-black hover:brightness-110 transition shadow-lg shadow-cyan-500/30 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>All Model Questions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Performance Analytics & Animated Score Bars Section */}
        <motion.div
          id="result-score-bars-dashboard"
          key={`analytics-dashboard-${animationKey}`}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-2xl sm:rounded-3xl backdrop-blur-xl border p-4 sm:p-7 md:p-8 relative overflow-hidden transition-all duration-500 ${activeTheme.quizCardBgClass}`}
        >
          {/* Section Header with Replay Animations Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-cyan-500/20">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>Performance Analytics & Score Distribution</span>
                </h3>
                <p className="text-xs text-slate-400">
                  স্কোর অগ্রগতি, নির্ভুলতার হার ও ব্যাকরণভিত্তিক ফলাফল বিশ্লেষণ
                </p>
              </div>
            </div>

            <button
              id="replay-score-bars-btn"
              type="button"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                setAnimationKey((k) => k + 1);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 text-xs font-bold transition cursor-pointer shadow-sm self-stretch sm:self-auto justify-center"
              title="Replay score bar entry animations"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Replay Animations</span>
            </button>
          </div>

          {/* 1. Multi-Segment Composite Score Bar (Correct, Incorrect, Skipped) */}
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Answer Distribution Spectrum ({totalQuestions} MCQs)
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                {correctCount} Correct • {wrongCount} Wrong • {unansweredCount} Skipped
              </span>
            </div>

            {/* Stacked Animated Progress Bar Track */}
            <div className="w-full h-4 sm:h-5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700 flex gap-1">
              {/* Correct Segment */}
              {correctCount > 0 && (
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(correctCount / totalQuestions) * 100}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  title={`Correct: ${correctCount} (${rightPercentage}%)`}
                />
              )}
              {/* Wrong Segment */}
              {wrongCount > 0 && (
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(wrongCount / totalQuestions) * 100}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                  title={`Incorrect: ${wrongCount} (${wrongPercentage}%)`}
                />
              )}
              {/* Skipped Segment */}
              {unansweredCount > 0 && (
                <motion.div
                  className="h-full rounded-full bg-slate-700"
                  initial={{ width: 0 }}
                  animate={{ width: `${(unansweredCount / totalQuestions) * 100}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  title={`Skipped: ${unansweredCount} (${skippedPercentage}%)`}
                />
              )}
            </div>

            {/* Distribution Legend */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Right: <strong>{correctCount}</strong> ({rightPercentage}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-300">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                <span>Wrong: <strong>{wrongCount}</strong> ({wrongPercentage}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500 shrink-0" />
                <span>Skipped: <strong>{unansweredCount}</strong> ({skippedPercentage}%)</span>
              </div>
            </div>
          </div>

          {/* 2. Core Metrics Individual Animated Score Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Overall Accuracy Metric */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/20">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  Overall Test Score & Accuracy
                </span>
                <span className="text-xs font-mono font-black text-cyan-300">{percentage}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5 relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                <span>Benchmark: 60%</span>
                <span className={percentage >= 80 ? 'text-emerald-400 font-bold' : percentage >= 60 ? 'text-cyan-400 font-bold' : 'text-amber-400 font-bold'}>
                  {percentage >= 80 ? 'Distinction' : percentage >= 60 ? 'Competent' : 'Needs Practice'}
                </span>
              </div>
            </div>

            {/* Attempt Accuracy Metric */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/20">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Accuracy on Attempted MCQs
                </span>
                <span className="text-xs font-mono font-black text-emerald-300">{attemptAccuracy}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${attemptAccuracy}%` }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                <span>{correctCount} correct of {attemptedCount} answered</span>
                <span className="text-emerald-400 font-semibold">{attemptAccuracy >= 75 ? 'High Precision' : 'Normal Precision'}</span>
              </div>
            </div>

            {/* Test Completion Rate */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                  Attempt / Completion Rate
                </span>
                <span className="text-xs font-mono font-black text-purple-300">{attemptRate}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${attemptRate}%` }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                <span>{attemptedCount} of {totalQuestions} attempted</span>
                <span className="text-purple-300 font-semibold">{unansweredCount === 0 ? 'Full Attempt (100%)' : `${unansweredCount} Unanswered`}</span>
              </div>
            </div>

            {/* Speed Pace Metric */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Time Pace Efficiency
                </span>
                <span className="text-xs font-mono font-black text-amber-300">{avgPaceSeconds}s / MCQ</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(10, Math.round((45 / Math.max(15, parseFloat(avgPaceSeconds)))) * 100))}%` }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                <span>Target: &lt;45s per MCQ</span>
                <span className="text-amber-300 font-semibold">Total: {timeFormatted}</span>
              </div>
            </div>
          </div>

          {/* 3. Grammar Category Performance Breakdown Bars */}
          {categoryBreakdown.length > 0 && (
            <div className="mt-5 pt-5 border-t border-slate-800/90">
              <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Grammar Category Mastery Breakdown</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                  {categoryBreakdown.length} Categories Tested
                </span>
              </h4>

              <div className="space-y-3">
                {categoryBreakdown.map((catItem, idx) => {
                  const catPct = Math.round((catItem.correct / catItem.total) * 100);
                  const meta = CATEGORY_META_MAP[catItem.category];
                  const gradient = meta?.gradient || 'from-cyan-500 to-blue-500';

                  return (
                    <div
                      key={catItem.category}
                      className="p-3 sm:p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${meta?.badgeBg || 'bg-cyan-500/15'} ${meta?.badgeBorder || 'border-cyan-500/30'} ${meta?.badgeText || 'text-cyan-300'}`}>
                            {catItem.category}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate hidden xs:inline">
                            {catItem.correct} of {catItem.total} correct
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            catPct >= 80
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : catPct >= 60
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}>
                            {catPct >= 80 ? 'Mastered' : catPct >= 60 ? 'Competent' : 'Review Needed'}
                          </span>
                          <span className="text-xs font-mono font-black text-white">{catPct}%</span>
                        </div>
                      </div>

                      {/* Animated Score Bar for Category */}
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${catPct}%` }}
                          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + idx * 0.08 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Detailed Question Review & Grammatical Explanations (Required) */}
        <div className="space-y-4 sm:space-y-5">
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-2 border-b border-cyan-500/20">
            <div>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Detailed Question Review</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {filteredQuestions.length}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Grammatical rules and correct answer breakdowns for all {totalQuestions} MCQs
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('correct')}
                className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterType === 'correct'
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Correct ({correctCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('wrong')}
                className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterType === 'wrong'
                    ? 'bg-rose-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Wrong ({wrongCount})
              </button>
            </div>
          </div>

          {/* Smart Replay Callout Banner */}
          {onSmartReplay && missedQuestions.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/25 border border-amber-400/40 text-amber-300 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <span>Smart Replay Mode Available</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40 text-[10px] font-black">
                      {missedQuestions.length} Incorrect {missedQuestions.length === 1 ? 'MCQ' : 'MCQs'}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Reinforce learning immediately by retaking only the questions you missed in this session.
                  </p>
                </div>
              </div>

              <button
                id="smart-replay-callout-btn"
                type="button"
                onClick={() => {
                  if (settings.soundEffects) soundManager.playClick();
                  onSmartReplay(missedQuestions);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 transition shadow-lg shadow-amber-500/25 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Retake Missed Questions</span>
              </button>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              const isSkipped = !userAns;

              return (
                <div
                  key={q.id}
                  className={`rounded-xl sm:rounded-2xl border p-3.5 sm:p-5 transition bg-[#0F172A]/90 backdrop-blur-xl ${
                    isCorrect
                      ? 'border-emerald-500/40 hover:border-emerald-400'
                      : isSkipped
                      ? 'border-blue-900/40'
                      : 'border-rose-500/40 hover:border-rose-400'
                  }`}
                >
                  {/* Question header row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 sm:mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 font-mono font-bold text-[11px] sm:text-xs border border-slate-700">
                        Q{q.id}
                      </span>
                      <span
                        className={`text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : isSkipped
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Correct (+1)
                          </>
                        ) : isSkipped ? (
                          'Skipped (0)'
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Incorrect
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {q.category && (
                        <span className="text-[10px] sm:text-[11px] font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-950/70 border border-purple-500/30">
                          {q.category}
                        </span>
                      )}
                      <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30">
                        {q.topic}
                      </span>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h4 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 leading-relaxed">
                    {q.question}
                  </h4>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 sm:mb-4 text-xs">
                    {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                      const isUserChoice = userAns === optKey;
                      const isCorrectChoice = q.correctAnswer === optKey;

                      let badgeStyle = 'bg-slate-950/60 border-slate-800 text-slate-300';
                      if (isCorrectChoice) {
                        badgeStyle = 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 font-semibold';
                      } else if (isUserChoice && !isCorrectChoice) {
                        badgeStyle = 'bg-rose-950/80 border-rose-500/60 text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={optKey}
                          className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between gap-2 ${badgeStyle}`}
                        >
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-slate-800/80 font-mono font-black flex items-center justify-center text-[10px] sm:text-[11px] shrink-0">
                              {optKey}
                            </span>
                            <span className="truncate sm:whitespace-normal">{q.options[optKey]}</span>
                          </div>

                          {isCorrectChoice && (
                            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-wider shrink-0 ml-1">
                              Correct
                            </span>
                          )}
                          {isUserChoice && !isCorrectChoice && (
                            <span className="text-[9px] sm:text-[10px] font-bold text-rose-400 uppercase tracking-wider shrink-0 ml-1">
                              Your Pick
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Grammatical Explanation Box (Required) */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs leading-relaxed text-slate-300 flex items-start gap-2 sm:gap-2.5">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cyan-300 font-bold block mb-0.5 text-xs">
                        Grammar Explanation:
                      </strong>
                      <p className="text-[11px] sm:text-xs text-slate-300/90 leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Share Progress & Scorecard Modal */}
      <ShareProgressModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={shareCardData}
        settings={settings}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
