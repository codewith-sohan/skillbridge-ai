'use client';

import React, { useState } from 'react';
import { X, GraduationCap, Plus, Trash2, Loader2, BookOpen } from 'lucide-react';
import { TrainingProgram } from '@/lib/types';
import { saveProgram } from '@/lib/storage';
import { DISTRICTS_MAHARASHTRA } from '@/lib/seed-data';

interface AddProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProgramCreated: (prog: TrainingProgram) => void;
}

export const AddProgramModal: React.FC<AddProgramModalProps> = ({
  isOpen,
  onClose,
  onProgramCreated,
}) => {
  const [name, setName] = useState('');
  const [instituteName, setInstituteName] = useState('Government Polytechnic Pune (Aundh)');
  const [district, setDistrict] = useState('Pune');
  const [sector, setSector] = useState('Automotive & EV');
  const [durationWeeks, setDurationWeeks] = useState(24);
  const [enrolledStudents, setEnrolledStudents] = useState(60);
  const [syllabusSummary, setSyllabusSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !instituteName) return;

    setIsLoading(true);
    try {
      const newProg: TrainingProgram = {
        id: `prog-${Date.now()}`,
        name,
        instituteName,
        district,
        sector,
        durationWeeks: Number(durationWeeks),
        enrolledStudents: Number(enrolledStudents),
        placementRate: 80,
        avgPlacementSalaryINR: '₹6,20,000',
        alignmentScore: Math.floor(Math.random() * 15) + 80,
        skills: [
          { skillId: 'sk-1', skillName: 'Core Technical Engineering', proficiencyLevel: 'Intermediate', hours: 60, relevanceScore: 88 },
          { skillId: 'sk-2', skillName: 'Modern Diagnostic Tooling', proficiencyLevel: 'Advanced', hours: 45, relevanceScore: 92 },
        ],
        lastAnalyzedAt: new Date().toISOString().split('T')[0],
        syllabusSummary: syllabusSummary || 'Program developed in accordance with Maharashtra State Board of Technical Education directives.',
        status: 'Active',
      };

      await saveProgram(newProg);
      onProgramCreated(newProg);
      onClose();
    } catch (err) {
      console.error('Error creating program:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#0C1222] border border-slate-800 rounded-xl shadow-2xl overflow-hidden my-6 text-slate-100">
        <div className="px-6 py-4 bg-[#0A0E1A] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-slate-800 border border-slate-700 text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Register Vocational / Technical Program
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Mandatory registry for MSBTE & DVET alignment scoring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div>
            <label className="block text-[11px] text-slate-400 uppercase mb-1">
              Program Specification Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Diploma in Smart Grid & Solar Microgrid Instrumentation"
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Institution / Polytechnic *
              </label>
              <input
                type="text"
                required
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Maharashtra District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
              >
                {DISTRICTS_MAHARASHTRA.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Industrial Sector
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
              >
                <option value="Automotive & EV">Automotive & EV</option>
                <option value="Advanced Manufacturing">Advanced Manufacturing</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="BFSI & FinTech">BFSI & FinTech</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Duration (Weeks)
              </label>
              <input
                type="number"
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Student Cohort Size
              </label>
              <input
                type="number"
                value={enrolledStudents}
                onChange={(e) => setEnrolledStudents(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 uppercase mb-1">
              Curriculum Summary & Laboratory Toolkits
            </label>
            <textarea
              rows={3}
              value={syllabusSummary}
              onChange={(e) => setSyllabusSummary(e.target.value)}
              placeholder="Summary of lab toolkits, machine tooling, and industry certifications covered..."
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800 font-sans">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !name}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-1.5 rounded text-xs flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <GraduationCap className="w-3.5 h-3.5" />
                  Register Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
