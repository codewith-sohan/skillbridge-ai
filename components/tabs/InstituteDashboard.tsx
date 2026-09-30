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
} from 'lucide-react';

interface InstituteDashboardProps {
  programs: TrainingProgram[];
  curriculumAnalyses: CurriculumAnalysis[];
  onOpenSyllabusUpload: () => void;
  onOpenAddProgram: () => void;
  onSelectProgramForAnalysis?: (program: TrainingProgram) => void;
}

export const InstituteDashboard: React.FC<InstituteDashboardProps> = ({
  programs,
  curriculumAnalyses,
  onOpenSyllabusUpload,
  onOpenAddProgram,
  onSelectProgramForAnalysis,
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
    <div className="space-y-6 text-slate-100">
      {/* Official Header Banner */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded">
                ACADEMIC ACCREDITATION & CURRICULUM WING
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                NCVET & MSBTE Affiliation Portal
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Polytechnic & ITI Curriculum Relevancy Terminal
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analyze institutional teaching modules against live 2026 industrial requirements. Scan syllabi with Gemini 3.1 Pro vision to identify syllabus decay, eliminate obsolete modules, and integrate state-mandated technical micro-credentials.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={onOpenSyllabusUpload}
              className="bg-teal-700 hover:bg-teal-600 text-white font-medium px-3.5 py-2 rounded-lg text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              Scan Syllabus Document (Vision 3.1)
            </button>
            <button
              onClick={onOpenAddProgram}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium px-3.5 py-2 rounded-lg text-xs flex items-center gap-2 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Register Vocational Course
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
            <span className="text-[11px] text-slate-500 font-mono">Click to audit</span>
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
                      <span className="text-slate-500 block text-[10px]">CAPACITY</span>
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
          <div className="lg:col-span-7 bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase tracking-wider">
                  STATUTORY RELEVANCY AUDIT
                </span>
                <h2 className="text-base font-bold text-white mt-1">{activeProgram.name}</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {activeProgram.instituteName} • Sector: {activeProgram.sector} • Duration: {activeProgram.durationWeeks} Weeks
                </p>
              </div>

              <button
                onClick={onOpenSyllabusUpload}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                Re-Scan Document
              </button>
            </div>

            {/* Score & Formal Accreditation Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-center font-mono">
                  <span className="text-lg font-bold text-white">{activeProgram.alignmentScore}%</span>
                  <span className="text-[8px] text-slate-400 uppercase">Index</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Accreditation Standing:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        activeProgram.status === 'Active'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                          : activeProgram.status === 'Under Review'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                          : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                      }`}
                    >
                      {activeProgram.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
                    {activeProgram.syllabusSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Teaching Modules Taxonomy */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                Curriculum Competencies & Teaching Hours Breakdown
              </h4>
              <div className="space-y-2">
                {activeProgram.skills.map((sk, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{sk.skillName}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Proficiency: <span className="text-slate-200">{sk.proficiencyLevel}</span> • Allocated: <span className="text-slate-200">{sk.hours} Contact Hours</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-blue-400">{sk.relevanceScore}%</span>
                      <span className="text-[9px] text-slate-500 block font-mono">Market Index</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Modernization Directives */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-4 space-y-2.5">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Directives for 2026 Academic Year Refresh
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 bg-[#0C1222] p-2.5 rounded border border-slate-800">
                  <span className="text-blue-400 font-mono font-bold">01.</span>
                  <div>
                    <span className="font-semibold text-white">Integrate 40 Hours of High Voltage Safety & Telemetry Diagnostics:</span>
                    <p className="text-slate-400 mt-0.5">Automotive employers in Pune-Chakan require ISO 26262 compliance certifications prior to shop-floor deployment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-[#0C1222] p-2.5 rounded border border-slate-800">
                  <span className="text-blue-400 font-mono font-bold">02.</span>
                  <div>
                    <span className="font-semibold text-white">Prune Legacy Manual Lathe/Milling Operations by 35%:</span>
                    <p className="text-slate-400 mt-0.5">Replace with 5-axis CNC programming, CAD/CAM toolpathing, and digital metrology simulation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
