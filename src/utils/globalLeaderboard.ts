import { GlobalLeaderboardEntry, ScoreRecord, StudentProfile } from '../types';

const LEADERBOARD_STORAGE_KEY = 'asgk_global_simulated_leaderboard';

// Curated realistic student peers across Bangladeshi universities and competitive exams
export const SEED_LEADERBOARD_PEERS: Omit<GlobalLeaderboardEntry, 'rank' | 'isCurrentUser' | 'accuracyRate' | 'speedSecondsPerQuestion'>[] = [
  {
    id: 'peer-1',
    studentName: 'Tahsin Ahmed',
    roll: '1042',
    score: 20,
    totalQuestions: 20,
    percentage: 100,
    timeSpentSeconds: 198, // 3m 18s
    modelNumber: 1,
    modelTitle: 'Model Question 1 (Comprehensive Grammar)',
    date: '2026-09-11 18:24',
    timeAgo: '1 day ago',
    targetExam: '46th BCS Cadre Aspirant',
    institution: 'University of Dhaka',
    avatarColor: 'from-amber-400 to-orange-500',
  },
  {
    id: 'peer-2',
    studentName: 'Nusrat Jahan',
    roll: '1108',
    score: 20,
    totalQuestions: 20,
    percentage: 100,
    timeSpentSeconds: 224, // 3m 44s
    modelNumber: 3,
    modelTitle: 'Model Question 3 (Advanced Syntax & Transformation)',
    date: '2026-09-12 09:15',
    timeAgo: '5 hours ago',
    targetExam: 'DU English Admission',
    institution: 'Notre Dame College',
    avatarColor: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'peer-3',
    studentName: 'Arifur Rahman',
    roll: '1015',
    score: 20,
    totalQuestions: 20,
    percentage: 100,
    timeSpentSeconds: 256, // 4m 16s
    modelNumber: 2,
    modelTitle: 'Model Question 2 (Special Focus on Narration & Voice)',
    date: '2026-09-10 14:30',
    timeAgo: '2 days ago',
    targetExam: 'Bangladesh Bank AD',
    institution: 'Jahangirnagar University',
    avatarColor: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'peer-4',
    studentName: 'Sadia Afrin',
    roll: '1089',
    score: 19,
    totalQuestions: 20,
    percentage: 95,
    timeSpentSeconds: 182, // 3m 02s
    modelNumber: 4,
    modelTitle: 'Model Question 4 (Idioms, Prepositions & Correction)',
    date: '2026-09-12 11:40',
    timeAgo: '2 hours ago',
    targetExam: 'Medical Admission Test',
    institution: 'Viqarunnisa Noon School & College',
    avatarColor: 'from-rose-400 to-pink-500',
  },
  {
    id: 'peer-5',
    studentName: 'Tanvir Hasan',
    roll: '1033',
    score: 19,
    totalQuestions: 20,
    percentage: 95,
    timeSpentSeconds: 210, // 3m 30s
    modelNumber: 1,
    modelTitle: 'Model Question 1 (Comprehensive Grammar)',
    date: '2026-09-11 20:05',
    timeAgo: '1 day ago',
    targetExam: 'BUET Admission (English)',
    institution: 'Rajshahi College',
    avatarColor: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'peer-6',
    studentName: 'Fariha Chowdhury',
    roll: '1150',
    score: 19,
    totalQuestions: 20,
    percentage: 95,
    timeSpentSeconds: 235, // 3m 55s
    modelNumber: 5,
    modelTitle: 'Model Question 5 (Mastery Challenge & Literature)',
    date: '2026-09-09 16:50',
    timeAgo: '3 days ago',
    targetExam: 'IBA (DU) MBA Admission',
    institution: 'North South University',
    avatarColor: 'from-teal-400 to-cyan-500',
  },
  {
    id: 'peer-7',
    studentName: 'Mehedi Hasan',
    roll: '1021',
    score: 19,
    totalQuestions: 20,
    percentage: 95,
    timeSpentSeconds: 250, // 4m 10s
    modelNumber: 2,
    modelTitle: 'Model Question 2 (Special Focus on Narration & Voice)',
    date: '2026-09-08 11:15',
    timeAgo: '4 days ago',
    targetExam: '47th BCS Preliminary',
    institution: 'University of Chittagong',
    avatarColor: 'from-sky-400 to-blue-600',
  },
  {
    id: 'peer-8',
    studentName: 'Sumaiya Akter',
    roll: '1064',
    score: 18,
    totalQuestions: 20,
    percentage: 90,
    timeSpentSeconds: 175, // 2m 55s
    modelNumber: 3,
    modelTitle: 'Model Question 3 (Advanced Syntax & Transformation)',
    date: '2026-09-12 12:20',
    timeAgo: '1 hour ago',
    targetExam: 'Primary Assistant Teacher',
    institution: 'Eden Mohila College',
    avatarColor: 'from-fuchsia-400 to-pink-600',
  },
  {
    id: 'peer-9',
    studentName: 'Rakibul Islam',
    roll: '1077',
    score: 18,
    totalQuestions: 20,
    percentage: 90,
    timeSpentSeconds: 205, // 3m 25s
    modelNumber: 1,
    modelTitle: 'Model Question 1 (Comprehensive Grammar)',
    date: '2026-09-07 19:40',
    timeAgo: '5 days ago',
    targetExam: 'Combined 5 Govt. Bank Officer',
    institution: 'Shahjalal University (SUST)',
    avatarColor: 'from-violet-400 to-purple-600',
  },
  {
    id: 'peer-10',
    studentName: 'Jannatul Ferdous',
    roll: '1122',
    score: 18,
    totalQuestions: 20,
    percentage: 90,
    timeSpentSeconds: 228, // 3m 48s
    modelNumber: 4,
    modelTitle: 'Model Question 4 (Idioms, Prepositions & Correction)',
    date: '2026-09-10 17:10',
    timeAgo: '2 days ago',
    targetExam: 'DU "Kha" Unit Admission',
    institution: 'Holy Cross College',
    avatarColor: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'peer-11',
    studentName: 'Siam Mahmud',
    roll: '1095',
    score: 18,
    totalQuestions: 20,
    percentage: 90,
    timeSpentSeconds: 245,
    modelNumber: 5,
    modelTitle: 'Model Question 5 (Mastery Challenge & Literature)',
    date: '2026-09-06 13:00',
    timeAgo: '6 days ago',
    targetExam: 'Cadet College English',
    institution: 'Mirzapur Cadet College',
    avatarColor: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'peer-12',
    studentName: 'Tasnim Zahan',
    roll: '1134',
    score: 17,
    totalQuestions: 20,
    percentage: 85,
    timeSpentSeconds: 195,
    modelNumber: 2,
    modelTitle: 'Model Question 2 (Special Focus on Narration & Voice)',
    date: '2026-09-05 10:25',
    timeAgo: '7 days ago',
    targetExam: 'Chittagong University "B" Unit',
    institution: 'Chittagong Govt. College',
    avatarColor: 'from-emerald-400 to-green-600',
  },
];

