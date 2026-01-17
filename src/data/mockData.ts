// Questify Mock Data - Complete Sample Dataset

export interface Course {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  units: Unit[];
  progress: number;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  topics: string[];
  mastery: number;
}

export interface Question {
  id: string;
  courseId: string;
  unitId: string;
  type: 'mcq' | 'true-false' | 'fill-blank' | 'matching' | 'coding' | 'short-answer';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[]; // For MCQ
  correctAnswer: string | string[]; // Single string or array of strings for Matching/Fill-blank/Coding
  explanation: string;
  timeEstimate: number;
  // Matching specific
  matchingPairs?: { id: string; left: string; right: string }[];
  // Fill-blank specific
  segments?: { text: string; isBlank: boolean; blankId?: string }[];
  // Coding specific
  starterCode?: string;
  language?: string;
  solution?: string;
}

export interface ExamResult {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  timeTaken: number;
  weakTopics: string[];
  strongTopics: string[];
  improvement: number;
}

export interface StudySession {
  id: string;
  date: string;
  duration: number;
  courseId: string;
  type: 'exam' | 'flashcards' | 'notes' | 'review';
  performance?: number;
}

export interface Flashcard {
  id: string;
  courseId: string;
  unitId: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  timesReviewed: number;
  mastered: boolean;
}

export interface WeakArea {
  topic: string;
  courseId: string;
  courseName: string;
  accuracy: number;
  mistakePattern: string;
  recommendation: string;
  timePressureImpact: 'low' | 'medium' | 'high';
  whyStruggling: string;
  conceptExplanation: string;
  howToFix: string;
  suggestedNoteMethods: string[];
}

export interface AIInsight {
  id: string;
  type: 'performance' | 'behavior' | 'recommendation' | 'alert';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  action?: string;
}

// Sample Courses
export const courses: Course[] = [
  {
    id: 'is-prog-101',
    name: 'Intro to Programming',
    description: 'Foundational programming logic using Python and Java',
    icon: '💻',
    color: 'primary',
    progress: 45,
    units: [
      {
        id: 'is-prog-u1',
        title: 'Variables and Data Types',
        description: 'Memory allocation, primitive types, and strings',
        topics: ['Integers', 'Floats', 'Strings', 'Boolean'],
        mastery: 85,
      },
      {
        id: 'is-prog-u2',
        title: 'Control Structures',
        description: 'Conditional logic and iterative loops',
        topics: ['If-Else', 'For Loops', 'While Loops', 'Switch Cases'],
        mastery: 62,
      }
    ],
  },
  {
    id: 'is-db-201',
    name: 'Database Systems',
    description: 'Relational database design, SQL, and NoSQL systems',
    icon: '🗄️',
    color: 'secondary',
    progress: 55,
    units: [
      {
        id: 'is-db-u1',
        title: 'Database Fundamentals',
        description: 'Relational model, SQL basics, and normalization',
        topics: ['SQL Basics', 'Normalization', 'Joins', 'ER Diagrams'],
        mastery: 48,
      },
      {
        id: 'is-db-u2',
        title: 'Advanced SQL',
        description: 'Stored procedures, triggers, and performance tuning',
        topics: ['Procedures', 'Triggers', 'Indexing', 'Query Optimization'],
        mastery: 30,
      }
    ],
  },
  {
    id: 'is-net-301',
    name: 'Computer Networking',
    description: 'OSI model, TCP/IP, routing, and network security',
    icon: '🌐',
    color: 'accent',
    progress: 30,
    units: [
      {
        id: 'is-net-u1',
        title: 'Network Protocols',
        description: 'Deep dive into HTTP, DNS, TCP, and UDP',
        topics: ['OSI Model', 'TCP/IP Stack', 'DNS', 'HTTP/S'],
        mastery: 40,
      },
      {
        id: 'is-net-u2',
        title: 'Routing and Switching',
        description: 'IP addressing, subnetting, and routing algorithms',
        topics: ['IPv4', 'Subnetting', 'BGP', 'OSPF'],
        mastery: 25,
      }
    ],
  },
  {
    id: 'is-sysadmin-401',
    name: 'System Administration',
    description: 'Managing servers, users, and enterprise environments',
    icon: '🖥️',
    color: 'warning',
    progress: 20,
    units: [
      {
        id: 'is-sys-u1',
        title: 'Linux Administration',
        description: 'Kernel management, bash scripting, and permissions',
        topics: ['Bash', 'Permissions', 'Process Management'],
        mastery: 35,
      },
      {
        id: 'is-sys-u2',
        title: 'Cloud Infrastructure',
        description: 'AWS, Azure, and virtualization technologies',
        topics: ['EC2', 'S3', 'Docker', 'Kubernetes'],
        mastery: 15,
      }
    ],
  },
  {
    id: 'is-ir-501',
    name: 'Information Retrieval',
    description: 'Search engines, indexing, and natural language processing',
    icon: '🔍',
    color: 'success',
    progress: 15,
    units: [
      {
        id: 'is-ir-u1',
        title: 'Indexing and Crawling',
        description: 'Building web crawlers and inverted indexes',
        topics: ['Crawling', 'Tokenization', 'Inverted Index'],
        mastery: 20,
      },
      {
        id: 'is-ir-u2',
        title: 'Ranking Algorithms',
        description: 'TF-IDF, PageRank, and vector space models',
        topics: ['TF-IDF', 'PageRank', 'Cosine Similarity'],
        mastery: 10,
      }
    ],
  },
];

