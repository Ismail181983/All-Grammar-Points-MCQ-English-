import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lightbulb,
  Sparkles,
  RefreshCw,
  Volume2,
  VolumeX,
  ArrowRight,
  Check,
  X,
  Bookmark,
  Calendar,
  Layers,
} from 'lucide-react';
import { GrammarFact, getDailyGrammarFact, getRandomGrammarFact, DAILY_GRAMMAR_FACTS } from '../data/grammarFacts';
import { GrammarCategory } from '../types';
import { soundManager } from '../utils/sound';

interface DailyGrammarFactWidgetProps {
  onSelectCategory?: (category: GrammarCategory) => void;
  enableSpeech?: boolean;
  soundEffects?: boolean;
}

export const DailyGrammarFactWidget: React.FC<DailyGrammarFactWidgetProps> = ({
  onSelectCategory,
  enableSpeech = true,
  soundEffects = true,
}) => {
  const [fact, setFact] = useState<GrammarFact>(() => getDailyGrammarFact());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if current fact is today's default fact
  const todayDefaultFact = getDailyGrammarFact();
  const isTodayFact = fact.id === todayDefaultFact.id;

  // Format today's date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date());

  const handleNextFact = () => {
    if (soundEffects) soundManager.playClick();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    const next = getRandomGrammarFact(fact.id);
    setFact(next);
  };

  const handleResetToToday = () => {
    if (soundEffects) soundManager.playClick();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setFact(todayDefaultFact);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${fact.title}. Rule: ${fact.rule}. Example: Correct: ${fact.exampleCorrect}. ${
      fact.exampleIncorrect ? `Incorrect: ${fact.exampleIncorrect}.` : ''
    } ${fact.explanation}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyFact = () => {
    if (soundEffects) soundManager.playClick();
    const text = `💡 English Grammar Tip: ${fact.title}\n• Rule: ${fact.rule}\n• ✅ Correct: ${fact.exampleCorrect}\n${
      fact.exampleIncorrect ? `• ❌ Incorrect: ${fact.exampleIncorrect}\n` : ''
    }• Explanation: ${fact.explanation}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePracticeCategory = () => {
    if (soundEffects) soundManager.playClick();
    if (onSelectCategory) {
      onSelectCategory(fact.category);
    }
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div
      id="daily-grammar-fact-widget"
      className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-[#0d1629] to-slate-950 border border-cyan-500/30 shadow-[0_4px_24px_rgba(6,182,212,0.12)] p-4 sm:p-5 md:p-6 relative overflow-hidden text-white"
    >
      {/* Decorative subtle ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-amber-500/25 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-sm shrink-0">
            <Lightbulb className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-black text-amber-400 tracking-wide uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Daily Grammar Fact
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] sm:text-xs text-cyan-300 font-mono font-bold">
                <Calendar className="w-3 h-3 text-cyan-400" />
                {todayFormatted}
              </span>
              {!isTodayFact && (
                <span className="px-2 py-0.5 rounded-full bg-purple-950/70 border border-purple-400/40 text-[10px] text-purple-300 font-bold">
                  Browsing Tip #{fact.id}
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 hidden xs:block mt-0.5">
              High-yield rule of the day to sharpen your BCS & competitive exam accuracy
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {enableSpeech && (
            <button
              type="button"
              id="speak-grammar-fact-btn"
              onClick={handleSpeak}
              className={`p-2 rounded-xl border transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isSpeaking ? 'Stop Reading' : 'Listen to Grammar Rule'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span className="hidden md:inline text-[11px]">{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
          )}

          <button
            type="button"
            id="copy-grammar-fact-btn"
            onClick={handleCopyFact}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Copy Tip to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-amber-400" />}
          </button>

          {!isTodayFact && (
            <button
              type="button"
              id="reset-today-fact-btn"
              onClick={handleResetToToday}
              className="px-2.5 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition cursor-pointer"
              title="Return to Today's Official Tip"
            >
              Today's Tip
            </button>
          )}

          <button
            type="button"
            id="shuffle-grammar-fact-btn"
            onClick={handleNextFact}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition cursor-pointer shadow-sm"
            title="View Another Random Grammar Tip"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next Tip</span>
          </button>
        </div>
      </div>

      {/* Fact Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={fact.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="pt-3 sm:pt-4 space-y-3 sm:space-y-4 relative z-10"
        >
          {/* Title & Category pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
              {fact.title}
            </h3>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-1 shrink-0">
                <Layers className="w-3 h-3 text-cyan-400" />
                {fact.category}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Tip #{fact.id} / {DAILY_GRAMMAR_FACTS.length}
              </span>
            </div>
          </div>

          {/* Rule Statement */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              <strong className="text-cyan-300 font-bold">Rule: </strong>
              {fact.rule}
            </p>
          </div>

          {/* Correct vs Incorrect Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Correct Example */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-2.5">
              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-400 block mb-0.5">
                  Correct Usage
                </span>
                <p className="text-xs sm:text-sm font-semibold text-emerald-100 italic">
                  "{fact.exampleCorrect}"
                </p>
              </div>
            </div>

            {/* Incorrect Example */}
            {fact.exampleIncorrect && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-rose-400 block mb-0.5">
                    Common Mistake
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-rose-200/90 italic line-through decoration-rose-400/80">
                    "{fact.exampleIncorrect}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Explanation & Pro Tip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="space-y-1 flex-1">
              <p className="text-xs text-slate-300 leading-relaxed">
                <span className="text-amber-300 font-semibold">Why it matters: </span>
                {fact.explanation}
              </p>
              {fact.proTip && (
                <p className="text-[11px] text-amber-200/90 font-medium">
                  💡 <span className="underline decoration-amber-400/50">Pro Tip:</span> {fact.proTip}
                </p>
              )}
            </div>

            {/* Practice Category Button */}
            {onSelectCategory && (
              <button
                type="button"
                id={`practice-category-${fact.category.toLowerCase().replace(/\s+/g, '-')}-btn`}
                onClick={handlePracticeCategory}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
                title={`Filter question sets to ${fact.category} questions`}
              >
                <span>Filter to {fact.category}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
