import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Wifi, CheckCircle, Database } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

interface OfflineBannerProps {
  cachedSetsCount?: number;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ cachedSetsCount = 35 }) => {
  const { isOnline, wasOffline, clearOfflineNotice } = useNetworkStatus();

  return (
    <div className="relative z-40">
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-gradient-to-r from-amber-950/95 via-amber-900/90 to-slate-950 border-b border-amber-500/40 text-amber-200 px-4 py-2 text-xs flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2 max-w-5xl mx-auto w-full justify-between">
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                <span className="font-semibold text-white">Offline Mode Active:</span>
                <span className="text-amber-200/90 hidden sm:inline">
                  Internet connection unstable or disconnected. All {cachedSetsCount} Model Question sets, facts, and quiz progress are cached and available offline.
                </span>
                <span className="text-amber-200/90 sm:hidden">
                  Cached questions ready offline.
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 bg-amber-900/50 border border-amber-500/30 px-2 py-0.5 rounded-full text-[11px] text-amber-300">
                <Database className="w-3 h-3" />
                <span>Offline Storage Active</span>
              </div>
            </div>
          </motion.div>
        )}

        {isOnline && wasOffline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-gradient-to-r from-emerald-950/95 via-teal-900/90 to-slate-950 border-b border-emerald-500/40 text-emerald-200 px-4 py-2 text-xs flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2 max-w-5xl mx-auto w-full justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Connection Restored:</span>
                <span className="text-emerald-200/90">
                  You are back online. All offline attempts and scores have been preserved.
                </span>
              </div>
              <button
                type="button"
                onClick={clearOfflineNotice}
                className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-800/60 hover:bg-emerald-700/60 border border-emerald-400/40 text-emerald-200 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
