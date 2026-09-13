import { ScoreRecord, BadgeDefinition, BadgeProgress, BadgeTier, BadgeCategory } from '../types';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'grammar-guru',
    title: 'Grammar Guru',
    subtitle: 'Grammatical Virtuoso',
    description: 'Achieve a score of 90% or higher on any English Grammar Model Question set.',
    requirement: 'Score ≥ 90% on any test',
    category: 'score',
    tier: 'gold',
    iconName: 'Award',
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    subtitle: 'Lightning-Fast Reflexes',
    description: 'Complete a 25-question test in under 3 minutes (180 seconds) with at least 70% accuracy.',
    requirement: 'Finish in ≤ 3m with ≥ 70% score',
    category: 'speed',
    tier: 'platinum',
    iconName: 'Zap',
  },
  {
    id: 'flawless-perfection',
    title: 'Flawless Perfection',
    subtitle: '100% Bullseye Accuracy',
    description: 'Score a perfect 100% (25 out of 25) on any Model Question set.',
    requirement: 'Achieve 100% score (25/25)',
    category: 'score',
    tier: 'diamond',
    iconName: 'Sparkles',
  },
  {
    id: 'first-step',
    title: 'First Step to Glory',
    subtitle: 'Journey Commenced',
    description: 'Complete your first English Grammar Model Question practice test.',
    requirement: 'Complete 1 test',
    category: 'completion',
    tier: 'bronze',
    iconName: 'Compass',
  },
  {
    id: 'quiz-explorer',
    title: 'Quiz Explorer',
    subtitle: 'Broadening Horizons',
    description: 'Complete at least 3 quiz tests across any grammar topics.',
    requirement: 'Complete 3 tests',
    category: 'completion',
    tier: 'bronze',
    iconName: 'Target',
  },
  {
    id: 'quiz-enthusiast',
    title: 'Quiz Enthusiast',
    subtitle: 'Dedicated Scholar',
    description: 'Complete 5 quiz tests across any English Grammar sets.',
    requirement: 'Complete 5 tests',
    category: 'completion',
    tier: 'silver',
    iconName: 'Medal',
  },
  {
    id: 'high-flyer',
    title: 'High Flyer',
    subtitle: 'Consistent Excellence',
    description: 'Achieve a score of 80% or higher on at least 3 distinct quiz attempts.',
    requirement: '3 tests with score ≥ 80%',
    category: 'score',
    tier: 'silver',
    iconName: 'Trophy',
  },
  {
    id: 'rapid-scholar',
    title: 'Rapid Scholar',
    subtitle: 'Agile Mind',
    description: 'Finish any test in under 5 minutes (300 seconds) with at least 60% score.',
    requirement: 'Finish in ≤ 5m with ≥ 60% score',
    category: 'speed',
    tier: 'bronze',
    iconName: 'Clock',
  },
  {
    id: 'grammar-centurion',
    title: 'Grammar Centurion',
    subtitle: 'Ironclad Stamina',
    description: 'Complete 10 or more quiz attempts and build lasting exam confidence.',
    requirement: 'Complete 10 tests',
    category: 'completion',
    tier: 'gold',
    iconName: 'ShieldCheck',
  },
  {
    id: 'supreme-scholar',
    title: 'Supreme Scholar',
    subtitle: 'Academic Mastery',
    description: 'Maintain an overall average score of 85% or higher across at least 3 completed tests.',
    requirement: 'Average ≥ 85% with ≥ 3 tests',
    category: 'mastery',
    tier: 'diamond',
    iconName: 'Crown',
  },
  {
    id: 'the-grandmaster',
    title: 'The Grandmaster',
    subtitle: 'Apex Achiever',
    description: 'Complete 20 or more quiz tests across the model question library.',
    requirement: 'Complete 20 tests',
    category: 'mastery',
    tier: 'diamond',
    iconName: 'Trophy',
  },
];

/**
 * Calculates badges and their unlock status & progress from score history
 */
