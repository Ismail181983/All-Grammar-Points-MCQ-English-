import { GrammarCategory, ModelQuestionSet, Question } from '../types';

export const ALL_GRAMMAR_CATEGORIES: GrammarCategory[] = [
  'Tense',
  'Narration',
  'Parts of Speech',
  'Voice Change',
  'Prepositions',
  'Articles',
  'Subject-Verb Agreement',
  'Conditionals',
  'Transformation & Clauses',
  'Idioms & Phrases',
  'Vocabulary & Spelling',
  'Correction of Sentences',
  'General Grammar & Literature',
];

export interface CategoryMeta {
  name: GrammarCategory;
  shortLabel: string;
  description: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  gradient: string;
}

export const CATEGORY_META_MAP: Record<GrammarCategory, CategoryMeta> = {
  Tense: {
    name: 'Tense',
    shortLabel: 'Tense',
    description: 'Verb tenses, right forms of verbs, sequence of tenses, and aspect rules.',
    badgeBg: 'bg-emerald-500/15',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-300',
    gradient: 'from-emerald-500 to-teal-500',
  },
  Narration: {
    name: 'Narration',
    shortLabel: 'Narration',
    description: 'Direct & indirect speech transformations, reporting verbs, and tense backshifting.',
    badgeBg: 'bg-violet-500/15',
    badgeBorder: 'border-violet-500/40',
    badgeText: 'text-violet-300',
    gradient: 'from-violet-500 to-purple-500',
  },
  'Parts of Speech': {
    name: 'Parts of Speech',
    shortLabel: 'Parts of Speech',
    description: 'Nouns, pronouns, adjectives, adverbs, conjunctions, gerunds, and participles.',
    badgeBg: 'bg-cyan-500/15',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-300',
    gradient: 'from-cyan-500 to-blue-500',
  },
  'Voice Change': {
    name: 'Voice Change',
    shortLabel: 'Voice',
    description: 'Active to passive voice formulas, quasi-passive verbs, and imperative voice.',
    badgeBg: 'bg-amber-500/15',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
    gradient: 'from-amber-500 to-orange-500',
  },
  Prepositions: {
    name: 'Prepositions',
    shortLabel: 'Prepositions',
    description: 'Appropriate prepositions, phrasal verbs, and prepositional idioms.',
    badgeBg: 'bg-blue-500/15',
    badgeBorder: 'border-blue-500/40',
    badgeText: 'text-blue-300',
    gradient: 'from-blue-500 to-indigo-500',
  },
  Articles: {
    name: 'Articles',
    shortLabel: 'Articles',
    description: 'Definite/indefinite articles (a, an, the), omission of articles, and vowel sounds.',
    badgeBg: 'bg-yellow-500/15',
    badgeBorder: 'border-yellow-500/40',
    badgeText: 'text-yellow-300',
    gradient: 'from-yellow-500 to-amber-500',
  },
  'Subject-Verb Agreement': {
    name: 'Subject-Verb Agreement',
    shortLabel: 'Agreement',
    description: 'Singular & plural concordance, collective nouns, compound subjects, and proximity.',
    badgeBg: 'bg-rose-500/15',
    badgeBorder: 'border-rose-500/40',
    badgeText: 'text-rose-300',
    gradient: 'from-rose-500 to-pink-500',
  },
  Conditionals: {
    name: 'Conditionals',
    shortLabel: 'Conditionals',
    description: 'Zero, First, Second, Third, and Mixed conditionals with subjunctive forms.',
    badgeBg: 'bg-teal-500/15',
    badgeBorder: 'border-teal-500/40',
    badgeText: 'text-teal-300',
    gradient: 'from-teal-500 to-emerald-500',
  },
  'Transformation & Clauses': {
    name: 'Transformation & Clauses',
    shortLabel: 'Transformation',
    description: 'Simple/complex/compound sentences, degrees of comparison, and clauses.',
    badgeBg: 'bg-indigo-500/15',
    badgeBorder: 'border-indigo-500/40',
    badgeText: 'text-indigo-300',
    gradient: 'from-indigo-500 to-violet-500',
  },
  'Idioms & Phrases': {
    name: 'Idioms & Phrases',
    shortLabel: 'Idioms',
    description: 'High-frequency idioms, figurative expressions, and traditional English proverbs.',
    badgeBg: 'bg-fuchsia-500/15',
    badgeBorder: 'border-fuchsia-500/40',
    badgeText: 'text-fuchsia-300',
    gradient: 'from-fuchsia-500 to-purple-500',
  },
  'Vocabulary & Spelling': {
    name: 'Vocabulary & Spelling',
    shortLabel: 'Vocabulary',
    description: 'Synonyms, antonyms, tricky spelling verifications, and one-word substitutions.',
    badgeBg: 'bg-sky-500/15',
    badgeBorder: 'border-sky-500/40',
    badgeText: 'text-sky-300',
    gradient: 'from-sky-500 to-cyan-500',
  },
  'Correction of Sentences': {
    name: 'Correction of Sentences',
    shortLabel: 'Correction',
    description: 'Identifying structural grammatical flaws, redundancy, and faulty parallelism.',
    badgeBg: 'bg-red-500/15',
    badgeBorder: 'border-red-500/40',
    badgeText: 'text-red-300',
    gradient: 'from-red-500 to-rose-500',
  },
  'General Grammar & Literature': {
    name: 'General Grammar & Literature',
    shortLabel: 'General',
    description: 'Punctuation, literary terms, rhetorical figures, and classic quotes.',
    badgeBg: 'bg-slate-500/20',
    badgeBorder: 'border-slate-500/40',
    badgeText: 'text-slate-300',
    gradient: 'from-slate-600 to-slate-800',
  },
};

