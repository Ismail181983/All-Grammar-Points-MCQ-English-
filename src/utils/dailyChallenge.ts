import { ModelQuestionSet } from '../types';

export interface DailyChallengeState {
  dateKey: string; // 'YYYY-MM-DD'
  formattedDate: string; // 'Saturday, Sep 12, 2026'
  targetSetId: number;
  bonusPoints: number; // 100
  isCompletedToday: boolean;
  todayScore?: number;
  todayPercentage?: number;
  completedAt?: string;
  currentStreak: number;
  bestStreak: number;
}

const STORAGE_KEYS = {
  DAILY_HISTORY: 'asgk_daily_challenge_history_v1',
  STREAK_INFO: 'asgk_daily_challenge_streak_v1',
};

/**
 * Returns today's date key in YYYY-MM-DD format
 */
export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Deterministically picks a set ID from 1 to totalSets for the given date
 */
export function getDailyChallengeSetId(dateKey: string, totalSets: number = 35): number {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  return (absHash % totalSets) + 1;
}

/**
 * Formats a dateKey into a human-friendly string
 */
export function formatDailyDate(dateKey: string): string {
  try {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateKey;
  }
}

/**
 * Retrieves the current Daily Challenge status including streak information
 */
export function getDailyChallengeStatus(totalSets: number = 35): DailyChallengeState {
  const todayKey = getTodayDateKey();
  const targetSetId = getDailyChallengeSetId(todayKey, totalSets);
  const formattedDate = formatDailyDate(todayKey);

  // Read history
  let historyMap: Record<string, { score: number; percentage: number; completedAt: string }> = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_HISTORY);
    if (raw) historyMap = JSON.parse(raw);
  } catch {}

  const todayRecord = historyMap[todayKey];
  const isCompletedToday = !!todayRecord;

  // Read streak info
  let streakInfo = { currentStreak: 0, bestStreak: 0, lastActiveDate: '' };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK_INFO);
    if (raw) streakInfo = JSON.parse(raw);
  } catch {}

  // Check if streak was broken (missed yesterday)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  let currentStreak = streakInfo.currentStreak;
  if (!isCompletedToday && streakInfo.lastActiveDate !== yKey && streakInfo.lastActiveDate !== todayKey) {
    // If not completed today and last active was not yesterday or today, streak has reset to 0
    currentStreak = 0;
  }

  return {
    dateKey: todayKey,
    formattedDate,
    targetSetId,
    bonusPoints: 100,
    isCompletedToday,
    todayScore: todayRecord?.score,
    todayPercentage: todayRecord?.percentage,
    completedAt: todayRecord?.completedAt,
    currentStreak,
    bestStreak: streakInfo.bestStreak || currentStreak,
  };
}

/**
 * Records completion of today's Daily Challenge and updates the daily streak
 */
export function recordDailyChallengeCompletion(score: number, totalQuestions: number): {
  awardedBonus: number;
  newStreak: number;
  isFirstCompletionToday: boolean;
} {
  const todayKey = getTodayDateKey();
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  let historyMap: Record<string, any> = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_HISTORY);
    if (raw) historyMap = JSON.parse(raw);
  } catch {}

  const isFirstCompletionToday = !historyMap[todayKey];

  historyMap[todayKey] = {
    score,
    totalQuestions,
    percentage,
    completedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    bonusEarned: 100,
  };

  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_HISTORY, JSON.stringify(historyMap));
  } catch {}

  // Update streak
  let streakInfo = { currentStreak: 0, bestStreak: 0, lastActiveDate: '' };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK_INFO);
    if (raw) streakInfo = JSON.parse(raw);
  } catch {}

  let newStreak = streakInfo.currentStreak;

  if (isFirstCompletionToday) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    if (streakInfo.lastActiveDate === yKey) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    const bestStreak = Math.max(streakInfo.bestStreak, newStreak);
    try {
      localStorage.setItem(
        STORAGE_KEYS.STREAK_INFO,
        JSON.stringify({
          currentStreak: newStreak,
          bestStreak,
          lastActiveDate: todayKey,
        })
      );
    } catch {}

    return {
      awardedBonus: 100,
      newStreak,
      isFirstCompletionToday: true,
    };
  }

  return {
    awardedBonus: 0,
    newStreak,
    isFirstCompletionToday: false,
  };
}
