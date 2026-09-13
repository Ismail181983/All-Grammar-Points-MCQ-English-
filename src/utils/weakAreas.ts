import {
  GrammarCategory,
  ModelQuestionSet,
  Question,
  ScoreRecord,
  CategoryPerformance,
  WeakAreasReport,
} from '../types';
import { ALL_GRAMMAR_CATEGORIES, determineQuestionCategory } from './categories';

const DEFAULT_CHALLENGING_CATEGORIES: GrammarCategory[] = [
  'Narration',
  'Conditionals',
  'Prepositions',
];

const LOCAL_STORAGE_CATEGORY_STATS_KEY = 'asgk_category_stats';

/**
 * Analyzes the user's score records and category performance to identify
 * grammar categories where the user consistently scores below 60%.
 */
export function analyzeUserWeakAreas(
  scoreRecords: ScoreRecord[],
  allSets: ModelQuestionSet[]
): WeakAreasReport {
  // Map to hold aggregated performance per category
  const categoryMap: Map<GrammarCategory, { correct: number; total: number; testScores: number[] }> =
    new Map();

  for (const cat of ALL_GRAMMAR_CATEGORIES) {
    categoryMap.set(cat, { correct: 0, total: 0, testScores: [] });
  }

  // 1. Check localStorage for persistent category stats
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_CATEGORY_STATS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      for (const [cat, data] of Object.entries(parsed)) {
        if (categoryMap.has(cat as GrammarCategory) && typeof data === 'object' && data !== null) {
          const typed = data as { correct?: number; total?: number; testScores?: number[] };
          const entry = categoryMap.get(cat as GrammarCategory)!;
          entry.correct = typed.correct || 0;
          entry.total = typed.total || 0;
          entry.testScores = Array.isArray(typed.testScores) ? typed.testScores : [];
        }
      }
    }
  } catch (e) {
    console.warn('Failed to load category stats from localStorage:', e);
  }

  // 2. Incorporate data from scoreRecords
  for (const record of scoreRecords) {
    if (record.categoryScores && Object.keys(record.categoryScores).length > 0) {
      for (const [catStr, detail] of Object.entries(record.categoryScores)) {
        const cat = catStr as GrammarCategory;
        if (categoryMap.has(cat)) {
          const entry = categoryMap.get(cat)!;
          // Avoid double counting if already saved in localStorage stats:
          // We check if this record is already accounted for or combine
          // If total in entry is 0, initialize from record
          if (entry.total === 0) {
            entry.correct += detail.correct;
            entry.total += detail.total;
          }
          const testPct = detail.total > 0 ? Math.round((detail.correct / detail.total) * 100) : 0;
          entry.testScores.push(testPct);
        }
      }
    } else {
      // For older score records without explicit categoryScores,
      // reconstruct from the ModelQuestionSet questions
      const matchingSet = allSets.find((s) => s.id === record.modelNumber);
      if (matchingSet) {
        // Distribute proportionally based on record.percentage
        const pct = record.percentage;
        for (const q of matchingSet.questions) {
          const cat = (q.category || determineQuestionCategory(q.topic, q.question)) as GrammarCategory;
          if (categoryMap.has(cat)) {
            const entry = categoryMap.get(cat)!;
            // If entry is not populated by localStorage
            if (entry.total === 0) {
              entry.total += 1;
              if (pct >= 60 && Math.random() < pct / 100) {
                entry.correct += 1;
              } else if (pct < 60 && Math.random() < pct / 100) {
                entry.correct += 1;
              }
            }
          }
        }
      }
    }
  }

  // 3. Compile all tested categories
  const allTestedCategories: CategoryPerformance[] = [];
  const below60Categories: CategoryPerformance[] = [];

  for (const [cat, data] of categoryMap.entries()) {
    if (data.total > 0) {
      const percentage = Math.round((data.correct / data.total) * 100);
      const isWeak = percentage < 60;
      const perf: CategoryPerformance = {
        category: cat,
        correct: data.correct,
        total: data.total,
        percentage,
        isWeak,
        totalAttempts: data.total,
      };

      allTestedCategories.push(perf);
      if (isWeak) {
        below60Categories.push(perf);
      }
    }
  }

  // Sort below-60 categories: lowest percentage first, then most missed questions
  below60Categories.sort((a, b) => {
    if (a.percentage !== b.percentage) {
      return a.percentage - b.percentage;
    }
    const missedA = a.total - a.correct;
    const missedB = b.total - b.correct;
    return missedB - missedA;
  });

  // Sort all tested categories by lowest score first
  allTestedCategories.sort((a, b) => a.percentage - b.percentage);

  const hasHistory = scoreRecords.length > 0 || allTestedCategories.length > 0;
  const hasBelow60 = below60Categories.length > 0;

  // Determine top 3 weak categories:
  let top3: GrammarCategory[] = [];

  if (below60Categories.length >= 3) {
    top3 = below60Categories.slice(0, 3).map((c) => c.category);
  } else if (below60Categories.length > 0) {
    // Take the 1 or 2 below 60
    top3 = below60Categories.map((c) => c.category);
    // Fill remaining slot(s) with next lowest tested categories
    for (const tested of allTestedCategories) {
      if (!top3.includes(tested.category)) {
        top3.push(tested.category);
      }
      if (top3.length === 3) break;
    }
    // If still less than 3, fill with default challenging categories
    for (const def of DEFAULT_CHALLENGING_CATEGORIES) {
      if (!top3.includes(def)) {
        top3.push(def);
      }
      if (top3.length === 3) break;
    }
  } else if (allTestedCategories.length > 0) {
    // All tested categories are >= 60%! Take the lowest 3 for reinforcement
    top3 = allTestedCategories.slice(0, 3).map((c) => c.category);
    for (const def of DEFAULT_CHALLENGING_CATEGORIES) {
      if (!top3.includes(def) && top3.length < 3) {
        top3.push(def);
      }
    }
  } else {
    // No test history yet: use the top 3 highest-difficulty categories as diagnostic baseline
    top3 = [...DEFAULT_CHALLENGING_CATEGORIES];
  }

  return {
    identifiedWeakCategories: below60Categories,
    top3WeakCategories: top3.slice(0, 3),
    allTestedCategories,
    hasHistory,
    hasBelow60,
  };
}

