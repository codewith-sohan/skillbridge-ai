export type UserRole = 'government' | 'institute' | 'employer' | 'student';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  organization?: string;
  district?: string;
  createdAt?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Domain' | 'Emerging Tech';
  sector: 'Information Technology' | 'Automotive & EV' | 'Renewable Energy' | 'BFSI & FinTech' | 'Healthcare' | 'Advanced Manufacturing';
  demandScore: number; // 0 - 100
  trend: 'Rapidly Rising' | 'Rising' | 'Stable' | 'Declining';
  avgSalaryINR: string; // e.g. "₹8,50,000"
  growthRateYoY: string; // e.g. "+38%"
  prerequisites: string[];
}

export interface ProgramSkill {
  skillId: string;
  skillName: string;
  proficiencyLevel: 'Foundational' | 'Intermediate' | 'Advanced';
  hours: number;
  relevanceScore: number; // 0 - 100
}

export interface TrainingProgram {
  id: string;
  name: string;
  instituteName: string;
  district: string;
  sector: string;
  durationWeeks: number;
  enrolledStudents: number;
  placementRate: number; // percentage
  avgPlacementSalaryINR: string;
  alignmentScore: number; // 0 - 100
  skills: ProgramSkill[];
  lastAnalyzedAt: string;
  syllabusSummary: string;
  status: 'Active' | 'Under Review' | 'Revision Mandated';
}

export interface CurriculumAnalysis {
  id: string;
  programId?: string;
  programName: string;
  institute: string;
  alignmentScore: number;
  analyzedAt: string;
  matchedSkills: string[];
  missingCriticalSkills: string[];
  obsoleteSkillsDetected: string[];
  industryDemandTrend: string;
  benchmarkingNote: string;
  recommendedModules: {
    title: string;
    description: string;
    suggestedHours: number;
    skillsTargeted: string[];
  }[];
  executiveSummary: string;
  imageAnalyzed?: boolean;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  sector: string;
  jobType: 'Full-time' | 'Apprenticeship' | 'Contract';
  salaryMinINR: number;
  salaryMaxINR: number;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior';
  requiredSkills: string[];
  preferredSkills: string[];
  vacancies: number;
  postedDate: string;
  source: 'Direct Partner' | 'LinkedIn Aggregate' | 'Naukri' | 'Government Portal';
  description: string;
  matchedCandidatesCount?: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  district: string;
  instituteName: string;
  programEnrolled: string;
  skills: {
    skillName: string;
    level: 'Foundational' | 'Intermediate' | 'Advanced';
    verified: boolean;
    evidenceType: 'Coursework' | 'Industry Certification' | 'GitHub Project' | 'Assessment';
  }[];
  completionStatus: 'In Progress' | 'Completed' | 'Placed';
  targetRole: string;
  expectedSalaryINR: string;
  portfolioUrl?: string;
  resumeSummary?: string;
  matchScoreForTarget?: number;
}

export interface PlacementOutcome {
  id: string;
  studentName: string;
  instituteName: string;
  district: string;
  companyName: string;
  role: string;
  salaryINR: number;
  placementDate: string;
  sector: string;
  skillUtilizationRate: number; // 0 - 100%
  retentionMonths: number;
}

export interface PolicyReasoningResult {
  title: string;
  reasoningChain: string[];
  recommendations: {
    action: string;
    targetStakeholder: string;
    estimatedCostINR: string;
    expectedROI: string;
    implementationHorizon: string;
  }[];
  laborMarketForecast: string;
  curriculumModernizationMandates: string[];
  thoughtProcess?: string;
}