// Enhanced Question Types
export const questionTypes = [
  { id: 'mcq', label: 'Multiple Choice', icon: '🔘', color: 'from-blue-500 to-cyan-500', description: 'Select the best answer from options' },
  { id: 'true-false', label: 'True/False', icon: '✓✗', color: 'from-green-500 to-emerald-500', description: 'Determine if statement is correct' },
  { id: 'fill-blank', label: 'Fill in Blank', icon: '📝', color: 'from-purple-500 to-pink-500', description: 'Complete the missing word/phrase' },
  { id: 'matching', label: 'Matching', icon: '🔗', color: 'from-orange-500 to-amber-500', description: 'Match related items together' },
  { id: 'short-answer', label: 'Short Answer', icon: '✏️', color: 'from-teal-500 to-cyan-500', description: 'Brief written response' },
  { id: 'coding', label: 'Coding', icon: '💻', color: 'from-indigo-500 to-purple-500', description: 'Write code to solve problem' },
];

/**
 * GENERATOR HELPER
 * Returns 95 questions for a given course material
 */
const generateQuestions = (courseId: string, materialName: string): Question[] => {
  const qs: Question[] = [];

  // 40 MCQ
  for (let i = 1; i <= 40; i++) {
    qs.push({
      id: `${courseId}-mcq-${i}`,
      courseId,
      unitId: `${courseId}-u1`,
      type: 'mcq',
      difficulty: i <= 15 ? 'easy' : i <= 30 ? 'medium' : 'hard',
      question: `Question ${i}: Which of the following is most relevant to ${materialName}?`,
      options: ['Option A', 'Correct Option B', 'Option C', 'Option D'],
      correctAnswer: 'Correct Option B',
      explanation: `Detailed explanation for MCQ ${i} in ${materialName}.`,
      timeEstimate: 30,
    });
  }

  // 20 True/False
  for (let i = 1; i <= 20; i++) {
    qs.push({
      id: `${courseId}-tf-${i}`,
      courseId,
      unitId: `${courseId}-u1`,
      type: 'true-false',
      difficulty: i <= 10 ? 'easy' : 'medium',
      question: `Statement ${i}: ${materialName} concepts are widely used in enterprise systems.`,
      correctAnswer: i % 3 === 0 ? 'false' : 'true',
      explanation: `Logic check result for TF ${i}.`,
      timeEstimate: 20,
    });
  }

  // 20 Matching
  for (let i = 1; i <= 20; i++) {
    qs.push({
      id: `${courseId}-matching-${i}`,
      courseId,
      unitId: `${courseId}-u1`,
      type: 'matching',
      difficulty: 'medium',
      question: `Match the following terms related to ${materialName} (Set ${i}):`,
      matchingPairs: [
        { id: 'm1', left: 'Term A', right: 'Definition A' },
        { id: 'm2', left: 'Term B', right: 'Definition B' },
        { id: 'm3', left: 'Term C', right: 'Definition C' },
        { id: 'm4', left: 'Term D', right: 'Definition D' },
      ],
      correctAnswer: ['m1', 'm2', 'm3', 'm4'],
      explanation: `Matches for set ${i}.`,
      timeEstimate: 120,
    });
  }

  // 10 Fill-blank
  for (let i = 1; i <= 10; i++) {
    qs.push({
      id: `${courseId}-fill-${i}`,
      courseId,
      unitId: `${courseId}-u1`,
      type: 'fill-blank',
      difficulty: 'medium',
      question: `Complete the sentence for ${materialName} (Set ${i}):`,
      segments: [
        { text: 'In the context of ', isBlank: false },
        { text: '', isBlank: true, blankId: 'b1' },
        { text: ', it is important to understand ', isBlank: false },
        { text: '', isBlank: true, blankId: 'b2' },
        { text: ' for optimal performance.', isBlank: false }
      ],
      correctAnswer: ['optimization', 'efficiency'],
      explanation: `Keywords identified for set ${i}.`,
      timeEstimate: 60,
    });
  }

  // 5 Coding
  for (let i = 1; i <= 5; i++) {
    qs.push({
      id: `${courseId}-coding-${i}`,
      courseId,
      unitId: `${courseId}-u1`,
      type: 'coding',
      difficulty: 'hard',
      question: `Write a code snippet to solve the following problem in ${materialName} context (Task ${i}):`,
      language: courseId.includes('db') ? 'sql' : 'javascript',
      starterCode: courseId.includes('db') ? '-- SQL here\n' : 'function solve() {\n  // your code\n}',
      solution: courseId.includes('db') ? 'SELECT * FROM data;' : 'return true;',
      correctAnswer: courseId.includes('db') ? 'SELECT * FROM data;' : 'return true;',
      explanation: `Solution for coding task ${i}.`,
      timeEstimate: 300,
    });
  }

  return qs;
};

