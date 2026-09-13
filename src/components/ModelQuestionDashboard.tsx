import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Clock,
  Sparkles,
  Trophy,
  Settings,
  LogOut,
  User,
  Play,
  CheckCircle2,
  Edit3,
  Award,
  Layers,
  Search,
  X,
  Zap,
  Filter,
  ArrowRight,
  Target,
  AlertTriangle,
  TrendingDown,
  Compass,
  Crown,
} from 'lucide-react';
import {
  ModelQuestionSet,
  StudentProfile,
  ScoreRecord,
  QuizSettings,
  BadgeProgress,
  GrammarCategory,
} from '../types';
import { HeaderClock } from './HeaderClock';
import { Footer } from './Footer';
import { TrophyShowcaseBar } from './TrophyShowcaseBar';
import { WeakAreasModal } from './WeakAreasModal';
import { DailyGrammarFactWidget } from './DailyGrammarFactWidget';
import { DailyChallengeCard } from './DailyChallengeCard';
import { StudyRoadmap } from './StudyRoadmap';
import { ReturnReminderBanner } from './ReturnReminderBanner';
import { GlobalLeaderboard } from './GlobalLeaderboard';
import { getDailyChallengeStatus } from '../utils/dailyChallenge';
import { recordAndCheck24HourActivity, ReminderCheckResult } from '../utils/browserNotifications';
import { computeGlobalLeaderboard } from '../utils/globalLeaderboard';
import { soundManager } from '../utils/sound';
import { getAppTheme } from '../utils/theme';
import {
  ALL_GRAMMAR_CATEGORIES,
  CATEGORY_META_MAP,
  getGlobalCategoryCounts,
  createFocusedCategorySet,
  createSetCategoryPractice,
} from '../utils/categories';
import { analyzeUserWeakAreas, generateWeakAreasPracticeSet } from '../utils/weakAreas';
import { computeAdaptiveDifficultyProfile } from '../utils/adaptiveDifficulty';

interface ModelQuestionCardProps {
  modelSet: ModelQuestionSet;
  idx: number;
  totalSets: number;
  bestScore: number | null;
  enableTotalTimer: boolean;
  totalTimeMinutes: number;
  soundEffects: boolean;
  selectedCategory: GrammarCategory | 'All';
  onSelect: (modelId: number) => void;
  onOpenFlashcards: (modelId: number) => void;
  onSelectCategory: (category: GrammarCategory) => void;
  onPracticeCategoryInSet?: (modelSet: ModelQuestionSet, category: GrammarCategory) => void;
}

