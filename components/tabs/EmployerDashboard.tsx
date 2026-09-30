'use client';

import React, { useState } from 'react';
import { JobPosting, StudentProfile, PlacementOutcome } from '@/lib/types';
import {
  Building2,
  Plus,
  Briefcase,
  Users,
  Search,
  CheckCircle2,
  ExternalLink,
  Award,
  DollarSign,
  MapPin,
  Filter,
  Check,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { recordPlacement } from '@/lib/storage';

interface EmployerDashboardProps {
  jobs: JobPosting[];
  students: StudentProfile[];
  onOpenPostJob: () => void;
  onPlacementRecorded?: (placement: PlacementOutcome) => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  jobs,
  students,
  onOpenPostJob,
  onPlacementRecorded,
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
    if (!activeJob) return { student, score: 75 };
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
    <div className="space-y-6 text-slate-100">
      {/* Official Header Banner */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">
                INDUSTRY PARTNERSHIP PORTAL
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Corporate Requisition & Apprenticeship Gateway
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Enterprise Job Broadcasting & Verified Talent Pool
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Broadcast active industrial hiring requirements directly to Maharashtra polytechnics and ITIs. Directly recruit pre-evaluated candidates with verified practical coursework credentials and feed back skill utilization telemetry to the state.
            </p>
          </div>

          <button
            onClick={onOpenPostJob}
            className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-all shadow-sm shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Broadcast New Opening
          </button>
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
            <span className="text-[11px] text-slate-500 font-mono">Select to view candidates</span>
          </div>

          {/* Quick Filter */}
          <div className="relative">
            <input
              type="text"
              value={jobSearchTerm}
              onChange={(e) => setJobSearchTerm(e.target.value)}
              placeholder="Search by title, company, or sector..."
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

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {job.requiredSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span>Vacancies: <strong className="text-slate-200">{job.vacancies}</strong></span>
                    <span className="text-teal-400 font-medium">
                      {job.matchedCandidatesCount} Candidates Matched
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Pre-Assessed Talent Pool (7 cols) */}
        {activeJob && (
          <div className="lg:col-span-7 bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-semibold text-teal-400 uppercase tracking-wider">
                  VERIFIED CANDIDATE REGISTRY
                </span>
                <h2 className="text-base font-bold text-white mt-1">{activeJob.title}</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {activeJob.company} • {activeJob.location} • Sector: {activeJob.sector}
                </p>
              </div>

              <span className="bg-slate-900 border border-slate-800 text-teal-300 font-mono text-xs px-2.5 py-1 rounded">
                {matchedStudents.length} Candidates Qualified
              </span>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-3">
              {matchedStudents.map(({ student, score }) => {
                const isHired = hiredStudents[student.id];
                return (
                  <div
                    key={student.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">{student.name}</h4>
                          <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                            {student.district}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {student.programEnrolled} • <span className="text-slate-300">{student.instituteName}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-mono font-bold text-emerald-400">{score}%</span>
                        <span className="text-[9px] text-slate-500 block font-mono uppercase">Competency Match</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded border border-slate-850 leading-relaxed font-sans">
                      {student.resumeSummary}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {student.skills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                          {sk.skillName} ({sk.level})
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                      {student.portfolioUrl ? (
                        <a
                          href={student.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px] font-medium"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Audit Portfolio & Code
                        </a>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Institute Lab Tested</span>
                      )}

                      <button
                        onClick={() => handleHireCandidate(student, score)}
                        disabled={isHired}
                        className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isHired
                            ? 'bg-emerald-800/80 text-emerald-200 cursor-default'
                            : 'bg-blue-700 hover:bg-blue-600 text-white active:scale-95'
                        }`}
                      >
                        {isHired ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Offer Logged on State Grid
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
        )}
      </div>
    </div>
  );
};
