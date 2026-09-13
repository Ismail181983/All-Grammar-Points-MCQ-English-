import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Search,
  Filter,
  Flame,
  Clock,
  Zap,
  TrendingUp,
  UserCheck,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { ScoreRecord, StudentProfile, GlobalLeaderboardEntry } from '../types';
import {
  computeGlobalLeaderboard,
  formatLeaderboardDuration,
  resetSimulatedLeaderboard,
} from '../utils/globalLeaderboard';
import { soundManager } from '../utils/sound';

interface GlobalLeaderboardProps {
  scoreRecords: ScoreRecord[];
  studentProfile: StudentProfile;
  soundEffects: boolean;
  onSelectModel: (modelNumber: number) => void;
}

export const GlobalLeaderboard: React.FC<GlobalLeaderboardProps> = ({
  scoreRecords,
  studentProfile,
  soundEffects,
  onSelectModel,
}) => {
  const [selectedModel, setSelectedModel] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Compute live ranking combining stored simulated peers with current student's actual records
  const leaderboardResult = useMemo(() => {
    return computeGlobalLeaderboard(scoreRecords, studentProfile, selectedModel);
  }, [scoreRecords, studentProfile, selectedModel]);

  // Filter top 10 or all based on search query
  const displayedEntries = useMemo(() => {
    const list = leaderboardResult.top10;
    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase();
    return leaderboardResult.allRanked
      .filter(
        (e) =>
          e.studentName.toLowerCase().includes(query) ||
          e.roll.toLowerCase().includes(query) ||
          e.targetExam.toLowerCase().includes(query) ||
          e.institution.toLowerCase().includes(query)
      )
      .slice(0, 10);
  }, [leaderboardResult, searchQuery]);

  // Top 3 Podium entries (from unfiltered top 10)
  const top3 = useMemo(() => {
    return leaderboardResult.top10.slice(0, 3);
  }, [leaderboardResult.top10]);

  const handleReset = () => {
    if (soundEffects) soundManager.playClick();
    resetSimulatedLeaderboard();
    setNotificationMsg('Leaderboard refreshed to standard competitive cohort.');
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleModelClick = (modelNum: number) => {
    if (soundEffects) soundManager.playClick();
    onSelectModel(modelNum);
  };

  const currentUser = leaderboardResult.currentUserEntry;
  const userRank = leaderboardResult.currentUserRank;
  const isInTop10 = userRank !== null && userRank <= 10;

  return (
    <div id="global-leaderboard-container" className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)] text-white">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Live Simulated System
              </span>

              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-black flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Top 10 High Achievers
              </span>

              <span className="text-xs text-slate-400">
                Total Candidates: <strong className="text-slate-200">{leaderboardResult.totalCandidates}</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Global Leaderboard & Rankings
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time competitive benchmark comparing your performance against peer aspirants across{' '}
              <strong className="text-cyan-300">BCS, University Admission & Job Exams</strong> in Bangladesh.
              Rankings are calculated dynamically by score accuracy, speed, and model set difficulty.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end flex-wrap">
            <button
              type="button"
              id="refresh-leaderboard-btn"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Reset simulated cohort rankings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Cohort</span>
            </button>

            <button
              type="button"
              id="challenge-top-rank-btn"
              onClick={() => handleModelClick(1)}
              className="min-h-[42px] px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Challenge #1 Rank</span>
            </button>
          </div>
        </div>

        {notificationMsg && (
          <div className="mt-4 p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xs font-semibold text-cyan-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
        )}
      </div>

      {/* Current User's Standing Card */}
      <div
        id="user-standing-card"
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isInTop10
            ? 'bg-gradient-to-r from-emerald-950/60 via-teal-950/60 to-slate-950 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
            : userRank !== null
            ? 'bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border-cyan-500/40'
            : 'bg-slate-900/80 border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-md shrink-0 ${
                isInTop10
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950'
              }`}
            >
              {userRank ? `#${userRank}` : '—'}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Your Standing
                </span>
                {isInTop10 && (
                  <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase">
                    🏆 In Top 10
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {studentProfile.name}{' '}
                <span className="text-xs text-slate-400 font-mono font-normal">
                  (Roll: {studentProfile.roll})
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                {userRank !== null ? (
                  <>
                    Ranked <strong className="text-cyan-300">#{userRank}</strong> of{' '}
                    {leaderboardResult.totalCandidates} candidates (Top{' '}
                    <strong className="text-amber-300">{leaderboardResult.percentileRank}%</strong>)
                    {currentUser && (
                      <>
                        {' '}
                        • Best: <strong className="text-emerald-400">{currentUser.score}/{currentUser.totalQuestions} ({currentUser.percentage}%)</strong> in {formatLeaderboardDuration(currentUser.timeSpentSeconds)}
                      </>
                    )}
                  </>
                ) : (
                  'You haven\'t completed any tests yet. Complete a Model Question set to establish your global rank!'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => handleModelClick(1)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{userRank ? 'Improve Your Rank' : 'Take Exam Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Champions Podium Showcase */}
      {top3.length >= 3 && selectedModel === 'all' && !searchQuery && (
        <div id="leaderboard-podium" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 p-5 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-600/60 shadow-md flex flex-col justify-between text-center relative overflow-hidden">
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-slate-700/80 text-slate-300 font-black text-xs flex items-center gap-1">
              <Medal className="w-3.5 h-3.5 text-slate-300" />
              <span>2nd Place</span>
            </div>

            <div className="my-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg border-2 border-slate-200">
                {top3[1].studentName.charAt(0)}
              </div>
              <h4 className="mt-2 text-base font-black text-white">{top3[1].studentName}</h4>
              <p className="text-xs text-slate-400 font-mono">Roll: {top3[1].roll}</p>
              <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300 text-[10px] font-bold">
                {top3[1].institution}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-700/60 flex items-center justify-around text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Score</span>
                <span className="font-black text-emerald-400">{top3[1].score}/{top3[1].totalQuestions}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Time</span>
                <span className="font-bold text-slate-300">{formatLeaderboardDuration(top3[1].timeSpentSeconds)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Accuracy</span>
                <span className="font-black text-cyan-300">{top3[1].percentage}%</span>
              </div>
            </div>
          </div>

          {/* 1st Place (Champion) */}
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-950/70 via-slate-900 to-slate-950 border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.25)] flex flex-col justify-between text-center relative overflow-hidden transform md:-translate-y-2">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
            
            <div className="flex justify-center mb-1">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/60 font-black text-xs flex items-center gap-1.5 shadow-sm">
                <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                1st Place Champion
              </span>
            </div>

            <div className="my-4 flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-xl border-4 border-amber-200">
                  {top3[0].studentName.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-400 text-slate-950 shadow">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <h4 className="mt-2.5 text-lg font-black text-white">{top3[0].studentName}</h4>
              <p className="text-xs text-amber-300/90 font-mono">Roll: {top3[0].roll}</p>
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-200 text-[11px] font-bold border border-amber-400/30">
                {top3[0].targetExam}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">{top3[0].institution}</span>
            </div>

            <div className="pt-3 border-t border-amber-500/30 flex items-center justify-around text-xs bg-amber-950/30 -mx-6 -mb-6 p-4 rounded-b-3xl">
              <div>
                <span className="text-[10px] text-amber-300/80 block">Score</span>
                <span className="font-black text-lg text-amber-300">{top3[0].score}/{top3[0].totalQuestions}</span>
              </div>
              <div>
                <span className="text-[10px] text-amber-300/80 block">Speed</span>
                <span className="font-bold text-sm text-white">{formatLeaderboardDuration(top3[0].timeSpentSeconds)}</span>
              </div>
              <div>
                <span className="text-[10px] text-amber-300/80 block">Accuracy</span>
                <span className="font-black text-lg text-emerald-400">{top3[0].percentage}%</span>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 md:order-3 p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-800/90 to-slate-900 border border-amber-700/50 shadow-md flex flex-col justify-between text-center relative overflow-hidden">
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-amber-900/60 text-amber-300 font-black text-xs flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>3rd Place</span>
            </div>

            <div className="my-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 font-black text-xl flex items-center justify-center shadow-lg border-2 border-amber-500/60">
                {top3[2].studentName.charAt(0)}
              </div>
              <h4 className="mt-2 text-base font-black text-white">{top3[2].studentName}</h4>
              <p className="text-xs text-slate-400 font-mono">Roll: {top3[2].roll}</p>
              <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300 text-[10px] font-bold">
                {top3[2].institution}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-700/60 flex items-center justify-around text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Score</span>
                <span className="font-black text-emerald-400">{top3[2].score}/{top3[2].totalQuestions}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Time</span>
                <span className="font-bold text-slate-300">{formatLeaderboardDuration(top3[2].timeSpentSeconds)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Accuracy</span>
                <span className="font-black text-cyan-300">{top3[2].percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Controls */}
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-inner">
        {/* Model Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 pl-1 pr-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Filter Model:
          </span>

          <button
            type="button"
            onClick={() => setSelectedModel('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedModel === 'all'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            All Models
          </button>

          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setSelectedModel(num)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedModel === num
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              Model {num}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search student, roll, exam..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Top 10 Ranked List */}
      <div className="rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              {searchQuery
                ? `Search Results (${displayedEntries.length})`
                : selectedModel === 'all'
                ? 'Official Top 10 High Achievers'
                : `Model Question ${selectedModel} — Top 10`}
            </h3>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {displayedEntries.length} Ranked
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {displayedEntries.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <p className="font-semibold">No students found matching &quot;{searchQuery}&quot;.</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-cyan-400 hover:underline cursor-pointer"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            displayedEntries.map((entry) => {
              const isFirst = entry.rank === 1;
              const isSecond = entry.rank === 2;
              const isThird = entry.rank === 3;
              const isMe = entry.isCurrentUser;

              return (
                <div
                  key={entry.id}
                  className={`p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4 transition-colors ${
                    isMe
                      ? 'bg-cyan-950/40 border-l-4 border-cyan-400 hover:bg-cyan-950/60'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  {/* Left info: Rank, Avatar, Student Details */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Rank Badge */}
                    <div className="w-8 sm:w-10 flex items-center justify-center shrink-0">
                      {isFirst ? (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-300 to-yellow-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                          1
                        </div>
                      ) : isSecond ? (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950 font-black text-sm flex items-center justify-center shadow">
                          2
                        </div>
                      ) : isThird ? (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 text-amber-100 font-black text-sm flex items-center justify-center shadow">
                          3
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-black text-xs flex items-center justify-center border border-slate-700">
                          #{entry.rank}
                        </div>
                      )}
                    </div>

                    {/* Student Avatar */}
                    <div
                      className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${entry.avatarColor} text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-md`}
                    >
                      {entry.studentName.charAt(0)}
                    </div>

                    {/* Name & Academic Meta */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm sm:text-base text-white">
                          {entry.studentName}
                        </span>

                        {isMe && (
                          <span className="px-2 py-0.2 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                            YOU
                          </span>
                        )}

                        <span className="text-xs text-slate-400 font-mono">
                          Roll: {entry.roll}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium">
                          {entry.targetExam}
                        </span>
                        <span className="text-slate-400 text-[11px]">• {entry.institution}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right metrics: Model, Score, Speed, Date */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-slate-400 block">
                        Model {entry.modelNumber}
                      </span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {formatLeaderboardDuration(entry.timeSpentSeconds)}
                      </span>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <div className="text-sm sm:text-base font-black text-emerald-400">
                        {entry.score}/{entry.totalQuestions}
                      </div>
                      <span className="inline-block px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black">
                        {entry.percentage}%
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleModelClick(entry.modelNumber)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition cursor-pointer"
                      title={`Try Model Question ${entry.modelNumber}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
