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
  Flag,
  Type,
  RotateCcw,
  SlidersHorizontal,
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
  optionFontSize: number;
  onSelect: (opt: 'A' | 'B' | 'C' | 'D') => void;
}

// Memoized individual option button to prevent re-rendering options when timers tick
const QuizOptionButton = React.memo<QuizOptionButtonProps>(({
  optKey,
  label,
  isSelected,
  isLocked,
  optionFontSize,
  onSelect,
}) => {
  const handleClick = useCallback(() => {
    if (!isLocked) {
      onSelect(optKey);
    }
  }, [isLocked, onSelect, optKey]);

  const keyBadgeSize = Math.max(28, Math.round(optionFontSize * 1.9));

  return (
    <button
      type="button"
      disabled={isLocked}
      onClick={handleClick}
      className={`text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-center gap-2.5 sm:gap-3.5 min-h-[48px] sm:min-h-[54px] group min-w-0 ${
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
        style={{
          fontSize: `${optionFontSize}px`,
          minWidth: `${keyBadgeSize}px`,
          minHeight: `${keyBadgeSize}px`,
        }}
        className={`px-1.5 rounded-lg sm:rounded-xl flex items-center justify-center font-black shrink-0 transition leading-none ${
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
      <span
        style={{ fontSize: `${optionFontSize}px` }}
        className="font-medium leading-snug flex-1 min-w-0 break-words"
      >
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
  flaggedQuestions: Record<number, boolean>;
  isTotalTimeExpired: boolean;
  onJump: (idx: number) => void;
  onJumpNextFlagged: () => void;
}

// Memoized Question Palette - avoids re-rendering 25 buttons on every 1-second timer tick
const QuestionPalette = React.memo<QuestionPaletteProps>(({
  questions,
  currentIdx,
  userAnswers,
  lockedQuestions,
  flaggedQuestions,
  isTotalTimeExpired,
  onJump,
  onJumpNextFlagged,
}) => {
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'flagged' | 'unanswered'>('all');

  const flaggedCount = questions.filter((q) => flaggedQuestions[q.id]).length;
  const unansweredCount = questions.filter((q) => userAnswers[q.id] === undefined).length;

  const visibleItems = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => {
      if (paletteFilter === 'flagged') return !!flaggedQuestions[q.id];
      if (paletteFilter === 'unanswered') return userAnswers[q.id] === undefined;
      return true;
    });

  return (
    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0F172A]/85 border border-blue-500/25 space-y-3">
      <div className="text-xs font-bold text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span>Question Palette:</span>
          <div className="flex items-center gap-1 bg-slate-950/70 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setPaletteFilter('all')}
              className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
                paletteFilter === 'all' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setPaletteFilter('flagged')}
              className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                paletteFilter === 'flagged' ? 'bg-amber-400 text-slate-950' : 'text-amber-300 hover:bg-amber-500/15'
              }`}
            >
              <Flag className="w-2.5 h-2.5" />
              Flagged ({flaggedCount})
            </button>
            <button
              type="button"
              onClick={() => setPaletteFilter('unanswered')}
              className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
                paletteFilter === 'unanswered' ? 'bg-slate-200 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Unanswered ({unansweredCount})
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Answered
          </span>
          <span className="text-amber-300 flex items-center gap-1">
            <Flag className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            Flagged
          </span>
          <span className="text-rose-400 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5 text-rose-400" />
            Locked
          </span>
          {flaggedCount > 0 && (
            <button
              type="button"
              onClick={onJumpNextFlagged}
              className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 font-bold transition cursor-pointer"
            >
              Next Flagged →
            </button>
          )}
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <div className="text-center py-3 text-xs text-slate-400">
          {paletteFilter === 'flagged'
            ? 'No flagged questions yet. Use the Flag button on any question to mark it for review.'
            : 'All questions have been answered!'}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
          {visibleItems.map(({ q, idx }) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;
            const isLocked = lockedQuestions[q.id] || isTotalTimeExpired;
            const isFlagged = !!flaggedQuestions[q.id];

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onJump(idx)}
                className={`min-w-[36px] min-h-[36px] sm:w-9 sm:h-9 rounded-lg sm:rounded-xl font-mono text-xs font-bold transition flex items-center justify-center relative cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 bg-cyan-500 text-slate-950 font-black'
                    : isFlagged && isAnswered
                    ? 'bg-emerald-500/25 border-2 border-amber-400 text-emerald-200 hover:bg-emerald-500/40'
                    : isFlagged
                    ? 'bg-amber-500/25 border border-amber-400 text-amber-200 hover:bg-amber-500/35'
                    : isAnswered
                    ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/40'
                    : isLocked
                    ? 'bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/40'
                    : 'bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
                title={`Q#${idx + 1}${isFlagged ? ' (Flagged)' : ''}${isAnswered ? ' (Answered)' : ''}`}
              >
                {idx + 1}
                {isFlagged && (
                  <Flag className="w-2.5 h-2.5 text-amber-300 fill-amber-400 absolute -top-1 -right-1 drop-shadow" />
                )}
                {!isFlagged && isLocked && !isAnswered && (
                  <Lock className="w-2.5 h-2.5 text-rose-400 absolute -top-1 -right-1" />
                )}
              </button>
            );
          })}
        </div>
      )}
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
  flaggedCount: number;
  totalQuestions: number;
  onCancel: () => void;
  onReviewFlagged: () => void;
  onConfirm: () => void;
}

