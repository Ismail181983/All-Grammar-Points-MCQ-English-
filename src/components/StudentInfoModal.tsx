import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserCheck, Hash, User, Sparkles, BadgeInfo } from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onSave: (profile: StudentProfile) => void;
}

export const StudentInfoModal: React.FC<StudentInfoModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [userId, setUserId] = useState(currentProfile.userId || 'UID-1001');
  const [roll, setRoll] = useState(currentProfile.roll);

  useEffect(() => {
    if (isOpen) {
      setName(currentProfile.name);
      setUserId(currentProfile.userId || 'UID-1001');
      setRoll(currentProfile.roll);
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRoll = roll.trim() || '01';
    onSave({
      name: name.trim() || 'Learner',
      userId: userId.trim() || `UID-${cleanRoll}`,
      roll: cleanRoll,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-slate-900 border border-cyan-500/40 p-5 sm:p-7 shadow-[0_0_40px_rgba(6,182,212,0.3)] text-white relative my-auto"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shrink-0">
            <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">Student & Scoreboard Profile</h3>
            <p className="text-xs text-cyan-300">
              আপনার ইউজার নেইম ও ইউজার ID স্থায়ী স্কোরবোর্ডে সংরক্ষিত হবে
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5">
              User Name (ইউজার নেইম)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="profile-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Md. Tanvir Ahmed"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-medium min-h-[44px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5">
                User ID (ইউজার ID)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <BadgeInfo className="w-4 h-4" />
                </div>
                <input
                  id="profile-userid-input"
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. UID-1001"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-mono font-semibold min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1.5">
                Roll / Reg No
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  id="profile-roll-input"
                  type="text"
                  required
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  placeholder="e.g. 101"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-mono font-medium min-h-[44px]"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 text-xs font-black hover:brightness-110 transition shadow-md shadow-cyan-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
