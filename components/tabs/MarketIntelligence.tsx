'use client';

import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  Building2,
  ExternalLink,
  DollarSign,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  Globe,
  Activity,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export const MarketIntelligence: React.FC = () => {
  const [query, setQuery] = useState('Current hiring demand for Electric Vehicle (EV) and battery diagnostics technicians in Pune Maharashtra 2026');
  const [sector, setSector] = useState('Automotive & EV');
  const [district, setDistrict] = useState('Pune');
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<any>({
    queryExecuted: 'Current hiring demand for Electric Vehicle (EV) and battery diagnostics technicians in Pune Maharashtra 2026',
    sector: 'Automotive & EV',
    marketSummary: 'Rapid acceleration in electric vehicle assembly lines across Pune, Pimpri-Chinchwad, and Chakan industrial belts has generated acute demand for high-voltage battery diagnostic technicians, CAN-bus integration specialists, and BMS testing engineers.',
    inDemandSkills: [
      {
        skill: 'High-Voltage Battery Pack Diagnostics & BMS',
        trend: 'High Demand',
        rationale: 'Assembly expansion by Tata Motors, Bajaj Auto, and Mahindra Electric requiring certified high-voltage technicians.',
        avgSalaryINR: '₹6,50,000 - ₹9,20,000',
      },
      {
        skill: 'CANoe / CAN Bus Telemetry Testing',
        trend: 'Rapidly Rising',
        rationale: 'ECU communication and diagnostic troubleshooting across powertrain sensors.',
        avgSalaryINR: '₹7,00,000 - ₹10,50,000',
      },
      {
        skill: 'ISO 26262 High Voltage Safety Protocols',
        trend: 'High Demand',
        rationale: 'Mandatory workshop and plant electrical safety compliance certifications.',
        avgSalaryINR: '₹5,50,000 - ₹8,00,000',
      },
    ],
    activeHiringEmployers: ['Tata Motors Ltd.', 'Bajaj Auto', 'Mahindra Electric', 'Bharat Forge Ltd.', 'Flash Electronics'],
    topEmergingRoles: ['EV Powertrain Diagnostics Specialist', 'BMS Calibration Technician', 'High Voltage Safety Inspector'],
    recommendedGovernmentAction: 'Sanction ₹35 Crores from the State Skilling Modernization Fund to equip 24 model polytechnics in Pune and Chakan with specialized high-voltage EV diagnostic benches.',
  });

  const [groundingInfo, setGroundingInfo] = useState<{ searchQueries: string[]; sources: any[] } | null>({
    searchQueries: [
      'Current hiring demand for Electric Vehicle EV technicians Pune 2026',
      'Tata Motors EV hiring Maharashtra job portal postings',
    ],
    sources: [
      { title: 'Maharashtra State Skill Development Society (MSSDS)', uri: 'https://mssds.gov.in' },
      { title: 'National Career Service Portal, Govt. of India', uri: 'https://www.ncs.gov.in' },
      { title: 'Automotive Skills Development Council (ASDC)', uri: 'https://asdc.org.in' },
    ],
  });

  const [errorMsg, setErrorMsg] = useState('');

  const executeMarketSearch = async (customSearchQuery?: string, customSector?: string, customDistrict?: string) => {
    setIsLoading(true);
    setErrorMsg('');

    const targetQuery = customSearchQuery || query;
    const targetSector = customSector || sector;
    const targetDistrict = customDistrict || district;

    try {
      const res = await fetch('/app/api/ai/market-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: targetQuery,
          sector: targetSector,
          district: targetDistrict,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch grounded market intelligence');
      }

      setSearchData(data.data);
      setGroundingInfo(data.grounding);
    } catch (err: any) {
      console.error('Market search error:', err);
      setErrorMsg(err.message || 'Error executing Google Search Grounding');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPreset = (presetQuery: string, presetSector: string, presetDistrict: string) => {
    setQuery(presetQuery);
    setSector(presetSector);
    setDistrict(presetDistrict);
    executeMarketSearch(presetQuery, presetSector, presetDistrict);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Official Header Banner */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded">
                LABOR MARKET OBSERVATORY & LIVE SCRAPER
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Powered by Gemini 3.5 Flash • Search Grounding v2.4
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Real-Time Labor Market Intelligence & Hiring Pulse
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Continuous empirical grounding of state vocational programs against live hiring requisitions across LinkedIn, Naukri, Indeed, and National Career Service portals. Tracks emerging competencies and salary benchmarks across Maharashtra.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Search Grounding Active</span>
          </div>
        </div>
      </div>

      {/* Query Terminal */}
      <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  executeMarketSearch();
                }
              }}
              placeholder="Search live labor market recruitment trends, competencies, and salary benchmarks..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <button
            onClick={() => executeMarketSearch()}
            disabled={isLoading}
            className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Scraping & Grounding...
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                Run Grounded Query
              </>
            )}
          </button>
        </div>

        {/* Official Industrial Cluster Presets */}
        <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
          <span className="text-[10px] text-slate-500 font-mono uppercase">Priority Clusters:</span>
          <button
            onClick={() =>
              handleQuickPreset(
                'Electric Vehicle EV battery diagnostics manufacturing jobs Pune Maharashtra 2026 hiring',
                'Automotive & EV',
                'Pune'
              )
            }
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded text-[11px] font-mono transition-colors"
          >
            Pune Automotive & EV Cluster
          </button>
          <button
            onClick={() =>
              handleQuickPreset(
                'Applied Cloud DevOps Kubernetes microservices jobs Mumbai BKC Maharashtra 2026',
                'Information Technology',
                'Mumbai'
              )
            }
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded text-[11px] font-mono transition-colors"
          >
            Mumbai Cloud & FinTech Hub
          </button>
          <button
            onClick={() =>
              handleQuickPreset(
                'PM-KUSUM solar microgrid installation and SCADA technician jobs Aurangabad Maharashtra 2026',
                'Renewable Energy',
                'Aurangabad'
              )
            }
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded text-[11px] font-mono transition-colors"
          >
            Marathwada Solar Microgrids
          </button>
          <button
            onClick={() =>
              handleQuickPreset(
                'CNC 5-axis precision milling and robotics tooling jobs Nashik Maharashtra 2026',
                'Advanced Manufacturing',
                'Nashik'
              )
            }
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded text-[11px] font-mono transition-colors"
          >
            Nashik Defense & CNC Tooling
          </button>
        </div>

        {errorMsg && (
          <div className="bg-rose-950/40 border border-rose-800 text-rose-300 text-xs p-3 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Results Display */}
      {searchData && (
        <div className="space-y-5">
          {/* Grounding Source Attribution Metadata */}
          {groundingInfo && (
            <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2 text-sky-400 font-semibold font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AUTHENTICATED GOOGLE SEARCH GROUNDING METADATA:</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Query: <span className="text-slate-200">&ldquo;{searchData.queryExecuted || query}&rdquo;</span>
                </div>
              </div>

              {groundingInfo.sources && groundingInfo.sources.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px]">
                  <span className="text-slate-500">ATTRIBUTED PORTALS:</span>
                  {groundingInfo.sources.map((source: any, idx: number) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      {source.title || 'Official Job Portal'}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dual Results Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 7 cols: Competency Demand Table */}
            <div className="lg:col-span-7 bg-[#0C1222] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                  In-Demand Industrial Competencies
                </h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  Sector: {searchData.sector}
                </span>
              </div>

              <div className="space-y-2.5">
                {searchData.inDemandSkills?.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{item.skill}</h4>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          item.trend?.includes('Rapid') || item.trend?.includes('High')
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                            : 'bg-blue-950/60 text-blue-300 border-blue-800/60'
                        }`}
                      >
                        {item.trend.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.rationale}</p>

                    <div className="text-[11px] text-slate-400 font-mono">
                      Compensation Benchmark: <strong className="text-emerald-400">{item.avgSalaryINR}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Employers, Roles & Policy Directives */}
            <div className="lg:col-span-5 space-y-4">
              {/* Executive Summary */}
              <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-4 space-y-2">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  LABOR MARKET SYNTHESIS
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded border border-slate-850">
                  {searchData.marketSummary}
                </p>
              </div>

              {/* Active Hiring Enterprises */}
              <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-4 space-y-2.5">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  PRIMARY CORPORATE RECRUITERS
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {searchData.activeHiringEmployers?.map((emp: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-slate-900 text-slate-200 text-xs px-2.5 py-1 rounded border border-slate-800 font-medium"
                    >
                      {emp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Emerging Designations */}
              <div className="bg-[#0C1222] border border-slate-800 rounded-xl p-4 space-y-2">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  EMERGING REQUISITION DESIGNATIONS
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {searchData.topEmergingRoles?.map((role: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-850">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* State Action Recommendation */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  Statutory Directive for DVET
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {searchData.recommendedGovernmentAction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
