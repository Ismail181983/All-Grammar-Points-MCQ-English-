import React, { useState } from 'react';
import { Phone, Mail, Award, GraduationCap, MapPin, CheckCircle2, Copy } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyContact = () => {
    navigator.clipboard.writeText('Md. Ismail Hossain, Mobile: 01728-295215, Email: ismailhossain627@yahoo.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="app-footer"
      className="relative z-20 mt-auto border-t border-blue-500/30 bg-[#0F172A]/90 backdrop-blur-xl text-slate-200"
    >
      {/* Top colorful gradient accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-cyan-400 via-amber-400 to-rose-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Author info & Photo */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-400 via-teal-300 to-amber-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <img
                  src="https://i.ibb.co.com/Lz1qrSv4/My-Passport-Photo.png"
                  alt="Md. Ismail Hossain"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl bg-slate-800"
                  onError={(e) => {
                    // Fallback to secondary image or placeholder if external host blocks
                    const target = e.currentTarget;
                    if (target.src !== 'https://i.imgur.com/akJtZZb.jpeg') {
                      target.src = 'https://i.imgur.com/akJtZZb.jpeg';
                    }
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-white rounded-full border-2 border-slate-950 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1 max-w-xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Developer & Lead Educator
                </span>
                <span className="text-xs text-amber-300 flex items-center gap-1 font-semibold">
                  <Award className="w-3.5 h-3.5" /> British Council Master Trainer
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Md. Ismail Hossain
              </h3>

              <p className="text-sm font-medium text-cyan-200">
                Assistant Teacher, <span className="text-slate-100 font-semibold">Uttar Deshanterkathi GPS</span>
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-300 pt-1">
                <span className="inline-flex items-center gap-1 text-amber-200">
                  <GraduationCap className="w-3.5 h-3.5" /> B.A. (Hons), B.Ed., M.A. in English
                </span>
                <span className="inline-flex items-center gap-1 text-teal-300">
                  <MapPin className="w-3.5 h-3.5" /> Betagi Upazilla, Barguna
                </span>
              </div>
            </div>
          </div>

          {/* Quick contact buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              id="footer-call-btn"
              href="tel:01728295215"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-teal-500/25 hover:from-teal-400 hover:to-emerald-400 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4" />
              <span>01728-295215</span>
            </a>

            <a
              id="footer-email-btn"
              href="mailto:ismailhossain627@yahoo.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-600/25 hover:from-cyan-500 hover:to-blue-500 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Mail className="w-4 h-4" />
              <span>ismailhossain627@yahoo.com</span>
            </a>

            <button
              id="footer-copy-btn"
              onClick={copyContact}
              className="p-2.5 rounded-xl bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-700 transition"
              title="Copy contact details"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Detailed credential statement */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-xs text-slate-400 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="leading-relaxed">
            Specially trained under <strong className="text-cyan-300">British Council in Bangladesh</strong> for Master Trainer of English of Primary Education, Betagi Upazilla, Barguna.
          </p>
          <p className="text-slate-500 shrink-0">
            &copy; {new Date().getFullYear()} MCQ from all Grammar Points. Designed & Developed by Md. Ismail Hossain.
          </p>
        </div>
      </div>
    </footer>
  );
};