// Memoized individual model question card
const ModelQuestionCard = React.memo<ModelQuestionCardProps>(({
  modelSet,
  idx,
  totalSets,
  bestScore,
  enableTotalTimer,
  totalTimeMinutes,
  soundEffects,
  selectedCategory,
  onSelect,
  onOpenFlashcards,
  onSelectCategory,
  onPracticeCategoryInSet,
}) => {
  const handleStart = useCallback(() => {
    if (soundEffects) soundManager.playClick();
    onSelect(modelSet.id);
  }, [soundEffects, onSelect, modelSet.id]);

  const handleFlashcards = useCallback(() => {
    if (soundEffects) soundManager.playClick();
    onOpenFlashcards(modelSet.id);
  }, [soundEffects, onOpenFlashcards, modelSet.id]);

  const gradientClasses = useMemo(() => {
    const mod = idx % 5;
    if (mod === 0) return 'from-teal-400 to-cyan-500';
    if (mod === 1) return 'from-cyan-500 to-blue-500';
    if (mod === 2) return 'from-blue-500 to-purple-500';
    if (mod === 3) return 'from-purple-500 to-pink-500';
    return 'from-amber-400 to-rose-500';
  }, [idx]);

  const matchingCategoryCount = useMemo(() => {
    if (selectedCategory === 'All') return 0;
    return modelSet.categoryBreakdown?.[selectedCategory] || 0;
  }, [selectedCategory, modelSet.categoryBreakdown]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
      className={`group relative rounded-2xl sm:rounded-3xl bg-[#0F172A]/90 hover:bg-[#1E3A8A]/25 backdrop-blur-xl border p-4 sm:p-5 shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        selectedCategory !== 'All' && matchingCategoryCount > 0
          ? 'border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
          : 'border-blue-500/30 hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(30,58,138,0.4)]'
      }`}
    >
      {/* Accent Top Gradient */}
      <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${gradientClasses}`} />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-3.5">
          <span className="text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
            SET {modelSet.id} OF {totalSets}
          </span>

          {bestScore !== null ? (
            <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 sm:px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Best: {bestScore}%
            </span>
          ) : (
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Not taken yet</span>
          )}
        </div>

        <h4 className="text-base sm:text-lg font-extrabold text-white group-hover:text-cyan-300 transition tracking-tight">
          {modelSet.title}
        </h4>
        <p className="text-xs font-semibold text-cyan-400/90 mt-0.5">
          {modelSet.subtitle}
        </p>

        <p className="text-xs text-slate-300/80 mt-2 line-clamp-2 leading-relaxed">
          {modelSet.description}
        </p>

        {/* Selected Category Highlight Banner if active */}
        {selectedCategory !== 'All' && matchingCategoryCount > 0 && (
          <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/70 to-teal-950/60 border border-emerald-500/40 flex items-center justify-between text-xs">
            <span className="text-emerald-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{selectedCategory}:</span>
            </span>
            <span className="font-mono font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-lg border border-emerald-500/30">
              {matchingCategoryCount} MCQs
            </span>
          </div>
        )}

        {/* Category Tags in this Set */}
        <div className="mt-3">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-500" />
            <span>Grammar Categories:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {modelSet.categories?.slice(0, 4).map((cat) => {
              const isCurrent = selectedCategory === cat;
              const count = modelSet.categoryBreakdown?.[cat] || 0;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (soundEffects) soundManager.playClick();
                    onSelectCategory(cat);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-400 text-slate-950 shadow-sm ring-1 ring-cyan-300 font-black'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/80'
                  }`}
                  title={`Filter by ${cat} (${count} questions)`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1 rounded text-[9px] font-mono ${
                      isCurrent ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
            {(modelSet.categories?.length || 0) > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium self-center">
                +{(modelSet.categories?.length || 0) - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Quick Highlights list */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Total Set MCQs:</span>
            <strong className="text-white font-mono font-bold">25 MCQs</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Duration:</span>
            <strong className="text-cyan-300 font-mono">
              {enableTotalTimer ? `${totalTimeMinutes} Mins` : 'Unlimited'}
            </strong>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 space-y-2">
        {/* Practice specific category button when category filter is active */}
        {selectedCategory !== 'All' && matchingCategoryCount > 0 && onPracticeCategoryInSet && (
          <button
            id={`practice-category-set-${modelSet.id}-btn`}
            type="button"
            onClick={() => {
              if (soundEffects) soundManager.playClick();
              onPracticeCategoryInSet(modelSet, selectedCategory);
            }}
            className="w-full min-h-[42px] py-2 px-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-slate-950 font-black text-xs shadow-md hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-1.5 cursor-pointer"
            title={`Start a focused quiz with only the ${matchingCategoryCount} ${selectedCategory} questions in Set ${modelSet.id}`}
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Practice {matchingCategoryCount} {selectedCategory} MCQs</span>
          </button>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            id={`flashcard-model-${modelSet.id}-btn`}
            type="button"
            onClick={handleFlashcards}
            className="min-h-[40px] py-2 px-2.5 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-purple-950/40 border border-purple-500/40 hover:border-purple-400 text-purple-300 hover:text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            title="Study questions and reveal answers in Flashcard mode"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Flashcards</span>
          </button>

          <button
            id={`start-model-${modelSet.id}-btn`}
            type="button"
            onClick={handleStart}
            className="min-h-[40px] py-2 px-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-[0_4px_15px_rgba(6,182,212,0.3)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Full Test (25)</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ModelQuestionCard.displayName = 'ModelQuestionCard';

interface ModelQuestionDashboardProps {
  questionSets: ModelQuestionSet[];
  studentProfile: StudentProfile;
  scoreRecords: ScoreRecord[];
  settings: QuizSettings;
  badges: BadgeProgress[];
  onSelectModel: (modelId: number) => void;
  onOpenFlashcards: (modelId: number) => void;
  onStartCustomPractice?: (customSet: ModelQuestionSet) => void;
  onOpenCustomFlashcards?: (customSet: ModelQuestionSet) => void;
  onOpenScoreBoard: () => void;
  onOpenTrophiesModal: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
}

export const ModelQuestionDashboard = React.memo<ModelQuestionDashboardProps>(({
  questionSets,
  studentProfile,
  scoreRecords,
  settings,
  badges,
  onSelectModel,
  onOpenFlashcards,
  onStartCustomPractice,
  onOpenCustomFlashcards,
  onOpenScoreBoard,
  onOpenTrophiesModal,
  onOpenSettings,
  onOpenProfile,
  onLogout,
}) => {
  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<GrammarCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isWeakAreasModalOpen, setIsWeakAreasModalOpen] = useState(false);

  // Tab State: 'all-sets' (Standard 5 Model Sets), 'roadmap' (Sequential Study Roadmap), or 'leaderboard' (Global Simulated Top 10)
  const [dashboardTab, setDashboardTab] = useState<'all-sets' | 'roadmap' | 'leaderboard'>('all-sets');

  // Simulated Global Leaderboard Summary
  const globalLeaderboardSummary = useMemo(() => {
    return computeGlobalLeaderboard(scoreRecords, studentProfile);
  }, [scoreRecords, studentProfile]);

  // Daily Challenge State
  const dailyChallengeState = useMemo(() => {
    return getDailyChallengeStatus(questionSets.length);
  }, [questionSets.length]);

  const dailyTargetSet = useMemo(() => {
    return (
      questionSets.find((s) => s.id === dailyChallengeState.targetSetId) || questionSets[0]
    );
  }, [questionSets, dailyChallengeState.targetSetId]);

  // 24-Hour Return Reminder & Inactivity State
  const [returnReminder, setReturnReminder] = useState<ReminderCheckResult | null>(null);
  const [showReturnReminder, setShowReturnReminder] = useState(false);

  useEffect(() => {
    // Record login/activity timestamp and check if > 24 hours elapsed
    const result = recordAndCheck24HourActivity(dailyTargetSet?.title);
    setReturnReminder(result);
    if (result.isOver24Hours) {
      setShowReturnReminder(true);
    }
  }, [dailyTargetSet?.title]);

  // Active Theme configuration
  const activeTheme = useMemo(() => getAppTheme(settings.theme), [settings.theme]);

  // Analyze weak grammar categories (<60%) across user's score records & persistent history
  const weakAreasReport = useMemo(() => {
    return analyzeUserWeakAreas(scoreRecords, questionSets);
  }, [scoreRecords, questionSets]);

  const handleOpenWeakAreasModal = useCallback(() => {
    if (settings.soundEffects) soundManager.playClick();
    setIsWeakAreasModalOpen(true);
  }, [settings.soundEffects]);

  const handleCloseWeakAreasModal = useCallback(() => {
    setIsWeakAreasModalOpen(false);
  }, []);

  const handleStartPracticeCustomSet = useCallback(
    (customSet: ModelQuestionSet) => {
      if (onStartCustomPractice) {
        onStartCustomPractice(customSet);
      } else {
        onSelectModel(customSet.id);
      }
    },
    [onStartCustomPractice, onSelectModel]
  );

  const handleOpenFlashcardsCustomSet = useCallback(
    (customSet: ModelQuestionSet) => {
      if (onOpenCustomFlashcards) {
        onOpenCustomFlashcards(customSet);
      } else {
        onOpenFlashcards(customSet.id);
      }
    },
    [onOpenCustomFlashcards, onOpenFlashcards]
  );

  const handleQuickStartWeakAreas = useCallback(() => {
    if (settings.soundEffects) soundManager.playClick();
    const weakSet = generateWeakAreasPracticeSet(weakAreasReport.top3WeakCategories, questionSets, 25);
    handleStartPracticeCustomSet(weakSet);
  }, [settings.soundEffects, weakAreasReport.top3WeakCategories, questionSets, handleStartPracticeCustomSet]);

  const handleSelectCategoryFromWidget = useCallback((category: GrammarCategory) => {
    setSelectedCategory(category);
    const element = document.getElementById('grammar-category-filter-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleStartDailyChallenge = useCallback(
    (setId: number) => {
      if (settings.soundEffects) soundManager.playClick();
      onSelectModel(setId);
    },
    [settings.soundEffects, onSelectModel]
  );

  const handleStartCategoryFromRoadmap = useCallback(
    (category: GrammarCategory) => {
      if (settings.soundEffects) soundManager.playClick();
      const customSet = createFocusedCategorySet(category, questionSets);
      handleStartPracticeCustomSet(customSet);
    },
    [settings.soundEffects, questionSets, handleStartPracticeCustomSet]
  );

  const handleOpenFlashcardsFromRoadmap = useCallback(
    (category: GrammarCategory) => {
      if (settings.soundEffects) soundManager.playClick();
      const customSet = createFocusedCategorySet(category, questionSets);
      handleOpenFlashcardsCustomSet(customSet);
    },
    [settings.soundEffects, questionSets, handleOpenFlashcardsCustomSet]
  );

  // Precompute highest score per model in an O(1) Map
  const bestScoresMap = useMemo(() => {
    const map = new Map<number, number>();
    for (let i = 0; i < scoreRecords.length; i++) {
      const record = scoreRecords[i];
      const prev = map.get(record.modelNumber);
      if (prev === undefined || record.percentage > prev) {
        map.set(record.modelNumber, record.percentage);
      }
    }
    return map;
  }, [scoreRecords]);

  const { totalAttempts, avgScore } = useMemo(() => {
    const count = scoreRecords.length;
    const avg =
      count > 0
        ? Math.round(scoreRecords.reduce((sum, r) => sum + r.percentage, 0) / count)
        : 0;
    return { totalAttempts: count, avgScore: avg };
  }, [scoreRecords]);

  const totalQuestionsAllSets = useMemo(
    () => questionSets.reduce((sum, s) => sum + s.totalQuestions, 0),
    [questionSets]
  );

  // Compute Adaptive Difficulty Profile based on real quiz performance
  const adaptiveProfile = useMemo(() => {
    return computeAdaptiveDifficultyProfile(scoreRecords, questionSets);
  }, [scoreRecords, questionSets]);

  const unlockedBadgesCount = useMemo(() => {
    return badges.filter((b) => b.isUnlocked).length;
  }, [badges]);

  // Global category counts across question bank
  const globalCategoryCounts = useMemo(() => {
    return getGlobalCategoryCounts(questionSets);
  }, [questionSets]);

  // Filtered Model Question Sets
  const filteredSets = useMemo(() => {
    return questionSets.filter((set) => {
      // 1. Category filter
      if (selectedCategory !== 'All') {
        const count = set.categoryBreakdown?.[selectedCategory] || 0;
        if (count === 0) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = set.title.toLowerCase().includes(q);
        const matchesSubtitle = set.subtitle.toLowerCase().includes(q);
        const matchesDesc = set.description.toLowerCase().includes(q);
        const matchesTopic = set.questions.some(
          (item) =>
            item.topic.toLowerCase().includes(q) ||
            item.question.toLowerCase().includes(q) ||
            (item.category && item.category.toLowerCase().includes(q))
        );
        return matchesTitle || matchesSubtitle || matchesDesc || matchesTopic;
      }

      return true;
    });
  }, [questionSets, selectedCategory, searchQuery]);

  // Category selection handler
  const handleCategorySelect = useCallback(
    (category: GrammarCategory | 'All') => {
      if (settings.soundEffects) soundManager.playClick();
      setSelectedCategory(category);
    },
    [settings.soundEffects]
  );

  // Dedicated single-set category practice handler
  const handlePracticeCategoryInSet = useCallback(
    (modelSet: ModelQuestionSet, category: GrammarCategory) => {
      const customSet = createSetCategoryPractice(modelSet, category);
      if (onStartCustomPractice) {
        onStartCustomPractice(customSet);
      } else {
        onSelectModel(modelSet.id);
      }
    },
    [onStartCustomPractice, onSelectModel]
  );

  // Dedicated full-bank category practice quiz handler
  const handleStartFullCategoryQuiz = useCallback(() => {
    if (selectedCategory === 'All') return;
    if (settings.soundEffects) soundManager.playClick();
    const customSet = createFocusedCategorySet(selectedCategory, questionSets);
    if (onStartCustomPractice) {
      onStartCustomPractice(customSet);
    } else {
      onSelectModel(customSet.id);
    }
  }, [selectedCategory, questionSets, settings.soundEffects, onStartCustomPractice, onSelectModel]);

  // Dedicated full-bank category flashcards handler
  const handleStartFullCategoryFlashcards = useCallback(() => {
    if (selectedCategory === 'All') return;
    if (settings.soundEffects) soundManager.playClick();
    const customSet = createFocusedCategorySet(selectedCategory, questionSets);
    if (onOpenCustomFlashcards) {
      onOpenCustomFlashcards(customSet);
    } else {
      onOpenFlashcards(customSet.id);
    }
  }, [selectedCategory, questionSets, settings.soundEffects, onOpenCustomFlashcards, onOpenFlashcards]);

  // Top action handlers with audio feedback
  const handleScoreBoardClick = useCallback(() => {
    if (settings.soundEffects) soundManager.playClick();
    onOpenScoreBoard();
  }, [settings.soundEffects, onOpenScoreBoard]);

  const handleTrophiesClick = useCallback(() => {
    if (settings.soundEffects) soundManager.playClick();
    onOpenTrophiesModal();
  }, [settings.soundEffects, onOpenTrophiesModal]);

  const handleSettingsClick = useCallback(() => {
    if (settings.soundEffects) soundManager.playClick();
    onOpenSettings();
  }, [settings.soundEffects, onOpenSettings]);

  const handleLogoutClick = useCallback(() => {
    if (settings.soundEffects) soundManager.playClick();
    onLogout();
  }, [settings.soundEffects, onLogout]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-slate-100 z-10">
      {/* Top Navigation Bar */}
      <header className={`relative z-30 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 backdrop-blur-xl border-b flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 transition-colors duration-500 ${activeTheme.headerBgClass}`}>
        {/* Left Branding */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-500 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-slate-950 flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
            </div>
          </div>
          <div>
            <h1 className="text-sm xs:text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
              <span>MCQ from all Grammar Points</span>
            </h1>
            <p className="text-[10px] xs:text-xs text-cyan-300 font-medium line-clamp-1 xs:line-clamp-none">
              English Grammar Model Test & Practice Series
            </p>
          </div>
        </div>

        {/* Center Clock & Student Profile Badge */}
        <div className="hidden md:flex items-center gap-3">
          <HeaderClock />

          <button
            id="nav-profile-btn"
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/80 text-xs text-slate-300 hover:text-white transition cursor-pointer shadow-inner"
            title="Edit Student Profile"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center font-black text-[11px]">
              {studentProfile.name.charAt(0).toUpperCase() || 'S'}
            </div>
            <div className="text-left">
              <div className="font-bold leading-tight text-white line-clamp-1 max-w-[120px]">
                {studentProfile.name}
              </div>
              <div className="text-[10px] text-cyan-300">Roll: {studentProfile.roll}</div>
            </div>
            <Edit3 className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>
        </div>

        {/* Right Navigation & Control Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Study Roadmap Navigation Button */}
          <button
            id="nav-roadmap-btn"
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              setDashboardTab((prev) => (prev === 'roadmap' ? 'all-sets' : 'roadmap'));
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
              dashboardTab === 'roadmap'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30'
            }`}
            title="Grammar Modules Roadmap in Sequential Order (Beginner to Advanced)"
          >
            <Compass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${dashboardTab === 'roadmap' ? 'text-slate-950' : 'text-cyan-300'}`} />
            <span className="hidden xs:inline">Roadmap</span>
            <span className="px-1.5 py-0.2 bg-slate-950/40 rounded-full text-[10px] font-black">
              13
            </span>
          </button>

          {/* Global Leaderboard Navigation Button */}
          <button
            id="nav-leaderboard-btn"
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              setDashboardTab((prev) => (prev === 'leaderboard' ? 'all-sets' : 'leaderboard'));
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition shadow-sm shrink-0 cursor-pointer ${
              dashboardTab === 'leaderboard'
                ? 'bg-amber-400 text-slate-950 font-black shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                : 'bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30'
            }`}
            title="Global Leaderboard (Top 10 High Achievers)"
          >
            <Crown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${dashboardTab === 'leaderboard' ? 'text-slate-950' : 'text-amber-300'}`} />
            <span className="hidden xs:inline">Leaderboard</span>
            <span className="px-1.5 py-0.2 bg-slate-950/40 rounded-full text-[10px] font-black">
              {globalLeaderboardSummary.currentUserRank ? `#${globalLeaderboardSummary.currentUserRank}` : 'Top 10'}
            </span>
          </button>

          {/* Quick Flashcards Mode Button */}
          <button
            id="nav-flashcards-quick-btn"
            type="button"
            onClick={() => {
              if (settings.soundEffects) soundManager.playClick();
              onOpenFlashcards(1);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
            title="Study Grammar via Flashcards"
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
            <span className="hidden xs:inline">Flashcards</span>
          </button>

          {/* Review Weak Areas Navigation Button */}
          <button
            id="nav-weak-areas-btn"
            type="button"
            onClick={handleOpenWeakAreasModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
            title="Identify top 3 grammar categories scoring below 60% and generate focused practice"
          >
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span className="hidden xs:inline">Review Weak Areas</span>
            {weakAreasReport.hasBelow60 && (
              <span className="px-1.5 py-0.2 bg-rose-500/40 border border-rose-400/50 rounded-full text-[10px] font-black text-rose-200 animate-pulse">
                {weakAreasReport.identifiedWeakCategories.length}
              </span>
            )}
          </button>

          <button
            id="nav-trophies-btn"
            type="button"
            onClick={handleTrophiesClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
            title="Digital Trophies & Badges Cabinet"
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
            <span className="hidden xs:inline">Trophies</span>
            <span className="px-1.5 py-0.2 bg-amber-400/30 rounded-full text-[10px] font-black text-white">
              {unlockedBadgesCount}
            </span>
          </button>

          <button
            id="nav-scoreboard-btn"
            type="button"
            onClick={handleScoreBoardClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span className="hidden xs:inline">Score Board</span>
          </button>

          <button
            id="nav-settings-btn"
            type="button"
            onClick={handleSettingsClick}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition shrink-0 cursor-pointer"
            title="Smart & Modern Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            id="nav-logout-btn"
            type="button"
            onClick={handleLogoutClick}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 text-xs font-bold transition shrink-0 cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-20 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* 24-Hour Return Alert Banner */}
        {showReturnReminder && returnReminder && returnReminder.isOver24Hours && (
          <ReturnReminderBanner
            studentName={studentProfile.name}
            hoursElapsed={returnReminder.hoursElapsed}
            currentStreak={dailyChallengeState.currentStreak}
            targetSetTitle={dailyTargetSet.title}
            targetSetId={dailyTargetSet.id}
            notificationPermission={returnReminder.permission}
            soundEffects={settings.soundEffects}
            onStartChallenge={handleStartDailyChallenge}
            onDismiss={() => setShowReturnReminder(false)}
          />
        )}

        {/* Welcome Banner Card */}
        <div className={`mb-6 sm:mb-8 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 transition-all duration-500 ${activeTheme.welcomeCardBgClass}`}>
          <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] sm:text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prepared for Competitive Exams, Primary & Higher English</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome, <span className="text-cyan-300">{studentProfile.name}</span>!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore your personalized <strong>Study Roadmap</strong> from beginner to advanced grammar, test your skills in the <strong>Daily Challenge</strong>, or select any Model Question set with in-depth explanations.
            </p>
          </div>

          {/* Quick Performance Metrics */}
          <div className="flex items-center justify-around sm:justify-center gap-3 sm:gap-4 bg-slate-900/90 border border-slate-700/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 shrink-0 shadow-inner">
            <div className="text-center px-2">
              <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">{totalAttempts}</div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Tests Taken
              </div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="text-center px-2">
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                {avgScore}%
              </div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Avg. Score
              </div>
            </div>
          </div>
        </div>

        {/* DAILY CHALLENGE FEATURE CARD */}
        <div className="mb-6 sm:mb-8">
          <DailyChallengeCard
            challengeState={dailyChallengeState}
            targetSet={dailyTargetSet}
            soundEffects={settings.soundEffects}
            onStartChallenge={handleStartDailyChallenge}
          />
        </div>

        {/* Primary Tab Switcher: All Model Question Tests vs Study Roadmap */}
        <div className="mb-6 sm:mb-8 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="tab-all-sets-btn"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                setDashboardTab('all-sets');
              }}
              className={`flex-1 sm:flex-initial min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                dashboardTab === 'all-sets'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>All Model Question Tests</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-950/40">
                {questionSets.length} Sets
              </span>
            </button>

            <button
              type="button"
              id="tab-roadmap-btn"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                setDashboardTab('roadmap');
              }}
              className={`flex-1 sm:flex-initial min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                dashboardTab === 'roadmap'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Study Roadmap</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-300">
                13 Stages
              </span>
            </button>

            <button
              type="button"
              id="tab-leaderboard-btn"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                setDashboardTab('leaderboard');
              }}
              className={`flex-1 sm:flex-initial min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                dashboardTab === 'leaderboard'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Global Leaderboard</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300">
                Top 10
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 pr-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              {dashboardTab === 'roadmap'
                ? 'Sequential Grammar Learning Path (Beginner to Advanced)'
                : dashboardTab === 'leaderboard'
                ? 'Simulated Global Top 10 High Achievers Ranking'
                : 'Full Exam Model Sets with Detailed Explanations'}
            </span>
          </div>
        </div>

        {/* Dynamic View: Study Roadmap vs Global Leaderboard vs All Model Sets */}
        {dashboardTab === 'roadmap' ? (
          <StudyRoadmap
            questionSets={questionSets}
            scoreRecords={scoreRecords}
            soundEffects={settings.soundEffects}
            onStartCategoryPractice={handleStartCategoryFromRoadmap}
            onOpenCategoryFlashcards={handleOpenFlashcardsFromRoadmap}
          />
        ) : dashboardTab === 'leaderboard' ? (
          <GlobalLeaderboard
            scoreRecords={scoreRecords}
            studentProfile={studentProfile}
            soundEffects={settings.soundEffects}
            onSelectModel={onSelectModel}
          />
        ) : (
          <>
            {/* Digital Trophies Showcase Bar */}
            <TrophyShowcaseBar
              badges={badges}
              onOpenTrophiesModal={onOpenTrophiesModal}
              soundEffects={settings.soundEffects}
            />

            {/* Global Leaderboard Mini Spotlight Bar */}
            <div
              id="leaderboard-quick-spotlight"
              onClick={() => {
                if (settings.soundEffects) soundManager.playClick();
                setDashboardTab('leaderboard');
              }}
              className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 hover:border-amber-400/80 transition-all cursor-pointer shadow-md group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 group-hover:scale-105 transition-transform shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                      Simulated Global Leaderboard
                    </span>
                    <span className="px-2 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                      Top 10 Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Leader: <strong className="text-white">{globalLeaderboardSummary.top10[0]?.studentName || 'Tahsin Ahmed'}</strong> (100%) • Your Rank:{' '}
                    <strong className="text-cyan-300">
                      {globalLeaderboardSummary.currentUserRank ? `#${globalLeaderboardSummary.currentUserRank}` : 'Unranked (Take a test)'}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 group-hover:text-amber-200 shrink-0">
                <span>View Full Top 10</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* DAILY GRAMMAR FACT WIDGET */}
            <DailyGrammarFactWidget
              onSelectCategory={handleSelectCategoryFromWidget}
              enableSpeech={settings.enableSpeech}
              soundEffects={settings.soundEffects}
            />

            {/* ADAPTIVE DIFFICULTY LEARNING RECOMMENDATION BANNER */}
            <div
              id="adaptive-difficulty-spotlight-card"
              className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950/95 via-indigo-950/40 to-slate-900/95 border border-indigo-500/40 shadow-[0_0_35px_rgba(99,102,241,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500" />

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-cyan-300 shrink-0 shadow-inner">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 fill-cyan-400" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Adaptive Learning Recommendation
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-black">
                      Level: {adaptiveProfile.levelTitle}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono">
                      Avg: {adaptiveProfile.averagePercentage}%
                    </span>
                    <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold border ${
                      adaptiveProfile.recentTrend === 'improving'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : adaptiveProfile.recentTrend === 'declining'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {adaptiveProfile.recentTrend === 'improving' ? 'Trend: Improving' : adaptiveProfile.recentTrend === 'declining' ? 'Trend: Review Needed' : 'Trend: Stable'}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-white">
                    Suggested Next Module: {adaptiveProfile.recommendedModule.title} ({adaptiveProfile.recommendedModule.stage})
                  </h4>

                  <p className="text-xs sm:text-sm text-indigo-200/90 max-w-3xl leading-relaxed">
                    {adaptiveProfile.recommendationReason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto pt-2 lg:pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (settings.soundEffects) soundManager.playClick();
                    handleStartCategoryFromRoadmap(adaptiveProfile.recommendedModule.category);
                  }}
                  className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  title="Practice 25 questions on the suggested module"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Start Module #{adaptiveProfile.recommendedModule.step}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (settings.soundEffects) soundManager.playClick();
                    setDashboardTab('roadmap');
                  }}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Open the complete Study Roadmap"
                >
                  <Compass className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">Roadmap</span>
                </button>
              </div>
            </div>

        {/* WEAK AREAS REMEDIATION SPOTLIGHT BANNER */}
        <div
          id="weak-areas-spotlight-card"
          className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950/95 via-amber-950/25 to-slate-900/95 border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500" />

          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-400/40 text-amber-300 shrink-0 shadow-inner">
              <Target className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Weak Areas Remediation (&lt; 60% Focus)
                </span>

                {weakAreasReport.hasBelow60 ? (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] sm:text-[11px] font-bold">
                    {weakAreasReport.identifiedWeakCategories.length} Weak {weakAreasReport.identifiedWeakCategories.length === 1 ? 'Area' : 'Areas'} Identified
                  </span>
                ) : weakAreasReport.hasHistory ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> All Tested &ge; 60%
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] sm:text-[11px] font-bold">
                    Diagnostic Practice Ready
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Strengthen Your Weak Grammar Points
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {weakAreasReport.hasBelow60 ? (
                  <>
                    Identified grammar categories where your score is below 60%:{' '}
                    <strong className="text-amber-300">
                      {weakAreasReport.top3WeakCategories.join(', ')}
                    </strong>
                    . Click below to review detailed analytics or launch an instant 25-MCQ remediation practice test.
                  </>
                ) : (
                  <>
                    Automatically analyzes your accuracy across all grammar categories and pinpoints the top 3 categories needing improvement to push your score above 60%.
                  </>
                )}
              </p>

              {/* Chips of Top 3 Categories */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-[11px] text-slate-400 font-semibold">Focus Categories:</span>
                {weakAreasReport.top3WeakCategories.map((cat) => {
                  const perf = weakAreasReport.allTestedCategories.find((p) => p.category === cat);
                  return (
                    <span
                      key={cat}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                        perf && perf.percentage < 60
                          ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                          : 'bg-slate-800/80 text-amber-200 border-amber-500/30'
                      }`}
                    >
                      {cat}
                      {perf && (
                        <span className="text-[10px] font-mono opacity-80">
                          ({perf.percentage}%)
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
            <button
              id="review-weak-areas-btn"
              type="button"
              onClick={handleOpenWeakAreasModal}
              className="flex-1 lg:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-amber-500/50 text-amber-300 hover:text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              title="Open full analytics and detailed weak areas review modal"
            >
              <Target className="w-4 h-4 text-amber-400" />
              <span>Review Weak Areas</span>
            </button>

            <button
              id="quick-start-weak-areas-btn"
              type="button"
              onClick={handleQuickStartWeakAreas}
              className="flex-1 lg:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              title="Immediately generate and start a 25-MCQ practice session covering your top 3 weak grammar categories"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Practice (25 MCQs)</span>
            </button>
          </div>
        </div>

        {/* GRAMMAR CATEGORY FILTER SECTION */}
        <section id="grammar-category-filter-section" className="mb-6 sm:mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-400" />
                <span>Filter by Grammar Category</span>
                <span className="text-xs font-normal text-slate-400">
                  (Click any category for focused practice)
                </span>
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="search-grammar-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic or set number..."
                className="w-full bg-slate-900/90 border border-slate-700/90 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Scrollable horizontally) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {/* "All" Pill */}
            <button
              id="filter-category-all-btn"
              type="button"
              onClick={() => handleCategorySelect('All')}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              <span>All Categories</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedCategory === 'All'
                    ? 'bg-slate-950/40 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {totalQuestionsAllSets} Qs
              </span>
            </button>

            {/* Category Pills */}
            {ALL_GRAMMAR_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = globalCategoryCounts[cat] || 0;
              const meta = CATEGORY_META_MAP[cat];

              return (
                <button
                  key={cat}
                  id={`filter-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}-btn`}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.45)] ring-1 ring-cyan-300 font-black'
                      : `${meta?.badgeBg || 'bg-slate-900'} border ${
                          meta?.badgeBorder || 'border-slate-700'
                        } ${meta?.badgeText || 'text-slate-300'} hover:brightness-125`
                  }`}
                  title={`${cat}: ${count} questions across all sets`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isSelected
                        ? 'bg-slate-950/40 text-slate-950 font-black'
                        : 'bg-slate-950/50 text-slate-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CATEGORY SPOTLIGHT PANEL */}
          <AnimatePresence>
            {selectedCategory !== 'All' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-[#0B1528] to-slate-900 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Focused Practice Mode
                      </span>
                      <span className="text-xs text-slate-400">
                        {globalCategoryCounts[selectedCategory]} MCQs across {filteredSets.length} Model Sets
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                      <span>{selectedCategory} Mastery</span>
                    </h4>

                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                      {CATEGORY_META_MAP[selectedCategory]?.description} Start a focused test
                      containing exclusively {selectedCategory} questions or study them in Flashcards.
                    </p>
                  </div>

                  {/* Actions for Full Focused Practice */}
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      id="start-category-focused-quiz-btn"
                      type="button"
                      onClick={handleStartFullCategoryQuiz}
                      className="min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] shadow-[0_4px_15px_rgba(6,182,212,0.35)] transition flex items-center gap-2 cursor-pointer"
                      title={`Launch a unified quiz with all ${globalCategoryCounts[selectedCategory]} ${selectedCategory} questions`}
                    >
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>Start All {globalCategoryCounts[selectedCategory]} {selectedCategory} MCQs</span>
                    </button>

                    <button
                      id="study-category-focused-flashcards-btn"
                      type="button"
                      onClick={handleStartFullCategoryFlashcards}
                      className="min-h-[44px] px-3.5 sm:px-4 py-2.5 rounded-xl bg-purple-500/20 border border-purple-400/50 hover:bg-purple-500/30 text-purple-300 hover:text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
                      title={`Study all ${globalCategoryCounts[selectedCategory]} ${selectedCategory} questions in Flashcards`}
                    >
                      <Layers className="w-4 h-4 text-purple-300" />
                      <span>Flashcards ({globalCategoryCounts[selectedCategory]})</span>
                    </button>

                    <button
                      id="clear-active-category-btn"
                      type="button"
                      onClick={() => handleCategorySelect('All')}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                      title="Clear category filter"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section Heading with Dynamic Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Choose a Model Question</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {filteredSets.length} Sets Available
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {selectedCategory !== 'All' ? (
                <>
                  Showing <strong>{filteredSets.length}</strong> sets containing{' '}
                  <strong className="text-cyan-300">{selectedCategory}</strong> questions.
                </>
              ) : searchQuery ? (
                <>
                  Showing <strong>{filteredSets.length}</strong> sets matching &quot;{searchQuery}&quot;.
                </>
              ) : (
                <>{totalQuestionsAllSets} comprehensive questions curated with grammatical breakdowns.</>
              )}
            </p>
          </div>

          {/* Timer status badge */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
            <span>
              Total: <strong>{settings.enableTotalTimer ? `${settings.totalTimeMinutes}m` : 'Off'}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span>
              Per-MCQ: <strong>{settings.enableQuestionTimer ? `${settings.questionTimeSeconds}s` : 'Off'}</strong>
            </span>
          </div>
        </div>

        {/* Empty State when no sets match filters */}
        {filteredSets.length === 0 ? (
          <div className="py-16 text-center p-8 rounded-3xl bg-slate-900/50 border border-slate-800 max-w-lg mx-auto">
            <Filter className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">No Model Questions Match</h4>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              No sets match your current search query &quot;{searchQuery}&quot; and category &quot;
              {selectedCategory}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Grid of Model Question Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredSets.map((modelSet, idx) => (
              <ModelQuestionCard
                key={modelSet.id}
                modelSet={modelSet}
                idx={idx}
                totalSets={questionSets.length}
                bestScore={bestScoresMap.get(modelSet.id) ?? null}
                enableTotalTimer={settings.enableTotalTimer}
                totalTimeMinutes={settings.totalTimeMinutes}
                soundEffects={settings.soundEffects}
                selectedCategory={selectedCategory}
                onSelect={onSelectModel}
                onOpenFlashcards={onOpenFlashcards}
                onSelectCategory={handleCategorySelect}
                onPracticeCategoryInSet={handlePracticeCategoryInSet}
              />
            ))}
          </div>
        )}
          </>
        )}
      </main>

      {/* Weak Areas Focused Remediation Modal */}
      <WeakAreasModal
        isOpen={isWeakAreasModalOpen}
        onClose={handleCloseWeakAreasModal}
        scoreRecords={scoreRecords}
        allSets={questionSets}
        settings={settings}
        onStartCustomPractice={handleStartPracticeCustomSet}
        onOpenCustomFlashcards={handleOpenFlashcardsCustomSet}
      />

      {/* Modern Colorful Footer */}
      <Footer />
    </div>
  );
});

ModelQuestionDashboard.displayName = 'ModelQuestionDashboard';