// Sample Questions expanded to 95 per primary material
export const sampleQuestions: Question[] = [
  ...generateQuestions('is-db-201', 'Database Systems'),
  ...generateQuestions('is-prog-101', 'Intro to Programming'),
  ...generateQuestions('is-net-301', 'Computer Networking'),
  ...generateQuestions('is-sysadmin-401', 'System Administration'),
  ...generateQuestions('is-ir-501', 'Information Retrieval'),
];

// Sample Exam Results
export const examResults: ExamResult[] = [
  { id: 'exam1', courseId: 'is-prog-101', courseName: 'Intro to Programming', date: '2024-01-15', score: 85, totalQuestions: 20, correctAnswers: 17, difficulty: 'medium', timeTaken: 35, weakTopics: ['Recursion'], strongTopics: ['Variables'], improvement: 8 },
  { id: 'exam2', courseId: 'is-db-201', courseName: 'Database Systems', date: '2024-01-14', score: 92, totalQuestions: 30, correctAnswers: 28, difficulty: 'medium', timeTaken: 40, weakTopics: ['Normalization'], strongTopics: ['SQL Basics'], improvement: 12 },
];

export const studySessions: StudySession[] = [
  { id: 'ss1', date: '2024-01-15', duration: 45, courseId: 'is-prog-101', type: 'exam', performance: 85 },
  { id: 'ss2', date: '2024-01-14', duration: 60, courseId: 'is-db-201', type: 'notes' },
];

export const flashcards: Flashcard[] = [
  { id: 'fc1', courseId: 'is-prog-101', unitId: 'u1', front: 'Complexity of array access?', back: 'O(1)', difficulty: 'easy', timesReviewed: 5, mastered: true },
];

export const weakAreas: WeakArea[] = [
  { topic: 'Database Normalization', courseId: 'is-db-201', courseName: 'Database Systems', accuracy: 42, mistakePattern: '2NF vs 3NF', recommendation: 'Review normal forms', timePressureImpact: 'high', whyStruggling: 'Dependency confusion', conceptExplanation: 'Organizing data to reduce redundancy.', howToFix: 'Practice with tables.', suggestedNoteMethods: ['cornell'] },
];

export const aiInsights: AIInsight[] = [
  { id: 'ai1', type: 'performance', title: 'Peak Window Detected', description: 'Best performance 7PM-9PM.', priority: 'high', actionable: true, action: 'Schedule exam' },
];

export interface NoteMethod {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  structure: string[];
  example: string;
  icon: string;
  color: string;
  layout: 'cornell' | 'mindmap' | 'outline' | 'flow' | 'boxing' | 'charting' | 'sentence' | 'zettelkasten' | 'feynman' | 'sketchnote';
}