/**
 * Format duration in seconds into human-readable minutes and seconds.
 */
export function formatLeaderboardDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
}

/**
 * Read the simulated shared peers from localStorage or initialize with seed data.
 */
export function getStoredSimulatedLeaderboard(): typeof SEED_LEADERBOARD_PEERS {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading simulated leaderboard from localStorage:', err);
  }

  // First time initialization
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(SEED_LEADERBOARD_PEERS));
  } catch {
    // Ignore storage failure
  }
  return SEED_LEADERBOARD_PEERS;
}

/**
 * Reset simulated leaderboard to default seed peers.
 */
export function resetSimulatedLeaderboard(): void {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(SEED_LEADERBOARD_PEERS));
  } catch (err) {
    console.warn('Error resetting simulated leaderboard:', err);
  }
}

/**
 * Merge current user test records from scoreRecords with the simulated peers pool,
 * calculating accurate ranking, speed, and identifying current user's entry.
 */
export interface GlobalLeaderboardResult {
  top10: GlobalLeaderboardEntry[];
  allRanked: GlobalLeaderboardEntry[];
  currentUserEntry: GlobalLeaderboardEntry | null;
  currentUserRank: number | null;
  totalCandidates: number;
  highestScore: number;
  userBestPercentage: number | null;
  percentileRank: number | null;
}

