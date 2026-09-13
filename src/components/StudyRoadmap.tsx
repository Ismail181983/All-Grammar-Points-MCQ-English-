import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  CheckCircle2,
  Play,
  Layers,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Clock,
} from 'lucide-react';
import {
  ModelQuestionSet,
  ScoreRecord,
  GrammarCategory,
  RoadmapDifficulty,
  RoadmapModule,
} from '../types';
import { STUDY_ROADMAP_MODULES } from '../data/roadmapData';
import { analyzeUserWeakAreas } from '../utils/weakAreas';
import { getGlobalCategoryCounts } from '../utils/categories';
import { soundManager } from '../utils/sound';
import { computeAdaptiveDifficultyProfile } from '../utils/adaptiveDifficulty';

interface StudyRoadmapProps {
  questionSets: ModelQuestionSet[];
  scoreRecords: ScoreRecord[];
  soundEffects: boolean;
  onStartCategoryPractice: (category: GrammarCategory) => void;
  onOpenCategoryFlashcards: (category: GrammarCategory) => void;
}

export const StudyRoadmap: React.FC<StudyRoadmapProps> = ({
  questionSets,
  scoreRecords,
  soundEffects,
  onStartCategoryPractice,
  onOpenCategoryFlashcards,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<RoadmapDifficulty | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [adaptiveMode, setAdaptiveMode] = useState<boolean>(true);

  // Compute Adaptive Difficulty Profile
  const adaptiveProfile = useMemo(() => {
    return computeAdaptiveDifficultyProfile(scoreRecords, questionSets);
  }, [scoreRecords, questionSets]);

  // Analyze performance per category
  const weakAreasReport = useMemo(() => {
    return analyzeUserWeakAreas(scoreRecords, questionSets);
  }, [scoreRecords, questionSets]);

  // Global question counts per category in the database
  const globalCategoryCounts = useMemo(() => {
    return getGlobalCategoryCounts(questionSets);
  }, [questionSets]);

  // Map category performance
  const performanceMap = useMemo(() => {
    const map = new Map<GrammarCategory, { correct: number; total: number; percentage: number }>();
    for (const perf of weakAreasReport.allTestedCategories) {
      map.set(perf.category, {
        correct: perf.correct,
        total: perf.total,
        percentage: perf.percentage,
      });
    }
    return map;
  }, [weakAreasReport.allTestedCategories]);

  // Calculate stats for each module
  const modulesWithProgress = useMemo(() => {
    return STUDY_ROADMAP_MODULES.map((mod) => {
      const perf = performanceMap.get(mod.category);
      const totalAttempts = perf?.total || 0;
      const correctAttempts = perf?.correct || 0;
      const accuracy = perf?.percentage || 0;

      // Criteria: Mastered if at least 5 questions attempted with >= 75% accuracy
      let status: 'not-started' | 'in-progress' | 'mastered' = 'not-started';
      if (totalAttempts > 0) {
        if (accuracy >= 75 && totalAttempts >= 5) {
          status = 'mastered';
        } else {
          status = 'in-progress';
        }
      }

      const availableQuestions = globalCategoryCounts[mod.category] || 0;

      return {
        ...mod,
        totalAttempts,
        correctAttempts,
        accuracy,
        status,
        availableQuestions,
      };
    });
  }, [performanceMap, globalCategoryCounts]);

  // Determine the next recommended module (first unmastered module in sequential order)
  const nextRecommendedModule = useMemo(() => {
    return modulesWithProgress.find((m) => m.status !== 'mastered') || modulesWithProgress[0];
  }, [modulesWithProgress]);

  // Total summary metrics
  const masteredCount = useMemo(() => {
    return modulesWithProgress.filter((m) => m.status === 'mastered').length;
  }, [modulesWithProgress]);

  const inProgressCount = useMemo(() => {
    return modulesWithProgress.filter((m) => m.status === 'in-progress').length;
  }, [modulesWithProgress]);

  const pathCompletionPercentage = Math.round(
    (masteredCount / STUDY_ROADMAP_MODULES.length) * 100
  );

  // Student Rank Title based on mastered count
  const studentRank = useMemo(() => {
    if (masteredCount >= 12) return { title: 'Master Grammarian', stage: 'Stage 3: Mastery', color: 'text-amber-300' };
    if (masteredCount >= 8) return { title: 'Precision Grammarian', stage: 'Stage 3: Advanced', color: 'text-purple-300' };
    if (masteredCount >= 4) return { title: 'Structural Syntactician', stage: 'Stage 2: Intermediate', color: 'text-cyan-300' };
    return { title: 'Foundational Explorer', stage: 'Stage 1: Beginner', color: 'text-emerald-300' };
  }, [masteredCount]);

  // Filtered modules based on user controls
  const filteredModules = useMemo(() => {
    return modulesWithProgress.filter((mod) => {
      if (selectedDifficulty !== 'all' && mod.difficulty !== selectedDifficulty) {
        return false;
      }
      if (statusFilter === 'mastered' && mod.status !== 'mastered') {
        return false;
      }
      if (statusFilter === 'unmastered' && mod.status === 'mastered') {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = mod.title.toLowerCase().includes(q);
        const matchDesc = mod.description.toLowerCase().includes(q);
        const matchTopics = mod.keyTopics.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTopics) return false;
      }
      return true;
    });
  }, [modulesWithProgress, selectedDifficulty, statusFilter, searchQuery]);

  const toggleExpand = useCallback(
    (id: string) => {
      if (soundEffects) soundManager.playClick();
      setExpandedModuleId((prev) => (prev === id ? null : id));
    },
    [soundEffects]
  );

  const handleStartPractice = useCallback(
    (category: GrammarCategory) => {
      if (soundEffects) soundManager.playClick();
      onStartCategoryPractice(category);
    },
    [soundEffects, onStartCategoryPractice]
  );

  const handleOpenFlashcards = useCallback(
    (category: GrammarCategory) => {
      if (soundEffects) soundManager.playClick();
      onOpenCategoryFlashcards(category);
    },
    [soundEffects, onOpenCategoryFlashcards]
  );

  return (
    <div id="study-roadmap-container" className="space-y-6 sm:space-y-8">
      {/* 1. Roadmap Hero Header & Progress Tracker */}
      <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-950/95 via-indigo-950/40 to-slate-900/95 border border-indigo-500/40 shadow-[0_0_35px_rgba(99,102,241,0.15)] relative overflow-hidden backdrop-blur-2xl">
        {/* Top Accent Gradient */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-black uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>Syllabus &amp; Learning Path</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>English Grammar Study Roadmap</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A structured, difficulty-based syllabus designed to guide you step-by-step from beginner grammar foundations to advanced sentence synthesis and competitive exam mastery.
            </p>

            {/* Current Level & Rank Badge */}
            <div className="pt-1 flex items-center gap-3 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold">Your Rank:</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-indigo-500/40 text-xs font-black ${studentRank.color}`}>
                <Award className="w-3.5 h-3.5" />
                {studentRank.title} ({studentRank.stage})
              </span>
            </div>
          </div>

          {/* Right: Path Completion Meter */}
          <div className="w-full lg:w-72 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shrink-0 shadow-inner flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Path Completion
              </span>
              <span className="text-xs font-black font-mono text-cyan-300">
                {masteredCount} / {STUDY_ROADMAP_MODULES.length} Mastered
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-3.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pathCompletionPercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              />
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>{pathCompletionPercentage}% Complete</span>
              <span className="text-amber-300 font-bold">{inProgressCount} In Progress</span>
            </div>
          </div>
        </div>

        {/* Adaptive Difficulty Mode / Recommended Module Highlight Box */}
        <div className="mt-6 pt-5 border-t border-indigo-500/20">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/40 border border-indigo-500/40 shadow-lg relative overflow-hidden">
            {/* Top Bar with Mode Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-500/20 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/40 text-indigo-300">
                  <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                </div>
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    Adaptive Difficulty Mode
                    <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-black">
                      Active AI Skill Monitor
                    </span>
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Monitors your quiz performance to automatically suggest the optimal grammar module.
                  </p>
                </div>
              </div>

              {/* Student Skill Assessment Strip */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-400">Current Level:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-black">
                  {adaptiveProfile.levelTitle} ({adaptiveProfile.skillLevel.toUpperCase()})
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono font-bold">
                  Avg: {adaptiveProfile.averagePercentage}%
                </span>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${
                  adaptiveProfile.recentTrend === 'improving'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : adaptiveProfile.recentTrend === 'declining'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  Trend: {adaptiveProfile.recentTrend === 'improving' ? 'Improving' : adaptiveProfile.recentTrend === 'declining' ? 'Reviewing' : 'Stable'}
                </span>
              </div>
            </div>

            {/* Recommended Module Details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-cyan-400 to-teal-400 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-lg">
                  #{adaptiveProfile.recommendedModule.step}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      Suggested Module for Your Skill Level
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase border ${
                      adaptiveProfile.recommendedModule.difficulty === 'beginner'
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : adaptiveProfile.recommendedModule.difficulty === 'intermediate'
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                    }`}>
                      {adaptiveProfile.recommendedModule.stage}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-white">
                    {adaptiveProfile.recommendedModule.title}
                  </h4>
                  <p className="text-xs text-indigo-200/90 leading-relaxed font-medium">
                    {adaptiveProfile.recommendationReason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleStartPractice(adaptiveProfile.recommendedModule.category)}
                  className="w-full sm:w-auto min-h-[42px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 hover:brightness-110 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  title="Practice 25 MCQs tailored to your skill level"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Start Adaptive Practice (25 MCQs)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenCategoryFlashcards(adaptiveProfile.recommendedModule.category)}
                  className="min-h-[42px] px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Study flashcards for this recommended module"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Flashcards</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filters & Topic Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Difficulty Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              if (soundEffects) soundManager.playClick();
              setSelectedDifficulty('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedDifficulty === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Stages ({STUDY_ROADMAP_MODULES.length})
          </button>

          <button
            type="button"
            onClick={() => {
              if (soundEffects) soundManager.playClick();
              setSelectedDifficulty('beginner');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              selectedDifficulty === 'beginner'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-emerald-300/80 hover:text-emerald-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Beginner (Level 1)
          </button>

          <button
            type="button"
            onClick={() => {
              if (soundEffects) soundManager.playClick();
              setSelectedDifficulty('intermediate');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              selectedDifficulty === 'intermediate'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-amber-300/80 hover:text-amber-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Intermediate (Level 2)
          </button>

          <button
            type="button"
            onClick={() => {
              if (soundEffects) soundManager.playClick();
              setSelectedDifficulty('advanced');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              selectedDifficulty === 'advanced'
                ? 'bg-purple-500 text-slate-950 shadow-sm'
                : 'text-purple-300/80 hover:text-purple-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Advanced (Level 3)
          </button>
        </div>

        {/* Right Search Input & Status Filter */}
        <div className="flex items-center gap-2 flex-1 md:max-w-md justify-end">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search grammar topics..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              if (soundEffects) soundManager.playClick();
              setStatusFilter(e.target.value as any);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="unmastered">Needs Practice</option>
            <option value="mastered">Mastered Only</option>
          </select>
        </div>
      </div>

      {/* 3. Sequential Roadmap Modules Grid */}
      <div className="space-y-4">
        {filteredModules.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-500" />
            <p className="text-sm font-semibold text-slate-300">No modules match your current filter.</p>
            <p className="text-xs mt-1">Try resetting the difficulty or search query.</p>
          </div>
        ) : (
          filteredModules.map((module) => {
            const isExpanded = expandedModuleId === module.id;
            const isAdaptiveRecommended = adaptiveProfile.recommendedModule?.id === module.id;
            const isNext = nextRecommendedModule?.id === module.id;

            // Difficulty Color Palettes
            const difficultyBadge =
              module.difficulty === 'beginner'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : module.difficulty === 'intermediate'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-purple-500/20 border-purple-500/40 text-purple-300';

            const statusBadge =
              module.status === 'mastered' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Mastered ({module.accuracy}%)
                </span>
              ) : isAdaptiveRecommended ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 border border-cyan-400/60 text-cyan-200 text-xs font-black animate-pulse">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Suggested for Your Level
                </span>
              ) : module.status === 'in-progress' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> In Progress ({module.accuracy}%)
                </span>
              ) : isNext ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-black animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Next in Path
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium">
                  Not Started
                </span>
              );

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isAdaptiveRecommended
                    ? 'bg-slate-950/95 border-cyan-400/70 shadow-[0_0_25px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/40'
                    : isNext
                    ? 'bg-slate-950/95 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                    : module.status === 'mastered'
                    ? 'bg-slate-950/90 border-emerald-500/30 hover:border-emerald-500/60'
                    : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Module Main Bar */}
                <div className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  {/* Left: Step Circle + Title + Badges */}
                  <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                    {/* Step Number Badge */}
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border transition-all ${
                        module.status === 'mastered'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm'
                          : isNext
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {module.status === 'mastered' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <span>#{module.step}</span>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-extrabold uppercase tracking-wider border ${difficultyBadge}`}>
                          {module.difficulty}
                        </span>

                        <span className="text-[11px] text-slate-400 font-medium hidden xs:inline">
                          {module.stageName}
                        </span>

                        {statusBadge}
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-cyan-300 transition tracking-tight">
                        {module.title}
                      </h3>

                      <p className="text-xs text-slate-300/80 leading-relaxed max-w-2xl">
                        {module.description}
                      </p>

                      {/* Quick Meta Stats */}
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                          {module.availableQuestions} Questions in Bank
                        </span>
                        <span className="h-2.5 w-px bg-slate-700" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          ~{module.estimatedMinutes} Mins Practice
                        </span>
                        {module.totalAttempts > 0 && (
                          <>
                            <span className="h-2.5 w-px bg-slate-700" />
                            <span className="text-cyan-300 font-semibold">
                              Tested: {module.correctAttempts}/{module.totalAttempts} ({module.accuracy}%)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 justify-end">
                    {/* Toggle Syllabus Details */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(module.id)}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      title="View key topics and exam tip"
                    >
                      <span>{isExpanded ? 'Hide Topics' : 'Topics & Tips'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Flashcards */}
                    <button
                      type="button"
                      onClick={() => handleOpenFlashcards(module.category)}
                      className="px-3 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                      title="Review questions in flashcard mode"
                    >
                      <Layers className="w-3.5 h-3.5 text-purple-300" />
                      <span className="hidden sm:inline">Flashcards</span>
                    </button>

                    {/* Practice 25 MCQs */}
                    <button
                      type="button"
                      onClick={() => handleStartPractice(module.category)}
                      className={`min-h-[40px] px-4 py-2 rounded-xl font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md ${
                        isNext
                          ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-slate-950 hover:brightness-110'
                          : module.status === 'mastered'
                          ? 'bg-slate-800 hover:bg-slate-700 border border-emerald-500/50 text-emerald-200 hover:text-white'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:brightness-110'
                      }`}
                      title={`Launch dedicated practice test for ${module.title}`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Practice (25 MCQs)</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Syllabus & Exam Tips Accordion */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-slate-800/80 bg-slate-900/40 px-4 sm:px-6 py-4 space-y-3"
                    >
                      {/* Key Topics List */}
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                          <BookOpen className="w-3.5 h-3.5" />
                          Key Syllabus Topics &amp; Rules
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                          {module.keyTopics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 bg-slate-900/70 p-2 rounded-xl border border-slate-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Exam Tip Callout */}
                      <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/40 to-yellow-950/30 border border-amber-500/40 flex items-start gap-2.5 text-xs">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 font-bold block mb-0.5">Competitive Exam Tip:</strong>
                          <p className="text-slate-200">{module.examTip}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