const ConfirmSubmitModal = React.memo<ConfirmSubmitModalProps>(({
  isOpen,
  answeredCount,
  flaggedCount,
  totalQuestions,
  onCancel,
  onReviewFlagged,
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
            className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 p-5 sm:p-7 shadow-[0_0_40px_rgba(245,158,11,0.3)] text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Review Before Submitting</h3>
                <p className="text-xs text-amber-300">
                  Answered {answeredCount} of {totalQuestions} MCQs
                  {flaggedCount > 0 ? ` • ${flaggedCount} Flagged` : ''}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm text-slate-300 mb-6 leading-relaxed">
              {totalQuestions - answeredCount > 0 && (
                <p>
                  You still have <strong>{totalQuestions - answeredCount} unanswered</strong> questions.
                </p>
              )}
              {flaggedCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs flex items-center gap-2">
                  <Flag className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                  <span>
                    You have <strong>{flaggedCount} flagged</strong> {flaggedCount === 1 ? 'question' : 'questions'} marked for review.
                  </span>
                </div>
              )}
              <p className="text-xs text-slate-400">
                Submit now to calculate your net score, negative marking breakdown, and review all answers.
              </p>
            </div>

            <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onCancel}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
              >
                Continue Quiz
              </button>
              {flaggedCount > 0 && (
                <button
                  type="button"
                  onClick={onReviewFlagged}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/60 text-amber-200 hover:bg-amber-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Flag className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  Review Flagged ({flaggedCount})
                </button>
              )}
              <button
                type="button"
                onClick={onConfirm}
                className="min-h-[42px] px-5 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 text-xs font-black hover:brightness-110 transition shadow-md shadow-cyan-500/30 cursor-pointer"
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
  onCheckAnswer: (
    answers: Record<number, 'A' | 'B' | 'C' | 'D'>,
    timeSpentSeconds: number,
    flaggedQuestionIds?: number[]
  ) => void;
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
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Live toolbar panels
  const [showLiveTimePanel, setShowLiveTimePanel] = useState(false);
  const [showFontPanel, setShowFontPanel] = useState(false);

  // Local fallback font sizes synced with settings
  const [localQuestionFontSize, setLocalQuestionFontSize] = useState(settings.questionFontSize || 18);
  const [localOptionFontSize, setLocalOptionFontSize] = useState(settings.optionFontSize || 15);

  useEffect(() => {
    setLocalQuestionFontSize(settings.questionFontSize || 18);
  }, [settings.questionFontSize]);

  useEffect(() => {
    setLocalOptionFontSize(settings.optionFontSize || 15);
  }, [settings.optionFontSize]);

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
  const [totalInitialSeconds, setTotalInitialSeconds] = useState(settings.totalTimeMinutes * 60);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(settings.totalTimeMinutes * 60);

  const [enableQuestionTimer, setEnableQuestionTimer] = useState(settings.enableQuestionTimer);
  const [questionInitialSeconds, setQuestionInitialSeconds] = useState(settings.questionTimeSeconds);
  const [questionSecondsLeft, setQuestionSecondsLeft] = useState(settings.questionTimeSeconds);

  // Live time input drafts for the Live Time Setting panel
  const [liveTotalMinDraft, setLiveTotalMinDraft] = useState(String(settings.totalTimeMinutes));
  const [livePerSecDraft, setLivePerSecDraft] = useState(String(settings.questionTimeSeconds));

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
  const flaggedIds = useMemo(
    () =>
      Object.keys(flaggedQuestions)
        .filter((id) => flaggedQuestions[Number(id)])
        .map(Number),
    [flaggedQuestions]
  );
  const flaggedCount = flaggedIds.length;
  const isCurrentQuestionFlagged = !!flaggedQuestions[currentQuestion?.id];
  const lockedUnansweredCount = useMemo(
    () => modelSet.questions.filter((q) => lockedQuestions[q.id] && userAnswers[q.id] === undefined).length,
    [lockedQuestions, modelSet.questions, userAnswers]
  );
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
    setLiveTotalMinDraft(String(settings.totalTimeMinutes));
  }, [settings.totalTimeMinutes]);

  useEffect(() => {
    setLivePerSecDraft(String(settings.questionTimeSeconds));
    setQuestionInitialSeconds(settings.questionTimeSeconds);
  }, [settings.questionTimeSeconds]);

  useEffect(() => {
    if (!lockedQuestions[currentQuestion?.id] && !isTotalTimeExpired) {
      setQuestionSecondsLeft(settings.questionTimeSeconds);
      setQuestionInitialSeconds(settings.questionTimeSeconds);
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
    onCheckAnswer(userAnswers, timeSpentSeconds, flaggedIds);
  }, [flaggedIds, onCheckAnswer, stopReading, timeSpentSeconds, userAnswers]);

  // Flagging handlers
  const handleToggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlaggedQuestions((prev) => {
      const nextVal = !prev[currentQuestion.id];
      return { ...prev, [currentQuestion.id]: nextVal };
    });
    if (settings.soundEffects) soundManager.playClick();
  }, [currentQuestion, settings.soundEffects]);

  const handleJumpNextFlagged = useCallback(() => {
    if (flaggedCount === 0) return;
    const nextAfter = modelSet.questions.findIndex(
      (q, idx) => idx > currentIdx && flaggedQuestions[q.id]
    );
    const targetIdx =
      nextAfter !== -1
        ? nextAfter
        : modelSet.questions.findIndex((q) => flaggedQuestions[q.id]);
    if (targetIdx !== -1) {
      stopReading();
      setCurrentIdx(targetIdx);
      if (settings.soundEffects) soundManager.playClick();
      questionCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentIdx, flaggedCount, flaggedQuestions, modelSet.questions, settings.soundEffects, stopReading]);

  // Font control handlers
  const adjustQuestionFont = useCallback(
    (delta: number) => {
      setLocalQuestionFontSize((prev) => {
        const next = Math.min(28, Math.max(14, prev + delta));
        if (onUpdateSettings) onUpdateSettings({ questionFontSize: next });
        return next;
      });
      if (settings.soundEffects) soundManager.playClick();
    },
    [onUpdateSettings, settings.soundEffects]
  );

  const adjustOptionFont = useCallback(
    (delta: number) => {
      setLocalOptionFontSize((prev) => {
        const next = Math.min(24, Math.max(12, prev + delta));
        if (onUpdateSettings) onUpdateSettings({ optionFontSize: next });
        return next;
      });
      if (settings.soundEffects) soundManager.playClick();
    },
    [onUpdateSettings, settings.soundEffects]
  );

  const resetQuizFonts = useCallback(() => {
    setLocalQuestionFontSize(18);
    setLocalOptionFontSize(15);
    if (onUpdateSettings) {
      onUpdateSettings({ questionFontSize: 18, optionFontSize: 15 });
    }
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.soundEffects]);

  // Adjust timers functions directly from the header / live panel
  const addTotalMinutes = useCallback((minutes: number) => {
    setTotalSecondsLeft((prev) => {
      const next = Math.max(60, prev + minutes * 60);
      setTotalInitialSeconds((init) => Math.max(init, next));
      return next;
    });
    if (onUpdateSettings) {
      onUpdateSettings({ totalTimeMinutes: Math.max(1, settings.totalTimeMinutes + minutes) });
    }
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.soundEffects, settings.totalTimeMinutes]);

  const applyLiveTotalMinutes = useCallback((mins: number) => {
    const clamped = Math.min(120, Math.max(1, Math.round(mins)));
    const secs = clamped * 60;
    setEnableTotalTimer(true);
    setIsTotalTimeExpired(false);
    setTotalInitialSeconds(secs);
    setTotalSecondsLeft(secs);
    setLiveTotalMinDraft(String(clamped));
    if (onUpdateSettings) {
      onUpdateSettings({ enableTotalTimer: true, totalTimeMinutes: clamped });
    }
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.soundEffects]);

  const addQuestionSeconds = useCallback((seconds: number) => {
    setQuestionSecondsLeft((prev) => {
      const next = Math.max(10, prev + seconds);
      setQuestionInitialSeconds((init) => Math.max(init, next));
      return next;
    });
    if (onUpdateSettings) {
      onUpdateSettings({ questionTimeSeconds: Math.max(10, settings.questionTimeSeconds + seconds) });
    }
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.questionTimeSeconds, settings.soundEffects]);

  const applyLiveQuestionSeconds = useCallback((secs: number) => {
    const clamped = Math.min(180, Math.max(10, Math.round(secs)));
    setEnableQuestionTimer(true);
    setQuestionInitialSeconds(clamped);
    setQuestionSecondsLeft(clamped);
    setLivePerSecDraft(String(clamped));
    if (onUpdateSettings) {
      onUpdateSettings({ enableQuestionTimer: true, questionTimeSeconds: clamped });
    }
    if (settings.soundEffects) soundManager.playClick();
  }, [onUpdateSettings, settings.soundEffects]);

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

  // Keyboard shortcut: Press 'v' to toggle voice mic, 'p' to pause, 'm' to flag question
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
      } else if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleFlag, handleToggleVoice, togglePause]);

  // Live progress bar metrics
  const answeredPct = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const totalTimePct =
    enableTotalTimer && totalInitialSeconds > 0
      ? Math.max(0, Math.min(100, Math.round((totalSecondsLeft / totalInitialSeconds) * 100)))
      : 100;
  const questionTimePct =
    enableQuestionTimer && questionInitialSeconds > 0
      ? Math.max(0, Math.min(100, Math.round((questionSecondsLeft / questionInitialSeconds) * 100)))
      : 100;

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-slate-100 z-10">
      {/* Top Notification Toast for Locks */}
      <AnimatePresence>
        {lockedToast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-rose-950/95 border-2 border-rose-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(244,63,94,0.6)] flex items-center gap-3 backdrop-blur-xl max-w-[92vw]"
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
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              id="quiz-back-to-dashboard-btn"
              onClick={() => {
                voiceQuiz.stopListening();
                stopReading();
                onExitQuiz();
              }}
              className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition shrink-0 flex items-center justify-center cursor-pointer"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <h2 className="text-xs xs:text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-1.5 sm:gap-2">
                <span className="truncate max-w-[140px] xs:max-w-[220px] sm:max-w-none">{modelSet.title}</span>
                <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shrink-0">
                  {totalQuestions} MCQs
                </span>
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[200px] xs:max-w-[300px] sm:max-w-none">
                <strong className="text-cyan-300">{studentProfile.name}</strong> • ID:{' '}
                <span className="font-mono text-amber-300">{studentProfile.userId}</span> (Roll: {studentProfile.roll})
              </p>
            </div>
          </div>

          {/* Center / Right: Interactive Timers, Live Time Setting, Font Control & Actions */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 ml-auto">
            {/* 1. Total Questions Timer Capsule */}
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

            {/* Live Time Setting Toggle Button */}
            <button
              id="quiz-live-time-toggle-btn"
              type="button"
              onClick={() => {
                setShowLiveTimePanel((p) => !p);
                setShowFontPanel(false);
                if (settings.soundEffects) soundManager.playClick();
              }}
              className={`min-h-[36px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
                showLiveTimePanel
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400/50'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400/60'
              }`}
              title="Open Live Time & Negative Marking Controls"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Live Time</span>
            </button>

            {/* Font Size Control Toggle Button */}
            <button
              id="quiz-font-panel-toggle-btn"
              type="button"
              onClick={() => {
                setShowFontPanel((p) => !p);
                setShowLiveTimePanel(false);
                if (settings.soundEffects) soundManager.playClick();
              }}
              className={`min-h-[36px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
                showFontPanel
                  ? 'bg-amber-500/25 border-amber-400 text-amber-200 ring-1 ring-amber-400/50'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-amber-400/60'
              }`}
              title="Adjust Font Size for Question, Key & Distractors"
            >
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Aa Font</span>
            </button>

            {/* Voice Mode Header Quick Toggle Button */}
            <button
              id="quiz-header-voice-btn"
              type="button"
              disabled={isPaused || isCurrentQuestionLocked}
              onClick={handleToggleVoice}
              className={`min-h-[36px] flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
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
              className={`min-h-[36px] flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
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
              className={`min-h-[36px] flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
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
              className={`min-h-[36px] flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
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
              className="min-h-[36px] flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
              title="Open Full Settings Modal"
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

            {/* Font & Live Time Quick Pills in Focus Bar */}
            <button
              type="button"
              onClick={() => {
                setShowFontPanel((p) => !p);
                setShowLiveTimePanel(false);
              }}
              className="px-2 py-1 rounded-lg border border-slate-700 bg-slate-900 text-amber-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              title="Adjust Font Size"
            >
              <Type className="w-3 h-3" />
              <span className="hidden sm:inline">Aa</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowLiveTimePanel((p) => !p);
                setShowFontPanel(false);
              }}
              className="px-2 py-1 rounded-lg border border-slate-700 bg-slate-900 text-cyan-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              title="Live Time Setting"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Time</span>
            </button>

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
        className={`relative z-20 flex-1 w-full mx-auto px-3 sm:px-6 flex flex-col justify-between transition-all duration-300 ${
          isFocusMode ? 'max-w-4xl py-3 sm:py-5' : 'max-w-5xl py-4 sm:py-6'
        } ${isPaused ? 'filter blur-md select-none pointer-events-none' : ''}`}
      >
        {/* Expandable Live Time & Negative Marking Control Panel */}
        <AnimatePresence>
          {showLiveTimePanel && (
            <motion.div
              id="quiz-live-time-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.2)] space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs sm:text-sm font-black text-white">
                      Live Time & Negative Marking Controls (লাইভ টাইম সেটিং)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLiveTimePanel(false)}
                    className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* All-Quiz Total Timer Control */}
                  <div className="p-3 rounded-xl bg-slate-950/75 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Total Quiz Time (Min)
                      </span>
                      <button
                        type="button"
                        onClick={toggleTotalTimer}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black cursor-pointer ${
                          enableTotalTimer
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {enableTotalTimer ? 'ON' : 'OFF'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {[5, 10, 15, 20, 30].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => applyLiveTotalMinutes(m)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                            settings.totalTimeMinutes === m && enableTotalTimer
                              ? 'bg-cyan-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {m}m
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={1}
                        max={120}
                        value={liveTotalMinDraft}
                        onChange={(e) => setLiveTotalMinDraft(e.target.value)}
                        className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                        aria-label="Live total quiz minutes"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const val = parseInt(liveTotalMinDraft, 10);
                          if (!isNaN(val)) applyLiveTotalMinutes(val);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-bold cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Per-Question Timer Control */}
                  <div className="p-3 rounded-xl bg-slate-950/75 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5" /> Per-Question Time (Sec)
                      </span>
                      <button
                        type="button"
                        onClick={toggleQuestionTimer}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black cursor-pointer ${
                          enableQuestionTimer
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {enableQuestionTimer ? 'ON' : 'OFF'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {[15, 30, 45, 60, 90].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => applyLiveQuestionSeconds(s)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                            settings.questionTimeSeconds === s && enableQuestionTimer
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {s}s
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={10}
                        max={180}
                        value={livePerSecDraft}
                        onChange={(e) => setLivePerSecDraft(e.target.value)}
                        className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                        aria-label="Live per-question seconds"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const val = parseInt(livePerSecDraft, 10);
                          if (!isNaN(val)) applyLiveQuestionSeconds(val);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 text-xs font-bold cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Live Negative Marking Setting */}
                  <div className="p-3 rounded-xl bg-slate-950/75 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" /> Negative Marking
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {([0, 0.25, 0.5] as const).map((rate) => {
                        const active = (settings.negativeMarking ?? 0) === rate;
                        return (
                          <button
                            key={rate}
                            type="button"
                            onClick={() => {
                              if (onUpdateSettings) onUpdateSettings({ negativeMarking: rate });
                              if (settings.soundEffects) soundManager.playClick();
                            }}
                            className={`min-h-[38px] px-2 py-1.5 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                              active
                                ? rate === 0
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                                  : 'bg-rose-500 text-white border-rose-400 font-black'
                                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                            }`}
                          >
                            {rate === 0 ? 'Off (0)' : `-${rate.toFixed(2)}`}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Each wrong answer deducts {settings.negativeMarking ? `${settings.negativeMarking.toFixed(2)}` : '0.00'} marks.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expandable Font Size Control Panel */}
        <AnimatePresence>
          {showFontPanel && (
            <motion.div
              id="quiz-font-control-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/95 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.18)] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-amber-400" />
                    <span className="text-xs sm:text-sm font-black text-white">
                      Font Controls — Question, Key & Distractors
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetQuizFonts}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Aa
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowFontPanel(false)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Question Font Control */}
                  <div className="p-3 rounded-xl bg-slate-950/75 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-white">Question Text</div>
                      <div className="text-[11px] font-mono text-cyan-300">{localQuestionFontSize}px</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        id="quiz-q-font-dec"
                        type="button"
                        onClick={() => adjustQuestionFont(-1)}
                        className="min-w-[40px] min-h-[38px] px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-black text-white cursor-pointer"
                      >
                        A-
                      </button>
                      <button
                        id="quiz-q-font-inc"
                        type="button"
                        onClick={() => adjustQuestionFont(1)}
                        className="min-w-[40px] min-h-[38px] px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-black text-cyan-300 cursor-pointer"
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  {/* Key & Distractors Font Control */}
                  <div className="p-3 rounded-xl bg-slate-950/75 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-white">Key (A/B/C/D) & Distractors</div>
                      <div className="text-[11px] font-mono text-amber-300">{localOptionFontSize}px</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        id="quiz-opt-font-dec"
                        type="button"
                        onClick={() => adjustOptionFont(-1)}
                        className="min-w-[40px] min-h-[38px] px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-black text-white cursor-pointer"
                      >
                        A-
                      </button>
                      <button
                        id="quiz-opt-font-inc"
                        type="button"
                        onClick={() => adjustOptionFont(1)}
                        className="min-w-[40px] min-h-[38px] px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-black text-amber-300 cursor-pointer"
                      >
                        A+
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total Time Expired Top Banner (Required when total time runs out) */}
        {isTotalTimeExpired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-5 p-4 rounded-3xl bg-gradient-to-r from-amber-950 via-rose-950 to-slate-950 border-2 border-amber-400 text-amber-100 shadow-[0_0_40px_rgba(245,158,11,0.45)] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-white text-base sm:text-lg flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  কুইজের নির্ধারিত সময় সমাপ্ত হয়েছে! (Quiz Locked)
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed mt-0.5">
                  উত্তর দেওয়ার সময় শেষ হয়ে গেছে এবং সব প্রশ্ন লক করা হয়েছে। ফলাফল ও মার্কস দেখতে এখনই &apos;Check Answer&apos; বাটনে ক্লিক করুন।
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-sm hover:brightness-110 shadow-lg shadow-amber-400/40 transition shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check Answer Now</span>
            </button>
          </motion.div>
        )}

        {/* LIVE QUIZ PROGRESS BAR & REAL-TIME TELEMETRY */}
        <div
          id="live-quiz-progress-bar-panel"
          className="mb-4 sm:mb-5 p-3 sm:p-4 rounded-2xl bg-[#0F172A]/85 border border-cyan-500/25 space-y-2.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-300">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-cyan-300 font-mono font-black text-xs sm:text-sm tabular-nums">
                Q {currentIdx + 1} / {totalQuestions}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold tabular-nums">
                Answered: {answeredCount}/{totalQuestions} ({answeredPct}%)
              </span>
              {flaggedCount > 0 && (
                <button
                  type="button"
                  onClick={handleJumpNextFlagged}
                  className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-200 text-[11px] font-mono font-bold flex items-center gap-1 hover:bg-amber-500/30 transition cursor-pointer tabular-nums"
                  title="Jump to next flagged question"
                >
                  <Flag className="w-3 h-3 text-amber-400 fill-amber-400" />
                  Flagged: {flaggedCount}
                </button>
              )}
              {lockedUnansweredCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] font-mono font-bold tabular-nums">
                  Locked: {lockedUnansweredCount}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
              <span
                className={`px-2 py-0.5 rounded-full border font-bold ${
                  (settings.negativeMarking ?? 0) === 0
                    ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/60 border-rose-500/30 text-rose-300'
                }`}
              >
                Neg: {(settings.negativeMarking ?? 0) === 0 ? 'Off' : `-${settings.negativeMarking.toFixed(2)}`}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 tabular-nums">
                Elapsed: {Math.floor(timeSpentSeconds / 60)}m {timeSpentSeconds % 60}s
              </span>
            </div>
          </div>

          {/* Multi-Segment Completion Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800 flex gap-0.5 p-0.5">
            {modelSet.questions.map((q, idx) => {
              const isAns = userAnswers[q.id] !== undefined;
              const isFlg = !!flaggedQuestions[q.id];
              const isLck = !!lockedQuestions[q.id] && !isAns;
              const isCur = idx === currentIdx;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleJumpQuestion(idx)}
                  aria-label={`Jump to question ${idx + 1}`}
                  className={`flex-1 h-full rounded-full transition-all cursor-pointer ${
                    isCur
                      ? 'bg-cyan-400 ring-1 ring-white'
                      : isFlg
                      ? 'bg-amber-400'
                      : isAns
                      ? 'bg-emerald-400'
                      : isLck
                      ? 'bg-rose-500'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                />
              );
            })}
          </div>

          {/* Live Total & Per-Question Countdown Bars */}
          {(enableTotalTimer || enableQuestionTimer) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              {enableTotalTimer && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Total Quiz Timer</span>
                    <span className={totalTimePct <= 20 ? 'text-rose-300 font-bold' : 'text-cyan-300 font-bold'}>
                      {Math.floor(totalSecondsLeft / 60)}:{String(totalSecondsLeft % 60).padStart(2, '0')} ({totalTimePct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        totalTimePct <= 20
                          ? 'bg-rose-500'
                          : totalTimePct <= 50
                          ? 'bg-amber-400'
                          : 'bg-gradient-to-r from-cyan-400 to-teal-400'
                      }`}
                      style={{ width: `${totalTimePct}%` }}
                    />
                  </div>
                </div>
              )}

              {enableQuestionTimer && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Current Question Timer</span>
                    <span className={questionSecondsLeft <= 10 ? 'text-rose-300 font-bold' : 'text-emerald-300 font-bold'}>
                      {isCurrentQuestionLocked ? 'Locked' : `${questionSecondsLeft}s`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        questionSecondsLeft <= 10
                          ? 'bg-rose-500'
                          : questionTimePct <= 45
                          ? 'bg-amber-400'
                          : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                      }`}
                      style={{ width: `${isCurrentQuestionLocked ? 0 : questionTimePct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
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
                  : isCurrentQuestionFlagged
                  ? 'border-amber-400/70 ring-1 ring-amber-400/30'
                  : ''
              }`}
            >
              {/* Inline Quick Font Controls & Flag Bar inside Question Card */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3.5 border-b border-slate-800/70">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mr-0.5 hidden xs:inline">Font:</span>
                  <div className="inline-flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-0.5">
                    <span className="text-[10px] font-bold text-cyan-300 px-1.5">Q</span>
                    <button
                      type="button"
                      onClick={() => adjustQuestionFont(-1)}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-black text-white cursor-pointer"
                      title="Decrease Question font size"
                    >
                      A-
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustQuestionFont(1)}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-black text-cyan-300 cursor-pointer"
                      title="Increase Question font size"
                    >
                      A+
                    </button>
                  </div>

                  <div className="inline-flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-0.5">
                    <span className="text-[10px] font-bold text-amber-300 px-1.5">Key & Opt</span>
                    <button
                      type="button"
                      onClick={() => adjustOptionFont(-1)}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-black text-white cursor-pointer"
                      title="Decrease Option Key & Distractor font size"
                    >
                      A-
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustOptionFont(1)}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-black text-amber-300 cursor-pointer"
                      title="Increase Option Key & Distractor font size"
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Flag Answer Button (Press M) */}
                <button
                  id="quiz-flag-question-btn"
                  type="button"
                  onClick={handleToggleFlag}
                  className={`min-h-[36px] px-3 py-1 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isCurrentQuestionFlagged
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)] font-black'
                      : 'bg-slate-900 border-slate-700 text-amber-300 hover:border-amber-400 hover:bg-amber-500/10'
                  }`}
                  title="Flag this question/answer for review (Shortcut: M)"
                >
                  <Flag className={`w-3.5 h-3.5 ${isCurrentQuestionFlagged ? 'fill-slate-950 text-slate-950' : ''}`} />
                  <span>{isCurrentQuestionFlagged ? 'Flagged (উত্তর সংরক্ষিত)' : 'Flag Answer'}</span>
                </button>
              </div>

              {/* Question Header & Status */}
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1 min-w-0">
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
                      <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] sm:text-xs font-mono font-bold tabular-nums">
                        <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                        <span>{questionSecondsLeft}s left</span>
                      </span>
                    )}
                  </div>

                  <h3
                    style={{ fontSize: `${localQuestionFontSize}px` }}
                    className="font-bold text-white leading-relaxed tracking-tight break-words"
                  >
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
                    className={`min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition shrink-0 cursor-pointer relative flex items-center justify-center ${
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
                    className={`min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition shrink-0 cursor-pointer flex items-center justify-center ${
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
                    optionFontSize={localOptionFontSize}
                    onSelect={handleSelectOption}
                  />
                ))}
              </div>

              {/* Question Action & Explanation Bar */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={toggleExplanation}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
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
                } else if (answeredCount < totalQuestions || flaggedCount > 0) {
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
              flaggedQuestions={flaggedQuestions}
              isTotalTimeExpired={isTotalTimeExpired}
              onJump={handleJumpQuestion}
              onJumpNextFlagged={handleJumpNextFlagged}
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
                  <span className="text-slate-400">Total Quiz Time Left:</span>
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

      {/* Confirmation Modal if incomplete or flagged */}
      <ConfirmSubmitModal
        isOpen={showConfirmSubmit}
        answeredCount={answeredCount}
        flaggedCount={flaggedCount}
        totalQuestions={totalQuestions}
        onCancel={() => setShowConfirmSubmit(false)}
        onReviewFlagged={() => {
          setShowConfirmSubmit(false);
          handleJumpNextFlagged();
        }}
        onConfirm={() => {
          setShowConfirmSubmit(false);
          handleFinalSubmit();
        }}
      />
    </div>
  );
};

export const QuizView = React.memo(QuizViewComponent);
