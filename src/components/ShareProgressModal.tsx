import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Share2,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  FileText,
  Code2,
  Sparkles,
  Trophy,
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { BadgeProgress, StudentProfile, QuizSettings } from '../types';
import {
  ShareCardData,
  generateShareCardBlob,
  generateShareTextSnippet,
  generateScoreDetailsExport,
  copyImageBlobToClipboard,
  copyTextToClipboard,
  formatDuration,
} from '../utils/shareCard';
import { soundManager } from '../utils/sound';

interface ShareProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareCardData;
  settings?: QuizSettings;
}

export const ShareProgressModal: React.FC<ShareProgressModalProps> = ({
  isOpen,
  onClose,
  data,
  settings,
}) => {
  const [activeTab, setActiveTab] = useState<'image' | 'text' | 'export'>('image');
  const [cardBlob, setCardBlob] = useState<Blob | null>(null);
  const [cardPreviewUrl, setCardPreviewUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generate Image Blob when modal opens
  useEffect(() => {
    if (!isOpen) {
      setCopyStatus(null);
      return;
    }

    let isMounted = true;
    setIsGeneratingImage(true);

    generateShareCardBlob(data)
      .then((blob) => {
        if (!isMounted) return;
        setCardBlob(blob);
        const url = URL.createObjectURL(blob);
        setCardPreviewUrl(url);
        setIsGeneratingImage(false);
      })
      .catch((err) => {
        console.error('Failed to generate scorecard canvas image:', err);
        if (isMounted) setIsGeneratingImage(false);
      });

    return () => {
      isMounted = false;
      if (cardPreviewUrl) {
        URL.revokeObjectURL(cardPreviewUrl);
      }
    };
  }, [isOpen, data]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const textSnippet = useMemo(() => generateShareTextSnippet(data), [data]);
  const exportJson = useMemo(() => generateScoreDetailsExport(data), [data]);

  // Handle Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!cardBlob) return;
    if (settings?.soundEffects) soundManager.playClick();

    setCopyStatus('copying-image');
    const success = await copyImageBlobToClipboard(cardBlob);

    if (success) {
      setCopyStatus('copied-image');
      showToast('Scorecard image copied to clipboard! (Ready to paste)');
      setTimeout(() => setCopyStatus(null), 2500);
    } else {
      // If clipboard image is blocked by browser policy, fall back to downloading
      setCopyStatus(null);
      handleDownloadImage();
      showToast('Clipboard image access was restricted; downloading PNG card instead!');
    }
  };

  // Handle Download Image PNG
  const handleDownloadImage = () => {
    if (!cardBlob) return;
    if (settings?.soundEffects) soundManager.playClick();

    const url = URL.createObjectURL(cardBlob);
    const a = document.createElement('a');
    const safeTitle = data.modelTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
    a.href = url;
    a.download = `GrammarQuiz-ScoreCard-${safeTitle}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Scorecard PNG downloaded!');
  };

  // Handle Copy Text Snippet
  const handleCopyText = async () => {
    if (settings?.soundEffects) soundManager.playClick();
    setCopyStatus('copying-text');
    const success = await copyTextToClipboard(textSnippet);

    if (success) {
      setCopyStatus('copied-text');
      showToast('Performance summary text copied to clipboard!');
      setTimeout(() => setCopyStatus(null), 2500);
    } else {
      setCopyStatus(null);
      showToast('Unable to copy text automatically');
    }
  };

  // Handle Copy Detailed JSON Export
  const handleCopyExport = async () => {
    if (settings?.soundEffects) soundManager.playClick();
    setCopyStatus('copying-export');
    const success = await copyTextToClipboard(exportJson);

    if (success) {
      setCopyStatus('copied-export');
      showToast('Detailed score JSON copied to clipboard!');
      setTimeout(() => setCopyStatus(null), 2500);
    } else {
      setCopyStatus(null);
      showToast('Unable to copy export JSON');
    }
  };

  // Native Web Share API (if supported)
  const handleNativeShare = async () => {
    if (!navigator.share) return;
    if (settings?.soundEffects) soundManager.playClick();

    try {
      if (cardBlob && navigator.canShare && navigator.canShare({ files: [new File([cardBlob], 'scorecard.png', { type: 'image/png' })] })) {
        const file = new File([cardBlob], 'scorecard.png', { type: 'image/png' });
        await navigator.share({
          title: `Grammar Quiz Result - ${data.score}/${data.totalQuestions}`,
          text: textSnippet,
          files: [file],
        });
      } else {
        await navigator.share({
          title: `Grammar Quiz Result - ${data.score}/${data.totalQuestions}`,
          text: textSnippet,
        });
      }
      showToast('Shared successfully!');
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.warn('Native share error:', err);
      }
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;
  const unlockedBadges = data.badges.filter((b) => b.isUnlocked);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="share-progress-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="share-progress-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl rounded-3xl bg-[#0F172A] border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-cyan-500/20 bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Share Progress & Scorecard</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {data.score}/{data.totalQuestions} ({data.percentage}%)
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Generate a summary card image or text snippet ready for clipboard copying
                </p>
              </div>
            </div>

            <button
              id="close-share-progress-modal"
              type="button"
              onClick={() => {
                if (settings?.soundEffects) soundManager.playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="px-5 sm:px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-400">Candidate:</span>
              <strong className="text-cyan-300">{data.studentName}</strong>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Roll:</span>
              <span className="font-mono text-amber-300">{data.roll}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{data.correctCount} Right</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-300 font-mono">
                ⏱️ {formatDuration(data.timeSpentSeconds)}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-purple-300 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-purple-400" />
                <span>{unlockedBadges.length} Badges</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-5 sm:px-6 pt-3 border-b border-slate-800 bg-slate-900/40">
            <button
              type="button"
              id="tab-share-image"
              onClick={() => {
                if (settings?.soundEffects) soundManager.playClick();
                setActiveTab('image');
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'image'
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Summary Card Image</span>
            </button>

            <button
              type="button"
              id="tab-share-text"
              onClick={() => {
                if (settings?.soundEffects) soundManager.playClick();
                setActiveTab('text');
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'text'
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Text Snippet</span>
            </button>

            <button
              type="button"
              id="tab-share-export"
              onClick={() => {
                if (settings?.soundEffects) soundManager.playClick();
                setActiveTab('export');
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'export'
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Export Details (JSON)</span>
            </button>
          </div>

          {/* Tab Contents Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {/* Toast feedback banner */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TAB 1: SUMMARY CARD IMAGE */}
            {activeTab === 'image' && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 flex items-center justify-center min-h-[220px] shadow-lg">
                  {isGeneratingImage ? (
                    <div className="flex flex-col items-center gap-3 py-12 text-slate-400">
                      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                      <span className="text-xs font-medium">Generating high-definition scorecard...</span>
                    </div>
                  ) : cardPreviewUrl ? (
                    <img
                      src={cardPreviewUrl}
                      alt="Scorecard Summary Preview"
                      className="w-full h-auto object-contain rounded-xl max-h-[380px]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="p-8 text-center text-rose-400 text-xs">
                      <AlertCircle className="w-6 h-6 mx-auto mb-2 text-rose-400" />
                      Failed to render card canvas image preview.
                    </div>
                  )}
                </div>

                {/* Primary Action Buttons for Image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                  <button
                    id="copy-card-image-btn"
                    type="button"
                    onClick={handleCopyImage}
                    disabled={isGeneratingImage || !cardBlob}
                    className="min-h-[46px] px-4 py-3 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyStatus === 'copied-image' ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950" />
                        <span>Copied Image to Clipboard!</span>
                      </>
                    ) : copyStatus === 'copying-image' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Writing to Clipboard...</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Image to Clipboard</span>
                      </>
                    )}
                  </button>

                  <button
                    id="download-card-image-btn"
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isGeneratingImage || !cardBlob}
                    className="min-h-[46px] px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-400 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Download PNG Image</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
                  <span>💡 You can paste the copied PNG directly into WhatsApp, Discord, Docs, or Teams.</span>
                  {hasNativeShare && (
                    <button
                      type="button"
                      onClick={handleNativeShare}
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>More Share Options</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: TEXT SNIPPET */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    id="share-text-snippet-area"
                    readOnly
                    value={textSnippet}
                    rows={11}
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-400/80 resize-none leading-relaxed selection:bg-cyan-500 selection:text-slate-950"
                  />
                  <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Plaintext Snippet
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="copy-text-snippet-btn"
                    type="button"
                    onClick={handleCopyText}
                    className="w-full sm:flex-1 min-h-[46px] px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copyStatus === 'copied-text' ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950" />
                        <span>Copied Text Snippet!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Text to Clipboard</span>
                      </>
                    )}
                  </button>

                  {hasNativeShare && (
                    <button
                      id="native-share-snippet-btn"
                      type="button"
                      onClick={handleNativeShare}
                      className="w-full sm:w-auto min-h-[46px] px-5 py-3 rounded-2xl bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-cyan-400" />
                      <span>Share Via App</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: EXPORT DETAILS (JSON) */}
            {activeTab === 'export' && (
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    id="share-export-json-area"
                    readOnly
                    value={exportJson}
                    rows={11}
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300/90 focus:outline-none focus:border-cyan-400/80 resize-none leading-relaxed selection:bg-cyan-500 selection:text-slate-950"
                  />
                  <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    JSON Format
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-400">
                    Structured machine-readable score record suitable for archiving or reporting.
                  </p>
                  <button
                    id="copy-export-json-btn"
                    type="button"
                    onClick={handleCopyExport}
                    className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    {copyStatus === 'copied-export' ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950" />
                        <span>Export Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy JSON to Clipboard</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 sm:px-6 py-3.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>English Grammar Model Questions Practice Platform</span>
            </span>

            <button
              id="close-share-progress-footer-btn"
              type="button"
              onClick={() => {
                if (settings?.soundEffects) soundManager.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
