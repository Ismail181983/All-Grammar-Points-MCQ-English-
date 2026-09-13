import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LoginPage } from './components/LoginPage';
import { ModelQuestionDashboard } from './components/ModelQuestionDashboard';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { AquariumBackground } from './components/AquariumBackground';
import { SettingsModal } from './components/SettingsModal';
import { ScoreBoardModal } from './components/ScoreBoardModal';
import { StudentInfoModal } from './components/StudentInfoModal';
import { TrophiesModal } from './components/TrophiesModal';
import { FlashcardView } from './components/FlashcardView';
import { modelQuestionSets } from './data/questions';
import { QuizSettings, StudentProfile, ScoreRecord, BadgeProgress, ModelQuestionSet, CategoryScoreDetail, Question } from './types';
import { calculateBadges } from './utils/badges';
import { soundManager } from './utils/sound';
import { determineQuestionCategory } from './utils/categories';
import { recordCategoryQuizResults } from './utils/weakAreas';
import { getAppTheme } from './utils/theme';
import { getDailyChallengeStatus, recordDailyChallengeCompletion } from './utils/dailyChallenge';
import { recordAndCheck24HourActivity } from './utils/browserNotifications';

const DEFAULT_SETTINGS: QuizSettings = {
  theme: 'classic-dark',
  enableSpeech: true,
  speechRate: 1.0,
  speechPitch: 1.0,
  speechVolume: 1.0,
  soundEffects: true,
  ambientSound: false,
  enableTotalTimer: true,
  totalTimeMinutes: 20,
  enableQuestionTimer: true,
  questionTimeSeconds: 45,
  autoAdvanceOnAnswer: true,
  enableAquariumAnimation: true,
  aquariumFishCount: 12,
  aquariumFlowerCount: 8,
  showExplanationInQuiz: false,
  enablePasswordExpiry: false,
  passwordExpiryMinutes: 60,
  isManuallyExpired: false,
};

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Md. Ismail Student',
  roll: '01',
};

