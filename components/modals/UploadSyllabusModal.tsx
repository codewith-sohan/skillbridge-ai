'use client';

import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Loader2,
  FileText,
  Clock,
  Save,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { CurriculumAnalysis } from '@/lib/types';
import { saveCurriculumAnalysis } from '@/lib/storage';

interface UploadSyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete?: (analysis: CurriculumAnalysis) => void;
}

export const UploadSyllabusModal: React.FC<UploadSyllabusModalProps> = ({
  isOpen,
  onClose,
  onAnalysisComplete,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [programName, setProgramName] = useState('Advanced Electric Vehicle & Battery Systems');
  const [instituteName, setInstituteName] = useState('Government Polytechnic Pune');
  const [sector, setSector] = useState('Automotive & EV');
  const [syllabusText, setSyllabusText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CurriculumAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSampleSyllabusImage = (sampleType: 'ev' | 'cnc' | 'cloud') => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw official document sheet
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 900, 1200);

    // Official State Header Border
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2;
    ctx.strokeRect(25, 25, 850, 1150);

    // Header bar
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(45, 45, 810, 85);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px serif';
    ctx.fillText('GOVERNMENT OF MAHARASHTRA • DVET', 65, 85);
    ctx.font = '14px sans-serif';
    ctx.fillText('STATE BOARD OF TECHNICAL EDUCATION & VOCATIONAL ACCREDITATION', 65, 110);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 18px sans-serif';

    if (sampleType === 'ev') {
      setProgramName('Advanced EV Technician & Battery Systems Diploma');
      setInstituteName('Government Polytechnic Pune');
      setSector('Automotive & EV');

      ctx.fillText('CURRICULUM SPECIFICATION: EV POWERTRAIN & DIAGNOSTIC ELECTRONICS', 55, 175);
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('Course Code: MSBTE-EV-2026-PUNE | NSQF Level: 5 | Contact Hours: 480', 55, 200);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 01: Internal Combustion Engine Fundamentals (Legacy) - 60 Hrs', 55, 250);
      ctx.font = '14px sans-serif';
      ctx.fillText('• 4-stroke spark ignition, mechanical camshaft timing, carburetor maintenance.', 75, 275);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 02: High-Voltage Lithium-Ion Battery Systems & BMS - 80 Hrs', 55, 320);
      ctx.font = '14px sans-serif';
      ctx.fillText('• LFP vs NMC cell chemistry, thermal runaway mitigation, CAN-bus telemetry.', 75, 345);
      ctx.fillText('• Immersion cooling diagnostics and cell balancing circuits.', 75, 365);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 03: Regenerative Inverter Drives & Motor Control - 60 Hrs', 55, 410);
      ctx.font = '14px sans-serif';
      ctx.fillText('• SiC MOSFET vs IGBT inverters, PMSM motor field-oriented control.', 75, 435);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 04: Industrial Safety & High Voltage PPE Compliance - 40 Hrs', 55, 480);
      ctx.font = '14px sans-serif';
      ctx.fillText('• NFPA 70E compliance, insulation testing, ISO 26262 functional safety.', 75, 505);
    } else if (sampleType === 'cnc') {
      setProgramName('Industrial Robotics & Precision CNC Machining');
      setInstituteName('ITI Nashik Industrial Automation Centre');
      setSector('Advanced Manufacturing');

      ctx.fillText('CURRICULUM SPECIFICATION: PRECISION MACHINING & INDUSTRIAL ROBOTICS', 55, 175);
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('Course Code: MSBTE-CNC-2026-NSK | NSQF Level: 5 | Contact Hours: 320', 55, 200);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 01: Manual Lathe & Shaping Operations (Legacy) - 80 Hrs', 55, 250);
      ctx.font = '14px sans-serif';
      ctx.fillText('• Hand feed operations, manual thread chasing, step turning on manual lathe.', 75, 275);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 02: 3-Axis CNC Milling & G-Code Programming - 70 Hrs', 55, 320);
      ctx.font = '14px sans-serif';
      ctx.fillText('• G00/G01 linear interpolation, canned cycles G81, cutter compensation.', 75, 345);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 03: Basic Relay Logic & Industrial Electrics - 30 Hrs', 55, 390);
      ctx.font = '14px sans-serif';
      ctx.fillText('• Contactors, push buttons, simple start-stop holding circuits.', 75, 415);
    } else {
      setProgramName('Cloud Native Infrastructure & DevOps Engineering');
      setInstituteName('VJTI Centre of Excellence, Mumbai');
      setSector('Information Technology');

      ctx.fillText('CURRICULUM SPECIFICATION: CLOUD NATIVE INFRASTRUCTURE & GITOPS', 55, 175);
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText('Course Code: VJTI-COE-CLOUD-2026 | NSQF Level: 6 | Contact Hours: 400', 55, 200);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 01: Linux Kernel Fundamentals & Container Runtimes - 70 Hrs', 55, 250);
      ctx.font = '14px sans-serif';
      ctx.fillText('• Namespaces, cgroups v2, multi-stage Dockerfile builds, containerd.', 75, 275);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('MODULE 02: Kubernetes Orchestration & GitOps Pipelines - 90 Hrs', 55, 320);
      ctx.font = '14px sans-serif';
      ctx.fillText('• Deployments, Ingress controllers, Helm 3 packaging, ArgoCD continuous delivery.', 75, 345);
    }

    // Official Seal watermark
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 1;
    ctx.strokeRect(55, 950, 260, 100);
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('STATE ACCREDITATION BOARD SEAL', 65, 980);
    ctx.font = 'italic 11px sans-serif';
    ctx.fillText('Verified Document for SIH 2026 Audit', 65, 1005);
    ctx.fillText('Statutory Code: MH-DVET-VERIFIED', 65, 1025);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setImagePreview(dataUrl);
    setErrorMsg('');
  };

  const handleAnalyze = async () => {
    if (!imagePreview && !syllabusText) {
      setErrorMsg('Please upload a document image or select a sample syllabus.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setIsSaved(false);

    try {
      let base64ToSend = imagePreview;
      if (!base64ToSend && syllabusText) {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1000;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, 800, 1000);
          ctx.fillStyle = '#0F172A';
          ctx.font = 'bold 20px sans-serif';
          ctx.fillText(`Program: ${programName}`, 40, 50);
          ctx.font = '14px sans-serif';
          const lines = syllabusText.split('\n');
          lines.slice(0, 30).forEach((line, idx) => {
            ctx.fillText(line, 40, 90 + idx * 25);
          });
          base64ToSend = canvas.toDataURL('image/jpeg');
        }
      }

      const res = await fetch('/app/api/ai/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: base64ToSend,
          mimeType: 'image/jpeg',
          programName,
          instituteName,
          sector,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze syllabus');
      }

      const analysis: CurriculumAnalysis = {
        id: `analysis-${Date.now()}`,
        programName: data.analysis.programTitleDetected || programName,
        institute: instituteName,
        alignmentScore: data.analysis.alignmentScore || 82,
        analyzedAt: new Date().toISOString(),
        matchedSkills: (data.analysis.skillsCovered || []).map((s: any) =>
          typeof s === 'string' ? s : s.skill
        ),
        missingCriticalSkills: data.analysis.missingCriticalSkills || [],
        obsoleteSkillsDetected: data.analysis.obsoleteTopicsDetected || [],
        industryDemandTrend:
          data.analysis.industrySectorAlignment?.placementProspectsRating || 'High Demand',
        benchmarkingNote:
          data.analysis.industrySectorAlignment?.benchmarkingNote ||
          'Benchmarked against state tier-1 polytechnic standards',
        recommendedModules: data.analysis.recommendedModules || [],
        executiveSummary:
          data.analysis.executiveSummary ||
          'Formal curriculum audit conducted via Gemini 3.1 Pro Vision model.',
        imageAnalyzed: true,
      };

      setAnalysisResult(analysis);
      if (onAnalysisComplete) {
        onAnalysisComplete(analysis);
      }
    } catch (err: any) {
      console.error('Error analyzing document:', err);
      setErrorMsg(err.message || 'Error executing vision analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToFirestore = async () => {
    if (!analysisResult) return;
    setIsLoading(true);
    try {
      await saveCurriculumAnalysis(analysisResult);
      setIsSaved(true);
    } catch (err: any) {
      setErrorMsg('Failed to persist to Firestore: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-[#0C1222] border border-slate-800 rounded-xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-slate-100">
        {/* Official Header */}
        <div className="px-6 py-4 bg-[#0A0E1A] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-slate-800 border border-slate-700 text-blue-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Institutional Curriculum Audit & Accreditation Terminal
                </h3>
                <span className="bg-slate-800 text-teal-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
                  Gemini 3.1 Pro Vision
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Statutory audit of vocational syllabus documents against active 2026 industrial requirements
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
          {!analysisResult ? (
            <>
              {/* Form Context */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Course / Program Designation *
                  </label>
                  <input
                    type="text"
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Polytechnic / ITI Institution *
                  </label>
                  <input
                    type="text"
                    value={instituteName}
                    onChange={(e) => setInstituteName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Priority Sector
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="Automotive & EV">Automotive & EV</option>
                    <option value="Advanced Manufacturing">Advanced Manufacturing</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="BFSI & FinTech">BFSI & FinTech</option>
                  </select>
                </div>
              </div>

              {/* Sample Document Ingestion Presets */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 space-y-2">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">
                  Ingest Official State Sample Syllabus Document:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => loadSampleSyllabusImage('ev')}
                    className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded font-mono transition-colors"
                  >
                    EV Powertrain & Battery (Pune ITI)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleSyllabusImage('cnc')}
                    className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded font-mono transition-colors"
                  >
                    CNC Robotics & Machining (Nashik ITI)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleSyllabusImage('cloud')}
                    className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded font-mono transition-colors"
                  >
                    Cloud & GitOps Infrastructure (VJTI Mumbai)
                  </button>
                </div>
              </div>

              {/* Document Image Dropzone */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-2">
                  Syllabus Document Page / Scanned Sheet
                </label>
                <div className="border border-dashed border-slate-700 hover:border-slate-500 rounded-lg p-4 text-center bg-slate-900/40 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <div className="relative inline-block max-h-56 rounded overflow-hidden border border-slate-700 shadow-sm bg-white">
                        <img
                          src={imagePreview}
                          alt="Syllabus Preview"
                          className="max-h-56 object-contain mx-auto"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3 text-xs font-mono">
                        <label className="cursor-pointer text-blue-400 hover:text-blue-300 font-medium">
                          Replace Document
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <span className="text-slate-600">|</span>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setImageFile(null);
                          }}
                          className="text-rose-400 hover:text-rose-300 font-medium"
                        >
                          Clear Selection
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4">
                      <Upload className="w-5 h-5 text-slate-400" />
                      <p className="text-xs font-semibold text-slate-200">
                        Upload official syllabus PDF export or scanned page image
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Supports PNG, JPG, WEBP documentation sheets
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Text fallback */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Or Paste Course Modules & Topics Directly
                </label>
                <textarea
                  rows={3}
                  value={syllabusText}
                  onChange={(e) => setSyllabusText(e.target.value)}
                  placeholder="Module 1: High Voltage Battery Safety, CAN-bus Telemetry, Legacy Carburetor..."
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {errorMsg && (
                <div className="bg-rose-950/40 border border-rose-800 text-rose-300 text-xs p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </>
          ) : (
            /* Audit Report View */
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/90 border border-slate-800 rounded-lg p-4">
                <div className="flex flex-col items-center justify-center p-3 bg-slate-950 border border-slate-800 rounded text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Competency Alignment
                  </span>
                  <div className="text-3xl font-bold font-mono my-1 text-white">
                    {analysisResult.alignmentScore}%
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                      analysisResult.alignmentScore >= 80
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                        : analysisResult.alignmentScore >= 65
                        ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                        : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                    }`}
                  >
                    {analysisResult.alignmentScore >= 80
                      ? 'COMPLIANT'
                      : analysisResult.alignmentScore >= 65
                      ? 'REVISION ADVISORY'
                      : 'DEFICIT MANDATED'}
                  </span>
                </div>

                <div className="md:col-span-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{analysisResult.programName}</h4>
                    <span className="text-xs text-slate-400 font-mono">{analysisResult.institute}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded border border-slate-850 font-sans">
                    {analysisResult.executiveSummary}
                  </p>
                  <div className="text-[11px] text-blue-400 font-mono flex items-center gap-1.5 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{analysisResult.benchmarkingNote}</span>
                  </div>
                </div>
              </div>

              {/* Competency Audit Triad */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5 space-y-2">
                  <div className="text-xs font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Competencies Verified ({analysisResult.matchedSkills.length})
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 font-mono">
                    {analysisResult.matchedSkills.map((sk, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5 space-y-2">
                  <div className="text-xs font-semibold text-amber-400 font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Obsolete Topics Flagged ({analysisResult.obsoleteSkillsDetected.length})
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 font-mono">
                    {analysisResult.obsoleteSkillsDetected.map((sk, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">✕</span>
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3.5 space-y-2">
                  <div className="text-xs font-semibold text-rose-400 font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Critical Omissions ({analysisResult.missingCriticalSkills.length})
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300 font-mono">
                    {analysisResult.missingCriticalSkills.map((sk, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">+</span>
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mandated Modular Additions */}
              <div>
                <h5 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  Accreditation Upgrades Mandated for 2026 Batch
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysisResult.recommendedModules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <h6 className="text-xs font-bold text-white">{mod.title}</h6>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          {mod.suggestedHours} Contact Hrs
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{mod.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1 font-mono">
                        {mod.skillsTargeted.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[9px] bg-slate-950 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#0A0E1A] border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (analysisResult) {
                setAnalysisResult(null);
              } else {
                onClose();
              }
            }}
            className="px-3.5 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {analysisResult ? 'Audit Another Document' : 'Cancel'}
          </button>

          {!analysisResult ? (
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Running Vision Analysis (Gemini 3.1 Pro)...
                </>
              ) : (
                <>
                  <FileCheck className="w-3.5 h-3.5" />
                  Execute Accreditation Audit
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToFirestore}
                disabled={isLoading || isSaved}
                className={`font-semibold px-3.5 py-1.5 rounded text-xs flex items-center gap-1.5 transition-all ${
                  isSaved
                    ? 'bg-emerald-800/80 text-emerald-200 cursor-default'
                    : 'bg-blue-700 hover:bg-blue-600 text-white active:scale-95'
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mandate Filed in Registry
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    File Official Accreditation Mandate
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 px-3.5 py-1.5 rounded text-xs font-medium"
              >
                Close Audit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