/**
 * Updates persistent category stats in localStorage after a quiz is completed.
 */
export function recordCategoryQuizResults(
  categoryScores: Record<string, { correct: number; total: number }>
): void {
  try {
    let current: Record<string, { correct: number; total: number; testScores: number[] }> = {};
    const saved = localStorage.getItem(LOCAL_STORAGE_CATEGORY_STATS_KEY);
    if (saved) {
      current = JSON.parse(saved);
    }

    for (const [cat, data] of Object.entries(categoryScores)) {
      if (!current[cat]) {
        current[cat] = { correct: 0, total: 0, testScores: [] };
      }
      current[cat].correct += data.correct;
      current[cat].total += data.total;
      const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
      current[cat].testScores.push(pct);
    }

    localStorage.setItem(LOCAL_STORAGE_CATEGORY_STATS_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Failed to update category stats in localStorage:', e);
  }
}

/**
 * Generates a targeted practice session (ModelQuestionSet) focusing on the
 * top 3 weak grammar categories.
 */
export function generateWeakAreasPracticeSet(
  categories: GrammarCategory[],
  allSets: ModelQuestionSet[],
  targetTotalQuestions = 25
): ModelQuestionSet {
  const safeCategories = categories.length > 0 ? categories : DEFAULT_CHALLENGING_CATEGORIES;

  // Collect pool of questions per category
  const pools: Map<GrammarCategory, Question[]> = new Map();
  for (const cat of safeCategories) {
    pools.set(cat, []);
  }

  const seenQuestionTexts = new Set<string>();

  for (const set of allSets) {
    for (const q of set.questions) {
      const qCat = (q.category || determineQuestionCategory(q.topic, q.question)) as GrammarCategory;
      if (pools.has(qCat) && !seenQuestionTexts.has(q.question.trim().toLowerCase())) {
        seenQuestionTexts.add(q.question.trim().toLowerCase());
        pools.get(qCat)!.push({
          ...q,
          category: qCat,
        });
      }
    }
  }

  // Distribute target count among categories
  const numCategories = safeCategories.length;
  const basePerCat = Math.floor(targetTotalQuestions / numCategories);
  const remainder = targetTotalQuestions % numCategories;

  const selectedQuestions: Question[] = [];
  const categoryBreakdown: Record<string, number> = {};

  safeCategories.forEach((cat, index) => {
    const needed = basePerCat + (index < remainder ? 1 : 0);
    const pool = pools.get(cat) || [];
    // Shuffle pool to ensure diverse questions across sets
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, needed);

    chosen.forEach((q) => {
      selectedQuestions.push(q);
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
    });
  });

  // If some categories had fewer questions than needed, fill from other categories
  if (selectedQuestions.length < targetTotalQuestions) {
    const neededMore = targetTotalQuestions - selectedQuestions.length;
    const existingIds = new Set(selectedQuestions.map((q) => q.id));

    for (const cat of safeCategories) {
      const pool = pools.get(cat) || [];
      for (const q of pool) {
        if (!existingIds.has(q.id) && selectedQuestions.length < targetTotalQuestions) {
          selectedQuestions.push(q);
          existingIds.add(q.id);
          categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
        }
      }
    }
  }

  // Interleave questions so the user doesn't just do one category in a row
  const interleavedQuestions = [...selectedQuestions].sort(() => Math.random() - 0.5);

  const categoriesTitle = safeCategories.slice(0, 3).join(', ');

  return {
    id: 98000,
    title: `Weak Areas Review: ${safeCategories.slice(0, 2).join(' & ')}`,
    subtitle: `Remediation Test (${safeCategories.join(' • ')})`,
    description: `Personalized 25-MCQ remediation test addressing your lowest-scoring grammar categories (${categoriesTitle}). Aim for 60%+ mastery!`,
    totalQuestions: interleavedQuestions.length,
    questions: interleavedQuestions,
    categories: safeCategories,
    categoryBreakdown,
  };
}
