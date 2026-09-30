'use client';

import React, { useState } from 'react';
import { StudentProfile, JobPosting } from '@/lib/types';
import {
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Award,
  BookOpen,
  DollarSign,
  GraduationCap,
  ExternalLink,
  MapPin,
  Clock,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

interface StudentDashboardProps {
  students: StudentProfile[];
  jobs: JobPosting[];
  onApplyJob?: (job: JobPosting) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  students,
  jobs,
  onApplyJob,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleApply = (job: JobPosting) => {
    setAppliedJobs((prev) => ({ ...prev, [job.id]: true }));
    if (onApplyJob) {
      onApplyJob(job);
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Official Header Banner */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                STUDENT & TRAINEE CREDENTIAL REGISTRY
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Direct Career Matching System
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Candidate Skill Portfolio & Industry Placement Gateway
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verify certified competencies from your vocational coursework, identify active job vacancies aligned with your skill profile, and access micro-credential pathways to elevate your starting compensation tier.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 shrink-0">
            <span className="text-[10px] text-slate-400 font-mono block mb-1">
              Select Candidate Record:
            </span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-slate-850 border border-slate-700 text-xs text-white rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.district} • {s.programEnrolled.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {currentStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Student Profile & Verified Badges (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-base shadow-sm">
                  {currentStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{currentStudent.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{currentStudent.email}</p>
                  <span className="text-[10px] font-mono font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded inline-block mt-1">
                    STATUS: {currentStudent.completionStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-800 pt-3 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>INSTITUTE:</span>
                  <span className="text-slate-200 font-medium">{currentStudent.instituteName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>DISTRICT:</span>
                  <span className="text-slate-200 font-medium">{currentStudent.district}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>PROGRAM:</span>
                  <span className="text-slate-200 font-medium text-right max-w-[170px] truncate">
                    {currentStudent.programEnrolled}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>EXPECTED CTC:</span>
                  <span className="text-emerald-400 font-bold">{currentStudent.expectedSalaryINR}</span>
                </div>
              </div>
            </div>

            {/* Verified Competencies */}
            <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Verified Competencies ({currentStudent.skills.length})
                </h4>
                <span className="text-[10px] font-mono text-slate-500">NSQF Accredited</span>
              </div>

              <div className="space-y-2">
                {currentStudent.skills.map((sk, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{sk.skillName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 pl-4.5 font-mono">
                        Evidence: {sk.evidenceType}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                      {sk.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro-learning pathway */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                Targeted Upskilling Mandate
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Completing the 20-hour <strong>CAN Telemetry Diagnostic Module</strong> will elevate your match score for Tata Motors from 88% to 98% and unlock higher entry wage bands.
              </p>
            </div>
          </div>

          {/* Right Column: Recommended Job Requisitions (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Matched Industry Openings ({jobs.length})
                </h3>
                <p className="text-[11px] text-slate-500">
                  Ranked by certified competency fit and laboratory evaluation records
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-emerald-400">
                Direct Application Active
              </span>
            </div>

            <div className="space-y-3">
              {jobs.map((job) => {
                const isApplied = appliedJobs[job.id];
                return (
                  <div
                    key={job.id}
                    className="bg-[#0C1222] border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">{job.title}</h4>
                          <span className="text-[10px] font-mono bg-slate-850 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                            {job.jobType}
                          </span>
                        </div>
                        <p className="text-[11px] text-teal-400 font-medium mt-0.5">{job.company}</p>
                        <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {job.location} • <span className="text-slate-300">{job.sector}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono font-bold text-white">
                          ₹{(job.salaryMinINR / 100000).toFixed(1)}–{(job.salaryMaxINR / 100000).toFixed(1)} LPA
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded inline-block mt-1">
                          92% FIT INDEX
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{job.description}</p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-500 font-mono uppercase mr-1">Required:</span>
                      {job.requiredSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-800 text-xs font-mono">
                      <span className="text-[10px] text-slate-500">
                        Source: {job.source} • {job.vacancies} Requisitions
                      </span>

                      <button
                        onClick={() => handleApply(job)}
                        disabled={isApplied}
                        className={`px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isApplied
                            ? 'bg-emerald-800/80 text-emerald-200 cursor-default'
                            : 'bg-blue-700 hover:bg-blue-600 text-white active:scale-95'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Application Submitted
                          </>
                        ) : (
                          <>
                            <Briefcase className="w-3.5 h-3.5" />
                            Transmit Verified Profile
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
  );
};
