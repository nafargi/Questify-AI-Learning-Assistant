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
  type: 'mcq' | 'true-false' | 'fill-blank' | 'matching' | 'short-answer' | 'coding' | 'debugging';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  timeEstimate: number; // in seconds
  matchingPairs?: { left: string; right: string }[];
  codeSnippet?: string;
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
  timeTaken: number; // in minutes
  weakTopics: string[];
  strongTopics: string[];
  improvement: number; // percentage change from previous
}

export interface StudySession {
  id: string;
  date: string;
  duration: number; // in minutes
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
    id: 'cs101',
    name: 'Computer Science Fundamentals',
    description: 'Core concepts in programming, algorithms, and data structures',
    icon: '💻',
    color: 'primary',
    progress: 68,
    units: [
      {
        id: 'cs101-u1',
        title: 'Introduction to Programming',
        description: 'Basic programming concepts, variables, and control flow',
        topics: ['Variables', 'Data Types', 'Control Flow', 'Functions'],
        mastery: 85,
      },
      {
        id: 'cs101-u2',
        title: 'Data Structures',
        description: 'Arrays, linked lists, stacks, queues, and trees',
        topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs'],
        mastery: 62,
      },
      {
        id: 'cs101-u3',
        title: 'Algorithms',
        description: 'Sorting, searching, and algorithm analysis',
        topics: ['Sorting', 'Searching', 'Big O Notation', 'Recursion'],
        mastery: 55,
      },
      {
        id: 'cs101-u4',
        title: 'Database Fundamentals',
        description: 'SQL, normalization, and database design',
        topics: ['SQL Basics', 'Normalization', 'Joins', 'Indexing'],
        mastery: 48,
      },
    ],
  },
  {
    id: 'math201',
    name: 'Advanced Mathematics',
    description: 'Calculus, linear algebra, and differential equations',
    icon: '📐',
    color: 'secondary',
    progress: 45,
    units: [
      {
        id: 'math201-u1',
        title: 'Calculus I',
        description: 'Limits, derivatives, and integrals',
        topics: ['Limits', 'Derivatives', 'Integrals', 'Applications'],
        mastery: 72,
      },
      {
        id: 'math201-u2',
        title: 'Linear Algebra',
        description: 'Matrices, vectors, and linear transformations',
        topics: ['Matrices', 'Vectors', 'Eigenvalues', 'Linear Transformations'],
        mastery: 38,
      },
      {
        id: 'math201-u3',
        title: 'Differential Equations',
        description: 'First and second order differential equations',
        topics: ['First Order DE', 'Second Order DE', 'Applications'],
        mastery: 25,
      },
    ],
  },
  {
    id: 'bio101',
    name: 'Biology Essentials',
    description: 'Cell biology, genetics, and evolution',
    icon: '🧬',
    color: 'accent',
    progress: 72,
    units: [
      {
        id: 'bio101-u1',
        title: 'Cell Biology',
        description: 'Cell structure, organelles, and cellular processes',
        topics: ['Cell Structure', 'Organelles', 'Cell Division', 'Metabolism'],
        mastery: 88,
      },
      {
        id: 'bio101-u2',
        title: 'Genetics',
        description: 'DNA, RNA, and inheritance patterns',
        topics: ['DNA Structure', 'RNA', 'Inheritance', 'Mutations'],
        mastery: 65,
      },
      {
        id: 'bio101-u3',
        title: 'Evolution',
        description: 'Natural selection and evolutionary theory',
        topics: ['Natural Selection', 'Speciation', 'Phylogenetics'],
        mastery: 78,
      },
    ],
  },
  {
    id: 'hist101',
    name: 'World History',
    description: 'Major historical events and civilizations',
    icon: '📜',
    color: 'warning',
    progress: 58,
    units: [
      {
        id: 'hist101-u1',
        title: 'Ancient Civilizations',
        description: 'Egypt, Greece, Rome, and early empires',
        topics: ['Egypt', 'Greece', 'Rome', 'Mesopotamia'],
        mastery: 70,
      },
      {
        id: 'hist101-u2',
        title: 'Medieval Period',
        description: 'Middle Ages, feudalism, and the Renaissance',
        topics: ['Feudalism', 'Crusades', 'Renaissance', 'Reformation'],
        mastery: 52,
      },
      {
        id: 'hist101-u3',
        title: 'Modern Era',
        description: 'Industrial revolution to present day',
        topics: ['Industrial Revolution', 'World Wars', 'Cold War', 'Globalization'],
        mastery: 45,
      },
    ],
  },
  {
    id: 'bus101',
    name: 'Business Administration',
    description: 'Management, marketing, and financial principles',
    icon: '📊',
    color: 'success',
    progress: 35,
    units: [
      {
        id: 'bus101-u1',
        title: 'Management Principles',
        description: 'Leadership, planning, and organizational behavior',
        topics: ['Leadership', 'Planning', 'Organizational Structure', 'Decision Making'],
        mastery: 42,
      },
      {
        id: 'bus101-u2',
        title: 'Marketing Fundamentals',
        description: 'Market research, branding, and consumer behavior',
        topics: ['Market Research', 'Branding', 'Consumer Behavior', 'Digital Marketing'],
        mastery: 35,
      },
      {
        id: 'bus101-u3',
        title: 'Financial Management',
        description: 'Budgeting, investment, and financial analysis',
        topics: ['Budgeting', 'Investment', 'Financial Statements', 'Risk Management'],
        mastery: 28,
      },
    ],
  },
];