export function computeGlobalLeaderboard(
  scoreRecords: ScoreRecord[],
  studentProfile: StudentProfile,
  selectedModelFilter: number | 'all' = 'all'
): GlobalLeaderboardResult {
  const peers = getStoredSimulatedLeaderboard();

  // Convert peers into initial entries
  const peerEntries: GlobalLeaderboardEntry[] = peers.map((peer) => {
    const totalQ = peer.totalQuestions || 20;
    const speed = peer.timeSpentSeconds > 0 ? Number((peer.timeSpentSeconds / totalQ).toFixed(1)) : 0;
    return {
      ...peer,
      isCurrentUser: false,
      accuracyRate: peer.percentage,
      speedSecondsPerQuestion: speed,
    };
  });

  // Convert current user's genuine score records into global entries
  const userEntries: GlobalLeaderboardEntry[] = (scoreRecords || []).map((rec) => {
    const totalQ = rec.totalQuestions || 20;
    const speed = rec.timeSpentSeconds > 0 ? Number((rec.timeSpentSeconds / totalQ).toFixed(1)) : 0;
    return {
      id: `user-${rec.id}`,
      studentName: studentProfile.name || rec.userName || 'You',
      roll: studentProfile.roll || rec.roll || '101',
      score: rec.score,
      totalQuestions: totalQ,
      percentage: rec.percentage,
      timeSpentSeconds: rec.timeSpentSeconds || 240,
      modelNumber: rec.modelNumber,
      modelTitle: rec.modelTitle || `Model Question ${rec.modelNumber}`,
      date: rec.date,
      timeAgo: 'Your Attempt',
      targetExam: 'Competitive Exam Candidate',
      institution: 'Self Prep & Mastery',
      avatarColor: 'from-cyan-400 to-teal-400',
      isCurrentUser: true,
      accuracyRate: rec.percentage,
      speedSecondsPerQuestion: speed,
    };
  });

  // Pool all entries together
  let combined = [...peerEntries, ...userEntries];

  // If a model filter is applied, filter by modelNumber
  if (selectedModelFilter !== 'all') {
    combined = combined.filter((e) => e.modelNumber === selectedModelFilter);
  }

  // Deduplicate user attempts: keep the user's best attempt per model, or overall best if comparing
  // Sort with multi-criteria:
  // 1. percentage (descending)
  // 2. score (descending)
  // 3. timeSpentSeconds (ascending - faster is better for ties)
  combined.sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.timeSpentSeconds - b.timeSpentSeconds;
  });

  // Assign ranks
  const allRanked: GlobalLeaderboardEntry[] = combined.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

  const top10 = allRanked.slice(0, 10);

  // Find best rank for the current user
  const currentUserEntry = allRanked.find((e) => e.isCurrentUser) || null;
  const currentUserRank = currentUserEntry ? (currentUserEntry.rank ?? null) : null;
  const totalCandidates = allRanked.length;

  let percentileRank: number | null = null;
  if (currentUserRank && totalCandidates > 0) {
    percentileRank = Math.max(1, Math.round(((totalCandidates - currentUserRank + 1) / totalCandidates) * 100));
  }

  return {
    top10,
    allRanked,
    currentUserEntry,
    currentUserRank,
    totalCandidates,
    highestScore: allRanked[0]?.score || 20,
    userBestPercentage: currentUserEntry ? currentUserEntry.percentage : null,
    percentileRank,
  };
}
