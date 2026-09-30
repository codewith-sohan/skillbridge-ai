'use client';

import React, { useState } from 'react';
import {
  X,
  SlidersHorizontal,
  DollarSign,
  AlertCircle,
  Calendar,
  Layers,
  ArrowRight,
  Loader2,
  FileCheck,
  ShieldCheck,
  TrendingUp,
  Landmark,
} from 'lucide-react';

interface HighThinkingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HighThinkingModal: React.FC<HighThinkingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [challengeArea, setChallengeArea] = useState('Challenge 134 + 135: Unified Curriculum Alignment & Longitudinal Tracking');
  const [district, setDistrict] = useState('Maharashtra State-Wide (Pune, Mumbai, Nagpur, Nashik, Aurangabad)');
  const [sector, setSector] = useState('Automotive & EV, Advanced Manufacturing, IT & DevOps, Renewable Energy');
  const [budgetAllocationINR, setBudgetAllocationINR] = useState('₹120 Crores');
  const [customQuery, setCustomQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleExecuteReasoning = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/app/api/ai/high-thinking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeArea,
          district,
          sector,
          budgetAllocationINR,
          query: customQuery,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to execute High Thinking model');
      }

      setResult(data.strategy);
    } catch (err: any) {
      console.error('High thinking execution error:', err);
      setErrorMsg(err.message || 'Failed to complete High Thinking analysis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-[#0C1222] border border-slate-800 rounded-xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0A0E1A] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-slate-800 border border-slate-700 text-blue-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  State Policy Simulation & High Thinking Econometric Chamber
                </h3>
                <span className="bg-slate-800 text-blue-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700 font-medium">
                  Gemini 3.1 Pro • ThinkingLevel.HIGH
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Multi-order causal optimization for Maharashtra skilling modernization and longitudinal employment tracking
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {!result ? (
            <>
              {/* Parameters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Statutory Problem Scope (SIH Challenge)
                  </label>
                  <select
                    value={challengeArea}
                    onChange={(e) => setChallengeArea(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="Challenge 134 + 135: Unified Curriculum Alignment & Longitudinal Tracking">
                      Challenge 134 + 135: Unified Curriculum Alignment & Longitudinal Tracking
                    </option>
                    <option value="Challenge 134: Real-Time Industry Skill Gap Remediation">
                      Challenge 134: Real-Time Industry Skill Gap Remediation
                    </option>
                    <option value="Challenge 135: Longitudinal Employment Tracking & Skill Utilization">
                      Challenge 135: Longitudinal Employment Tracking & Skill Utilization
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Jurisdiction / Districts Evaluated
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Priority Industrial Growth Corridors
                  </label>
                  <input
                    type="text"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Public Finance Capital Allocation Envelope
                  </label>
                  <input
                    type="text"
                    value={budgetAllocationINR}
                    onChange={(e) => setBudgetAllocationINR(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium font-mono"
                  />
                </div>
              </div>

              {/* Inquiry */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Specific Econometric Inquiry or Policy Objective
                </label>
                <textarea
                  rows={4}
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="Conduct a rigorous econometric analysis of vocational graduate underemployment in Maharashtra, model the ROI of capital equipment grants across 36 district ITIs, and establish continuous employer feedback telemetry..."
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono leading-relaxed"
                />
              </div>

              {/* Preset Scenarios */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 space-y-2">
                <span className="text-[10px] text-slate-500 font-mono uppercase block">
                  Select Policy Simulation Scenario:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCustomQuery(
                        'Model the 18-month economic ROI of transforming 50 mechanical ITI centers in Pune & Nashik into specialized EV Diagnostics & Robotics academies with Tata Motors and Bharat Forge co-sponsorship.'
                      )
                    }
                    className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded font-mono transition-colors"
                  >
                    Pune/Nashik EV & Robotics Academy ROI
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomQuery(
                        'Design a foolproof longitudinal employer telemetry mechanism (Challenge 135) to measure 6-month, 12-month, and 24-month retention rates and wage growth without placing burden on students.'
                      )
                    }
                    className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded font-mono transition-colors"
                  >
                    Longitudinal Employer Telemetry Mechanism
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomQuery(
                        'Evaluate regional skill asymmetry: why Marathwada and Vidarbha struggle with renewable energy job conversions despite heavy solar installations, and formulate a targeted curriculum fix.'
                      )
                    }
                    className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded font-mono transition-colors"
                  >
                    Marathwada Solar Feeder Conversion Deficit
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="bg-rose-950/40 border border-rose-800 text-rose-300 text-xs p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </>
          ) : (
            /* Result Screen */
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="bg-[#0A0E1A] border border-slate-800 rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-sm font-bold text-white font-serif">
                    {result.strategicTitle}
                  </h4>
                  <span className="text-[10px] font-mono text-blue-300 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded font-bold">
                    HIGH REASONING SYNTHESIS
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#0C1222] p-3.5 rounded border border-slate-800 font-sans">
                  {result.executiveDiagnosis}
                </p>
              </div>

              {/* Economic Target Indices */}
              {result.expectedLongitudinalOutcomes && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Placement Velocity</span>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">
                      {result.expectedLongitudinalOutcomes.projectedPlacementRateIncrease}
                    </div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Starting Wage Gain</span>
                    <div className="text-base font-bold text-sky-400 mt-0.5">
                      {result.expectedLongitudinalOutcomes.projectedAverageWageGrowth}
                    </div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Skill Utilization</span>
                    <div className="text-base font-bold text-white mt-0.5">
                      {result.expectedLongitudinalOutcomes.skillUtilizationRateTarget}
                    </div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">State GVA Impact</span>
                    <div className="text-base font-bold text-amber-400 mt-0.5">
                      {result.expectedLongitudinalOutcomes.estimatedStateGDPImpact}
                    </div>
                  </div>
                </div>
              )}

              {/* Root Cause Decomposition */}
              {result.rootCauseAnalysis && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 space-y-2.5">
                  <h5 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    Causal Employability Bottlenecks Identified
                  </h5>
                  <div className="space-y-2">
                    {result.rootCauseAnalysis.map((rc: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-[#0C1222] border border-slate-800 rounded p-2.5 text-xs flex items-start justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <span className="font-semibold text-white font-mono">{rc.factor}</span>
                          <p className="text-slate-400 text-[11px] font-sans">{rc.explanation}</p>
                        </div>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded border shrink-0 font-bold ${
                            rc.impactWeight === 'Critical'
                              ? 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                              : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                          }`}
                        >
                          {rc.impactWeight.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Capital Allocation Model */}
              {result.budgetAllocationOptimization && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 space-y-2.5">
                  <h5 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Mathematical Resource Allocation Model ({budgetAllocationINR})
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {result.budgetAllocationOptimization.map((cat: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-[#0C1222] border border-slate-800 rounded p-3 space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-mono">
                          <h6 className="text-xs font-bold text-white">{cat.category}</h6>
                          <span className="text-xs font-bold text-emerald-400">
                            {cat.amountINR} ({cat.allocationPercentage}%)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans">{cat.justification}</p>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${cat.allocationPercentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#0A0E1A] border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (result) {
                setResult(null);
              } else {
                onClose();
              }
            }}
            className="px-3.5 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {result ? 'Adjust Simulation Parameters' : 'Close Terminal'}
          </button>

          {!result ? (
            <button
              onClick={handleExecuteReasoning}
              disabled={isLoading}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Synthesizing Deep Policy Model (Gemini 3.1 Pro Thinking)...
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Execute High Thinking Simulation
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-1.5 rounded-lg text-xs"
            >
              Transmit Policy Directive & Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
