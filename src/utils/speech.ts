/**
 * Speech synthesis utility using browser Web Speech API
 */

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

class SpeechManager {
  private isSupported: boolean;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public speak(
    text: string,
    options: SpeechOptions = {},
    onEnd?: () => void,
    onError?: (err: any) => void
  ): boolean {
    if (!this.isSupported) {
      console.warn('Speech synthesis not supported in this browser.');
      if (onEnd) onEnd();
      return false;
    }

    try {
      // Cancel previous utterance if speaking
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate ?? 1.0;
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = options.volume ?? 1.0;
      utterance.lang = options.lang ?? 'en-US';

      // Pick high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => (v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB')) && !v.name.includes('Google')
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        if (onError) onError(e);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.error('Error speaking text:', err);
      if (onError) onError(err);
      return false;
    }
  }

  public stop(): void {
    if (this.isSupported) {
      try {
        window.speechSynthesis.cancel();
        this.currentUtterance = null;
      } catch (err) {
        console.error('Failed to cancel speech synthesis:', err);
      }
    }
  }

  public cancel(): void {
    this.stop();
  }

  public isSpeakingNow(): boolean {
    if (!this.isSupported) return false;
    return window.speechSynthesis.speaking;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.isSupported) return [];
    return window.speechSynthesis.getVoices();
  }
}

export const speechManager = new SpeechManager();
