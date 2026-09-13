import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, Target, Award, Activity } from 'lucide-react';
import { ScoreRecord } from '../types';

interface ScoreProgressionChartProps {
  scores: ScoreRecord[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPassing = data.percentage >= 60;
    return (
      <div className="p-3 rounded-xl bg-slate-900/95 border border-cyan-500/40 shadow-xl backdrop-blur-md text-white text-xs max-w-xs pointer-events-none">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
          <span className="font-black text-cyan-300 truncate">{data.modelTitle}</span>
          <span className="text-[10px] text-slate-400 font-mono">{data.date}</span>
        </div>
        <div className="flex items-center justify-between gap-3 text-slate-200">
          <span>Score:</span>
          <span className="font-bold text-white font-mono">
            {data.score} / {data.total}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 text-slate-200 mt-0.5">
          <span>Accuracy:</span>
          <span
            className={`font-black font-mono px-1.5 py-0.2 rounded text-[11px] ${
              isPassing ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
            }`}
          >
            {data.percentage}%
          </span>
        </div>
        {data.timeSpent && (
          <div className="flex items-center justify-between gap-3 text-slate-400 mt-0.5 text-[10px]">
            <span>Time Spent:</span>
            <span className="font-mono">{data.timeSpent}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const ScoreProgressionChart: React.FC<ScoreProgressionChartProps> = ({ scores }) => {
  // Take the most recent 10 attempts and order chronologically (oldest to newest among the 10)
  const recent10 = scores.slice(0, 10).reverse();

  if (scores.length === 0) {
    return (
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-slate-400">
        <Activity className="w-8 h-8 mx-auto mb-2 text-cyan-400/50" />
        <p className="text-xs font-semibold text-slate-300">No Quiz Progression Data Yet</p>
        <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
          Complete practice tests to unlock your 10-quiz performance progression chart.
        </p>
      </div>
    );
  }

  // Build chart dataset
  const chartData = recent10.map((item, index) => {
    // Generate a short label: e.g. "Attempt 1" or "Set 3"
    const setMatch = item.modelTitle.match(/\d+/);
    const shortLabel = setMatch ? `Set ${setMatch[0]}` : `#${index + 1}`;
    return {
      attemptNumber: index + 1,
      name: `Attempt ${index + 1}`,
      displayLabel: shortLabel,
      percentage: item.percentage,
      score: item.score,
      total: item.totalQuestions,
      date: item.date,
      modelTitle: item.modelTitle,
      timeSpent: `${Math.floor(item.timeSpentSeconds / 60)}m ${item.timeSpentSeconds % 60}s`,
    };
  });

  // Calculate statistics
  const percentages = recent10.map((r) => r.percentage);
  const highest = Math.max(...percentages);
  const latest = percentages[percentages.length - 1];
  const first = percentages[0];
  const average = Math.round(percentages.reduce((acc, p) => acc + p, 0) / percentages.length);
  const delta = latest - first;

  return (
    <div
      id="score-progression-section"
      className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-cyan-500/30 shadow-lg space-y-4"
    >
      {/* Header and KPI Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>Score Progression Over Time</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] text-cyan-300 font-mono font-bold">
                Last {recent10.length} {recent10.length === 1 ? 'Attempt' : 'Attempts'}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Tracking your accuracy percentage curve across recent practice quizzes
            </p>
          </div>
        </div>

        {/* Quick KPI Stat Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Latest</span>
            <span className="text-xs sm:text-sm font-black text-white font-mono">{latest}%</span>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Average</span>
            <span className="text-xs sm:text-sm font-black text-cyan-300 font-mono">{average}%</span>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Highest</span>
            <span className="text-xs sm:text-sm font-black text-amber-300 font-mono">{highest}%</span>
          </div>

          {recent10.length >= 2 && (
            <div
              className={`px-2.5 py-1 rounded-xl border text-center ${
                delta > 0
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : delta < 0
                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-[10px] uppercase font-bold block">Trend</span>
              <span className="text-xs sm:text-sm font-black font-mono flex items-center justify-center gap-0.5">
                {delta > 0 ? (
                  <>
                    <TrendingUp className="w-3 h-3" />+{delta}%
                  </>
                ) : delta < 0 ? (
                  <>
                    <TrendingDown className="w-3 h-3" />
                    {delta}%
                  </>
                ) : (
                  <>
                    <Minus className="w-3 h-3" />0%
                  </>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Line Chart Container */}
      <div className="w-full h-52 sm:h-56 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 12, right: 16, left: -20, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="displayLabel"
              stroke="#64748b"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              stroke="#64748b"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            {/* 60% Passing threshold line */}
            <ReferenceLine
              y={60}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: '60% Target',
                fill: '#f59e0b',
                fontSize: 10,
                position: 'insideBottomRight',
              }}
            />
            {/* Average accuracy line */}
            <ReferenceLine
              y={average}
              stroke="#06b6d4"
              strokeDasharray="2 2"
              strokeOpacity={0.7}
              strokeWidth={1}
            />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 4, fill: '#06b6d4', stroke: '#0f172a', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#38bdf8', stroke: '#ffffff', strokeWidth: 2 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Footnote */}
      <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
            Accuracy %
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-3 border-b-2 border-dashed border-amber-400 inline-block" />
            60% Competency Benchmark
          </span>
        </div>
        <span className="text-slate-500 font-mono">
          Showing oldest → newest of last {recent10.length} attempts
        </span>
      </div>
    </div>
  );
};