export const noteMethods: NoteMethod[] = [
  { id: 'cornell', name: 'Cornell Method', description: 'Two-column format with cues/notes.', bestFor: 'Lectures', structure: ['Cue', 'Notes', 'Summary'], example: 'Standard fact capture.', icon: '📋', color: 'from-blue-500 to-indigo-500', layout: 'cornell' },
  { id: 'mindmap', name: 'Mind Mapping', description: 'Visual branching diagram.', bestFor: 'Visual learners', structure: ['Center', 'Branch', 'Sub-branch'], example: 'Relationship mapping.', icon: '🧠', color: 'from-purple-500 to-pink-500', layout: 'mindmap' },
  { id: 'outline', name: 'Outline Method', description: 'Hierarchical headings/bullets.', bestFor: 'Organized content', structure: ['Title', 'Heading', 'Bullet'], example: 'Step-by-step logic.', icon: '📑', color: 'from-green-500 to-teal-500', layout: 'outline' },
  { id: 'flowchart', name: 'Flow Chart', description: 'Visual process flow.', bestFor: 'Algorithms', structure: ['Start', 'Process', 'End'], example: 'Logic sequencing.', icon: '🔄', color: 'from-cyan-500 to-blue-500', layout: 'flow' },
  { id: 'boxing', name: 'Boxing Method', description: 'Grouped concepts in boxes.', bestFor: 'Comparing topics', structure: ['Box A', 'Box B'], example: 'Categorical separation.', icon: '📦', color: 'from-orange-500 to-amber-500', layout: 'boxing' },
  { id: 'charting', name: 'Charting Method', description: 'Table format comparisons.', bestFor: 'Facts/Categories', structure: ['Columns', 'Rows'], example: 'Feature comparison.', icon: '📊', color: 'from-rose-500 to-red-500', layout: 'charting' },
  { id: 'sentence', name: 'Sentence Method', description: 'One fact per line.', bestFor: 'Fast lectures', structure: ['Sent 1', 'Sent 2'], example: 'Rapid capture.', icon: '📝', color: 'from-slate-500 to-gray-500', layout: 'sentence' },
  { id: 'zettelkasten', name: 'Zettelkasten', description: 'Atomic linked nodes.', bestFor: 'Knowledge web', structure: ['Atomic Note', 'Link'], example: 'Research network.', icon: '🔗', color: 'from-violet-500 to-purple-500', layout: 'zettelkasten' },
  { id: 'feynman', name: 'Feynman Technique', description: 'Simple teaching method.', bestFor: 'Mastery', structure: ['Explain', 'Teach'], example: 'Plain language mastery.', icon: '💡', color: 'from-yellow-500 to-orange-500', layout: 'feynman' },
  { id: 'sketchnote', name: 'Sketchnotes', description: 'Text + Visual art.', bestFor: 'Creative learners', structure: ['Draw', 'Icon', 'Text'], example: 'Visual memory aid.', icon: '🎨', color: 'from-pink-500 to-rose-500', layout: 'sketchnote' },
];

export interface Achievement { id: string; name: string; description: string; icon: string; unlockedAt?: string; progress?: number; }
export interface StudentProfile { id: string; name: string; email: string; avatar: string; academicYear: string; enrolledCourses: string[]; joinDate: string; totalStudyHours: number; examsCompleted: number; averageScore: number; currentStreak: number; longestStreak: number; learningStyle: string; peakPerformanceTime: string; achievements: Achievement[]; }

export const studentProfile: StudentProfile = {
  id: 'student1', name: 'Alex Johnson', email: 'alex@uni.edu', avatar: '', academicYear: '3rd Year', enrolledCourses: ['is-db-201', 'is-prog-101'], joinDate: '2023-09-01', totalStudyHours: 156, examsCompleted: 47, averageScore: 78, currentStreak: 12, longestStreak: 28, learningStyle: 'Visual', peakPerformanceTime: '7PM-9PM',
  achievements: [{ id: 'a1', name: 'First steps', description: 'Done', icon: '🎯', unlockedAt: '2023-09-02' }],
};

export interface StudyBlock { id: string; day: string; startTime: string; endTime: string; courseId: string; courseName: string; topic: string; type: 'exam' | 'review' | 'notes' | 'flashcards'; priority: 'low' | 'medium' | 'high'; completed: boolean; }
export const weeklyPlan: StudyBlock[] = [
  { id: 'sb1', day: 'Monday', startTime: '19:00', endTime: '20:00', courseId: 'is-db-201', courseName: 'Database Systems', topic: 'SQL', type: 'review', priority: 'high', completed: true },
];

export const performanceData = [{ day: 'Mon', score: 65, exams: 2 }, { day: 'Tue', score: 72, exams: 3 }, { day: 'Wed', score: 68, exams: 1 }, { day: 'Thu', score: 85, exams: 4 }, { day: 'Fri', score: 78, exams: 2 }, { day: 'Sat', score: 82, exams: 3 }, { day: 'Sun', score: 88, exams: 2 }];
export const subjectPerformance = [{ subject: 'Database Systems', score: 78, color: 'hsl(var(--primary))' }, { subject: 'Programming', score: 62, color: 'hsl(var(--secondary))' }];
export const monthlyProgress = [{ month: 'Jan', completed: 12, target: 15 }, { month: 'Feb', completed: 18, target: 15 }];
