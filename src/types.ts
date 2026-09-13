export type GrammarCategory =
  | 'Parts of Speech'
  | 'Tense'
  | 'Narration'
  | 'Voice Change'
  | 'Prepositions'
  | 'Articles'
  | 'Subject-Verb Agreement'
  | 'Conditionals'
  | 'Transformation & Clauses'
  | 'Idioms & Phrases'
  | 'Vocabulary & Spelling'
  | 'Correction of Sentences'
  | 'General Grammar & Literature';

export interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  topic: string;
  category?: GrammarCategory;
}

export interface ModelQuestionSet {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  totalQuestions: number;
  questions: Question[];
  categories?: GrammarCategory[];
  categoryBreakdown?: Record<string, number>;
}

export interface CategoryScoreDetail {
  correct: number;
  total: number;
}

export interface ScoreRecord {
  id: string;
  userName: string;
  roll: string;
  modelNumber: number;
  modelTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  date: string;
  categoryScores?: Record<string, CategoryScoreDetail>;
  userAnswers?: Record<number, 'A' | 'B' | 'C' | 'D'>;
}

export interface CategoryPerformance {
  category: GrammarCategory;
  correct: number;
  total: number;
  percentage: number;
  isWeak: boolean;
  totalAttempts: number;
}

export interface WeakAreasReport {
  identifiedWeakCategories: CategoryPerformance[];
  top3WeakCategories: GrammarCategory[];
  allTestedCategories: CategoryPerformance[];
  hasHistory: boolean;
  hasBelow60: boolean;
}

export type AppTheme = 'classic-dark' | 'soft-blue' | 'zen-forest';

export interface QuizSettings {
  // Visual Theme
  theme?: AppTheme;

  // Speech synthesis
  enableSpeech: boolean;
  speechRate: number;
  speechPitch: number;
  speechVolume: number;
  
  // Sound effects & Ambient
  soundEffects: boolean;
  ambientSound: boolean;
  
  // Timers
  enableTotalTimer: boolean;
  totalTimeMinutes: number;
  enableQuestionTimer: boolean;
  questionTimeSeconds: number;
  autoAdvanceOnAnswer?: boolean;
  
  // Visuals & Aquarium
  enableAquariumAnimation: boolean;
  aquariumFishCount: number;
  aquariumFlowerCount: number;
  
  // Explanations
  showExplanationInQuiz: boolean;
  
  // Password expiration simulation
  enablePasswordExpiry: boolean;
  passwordExpiryMinutes: number;
  passwordExpiryDate?: string;
  isManuallyExpired: boolean;
}

export interface StudentProfile {
  name: string;
  roll: string;
}

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
export type BadgeCategory = 'score' | 'speed' | 'completion' | 'mastery';

export interface BadgeDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  requirement: string;
  category: BadgeCategory;
  tier: BadgeTier;
  iconName: 'Trophy' | 'Zap' | 'Award' | 'Crown' | 'Sparkles' | 'Clock' | 'Target' | 'ShieldCheck' | 'Compass' | 'Medal';
}

export interface BadgeProgress extends BadgeDefinition {
  isUnlocked: boolean;
  unlockedAt?: string;
  progressPercent: number; // 0 to 100
  currentValue: number;
  targetValue: number;
  progressLabel: string;
}

// Study Roadmap Types
export type RoadmapDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface RoadmapModule {
  id: string;
  step: number;
  category: GrammarCategory;
  title: string;
  shortLabel: string;
  difficulty: RoadmapDifficulty;
  level: 1 | 2 | 3;
  stageName: string;
  description: string;
  keyTopics: string[];
  examTip: string;
  estimatedMinutes: number;
}

export interface RoadmapModuleProgress {
  category: GrammarCategory;
  status: 'not-started' | 'in-progress' | 'mastered';
  accuracy: number;
  totalAttempts: number;
  correctAttempts: number;
  isRecommendedNext: boolean;
}

// Global Leaderboard Types
export interface GlobalLeaderboardEntry {
  id: string;
  rank?: number;
  studentName: string;
  roll: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  modelNumber: number;
  modelTitle: string;
  date: string;
  timeAgo: string;
  targetExam: string;
  institution: string;
  avatarColor: string;
  isCurrentUser: boolean;
  accuracyRate: number;
  speedSecondsPerQuestion: number;
}
