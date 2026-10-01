'use client';

import React, { useState } from 'react';
import { JobPosting, StudentProfile, PlacementOutcome } from '@/lib/types';
import {
  Briefcase,
  Users,
  Plus,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Building2,
  DollarSign,
  MapPin,
  Filter,
  Check,
  ShieldCheck,
  FileCheck,
  Calculator,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { recordPlacement } from '@/lib/storage';

interface EmployerDashboardProps {
  jobs: JobPosting[];
  students: StudentProfile[];
  onOpenPostJob: () => void;
  onPlacementRecorded?: (placement: PlacementOutcome) => void;
  onOpenMethodology?: () => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  jobs,
  students,
  onOpenPostJob,
  onPlacementRecorded,
  onOpenMethodology,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [jobSearchTerm, setJobSearchTerm] = useState('');
  const [hiredStudents, setHiredStudents] = useState<Record<string, boolean>>({});

  const displayedJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
      j.sector.toLowerCase().includes(jobSearchTerm.toLowerCase())
  );

  const activeJob =
    displayedJobs.find((j) => j.id === selectedJobId) ||
    displayedJobs[0] ||
    jobs[0];

  const matchedStudents = students.map((student) => {
    if (!activeJob) return { student, score: 75, matchedCount: 2, totalCount: 3 };
    const requiredSkillsLower = activeJob.requiredSkills.map((s) => s.toLowerCase());
    const studentSkillsLower = student.skills.map((s) => s.skillName.toLowerCase());

    const matchedCount = studentSkillsLower.filter((sk) =>
      requiredSkillsLower.some((req) => req.includes(sk) || sk.includes(req))
    ).length;

    const calculatedScore = Math.min(
      98,
      Math.max(65, Math.round((matchedCount / Math.max(1, requiredSkillsLower.length)) * 100))
    );

    return {
      student,
      score: student.matchScoreForTarget || calculatedScore,
      matchedCount,
      totalCount: requiredSkillsLower.length,
    };
  }).sort((a, b) => b.score - a.score);

  const handleHireCandidate = async (student: StudentProfile, score: number) => {
    if (!activeJob) return;
    try {
      const placementRecord: PlacementOutcome = {
        id: `place-${student.id}-${activeJob.id}`,
        studentName: student.name,
        instituteName: student.instituteName,
        district: student.district,
        companyName: activeJob.company,
        role: activeJob.title,
        salaryINR: activeJob.salaryMinINR + 50000,
        placementDate: '2026-09-30',
        sector: activeJob.sector,
        skillUtilizationRate: score,
        retentionMonths: 1,
      };

      await recordPlacement(placementRecord);
      setHiredStudents((prev) => ({ ...prev, [student.id]: true }));
      if (onPlacementRecorded) {
        onPlacementRecorded(placementRecord);
      }
    } catch (err) {
      console.error('Error recording placement:', err);
    }
  };

  return (
    <div className="space-y-5 text-slate-100 font-sans">
      {/* Official Header Banner */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">
                INDUSTRY PARTNERSHIP PORTAL
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                SIMULATED REQUISITIONS & CANDIDATE POOL (Pilot Benchmark)
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Enterprise Talent Requisition & Verified Hiring Grid
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Broadcast skill-verified openings directly to polytechnic institutions across Maharashtra. Instant skill-match ranking identifies candidates with certified lab hours matching your job specs.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {onOpenMethodology && (
              <button
                onClick={onOpenMethodology}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>Matching Method</span>
              </button>
            )}
            <button
              onClick={onOpenPostJob}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Broadcast Opening</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Requisitions & Matched Candidates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Active Requisitions (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Active Requisitions ({displayedJobs.length})
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Simulated Postings</span>
          </div>

          {/* Quick Filter */}
          <div className="relative">
            <input
              type="text"
              value={jobSearchTerm}
              onChange={(e) => setJobSearchTerm(e.target.value)}
              placeholder="Search title, company, or sector..."
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
            />
          </div>

          <div className="space-y-2.5">
            {displayedJobs.map((job) => {
              const isSelected = job.id === activeJob?.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-850 border-teal-600 shadow-sm ring-1 ring-teal-600/30'
                      : 'bg-[#0C1222] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white leading-snug">{job.title}</h4>
                      <p className="text-[11px] text-teal-400 font-medium mt-0.5">{job.company}</p>
                      <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {job.location}
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold text-white shrink-0">
                      ₹{(job.salaryMinINR / 100000).toFixed(1)}–{(job.salaryMaxINR / 100000).toFixed(1)} LPA
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800 font-mono">
                    <span className="text-emerald-400 font-medium">
                      {job.vacancies} Openings • {job.experienceLevel}
                    </span>
                    <span className="text-slate-500">
                      Posted {job.postedDate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Matched Candidate Registry (7 cols) */}
        {activeJob && (
          <div className="lg:col-span-7 bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-semibold text-teal-400 uppercase tracking-wider">
                    TARGET REQUISITION
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1 rounded">
                    Simulated Industry Requisition
                  </span>
                </div>
                <h2 className="text-base font-bold text-white mt-0.5">{activeJob.title}</h2>
                <p className="text-xs text-slate-400 font-mono">
                  {activeJob.company} • {activeJob.location} • Sector: {activeJob.sector}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-400 block">
                  ₹{(activeJob.salaryMinINR / 100000).toFixed(1)} – {(activeJob.salaryMaxINR / 100000).toFixed(1)} LPA
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{activeJob.vacancies} Target Vacancies</span>
              </div>
            </div>

            {/* Required Skills Checklist */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Mandatory Technical Competencies Required:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeJob.requiredSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-slate-800 border border-slate-700 text-slate-200 px-2 py-0.5 rounded font-mono"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Matched Trainees Ranked by Syllabus Competency Match */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300 uppercase tracking-wider">
                  Ranked Candidates (Verified Curriculum & Lab Hours):
                </span>
                <span className="text-slate-500 font-mono text-[10px]">
                  Matching against {activeJob.requiredSkills.length} competencies
                </span>
              </div>

              <div className="space-y-2.5">
                {matchedStudents.map(({ student, score, matchedCount, totalCount }) => {
                  const isHired = hiredStudents[student.id];
                  return (
                    <div
                      key={student.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 space-y-2.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{student.name}</h4>
                            <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-1 rounded border border-slate-800">
                              Synthetic Persona
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {student.district}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {student.instituteName}
                          </p>
                          <p className="text-[11px] text-slate-300 mt-1">
                            {student.resumeSummary}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            onClick={onOpenMethodology}
                            title="Click to see competency matching methodology"
                            className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded cursor-pointer hover:underline block"
                          >
                            {score}% Match ⓘ
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                            {matchedCount}/{totalCount} Skills Verified
                          </span>
                        </div>
                      </div>

                      {/* Verified Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {student.skills.map((sk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-800/90 text-slate-300 border border-slate-700/80 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                            {sk.skillName} ({sk.level})
                          </span>
                        ))}
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <div className="text-[10px] text-slate-500 font-mono">
                          Verified by Institute Examination Assessment
                        </div>

                        <button
                          onClick={() => handleHireCandidate(student, score)}
                          disabled={isHired}
                          className={`font-semibold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-all ${
                            isHired
                              ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-800/80 cursor-default'
                              : 'bg-blue-700 hover:bg-blue-600 text-white active:scale-95 shadow-sm'
                          }`}
                        >
                          {isHired ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Offer Extended (Telemetry Logged)
                            </>
                          ) : (
                            <>
                              <Briefcase className="w-3.5 h-3.5" />
                              Extend Placement Offer
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
