import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  X,
  Search,
  Filter,
  Trash2,
  Download,
  Calendar,
  User,
  Hash,
  Award,
  Clock,
  Printer,
  Sparkles,
  CheckCircle2,
  Lock,
  TrendingUp,
  TrendingDown,
  Scale,
  ArrowRight,
  Minus,
  Check,
  Zap,
} from 'lucide-react';
import { ScoreRecord, BadgeProgress, CategoryScoreDetail } from '../types';
import { getTierStyle } from '../utils/badges';
import { BadgeIcon } from './BadgeIcon';
import { ScoreProgressionChart } from './ScoreProgressionChart';
import { ALL_GRAMMAR_CATEGORIES, CATEGORY_META_MAP } from '../utils/categories';
import { modelQuestionSets } from '../data/questions';

interface ScoreBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: ScoreRecord[];
  onClearScores: () => void;
  badges?: BadgeProgress[];
  onStartSmartReplay?: (record: ScoreRecord) => void;
}

export const ScoreBoardModal: React.FC<ScoreBoardModalProps> = ({
  isOpen,
  onClose,
  scores,
  onClearScores,
  badges = [],
  onStartSmartReplay,
}) => {
  const [activeTab, setActiveTab] = useState<'scores' | 'trophies' | 'compare'>('scores');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState<number | 'all'>('all');
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showProgressionChart, setShowProgressionChart] = useState(true);

  // Compare Quizzes States (Attempt A vs Attempt B)
  const [compareId1, setCompareId1] = useState<string>(() => scores[1]?.id || scores[0]?.id || '');
  const [compareId2, setCompareId2] = useState<string>(() => scores[0]?.id || '');

  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  // Filter scores
  const filteredScores = scores.filter((rec) => {
    const matchesModel = selectedModel === 'all' || rec.modelNumber === selectedModel;
    const matchesSearch =
      rec.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.roll.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesModel && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (scores.length === 0) return;
    const headers = 'ID,Name,Roll,Model Question,Score,Total,Percentage,Duration (Seconds),Date\n';
    const rows = scores
      .map(
        (s) =>
          `"${s.id}","${s.userName}","${s.roll}","${s.modelTitle}",${s.score},${s.totalQuestions},${s.percentage}%,${s.timeSpentSeconds},"${s.date}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Permanent_Score_Board_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Selected attempt objects for side-by-side comparison
  const attempt1 = useMemo(() => {
    return scores.find((s) => s.id === compareId1) || (scores.length > 1 ? scores[1] : scores[0]);
  }, [scores, compareId1]);

  const attempt2 = useMemo(() => {
    return scores.find((s) => s.id === compareId2) || scores[0];
  }, [scores, compareId2]);

  // Compute category comparison metrics
  const categoryComparison = useMemo(() => {
    if (!attempt1 || !attempt2) return [];

    const catKeys = new Set<string>();
    if (attempt1.categoryScores) Object.keys(attempt1.categoryScores).forEach((k) => catKeys.add(k));
    if (attempt2.categoryScores) Object.keys(attempt2.categoryScores).forEach((k) => catKeys.add(k));

    return Array.from(catKeys).map((cat) => {
      const c1: CategoryScoreDetail = attempt1.categoryScores?.[cat] || { correct: 0, total: 0 };
      const c2: CategoryScoreDetail = attempt2.categoryScores?.[cat] || { correct: 0, total: 0 };

      const pct1 = c1.total > 0 ? Math.round((c1.correct / c1.total) * 100) : 0;
      const pct2 = c2.total > 0 ? Math.round((c2.correct / c2.total) * 100) : 0;
      const diff = pct2 - pct1;

      return {
        category: cat,
        c1,
        c2,
        pct1,
        pct2,
        diff,
      };
    }).sort((a, b) => b.diff - a.diff);
  }, [attempt1, attempt2]);

  const handleSelectForCompare = (recordId: string) => {
    if (!compareId1 || compareId1 === recordId) {
      setCompareId1(recordId);
    } else {
      setCompareId2(recordId);
    }
    setActiveTab('compare');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0F172A] border border-blue-500/40 shadow-[0_0_50px_rgba(30,58,138,0.4)] text-white overflow-hidden"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-5 lg:p-6 border-b border-blue-500/25 flex items-center justify-between gap-2.5 sm:gap-4 bg-[#0B132B]/90">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-xl font-black text-white tracking-tight">
                Permanent Score Board
              </h3>
              <p className="text-[10px] sm:text-xs text-cyan-300 truncate max-w-[190px] xs:max-w-[280px] sm:max-w-none">
                Persistent track record of student practice attempts and scores
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {activeTab === 'scores' && (
              <>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition cursor-pointer"
                  title="Print Score Sheet"
                >
                  <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={scores.length === 0}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition disabled:opacity-40 cursor-pointer"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-700 transition cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center px-4 sm:px-6 bg-slate-950 border-b border-slate-800 gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('scores')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
              activeTab === 'scores'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Score Records ({scores.length})</span>
          </button>

          <button
            type="button"
            id="tab-compare-quizzes-btn"
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
              activeTab === 'compare'
                ? 'border-indigo-400 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-4 h-4 text-indigo-400" />
            <span>Compare Quizzes</span>
            {scores.length >= 2 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-[10px] text-indigo-300 font-black">
                Side-by-Side
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trophies')}
            className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
              activeTab === 'trophies'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Trophy Cabinet ({unlockedCount}/{badges.length})</span>
          </button>
        </div>

        {activeTab === 'scores' ? (
          <>
            {/* Filter Controls Bar */}
            <div className="p-3 sm:p-4 bg-slate-950/50 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:flex-1 sm:min-w-[200px]">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Student Name or Roll..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Model Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedModel('all')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold transition shrink-0 cursor-pointer ${
                selectedModel === 'all'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Sets
            </button>
            {modelQuestionSets.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedModel(s.id)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold transition shrink-0 cursor-pointer ${
                  selectedModel === s.id
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Set {s.id}
              </button>
            ))}
          </div>

          {/* Progression chart toggle button */}
          {scores.length > 0 && (
            <button
              type="button"
              id="toggle-progression-chart-btn"
              onClick={() => setShowProgressionChart(!showProgressionChart)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${
                showProgressionChart
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle Score Progression Line Chart"
            >
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showProgressionChart ? 'Hide Chart' : 'Score Trend'}</span>
            </button>
          )}

          {/* Clear history button */}
          {scores.length > 0 && (
            <button
              type="button"
              onClick={() => setShowConfirmClear(true)}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Scores Table & Progression Section */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Score progression line chart over last 10 quiz attempts */}
          {showProgressionChart && scores.length > 0 && (
            <ScoreProgressionChart scores={scores} />
          )}

          {filteredScores.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30 text-amber-400" />
              <h4 className="text-base font-bold text-slate-300">No score records found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Take any Model Question test and click "Check Answer" to permanently record your scores here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                    <th className="py-2.5 px-3">Date & Time</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Roll</th>
                    <th className="py-2.5 px-3">Model Question</th>
                    <th className="py-2.5 px-3">Score</th>
                    <th className="py-2.5 px-3">Accuracy</th>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredScores.map((rec) => {
                    const isHigh = rec.percentage >= 80;
                    return (
                      <tr
                        key={rec.id}
                        className="hover:bg-slate-850/60 transition font-medium text-slate-200"
                      >
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                          {rec.date}
                        </td>
                        <td className="py-3 px-3 font-bold text-white whitespace-nowrap">
                          {rec.userName}
                        </td>
                        <td className="py-3 px-3 font-mono text-cyan-300 whitespace-nowrap">
                          {rec.roll}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-200 font-semibold text-[11px]">
                            {rec.modelTitle}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold whitespace-nowrap">
                          <span className={isHigh ? 'text-emerald-400' : 'text-amber-400'}>
                            {rec.score} / {rec.totalQuestions}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                              isHigh
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {rec.percentage}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                          {Math.floor(rec.timeSpentSeconds / 60)}m {rec.timeSpentSeconds % 60}s
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {onStartSmartReplay && rec.percentage < 100 && (
                              <button
                                type="button"
                                onClick={() => onStartSmartReplay(rec)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition cursor-pointer"
                                title="Smart Replay: Retake questions missed in this test"
                              >
                                <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span>Smart Replay</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleSelectForCompare(rec.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold transition cursor-pointer"
                              title="Compare this quiz attempt"
                            >
                              <Scale className="w-3 h-3" />
                              <span>Compare</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    ) : activeTab === 'compare' ? (
      /* Compare Quizzes Tab */
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 max-h-[65vh]">
        {scores.length < 2 ? (
          <div className="text-center py-12 text-slate-400">
            <Scale className="w-12 h-12 mx-auto mb-3 opacity-30 text-indigo-400" />
            <h4 className="text-base font-bold text-slate-200">Need At Least 2 Quiz Attempts</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Complete at least two quiz sessions to enable in-depth, side-by-side comparison of your accuracy, category growth, and duration progression.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('scores')}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow"
            >
              View Past Scores
            </button>
          </div>
        ) : (
          <>
            {/* Selector Header Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-3">
              {/* Attempt 1 Selector */}
              <div>
                <label className="block text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  Attempt A (Baseline / Older)
                </label>
                <select
                  value={attempt1?.id || ''}
                  onChange={(e) => setCompareId1(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {scores.map((s) => (
                    <option key={`a-${s.id}`} value={s.id}>
                      {s.date} — {s.modelTitle} ({s.score}/{s.totalQuestions} • {s.percentage}%)
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Attempts Button */}
              <div className="flex items-center justify-center pt-2 md:pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const temp = compareId1;
                    setCompareId1(compareId2);
                    setCompareId2(temp);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white border border-slate-700 transition shadow cursor-pointer"
                  title="Swap Attempts"
                >
                  <Scale className="w-4 h-4 text-indigo-400" />
                </button>
              </div>

              {/* Attempt 2 Selector */}
              <div>
                <label className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Attempt B (Comparison / Newer)
                </label>
                <select
                  value={attempt2?.id || ''}
                  onChange={(e) => setCompareId2(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  {scores.map((s) => (
                    <option key={`b-${s.id}`} value={s.id}>
                      {s.date} — {s.modelTitle} ({s.score}/{s.totalQuestions} • {s.percentage}%)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* High-Level Side-by-Side Comparison Cards */}
            {attempt1 && attempt2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  {/* Attempt A Card */}
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40">
                    <div className="flex items-center justify-between text-xs text-cyan-300 font-bold mb-1">
                      <span>Attempt A</span>
                      <span className="text-[10px] text-slate-400 font-mono">{attempt1.date}</span>
                    </div>
                    <h4 className="text-sm font-black text-white truncate">{attempt1.modelTitle}</h4>
                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <div className="text-2xl font-black text-cyan-300 font-mono">
                          {attempt1.score} <span className="text-xs text-slate-400">/ {attempt1.totalQuestions}</span>
                        </div>
                        <div className="text-xs font-bold text-cyan-400">{attempt1.percentage}% Accuracy</div>
                      </div>
                      <div className="text-right text-[11px] text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        {Math.floor(attempt1.timeSpentSeconds / 60)}m {attempt1.timeSpentSeconds % 60}s
                      </div>
                    </div>
                  </div>

                  {/* Central Delta Difference Card */}
                  {(() => {
                    const scoreDiff = attempt2.percentage - attempt1.percentage;
                    const timeDiff = attempt1.timeSpentSeconds - attempt2.timeSpentSeconds;
                    const isImproved = scoreDiff > 0;
                    const isDecreased = scoreDiff < 0;
                    return (
                      <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-500/40 flex flex-col justify-center items-center text-center">
                        <span className="text-[10px] uppercase font-black tracking-widest text-indigo-300">
                          Performance Delta
                        </span>
                        <div className="mt-1 flex items-center gap-1.5 text-2xl font-black">
                          {isImproved ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <TrendingUp className="w-6 h-6" /> +{scoreDiff}%
                            </span>
                          ) : isDecreased ? (
                            <span className="text-rose-400 flex items-center gap-1">
                              <TrendingDown className="w-6 h-6" /> {scoreDiff}%
                            </span>
                          ) : (
                            <span className="text-slate-300 flex items-center gap-1">
                              <Minus className="w-5 h-5" /> 0%
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {isImproved
                            ? 'Accuracy Improved!'
                            : isDecreased
                            ? 'Lower Accuracy'
                            : 'Identical Score'}
                          {timeDiff !== 0 && ` • ${Math.abs(timeDiff)}s ${timeDiff > 0 ? 'faster' : 'slower'}`}
                        </p>
                      </div>
                    );
                  })()}

                  {/* Attempt B Card */}
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40">
                    <div className="flex items-center justify-between text-xs text-emerald-300 font-bold mb-1">
                      <span>Attempt B</span>
                      <span className="text-[10px] text-slate-400 font-mono">{attempt2.date}</span>
                    </div>
                    <h4 className="text-sm font-black text-white truncate">{attempt2.modelTitle}</h4>
                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <div className="text-2xl font-black text-emerald-300 font-mono">
                          {attempt2.score} <span className="text-xs text-slate-400">/ {attempt2.totalQuestions}</span>
                        </div>
                        <div className="text-xs font-bold text-emerald-400">{attempt2.percentage}% Accuracy</div>
                      </div>
                      <div className="text-right text-[11px] text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        {Math.floor(attempt2.timeSpentSeconds / 60)}m {attempt2.timeSpentSeconds % 60}s
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Performance Comparison Matrix */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                  <div className="p-3.5 sm:p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Side-by-Side Category Performance
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Detailed comparison of topic accuracy and growth between attempts
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {categoryComparison.length} Topics
                    </span>
                  </div>

                  {categoryComparison.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      No categorized topic breakdown recorded for these attempts.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                            <th className="py-2.5 px-3 sm:px-4">Grammar Category</th>
                            <th className="py-2.5 px-3 text-center">Attempt A</th>
                            <th className="py-2.5 px-3 text-center">Attempt B</th>
                            <th className="py-2.5 px-3 text-right">Progress Delta</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {categoryComparison.map((cat) => {
                            const meta = CATEGORY_META_MAP[cat.category as any];
                            const isGain = cat.diff > 0;
                            const isLoss = cat.diff < 0;

                            return (
                              <tr key={cat.category} className="hover:bg-slate-850/50 transition">
                                <td className="py-3 px-3 sm:px-4">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${meta?.dotBg || 'bg-cyan-400'}`}></span>
                                    <span className="font-bold text-white text-xs">{cat.category}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <div className="inline-flex flex-col items-center">
                                    <span className="font-mono font-bold text-cyan-300">
                                      {cat.pct1}%
                                    </span>
                                    <span className="text-[10px] text-slate-400">
                                      {cat.c1.correct}/{cat.c1.total}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <div className="inline-flex flex-col items-center">
                                    <span className="font-mono font-bold text-emerald-300">
                                      {cat.pct2}%
                                    </span>
                                    <span className="text-[10px] text-slate-400">
                                      {cat.c2.correct}/{cat.c2.total}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-right whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono text-[11px] font-black ${
                                      isGain
                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                        : isLoss
                                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                                    }`}
                                  >
                                    {isGain ? (
                                      <>
                                        <TrendingUp className="w-3 h-3" /> +{cat.diff}%
                                      </>
                                    ) : isLoss ? (
                                      <>
                                        <TrendingDown className="w-3 h-3" /> {cat.diff}%
                                      </>
                                    ) : (
                                      <>
                                        <Minus className="w-3 h-3" /> 0%
                                      </>
                                    )}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    ) : (
      /* Trophy Cabinet Tab */
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-h-[55vh]">
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs text-slate-300">
              Honors awarded permanently for speed, accuracy, streaks, and quiz completion.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-300 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 shrink-0">
            {unlockedCount} / {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {badges.map((b) => {
            const style = getTierStyle(b.tier);
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
                  b.isUnlocked
                    ? `${style.badgeBg} ${style.badgeBorder} ${style.glow}`
                    : 'bg-slate-900/50 border-slate-800 opacity-60'
                }`}
              >
                <BadgeIcon
                  iconName={b.iconName}
                  tier={b.tier}
                  isUnlocked={b.isUnlocked}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {b.title}
                    </h4>
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded border ${style.pillBg}`}>
                      {b.tier}
                    </span>
                  </div>
                  <p className={`text-[11px] font-semibold mt-0.5 ${style.textColor}`}>
                    {b.subtitle}
                  </p>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                    {b.requirement}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    {b.isUnlocked ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> {b.currentValue} / {b.targetValue}
                      </span>
                    )}
                    <span className="font-mono text-slate-400 font-bold">{b.progressPercent}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}

        {/* Footer Summary */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            {activeTab === 'scores' ? (
              <>Total Entries: <strong className="text-white font-mono">{filteredScores.length}</strong></>
            ) : activeTab === 'compare' ? (
              <>Comparing: <strong className="text-indigo-400 font-mono">2 Quiz Sessions</strong></>
            ) : (
              <>Trophies Earned: <strong className="text-amber-400 font-mono">{unlockedCount} / {badges.length}</strong></>
            )}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>

      {/* Confirmation to clear */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-900 border border-rose-500/40 text-white shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">Clear Permanent Scores?</h4>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              This will permanently delete all recorded quiz results from your browser storage. This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmClear(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearScores();
                  setShowConfirmClear(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow"
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