// Sample Questions
export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    courseId: 'cs101',
    unitId: 'cs101-u1',
    type: 'mcq',
    difficulty: 'easy',
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: ['var x = 5;', 'variable x = 5;', 'x := 5;', 'int x = 5;'],
    correctAnswer: 'var x = 5;',
    explanation: 'In JavaScript, variables are declared using var, let, or const keywords. "var x = 5;" is the correct syntax for declaring a variable with the var keyword.',
    timeEstimate: 30,
  },
  {
    id: 'q2',
    courseId: 'cs101',
    unitId: 'cs101-u2',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is the time complexity of searching in a balanced Binary Search Tree?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 'O(log n)',
    explanation: 'In a balanced BST, the height is log(n), and we traverse from root to a leaf at most, making the search complexity O(log n).',
    timeEstimate: 45,
  },
  {
    id: 'q3',
    courseId: 'cs101',
    unitId: 'cs101-u3',
    type: 'true-false',
    difficulty: 'easy',
    question: 'Quick Sort always has a time complexity of O(n log n).',
    correctAnswer: 'false',
    explanation: 'Quick Sort has an average time complexity of O(n log n), but in the worst case (when the pivot is always the smallest or largest element), it degrades to O(n²).',
    timeEstimate: 20,
  },
  {
    id: 'q4',
    courseId: 'cs101',
    unitId: 'cs101-u4',
    type: 'fill-blank',
    difficulty: 'medium',
    question: 'The process of organizing data to minimize redundancy is called ____.',
    correctAnswer: 'normalization',
    explanation: 'Database normalization is the process of structuring a relational database to reduce data redundancy and improve data integrity.',
    timeEstimate: 25,
  },
  {
    id: 'q5',
    courseId: 'cs101',
    unitId: 'cs101-u2',
    type: 'matching',
    difficulty: 'medium',
    question: 'Match the data structure with its primary use case:',
    matchingPairs: [
      { left: 'Stack', right: 'LIFO operations' },
      { left: 'Queue', right: 'FIFO operations' },
      { left: 'Hash Table', right: 'Fast lookups' },
      { left: 'Binary Tree', right: 'Hierarchical data' },
    ],
    correctAnswer: ['Stack-LIFO operations', 'Queue-FIFO operations', 'Hash Table-Fast lookups', 'Binary Tree-Hierarchical data'],
    explanation: 'Each data structure is optimized for specific operations and use cases.',
    timeEstimate: 60,
  },
  {
    id: 'q6',
    courseId: 'cs101',
    unitId: 'cs101-u1',
    type: 'coding',
    difficulty: 'hard',
    question: 'Write a function that reverses a string without using built-in reverse methods.',
    codeSnippet: 'function reverseString(str) {\n  // Your code here\n}',
    correctAnswer: 'function reverseString(str) {\n  let reversed = "";\n  for (let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}',
    explanation: 'This solution iterates through the string from the end to the beginning, building a new reversed string.',
    timeEstimate: 180,
  },
  {
    id: 'q7',
    courseId: 'cs101',
    unitId: 'cs101-u1',
    type: 'debugging',
    difficulty: 'medium',
    question: 'Find and fix the bug in this code that should print numbers 1 to 5:',
    codeSnippet: 'for (let i = 1; i < 5; i++) {\n  console.log(i);\n}',
    correctAnswer: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
    explanation: 'The condition should be i <= 5 instead of i < 5 to include 5 in the output.',
    timeEstimate: 60,
  },
  {
    id: 'q8',
    courseId: 'math201',
    unitId: 'math201-u1',
    type: 'mcq',
    difficulty: 'medium',
    question: 'What is the derivative of f(x) = x³ + 2x² - 5x + 3?',
    options: ['3x² + 4x - 5', '3x² + 2x - 5', 'x² + 4x - 5', '3x² + 4x + 5'],
    correctAnswer: '3x² + 4x - 5',
    explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹. So d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5, and d/dx(3) = 0.',
    timeEstimate: 45,
  },
  {
    id: 'q9',
    courseId: 'bio101',
    unitId: 'bio101-u1',
    type: 'mcq',
    difficulty: 'easy',
    question: 'Which organelle is known as the "powerhouse of the cell"?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
    correctAnswer: 'Mitochondria',
    explanation: 'Mitochondria generate most of the cell\'s supply of ATP through cellular respiration, hence the nickname "powerhouse of the cell".',
    timeEstimate: 20,
  },
  {
    id: 'q10',
    courseId: 'bio101',
    unitId: 'bio101-u2',
    type: 'short-answer',
    difficulty: 'medium',
    question: 'Explain the difference between DNA and RNA in terms of structure.',
    correctAnswer: 'DNA is double-stranded with deoxyribose sugar and thymine base; RNA is single-stranded with ribose sugar and uracil instead of thymine.',
    explanation: 'The key structural differences relate to the sugar backbone and one of the nitrogenous bases.',
    timeEstimate: 90,
  },
];

