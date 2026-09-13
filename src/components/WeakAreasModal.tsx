import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  X,
  Play,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import {
  GrammarCategory,
  ModelQuestionSet,
  ScoreRecord,
  QuizSettings,
} from '../types';
import { CATEGORY_META_MAP } from '../utils/categories';
import { analyzeUserWeakAreas, generateWeakAreasPracticeSet } from '../utils/weakAreas';
import { soundManager } from '../utils/sound';

interface WeakAreasModalProps {
  isOpen: boolean;
  onClose: () => void;
  scoreRecords: ScoreRecord[];
  allSets: ModelQuestionSet[];
  settings: QuizSettings;
  onStartCustomPractice: (customSet: ModelQuestionSet) => void;
  onOpenCustomFlashcards: (customSet: ModelQuestionSet) => void;
}

export const WeakAreasModal: React.FC<WeakAreasModalProps> = ({
  isOpen,
  onClose,
  scoreRecords,
  allSets,
  settings,
  onStartCustomPractice,
  onOpenCustomFlashcards,
}) => {
  const report = useMemo(() => {
    return analyzeUserWeakAreas(scoreRecords, allSets);
  }, [scoreRecords, allSets]);

  const weakAreasSet = useMemo(() => {
    return generateWeakAreasPracticeSet(report.top3WeakCategories, allSets, 25);
  }, [report.top3WeakCategories, allSets]);

  const handleStartPractice = () => {
    if (settings.soundEffects) soundManager.playClick();
    onClose();
    onStartCustomPractice(weakAreasSet);
  };

  const handleStartFlashcards = () => {
    if (settings.soundEffects) soundManager.playClick();
    onClose();
    onOpenCustomFlashcards(weakAreasSet);
  };

  const handlePracticeSingleCategory = (category: GrammarCategory) => {
    if (settings.soundEffects) soundManager.playClick();
    const singleCatSet = generateWeakAreasPracticeSet([category], allSets, 20);
    singleCatSet.title = `Weak Area Focus: ${category}`;
    singleCatSet.subtitle = `Targeted Remediation (${category})`;
    onClose();
    onStartCustomPractice(singleCatSet);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="weak-areas-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="weak-areas-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-slate-900/95 border border-amber-500/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-slate-100 flex flex-col my-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Decorative Line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 rounded-t-3xl" />

          {/* Modal Header */}
          <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-inner">
                <Target className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  Review Weak Areas
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    &lt; 60% Threshold
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Targeted grammar remediation for your lowest scoring categories
                </p>
              </div>
            </div>

            <button
              id="close-weak-areas-modal-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Diagnostic Status Message */}
          <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-700/80 flex items-start gap-3 text-xs sm:text-sm">
            {report.hasBelow60 ? (
              <>
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">
                    {report.identifiedWeakCategories.length}{' '}
                    {report.identifiedWeakCategories.length === 1 ? 'Category' : 'Categories'} consistently scoring below 60%
                  </span>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    We evaluated your quiz history and identified your top weaknesses. Taking this targeted 25-MCQ session will help reinforce grammatical rules and raise your accuracy above 60%.
                  </p>
                </div>
              </>
            ) : report.hasHistory ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-300">
                    All tested categories are currently ≥ 60%!
                  </span>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    Great work! You do not have categories below 60%. To maintain peak performance, we have curated a challenge session from your 3 lowest relative scoring categories.
                  </p>
                </div>
              </>
            ) : (
              <>
                <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cyan-300">
                    Diagnostic Practice Mode (No Quiz History Yet)
                  </span>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    You haven't completed a test yet. Here is a high-yield diagnostic set featuring the 3 traditionally most challenging English grammar categories. Complete this session to calculate your exact weaknesses!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Top 3 Identified Categories List */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Top 3 Focus Categories</span>
              <span className="text-[11px] text-cyan-400 font-normal">
                {weakAreasSet.questions.length} Remediation Questions
              </span>
            </h4>

            {report.top3WeakCategories.map((categoryName, idx) => {
              const meta = CATEGORY_META_MAP[categoryName];
              const perf = report.allTestedCategories.find((p) => p.category === categoryName);
              const hasScore = perf !== undefined;
              const percentage = hasScore ? perf.percentage : null;
              const isBelow60 = percentage !== null && percentage < 60;

              return (
                <div
                  key={categoryName}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isBelow60
                      ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-400/60'
                      : 'bg-slate-800/60 border-slate-700 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                        idx === 0
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : idx === 1
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                      }`}
                    >
                      #{idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm sm:text-base text-white">
                          {categoryName}
                        </span>
                        {isBelow60 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            <TrendingDown className="w-3 h-3" /> Needs Attention
                          </span>
                        ) : hasScore ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            Passing (≥60%)
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            Recommended
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                        {meta?.description || 'Core grammatical rules and applications.'}
                      </p>

                      {/* Performance Bar */}
                      {hasScore && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="w-36 sm:w-44 h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-700/60">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                percentage! < 50
                                  ? 'bg-rose-500'
                                  : percentage! < 60
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(percentage!, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-200">
                            {percentage}% ({perf.correct}/{perf.total})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Single Category Practice Button */}
                  <button
                    type="button"
                    onClick={() => handlePracticeSingleCategory(categoryName)}
                    className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Practice Category</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Practice Session Summary Pill */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-cyan-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <div>
                <span className="font-bold text-white text-xs sm:text-sm">
                  Generated Focused Practice Session: 25 Curated MCQs
                </span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Evenly distributed across your top weak areas with explanations & instant rule citations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {Object.entries(weakAreasSet.categoryBreakdown || {}).map(([cat, count]) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 rounded-lg bg-slate-900/80 border border-slate-700 text-[10px] font-bold text-cyan-300"
                >
                  {cat}: {count}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
            <button
              id="start-weak-areas-flashcards-btn"
              type="button"
              onClick={handleStartFlashcards}
              className="px-4 py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-200 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-purple-300" />
              <span>Study in Flashcards</span>
            </button>

            <button
              id="start-weak-areas-practice-btn"
              type="button"
              onClick={handleStartPractice}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Focused Practice (25 MCQs)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
