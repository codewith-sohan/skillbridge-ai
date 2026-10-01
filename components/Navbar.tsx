'use client';

import React from 'react';
import { UserRole, UserProfile } from '@/lib/types';
import {
  Building2,
  GraduationCap,
  Briefcase,
  Landmark,
  LogIn,
  LogOut,
  Search,
  Sparkles,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Activity,
  FileText,
  SlidersHorizontal,
  Calculator,
  ShieldAlert,
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: UserProfile | null;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  onOpenHighThinking: () => void;
  onOpenSyllabusUpload: () => void;
  onOpenMethodology?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  user,
  onGoogleSignIn,
  onSignOut,
  onOpenHighThinking,
  onOpenSyllabusUpload,
  onOpenMethodology,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0A0E17] border-b border-slate-800 text-slate-100 shadow-md">
      {/* Institutional Top Ribbon with restrained tricolor hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="bg-[#070B14] px-4 py-1.5 border-b border-slate-800/80 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>GOVERNMENT OF MAHARASHTRA</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 hidden md:inline">
              Skill & Employment Dept (DVET)
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-amber-400 font-mono font-medium">
              SIH 2026 • Challenge 134 & 135
            </span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="text-amber-300 font-mono text-[10px] bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded hidden lg:inline-flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              SYNTHETIC PILOT BENCHMARK
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span className="text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              NSQF & NCVET Aligned
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline flex items-center gap-1">
              <Activity className="w-3 h-3 text-sky-400" />
              Live Telemetry: 36 Districts
            </span>
          </div>
        </div>
      </div>

      {/* Main Administrative Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & National System Title */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onTabChange('dashboard')}
          >
            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-serif font-black text-lg tracking-wider shadow-inner group-hover:border-blue-500 transition-colors">
              SB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">
                  SkillBridge<span className="text-blue-500">AI</span>
                </span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700 font-medium">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium hidden sm:block">
                National Labor Market & Curriculum Alignment Observatory
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-700 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              Executive Dashboard
            </button>
            <button
              onClick={() => onTabChange('market')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'market'
                  ? 'bg-blue-700 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              Labor Market Intelligence
              <span className="text-[9px] bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                Google Grounded
              </span>
            </button>
            <button
              onClick={onOpenSyllabusUpload}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-850 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              Audit Curriculum
              <span className="text-[9px] bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                Vision 3.1
              </span>
            </button>
            <button
              onClick={onOpenHighThinking}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-850 transition-all flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              Policy Reasoning
              <span className="text-[9px] bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                High Thinking
              </span>
            </button>
            <button
              onClick={() => onTabChange('taxonomy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'taxonomy'
                  ? 'bg-blue-700 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              Skills Taxonomy
            </button>
            {onOpenMethodology && (
              <button
                onClick={onOpenMethodology}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-850 transition-all flex items-center gap-1.5"
                title="View Alignment & Utilization Mathematical Scoring Formulation"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>Methodology & Formula</span>
              </button>
            )}
          </nav>

          {/* Institutional Role Switcher & Auth */}
          <div className="flex items-center gap-3">
            {/* Enterprise Role Segmented Control */}
            <div className="flex items-center bg-[#070B14] border border-slate-800 rounded-lg p-0.5 shadow-inner">
              <button
                onClick={() => onRoleChange('government')}
                title="Directorate of Vocational Education & Training (DVET)"
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                  currentRole === 'government'
                    ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Landmark className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">DVET Govt</span>
              </button>
              <button
                onClick={() => onRoleChange('institute')}
                title="Polytechnic / ITI Principal & Academic Dean"
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                  currentRole === 'institute'
                    ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Institute</span>
              </button>
              <button
                onClick={() => onRoleChange('employer')}
                title="Industrial Employer & Placement Partner"
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                  currentRole === 'employer'
                    ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Employer</span>
              </button>
              <button
                onClick={() => onRoleChange('student')}
                title="Certified Candidate / Student Registry"
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                  currentRole === 'student'
                    ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Candidate</span>
              </button>
            </div>

            {/* Authentication Single Sign-On */}
            {user ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1">
                <div className="w-6 h-6 rounded-full bg-blue-700 text-white text-[11px] font-bold flex items-center justify-center">
                  {user.displayName.charAt(0)}
                </div>
                <div className="hidden md:block text-left text-xs">
                  <div className="font-semibold text-white truncate max-w-[100px] leading-tight">
                    {user.displayName}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono">
                    ID: {user.uid.slice(0, 6)}
                  </div>
                </div>
                <button
                  onClick={onSignOut}
                  title="Sign Out Session"
                  className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>GovID Sign-In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
