import React from 'react';
import { motion } from 'motion/react';
import {
  Settings,
  X,
  Volume2,
  Clock,
  Waves,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Bell,
  Play,
  Lock,
  Plus,
  Minus,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { QuizSettings } from '../types';
import { speechManager } from '../utils/speech';
import { soundManager } from '../utils/sound';
import { ThemeSwitcher } from './ThemeSwitcher';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: QuizSettings;
  onUpdateSettings: (newSettings: Partial<QuizSettings>) => void;
  onResetSettings: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
}) => {
  if (!isOpen) return null;

  const testVoice = () => {
    speechManager.speak(
      'Welcome to MCQ from all Grammar Points. Speech synthesis is functioning smoothly.',
      {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
        volume: settings.speechVolume,
      }
    );
  };

  const handleAmbientToggle = (checked: boolean) => {
    onUpdateSettings({ ambientSound: checked });
    if (checked) {
      soundManager.startAmbientAquarium();
    } else {
      soundManager.stopAmbientAquarium();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-white overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-cyan-500/25 flex items-center justify-between gap-4 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Smart & Modern Settings (কুইজ ও সিস্টেম কন্ট্রোল)
              </h3>
              <p className="text-xs text-cyan-300">
                Customize speech read-aloud, timers, aquarium animation, sound, and password expiry
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          {/* Visual Theme Switcher */}
          <ThemeSwitcher
            currentTheme={settings.theme}
            onSelectTheme={(theme) => onUpdateSettings({ theme })}
            soundEffects={settings.soundEffects}
          />

          {/* 1. Speech Read-Aloud Engine */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="font-bold text-white text-sm">Voice Read-Aloud (Speech Synthesis)</h4>
                  <p className="text-xs text-slate-400">
                    Reads aloud login messages, questions, options, score evaluation & praising words
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableSpeech}
                  onChange={(e) => onUpdateSettings({ enableSpeech: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            {settings.enableSpeech && (
              <div className="pt-3 border-t border-slate-800/80 space-y-3 text-xs">
                {/* Speech Rate Slider */}
                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>Reading Speed (Rate):</span>
                    <strong className="text-cyan-300">{settings.speechRate}x</strong>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.5"
                    step="0.1"
                    value={settings.speechRate}
                    onChange={(e) => onUpdateSettings({ speechRate: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                </div>

                {/* Speech Volume Slider */}
                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>Voice Volume:</span>
                    <strong className="text-cyan-300">{Math.round(settings.speechVolume * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={settings.speechVolume}
                    onChange={(e) => onUpdateSettings({ speechVolume: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                </div>

                {/* Test Speech Button */}
                <button
                  type="button"
                  onClick={testVoice}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-bold transition"
                >
                  <Play className="w-3.5 h-3.5" /> Test Voice Sample
                </button>
              </div>
            )}
          </div>

          {/* 2. Audio & Ambient Sound Effects */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2.5 mb-2">
              <Bell className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-white text-sm">Interactive Audio & Sound Effects</h4>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-slate-200 block">Button & Chime Effects</span>
                <span className="text-[11px] text-slate-400">Audio feedback on options selection, correct/wrong, and celebration fanfare</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.soundEffects}
                  onChange={(e) => onUpdateSettings({ soundEffects: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div>
                <span className="font-semibold text-xs text-slate-200 block">Ambient Aquarium Bubbles</span>
                <span className="text-[11px] text-slate-400">Gentle subtle underwater aquatic sound synthesis</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.ambientSound}
                  onChange={(e) => handleAmbientToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>

          {/* 3. Timer Controls (Total Quiz & Per-MCQ) */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2.5 mb-1">
              <Clock className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="font-bold text-white text-sm">Quiz Timers & Auto-Scroll Settings</h4>
                <p className="text-[11px] text-slate-400">কুইজের সময়সীমা, অটো-স্ক্রোল ও লক নিয়ন্ত্রণ</p>
              </div>
            </div>

            {/* Total 25 Questions Timer Toggle & Controls */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-slate-200 block">
                    ২৫টি কুইজের জন্য মোট সময় (Total 25-MCQ Timer)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    নির্দিষ্ট সময়ের মধ্যে সব উত্তর না দিলে কুইজ লক হবে এবং Check Answer সক্রিয় হবে
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableTotalTimer}
                    onChange={(e) => onUpdateSettings({ enableTotalTimer: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              {settings.enableTotalTimer && (
                <div className="pl-3 border-l-2 border-cyan-500/40 space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>২৫টি কুইজের মোট সময় (মিনিট):</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateSettings({ totalTimeMinutes: Math.max(2, settings.totalTimeMinutes - 1) })}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                        title="১ মিনিট কমান"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <strong className="text-cyan-300 font-mono text-sm px-2 py-0.5 rounded bg-slate-950 border border-cyan-500/30">
                        {settings.totalTimeMinutes} মিনিট
                      </strong>
                      <button
                        type="button"
                        onClick={() => onUpdateSettings({ totalTimeMinutes: Math.min(60, settings.totalTimeMinutes + 1) })}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                        title="১ মিনিট বাড়ান"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="60"
                    step="1"
                    value={settings.totalTimeMinutes}
                    onChange={(e) => onUpdateSettings({ totalTimeMinutes: parseInt(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>২ মিনিট</span>
                    <span>২০ মিনিট (Default)</span>
                    <span>৬০ মিনিট</span>
                  </div>
                </div>
              )}
            </div>

            {/* Per-MCQ Individual Timer Toggle & Controls */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-slate-200 block flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    প্রতিটি কুইজের জন্য সময় (Per-Question Timer & Auto-Lock)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    নির্দিষ্ট সময়ে উত্তর না দিলে প্রশ্নটি লক হয়ে যাবে; সময় বাড়াতে বা কমাতে পারেন
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableQuestionTimer}
                    onChange={(e) => onUpdateSettings({ enableQuestionTimer: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {settings.enableQuestionTimer && (
                <div className="pl-3 border-l-2 border-emerald-500/40 space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>প্রতি প্রশ্নের সময় (সেকেন্ড):</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateSettings({ questionTimeSeconds: Math.max(10, settings.questionTimeSeconds - 5) })}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
                        title="৫ সেকেন্ড কমান"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <strong className="text-emerald-300 font-mono text-sm px-2 py-0.5 rounded bg-slate-950 border border-emerald-500/30">
                        {settings.questionTimeSeconds} সেকেন্ড
                      </strong>
                      <button
                        type="button"
                        onClick={() => onUpdateSettings({ questionTimeSeconds: Math.min(180, settings.questionTimeSeconds + 5) })}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
                        title="৫ সেকেন্ড বাড়ান"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="180"
                    step="5"
                    value={settings.questionTimeSeconds}
                    onChange={(e) => onUpdateSettings({ questionTimeSeconds: parseInt(e.target.value) })}
                    className="w-full accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>১০ সেকেন্ড</span>
                    <span>৪৫ সেকেন্ড</span>
                    <span>১৮০ সেকেন্ড</span>
                  </div>
                </div>
              )}
            </div>

            {/* Auto Scroll to Next Question Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-slate-200 block flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  উত্তর দিলে স্বয়ংক্রিয় পরবর্তী কুইজে স্ক্রোল (Auto-Scroll)
                </span>
                <span className="text-[11px] text-slate-400">
                  একটি কুইজের অপশন নির্বাচন করলে স্বয়ংক্রিয়ভাবে পরবর্তী কুইজ সামনে আসবে
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoAdvanceOnAnswer ?? true}
                  onChange={(e) => onUpdateSettings({ autoAdvanceOnAnswer: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            {/* Always Show Explanations in Quiz Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-amber-300 block flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  কুইজ চলাকালীন ব্যাকরণ ব্যাখ্যা সক্রিয় রাখা (Always Show Explanations)
                </span>
                <span className="text-[11px] text-slate-400">
                  সক্রিয় থাকলে প্রতিটি প্রশ্নের নিচে বিস্তারিত ব্যাকরণ ব্যাখ্যা ও সঠিক উত্তর সর্বদা প্রদর্শিত থাকবে
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showExplanationInQuiz ?? false}
                  onChange={(e) => onUpdateSettings({ showExplanationInQuiz: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </div>

          {/* 4. Aquarium Animation Settings */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2.5 mb-2">
              <Waves className="w-5 h-5 text-cyan-300" />
              <h4 className="font-bold text-white text-sm">Aquarium Environment Animation</h4>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-slate-200 block">Enable Swimming Fishes & Water Flowers (Pre-Login Ambiance)</span>
                <span className="text-[11px] text-slate-400">Colorful aquarium displays before login and automatically turns off after login for focused testing</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableAquariumAnimation}
                  onChange={(e) => onUpdateSettings({ enableAquariumAnimation: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            {settings.enableAquariumAnimation && (
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>Fish Count:</span>
                    <strong className="text-cyan-300">{settings.aquariumFishCount} Fishes</strong>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    step="2"
                    value={settings.aquariumFishCount}
                    onChange={(e) => onUpdateSettings({ aquariumFishCount: parseInt(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-slate-300">
                    <span>Flower / Lily Count:</span>
                    <strong className="text-cyan-300">{settings.aquariumFlowerCount} Flowers</strong>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    step="1"
                    value={settings.aquariumFlowerCount}
                    onChange={(e) => onUpdateSettings({ aquariumFlowerCount: parseInt(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 5. Password Expiry Control (Requested by user) */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5 mb-1">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <div>
                <h4 className="font-bold text-white text-sm">
                  Password Expiration Control (পাসওয়ার্ড মেয়াদ উত্তীর্ণ সিস্টেম)
                </h4>
                <p className="text-xs text-slate-400">
                  Controls whether credentials expire with message: "Your password has expired. Contact with the Administrator Md. Ismail Hossain, 01728295215."
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div>
                <span className="font-semibold text-xs text-slate-200 block">
                  Simulate Expired Password Immediately
                </span>
                <span className="text-[11px] text-slate-400">
                  When enabled, login will instantly display and read aloud the expired alert
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.isManuallyExpired}
                  onChange={(e) => onUpdateSettings({ isManuallyExpired: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={onResetSettings}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black hover:brightness-110 transition shadow-md shadow-cyan-500/20"
          >
            Save & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
