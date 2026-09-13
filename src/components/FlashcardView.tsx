import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Volume2,
  VolumeX,
  Shuffle,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Play,
  RotateCcw,
  Check,
  X,
  HelpCircle,
  Lightbulb,
  Award,
  Filter,
} from 'lucide-react';
import { ModelQuestionSet, Question, QuizSettings, StudentProfile } from '../types';
import { speechManager } from '../utils/speech';
import { soundManager } from '../utils/sound';
import { getAppTheme } from '../utils/theme';
import { HeaderClock } from './HeaderClock';
import { Footer } from './Footer';

interface FlashcardViewProps {
  modelSet: ModelQuestionSet;
  allSets: ModelQuestionSet[];
  settings: QuizSettings;
  studentProfile: StudentProfile;
  onReturnToDashboard: () => void;
  onStartQuiz: (modelId: number) => void;
  onSwitchModelSet: (modelId: number) => void;
}

type CardStatus = 'unmarked' | 'mastered' | 'review';

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  modelSet,
  allSets,
  settings,
  studentProfile,
  onReturnToDashboard,
  onStartQuiz,
  onSwitchModelSet,
}) => {
  // Current index in active cards list
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<'all' | 'review' | 'mastered'>('all');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showCompletionSummary, setShowCompletionSummary] = useState<boolean>(false);

  // Per-question mastery status: questionId -> status
  const [cardStatusMap, setCardStatusMap] = useState<Record<number, CardStatus>>(() => {
    try {
      const key = `asgk_flashcard_status_set_${modelSet.id}`;
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Base list of questions
  const baseQuestions = useMemo(() => modelSet.questions, [modelSet]);

  // Shuffled or natural ordered list
  const orderedQuestions = useMemo(() => {
    if (!isShuffled) return baseQuestions;
    // Deterministic shuffle copy
    const copy = [...baseQuestions];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [baseQuestions, isShuffled]);

  // Filtered questions based on current filter mode
  const activeQuestions = useMemo(() => {
    if (filterMode === 'all') return orderedQuestions;
    if (filterMode === 'review') {
      return orderedQuestions.filter((q) => cardStatusMap[q.id] === 'review');
    }
    if (filterMode === 'mastered') {
      return orderedQuestions.filter((q) => cardStatusMap[q.id] === 'mastered');
    }
    return orderedQuestions;
  }, [orderedQuestions, filterMode, cardStatusMap]);

  // Save status to localStorage
  useEffect(() => {
    try {
      const key = `asgk_flashcard_status_set_${modelSet.id}`;
      localStorage.setItem(key, JSON.stringify(cardStatusMap));
    } catch {}
  }, [cardStatusMap, modelSet.id]);

  // Reset index whenever model set or filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowCompletionSummary(false);
    if (speechManager.isSpeakingNow()) {
      speechManager.cancel();
      setIsSpeaking(false);
    }
  }, [modelSet.id, filterMode]);

  // Stats calculation
  const stats = useMemo(() => {
    let mastered = 0;
    let review = 0;
    baseQuestions.forEach((q) => {
      const st = cardStatusMap[q.id];
      if (st === 'mastered') mastered++;
      else if (st === 'review') review++;
    });
    const total = baseQuestions.length;
    const unmarked = total - mastered - review;
    const progressPercent = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { mastered, review, unmarked, total, progressPercent };
  }, [baseQuestions, cardStatusMap]);

  const currentQuestion: Question | undefined = activeQuestions[currentIndex];

  // Stop speech when unmounting or switching
  useEffect(() => {
    return () => {
      if (speechManager.isSpeakingNow()) {
        speechManager.cancel();
      }
    };
  }, []);

  // Flip handler
  const handleFlip = useCallback(() => {
    if (settings.soundEffects) {
      soundManager.playCardFlip();
    }
    setIsFlipped((prev) => !prev);
  }, [settings.soundEffects]);

  // Next card handler
  const handleNext = useCallback(() => {
    if (speechManager.isSpeakingNow()) {
      speechManager.cancel();
      setIsSpeaking(false);
    }
    if (currentIndex < activeQuestions.length - 1) {
      if (settings.soundEffects) soundManager.playSwoosh();
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Reached the end of the deck
      if (settings.soundEffects) soundManager.playCelebration();
      setShowCompletionSummary(true);
    }
  }, [currentIndex, activeQuestions.length, settings.soundEffects]);

  // Previous card handler
  const handlePrev = useCallback(() => {
    if (speechManager.isSpeakingNow()) {
      speechManager.cancel();
      setIsSpeaking(false);
    }
    if (currentIndex > 0) {
      if (settings.soundEffects) soundManager.playSwoosh();
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, settings.soundEffects]);

  // Mark status
  const handleSetStatus = useCallback(
    (status: CardStatus) => {
      if (!currentQuestion) return;
      if (settings.soundEffects) {
        if (status === 'mastered') soundManager.playOptionSelect();
        else soundManager.playClick();
      }
      setCardStatusMap((prev) => ({
        ...prev,
        [currentQuestion.id]: prev[currentQuestion.id] === status ? 'unmarked' : status,
      }));
    },
    [currentQuestion, settings.soundEffects]
  );

  // Speech toggle
  const handleToggleSpeech = useCallback(() => {
    if (!currentQuestion) return;

    if (isSpeaking) {
      speechManager.cancel();
      setIsSpeaking(false);
      return;
    }

    let textToRead = '';
    if (!isFlipped) {
      textToRead = `Question ${currentIndex + 1}. ${currentQuestion.question}. Option A: ${currentQuestion.options.A}. Option B: ${currentQuestion.options.B}. Option C: ${currentQuestion.options.C}. Option D: ${currentQuestion.options.D}.`;
    } else {
      const correctOptionLetter = currentQuestion.correctAnswer;
      const correctText = currentQuestion.options[correctOptionLetter];
      textToRead = `Correct answer is option ${correctOptionLetter}: ${correctText}. Grammatical explanation: ${currentQuestion.explanation}`;
    }

    setIsSpeaking(true);
    speechManager.speak(
      textToRead,
      {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
        volume: settings.speechVolume,
      },
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  }, [currentQuestion, isFlipped, currentIndex, isSpeaking, settings]);

  // Touch Swipe Gesture Support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        handleSetStatus('mastered');
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleSetStatus('review');
      } else if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleToggleSpeech();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleSetStatus, handleToggleSpeech]);

  // Reset current set mastery
  const handleResetSetMastery = useCallback(() => {
    setCardStatusMap({});
    try {
      localStorage.removeItem(`asgk_flashcard_status_set_${modelSet.id}`);
    } catch {}
  }, [modelSet.id]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-slate-100 z-10 select-none">
      {/* Top Header */}
      <header className={`relative z-30 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 backdrop-blur-xl border-b flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 transition-colors duration-500 ${getAppTheme(settings.theme).headerBgClass}`}>
        {/* Left Branding & Back to Dashboard */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            id="flashcards-back-dashboard-btn"
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              onReturnToDashboard();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Model Set Picker Dropdown */}
          <div className="relative">
            <select
              value={modelSet.id}
              onChange={(e) => {
                if (settings.soundEffects) soundManager.playClick();
                onSwitchModelSet(Number(e.target.value));
              }}
              className="bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-bold rounded-xl px-2.5 sm:px-3 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {allSets.map((s) => (
                <option key={s.id} value={s.id}>
                  Set {s.id}: {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Shuffle Toggle */}
          <button
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              setIsShuffled((prev) => !prev);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              isShuffled
                ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Shuffle Card Order"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{isShuffled ? 'Shuffled' : 'Sequential'}</span>
          </button>

          {/* Speech Read Aloud */}
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              isSpeaking
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Read Question or Answer Aloud"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">{isSpeaking ? 'Stop' : 'Read'}</span>
          </button>

          {/* Start Real Quiz for this Model Set */}
          <button
            id="flashcards-start-quiz-btn"
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              onStartQuiz(modelSet.id);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs hover:brightness-110 transition shadow-md shadow-cyan-500/30 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Take Test</span>
          </button>

          <HeaderClock />
        </div>
      </header>

      {/* Main Flashcard Study Canvas */}
      <main className="relative z-20 flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-between">
        {/* Top Progress & Filter Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-cyan-500/20">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                  Flashcard Study Deck
                </span>
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  {modelSet.title}
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{modelSet.subtitle}</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({baseQuestions.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('review')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  filterMode === 'review'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>Review ({stats.review})</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('mastered')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  filterMode === 'mastered'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Mastered ({stats.mastered})</span>
              </button>
            </div>
          </div>

          {/* Progress Bar & Counter */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>
              Card <strong className="text-white font-mono">{activeQuestions.length > 0 ? currentIndex + 1 : 0}</strong> of{' '}
              <strong className="text-cyan-300 font-mono">{activeQuestions.length}</strong>
            </span>
            <span className="flex items-center gap-3">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {stats.mastered} Mastered
              </span>
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5" /> {stats.review} Need Review
              </span>
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500"
              initial={false}
              animate={{
                width: `${
                  activeQuestions.length > 0
                    ? Math.round(((currentIndex + 1) / activeQuestions.length) * 100)
                    : 0
                }%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Empty State for Filter */}
        {activeQuestions.length === 0 ? (
          <div className="my-auto py-16 text-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              No flashcards in this filter
            </h3>
            <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
              {filterMode === 'review'
                ? 'You have not marked any questions for review yet. Flag questions you struggle with while studying.'
                : 'You have not marked any questions as mastered yet.'}
            </p>
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Show All Cards ({baseQuestions.length})
            </button>
          </div>
        ) : currentQuestion ? (
          /* The Interactive Swipeable 3D Flashcard */
          <div
            className="flex-1 flex flex-col justify-center my-1 sm:my-3"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full min-h-[360px] sm:min-h-[420px] [perspective:1200px]">
              <motion.div
                key={currentQuestion.id}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full"
              >
                <div
                  id={`flashcard-${currentQuestion.id}`}
                  onClick={handleFlip}
                  className={`w-full min-h-[360px] sm:min-h-[420px] rounded-2xl sm:rounded-3xl p-5 sm:p-8 cursor-pointer transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-2 flex flex-col justify-between ${
                    isFlipped
                      ? 'bg-gradient-to-b from-[#0F172A] via-[#0B1E38] to-[#0F172A] border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.2)]'
                      : 'bg-gradient-to-b from-[#0F172A] via-[#132247] to-[#0F172A] border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.25)]'
                  }`}
                >
                  {/* Card Top Pill & Action Row */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[11px] font-black uppercase">
                        Question #{currentQuestion.id}
                      </span>
                      {currentQuestion.category && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                          {currentQuestion.category}
                        </span>
                      )}
                      {currentQuestion.topic && currentQuestion.topic !== currentQuestion.category && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold">
                          {currentQuestion.topic}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {cardStatusMap[currentQuestion.id] === 'mastered' && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3" /> Mastered
                        </span>
                      )}
                      {cardStatusMap[currentQuestion.id] === 'review' && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40">
                          <Bookmark className="w-3 h-3" /> Needs Review
                        </span>
                      )}

                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        {isFlipped ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-emerald-400" /> Answer Revealed
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-cyan-400" /> Click to Reveal
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Card Content (Front vs Back) */}
                  <div className="my-auto py-4">
                    {!isFlipped ? (
                      /* Front: Question & 4 MCQ Options */
                      <div className="space-y-4 sm:space-y-5">
                        <h3 className="text-base sm:text-xl md:text-2xl font-black text-white leading-snug tracking-tight">
                          {currentQuestion.question}
                        </h3>

                        {/* Options preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          {(['A', 'B', 'C', 'D'] as const).map((optKey) => (
                            <div
                              key={optKey}
                              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm"
                            >
                              <span className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold font-mono text-xs shrink-0">
                                {optKey}
                              </span>
                              <span className="leading-snug">{currentQuestion.options[optKey]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Back: Revealed Answer & Rich Grammatical Explanation */
                      <div className="space-y-4">
                        {/* Revealed Answer Box */}
                        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                          <div className="text-[10px] sm:text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Correct Answer</span>
                          </div>
                          <div className="text-sm sm:text-lg font-black text-white flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-mono font-black text-sm shrink-0">
                              {currentQuestion.correctAnswer}
                            </span>
                            <span>{currentQuestion.options[currentQuestion.correctAnswer]}</span>
                          </div>
                        </div>

                        {/* Grammatical Explanation & Rule Breakdown */}
                        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            <span>Detailed Grammar Rule & Explanation</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Flip hint & Quick Mastery Buttons */}
                  <div
                    className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleFlip}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>{isFlipped ? 'Show Question' : 'Reveal Answer'}</span>
                        <span className="hidden sm:inline text-[10px] text-slate-400">(Space)</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleToggleSpeech}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
                        title="Read out text"
                      >
                        {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Self-Assessment Mastery Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSetStatus('review')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                          cardStatusMap[currentQuestion.id] === 'review'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                            : 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                        }`}
                        title="Mark for revision (Key: R)"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Needs Review</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSetStatus('mastered')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                          cardStatusMap[currentQuestion.id] === 'mastered'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                            : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                        }`}
                        title="Mark as Mastered (Key: M)"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mastered</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}

        {/* Bottom Navigation & Scrubber Bar */}
        <div className="mt-3 sm:mt-4 space-y-3">
          {/* Previous / Next Primary Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              id="flashcards-prev-btn"
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="min-h-[44px] flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white disabled:opacity-40 disabled:pointer-events-none text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
              <span className="hidden sm:inline text-[10px] text-slate-500">(←)</span>
            </button>

            {/* Middle Quick Jump Pill */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCompletionSummary(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-300 text-xs font-bold transition"
              >
                View Deck Summary
              </button>
            </div>

            <button
              id="flashcards-next-btn"
              type="button"
              onClick={handleNext}
              className="min-h-[44px] flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-95 transition shadow-lg shadow-cyan-500/30 cursor-pointer"
            >
              <span>{currentIndex === activeQuestions.length - 1 ? 'Finish Deck' : 'Next Card'}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px] text-slate-800 font-bold">(→)</span>
            </button>
          </div>

          {/* Quick Jump Dot Scrubber (Questions 1 to 25) */}
          {activeQuestions.length > 0 && (
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {activeQuestions.map((q, idx) => {
                const status = cardStatusMap[q.id];
                const isCurrent = idx === currentIndex;
                let bgClass = 'bg-slate-800 text-slate-400';
                if (status === 'mastered') bgClass = 'bg-emerald-500/80 text-white font-bold';
                else if (status === 'review') bgClass = 'bg-amber-500/80 text-slate-950 font-bold';

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      if (settings.soundEffects) soundManager.playClick();
                      setCurrentIndex(idx);
                      setIsFlipped(false);
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[11px] font-mono flex items-center justify-center transition shrink-0 cursor-pointer ${bgClass} ${
                      isCurrent
                        ? 'ring-2 ring-cyan-400 scale-110 shadow-md shadow-cyan-400/30 z-10'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Completion Summary Modal */}
      {showCompletionSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0F172A] border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.4)] text-center text-white"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-white mb-1">
              Study Session Overview
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              {modelSet.title} • {stats.total} Total Questions
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xl font-black text-emerald-400 font-mono">{stats.mastered}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Mastered</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xl font-black text-amber-300 font-mono">{stats.review}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Need Review</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xl font-black text-cyan-300 font-mono">{stats.unmarked}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Unmarked</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  if (settings.soundEffects) soundManager.playClick();
                  onStartQuiz(modelSet.id);
                }}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-sm hover:brightness-110 transition shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Test Yourself on Set {modelSet.id}</span>
              </button>

              {stats.review > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setFilterMode('review');
                    setCurrentIndex(0);
                    setShowCompletionSummary(false);
                  }}
                  className="w-full min-h-[44px] py-2 px-4 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Review {stats.review} Flagged Questions</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIndex(0);
                    setIsFlipped(false);
                    setShowCompletionSummary(false);
                  }}
                  className="flex-1 min-h-[40px] py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer"
                >
                  Restart Deck
                </button>

                <button
                  type="button"
                  onClick={() => setShowCompletionSummary(false)}
                  className="flex-1 min-h-[40px] py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};