export function calculateBadges(
  scores: ScoreRecord[],
  persistedUnlockDates: Record<string, string> = {}
): BadgeProgress[] {
  const totalCompleted = scores.length;
  const bestScore = scores.length > 0 ? Math.max(...scores.map((s) => s.percentage)) : 0;
  const highScoresCount = scores.filter((s) => s.percentage >= 80).length;
  const avgScore =
    totalCompleted > 0
      ? Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / totalCompleted)
      : 0;

  // Fastest test with >= 70%
  const qualifyingSpeedTests = scores.filter(
    (s) => s.percentage >= 70 && s.timeSpentSeconds > 0
  );
  const fastestSpeed70 =
    qualifyingSpeedTests.length > 0
      ? Math.min(...qualifyingSpeedTests.map((s) => s.timeSpentSeconds))
      : null;

  // Fastest test with >= 60%
  const qualifyingSpeedTests60 = scores.filter(
    (s) => s.percentage >= 60 && s.timeSpentSeconds > 0
  );
  const fastestSpeed60 =
    qualifyingSpeedTests60.length > 0
      ? Math.min(...qualifyingSpeedTests60.map((s) => s.timeSpentSeconds))
      : null;

  return BADGE_DEFINITIONS.map((def): BadgeProgress => {
    let isUnlocked = false;
    let progressPercent = 0;
    let currentValue = 0;
    let targetValue = 100;
    let progressLabel = '';

    switch (def.id) {
      case 'grammar-guru': {
        // Score >= 90%
        targetValue = 90;
        currentValue = bestScore;
        isUnlocked = bestScore >= 90;
        progressPercent = Math.min(100, Math.round((currentValue / targetValue) * 100));
        progressLabel = `${currentValue}% / ${targetValue}% Best Score`;
        break;
      }

      case 'speed-demon': {
        // <= 180s with >= 70%
        targetValue = 180;
        if (fastestSpeed70 !== null) {
          currentValue = fastestSpeed70;
          isUnlocked = fastestSpeed70 <= 180;
          if (isUnlocked) {
            progressPercent = 100;
            progressLabel = `Completed in ${fastestSpeed70}s (≤ 180s)`;
          } else {
            // e.g. 240s -> how close to 180s
            progressPercent = Math.max(10, Math.min(95, Math.round((180 / fastestSpeed70) * 100)));
            progressLabel = `Fastest qualifying: ${fastestSpeed70}s (Goal: ≤ 180s)`;
          }
        } else {
          currentValue = 0;
          isUnlocked = false;
          progressPercent = 0;
          progressLabel = '0 / 1 Qualifying fast test';
        }
        break;
      }

      case 'flawless-perfection': {
        targetValue = 100;
        currentValue = bestScore;
        isUnlocked = bestScore === 100;
        progressPercent = Math.min(100, currentValue);
        progressLabel = `${currentValue}% / 100%`;
        break;
      }

      case 'first-step': {
        targetValue = 1;
        currentValue = Math.min(totalCompleted, 1);
        isUnlocked = totalCompleted >= 1;
        progressPercent = isUnlocked ? 100 : 0;
        progressLabel = `${currentValue} / 1 Test Completed`;
        break;
      }

      case 'quiz-explorer': {
        targetValue = 3;
        currentValue = Math.min(totalCompleted, 3);
        isUnlocked = totalCompleted >= 3;
        progressPercent = Math.min(100, Math.round((totalCompleted / 3) * 100));
        progressLabel = `${currentValue} / 3 Tests Completed`;
        break;
      }

      case 'quiz-enthusiast': {
        targetValue = 5;
        currentValue = Math.min(totalCompleted, 5);
        isUnlocked = totalCompleted >= 5;
        progressPercent = Math.min(100, Math.round((totalCompleted / 5) * 100));
        progressLabel = `${currentValue} / 5 Tests Completed`;
        break;
      }

      case 'high-flyer': {
        targetValue = 3;
        currentValue = Math.min(highScoresCount, 3);
        isUnlocked = highScoresCount >= 3;
        progressPercent = Math.min(100, Math.round((highScoresCount / 3) * 100));
        progressLabel = `${currentValue} / 3 Tests with ≥ 80%`;
        break;
      }

      case 'rapid-scholar': {
        targetValue = 300;
        if (fastestSpeed60 !== null) {
          currentValue = fastestSpeed60;
          isUnlocked = fastestSpeed60 <= 300;
          if (isUnlocked) {
            progressPercent = 100;
            progressLabel = `Completed in ${fastestSpeed60}s (≤ 300s)`;
          } else {
            progressPercent = Math.max(10, Math.min(95, Math.round((300 / fastestSpeed60) * 100)));
            progressLabel = `Fastest: ${fastestSpeed60}s (Goal: ≤ 300s)`;
          }
        } else {
          currentValue = 0;
          isUnlocked = false;
          progressPercent = 0;
          progressLabel = '0 / 1 Completed test under 5m';
        }
        break;
      }

      case 'grammar-centurion': {
        targetValue = 10;
        currentValue = Math.min(totalCompleted, 10);
        isUnlocked = totalCompleted >= 10;
        progressPercent = Math.min(100, Math.round((totalCompleted / 10) * 100));
        progressLabel = `${currentValue} / 10 Tests Completed`;
        break;
      }

      case 'supreme-scholar': {
        targetValue = 85;
        currentValue = avgScore;
        isUnlocked = totalCompleted >= 3 && avgScore >= 85;
        if (totalCompleted < 3) {
          progressPercent = Math.round((totalCompleted / 3) * 50);
          progressLabel = `${totalCompleted}/3 tests taken (Need avg ≥ 85%)`;
        } else {
          progressPercent = Math.min(100, Math.round((avgScore / 85) * 100));
          progressLabel = `Avg Score: ${avgScore}% / 85%`;
        }
        break;
      }

      case 'the-grandmaster': {
        targetValue = 20;
        currentValue = Math.min(totalCompleted, 20);
        isUnlocked = totalCompleted >= 20;
        progressPercent = Math.min(100, Math.round((totalCompleted / 20) * 100));
        progressLabel = `${currentValue} / 20 Tests Completed`;
        break;
      }

      default:
        isUnlocked = false;
        progressPercent = 0;
        progressLabel = 'In Progress';
    }

    // Determine unlocked date: use persisted date if present, or fallback to first matching score record date
    let unlockedAt = persistedUnlockDates[def.id];
    if (isUnlocked && !unlockedAt) {
      if (scores.length > 0) {
        unlockedAt = scores[scores.length - 1].date;
      } else {
        unlockedAt = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
    }

    return {
      ...def,
      isUnlocked,
      unlockedAt,
      progressPercent,
      currentValue,
      targetValue,
      progressLabel,
    };
  });
}