/**
 * Determines the specific grammar category based on topic and question text.
 */
export function determineQuestionCategory(topic: string, question: string): GrammarCategory {
  const text = `${topic} ${question}`.toLowerCase();

  // 1. Narration / Indirect Speech
  if (
    text.includes('narration') ||
    text.includes('indirect speech') ||
    text.includes('direct speech') ||
    text.includes('reported speech')
  ) {
    return 'Narration';
  }

  // 2. Voice Change
  if (
    text.includes('voice change') ||
    text.includes('active voice') ||
    text.includes('passive voice') ||
    text.includes('passive form') ||
    text.includes('voice')
  ) {
    return 'Voice Change';
  }

  // 3. Tense & Right Forms of Verbs
  if (
    text.includes('tense') ||
    text.includes('right form of verb') ||
    text.includes('right forms of verb') ||
    text.includes('verb tense') ||
    text.includes('sequence of tense')
  ) {
    return 'Tense';
  }

  // 4. Prepositions & Phrasal Verbs
  if (
    text.includes('preposition') ||
    text.includes('phrasal verb') ||
    text.includes('appropriate preposition')
  ) {
    return 'Prepositions';
  }

  // 5. Subject-Verb Agreement / Concord
  if (
    text.includes('subject-verb') ||
    text.includes('agreement') ||
    text.includes('concord')
  ) {
    return 'Subject-Verb Agreement';
  }

  // 6. Conditionals
  if (
    text.includes('conditional') ||
    text.includes('if clause') ||
    text.includes('subjunctive')
  ) {
    return 'Conditionals';
  }

  // 7. Articles & Determiners
  if (
    text.includes('article') ||
    text.includes('determiner')
  ) {
    return 'Articles';
  }

  // 8. Idioms, Phrases & Proverbs
  if (
    text.includes('idiom') ||
    text.includes('phrase') ||
    text.includes('proverb')
  ) {
    return 'Idioms & Phrases';
  }

  // 9. Parts of Speech
  if (
    text.includes('part of speech') ||
    text.includes('parts of speech') ||
    text.includes('noun') ||
    text.includes('pronoun') ||
    text.includes('adjective') ||
    text.includes('adverb') ||
    text.includes('conjunction') ||
    text.includes('interjection') ||
    text.includes('gerund') ||
    text.includes('participle') ||
    text.includes('infinitive') ||
    text.includes('non-finite verb') ||
    text.includes('countable') ||
    text.includes('uncountable') ||
    text.includes('case') ||
    text.includes('gender') ||
    text.includes('number (singular')
  ) {
    return 'Parts of Speech';
  }

  // 10. Transformation of Sentences & Degree of Comparison & Clauses
  if (
    text.includes('degree of comparison') ||
    text.includes('comparative') ||
    text.includes('superlative') ||
    text.includes('transformation') ||
    text.includes('simple, complex') ||
    text.includes('clause') ||
    text.includes('sentence structure') ||
    text.includes('compound') ||
    text.includes('affirmative to negative')
  ) {
    return 'Transformation & Clauses';
  }

  // 11. Sentence Correction & Pinpointing Error
  if (
    text.includes('correct sentence') ||
    text.includes('pinpoint error') ||
    text.includes('correction') ||
    text.includes('redundancy') ||
    text.includes('parallelism')
  ) {
    return 'Correction of Sentences';
  }

  // 12. Vocabulary, Synonyms, Antonyms & Spelling
  if (
    text.includes('synonym') ||
    text.includes('antonym') ||
    text.includes('spelling') ||
    text.includes('vocabulary') ||
    text.includes('one word substitution') ||
    text.includes('analogy') ||
    text.includes('word meaning')
  ) {
    return 'Vocabulary & Spelling';
  }

  return 'General Grammar & Literature';
}

