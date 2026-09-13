import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Timer,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowLeft,
  Plus,
  Minus,
  Settings2,
  Lock,
  Lightbulb,
  BookOpen,
  Pause,
  Play,
  ShieldAlert,
  EyeOff,
  Mic,
  MicOff,
  Radio,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { ModelQuestionSet, QuizSettings, StudentProfile } from '../types';
import { speechManager } from '../utils/speech';
import { soundManager } from '../utils/sound';
import { getAppTheme } from '../utils/theme';
import { HeaderClock } from './HeaderClock';
import { useVoiceQuiz } from '../hooks/useVoiceQuiz';
import { VoiceCommandPill } from './VoiceCommandPill';

interface QuizOptionButtonProps {
  optKey: 'A' | 'B' | 'C' | 'D';
  label: string;
  isSelected: boolean;
  isLocked: boolean;
  onSelect: (opt: 'A' | 'B' | 'C' | 'D') => void;
}

// Memoized individual option button to prevent re-rendering options when timers tick
const QuizOptionButton = React.memo<QuizOptionButtonProps>(({
  optKey,
  label,
  isSelected,
  isLocked,
  onSelect,
}) => {
  const handleClick = useCallback(() => {
    if (!isLocked) {
      onSelect(optKey);
    }
  }, [isLocked, onSelect, optKey]);

  return (
    <button
      type="button"
      disabled={isLocked}
      onClick={handleClick}
      className={`text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-center gap-2.5 sm:gap-3.5 min-h-[48px] sm:min-h-[54px] group ${
        isLocked
          ? isSelected
            ? 'bg-slate-800/90 border-amber-500/60 text-amber-200 opacity-90 cursor-not-allowed'
            : 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-50 cursor-not-allowed'
          : isSelected
          ? 'bg-gradient-to-r from-cyan-950 to-teal-950 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400 cursor-pointer'
          : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-600 cursor-pointer'
      }`}
    >
      <span
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 transition ${
          isLocked
            ? isSelected
              ? 'bg-amber-400 text-slate-950 shadow'
              : 'bg-slate-800 text-slate-500 border border-slate-700'
            : isSelected
            ? 'bg-cyan-400 text-slate-950 shadow-md'
            : 'bg-slate-800 text-cyan-300 border border-slate-700 group-hover:border-cyan-400/50'
        }`}
      >
        {optKey}
      </span>
      <span className="text-xs sm:text-sm font-medium leading-snug flex-1">
        {label}
      </span>
      {isSelected && (
        <CheckCircle2
          className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${
            isLocked ? 'text-amber-400' : 'text-cyan-400'
          }`}
        />
      )}
      {isLocked && !isSelected && (
        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 shrink-0" />
      )}
    </button>
  );
});

QuizOptionButton.displayName = 'QuizOptionButton';

interface QuestionPaletteProps {
  questions: { id: number }[];
  currentIdx: number;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  lockedQuestions: Record<number, boolean>;
  isTotalTimeExpired: boolean;
  onJump: (idx: number) => void;
}

