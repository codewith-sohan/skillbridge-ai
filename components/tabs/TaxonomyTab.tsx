'use client';

import React, { useState } from 'react';
import { Skill } from '@/lib/types';
import {
  Layers,
  Search,
  TrendingUp,
  Award,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

interface TaxonomyTabProps {
  skills: Skill[];
}

export const TaxonomyTab: React.FC<TaxonomyTabProps> = ({ skills }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');

  const filteredSkills = skills.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSector = selectedSector === 'All' || s.sector === selectedSector;
    return matchesSearch && matchesCategory && matchesSector;
  });

  return (
    <div className="space-y-6 text-slate-100">
      {/* Official Header Banner */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">
              NATIONAL SKILL QUALIFICATION FRAMEWORK (NSQF)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Central Master Competency Registry
            </span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            State Competency Taxonomy & Prerequisite Matrix
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Standardized technical taxonomy mapping competencies across 5 priority industrial sectors. Each skill is benchmarked with empirical demand scores, YoY industrial requisition velocity, and entry compensation levels.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-3 flex items-center justify-between flex-wrap gap-3">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search competency taxonomy, prerequisites, or sector..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Competency Categories</option>
            <option value="Technical">Technical Competencies</option>
            <option value="Emerging Tech">Emerging Technologies</option>
            <option value="Domain">Domain Specializations</option>
            <option value="Soft Skills">Professional Behavioral</option>
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Industrial Sectors</option>
            <option value="Automotive & EV">Automotive & EV</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Advanced Manufacturing">Advanced Manufacturing</option>
            <option value="Renewable Energy">Renewable Energy</option>
            <option value="BFSI & FinTech">BFSI & FinTech</option>
          </select>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-[#0C1222] border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 transition-colors shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {skill.sector}
                </span>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    skill.trend === 'Rapidly Rising'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                      : 'bg-blue-950/60 text-blue-300 border-blue-800/60'
                  }`}
                >
                  {skill.trend.toUpperCase()}
                </span>
              </div>

              <h3 className="text-xs font-bold text-white leading-snug">{skill.name}</h3>

              {/* Demand Score Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Requisition Index</span>
                  <span className="font-bold text-white">{skill.demandScore} / 100</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${skill.demandScore}%` }}
                  />
                </div>
              </div>

              {/* Prerequisites */}
              <div className="pt-1.5">
                <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">
                  Required Competency Chain:
                </span>
                <div className="flex flex-wrap gap-1">
                  {skill.prerequisites.map((req, rIdx) => (
                    <span
                      key={rIdx}
                      className="text-[10px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-850"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between pt-2.5 border-t border-slate-800 text-xs font-mono">
              <div className="text-emerald-400 font-bold">
                {skill.avgSalaryINR}
              </div>
              <div className="text-slate-400 font-medium">
                {skill.growthRateYoY} YoY Velocity
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
