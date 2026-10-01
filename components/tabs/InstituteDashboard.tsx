'use client';

import React, { useState } from 'react';
import { TrainingProgram, CurriculumAnalysis } from '@/lib/types';
import {
  GraduationCap,
  Plus,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  FileText,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award,
  ShieldCheck,
  Calculator,
  ShieldAlert,
  Info,
} from 'lucide-react';

interface InstituteDashboardProps {
  programs: TrainingProgram[];
  curriculumAnalyses: CurriculumAnalysis[];
  onOpenSyllabusUpload: () => void;
  onOpenAddProgram: () => void;
  onSelectProgramForAnalysis?: (program: TrainingProgram) => void;
  onOpenMethodology?: () => void;
}

export const InstituteDashboard: React.FC<InstituteDashboardProps> = ({
  programs,
  curriculumAnalyses,
  onOpenSyllabusUpload,
  onOpenAddProgram,
  onSelectProgramForAnalysis,
  onOpenMethodology,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[0]?.id || '');
  const [programSearchTerm, setProgramSearchTerm] = useState('');

  const displayedPrograms = programs.filter(
    (p) =>
      p.name.toLowerCase().includes(programSearchTerm.toLowerCase()) ||
      p.sector.toLowerCase().includes(programSearchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(programSearchTerm.toLowerCase())
  );

  const activeProgram =
    displayedPrograms.find((p) => p.id === selectedProgramId) ||
    displayedPrograms[0] ||
    programs[0];

  return (
    <div className="space-y-5 text-slate-100 font-sans">
      {/* Official Header Banner */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
                ACADEMIC ACCREDITATION & CURRICULUM WING
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                SYNTHETIC PILOT BENCHMARK DATASET
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Polytechnic & ITI Curriculum Relevancy Terminal
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verify syllabus alignment against active industrial requisitions. Gemini 3.1 Pro vision audits syllabi to isolate module gaps and verify NSQF compliance.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {onOpenMethodology && (
              <button
                onClick={onOpenMethodology}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all"
                title="View how alignment percentages are calculated"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>Scoring Formula</span>
              </button>
            )}
            <button
              onClick={onOpenSyllabusUpload}
              className="bg-teal-700 hover:bg-teal-600 text-white font-medium px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              Scan Syllabus Document (Vision 3.1)
            </button>
            <button
              onClick={onOpenAddProgram}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Register Course
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Programs List & Deep Alignment Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Course Directory (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Enrolled Programs ({displayedPrograms.length})
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Synthetic Sample Cohort</span>
          </div>

          {/* Quick Search in Directory */}
          <div className="relative">
            <input
              type="text"
              value={programSearchTerm}
              onChange={(e) => setProgramSearchTerm(e.target.value)}
              placeholder="Filter by title, sector, district..."
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          <div className="space-y-2.5">
            {displayedPrograms.map((prog) => {
              const isSelected = prog.id === activeProgram?.id;
              return (
                <div
                  key={prog.id}
                  onClick={() => setSelectedProgramId(prog.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-850 border-blue-600 shadow-sm ring-1 ring-blue-600/30'
                      : 'bg-[#0C1222] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">{prog.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {prog.instituteName} • <span className="text-slate-300">{prog.district}</span>
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                        prog.alignmentScore >= 85
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                          : prog.alignmentScore >= 70
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                          : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                      }`}
                    >
                      {prog.alignmentScore}% ALIGNED
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2.5 border-t border-slate-800 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px]">PLACEMENT</span>
                      <span className="text-slate-200 font-medium">{prog.placementRate}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">AVG PACKAGE</span>
                      <span className="text-emerald-400 font-medium">{prog.avgPlacementSalaryINR}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">SAMPLE COHORT</span>
                      <span className="text-slate-300">{prog.enrolledStudents} Trainees</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Curriculum Relevancy Matrix (7 cols) */}
        {activeProgram && (
          <div className="lg:col-span-7 bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase tracking-wider">
                    STATUTORY RELEVANCY AUDIT
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1 rounded">
                    Simulated Curriculum Spec
                  </span>
                </div>
                <h2 className="text-base font-bold text-white mt-0.5">{activeProgram.name}</h2>
                <p className="text-xs text-slate-400 font-mono">
                  {activeProgram.instituteName} • Sector: {activeProgram.sector} • Duration: {activeProgram.durationWeeks} Wks
                </p>
              </div>

              <button
                onClick={onOpenSyllabusUpload}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                Scan Document
              </button>
            </div>

            {/* Score & Formal Accreditation Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-center font-mono shrink-0">
                  <span className="text-base font-bold text-white">{activeProgram.alignmentScore}%</span>
                  <span className="text-[8px] text-slate-400 uppercase">Score</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Competency Alignment Index</span>
                    {onOpenMethodology && (
                      <button
                        onClick={onOpenMethodology}
                        className="text-[10px] text-blue-400 hover:underline font-mono"
                      >
                        (See Method)
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Calculated from 45% semantic match with live 2026 industrial vacancies + 35% NSQF hours + 20% hiring demand.
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded border shrink-0 ${
                  activeProgram.alignmentScore >= 80
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80'
                    : 'bg-rose-950/80 text-rose-300 border-rose-800/80'
                }`}
              >
                {activeProgram.status.toUpperCase()}
              </span>
            </div>

            {/* Syllabus Summary */}
            <div className="space-y-1 bg-slate-900/40 border border-slate-800/80 rounded-lg p-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Audited Curriculum Overview:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeProgram.syllabusSummary}
              </p>
            </div>

            {/* Audited Modules Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300 uppercase tracking-wider">
                  Mandated Modules & Industry Relevancy:
                </span>
                <span className="text-slate-500 font-mono text-[10px]">
                  Evaluated Against Live Openings
                </span>
              </div>

              <div className="space-y-1.5">
                {activeProgram.skills.map((sk) => (
                  <div
                    key={sk.skillId}
                    className="bg-slate-900/70 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white block">{sk.skillName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {sk.hours} Practical Lab Hours • Level: {sk.proficiencyLevel}
                      </span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          sk.relevanceScore >= 80
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                            : sk.relevanceScore >= 50
                            ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                            : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                        }`}
                      >
                        {sk.relevanceScore}% Relevancy
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
