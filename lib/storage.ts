import {
  INITIAL_PROGRAMS,
  INITIAL_JOBS,
  INITIAL_SKILLS,
  INITIAL_STUDENTS,
  INITIAL_PLACEMENTS,
} from './seed-data';
import {
  TrainingProgram,
  JobPosting,
  Skill,
  StudentProfile,
  PlacementOutcome,
  CurriculumAnalysis,
  UserProfile,
  UserRole,
} from './types';

// Browser Local Storage Keys
const STORAGE_KEYS = {
  PROGRAMS: 'skillbridge_programs_v1',
  JOBS: 'skillbridge_jobs_v1',
  SKILLS: 'skillbridge_skills_v1',
  STUDENTS: 'skillbridge_students_v1',
  PLACEMENTS: 'skillbridge_placements_v1',
  ANALYSES: 'skillbridge_analyses_v1',
  CURRENT_USER: 'skillbridge_auth_user_v1',
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading key ${key} from storage:`, err);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving key ${key} to storage:`, err);
  }
}

// Global Auth Subscribers
const authListeners: Array<(user: UserProfile | null) => void> = [];

export function onAuthChange(callback: (user: UserProfile | null) => void): () => void {
  authListeners.push(callback);
  // Send current state
  const currentUser = getFromStorage<UserProfile | null>(STORAGE_KEYS.CURRENT_USER, null);
  callback(currentUser);

  return () => {
    const idx = authListeners.indexOf(callback);
    if (idx !== -1) authListeners.splice(idx, 1);
  };
}

function notifyAuthListeners(user: UserProfile | null) {
  authListeners.forEach((cb) => {
    try {
      cb(user);
    } catch (e) {
      console.error('Auth listener error:', e);
    }
  });
}

// 1-Click Official GovID SSO
export async function signInWithGoogle(preferredRole: UserRole = 'government'): Promise<UserProfile> {
  const profile: UserProfile = {
    uid: `govid-${Date.now().toString(36)}`,
    email: 'dvet.director@maharashtra.gov.in',
    displayName: 'Dr. S. K. Mahajan (Director, DVET)',
    role: preferredRole,
    organization: 'Directorate of Vocational Education & Training, Government of Maharashtra',
    district: 'State-wide (Mumbai HQ)',
  };

  saveToStorage(STORAGE_KEYS.CURRENT_USER, profile);
  notifyAuthListeners(profile);
  return profile;
}

export async function signOut(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
  notifyAuthListeners(null);
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  saveToStorage(STORAGE_KEYS.CURRENT_USER, profile);
  notifyAuthListeners(profile);
}

export async function seedInitialDataIfEmpty(): Promise<void> {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.PROGRAMS)) {
    saveToStorage(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
    saveToStorage(STORAGE_KEYS.JOBS, INITIAL_JOBS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    saveToStorage(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    saveToStorage(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PLACEMENTS)) {
    saveToStorage(STORAGE_KEYS.PLACEMENTS, INITIAL_PLACEMENTS);
  }
}

// Programs (Challenge 134)
export async function getPrograms(): Promise<TrainingProgram[]> {
  return getFromStorage<TrainingProgram[]>(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
}

export async function saveProgram(prog: TrainingProgram): Promise<void> {
  const list = await getPrograms();
  const existingIndex = list.findIndex((p) => p.id === prog.id);
  let updatedList: TrainingProgram[];
  if (existingIndex >= 0) {
    updatedList = [...list];
    updatedList[existingIndex] = prog;
  } else {
    updatedList = [prog, ...list];
  }
  saveToStorage(STORAGE_KEYS.PROGRAMS, updatedList);
}

// Jobs & Requisitions
export async function getJobs(): Promise<JobPosting[]> {
  return getFromStorage<JobPosting[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS);
}

export async function saveJob(job: JobPosting): Promise<void> {
  const list = await getJobs();
  const existingIndex = list.findIndex((j) => j.id === job.id);
  let updatedList: JobPosting[];
  if (existingIndex >= 0) {
    updatedList = [...list];
    updatedList[existingIndex] = job;
  } else {
    updatedList = [job, ...list];
  }
  saveToStorage(STORAGE_KEYS.JOBS, updatedList);
}

// Skills Taxonomy
export async function getSkills(): Promise<Skill[]> {
  return getFromStorage<Skill[]>(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
}

export async function saveSkill(skill: Skill): Promise<void> {
  const list = await getSkills();
  const existingIndex = list.findIndex((s) => s.id === skill.id);
  let updatedList: Skill[];
  if (existingIndex >= 0) {
    updatedList = [...list];
    updatedList[existingIndex] = skill;
  } else {
    updatedList = [skill, ...list];
  }
  saveToStorage(STORAGE_KEYS.SKILLS, updatedList);
}

// Student Registry
export async function getStudents(): Promise<StudentProfile[]> {
  return getFromStorage<StudentProfile[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
}

export async function saveStudent(student: StudentProfile): Promise<void> {
  const list = await getStudents();
  const existingIndex = list.findIndex((s) => s.id === student.id);
  let updatedList: StudentProfile[];
  if (existingIndex >= 0) {
    updatedList = [...list];
    updatedList[existingIndex] = student;
  } else {
    updatedList = [student, ...list];
  }
  saveToStorage(STORAGE_KEYS.STUDENTS, updatedList);
}

// Placement Outcomes (Challenge 135)
export async function getPlacements(): Promise<PlacementOutcome[]> {
  return getFromStorage<PlacementOutcome[]>(STORAGE_KEYS.PLACEMENTS, INITIAL_PLACEMENTS);
}

export async function recordPlacement(placement: PlacementOutcome): Promise<void> {
  const list = await getPlacements();
  const existingIndex = list.findIndex((p) => p.id === placement.id);
  let updatedList: PlacementOutcome[];
  if (existingIndex >= 0) {
    updatedList = [...list];
    updatedList[existingIndex] = placement;
  } else {
    updatedList = [placement, ...list];
  }
  saveToStorage(STORAGE_KEYS.PLACEMENTS, updatedList);
}

// Curriculum Vision Analyses
export async function getCurriculumAnalyses(): Promise<CurriculumAnalysis[]> {
  return getFromStorage<CurriculumAnalysis[]>(STORAGE_KEYS.ANALYSES, []);
}

export async function saveCurriculumAnalysis(analysis: CurriculumAnalysis): Promise<void> {
  const list = await getCurriculumAnalyses();
  const existingIndex = list.findIndex((a) => a.id === analysis.id);
  let updatedList: CurriculumAnalysis[];
  if (existingIndex >= 0) {
    updatedList = [...list];
    updatedList[existingIndex] = analysis;
  } else {
    updatedList = [analysis, ...list];
  }
  saveToStorage(STORAGE_KEYS.ANALYSES, updatedList);
}
