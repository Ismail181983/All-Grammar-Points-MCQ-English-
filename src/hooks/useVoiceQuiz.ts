import { useState, useEffect, useRef, useCallback } from 'react';
import {
  isSpeechRecognitionSupported,
  parseSpokenInput,
  SpokenChoice,
  VoiceCommand,
} from '../utils/voiceRecognition';

interface UseVoiceQuizProps {
  currentOptions?: { A: string; B: string; C: string; D: string };
  disabled?: boolean;
  onSelectChoice: (choice: SpokenChoice) => void;
  onCommand?: (command: VoiceCommand) => void;
  onRecognitionFeedback?: (text: string) => void;
}

export interface UseVoiceQuizReturn {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  lastRecognizedChoice: SpokenChoice | null;
  lastMatchedPhrase: string | null;
  status: 'idle' | 'listening' | 'recognized' | 'error';
  errorMessage: string | null;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  clearFeedback: () => void;
}

export function useVoiceQuiz({
  currentOptions,
  disabled = false,
  onSelectChoice,
  onCommand,
  onRecognitionFeedback,
}: UseVoiceQuizProps): UseVoiceQuizReturn {
  const [isSupported] = useState(() => isSpeechRecognitionSupported());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [lastRecognizedChoice, setLastRecognizedChoice] = useState<SpokenChoice | null>(null);
  const [lastMatchedPhrase, setLastMatchedPhrase] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'listening' | 'recognized' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const disabledRef = useRef(disabled);
  const currentOptionsRef = useRef(currentOptions);
  const onSelectChoiceRef = useRef(onSelectChoice);
  const onCommandRef = useRef(onCommand);
  const onFeedbackRef = useRef(onRecognitionFeedback);
  const cooldownRef = useRef(false);
  const restartTimerRef = useRef<number | null>(null);

  // Sync refs to avoid stale closures in recognition event handlers
  useEffect(() => {
    disabledRef.current = disabled;
    currentOptionsRef.current = currentOptions;
    onSelectChoiceRef.current = onSelectChoice;
    onCommandRef.current = onCommand;
    onFeedbackRef.current = onRecognitionFeedback;
  }, [disabled, currentOptions, onSelectChoice, onCommand, onRecognitionFeedback]);

  // Keep isListeningRef in sync
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  const clearFeedback = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setLastRecognizedChoice(null);
    setLastMatchedPhrase(null);
    setErrorMessage(null);
    setStatus(isListeningRef.current ? 'listening' : 'idle');
  }, []);

  const handleProcessTranscript = useCallback((rawText: string, isFinal: boolean) => {
    if (!rawText.trim() || disabledRef.current || cooldownRef.current) return;

    const result = parseSpokenInput(rawText, currentOptionsRef.current);

    if (result.choice) {
      cooldownRef.current = true;
      setLastRecognizedChoice(result.choice);
      setLastMatchedPhrase(result.matchedText || `Option ${result.choice}`);
      setStatus('recognized');
      setTranscript(rawText);
      setInterimTranscript('');

      if (onFeedbackRef.current) {
        onFeedbackRef.current(`Option ${result.choice} recognized`);
      }

      onSelectChoiceRef.current(result.choice);

      // Reset cooldown and status after delay
      setTimeout(() => {
        cooldownRef.current = false;
        if (isListeningRef.current) {
          setStatus('listening');
        }
      }, 1500);

      return;
    }

    if (result.command) {
      setLastMatchedPhrase(`Command: ${result.command}`);
      setStatus('recognized');
      setTranscript(rawText);
      setInterimTranscript('');

      if (onCommandRef.current) {
        onCommandRef.current(result.command);
      }

      setTimeout(() => {
        if (isListeningRef.current) {
          setStatus('listening');
        }
      }, 1200);

      return;
    }

    if (isFinal) {
      setTranscript(rawText);
      setInterimTranscript('');
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setErrorMessage('Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
      setStatus('error');
      return;
    }

    if (disabledRef.current) return;

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setStatus('listening');
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            final += trans;
          } else {
            interim += trans;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
          // Also try to process interim results for instant responsiveness (e.g. user said "Option A")
          handleProcessTranscript(interim, false);
        }

        if (final) {
          setTranscript(final);
          handleProcessTranscript(final, true);
        }
      };

      recognition.onerror = (event: any) => {
        // Some errors like 'no-speech' or 'aborted' are benign and can be safely recovered
        if (event.error === 'no-speech' || event.error === 'aborted') {
          return;
        }

        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permission to use voice commands.');
          setIsListening(false);
          setStatus('error');
          return;
        }

        // Generic error fallback
        setErrorMessage(`Voice recognition note: ${event.error}`);
      };

      recognition.onend = () => {
        // If still supposed to be listening and not disabled, smoothly restart
        if (isListeningRef.current && !disabledRef.current) {
          if (restartTimerRef.current) {
            window.clearTimeout(restartTimerRef.current);
          }
          restartTimerRef.current = window.setTimeout(() => {
            if (isListeningRef.current && !disabledRef.current) {
              try {
                recognition.start();
              } catch {
                // If start fails, retry after brief delay
                setTimeout(() => {
                  if (isListeningRef.current && !disabledRef.current) {
                    try {
                      recognition.start();
                    } catch {}
                  }
                }, 400);
              }
            }
          }, 200);
        } else {
          setIsListening(false);
          setStatus('idle');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
      setStatus('listening');
    } catch (err: any) {
      console.warn('Speech recognition start error:', err);
      setErrorMessage('Could not activate microphone. Please check your browser audio settings.');
      setIsListening(false);
      setStatus('error');
    }
  }, [isSupported, handleProcessTranscript]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    setStatus('idle');
    setInterimTranscript('');

    if (restartTimerRef.current) {
      window.clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (restartTimerRef.current) {
        window.clearTimeout(restartTimerRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // When disabled changes to true (e.g. quiz paused), pause recognition
  useEffect(() => {
    if (disabled && isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    }
  }, [disabled, isListening]);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    lastRecognizedChoice,
    lastMatchedPhrase,
    status,
    errorMessage,
    startListening,
    stopListening,
    toggleListening,
    clearFeedback,
  };
}
