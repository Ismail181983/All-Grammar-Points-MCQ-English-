import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  PhoneCall,
  Clock,
  ShieldAlert,
  KeyRound,
} from 'lucide-react';
import { HeaderClock } from './HeaderClock';
import { Footer } from './Footer';
import { speechManager } from '../utils/speech';
import { soundManager } from '../utils/sound';
import { QuizSettings } from '../types';

interface LoginPageProps {
  onLoginSuccess: (username: string) => void;
  settings: QuizSettings;
  onUpdateSettings: (newSettings: Partial<QuizSettings>) => void;
  onOpenSettings: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  settings,
  onUpdateSettings,
  onOpenSettings,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'idle' | 'success' | 'error' | 'expired';
    text: string;
  }>({ type: 'idle', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Read aloud helper respecting user settings
  const announceText = (text: string) => {
    if (settings.enableSpeech) {
      speechManager.speak(text, {
        rate: settings.speechRate,
        pitch: settings.speechPitch,
        volume: settings.speechVolume,
      });
    }
  };

  const handleAutofill = () => {
    if (settings.soundEffects) soundManager.playClick();
    setUsername('Bangladesh1971');
    setPassword('2024');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings.soundEffects) soundManager.playClick();

    setIsLoading(true);

    setTimeout(() => {
      // 1. Check if password has expired
      // Either manually set to expired in settings OR expired by timestamp
      const isExpired =
        settings.isManuallyExpired ||
        (settings.enablePasswordExpiry &&
          settings.passwordExpiryDate &&
          new Date().getTime() > new Date(settings.passwordExpiryDate).getTime());

      if (isExpired) {
        const expiredMsg =
          'Your password has expired. Contact with the Administrator Md. Ismail Hossain, 01728295215.';
        setStatusMessage({
          type: 'expired',
          text: expiredMsg,
        });
        if (settings.soundEffects) soundManager.playWrong();
        announceText(expiredMsg);
        setIsLoading(false);
        return;
      }

      // 2. Check credentials: Bangladesh1971 / 2024
      const trimmedUser = username.trim();
      const trimmedPass = password.trim();

      if (trimmedUser === 'Bangladesh1971' && trimmedPass === '2024') {
        const successMsg = 'You have successfully Logged in the page. Welcome the page.';
        setStatusMessage({
          type: 'success',
          text: successMsg,
        });
        if (settings.soundEffects) soundManager.playCorrect();
        announceText(successMsg);

        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(trimmedUser);
        }, 1600);
      } else {
        const errorMsg =
          'Wrong User name and password. Try Again. Contact with the Administrator Md. Ismail Hossain, 01728295215.';
        setStatusMessage({
          type: 'error',
          text: errorMsg,
        });
        if (settings.soundEffects) soundManager.playWrong();
        announceText(errorMsg);
        setIsLoading(false);
      }
    }, 400);
  };

  const toggleSpeechAloud = () => {
    const newState = !settings.enableSpeech;
    onUpdateSettings({ enableSpeech: newState });
    if (!newState) {
      speechManager.stop();
    } else {
      announceText('Read aloud speech voice enabled.');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-slate-100 z-10">
      {/* Top Header Bar */}
      <header className="relative z-30 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
        {/* Left Welcome Branding */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-500 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-slate-950 flex items-center justify-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-sm xs:text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                MCQ from all Grammar Points
              </span>
            </h2>
            <p className="text-[10px] xs:text-xs text-cyan-200/80 font-medium line-clamp-1 xs:line-clamp-none">
              English Grammar Competence & Model Testing Portal
            </p>
          </div>
        </div>

        {/* Right side: Digital Clock & Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            id="toggle-speech-quick-btn"
            onClick={toggleSpeechAloud}
            className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border backdrop-blur-md transition shrink-0 ${
              settings.enableSpeech
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                : 'bg-slate-900/80 border-slate-700 text-slate-400'
            }`}
            title={settings.enableSpeech ? 'Mute Read Aloud' : 'Enable Read Aloud'}
          >
            {settings.enableSpeech ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Digital Clock with Date and Week */}
          <HeaderClock />
        </div>
      </header>

      {/* Main Login Center Card */}
      <main className="relative z-20 flex-1 flex items-center justify-center px-3 sm:px-6 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg lg:max-w-xl rounded-2xl sm:rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/40 p-4 xs:p-6 sm:p-8 md:p-9 shadow-[0_0_50px_rgba(6,182,212,0.25)] relative overflow-hidden"
        >
          {/* Top Decorative Ambient Glows */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* 1. BISMILLAH IN ARABIC AND BENGALI (REQUIRED) */}
          <div id="bismillah-header" className="text-center pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-cyan-500/25">
            {/* Arabic Calligraphy */}
            <h1
              className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-serif text-amber-300 tracking-wide font-normal mb-1 sm:mb-1.5 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)] break-words leading-relaxed"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h1>
            {/* Bengali Translation */}
            <p
              className="text-sm xs:text-base sm:text-lg font-semibold text-cyan-200 tracking-normal"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              “বিসমিল্লাহির রাহমানির রাহিম”
            </p>
          </div>

          {/* 2. Educator Photo & Welcome Heading */}
          <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
            <div className="relative mb-2.5 sm:mb-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-emerald-400 to-amber-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <img
                  src="https://i.ibb.co.com/Lz1qrSv4/My-Passport-Photo.png"
                  alt="Md. Ismail Hossain"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full bg-slate-800"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== 'https://i.imgur.com/akJtZZb.jpeg') {
                      target.src = 'https://i.imgur.com/akJtZZb.jpeg';
                    }
                  }}
                />
              </div>
            </div>

            <h2 className="text-lg xs:text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Welcome to MCQ from all Grammar Points
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1 max-w-md">
              Please enter your authentication credentials to access Model Questions
            </p>
          </div>

          {/* 3. Status Notification & Read-Aloud Banner */}
          <AnimatePresence>
            {statusMessage.type !== 'idle' && (
              <motion.div
                id="login-status-message"
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                className={`mb-6 p-4 rounded-2xl border text-sm flex items-start gap-3 shadow-lg ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-100 shadow-emerald-500/20'
                    : statusMessage.type === 'expired'
                    ? 'bg-amber-950/85 border-amber-500/60 text-amber-100 shadow-amber-500/25'
                    : 'bg-rose-950/80 border-rose-500/60 text-rose-100 shadow-rose-500/20'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : statusMessage.type === 'expired' ? (
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold leading-relaxed">{statusMessage.text}</p>
                  {(statusMessage.type === 'error' || statusMessage.type === 'expired') && (
                    <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap items-center gap-3">
                      <a
                        href="tel:01728295215"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 underline"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Call Admin (01728-295215)
                      </a>
                    </div>
                  )}
                </div>
                {settings.enableSpeech && (
                  <button
                    type="button"
                    onClick={() => announceText(statusMessage.text)}
                    className="p-1 rounded-lg hover:bg-white/10 text-cyan-300"
                    title="Read Aloud Again"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Credentials Demo Helper Pill */}
          <div className="mb-4 sm:mb-5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-cyan-200 font-medium text-[11px] sm:text-xs">
              <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>
                Default ID: <strong className="text-white font-mono">Bangladesh1971</strong> | Pass:{' '}
                <strong className="text-white font-mono">2024</strong>
              </span>
            </div>
            <button
              id="autofill-credentials-btn"
              type="button"
              onClick={handleAutofill}
              className="w-full xs:w-auto px-2.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/40 font-bold transition text-[11px] text-center shrink-0 cursor-pointer"
            >
              Fill Credentials
            </button>
          </div>

          {/* 5. Login Form */}
          <form onSubmit={handleLogin} className="space-y-3.5 sm:space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1">
                User Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  id="login-username-input"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Bangladesh1971"
                  className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 text-base sm:text-sm font-medium transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  id="login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full pl-10 sm:pl-11 pr-11 sm:pr-12 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 text-base sm:text-sm font-medium transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-cyan-300 transition"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 min-h-[46px] sm:min-h-[50px] py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-slate-950 font-black text-sm sm:text-base shadow-[0_4px_25px_rgba(6,182,212,0.4)] hover:shadow-[0_6px_30px_rgba(6,182,212,0.6)] hover:brightness-110 active:scale-[0.99] transition transform disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Log In to Model Tests</span>
                </>
              )}
            </button>
          </form>

          {/* Expiration Testing Controls / Admin Info */}
          <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="text-[11px] sm:text-xs">
                Expiry Simulation: {settings.isManuallyExpired ? (
                  <strong className="text-rose-400">Password Expired Mode</strong>
                ) : (
                  <strong className="text-emerald-400">Active</strong>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onUpdateSettings({ isManuallyExpired: !settings.isManuallyExpired });
                  if (settings.soundEffects) soundManager.playClick();
                }}
                className={`px-2.5 py-1.5 rounded-lg border font-semibold text-[11px] transition shrink-0 ${
                  settings.isManuallyExpired
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {settings.isManuallyExpired ? 'Restore Valid Password' : 'Simulate Password Expiry'}
              </button>

              <button
                type="button"
                onClick={onOpenSettings}
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline text-xs shrink-0"
              >
                Settings
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Login Footer */}
      <Footer />
    </div>
  );
};