/**
 * Returns tier styling classes for metallic appearance
 */
export function getTierStyle(tier: BadgeTier) {
  switch (tier) {
    case 'bronze':
      return {
        badgeBg: 'bg-gradient-to-br from-amber-900/60 via-amber-800/40 to-slate-900',
        badgeBorder: 'border-amber-600/60',
        glow: 'shadow-[0_0_20px_rgba(217,119,6,0.2)]',
        textColor: 'text-amber-400',
        pillBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        label: 'Bronze Trophy',
      };
    case 'silver':
      return {
        badgeBg: 'bg-gradient-to-br from-slate-700/60 via-slate-800/40 to-slate-900',
        badgeBorder: 'border-slate-300/50',
        glow: 'shadow-[0_0_20px_rgba(203,213,225,0.2)]',
        textColor: 'text-slate-200',
        pillBg: 'bg-slate-400/20 text-slate-200 border-slate-400/40',
        label: 'Silver Trophy',
      };
    case 'gold':
      return {
        badgeBg: 'bg-gradient-to-br from-yellow-950/70 via-amber-800/40 to-slate-900',
        badgeBorder: 'border-yellow-400/70',
        glow: 'shadow-[0_0_25px_rgba(234,179,8,0.35)]',
        textColor: 'text-yellow-300',
        pillBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50',
        label: 'Gold Trophy',
      };
    case 'platinum':
      return {
        badgeBg: 'bg-gradient-to-br from-cyan-950/80 via-blue-900/40 to-slate-900',
        badgeBorder: 'border-cyan-400/70',
        glow: 'shadow-[0_0_30px_rgba(34,211,238,0.35)]',
        textColor: 'text-cyan-300',
        pillBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
        label: 'Platinum Trophy',
      };
    case 'diamond':
      return {
        badgeBg: 'bg-gradient-to-br from-purple-950/80 via-indigo-900/40 to-cyan-950/60',
        badgeBorder: 'border-purple-400/70',
        glow: 'shadow-[0_0_35px_rgba(168,85,247,0.4)]',
        textColor: 'text-purple-300',
        pillBg: 'bg-purple-500/20 text-purple-300 border-purple-400/50',
        label: 'Diamond Trophy',
      };
  }
}