// Sample Exam Results
export const examResults: ExamResult[] = [
  {
    id: 'exam1',
    courseId: 'cs101',
    courseName: 'Computer Science Fundamentals',
    date: '2024-01-15',
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    difficulty: 'medium',
    timeTaken: 35,
    weakTopics: ['Recursion', 'Big O Notation'],
    strongTopics: ['Variables', 'Control Flow', 'Arrays'],
    improvement: 8,
  },
  {
    id: 'exam2',
    courseId: 'cs101',
    courseName: 'Computer Science Fundamentals',
    date: '2024-01-10',
    score: 77,
    totalQuestions: 25,
    correctAnswers: 19,
    difficulty: 'hard',
    timeTaken: 45,
    weakTopics: ['Trees', 'Graphs', 'Normalization'],
    strongTopics: ['Linked Lists', 'Stacks'],
    improvement: -3,
  },
  {
    id: 'exam3',
    courseId: 'math201',
    courseName: 'Advanced Mathematics',
    date: '2024-01-12',
    score: 62,
    totalQuestions: 15,
    correctAnswers: 9,
    difficulty: 'hard',
    timeTaken: 50,
    weakTopics: ['Linear Algebra', 'Eigenvalues'],
    strongTopics: ['Derivatives', 'Limits'],
    improvement: 5,
  },
  {
    id: 'exam4',
    courseId: 'bio101',
    courseName: 'Biology Essentials',
    date: '2024-01-14',
    score: 92,
    totalQuestions: 30,
    correctAnswers: 28,
    difficulty: 'medium',
    timeTaken: 40,
    weakTopics: ['Mutations'],
    strongTopics: ['Cell Structure', 'DNA', 'Natural Selection'],
    improvement: 12,
  },
  {
    id: 'exam5',
    courseId: 'hist101',
    courseName: 'World History',
    date: '2024-01-08',
    score: 78,
    totalQuestions: 20,
    correctAnswers: 16,
    difficulty: 'medium',
    timeTaken: 30,
    weakTopics: ['Cold War', 'Reformation'],
    strongTopics: ['Ancient Egypt', 'World Wars'],
    improvement: 0,
  },
];

