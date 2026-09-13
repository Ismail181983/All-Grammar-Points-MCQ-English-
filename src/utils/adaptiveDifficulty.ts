import { ScoreRecord, ModelQuestionSet, GrammarCategory, RoadmapModule, RoadmapDifficulty } from '../types';
import { STUDY_ROADMAP_MODULES } from '../data/roadmapData';
import { analyzeUserWeakAreas } from './weakAreas';

export interface AdaptiveProfile {
  skillLevel: RoadmapDifficulty;
  levelTitle: string;
  averagePercentage: number;
  totalQuizzesTaken: number;
  recentTrend: 'improving' | 'steady' | 'struggling' | 'new';
  recommendedModule: RoadmapModule;
  recommendationReason: string;
  suggestedActionLabel: string;
  levelBadgeColor: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
}

export function computeAdaptiveDifficultyProfile(
  scoreRecords: ScoreRecord[],
  questionSets: ModelQuestionSet[]
): AdaptiveProfile {
  const totalQuizzes = scoreRecords.length;

  // If new student with no quiz records yet
  if (totalQuizzes === 0) {
    const firstModule = STUDY_ROADMAP_MODULES[0]; // Articles & Determiners (Beginner)
    return {
      skillLevel: 'beginner',
      levelTitle: 'Foundational Explorer (Beginner)',
      averagePercentage: 0,
      totalQuizzesTaken: 0,
      recentTrend: 'new',
      recommendedModule: firstModule,
      recommendationReason: 'Welcome! Start with foundational Articles & Determiners to establish a firm grammar baseline.',
      suggestedActionLabel: 'Start Beginner Module 1',
      levelBadgeColor: {
        bg: 'bg-emerald-500/15',
        border: 'border-emerald-500/40',
        text: 'text-emerald-300',
        glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      },
    };
  }

  // Calculate weighted average (more weight on recent attempts)
  const recentScores = scoreRecords.slice(0, 5);
  const totalRecent = recentScores.reduce((acc, s) => acc + s.percentage, 0);
  const avgPercentage = Math.round(totalRecent / recentScores.length);

  // Determine trend from last 3 vs prior
  let recentTrend: 'improving' | 'steady' | 'struggling' | 'new' = 'steady';
  if (recentScores.length >= 2) {
    const latest = recentScores[0].percentage;
    const previous = recentScores[1].percentage;
    if (latest - previous >= 8) recentTrend = 'improving';
    else if (previous - latest >= 10) recentTrend = 'struggling';
  }

  // Determine skill level based on average percentage and performance consistency
  let skillLevel: RoadmapDifficulty = 'beginner';
  let levelTitle = 'Foundational Explorer (Beginner)';
  let levelBadgeColor = {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/40',
    text: 'text-emerald-300',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
  };

  if (avgPercentage >= 80) {
    skillLevel = 'advanced';
    levelTitle = 'Grammar Virtuoso (Advanced)';
    levelBadgeColor = {
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/40',
      text: 'text-purple-300',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    };
  } else if (avgPercentage >= 60) {
    skillLevel = 'intermediate';
    levelTitle = 'Proficient Syntactician (Intermediate)';
    levelBadgeColor = {
      bg: 'bg-cyan-500/15',
      border: 'border-cyan-500/40',
      text: 'text-cyan-300',
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
    };
  }

  // Analyze performance per category to pick the best module
  const weakAreasReport = analyzeUserWeakAreas(scoreRecords, questionSets);
  const categoryAccuracyMap = new Map<GrammarCategory, number>();
  weakAreasReport.allTestedCategories.forEach((cat) => {
    categoryAccuracyMap.set(cat.category, cat.percentage);
  });

  // Filter modules appropriate for current skill level
  const levelModules = STUDY_ROADMAP_MODULES.filter((m) => m.difficulty === skillLevel);

  // Find a module in this level that hasn't reached >= 75% accuracy
  let recommended = levelModules.find((m) => {
    const acc = categoryAccuracyMap.get(m.category);
    return acc === undefined || acc < 75;
  });

  // If all modules in current level are mastered, look to the next difficulty level
  if (!recommended) {
    if (skillLevel === 'beginner') {
      const nextLevel = STUDY_ROADMAP_MODULES.filter((m) => m.difficulty === 'intermediate');
      recommended = nextLevel.find((m) => {
        const acc = categoryAccuracyMap.get(m.category);
        return acc === undefined || acc < 75;
      }) || nextLevel[0];
    } else if (skillLevel === 'intermediate') {
      const nextLevel = STUDY_ROADMAP_MODULES.filter((m) => m.difficulty === 'advanced');
      recommended = nextLevel.find((m) => {
        const acc = categoryAccuracyMap.get(m.category);
        return acc === undefined || acc < 75;
      }) || nextLevel[0];
    } else {
      // For advanced, pick the one with lowest score or module 12/13
      recommended = STUDY_ROADMAP_MODULES[STUDY_ROADMAP_MODULES.length - 1];
    }
  }

  // Ensure fallback
  if (!recommended) {
    recommended = STUDY_ROADMAP_MODULES[0];
  }

  // Construct pedagogical reason
  const testedAccuracy = categoryAccuracyMap.get(recommended.category);
  let recommendationReason = '';
  if (testedAccuracy !== undefined) {
    recommendationReason = `Your current accuracy in ${recommended.title} is ${testedAccuracy}%. Practice this ${recommended.difficulty} module to eliminate errors and level up.`;
  } else if (skillLevel === 'beginner') {
    recommendationReason = `With an average score of ${avgPercentage}%, mastering ${recommended.title} will solidify your foundational sentence structure.`;
  } else if (skillLevel === 'intermediate') {
    recommendationReason = `You have proven strong fundamentals (${avgPercentage}% avg). Advancing to ${recommended.title} will refine your intermediate syntax and clause mechanics.`;
  } else {
    recommendationReason = `Exceptional performance (${avgPercentage}% avg)! Challenge yourself with high-order nuances in ${recommended.title}.`;
  }

  return {
    skillLevel,
    levelTitle,
    averagePercentage: avgPercentage,
    totalQuizzesTaken: totalQuizzes,
    recentTrend,
    recommendedModule: recommended,
    recommendationReason,
    suggestedActionLabel: `Start ${recommended.title} (${recommended.difficulty.toUpperCase()})`,
    levelBadgeColor,
  };
}
