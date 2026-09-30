'use client';

import React, { useState } from 'react';
import { X, Building2, Plus, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import { JobPosting } from '@/lib/types';
import { saveJob } from '@/lib/storage';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (job: JobPosting) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
}) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Tata Motors Passenger Vehicles Ltd.');
  const [location, setLocation] = useState('Pune (Pimpri-Chinchwad), Maharashtra');
  const [sector, setSector] = useState('Automotive & EV');
  const [jobType, setJobType] = useState<'Full-time' | 'Apprenticeship' | 'Contract'>('Full-time');
  const [salaryMinINR, setSalaryMinINR] = useState(600000);
  const [salaryMaxINR, setSalaryMaxINR] = useState(850000);
  const [vacancies, setVacancies] = useState(25);
  const [description, setDescription] = useState('');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([
    'Electric Vehicle (EV) Powertrain Diagnostics',
    'High Voltage Safety',
  ]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !requiredSkills.includes(newSkillInput.trim())) {
      setRequiredSkills([...requiredSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    setIsLoading(true);
    try {
      const newJob: JobPosting = {
        id: `job-${Date.now()}`,
        title,
        company,
        location,
        sector,
        jobType,
        salaryMinINR: Number(salaryMinINR),
        salaryMaxINR: Number(salaryMaxINR),
        experienceLevel: 'Entry-Level',
        requiredSkills,
        preferredSkills: ['Technical Communication', 'Problem Solving'],
        vacancies: Number(vacancies),
        postedDate: new Date().toISOString().split('T')[0],
        source: 'Direct Partner',
        description: description || `Urgent industry opening for ${title} at ${company} in ${location}.`,
        matchedCandidatesCount: Math.floor(Math.random() * 25) + 10,
      };

      await saveJob(newJob);
      onJobCreated(newJob);
      onClose();
    } catch (err) {
      console.error('Error posting job to Firestore:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0C1222] border border-slate-800 rounded-xl shadow-2xl overflow-hidden my-6 text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A0E1A] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-slate-800 border border-slate-700 text-teal-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Broadcast Industrial Hiring Requisition
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Transmits directly to Maharashtra polytechnics and candidate matching registry
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Designation / Position Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. EV Powertrain Diagnostics Trainee"
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Employer / Corporate Name *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Plant Location / District
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
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
                Contract Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
              >
                <option value="Full-time">Full-time Regular</option>
                <option value="Apprenticeship">NAPS Apprenticeship</option>
                <option value="Contract">Fixed Term Contract</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Min Annual Compensation (₹)
              </label>
              <input
                type="number"
                value={salaryMinINR}
                onChange={(e) => setSalaryMinINR(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Max Annual Compensation (₹)
              </label>
              <input
                type="number"
                value={salaryMaxINR}
                onChange={(e) => setSalaryMaxINR(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 uppercase mb-1">
                Open Requisitions Count
              </label>
              <input
                type="number"
                value={vacancies}
                onChange={(e) => setVacancies(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Competency tags */}
          <div>
            <label className="block text-[11px] text-slate-400 uppercase mb-1">
              Required NSQF Competencies *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Type skill & press Enter or Add"
                className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 px-3 py-1.5 rounded text-xs flex items-center gap-1 font-medium font-sans"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-slate-900 border border-slate-800 text-slate-200 text-[11px] px-2.5 py-0.5 rounded flex items-center gap-1.5"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 uppercase mb-1">
              Job Scope & Shop-Floor Responsibilities
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline specific machinery, shift schedules, lab toolkits, and certification mandates..."
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
              disabled={isLoading || !title || requiredSkills.length === 0}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-1.5 rounded text-xs flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Broadcasting Requisition...
                </>
              ) : (
                <>
                  <Building2 className="w-3.5 h-3.5" />
                  Broadcast Requisition
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