/**
 * Enriches a ModelQuestionSet with explicit category property on each Question,
 * as well as computed categories list and categoryBreakdown on the set itself.
 */
export function enrichModelQuestionSet(set: ModelQuestionSet): ModelQuestionSet {
  const enrichedQuestions: Question[] = set.questions.map((q) => {
    const category = q.category || determineQuestionCategory(q.topic, q.question);
    return {
      ...q,
      category,
    };
  });

  const categoryBreakdown: Record<string, number> = {};
  const categoriesSet = new Set<GrammarCategory>();

  for (let i = 0; i < enrichedQuestions.length; i++) {
    const cat = enrichedQuestions[i].category as GrammarCategory;
    categoriesSet.add(cat);
    categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
  }

  // Sort categories by frequency in this set
  const categoriesList = Array.from(categoriesSet).sort(
    (a, b) => (categoryBreakdown[b] || 0) - (categoryBreakdown[a] || 0)
  );

  return {
    ...set,
    questions: enrichedQuestions,
    categories: categoriesList,
    categoryBreakdown,
  };
}

/**
 * Enriches an array of ModelQuestionSets.
 */
export function enrichAllModelQuestionSets(sets: ModelQuestionSet[]): ModelQuestionSet[] {
  return sets.map(enrichModelQuestionSet);
}

/**
 * Computes global category statistics across all sets.
 */
export function getGlobalCategoryCounts(sets: ModelQuestionSet[]): Record<GrammarCategory, number> {
  const counts: Partial<Record<GrammarCategory, number>> = {};
  for (const cat of ALL_GRAMMAR_CATEGORIES) {
    counts[cat] = 0;
  }

  for (const s of sets) {
    for (const q of s.questions) {
      const cat = (q.category || determineQuestionCategory(q.topic, q.question)) as GrammarCategory;
      counts[cat] = (counts[cat] || 0) + 1;
    }
  }

  return counts as Record<GrammarCategory, number>;
}

/**
 * Creates a focused virtual ModelQuestionSet containing all questions of a specific grammar category.
 */
export function createFocusedCategorySet(
  category: GrammarCategory,
  allSets: ModelQuestionSet[]
): ModelQuestionSet {
  const matchingQuestions: Question[] = [];

  for (const s of allSets) {
    for (const q of s.questions) {
      const qCat = q.category || determineQuestionCategory(q.topic, q.question);
      if (qCat === category) {
        matchingQuestions.push({
          ...q,
          category: qCat,
        });
      }
    }
  }

  const meta = CATEGORY_META_MAP[category];

  return {
    id: 99000 + ALL_GRAMMAR_CATEGORIES.indexOf(category),
    title: `Focused Practice: ${category}`,
    subtitle: `${meta.shortLabel} Intensive Grammar Module`,
    description: `Targeted practice set with ${matchingQuestions.length} curated questions on ${category}. Master ${meta.description.toLowerCase()}`,
    totalQuestions: matchingQuestions.length,
    questions: matchingQuestions,
    categories: [category],
    categoryBreakdown: { [category]: matchingQuestions.length },
  };
}

/**
 * Creates a targeted practice set from a single ModelQuestionSet containing only questions matching a category.
 */
export function createSetCategoryPractice(
  modelSet: ModelQuestionSet,
  category: GrammarCategory
): ModelQuestionSet {
  const matchingQuestions = modelSet.questions.filter(
    (q) => (q.category || determineQuestionCategory(q.topic, q.question)) === category
  );

  return {
    id: 90000 + modelSet.id * 100 + ALL_GRAMMAR_CATEGORIES.indexOf(category),
    title: `${modelSet.title} - ${category}`,
    subtitle: `${category} Focus (${matchingQuestions.length} MCQs)`,
    description: `Grammar subset of ${modelSet.title} focusing exclusively on ${category}.`,
    totalQuestions: matchingQuestions.length,
    questions: matchingQuestions,
    categories: [category],
    categoryBreakdown: { [category]: matchingQuestions.length },
  };
}
