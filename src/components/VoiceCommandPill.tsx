import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Radio,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { SpokenChoice } from '../utils/voiceRecognition';

interface VoiceCommandPillProps {
  isListening: boolean;
  isSupported: boolean;
  status: 'idle' | 'listening' | 'recognized' | 'error';
  transcript: string;
  interimTranscript: string;
  lastRecognizedChoice: SpokenChoice | null;
  lastMatchedPhrase: string | null;
  errorMessage: string | null;
  onToggle: () => void;
  onCloseError?: () => void;
}

export const VoiceCommandPill: React.FC<VoiceCommandPillProps> = ({
  isListening,
  isSupported,
  status,
  transcript,
  interimTranscript,
  lastRecognizedChoice,
  lastMatchedPhrase,
  errorMessage,
  onToggle,
  onCloseError,
}) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const displayedSpeech = interimTranscript || transcript;

  return (
    <div className="relative">
      {/* Active Voice Listening Banner / Pill */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`mb-3.5 px-3.5 py-2.5 rounded-2xl border flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 transition-all shadow-lg ${
              status === 'recognized'
                ? 'bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-slate-900 border-emerald-400 text-emerald-200 shadow-emerald-500/20 ring-1 ring-emerald-400'
                : 'bg-gradient-to-r from-cyan-950/90 via-sky-950/90 to-slate-900 border-cyan-400/60 text-cyan-200 shadow-cyan-500/20'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {/* Pulsing Audio Indicator */}
              <div className="relative flex items-center justify-center shrink-0">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      status === 'recognized' ? 'bg-emerald-400' : 'bg-cyan-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      status === 'recognized' ? 'bg-emerald-500' : 'bg-cyan-500'
                    }`}
                  />
                </span>
              </div>

              {/* Status Text & Realtime Transcription */}
              <div className="min-w-0 flex-1 text-xs">
                {status === 'recognized' && lastRecognizedChoice ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-black text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Selected Option {lastRecognizedChoice}
                    </span>
                    {lastMatchedPhrase && (
                      <span className="text-[11px] text-emerald-200/80 truncate">
                        (Spoken: &ldquo;{lastMatchedPhrase}&rdquo;)
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white flex items-center gap-1">
                      <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                      Listening:
                    </span>
                    {displayedSpeech ? (
                      <span className="italic text-cyan-200 font-medium truncate max-w-[280px]">
                        &ldquo;{displayedSpeech}&rdquo;
                      </span>
                    ) : (
                      <span className="text-slate-300 text-[11px]">
                        Say <strong className="text-cyan-300">&ldquo;Option A&rdquo;</strong>,{' '}
                        <strong className="text-cyan-300">&ldquo;Option B&rdquo;</strong>,{' '}
                        <strong className="text-cyan-300">&ldquo;Option C&rdquo;</strong>, or{' '}
                        <strong className="text-cyan-300">&ldquo;Option D&rdquo;</strong>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions: Help button & Mic Mute button */}
            <div className="flex items-center gap-1.5 self-end xs:self-center shrink-0">
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="p-1 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition cursor-pointer"
                title="Voice Command Help & Tips"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onToggle}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-400/50 text-slate-300 hover:text-rose-300 text-[10px] font-bold transition cursor-pointer"
                title="Turn off voice commands"
              >
                <MicOff className="w-3 h-3" />
                <span>Turn Off</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error / Not Allowed Alert */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-3 p-3 rounded-2xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-start justify-between gap-2 shadow-lg"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold mb-0.5">Voice Command Notice</strong>
                <p className="text-[11px] text-rose-200/90 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
            {onCloseError && (
              <button
                type="button"
                onClick={onCloseError}
                className="p-1 rounded-lg text-rose-300 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-5 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-white"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      Voice Commands Guide
                    </h3>
                    <p className="text-[11px] text-cyan-300">Hands-free voice answering commands</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-cyan-300 block font-bold mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    How to Answer Questions:
                  </strong>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="font-mono text-cyan-400 font-bold">Option A</span> or{' '}
                      <span className="text-slate-300">&ldquo;Select A&rdquo;</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="font-mono text-cyan-400 font-bold">Option B</span> or{' '}
                      <span className="text-slate-300">&ldquo;Select B&rdquo;</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="font-mono text-cyan-400 font-bold">Option C</span> or{' '}
                      <span className="text-slate-300">&ldquo;Select C&rdquo;</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="font-mono text-cyan-400 font-bold">Option D</span> or{' '}
                      <span className="text-slate-300">&ldquo;Select D&rdquo;</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-slate-200 block font-bold mb-1">Navigation Commands:</strong>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
                    <li>
                      <strong className="text-white">&ldquo;Next question&rdquo;</strong> /{' '}
                      <strong className="text-white">&ldquo;Next&rdquo;</strong> — Advance to next
                    </li>
                    <li>
                      <strong className="text-white">&ldquo;Previous question&rdquo;</strong> /{' '}
                      <strong className="text-white">&ldquo;Back&rdquo;</strong> — Go back
                    </li>
                    <li>
                      <strong className="text-white">&ldquo;Read question&rdquo;</strong> — Read question aloud
                    </li>
                    <li>
                      <strong className="text-white">&ldquo;Stop listening&rdquo;</strong> — Turn off microphone
                    </li>
                  </ul>
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed">
                  💡 Tip: Speak clearly into your microphone in English. The selected choice will automatically confirm with a chime and checkmark.
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