// Sample Study Sessions
export const studySessions: StudySession[] = [
  { id: 'ss1', date: '2024-01-15', duration: 45, courseId: 'cs101', type: 'exam', performance: 85 },
  { id: 'ss2', date: '2024-01-15', duration: 30, courseId: 'bio101', type: 'flashcards', performance: 78 },
  { id: 'ss3', date: '2024-01-14', duration: 60, courseId: 'math201', type: 'notes' },
  { id: 'ss4', date: '2024-01-14', duration: 40, courseId: 'cs101', type: 'review', performance: 82 },
  { id: 'ss5', date: '2024-01-13', duration: 55, courseId: 'hist101', type: 'exam', performance: 75 },
  { id: 'ss6', date: '2024-01-12', duration: 35, courseId: 'bio101', type: 'flashcards', performance: 88 },
  { id: 'ss7', date: '2024-01-11', duration: 50, courseId: 'math201', type: 'exam', performance: 62 },
];

// Sample Flashcards
export const flashcards: Flashcard[] = [
  {
    id: 'fc1',
    courseId: 'cs101',
    unitId: 'cs101-u2',
    front: 'What is the time complexity of accessing an element in an array by index?',
    back: 'O(1) - Constant time. Arrays provide direct access to elements using their index.',
    difficulty: 'easy',
    timesReviewed: 5,
    mastered: true,
    lastReviewed: '2024-01-15',
  },
  {
    id: 'fc2',
    courseId: 'cs101',
    unitId: 'cs101-u3',
    front: 'What is the difference between merge sort and quick sort?',
    back: 'Merge sort: Always O(n log n), uses extra space, stable. Quick sort: Average O(n log n), worst O(n²), in-place, not stable.',
    difficulty: 'medium',
    timesReviewed: 3,
    mastered: false,
    lastReviewed: '2024-01-14',
  },
  {
    id: 'fc3',
    courseId: 'bio101',
    unitId: 'bio101-u1',
    front: 'What is the function of the endoplasmic reticulum?',
    back: 'Rough ER: Protein synthesis and processing. Smooth ER: Lipid synthesis and detoxification.',
    difficulty: 'medium',
    timesReviewed: 4,
    mastered: true,
    lastReviewed: '2024-01-15',
  },
  {
    id: 'fc4',
    courseId: 'math201',
    unitId: 'math201-u2',
    front: 'What is an eigenvalue?',
    back: 'A scalar λ such that Av = λv for some non-zero vector v. It represents the factor by which the eigenvector is scaled during the transformation.',
    difficulty: 'hard',
    timesReviewed: 2,
    mastered: false,
    lastReviewed: '2024-01-12',
  },
];

// Sample Weak Areas
export const weakAreas: WeakArea[] = [
  {
    topic: 'Database Normalization',
    courseId: 'cs101',
    courseName: 'Computer Science',
    accuracy: 42,
    mistakePattern: 'Confusion between 2NF and 3NF requirements',
    recommendation: 'Review normalization forms with practical examples',
    timePressureImpact: 'high',
  },
  {
    topic: 'Linear Algebra - Eigenvalues',
    courseId: 'math201',
    courseName: 'Mathematics',
    accuracy: 35,
    mistakePattern: 'Calculation errors in determinant computation',
    recommendation: 'Practice more eigenvalue calculations step-by-step',
    timePressureImpact: 'medium',
  },
  {
    topic: 'Recursion',
    courseId: 'cs101',
    courseName: 'Computer Science',
    accuracy: 55,
    mistakePattern: 'Difficulty identifying base cases',
    recommendation: 'Start with simple recursive problems and trace through execution',
    timePressureImpact: 'high',
  },
  {
    topic: 'Differential Equations',
    courseId: 'math201',
    courseName: 'Mathematics',
    accuracy: 28,
    mistakePattern: 'Selecting wrong solving method for equation type',
    recommendation: 'Create a decision tree for identifying DE types',
    timePressureImpact: 'low',
  },
];