export default function App() {
  // Session & Navigation States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'quiz' | 'result' | 'flashcards'>('dashboard');
  const [activeModelId, setActiveModelId] = useState<number>(1);
  const [customPracticeSet, setCustomPracticeSet] = useState<ModelQuestionSet | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizTimeSpent, setQuizTimeSpent] = useState<number>(0);

  // Settings State with LocalStorage Persistence
  const [settings, setSettings] = useState<QuizSettings>(() => {
    try {
      const saved = localStorage.getItem('asgk_quiz_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Student Profile State
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('asgk_student_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Permanent Scoreboard State
  const [scoreRecords, setScoreRecords] = useState<ScoreRecord[]>(() => {
    try {
      const saved = localStorage.getItem('asgk_permanent_scoreboard');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScoreBoardOpen, setIsScoreBoardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTrophiesModalOpen, setIsTrophiesModalOpen] = useState(false);

  // Digital Trophies Unlocked Timestamps Map
  const [unlockedBadgesMap, setUnlockedBadgesMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('asgk_unlocked_badges_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Newly unlocked badges during current quiz attempt
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<BadgeProgress[]>([]);

  // Calculate live badge progress from permanent score records and unlocked cache
  const badges = useMemo(() => {
    return calculateBadges(scoreRecords, unlockedBadgesMap);
  }, [scoreRecords, unlockedBadgesMap]);

  // Sync settings
  useEffect(() => {
    try {
      localStorage.setItem('asgk_quiz_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }, [settings]);

  // Sync student profile
  useEffect(() => {
    try {
      localStorage.setItem('asgk_student_profile', JSON.stringify(studentProfile));
    } catch (e) {
      console.warn('Failed to save profile:', e);
    }
  }, [studentProfile]);

  // Sync permanent scoreboard
  useEffect(() => {
    try {
      localStorage.setItem('asgk_permanent_scoreboard', JSON.stringify(scoreRecords));
    } catch (e) {
      console.warn('Failed to save scores:', e);
    }
  }, [scoreRecords]);

  // Record user visit and check 24-hour return activity
  useEffect(() => {
    recordAndCheck24HourActivity();
  }, []);

  const updateSettings = useCallback((newPartial: Partial<QuizSettings>) => {
    setSettings((prev) => ({ ...prev, ...newPartial }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    soundManager.stopAmbientAquarium();
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
    setUserAnswers({});
    setQuizTimeSpent(0);
    if (settings.ambientSound) {
      soundManager.startAmbientAquarium();
    }
  }, [settings.ambientSound]);

  const handleSelectModel = useCallback((modelId: number) => {
    if (modelId < 90000) {
      setCustomPracticeSet(null);
    }
    setActiveModelId(modelId);
    setUserAnswers({});
    setQuizTimeSpent(0);
    setCurrentView('quiz');
  }, []);

  const handleStartCustomPractice = useCallback((customSet: ModelQuestionSet) => {
    setCustomPracticeSet(customSet);
    setActiveModelId(customSet.id);
    setUserAnswers({});
    setQuizTimeSpent(0);
    setCurrentView('quiz');
  }, []);

  const handleOpenCustomFlashcards = useCallback((customSet: ModelQuestionSet) => {
    setCustomPracticeSet(customSet);
    setActiveModelId(customSet.id);
    setNewlyUnlockedBadges([]);
    setCurrentView('flashcards');
  }, []);

  const activeModelSet = useMemo(() => {
    if (customPracticeSet && customPracticeSet.id === activeModelId) {
      return customPracticeSet;
    }
    return modelQuestionSets.find((m) => m.id === activeModelId) || modelQuestionSets[0];
  }, [activeModelId, customPracticeSet]);

  const handleCheckAnswer = useCallback((
    answers: Record<number, 'A' | 'B' | 'C' | 'D'>,
    timeSpent: number
  ) => {
    setUserAnswers(answers);
    setQuizTimeSpent(timeSpent);

    const activeSet = activeModelSet;
    let correct = 0;
    const categoryScores: Record<string, CategoryScoreDetail> = {};

    activeSet.questions.forEach((q) => {
      const cat = (q.category || determineQuestionCategory(q.topic, q.question)) as string;
      if (!categoryScores[cat]) {
        categoryScores[cat] = { correct: 0, total: 0 };
      }
      categoryScores[cat].total++;

      if (answers[q.id] === q.correctAnswer) {
        correct++;
        categoryScores[cat].correct++;
      }
    });

    // Update global persistent category stats for weak area tracking
    recordCategoryQuizResults(categoryScores);

    // Track daily challenge completion and streak bonus if this set is today's challenge
    try {
      const challengeInfo = getDailyChallengeStatus(modelQuestionSets.length);
      if (activeModelId === challengeInfo.targetSetId && !customPracticeSet) {
        recordDailyChallengeCompletion(correct, activeSet.questions.length);
      }
    } catch {}

    const total = activeSet.questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Save to permanent scoreboard
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newRecord: ScoreRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      userName: studentProfile.name,
      roll: studentProfile.roll,
      modelNumber: activeModelId,
      modelTitle: activeSet.title,
      score: correct,
      totalQuestions: total,
      percentage,
      timeSpentSeconds: timeSpent,
      date: formattedDate,
      categoryScores,
      userAnswers: answers,
    };

    // Calculate badges transition to detect newly unlocked trophies
    const prevBadges = calculateBadges(scoreRecords, unlockedBadgesMap);
    const nextScores = [newRecord, ...scoreRecords];
    const nextBadges = calculateBadges(nextScores, unlockedBadgesMap);

    const freshlyUnlocked = nextBadges.filter(
      (nb) => nb.isUnlocked && !prevBadges.find((pb) => pb.id === nb.id && pb.isUnlocked)
    );

    if (freshlyUnlocked.length > 0) {
      const updatedMap = { ...unlockedBadgesMap };
      freshlyUnlocked.forEach((b) => {
        updatedMap[b.id] = new Date().toISOString();
      });
      setUnlockedBadgesMap(updatedMap);
      try {
        localStorage.setItem('asgk_unlocked_badges_map', JSON.stringify(updatedMap));
      } catch {}

      if (settings.soundEffects) {
        soundManager.playBadgeUnlocked();
      }
      setNewlyUnlockedBadges(freshlyUnlocked);
    } else {
      setNewlyUnlockedBadges([]);
    }

    setScoreRecords(nextScores);
    setCurrentView('result');
  }, [activeModelId, activeModelSet, scoreRecords, settings.soundEffects, studentProfile.name, studentProfile.roll, unlockedBadgesMap]);

  const handleClearScores = useCallback(() => {
    setScoreRecords([]);
    try {
      localStorage.removeItem('asgk_permanent_scoreboard');
    } catch {}
  }, []);

  const handleOpenSettings = useCallback(() => setIsSettingsOpen(true), []);
  const handleCloseSettings = useCallback(() => setIsSettingsOpen(false), []);
  const handleOpenScoreBoard = useCallback(() => setIsScoreBoardOpen(true), []);
  const handleCloseScoreBoard = useCallback(() => setIsScoreBoardOpen(false), []);
  const handleOpenProfile = useCallback(() => setIsProfileOpen(true), []);
  const handleCloseProfile = useCallback(() => setIsProfileOpen(false), []);
  const handleOpenTrophiesModal = useCallback(() => setIsTrophiesModalOpen(true), []);
  const handleCloseTrophiesModal = useCallback(() => setIsTrophiesModalOpen(false), []);
  const handleOpenFlashcards = useCallback((modelId: number) => {
    if (modelId < 90000) {
      setCustomPracticeSet(null);
    }
    setActiveModelId(modelId);
    setNewlyUnlockedBadges([]);
    setCurrentView('flashcards');
  }, []);
  const handleExitQuiz = useCallback(() => setCurrentView('dashboard'), []);
  const handleRetake = useCallback(() => {
    setUserAnswers({});
    setQuizTimeSpent(0);
    setNewlyUnlockedBadges([]);
    setCurrentView('quiz');
  }, []);
  const handleSmartReplay = useCallback((missedQuestions: Question[]) => {
    if (missedQuestions.length === 0) return;
    const replaySet: ModelQuestionSet = {
      id: 99990 + Math.floor(Math.random() * 9),
      title: `Smart Replay (${missedQuestions.length} Questions)`,
      subtitle: `Targeted Practice: Retaking Missed Questions`,
      description: `Targeted review session composed exclusively of the ${missedQuestions.length} questions answered incorrectly in your previous quiz.`,
      totalQuestions: missedQuestions.length,
      questions: missedQuestions,
    };
    setCustomPracticeSet(replaySet);
    setActiveModelId(replaySet.id);
    setUserAnswers({});
    setQuizTimeSpent(0);
    setNewlyUnlockedBadges([]);
    setCurrentView('quiz');
  }, []);
  const handleStartSmartReplayFromRecord = useCallback((record: ScoreRecord) => {
    if (!record.userAnswers) return;
    const targetSet = modelQuestionSets.find((s) => s.id === record.modelNumber) || customPracticeSet;
    if (!targetSet) return;

    const missed = targetSet.questions.filter((q) => {
      const ans = record.userAnswers?.[q.id];
      return ans && ans !== q.correctAnswer;
    });

    if (missed.length > 0) {
      setIsScoreBoardOpen(false);
      handleSmartReplay(missed);
    }
  }, [customPracticeSet, handleSmartReplay]);
  const handleReturnToDashboard = useCallback(() => {
    setNewlyUnlockedBadges([]);
    setCurrentView('dashboard');
  }, []);
  const handleSaveProfile = useCallback((p: StudentProfile) => setStudentProfile(p), []);
  const currentTheme = getAppTheme(settings.theme);

  return (
    <div
      className={`relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-white flex flex-col font-sans transition-colors duration-500 ${
        isLoggedIn
          ? currentTheme.rootBgClass
          : 'bg-slate-950'
      }`}
    >
      {/* 1. Animated Colorful Aquarium Background (Active ONLY BEFORE login as requested) */}
      {!isLoggedIn && settings.enableAquariumAnimation && (
        <AquariumBackground
          fishCount={settings.aquariumFishCount}
          flowerCount={settings.aquariumFlowerCount}
          showOverlay={true}
        />
      )}

      {/* 2. Page Routing */}
      {!isLoggedIn ? (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          settings={settings}
          onUpdateSettings={updateSettings}
          onOpenSettings={handleOpenSettings}
        />
      ) : currentView === 'dashboard' ? (
        <ModelQuestionDashboard
          questionSets={modelQuestionSets}
          studentProfile={studentProfile}
          scoreRecords={scoreRecords}
          settings={settings}
          badges={badges}
          onSelectModel={handleSelectModel}
          onOpenFlashcards={handleOpenFlashcards}
          onStartCustomPractice={handleStartCustomPractice}
          onOpenCustomFlashcards={handleOpenCustomFlashcards}
          onOpenScoreBoard={handleOpenScoreBoard}
          onOpenTrophiesModal={handleOpenTrophiesModal}
          onOpenSettings={handleOpenSettings}
          onOpenProfile={handleOpenProfile}
          onLogout={handleLogout}
        />
      ) : currentView === 'quiz' ? (
        <QuizView
          modelSet={activeModelSet}
          settings={settings}
          studentProfile={studentProfile}
          onCheckAnswer={handleCheckAnswer}
          onExitQuiz={handleExitQuiz}
          onOpenSettings={handleOpenSettings}
          onUpdateSettings={updateSettings}
        />
      ) : currentView === 'flashcards' ? (
        <FlashcardView
          modelSet={activeModelSet}
          allSets={customPracticeSet ? [customPracticeSet, ...modelQuestionSets] : modelQuestionSets}
          settings={settings}
          studentProfile={studentProfile}
          onReturnToDashboard={handleReturnToDashboard}
          onStartQuiz={handleSelectModel}
          onSwitchModelSet={(modelId) => {
            if (modelId < 90000) setCustomPracticeSet(null);
            setActiveModelId(modelId);
          }}
        />
      ) : (
        <ResultView
          modelSet={activeModelSet}
          userAnswers={userAnswers}
          timeSpentSeconds={quizTimeSpent}
          studentProfile={studentProfile}
          settings={settings}
          newlyUnlockedBadges={newlyUnlockedBadges}
          allBadges={badges}
          onRetake={handleRetake}
          onSmartReplay={handleSmartReplay}
          onReturnToDashboard={handleReturnToDashboard}
          onOpenScoreBoard={handleOpenScoreBoard}
          onOpenTrophiesModal={handleOpenTrophiesModal}
          onOpenFlashcards={handleOpenFlashcards}
        />
      )}

      {/* 3. Global Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSettings={resetSettings}
      />

      <ScoreBoardModal
        isOpen={isScoreBoardOpen}
        onClose={handleCloseScoreBoard}
        scores={scoreRecords}
        badges={badges}
        onClearScores={handleClearScores}
        onStartSmartReplay={handleStartSmartReplayFromRecord}
      />

      <StudentInfoModal
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
        currentProfile={studentProfile}
        onSave={handleSaveProfile}
      />

      <TrophiesModal
        isOpen={isTrophiesModalOpen}
        onClose={handleCloseTrophiesModal}
        badges={badges}
        soundEffects={settings.soundEffects}
      />
    </div>
  );
}
