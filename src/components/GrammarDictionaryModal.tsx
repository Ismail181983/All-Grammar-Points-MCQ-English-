import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  X,
  Volume2,
  VolumeX,
  Star,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Lightbulb,
  Tag,
  ArrowRight,
  Filter,
  Bookmark,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  GRAMMAR_DICTIONARY_TERMS,
  GRAMMAR_DICTIONARY_CATEGORIES,
  GrammarDictionaryTerm,
} from '../data/grammarDictionary';
import { soundManager } from '../utils/sound';

interface GrammarDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEffects?: boolean;
  initialSearchQuery?: string;
  initialCategory?: string;
}

const BOOKMARKS_STORAGE_KEY = 'asgk_grammar_dict_bookmarks';

export const GrammarDictionaryModal: React.FC<GrammarDictionaryModalProps> = ({
  isOpen,
  onClose,
  soundEffects = true,
  initialSearchQuery = '',
  initialCategory = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);
  const [speakingTermId, setSpeakingTermId] = useState<string | null>(null);

  // Sync initial query if opened with one
  useEffect(() => {
    if (isOpen) {
      if (initialSearchQuery) setSearchQuery(initialSearchQuery);
      if (initialCategory) setSelectedCategory(initialCategory);
      // Auto-expand first term if query provided
      if (initialSearchQuery && GRAMMAR_DICTIONARY_TERMS.length > 0) {
        setExpandedTermId(GRAMMAR_DICTIONARY_TERMS[0].id);
      }
    }
  }, [isOpen, initialSearchQuery, initialCategory]);

  // Persist bookmarks
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (soundEffects) soundManager.playClick();
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Copy definition to clipboard
  const handleCopy = (term: GrammarDictionaryTerm, e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundEffects) soundManager.playClick();
    const textToCopy = `${term.term} (${term.category})\nDefinition: ${term.shortDefinition}\n${
      term.formulaOrRule ? `Rule: ${term.formulaOrRule}\n` : ''
    }${term.examTip ? `Exam Tip: ${term.examTip}` : ''}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedTermId(term.id);
      setTimeout(() => setCopiedTermId(null), 2500);
    });
  };

  // Text-To-Speech Pronunciation / Definition Readout
  const handleSpeak = (term: GrammarDictionaryTerm, e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundEffects) soundManager.playClick();

    if (!('speechSynthesis' in window)) return;

    if (speakingTermId === term.id) {
      window.speechSynthesis.cancel();
      setSpeakingTermId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const text = `${term.term}. Definition: ${term.shortDefinition}. ${
      term.formulaOrRule ? `Grammar rule: ${term.formulaOrRule}.` : ''
    } For example: ${term.examples[0]?.sentence || ''}`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingTermId(null);
    utterance.onerror = () => setSpeakingTermId(null);

    setSpeakingTermId(term.id);
    window.speechSynthesis.speak(utterance);
  };

  // Cleanup speech on modal close
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filtered terms list
  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return GRAMMAR_DICTIONARY_TERMS.filter((t) => {
      // Bookmark filter
      if (onlyBookmarks && !bookmarkedIds.includes(t.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && t.category !== selectedCategory) {
        return false;
      }

      // Alphabet letter filter
      if (selectedLetter !== 'All' && !t.term.toUpperCase().startsWith(selectedLetter)) {
        return false;
      }

      // Search query filter
      if (!q) return true;

      const inTerm = t.term.toLowerCase().includes(q);
      const inShortDef = t.shortDefinition.toLowerCase().includes(q);
      const inFull = t.fullExplanation.toLowerCase().includes(q);
      const inRule = t.formulaOrRule?.toLowerCase().includes(q) || false;
      const inExamTip = t.examTip?.toLowerCase().includes(q) || false;
      const inExamples = t.examples.some((ex) => ex.sentence.toLowerCase().includes(q));

      return inTerm || inShortDef || inFull || inRule || inExamTip || inExamples;
    });
  }, [searchQuery, selectedCategory, selectedLetter, onlyBookmarks, bookmarkedIds]);

  // Unique alphabet letters available in the terms dataset
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    GRAMMAR_DICTIONARY_TERMS.forEach((t) => {
      const firstChar = t.term.charAt(0).toUpperCase();
      if (firstChar >= 'A' && firstChar <= 'Z') letters.add(firstChar);
    });
    return Array.from(letters).sort();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0B132B] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-white overflow-hidden"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b border-cyan-500/20 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-[#0B132B] to-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                  English Grammar Dictionary
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[11px] font-mono font-bold">
                  {filteredTerms.length} Terms
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-xl truncate sm:max-w-none">
                Instant searchable reference for competitive exam grammar concepts, formulas, and traps.
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-dictionary-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-700 transition cursor-pointer shrink-0"
            title="Close Dictionary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-950/70 border-b border-slate-800/80 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input Field */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="dictionary-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search grammar terms, rules, formulas, e.g., 'Gerund', 'Subjunctive', 'Inversion'..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
                >
                  ×
                </button>
              )}
            </div>

            {/* Quick Filter: Bookmarks Only Toggle */}
            <button
              type="button"
              id="filter-bookmarks-btn"
              onClick={() => {
                if (soundEffects) soundManager.playClick();
                setOnlyBookmarks(!onlyBookmarks);
              }}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shrink-0 cursor-pointer border ${
                onlyBookmarks
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/30'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-slate-950' : ''}`} />
              <span>Favorites ({bookmarkedIds.length})</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              Category:
            </span>

            <button
              type="button"
              onClick={() => {
                if (soundEffects) soundManager.playClick();
                setSelectedCategory('All');
              }}
              className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Categories
            </button>

            {GRAMMAR_DICTIONARY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  if (soundEffects) soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Alphabet Index Jump Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[11px] font-mono scrollbar-none">
            <span className="text-slate-500 text-[10px] uppercase font-bold mr-1 shrink-0">A-Z Jump:</span>
            <button
              type="button"
              onClick={() => setSelectedLetter('All')}
              className={`px-2 py-0.5 rounded transition shrink-0 cursor-pointer ${
                selectedLetter === 'All' ? 'bg-cyan-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            {availableLetters.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => {
                  if (soundEffects) soundManager.playClick();
                  setSelectedLetter(letter);
                }}
                className={`px-2 py-0.5 rounded transition shrink-0 cursor-pointer ${
                  selectedLetter === letter
                    ? 'bg-cyan-400 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Terms Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <BookOpen className="w-12 h-12 mx-auto text-slate-600 opacity-60" />
              <h4 className="text-base font-bold text-slate-300">No grammar terms matched your criteria</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Try clearing your search query, switching categories, or toggling off the favorites filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedLetter('All');
                  setOnlyBookmarks(false);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredTerms.map((term) => {
              const isExpanded = expandedTermId === term.id;
              const isBookmarked = bookmarkedIds.includes(term.id);
              const isCopied = copiedTermId === term.id;
              const isSpeaking = speakingTermId === term.id;

              return (
                <div
                  key={term.id}
                  id={`term-card-${term.id}`}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-slate-900/90 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  {/* Term Summary Row (Always Visible) */}
                  <div
                    onClick={() => {
                      if (soundEffects) soundManager.playClick();
                      setExpandedTermId(isExpanded ? null : term.id);
                    }}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition">
                          {term.term}
                        </span>

                        {term.pronunciation && (
                          <span className="text-xs font-mono text-cyan-400/80">
                            {term.pronunciation}
                          </span>
                        )}

                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-semibold">
                          {term.category}
                        </span>

                        {term.partOfSpeechTag && (
                          <span className="px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold">
                            {term.partOfSpeechTag}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {term.shortDefinition}
                      </p>

                      {term.formulaOrRule && !isExpanded && (
                        <div className="pt-0.5">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
                            Rule: {term.formulaOrRule}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-center shrink-0">
                      {/* Audio Pronunciation / Readout */}
                      <button
                        type="button"
                        onClick={(e) => handleSpeak(term, e)}
                        className={`p-2 rounded-xl border transition cursor-pointer ${
                          isSpeaking
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 animate-pulse'
                            : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-700'
                        }`}
                        title={isSpeaking ? 'Stop Audio Readout' : 'Listen to Pronunciation & Definition'}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      {/* Copy Rule */}
                      <button
                        type="button"
                        onClick={(e) => handleCopy(term, e)}
                        className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition cursor-pointer"
                        title="Copy Definition & Rule"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Bookmark Star */}
                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(term.id, e)}
                        className={`p-2 rounded-xl border transition cursor-pointer ${
                          isBookmarked
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-slate-800 text-slate-400 hover:text-amber-300 border-slate-700 hover:bg-slate-700'
                        }`}
                        title={isBookmarked ? 'Remove from Favorites' : 'Add to Favorites'}
                      >
                        <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-slate-950' : ''}`} />
                      </button>

                      {/* Expand Chevron */}
                      <div className="p-2 rounded-xl bg-slate-800 text-slate-400">
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detailed View */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-800/80 bg-slate-950/60 p-4 sm:p-6 space-y-4 text-xs sm:text-sm"
                      >
                        {/* Formula or Syntax Box */}
                        {term.formulaOrRule && (
                          <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border border-cyan-500/40 space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" />
                              Grammar Formula & Core Rule
                            </span>
                            <div className="font-mono text-xs sm:text-sm text-cyan-200 font-semibold">
                              {term.formulaOrRule}
                            </div>
                          </div>
                        )}

                        {/* Full In-Depth Explanation */}
                        <div className="space-y-1.5">
                          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Detailed Explanation
                          </h5>
                          <p className="text-slate-200 leading-relaxed">
                            {term.fullExplanation}
                          </p>
                        </div>

                        {/* Examples Section */}
                        {term.examples && term.examples.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Illustrative Examples
                            </h5>
                            <div className="grid grid-cols-1 gap-2">
                              {term.examples.map((ex, idx) => (
                                <div
                                  key={idx}
                                  className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                                    ex.isCorrect !== false
                                      ? 'bg-slate-900 border-slate-800'
                                      : 'bg-rose-950/20 border-rose-500/30'
                                  }`}
                                >
                                  <span className="mt-0.5 shrink-0">
                                    {ex.isCorrect !== false ? (
                                      <span className="inline-flex w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 items-center justify-center font-bold text-[10px]">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="inline-flex w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 items-center justify-center font-bold text-[10px]">
                                        ✗
                                      </span>
                                    )}
                                  </span>
                                  <div className="space-y-0.5">
                                    <p className="font-medium text-white font-serif tracking-wide">
                                      &ldquo;{ex.sentence}&rdquo;
                                    </p>
                                    {ex.explanation && (
                                      <p className="text-[11px] text-slate-400">
                                        {ex.explanation}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Common Mistake Warning */}
                        {term.commonMistake && (
                          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-200 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-rose-300 text-xs">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span>Common Exam Pitfall to Avoid:</span>
                            </div>
                            <p className="text-xs text-rose-200/90 leading-relaxed">
                              {term.commonMistake}
                            </p>
                          </div>
                        )}

                        {/* Pro Exam Tip */}
                        {term.examTip && (
                          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>Competitive Exam Pro-Tip:</span>
                            </div>
                            <p className="text-xs text-amber-200/90 leading-relaxed">
                              {term.examTip}
                            </p>
                          </div>
                        )}

                        {/* Related Terms Chips */}
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
                            <span className="text-slate-400 font-bold flex items-center gap-1 text-[11px]">
                              <Tag className="w-3 h-3 text-cyan-400" />
                              Related Concepts:
                            </span>
                            {term.relatedTerms.map((rt) => (
                              <button
                                key={rt}
                                type="button"
                                onClick={() => {
                                  if (soundEffects) soundManager.playClick();
                                  setSearchQuery(rt);
                                  setSelectedCategory('All');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-[11px] font-semibold transition cursor-pointer flex items-center gap-1"
                              >
                                <span>{rt}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800/80 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Click any term to expand complete rules, exam examples, and pitfalls.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition cursor-pointer"
          >
            Close Dictionary
          </button>
        </div>
      </motion.div>
    </div>
  );
};