// Sample AI Insights
export const aiInsights: AIInsight[] = [
  {
    id: 'ai1',
    type: 'performance',
    title: 'Peak Performance Window Detected',
    description: 'Your best performance is between 7:00 PM - 9:00 PM. Schedule challenging topics during this window.',
    priority: 'high',
    actionable: true,
    action: 'Schedule next exam for 7:30 PM',
  },
  {
    id: 'ai2',
    type: 'behavior',
    title: 'Time Pressure Pattern',
    description: 'You tend to rush through difficult questions. Your accuracy drops 23% when time remaining is under 5 minutes.',
    priority: 'medium',
    actionable: true,
    action: 'Practice with shorter time limits',
  },
  {
    id: 'ai3',
    type: 'recommendation',
    title: 'Focus Area: Database Normalization',
    description: 'Your accuracy in this topic dropped 15% over the last 3 exams. Prioritize review before your next CS exam.',
    priority: 'high',
    actionable: true,
    action: 'Start review session',
  },
  {
    id: 'ai4',
    type: 'alert',
    title: 'Study Streak at Risk',
    description: 'You haven\'t studied in 2 days. Keep your 12-day streak alive!',
    priority: 'medium',
    actionable: true,
    action: 'Quick 15-min flashcard session',
  },
  {
    id: 'ai5',
    type: 'performance',
    title: 'Confidence vs Reality Gap',
    description: 'You rated Linear Algebra at 75% confidence but scored 38%. This topic needs more attention.',
    priority: 'high',
    actionable: true,
    action: 'Review Linear Algebra',
  },
];

// Note-taking Methods
export interface NoteMethod {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  structure: string[];
  example: string;
}

export const noteMethods: NoteMethod[] = [
  {
    id: 'cornell',
    name: 'Cornell Method',
    description: 'Systematic format for condensing and organizing notes with cues, notes, and summary sections.',
    bestFor: 'Lecture notes, summarizing large chapters, exam preparation',
    structure: ['Cue Column (left)', 'Note-Taking Area (right)', 'Summary Section (bottom)'],
    example: 'Perfect for classes that cover a lot of factual information that needs to be memorized.',
  },
  {
    id: 'zettelkasten',
    name: 'Zettelkasten',
    description: 'Interconnected note-taking system that creates a web of linked ideas and concepts.',
    bestFor: 'Research, deep conceptual understanding, connecting ideas across subjects',
    structure: ['Unique ID for each note', 'Single concept per note', 'Links to related notes', 'Tags for categorization'],
    example: 'Ideal for building a personal knowledge base over time.',
  },
  {
    id: 'outline',
    name: 'Outline Method',
    description: 'Hierarchical structure using headings, subheadings, and bullet points.',
    bestFor: 'Step-by-step processes, well-organized lectures, textbook material',
    structure: ['Main Topics (Roman numerals)', 'Subtopics (Capital letters)', 'Supporting details (Numbers)', 'Specific facts (Lowercase letters)'],
    example: 'Great for subjects with clear hierarchical relationships.',
  },
  {
    id: 'flowbased',
    name: 'Flow-Based Notes',
    description: 'Non-linear approach focusing on understanding over memorization.',
    bestFor: 'Complex topics, narrative subjects, connecting cause and effect',
    structure: ['Central idea', 'Flowing connections', 'Arrows showing relationships', 'Personal insights in margins'],
    example: 'Best for understanding how concepts relate to each other.',
  },
  {
    id: 'mindmap',
    name: 'Mind Mapping',
    description: 'Visual diagram starting from a central concept branching outward.',
    bestFor: 'Visual learners, brainstorming, overview of topics',
    structure: ['Central topic', 'Main branches', 'Sub-branches', 'Colors and images', 'Keywords only'],
    example: 'Excellent for getting a bird\'s-eye view of a subject.',
  },
];