// Memoized Question Palette - avoids re-rendering 25 buttons on every 1-second timer tick
const QuestionPalette = React.memo<QuestionPaletteProps>(({
  questions,
  currentIdx,
  userAnswers,
  lockedQuestions,
  isTotalTimeExpired,
  onJump,
}) => {
  return (
    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0F172A]/85 border border-blue-500/25">
      <div className="text-xs font-bold text-slate-400 mb-2 sm:mb-2.5 flex flex-wrap items-center justify-between gap-2">
        <span>Question Palette:</span>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Answered
          </span>
          <span className="text-amber-400 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5 text-amber-400" />
            Locked
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-600"></span>
            Remaining
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
        {questions.map((q, idx) => {
          const isAnswered = userAnswers[q.id] !== undefined;
          const isCurrent = idx === currentIdx;
          const isLocked = lockedQuestions[q.id] || isTotalTimeExpired;

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onJump(idx)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl font-mono text-[11px] sm:text-xs font-bold transition flex items-center justify-center relative cursor-pointer ${
                isCurrent
                  ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 bg-cyan-500 text-slate-950 font-black'
                  : isAnswered
                  ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/40'
                  : isLocked
                  ? 'bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/40'
                  : 'bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              {idx + 1}
              {isLocked && !isAnswered && (
                <Lock className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-400 absolute -top-1 -right-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

QuestionPalette.displayName = 'QuestionPalette';

interface TotalTimerCapsuleProps {
  enableTotalTimer: boolean;
  isTotalTimeExpired: boolean;
  totalSecondsLeft: number;
  onToggle: () => void;
  onAdjustMinutes: (mins: number) => void;
}

const TotalTimerCapsule = React.memo<TotalTimerCapsuleProps>(({
  enableTotalTimer,
  isTotalTimeExpired,
  totalSecondsLeft,
  onToggle,
  onAdjustMinutes,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl border backdrop-blur-md transition ${
        isTotalTimeExpired
          ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
          : enableTotalTimer
          ? totalSecondsLeft < 180
            ? 'bg-rose-950/80 border-rose-500 text-rose-200 animate-pulse'
            : 'bg-slate-900/90 border-cyan-500/40 text-cyan-200'
          : 'bg-slate-900/50 border-slate-800 text-slate-500'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1 sm:gap-1.5 font-bold text-[11px] sm:text-xs hover:text-white transition cursor-pointer"
        title="Click to toggle Total 25-MCQ Timer ON/OFF"
      >
        <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isTotalTimeExpired ? 'text-rose-400' : 'text-cyan-400'}`} />
        <span className="hidden xs:inline">Total:</span>
        <span className="font-mono text-xs sm:text-sm tracking-wider font-bold">
          {enableTotalTimer ? (isTotalTimeExpired ? 'Expired' : formatTime(totalSecondsLeft)) : 'Off'}
        </span>
      </button>

      {enableTotalTimer && !isTotalTimeExpired && (
        <div className="flex items-center gap-0.5 sm:gap-1 pl-1 sm:pl-1.5 border-l border-cyan-500/30">
          <button
            type="button"
            onClick={() => onAdjustMinutes(-1)}
            className="p-1 rounded hover:bg-white/10 text-cyan-300 cursor-pointer"
            title="Subtract 1 minute from Total Time"
          >
            <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
          <button
            type="button"
            onClick={() => onAdjustMinutes(1)}
            className="p-1 rounded hover:bg-white/10 text-cyan-300 cursor-pointer"
            title="Add 1 minute to Total Time"
          >
            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </div>
      )}
    </div>
  );
});

TotalTimerCapsule.displayName = 'TotalTimerCapsule';

interface QuestionTimerCapsuleProps {
  enableQuestionTimer: boolean;
  isCurrentQuestionLocked: boolean;
  questionSecondsLeft: number;
  onToggle: () => void;
  onAdjustSeconds: (secs: number) => void;
}

const QuestionTimerCapsule = React.memo<QuestionTimerCapsuleProps>(({
  enableQuestionTimer,
  isCurrentQuestionLocked,
  questionSecondsLeft,
  onToggle,
  onAdjustSeconds,
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl border backdrop-blur-md transition ${
        isCurrentQuestionLocked
          ? 'bg-amber-950/80 border-amber-500 text-amber-200'
          : enableQuestionTimer
          ? questionSecondsLeft <= 10
            ? 'bg-amber-950/80 border-amber-500 text-amber-200 animate-pulse'
            : 'bg-slate-900/90 border-emerald-500/40 text-emerald-200'
          : 'bg-slate-900/50 border-slate-800 text-slate-500'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1 sm:gap-1.5 font-bold text-[11px] sm:text-xs hover:text-white transition cursor-pointer"
        title="Click to toggle Per-Question Timer ON/OFF"
      >
        {isCurrentQuestionLocked ? (
          <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
        ) : (
          <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
        )}
        <span className="hidden xs:inline">MCQ:</span>
        <span className="font-mono text-xs sm:text-sm tracking-wider font-bold">
          {enableQuestionTimer
            ? isCurrentQuestionLocked
              ? 'Locked'
              : `${questionSecondsLeft}s`
            : 'Off'}
        </span>
      </button>

      {enableQuestionTimer && !isCurrentQuestionLocked && (
        <div className="flex items-center gap-0.5 sm:gap-1 pl-1 sm:pl-1.5 border-l border-emerald-500/30">
          <button
            type="button"
            onClick={() => onAdjustSeconds(-5)}
            className="p-1 rounded hover:bg-white/10 text-emerald-300 cursor-pointer"
            title="Subtract 5 seconds per question"
          >
            <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
          <button
            type="button"
            onClick={() => onAdjustSeconds(5)}
            className="p-1 rounded hover:bg-white/10 text-emerald-300 cursor-pointer"
            title="Add 5 seconds per question"
          >
            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </div>
      )}
    </div>
  );
});

QuestionTimerCapsule.displayName = 'QuestionTimerCapsule';

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  answeredCount: number;
  totalQuestions: number;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmSubmitModal = React.memo<ConfirmSubmitModalProps>(({
  isOpen,
  answeredCount,
  totalQuestions,
  onCancel,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-7 shadow-[0_0_40px_rgba(245,158,11,0.3)] text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Incomplete Test</h3>
                <p className="text-xs text-amber-300">
                  You answered {answeredCount} of {totalQuestions} questions
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              You still have <strong>{totalQuestions - answeredCount} unanswered</strong> questions. Are you sure you want to check answers and calculate your score now?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
              >
                Continue Answering
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 text-xs font-black hover:brightness-110 transition shadow-md shadow-cyan-500/30 cursor-pointer"
              >
                Submit & Check Answer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

ConfirmSubmitModal.displayName = 'ConfirmSubmitModal';

interface QuizViewProps {
  modelSet: ModelQuestionSet;
  settings: QuizSettings;
  studentProfile: StudentProfile;
  onCheckAnswer: (answers: Record<number, 'A' | 'B' | 'C' | 'D'>, timeSpentSeconds: number) => void;
  onExitQuiz: () => void;
  onOpenSettings: () => void;
  onUpdateSettings?: (newSettings: Partial<QuizSettings>) => void;
}

const QuizViewComponent: React.FC<QuizViewProps> = ({
  modelSet,
  settings,
  studentProfile,
  onCheckAnswer,
  onExitQuiz,
  onOpenSettings,
  onUpdateSettings,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Active theme configuration
  const activeTheme = useMemo(() => getAppTheme(settings.theme), [settings.theme]);

  // Tracking locked questions (locked due to per-question timer expiring or total timer expiring)
  const [lockedQuestions, setLockedQuestions] = useState<Record<number, boolean>>({});
  const [isTotalTimeExpired, setIsTotalTimeExpired] = useState(false);
  const [lockedToast, setLockedToast] = useState<string | null>(null);

  // Pause and academic integrity state
  const [isPaused, setIsPaused] = useState(false);
  const [pauseReason, setPauseReason] = useState<'tab_switch' | 'manual' | null>(null);

  // Timers state (overridable and controllable within the quiz and settings)
  const [enableTotalTimer, setEnableTotalTimer] = useState(settings.enableTotalTimer);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(settings.totalTimeMinutes * 60);

  const [enableQuestionTimer, setEnableQuestionTimer] = useState(settings.enableQuestionTimer);
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(settings.questionTimeSeconds);

  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isReadingExplanation, setIsReadingExplanation] = useState(false);

  const questionCardRef = useRef<HTMLDivElement>(null);
  const checkAnswerBtnRef = useRef<HTMLButtonElement>(null);

  // Focus Mode State: Hides non-essential UI (header, timers bar, 25-palette, navigation chrome) to maximize screen space
  const [isFocusMode, setIsFocusMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('asgk_quiz_focus_mode') === 'true';
    } catch {
      return false;
    }
  });

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('asgk_quiz_focus_mode', String(next));
      } catch {}
      if (settings.soundEffects) {
        soundManager.playClick();
      }
      return next;
    });
  }, [settings.soundEffects]);

  // Keyboard shortcut listener: 'F' toggles Focus Mode, 'Escape' exits Focus Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFocusMode();
      } else if (e.key === 'Escape' && isFocusMode) {
        e.preventDefault();
        setIsFocusMode(false);
        try {
          localStorage.setItem('asgk_quiz_focus_mode', 'false');
        } catch {}
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, toggleFocusMode]);

  const currentQuestion = modelSet.questions[currentIdx];
  const totalQuestions = modelSet.questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const isCurrentQuestionLocked = !!lockedQuestions[currentQuestion?.id] || isTotalTimeExpired;

  // Academic integrity listener: Auto-pause when user leaves or switches the active browser tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isTotalTimeExpired) {
        speechManager.stop();
        setIsReadingAloud(false);
        setIsReadingExplanation(false);
        setIsPaused(true);
        setPauseReason('tab_switch');
        if (settings.soundEffects) {
          soundManager.playLockAlert();
        }
      }
    };

    const handleWindowBlur = () => {
      if (!isTotalTimeExpired && !document.hasFocus()) {
        speechManager.stop();
        setIsReadingAloud(false);
        setIsReadingExplanation(false);
        setIsPaused(true);
        setPauseReason((prev) => prev || 'tab_switch');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isTotalTimeExpired, settings.soundEffects]);

  const handleResume = useCallback(() => {
    if (settings.soundEffects) {
      soundManager.playClick();
    }
    setIsPaused(false);
    setPauseReason(null);
  }, [settings.soundEffects]);

  const togglePause = useCallback(() => {
    if (isPaused) {
      handleResume();
    } else {
      speechManager.stop();
      setIsReadingAloud(false);
      setIsReadingExplanation(false);
      if (settings.soundEffects) {
        soundManager.playClick();
      }
      setIsPaused(true);
      setPauseReason('manual');
    }
  }, [isPaused, handleResume, settings.soundEffects]);

  // Sync settings when modified from outside (e.g. SettingsModal)
  useEffect(() => {
    setEnableTotalTimer(settings.enableTotalTimer);
    setEnableQuestionTimer(settings.enableQuestionTimer);
  }, [settings.enableTotalTimer, settings.enableQuestionTimer]);

  useEffect(() => {
    if (!lockedQuestions[currentQuestion?.id] && !isTotalTimeExpired) {
      setQuestionSecondsLeft(settings.questionTimeSeconds);
    }
    setIsReadingExplanation(false);
  }, [settings.questionTimeSeconds, currentIdx]);

  // Track overall elapsed time (pauses when isPaused is true)
  useEffect(() => {
    if (isPaused) return;

    const elapsedInterval = setInterval(() => {
      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(elapsedInterval);
  }, [isPaused]);

  // Total 25-Question Timer countdown & Auto-Lock (pauses when isPaused is true)
  useEffect(() => {
    if (!enableTotalTimer || isTotalTimeExpired || isPaused) return;

    const totalTimer = setInterval(() => {
      setTotalSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(totalTimer);
          // Total 25 questions time expired!
          setIsTotalTimeExpired(true);
          // Lock all questions
          setLockedQuestions((prevLocked) => {
            const allLocked: Record<number, boolean> = { ...prevLocked };
            modelSet.questions.forEach((q) => {
              allLocked[q.id] = true;
            });
            return allLocked;
          });
          if (settings.soundEffects) {
            soundManager.playLockAlert();
          }
          setLockedToast('২৫টি কুইজের নির্ধারিত সময় সমাপ্ত হয়েছে! সব প্রশ্ন লক করা হয়েছে। Check Answer বাটনে ক্লিক করুন।');
          setTimeout(() => setLockedToast(null), 5000);
          // Scroll to the active Check Answer button
          checkAnswerBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(totalTimer);
  }, [enableTotalTimer, isTotalTimeExpired, isPaused, modelSet.questions, settings.soundEffects]);

  // Per-Question Timer countdown & Auto-Lock (pauses when isPaused is true)
  useEffect(() => {
    if (!enableQuestionTimer || isTotalTimeExpired || isPaused) return;

    const qId = currentQuestion.id;
    // If this question is already answered or already locked, do not countdown
    if (userAnswers[qId] !== undefined || lockedQuestions[qId]) {
      return;
    }

    const qTimer = setInterval(() => {
      setQuestionSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(qTimer);
          // Time expired for this question without answering: Lock this question!
          setLockedQuestions((prevLocked) => ({
            ...prevLocked,
            [qId]: true,
          }));

          if (settings.soundEffects) {
            soundManager.playLockAlert();
          }

          setLockedToast(`প্রশ্ন #${qId} এর সময় শেষ! প্রশ্নটি লক হয়ে গেছে।`);
          setTimeout(() => setLockedToast(null), 3500);

          // Auto-scroll / advance to next question after notice
          if (currentIdx < totalQuestions - 1) {
            setTimeout(() => {
              setCurrentIdx((curr) => {
                if (curr < totalQuestions - 1) return curr + 1;
                return curr;
              });
              questionCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1200);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(qTimer);
  }, [
    currentIdx,
    currentQuestion.id,
    enableQuestionTimer,
    isTotalTimeExpired,
    isPaused,
    lockedQuestions,
    settings.questionTimeSeconds,
    settings.soundEffects,
    totalQuestions,
    userAnswers,
  ]);

  // Optional speech read-out of current question
  const readCurrentQuestion = useCallback(() => {
    if (!currentQuestion) return;
    setIsReadingAloud(true);

    const optionsText = `Option A: ${currentQuestion.options.A}. Option B: ${currentQuestion.options.B}. Option C: ${currentQuestion.options.C}. Option D: ${currentQuestion.options.D}.`;
    const fullText = `Question ${currentIdx + 1}: ${currentQuestion.question}. ${optionsText}`;

    speechManager.speak(
      fullText,
      {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
        volume: settings.speechVolume,
      },
      () => setIsReadingAloud(false),
      () => setIsReadingAloud(false)
    );
  }, [currentIdx, currentQuestion, settings.speechPitch, settings.speechRate, settings.speechVolume]);

  const stopReading = useCallback(() => {
    speechManager.stop();
    setIsReadingAloud(false);
    setIsReadingExplanation(false);
  }, []);

  const toggleExplanation = useCallback(() => {
    setShowExplanation((prev) => !prev);
    if (settings.soundEffects) soundManager.playClick();
  }, [settings.soundEffects]);

  const readExplanationAloud = useCallback(() => {
    if (!settings.enableSpeech || !currentQuestion) return;
    if (isReadingExplanation) {
      speechManager.stop();
      setIsReadingExplanation(false);
      return;
    }
    speechManager.stop();
    setIsReadingAloud(false);
    setIsReadingExplanation(true);

    const textToRead = `Question ${currentQuestion.id}. Topic: ${currentQuestion.topic}. The correct answer is option ${currentQuestion.correctAnswer}: ${currentQuestion.options[currentQuestion.correctAnswer]}. Explanation: ${currentQuestion.explanation}`;
    speechManager.speak(
      textToRead,
      {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
        volume: settings.speechVolume,
      },
      () => setIsReadingExplanation(false),
      () => setIsReadingExplanation(false)
    );
  }, [currentQuestion, isReadingExplanation, settings.enableSpeech, settings.speechPitch, settings.speechRate, settings.speechVolume]);

  // Option selection with sound effect and automatic scroll to next question
  const handleSelectOption = useCallback((opt: 'A' | 'B' | 'C' | 'D') => {
    // If paused, locked or total time expired, do not allow answering
    if (isPaused || lockedQuestions[currentQuestion.id] || isTotalTimeExpired) {
      return;
    }

    // 1. Play sound when option is selected (as requested)
    if (settings.soundEffects) {
      soundManager.playOptionSelect();
    }

    // 2. Set answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: opt,
    }));

    // 3. Automatic scroll / advance to next question (as requested)
    if (settings.autoAdvanceOnAnswer ?? true) {
      setTimeout(() => {
        if (currentIdx < totalQuestions - 1) {
          setCurrentIdx((curr) => curr + 1);
          questionCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          // Reached the last question: bring Check Answer button into view
          checkAnswerBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 420);
    }
  }, [currentIdx, currentQuestion.id, isPaused, isTotalTimeExpired, lockedQuestions, settings.autoAdvanceOnAnswer, settings.soundEffects, totalQuestions]);

  const handleFinalSubmit = useCallback(() => {
    stopReading();
    onCheckAnswer(userAnswers, timeSpentSeconds);
  }, [onCheckAnswer, stopReading, timeSpentSeconds, userAnswers]);

  // Adjust timers functions directly from the header
  const addTotalMinutes = useCallback((minutes: number) => {
    setTotalSecondsLeft((prev) => Math.max(60, prev + minutes * 60));
    if (onUpdateSettings) {
      onUpdateSettings({ totalTimeMinutes: Math.max(2, settings.totalTimeMinutes + minutes) });
    }
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.soundEffects, settings.totalTimeMinutes]);

  const addQuestionSeconds = useCallback((seconds: number) => {
    setQuestionSecondsLeft((prev) => Math.max(10, prev + seconds));
    if (onUpdateSettings) {
      onUpdateSettings({ questionTimeSeconds: Math.max(10, settings.questionTimeSeconds + seconds) });
    }
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.questionTimeSeconds, settings.soundEffects]);

  const toggleTotalTimer = useCallback(() => {
    setEnableTotalTimer((prev) => {
      const nextVal = !prev;
      if (onUpdateSettings) {
        onUpdateSettings({ enableTotalTimer: nextVal });
      }
      return nextVal;
    });
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.soundEffects]);

  const toggleQuestionTimer = useCallback(() => {
    setEnableQuestionTimer((prev) => {
      const nextVal = !prev;
      if (onUpdateSettings) {
        onUpdateSettings({ enableQuestionTimer: nextVal });
      }
      return nextVal;
    });
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.soundEffects]);

  const handleJumpQuestion = useCallback((idx: number) => {
    stopReading();
    setCurrentIdx(idx);
    if (settings.soundEffects) soundManager.playClick();
  }, [settings.soundEffects, stopReading]);

  const handlePrevQuestion = useCallback(() => {
    stopReading();
    setCurrentIdx((i) => Math.max(0, i - 1));
    if (settings.soundEffects) soundManager.playClick();
  }, [settings.soundEffects, stopReading]);

  const handleNextQuestion = useCallback(() => {
    stopReading();
    setCurrentIdx((i) => Math.min(totalQuestions - 1, i + 1));
    if (settings.soundEffects) soundManager.playClick();
  }, [settings.soundEffects, stopReading, totalQuestions]);

  const handleClearSelection = useCallback(() => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
    if (settings.soundEffects) soundManager.playClick();
  }, [currentQuestion.id, settings.soundEffects]);

  // Voice Command hook for answering questions by voice
  const voiceQuiz = useVoiceQuiz({
    currentOptions: currentQuestion?.options,
    disabled: isPaused || isReadingAloud || isReadingExplanation || isCurrentQuestionLocked,
    onSelectChoice: (choice) => {
      if (settings.soundEffects) {
        soundManager.playVoiceChoiceDetected();
      }
      handleSelectOption(choice);
    },
    onCommand: (cmd) => {
      if (cmd === 'next') {
        handleNextQuestion();
      } else if (cmd === 'previous') {
        handlePrevQuestion();
      } else if (cmd === 'read_question') {
        readCurrentQuestion();
      } else if (cmd === 'stop_listening') {
        voiceQuiz.stopListening();
      }
    },
  });

  const handleToggleVoice = useCallback(() => {
    if (isPaused || isCurrentQuestionLocked) return;
    if (!voiceQuiz.isSupported) {
      alert('Speech recognition is not supported in this browser. Please try Google Chrome, Microsoft Edge, or Safari.');
      return;
    }
    if (settings.soundEffects && !voiceQuiz.isListening) {
      soundManager.playVoiceMicOn();
    }
    voiceQuiz.toggleListening();
  }, [isCurrentQuestionLocked, isPaused, settings.soundEffects, voiceQuiz]);

  // Keyboard shortcut: Press 'v' or 'V' to toggle voice microphone, 'p' or 'P' to pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if ((e.key === 'v' || e.key === 'V') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleToggleVoice();
      } else if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleVoice, togglePause]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-slate-100 z-10">
      {/* Top Notification Toast for Locks */}
      <AnimatePresence>
        {lockedToast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-rose-950/95 border-2 border-rose-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(244,63,94,0.6)] flex items-center gap-3 backdrop-blur-xl"
          >
            <Lock className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{lockedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <header className={`relative z-30 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 backdrop-blur-xl border-b flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 transition-colors duration-500 ${activeTheme.headerBgClass}`}>
          {/* Left: Back & Model Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="quiz-back-to-dashboard-btn"
              onClick={() => {
                voiceQuiz.stopListening();
                stopReading();
                onExitQuiz();
              }}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition shrink-0 cursor-pointer"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-xs xs:text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-1.5 sm:gap-2">
                <span className="truncate max-w-[130px] xs:max-w-[200px] sm:max-w-none">{modelSet.title}</span>
                <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shrink-0">
                  25 MCQs
                </span>
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[180px] xs:max-w-[260px] sm:max-w-none">
                Candidate: <strong className="text-cyan-300">{studentProfile.name}</strong> (Roll: {studentProfile.roll})
              </p>
            </div>
          </div>

          {/* Center / Right: Interactive Timers (Total Time & Per-MCQ Time) + Settings + Clock */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 ml-auto">
            {/* 1. Total 25 Questions Timer Capsule */}
            <TotalTimerCapsule
              enableTotalTimer={enableTotalTimer}
              isTotalTimeExpired={isTotalTimeExpired}
              totalSecondsLeft={totalSecondsLeft}
              onToggle={toggleTotalTimer}
              onAdjustMinutes={addTotalMinutes}
            />

            {/* 2. Per-MCQ Timer Capsule */}
            <QuestionTimerCapsule
              enableQuestionTimer={enableQuestionTimer}
              isCurrentQuestionLocked={isCurrentQuestionLocked}
              questionSecondsLeft={questionSecondsLeft}
              onToggle={toggleQuestionTimer}
              onAdjustSeconds={addQuestionSeconds}
            />

            {/* Voice Mode Header Quick Toggle Button */}
            <button
              id="quiz-header-voice-btn"
              type="button"
              disabled={isPaused || isCurrentQuestionLocked}
              onClick={handleToggleVoice}
              className={`flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
                isPaused || isCurrentQuestionLocked
                  ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                  : voiceQuiz.isListening
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400/60'
              }`}
              title={
                voiceQuiz.isListening
                  ? 'Voice Answers Active: Speak Option A/B/C/D (Click to stop)'
                  : 'Enable Voice Answers: Speak Option A/B/C/D to select'
              }
            >
              <Mic
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  voiceQuiz.isListening ? 'text-cyan-300 animate-bounce' : 'text-slate-400'
                }`}
              />
              <span className="hidden lg:inline">{voiceQuiz.isListening ? 'Voice: On' : 'Voice Mode'}</span>
            </button>

            {/* Focus Mode Header Button */}
            <button
              id="quiz-focus-mode-btn"
              type="button"
              onClick={toggleFocusMode}
              className={`flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
                isFocusMode
                  ? 'bg-purple-500/25 border-purple-400 text-purple-200 ring-2 ring-purple-400/40'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-purple-400/60'
              }`}
              title="Focus Mode: Hide header and navigation to maximize screen space for questions (Press F)"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              <span className="hidden sm:inline">Focus Mode</span>
            </button>

            {/* Pause / Resume Button (Academic Integrity Protection) */}
            <button
              id="quiz-pause-toggle-btn"
              type="button"
              onClick={togglePause}
              className={`flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
                isPaused
                  ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-amber-400/60'
              }`}
              title={isPaused ? 'Resume Quiz Timer' : 'Pause Quiz (Academic Integrity Guard)'}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 fill-emerald-400" />
              ) : (
                <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              )}
              <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            {/* Explanation Quick Toggle Button */}
            <button
              type="button"
              onClick={toggleExplanation}
              className={`flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
                showExplanation || settings.showExplanationInQuiz
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-amber-400/60'
              }`}
              title="Toggle grammar explanations in quiz"
            >
              <Lightbulb className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${showExplanation || settings.showExplanationInQuiz ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <span className="hidden md:inline">
                {showExplanation || settings.showExplanationInQuiz ? 'Explanation On' : 'Explanation'}
              </span>
            </button>

            {/* Settings Quick Access Button */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
              title="Open Settings to adjust time or toggle options"
            >
              <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="hidden md:inline">Settings</span>
            </button>

            {/* Digital Clock */}
            <HeaderClock />
          </div>
        </header>
      )}

      {/* Floating Focus Mode Bar (Visible ONLY in Focus Mode to maximize screen space) */}
      {isFocusMode && (
        <motion.div
          id="quiz-focus-mode-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 px-3 sm:px-6 py-2 bg-slate-950/95 backdrop-blur-xl border-b border-purple-500/30 flex items-center justify-between gap-3 shadow-lg"
        >
          {/* Left: Minimal Focus Label & Question Indicator */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" /> Focus Mode
            </span>
            <span className="text-xs font-bold text-white hidden sm:inline truncate max-w-[200px]">
              {modelSet.title}
            </span>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-lg">
              Q {currentIdx + 1} / {totalQuestions}
            </span>
          </div>

          {/* Center / Right: Minimal Timers & Exit Focus Button */}
          <div className="flex items-center gap-2">
            {enableTotalTimer && (
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-lg border font-bold flex items-center gap-1 ${
                  totalSecondsLeft < 120
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 animate-pulse'
                    : 'bg-slate-900 border-slate-700 text-cyan-300'
                }`}
                title="Total time left"
              >
                <Clock className="w-3 h-3 text-cyan-400" />
                {Math.floor(totalSecondsLeft / 60)}:{String(totalSecondsLeft % 60).padStart(2, '0')}
              </span>
            )}

            {enableQuestionTimer && !isCurrentQuestionLocked && (
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-lg border font-bold flex items-center gap-1 ${
                  questionSecondsLeft <= 10
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 animate-pulse'
                    : 'bg-slate-900 border-slate-700 text-emerald-300'
                }`}
                title="Per-question time left"
              >
                <Timer className="w-3 h-3 text-emerald-400" />
                {questionSecondsLeft}s
              </span>
            )}

            {/* Voice Mode Quick Pill in Focus Bar */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-1 sm:px-2 sm:py-0.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 cursor-pointer transition ${
                voiceQuiz.isListening
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Toggle voice answers"
            >
              <Mic className="w-3 h-3" />
              <span className="hidden md:inline">{voiceQuiz.isListening ? 'Voice On' : 'Voice'}</span>
            </button>

            {/* Exit Focus Mode Button */}
            <button
              id="quiz-exit-focus-mode-btn"
              type="button"
              onClick={toggleFocusMode}
              className="px-2.5 py-1 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/60 text-purple-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Exit Focus Mode (Press F or Esc)"
            >
              <Minimize2 className="w-3.5 h-3.5 text-purple-300" />
              <span>Exit Focus</span>
              <span className="hidden sm:inline text-[10px] opacity-70 font-mono">[F]</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Quiz Body - Maximize space in Focus Mode */}
      <main
        className={`relative z-20 flex-1 w-full mx-auto px-4 sm:px-6 flex flex-col justify-between transition-all duration-300 ${
          isFocusMode ? 'max-w-4xl py-3 sm:py-5' : 'max-w-5xl py-6'
        } ${isPaused ? 'filter blur-md select-none pointer-events-none' : ''}`}
      >
        {/* Total Time Expired Top Banner (Required when 25-question total time runs out) */}
        {isTotalTimeExpired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4.5 rounded-3xl bg-gradient-to-r from-amber-950 via-rose-950 to-slate-950 border-2 border-amber-400 text-amber-100 shadow-[0_0_40px_rgba(245,158,11,0.45)] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-white text-base sm:text-lg flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  ২৫টি কুইজের নির্ধারিত সময় সমাপ্ত হয়েছে! (Quiz Locked)
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed mt-0.5">
                  উত্তর দেওয়ার সময় শেষ হয়ে গেছে এবং সব প্রশ্ন লক করা হয়েছে। ফলাফল ও মার্কস দেখতে এখনই &apos;Check Answer&apos; বাটনে ক্লিক করুন।
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-sm hover:brightness-110 shadow-lg shadow-amber-400/40 transition shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check Answer Now</span>
            </button>
          </motion.div>
        )}

        {/* Progress Bar & Question Counter */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono font-bold text-sm">
                Question {currentIdx + 1}
              </span>
              <span className="text-slate-500">of {totalQuestions}</span>
            </span>

            <div className="flex items-center gap-2">
              {isCurrentQuestionLocked && (
                <span className="text-xs text-amber-300 font-bold bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  Locked
                </span>
              )}
              <span className="text-xs text-emerald-400 font-medium bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {answeredCount} / {totalQuestions} Answered
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500"
              initial={false}
              animate={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div ref={questionCardRef} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl sm:rounded-3xl backdrop-blur-2xl border p-4 sm:p-7 md:p-8 relative transition-all duration-500 ${activeTheme.quizCardBgClass} ${
                isCurrentQuestionLocked
                  ? 'border-amber-500/50 ring-1 ring-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)]'
                  : ''
              }`}
            >
              {/* Question Header & Status */}
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                    <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                      Q #{currentQuestion.id}
                    </span>

                    {currentQuestion.category && (
                      <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/40 text-[11px] sm:text-xs font-bold">
                        {currentQuestion.category}
                      </span>
                    )}

                    {/* Locked Status Badge */}
                    {isCurrentQuestionLocked && (
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] sm:text-xs font-bold animate-pulse">
                        <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                        <span>
                          {isTotalTimeExpired
                            ? 'সময় শেষ - সব প্রশ্ন লক করা হয়েছে'
                            : 'সময় শেষ - এই প্রশ্নটি লক হয়ে গেছে'}
                        </span>
                      </span>
                    )}

                    {/* Per Question Countdown indicator */}
                    {!isCurrentQuestionLocked && enableQuestionTimer && (
                      <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] sm:text-xs font-mono font-bold">
                        <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                        <span>{questionSecondsLeft}s left</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed tracking-tight">
                    {isPaused ? (
                      <span className="inline-flex items-center gap-2 text-amber-300 font-mono tracking-wider">
                        <EyeOff className="w-5 h-5 text-amber-400 shrink-0" />
                        [Question Concealed — Academic Integrity Active]
                      </span>
                    ) : (
                      currentQuestion.question
                    )}
                  </h3>
                </div>

                {/* Action Buttons: Voice Commands Microphone + Read Aloud */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {/* Microphone Voice Command Button */}
                  <button
                    id="quiz-voice-mic-btn"
                    type="button"
                    disabled={isPaused || isCurrentQuestionLocked}
                    onClick={handleToggleVoice}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition shrink-0 cursor-pointer relative ${
                      isPaused || isCurrentQuestionLocked
                        ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                        : voiceQuiz.isListening
                        ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 hover:bg-slate-850'
                    }`}
                    title={
                      voiceQuiz.isListening
                        ? "Voice commands active: Listening for 'Option A', 'B', 'C', or 'D' (Click to stop)"
                        : "Answer by Voice: Click to speak 'Option A', 'B', 'C', or 'D'"
                    }
                  >
                    {voiceQuiz.isListening ? (
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 animate-bounce" />
                    ) : (
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    {voiceQuiz.isListening && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
                    )}
                  </button>

                  {/* Read Aloud Button for Question */}
                  <button
                    id="quiz-read-aloud-btn"
                    type="button"
                    disabled={isPaused}
                    onClick={isReadingAloud ? stopReading : readCurrentQuestion}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition shrink-0 cursor-pointer ${
                      isPaused
                        ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                        : isReadingAloud
                        ? 'bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse'
                        : 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400 hover:bg-slate-800'
                    }`}
                    title={isReadingAloud ? 'Stop reading' : 'Read question aloud'}
                  >
                    {isReadingAloud ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {/* Realtime Voice Command Feedback & Listening Banner */}
              <VoiceCommandPill
                isListening={voiceQuiz.isListening}
                isSupported={voiceQuiz.isSupported}
                status={voiceQuiz.status}
                transcript={voiceQuiz.transcript}
                interimTranscript={voiceQuiz.interimTranscript}
                lastRecognizedChoice={voiceQuiz.lastRecognizedChoice}
                lastMatchedPhrase={voiceQuiz.lastMatchedPhrase}
                errorMessage={voiceQuiz.errorMessage}
                onToggle={handleToggleVoice}
                onCloseError={voiceQuiz.clearFeedback}
              />

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 mt-3 sm:mt-4">
                {(['A', 'B', 'C', 'D'] as const).map((optKey) => (
                  <QuizOptionButton
                    key={optKey}
                    optKey={optKey}
                    label={isPaused ? '••••••••••••••••' : currentQuestion.options[optKey]}
                    isSelected={userAnswers[currentQuestion.id] === optKey}
                    isLocked={isCurrentQuestionLocked || isPaused}
                    onSelect={handleSelectOption}
                  />
                ))}
              </div>

              {/* Question Action & Explanation Bar */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={toggleExplanation}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    showExplanation || settings.showExplanationInQuiz
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                      : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:border-amber-400/80 hover:text-amber-200'
                  }`}
                  title="Toggle grammar explanation and answer rule"
                >
                  <Lightbulb className={`w-4 h-4 ${showExplanation || settings.showExplanationInQuiz ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                  <span>{showExplanation || settings.showExplanationInQuiz ? 'Hide Explanation' : 'View Explanation & Rule'}</span>
                </button>

                {/* Clear selection for this question (if unlocked) */}
                {userAnswers[currentQuestion.id] && !isCurrentQuestionLocked && (
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="text-xs text-slate-400 hover:text-rose-400 underline transition cursor-pointer"
                  >
                    Clear Selection
                  </button>
                )}
              </div>

              {/* Explanations Card for Current Question */}
              <AnimatePresence>
                {(showExplanation || settings.showExplanationInQuiz) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.12)]">
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 text-[11px] font-bold border border-cyan-500/30">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Topic: {currentQuestion.topic}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Correct: {currentQuestion.correctAnswer} - {currentQuestion.options[currentQuestion.correctAnswer]}</span>
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={readExplanationAloud}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                            isReadingExplanation
                              ? 'bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse'
                              : 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400 hover:bg-slate-850'
                          }`}
                          title="Listen to explanation aloud"
                        >
                          {isReadingExplanation ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                              <span>Stop Audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Listen Audio</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="mt-3 flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0 mt-0.5">
                          <Lightbulb className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-1">
                            Grammar Rule & Detailed Explanation
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation & Check Answer Action */}
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Prev & Next Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={handlePrevQuestion}
                className="flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 disabled:opacity-40 hover:border-cyan-400 text-xs font-bold transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                disabled={currentIdx === totalQuestions - 1}
                onClick={handleNextQuestion}
                className="flex-1 sm:flex-initial min-h-[44px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 disabled:opacity-40 hover:border-cyan-400 text-xs font-bold transition cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Prominent CHECK ANSWER Button (Active and emphasized) */}
            <button
              id="check-answer-btn"
              ref={checkAnswerBtnRef}
              type="button"
              onClick={() => {
                if (isTotalTimeExpired) {
                  // Direct final submit if total time has expired
                  handleFinalSubmit();
                } else if (answeredCount < totalQuestions) {
                  setShowConfirmSubmit(true);
                } else {
                  handleFinalSubmit();
                }
              }}
              className={`w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isTotalTimeExpired
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-[0_0_35px_rgba(245,158,11,0.6)] ring-4 ring-amber-400/50 hover:brightness-110 active:scale-[0.98] animate-bounce'
                  : 'bg-gradient-to-r from-teal-400 via-cyan-400 to-amber-300 text-slate-950 shadow-[0_4px_25px_rgba(34,211,238,0.4)] hover:shadow-[0_6px_30px_rgba(34,211,238,0.6)] hover:brightness-110 active:scale-[0.98]'
              }`}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 shrink-0" />
              <span>
                {isTotalTimeExpired
                  ? 'Check Answer (সময় সমাপ্ত - ফলাফল দেখুন)'
                  : `Check Answer (${answeredCount}/${totalQuestions})`}
              </span>
            </button>
          </div>

          {/* 25 Question Jumping Palette (Hidden in Focus Mode to maximize screen space) */}
          {!isFocusMode && (
            <QuestionPalette
              questions={modelSet.questions}
              currentIdx={currentIdx}
              userAnswers={userAnswers}
              lockedQuestions={lockedQuestions}
              isTotalTimeExpired={isTotalTimeExpired}
              onJump={handleJumpQuestion}
            />
          )}
        </div>
      </main>

      {/* Academic Integrity Pause Overlay Modal */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            id="academic-integrity-pause-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md sm:max-w-lg rounded-3xl bg-[#0F172A]/95 border-2 border-amber-500/60 p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.35)] text-center relative overflow-hidden"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex p-3.5 sm:p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] mb-4">
                <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 animate-pulse" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-2">
                {pauseReason === 'tab_switch' ? 'Tab Switch / Defocus Detected' : 'Academic Integrity Pause Guard'}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Quiz Timer Paused
              </h3>
              <p className="text-xs text-amber-300/90 font-medium mt-1">
                অ্যাকাডেমিক সততা নিশ্চিতকরণে কুইজ ও প্রশ্ন সাময়িকভাবে স্থগিত
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left my-5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">
                      {pauseReason === 'tab_switch'
                        ? 'You navigated away from the quiz tab.'
                        : 'Quiz timer paused by candidate.'}
                    </strong>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      To maintain test fairness and academic integrity, timers are frozen and question content is blurred & concealed while inactive.
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Total 25-MCQ Time Left:</span>
                  <span className="text-cyan-300 font-bold">
                    {enableTotalTimer
                      ? `${Math.floor(totalSecondsLeft / 60)}m ${totalSecondsLeft % 60}s`
                      : 'Timer Off'}
                  </span>
                </div>
                {enableQuestionTimer && (
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Per-Question Time Left:</span>
                    <span className="text-emerald-300 font-bold">{questionSecondsLeft}s</span>
                  </div>
                )}
              </div>

              <button
                id="quiz-resume-btn"
                type="button"
                onClick={handleResume}
                className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm sm:text-base hover:brightness-110 active:scale-[0.99] transition shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950" />
                <span>Resume Quiz & Unblur Questions</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal if incomplete submit */}
      <ConfirmSubmitModal
        isOpen={showConfirmSubmit}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        onCancel={() => setShowConfirmSubmit(false)}
        onConfirm={() => {
          setShowConfirmSubmit(false);
          handleFinalSubmit();
        }}
      />
    </div>
  );
};

export const QuizView = React.memo(QuizViewComponent);
