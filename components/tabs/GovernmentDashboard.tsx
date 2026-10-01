'use client';

import React, { useState } from 'react';
import {
  TrainingProgram,
  PlacementOutcome,
  Skill,
} from '@/lib/types';
import {
  Landmark,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  Filter,
  BarChart3,
  MapPin,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Users,
  FileText,
  SlidersHorizontal,
  Download,
  Search,
  Sparkles,
  ChevronDown,
  Loader2,
  Send,
  HelpCircle,
  Calculator,
  ShieldAlert,
  Info,
} from 'lucide-react';

interface GovernmentDashboardProps {
  programs: TrainingProgram[];
  placements: PlacementOutcome[];
  skills: Skill[];
  onOpenHighThinking: () => void;
  onOpenSyllabusUpload: () => void;
  onOpenMethodology?: () => void;
}

export const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({
  programs,
  placements,
  skills,
  onOpenHighThinking,
  onOpenSyllabusUpload,
  onOpenMethodology,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'challenge134' | 'challenge135' | 'copilot'>('overview');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  // AI Copilot state
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);

  // Filtered programs
  const filteredPrograms = programs.filter((p) => {
    const matchesDistrict = selectedDistrict === 'All' || p.district === selectedDistrict;
    const matchesSector = selectedSector === 'All' || p.sector === selectedSector;
    return matchesDistrict && matchesSector;
  });

  const avgAlignment = filteredPrograms.length
    ? Math.round(
        filteredPrograms.reduce((acc, curr) => acc + curr.alignmentScore, 0) /
          filteredPrograms.length
      )
    : 82;

  const avgPlacement = filteredPrograms.length
    ? Math.round(
        filteredPrograms.reduce((acc, curr) => acc + curr.placementRate, 0) /
          filteredPrograms.length
      )
    : 81;

  const totalEnrolled = filteredPrograms.reduce(
    (acc, curr) => acc + curr.enrolledStudents,
    0
  );

  const programsNeedingRevision = filteredPrograms.filter(
    (p) => p.status === 'Revision Mandated' || p.alignmentScore < 75
  );

  const avgSkillUtilization = placements.length
    ? Math.round(
        placements.reduce((acc, curr) => acc + curr.skillUtilizationRate, 0) /
          placements.length
      )
    : 85;

  // CSV Export Engine
  const downloadCSV = (type: 'all' | 'programs' | 'placements') => {
    setIsExportMenuOpen(false);
    let csvContent = '\uFEFF'; // UTF-8 BOM for Microsoft Excel & Google Sheets

    if (type === 'programs' || type === 'all') {
      csvContent += '# MAHARASHTRA VOCATIONAL CURRICULUM ALIGNMENT AUDIT (CHALLENGE 134)\r\n';
      csvContent += '# Directorate of Vocational Education & Training (DVET) • Smart India Hackathon 2026\r\n';
      csvContent += '# NOTICE: SYNTHETIC BENCHMARK PILOT DATASET FOR EVALUATOR DEMO\r\n';
      csvContent += `# Timestamp: ${new Date().toISOString()} • Filter District: ${selectedDistrict} • Sector: ${selectedSector}\r\n`;
      csvContent += 'Program ID,Program Name,Institution Name,District,Sector,Duration (Weeks),Enrolled Trainees (Sample),Alignment Score (%),Placement Rate (%),Median Package (INR),Status,Audit Date\r\n';

      filteredPrograms.forEach((p) => {
        const row = [
          `"${p.id}"`,
          `"${p.name.replace(/"/g, '""')}"`,
          `"${p.instituteName.replace(/"/g, '""')}"`,
          `"${p.district}"`,
          `"${p.sector}"`,
          p.durationWeeks,
          p.enrolledStudents,
          p.alignmentScore,
          p.placementRate,
          `"${p.avgPlacementSalaryINR}"`,
          `"${p.status}"`,
          `"${p.lastAnalyzedAt}"`,
        ].join(',');
        csvContent += row + '\r\n';
      });
      csvContent += '\r\n';
    }

    if (type === 'placements' || type === 'all') {
      csvContent += '# LONGITUDINAL GRADUATE EMPLOYMENT & SKILL UTILIZATION TRACING (CHALLENGE 135)\r\n';
      csvContent += '# NOTICE: SYNTHETIC COHORT PLACEMENT DATASET FOR EVALUATOR DEMO\r\n';
      csvContent += 'Record ID,Candidate Name,Institution,District,Employer Organization,Designation,Annual CTC (INR),Sector,Skill Utilization Rate (%),Retention (Months),Placement Date\r\n';

      placements.forEach((pl) => {
        const row = [
          `"${pl.id}"`,
          `"${pl.studentName.replace(/"/g, '""')}"`,
          `"${pl.instituteName.replace(/"/g, '""')}"`,
          `"${pl.district}"`,
          `"${pl.companyName.replace(/"/g, '""')}"`,
          `"${pl.role.replace(/"/g, '""')}"`,
          pl.salaryINR,
          `"${pl.sector}"`,
          pl.skillUtilizationRate,
          pl.retentionMonths,
          `"${pl.placementDate}"`,
        ].join(',');
        csvContent += row + '\r\n';
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const filename =
      type === 'programs'
        ? `dvet_program_alignment_statistics_${selectedDistrict.toLowerCase()}_2026.csv`
        : type === 'placements'
        ? `dvet_longitudinal_placement_outcomes_2026.csv`
        : `dvet_official_vocational_alignment_report_2026.csv`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAskCopilot = async (customPrompt?: string) => {
    const q = customPrompt || copilotQuery;
    if (!q.trim()) return;

    setCopilotLoading(true);
    setCopilotResponse(null);

    try {
      const res = await fetch('/app/api/ai/quick-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          district: selectedDistrict,
          sector: selectedSector,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to query advisor');
      }

      setCopilotResponse(data.answer);
    } catch (err: any) {
      console.error('Advisor error:', err);
      setCopilotResponse('Error generating policy response: ' + (err.message || 'Network issue'));
    } finally {
      setCopilotLoading(false);
    }
  };

  return (
    <div className="space-y-5 text-slate-100 font-sans">
      {/* Official Executive Header */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">
                STATE POLICY OVERSIGHT
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                SYNTHETIC PILOT BENCHMARK (SIH 2026 Evaluator Demo)
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              State Directorate of Vocational Education & Training (DVET)
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Curriculum competency verification (Challenge 134) & longitudinal employment tracing (Challenge 135) modeled across Maharashtra ITIs and polytechnic institutes.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* Download CSV Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CSV</span>
                <ChevronDown className="w-3 h-3 text-emerald-200" />
              </button>

              {isExportMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-30 py-1.5 text-xs font-sans">
                  <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 uppercase border-b border-slate-800">
                    Export Synthetic Datasets (CSV)
                  </div>
                  <button
                    onClick={() => downloadCSV('all')}
                    className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span>Consolidated Official Report</span>
                    <span className="text-[10px] text-emerald-400 font-mono">ALL</span>
                  </button>
                  <button
                    onClick={() => downloadCSV('programs')}
                    className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span>Program Alignment Stats (Ch 134)</span>
                    <span className="text-[10px] text-blue-400 font-mono">{filteredPrograms.length} rows</span>
                  </button>
                  <button
                    onClick={() => downloadCSV('placements')}
                    className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span>Placement Outcomes (Ch 135)</span>
                    <span className="text-[10px] text-teal-400 font-mono">{placements.length} rows</span>
                  </button>
                </div>
              )}
            </div>

            {onOpenMethodology && (
              <button
                onClick={onOpenMethodology}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all"
                title="View mathematical scoring formulas behind 92% alignment and 94% retention"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>Methodology & Formulas</span>
              </button>
            )}

            <button
              onClick={onOpenHighThinking}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-200" />
              <span>Policy Engine</span>
            </button>
            <button
              onClick={onOpenSyllabusUpload}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>Audit Syllabus</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Strip (Labeled clearly as Synthetic Pilot Baseline) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-[#0E1528] border border-slate-800 rounded-xl p-3.5 space-y-1 relative group">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Competency Index</span>
            <Award className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-1.5">
            <span>{avgAlignment}%</span>
            {onOpenMethodology && (
              <button
                onClick={onOpenMethodology}
                className="text-[10px] text-blue-400 hover:underline font-sans font-normal"
              >
                (Methodology)
              </button>
            )}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
            <span>Simulated Pilot Avg</span>
          </div>
        </div>

        <div className="bg-[#0E1528] border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Graduate Placement</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {avgPlacement}<span className="text-sm font-normal text-slate-400">%</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Target: 85.0% • Pilot Baseline
          </div>
        </div>

        <div className="bg-[#0E1528] border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Skill Utilization</span>
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-1.5">
            <span>{avgSkillUtilization}%</span>
            {onOpenMethodology && (
              <button
                onClick={onOpenMethodology}
                className="text-[10px] text-teal-400 hover:underline font-sans font-normal"
              >
                (Formula)
              </button>
            )}
          </div>
          <div className="text-[10px] text-teal-400 font-mono">
            Day-90 on-job match
          </div>
        </div>

        <div className="bg-[#0E1528] border border-slate-800 rounded-xl p-3.5 space-y-1">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Median Package</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            ₹6.4 <span className="text-xs font-normal text-slate-400">LPA</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Simulated Tier (INR)
          </div>
        </div>

        <div className="bg-[#0E1528] border border-slate-800 rounded-xl p-3.5 space-y-1 col-span-2 lg:col-span-1">
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Monitored Trainees</span>
            <Users className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {totalEnrolled.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Synthetic Pilot Cohort
          </div>
        </div>
      </div>

      {/* Segmented Controls & Dropdown Filters */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-2.5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeSubTab === 'overview'
                ? 'bg-blue-700 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Consolidated Overview
          </button>
          <button
            onClick={() => setActiveSubTab('challenge134')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'challenge134'
                ? 'bg-blue-700 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Challenge 134: Curriculum Relevancy</span>
            <span className="text-[9px] bg-slate-800 px-1 rounded text-amber-300">
              {programsNeedingRevision.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('challenge135')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeSubTab === 'challenge135'
                ? 'bg-blue-700 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Challenge 135: Longitudinal Outcomes
          </button>
          <button
            onClick={() => setActiveSubTab('copilot')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'copilot'
                ? 'bg-blue-700 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>AI Policy Advisor</span>
          </button>
        </div>

        {/* District & Sector Dropdown Filters */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Maharashtra (36 Districts)</option>
            <option value="Pune">Pune (Automotive Corridor)</option>
            <option value="Mumbai">Mumbai (BFSI & IT Hub)</option>
            <option value="Nagpur">Nagpur (MIHAN Logistics)</option>
            <option value="Nashik">Nashik (Defense & Tooling)</option>
            <option value="Aurangabad">Aurangabad (Renewable Solar)</option>
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="All">All Sectors</option>
            <option value="Automotive & EV">Automotive & EV</option>
            <option value="Advanced Manufacturing">Advanced Manufacturing</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Renewable Energy">Renewable Energy</option>
          </select>
        </div>
      </div>

      {/* AI Policy Advisor Interactive Tab */}
      {activeSubTab === 'copilot' && (
        <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                DVET Strategic Policy Copilot
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Instant data-grounded policy advisory for Maharashtra vocational training administrators
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              Jurisdiction: {selectedDistrict} • Sector: {selectedSector}
            </span>
          </div>

          {/* Quick Prompt Presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">
              Direct Query Inquiries:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  handleAskCopilot('How do we bridge the 15% curriculum deficit in Nashik CNC machinist programs to match industrial requisitions?')
                }
                className="text-[11px] bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-2.5 py-1 rounded transition-colors text-left"
              >
                Nashik CNC Curriculum Deficit Fix
              </button>
              <button
                type="button"
                onClick={() =>
                  handleAskCopilot('What capital investment is required to raise EV technician placement in Pune polytechnics from 88% to 95%?')
                }
                className="text-[11px] bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-2.5 py-1 rounded transition-colors text-left"
              >
                Pune EV Lab Upgrade ROI Projection
              </button>
              <button
                type="button"
                onClick={() =>
                  handleAskCopilot('What longitudinal incentives work best to prevent vocational graduate drop-out between month 6 and month 12?')
                }
                className="text-[11px] bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-2.5 py-1 rounded transition-colors text-left"
              >
                6–12 Month Graduate Retention Strategies
              </button>
            </div>
          </div>

          {/* Query Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              value={copilotQuery}
              onChange={(e) => setCopilotQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAskCopilot();
                }
              }}
              placeholder="Ask DVET Policy Copilot a specific vocational policy or resource allocation question..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            />
            <button
              onClick={() => handleAskCopilot()}
              disabled={copilotLoading || !copilotQuery.trim()}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {copilotLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Query</span>
            </button>
          </div>

          {/* Response Box */}
          {copilotResponse && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-4 space-y-2 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-line animate-in fade-in duration-150">
              <div className="flex items-center gap-1.5 text-blue-400 font-mono text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                DVET ADVISORY SYNTHESIS:
              </div>
              <div>{copilotResponse}</div>
            </div>
          )}
        </div>
      )}

      {/* Challenge 134: Curriculum Relevancy List */}
      {(activeSubTab === 'overview' || activeSubTab === 'challenge134') && (
        <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded">
                  CHALLENGE 134
                </span>
                <h3 className="text-sm font-bold text-white">
                  Curriculum Competency & Market Relevancy Audit
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Monitoring syllabus obsolescence against active employer requisitions across Maharashtra
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                Simulated Cohort Sample
              </span>
              <span className="text-[11px] font-mono font-medium text-rose-300 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
                {programsNeedingRevision.length} Revisions Mandated
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white">{prog.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {prog.instituteName} • <span className="text-slate-300">{prog.district}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end shrink-0 gap-1">
                    <span
                      onClick={onOpenMethodology}
                      title="Click to view weighted scoring formula: 45% semantic match + 35% NSQF + 20% live vacancy recency"
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border cursor-pointer hover:underline transition-all ${
                        prog.alignmentScore >= 85
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                          : prog.alignmentScore >= 70
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                          : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                      }`}
                    >
                      {prog.alignmentScore}% ALIGNED ⓘ
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      Method: 0.45S + 0.35N + 0.20D
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      prog.alignmentScore >= 85
                        ? 'bg-emerald-500'
                        : prog.alignmentScore >= 70
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${prog.alignmentScore}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                  <span>Placement: <strong className="text-slate-200">{prog.placementRate}%</strong></span>
                  <span>Avg Package: <strong className="text-slate-200">{prog.avgPlacementSalaryINR}</strong></span>
                  <span className="text-slate-500">Audited {prog.lastAnalyzedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenge 135: Longitudinal Employment Tracking */}
      {(activeSubTab === 'overview' || activeSubTab === 'challenge135') && (
        <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-1.5 py-0.5 rounded">
                  CHALLENGE 135
                </span>
                <h3 className="text-sm font-bold text-white">
                  Longitudinal Employment Tracking & Graduate Retention Telemetry
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Continuous tracing of career trajectory at 6, 12, and 24-month follow-up cycles (Synthetic Pilot Dataset)
              </p>
            </div>

            <div className="flex items-center gap-2">
              {onOpenMethodology && (
                <button
                  onClick={onOpenMethodology}
                  className="text-[11px] font-mono text-teal-400 hover:text-teal-300 underline underline-offset-2 flex items-center gap-1"
                >
                  <Info className="w-3 h-3" />
                  <span>How 94% Retention is Derived</span>
                </button>
              )}
            </div>
          </div>

          {/* Retention Milestones */}
          <div className="grid grid-cols-3 gap-2.5 bg-slate-900/60 border border-slate-800 rounded-lg p-3 text-center">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">6-Month Retention</span>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">92.4%</div>
              <span className="text-[10px] text-slate-500">Day-180 Supervisor Checklist</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">12-Month Retention</span>
              <div className="text-lg font-bold font-mono text-sky-400 mt-0.5">86.8%</div>
              <span className="text-[10px] text-slate-500">+18% Wage Growth</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">24-Month Career Track</span>
              <div className="text-lg font-bold font-mono text-purple-400 mt-0.5">79.5%</div>
              <span className="text-[10px] text-slate-500">Supervisory Grade</span>
            </div>
          </div>

          {/* Live Placement Telemetry Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-300 uppercase tracking-wider">
                Recent Verified Placements (Simulated Pilot Cohort):
              </span>
              <span className="text-slate-500 font-mono text-[10px]">
                Showing {placements.length} synthetic verification records
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {placements.map((place) => (
                <div
                  key={place.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{place.studentName}</span>
                      <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-1 rounded border border-slate-800">
                        Synthetic Record
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {place.role} • <span className="text-slate-200">{place.companyName}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {place.instituteName} ({place.district})
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-mono font-bold text-white">
                      ₹{(place.salaryINR / 100000).toFixed(1)} LPA
                    </div>
                    <button
                      onClick={onOpenMethodology}
                      title="Click to view longitudinal skill utilization formula"
                      className="text-[10px] font-mono font-semibold text-teal-300 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded hover:underline block ml-auto"
                    >
                      {place.skillUtilizationRate}% On-Job Match ⓘ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
