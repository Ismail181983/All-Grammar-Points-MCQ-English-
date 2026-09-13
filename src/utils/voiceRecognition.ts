/**
 * Voice Recognition & Spoken Option Mapping Utility
 * Uses the Web Speech API (SpeechRecognition / webkitSpeechRecognition)
 */

export type SpokenChoice = 'A' | 'B' | 'C' | 'D';
export type VoiceCommand = 'next' | 'previous' | 'read_question' | 'stop_listening';

export interface ParseResult {
  choice: SpokenChoice | null;
  command: VoiceCommand | null;
  matchedText: string;
  confidence: 'high' | 'medium' | 'low';
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

/**
 * Normalizes speech transcript for uniform matching
 */
export function normalizeTranscript(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Maps spoken speech transcript to Option A, B, C, or D (e.g. "Option A", "Select B", etc.)
 * or control commands ("Next", "Previous", "Read question").
 */
export function parseSpokenInput(
  rawTranscript: string,
  options?: { A: string; B: string; C: string; D: string }
): ParseResult {
  const text = normalizeTranscript(rawTranscript);

  // 1. Check Voice Navigation / Control Commands
  if (/\b(?:stop\s+listening|stop\s+voice|turn\s+off\s+mic|mute\s+mic)\b/i.test(text)) {
    return { choice: null, command: 'stop_listening', matchedText: rawTranscript, confidence: 'high' };
  }
  if (/\b(?:next\s+question|next|go\s+next|skip\s+question)\b/i.test(text)) {
    return { choice: null, command: 'next', matchedText: rawTranscript, confidence: 'high' };
  }
  if (/\b(?:previous\s+question|previous|go\s+back|back)\b/i.test(text)) {
    return { choice: null, command: 'previous', matchedText: rawTranscript, confidence: 'high' };
  }
  if (/\b(?:read\s+question|read\s+aloud|repeat\s+question|speak\s+question)\b/i.test(text)) {
    return { choice: null, command: 'read_question', matchedText: rawTranscript, confidence: 'high' };
  }

  // 2. High-confidence explicit option patterns: "Option A", "Choice B", "Select C", "Answer D", "Pick A"
  // Patterns like: "option a", "option b", "option c", "option d"
  const explicitChoiceRegex = /\b(?:option|choice|select|answer|letter|pick)\s+([abcd]|alpha|bravo|charlie|delta|see|sea|bee|dee|ay)\b/i;
  const explicitMatch = text.match(explicitChoiceRegex);
  if (explicitMatch) {
    const rawTarget = explicitMatch[1].toLowerCase();
    let choice: SpokenChoice | null = null;
    if (rawTarget === 'a' || rawTarget === 'alpha' || rawTarget === 'ay') choice = 'A';
    else if (rawTarget === 'b' || rawTarget === 'bravo' || rawTarget === 'bee') choice = 'B';
    else if (rawTarget === 'c' || rawTarget === 'charlie' || rawTarget === 'see' || rawTarget === 'sea') choice = 'C';
    else if (rawTarget === 'd' || rawTarget === 'delta' || rawTarget === 'dee') choice = 'D';

    if (choice) {
      return { choice, command: null, matchedText: explicitMatch[0], confidence: 'high' };
    }
  }

  // Check prefix combinations without space like "optiona", "optionb"
  if (/\boption\s*a\b/i.test(text) || /\bchoice\s*a\b/i.test(text) || /\banswer\s*a\b/i.test(text)) {
    return { choice: 'A', command: null, matchedText: 'Option A', confidence: 'high' };
  }
  if (/\boption\s*b\b/i.test(text) || /\bchoice\s*b\b/i.test(text) || /\banswer\s*b\b/i.test(text)) {
    return { choice: 'B', command: null, matchedText: 'Option B', confidence: 'high' };
  }
  if (/\boption\s*(?:c|see|sea)\b/i.test(text) || /\bchoice\s*(?:c|see|sea)\b/i.test(text) || /\banswer\s*(?:c|see|sea)\b/i.test(text)) {
    return { choice: 'C', command: null, matchedText: 'Option C', confidence: 'high' };
  }
  if (/\boption\s*(?:d|dee)\b/i.test(text) || /\bchoice\s*(?:d|dee)\b/i.test(text) || /\banswer\s*(?:d|dee)\b/i.test(text)) {
    return { choice: 'D', command: null, matchedText: 'Option D', confidence: 'high' };
  }

  // 3. Ordinal or number mapping: "number 1" -> A, "first option" -> A, "number 2" -> B, etc.
  if (/\b(?:first\s+option|option\s+1|number\s+1|option\s+one|number\s+one)\b/i.test(text)) {
    return { choice: 'A', command: null, matchedText: 'First Option (A)', confidence: 'high' };
  }
  if (/\b(?:second\s+option|option\s+2|number\s+2|option\s+two|number\s+two)\b/i.test(text)) {
    return { choice: 'B', command: null, matchedText: 'Second Option (B)', confidence: 'high' };
  }
  if (/\b(?:third\s+option|option\s+3|number\s+3|option\s+three|number\s+three)\b/i.test(text)) {
    return { choice: 'C', command: null, matchedText: 'Third Option (C)', confidence: 'high' };
  }
  if (/\b(?:fourth\s+option|option\s+4|number\s+4|option\s+four|number\s+four)\b/i.test(text)) {
    return { choice: 'D', command: null, matchedText: 'Fourth Option (D)', confidence: 'high' };
  }

  // 4. Standalone spoken letter or phonetic name (when words count <= 2)
  const tokens = text.split(' ').filter(Boolean);
  if (tokens.length <= 2) {
    if (tokens.includes('a') || tokens.includes('alpha')) {
      return { choice: 'A', command: null, matchedText: 'A', confidence: 'medium' };
    }
    if (tokens.includes('b') || tokens.includes('bravo') || tokens.includes('bee')) {
      return { choice: 'B', command: null, matchedText: 'B', confidence: 'medium' };
    }
    if (tokens.includes('c') || tokens.includes('charlie') || tokens.includes('see') || tokens.includes('sea')) {
      return { choice: 'C', command: null, matchedText: 'C', confidence: 'medium' };
    }
    if (tokens.includes('d') || tokens.includes('delta') || tokens.includes('dee')) {
      return { choice: 'D', command: null, matchedText: 'D', confidence: 'medium' };
    }
  }

  // 5. Semantic Option Text Matching (if user read out the option text itself)
  if (options) {
    const keys: SpokenChoice[] = ['A', 'B', 'C', 'D'];
    for (const key of keys) {
      const optText = normalizeTranscript(options[key]);
      if (optText.length >= 3) {
        // If exact match or significant substring match
        if (text === optText || (optText.length >= 5 && text.includes(optText))) {
          return {
            choice: key,
            command: null,
            matchedText: `Option ${key}: ${options[key]}`,
            confidence: 'high',
          };
        }
      }
    }
  }

  return { choice: null, command: null, matchedText: '', confidence: 'low' };
}

export interface VoiceRecognitionState {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  interimTranscript: string;
  lastRecognizedChoice: SpokenChoice | null;
  lastMatchedPhrase: string | null;
  errorMessage: string | null;
}