// Student Profile
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  academicYear: string;
  enrolledCourses: string[];
  joinDate: string;
  totalStudyHours: number;
  examsCompleted: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  learningStyle: string;
  peakPerformanceTime: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
}

export const studentProfile: StudentProfile = {
  id: 'student1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatar: '',
  academicYear: '3rd Year',
  enrolledCourses: ['cs101', 'math201', 'bio101', 'hist101', 'bus101'],
  joinDate: '2023-09-01',
  totalStudyHours: 156,
  examsCompleted: 47,
  averageScore: 78,
  currentStreak: 12,
  longestStreak: 28,
  learningStyle: 'Visual-Kinesthetic',
  peakPerformanceTime: '7:00 PM - 9:00 PM',
  achievements: [
    { id: 'a1', name: 'First Steps', description: 'Complete your first exam', icon: '🎯', unlockedAt: '2023-09-02' },
    { id: 'a2', name: 'Perfect Score', description: 'Score 100% on any exam', icon: '💯', unlockedAt: '2023-10-15' },
    { id: 'a3', name: 'Week Warrior', description: '7-day study streak', icon: '🔥', unlockedAt: '2023-09-08' },
    { id: 'a4', name: 'Knowledge Seeker', description: 'Complete 50 exams', icon: '📚', progress: 94 },
    { id: 'a5', name: 'Master Student', description: 'Maintain 90%+ average for a month', icon: '🏆', progress: 65 },
    { id: 'a6', name: 'Flash Master', description: 'Master 100 flashcards', icon: '⚡', unlockedAt: '2023-11-20' },
  ],
};

// Weekly Study Plan
export interface StudyBlock {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  courseId: string;
  courseName: string;
  topic: string;
  type: 'exam' | 'review' | 'notes' | 'flashcards';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export const weeklyPlan: StudyBlock[] = [
  { id: 'sb1', day: 'Monday', startTime: '19:00', endTime: '20:00', courseId: 'cs101', courseName: 'Computer Science', topic: 'Data Structures Review', type: 'review', priority: 'high', completed: true },
  { id: 'sb2', day: 'Monday', startTime: '20:30', endTime: '21:00', courseId: 'math201', courseName: 'Mathematics', topic: 'Linear Algebra Practice', type: 'exam', priority: 'high', completed: false },
  { id: 'sb3', day: 'Tuesday', startTime: '18:00', endTime: '18:45', courseId: 'bio101', courseName: 'Biology', topic: 'Genetics Flashcards', type: 'flashcards', priority: 'medium', completed: false },
  { id: 'sb4', day: 'Tuesday', startTime: '19:00', endTime: '20:00', courseId: 'cs101', courseName: 'Computer Science', topic: 'Algorithms Exam', type: 'exam', priority: 'high', completed: false },
  { id: 'sb5', day: 'Wednesday', startTime: '17:30', endTime: '18:30', courseId: 'hist101', courseName: 'History', topic: 'Modern Era Notes', type: 'notes', priority: 'low', completed: false },
  { id: 'sb6', day: 'Thursday', startTime: '19:00', endTime: '20:30', courseId: 'math201', courseName: 'Mathematics', topic: 'Calculus Practice', type: 'exam', priority: 'medium', completed: false },
  { id: 'sb7', day: 'Friday', startTime: '16:00', endTime: '17:00', courseId: 'bus101', courseName: 'Business', topic: 'Marketing Review', type: 'review', priority: 'low', completed: false },
  { id: 'sb8', day: 'Saturday', startTime: '10:00', endTime: '11:30', courseId: 'cs101', courseName: 'Computer Science', topic: 'Full Practice Exam', type: 'exam', priority: 'high', completed: false },
  { id: 'sb9', day: 'Sunday', startTime: '14:00', endTime: '15:00', courseId: 'bio101', courseName: 'Biology', topic: 'Weekly Review', type: 'review', priority: 'medium', completed: false },
];
