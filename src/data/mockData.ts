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
  type: 'mcq' | 'true-false' | 'fill-blank' | 'matching' | 'short-answer' | 'coding' | 'debugging' | 'essay' | 'ordering' | 'diagram' | 'case-study' | 'calculation';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  timeEstimate: number;
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

// Enhanced Question Types
export const questionTypes = [
  { id: 'mcq', label: 'Multiple Choice', icon: '🔘', color: 'from-blue-500 to-cyan-500', description: 'Select the best answer from options' },
  { id: 'true-false', label: 'True/False', icon: '✓✗', color: 'from-green-500 to-emerald-500', description: 'Determine if statement is correct' },
  { id: 'fill-blank', label: 'Fill in Blank', icon: '📝', color: 'from-purple-500 to-pink-500', description: 'Complete the missing word/phrase' },
  { id: 'matching', label: 'Matching', icon: '🔗', color: 'from-orange-500 to-amber-500', description: 'Match related items together' },
  { id: 'short-answer', label: 'Short Answer', icon: '✏️', color: 'from-teal-500 to-cyan-500', description: 'Brief written response' },
  { id: 'coding', label: 'Coding', icon: '💻', color: 'from-indigo-500 to-purple-500', description: 'Write code to solve problem' },
  { id: 'debugging', label: 'Debugging', icon: '🔧', color: 'from-red-500 to-rose-500', description: 'Find and fix code errors' },
  { id: 'essay', label: 'Essay', icon: '📄', color: 'from-slate-500 to-gray-500', description: 'Extended written response' },
  { id: 'ordering', label: 'Ordering', icon: '📋', color: 'from-violet-500 to-purple-500', description: 'Arrange items in sequence' },
  { id: 'diagram', label: 'Diagram Label', icon: '🏷️', color: 'from-pink-500 to-rose-500', description: 'Label parts of a diagram' },
  { id: 'case-study', label: 'Case Study', icon: '📊', color: 'from-yellow-500 to-orange-500', description: 'Analyze real-world scenario' },
  { id: 'calculation', label: 'Calculation', icon: '🔢', color: 'from-cyan-500 to-blue-500', description: 'Solve mathematical problems' },
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
    explanation: 'In JavaScript, variables are declared using var, let, or const keywords.',
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
    explanation: 'In a balanced BST, the height is log(n), making the search complexity O(log n).',
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
    explanation: 'Quick Sort has an average time complexity of O(n log n), but worst case is O(n²).',
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
    explanation: 'Database normalization reduces data redundancy and improves data integrity.',
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
    explanation: 'Each data structure is optimized for specific operations.',
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
    explanation: 'This solution iterates through the string from the end to the beginning.',
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
    explanation: 'The condition should be i <= 5 instead of i < 5 to include 5.',
    timeEstimate: 60,
  },
  {
    id: 'q8',
    courseId: 'math201',
    unitId: 'math201-u1',
    type: 'calculation',
    difficulty: 'medium',
    question: 'Calculate the derivative of f(x) = x³ + 2x² - 5x + 3',
    correctAnswer: '3x² + 4x - 5',
    explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹.',
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
    explanation: 'Mitochondria generate most of the cell\'s supply of ATP.',
    timeEstimate: 20,
  },
  {
    id: 'q10',
    courseId: 'bio101',
    unitId: 'bio101-u2',
    type: 'short-answer',
    difficulty: 'medium',
    question: 'Explain the difference between DNA and RNA in terms of structure.',
    correctAnswer: 'DNA is double-stranded with deoxyribose sugar and thymine; RNA is single-stranded with ribose sugar and uracil.',
    explanation: 'Key structural differences relate to the sugar backbone and nitrogenous bases.',
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
    back: 'A scalar λ such that Av = λv for some non-zero vector v.',
    difficulty: 'hard',
    timesReviewed: 2,
    mastered: false,
    lastReviewed: '2024-01-12',
  },
];

// Enhanced Weak Areas with deep explanations
export const weakAreas: WeakArea[] = [
  {
    topic: 'Database Normalization',
    courseId: 'cs101',
    courseName: 'Computer Science',
    accuracy: 42,
    mistakePattern: 'Confusion between 2NF and 3NF requirements',
    recommendation: 'Review normalization forms with practical examples',
    timePressureImpact: 'high',
    whyStruggling: 'You tend to confuse the dependency rules between different normal forms. Specifically, you struggle to identify transitive dependencies which are key to understanding 3NF.',
    conceptExplanation: 'Normalization is about organizing data to reduce redundancy. 1NF eliminates repeating groups, 2NF removes partial dependencies, and 3NF removes transitive dependencies. The key insight is understanding that each higher form builds upon the previous one.',
    howToFix: 'Start by practicing with simple tables. Draw dependency diagrams for each table. Ask yourself: "Does any non-key column depend on another non-key column?" If yes, it violates 3NF.',
    suggestedNoteMethods: ['cornell', 'flowchart', 'outline'],
  },
  {
    topic: 'Linear Algebra - Eigenvalues',
    courseId: 'math201',
    courseName: 'Mathematics',
    accuracy: 35,
    mistakePattern: 'Calculation errors in determinant computation',
    recommendation: 'Practice more eigenvalue calculations step-by-step',
    timePressureImpact: 'medium',
    whyStruggling: 'Eigenvalue problems require multiple steps: setting up the characteristic equation, computing determinants, and solving polynomial equations. You often make arithmetic errors in the determinant step.',
    conceptExplanation: 'Eigenvalues tell us how a linear transformation scales vectors along certain directions. The equation det(A - λI) = 0 gives us the characteristic polynomial, whose roots are the eigenvalues.',
    howToFix: 'Break the problem into clear steps: 1) Write A - λI, 2) Compute determinant carefully, 3) Solve the polynomial. Practice determinants separately before combining with eigenvalue problems.',
    suggestedNoteMethods: ['cornell', 'charting', 'calculation-steps'],
  },
  {
    topic: 'Recursion',
    courseId: 'cs101',
    courseName: 'Computer Science',
    accuracy: 55,
    mistakePattern: 'Difficulty identifying base cases',
    recommendation: 'Start with simple recursive problems and trace through execution',
    timePressureImpact: 'high',
    whyStruggling: 'You understand the concept of recursion but struggle to identify when to stop (base case). This leads to infinite loops or incorrect termination conditions in your solutions.',
    conceptExplanation: 'Every recursive function needs: 1) A base case that stops recursion, 2) A recursive case that breaks the problem into smaller subproblems, 3) Progress toward the base case with each call.',
    howToFix: 'For every recursive problem, first ask: "What is the simplest version of this problem I can solve directly?" That is your base case. Then figure out how to reduce any larger problem to a smaller one.',
    suggestedNoteMethods: ['mindmap', 'flowchart', 'outline'],
  },
  {
    topic: 'Differential Equations',
    courseId: 'math201',
    courseName: 'Mathematics',
    accuracy: 28,
    mistakePattern: 'Selecting wrong solving method for equation type',
    recommendation: 'Create a decision tree for identifying DE types',
    timePressureImpact: 'low',
    whyStruggling: 'There are many methods for solving DEs (separation of variables, integrating factors, substitution), and you struggle to identify which method fits which equation type.',
    conceptExplanation: 'Different DE forms require different approaches. Separable equations can be rearranged to isolate x and y. First-order linear equations use integrating factors. Homogeneous equations use substitution.',
    howToFix: 'Create a flowchart: Is it separable? → Use separation. Is it first-order linear? → Use integrating factor. Is it homogeneous? → Use y = vx substitution. Practice identifying types before solving.',
    suggestedNoteMethods: ['flowchart', 'charting', 'cornell'],
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

// Enhanced Note-taking Methods (10 methods)
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
  {
    id: 'cornell',
    name: 'Cornell Method',
    description: 'Two-column format with cues, notes, and summary sections for effective review.',
    bestFor: 'Lectures, textbook reading, exam preparation',
    structure: ['Cue Column (left)', 'Note-Taking Area (right)', 'Summary Section (bottom)'],
    example: 'Perfect for classes with dense factual information.',
    icon: '📋',
    color: 'from-blue-500 to-indigo-500',
    layout: 'cornell',
  },
  {
    id: 'mindmap',
    name: 'Mind Mapping',
    description: 'Visual diagram with central topic branching into related subtopics hierarchically.',
    bestFor: 'Visual learners, brainstorming, topic overviews',
    structure: ['Central Topic', 'Main Branches', 'Sub-branches', 'Colors & Keywords'],
    example: 'Excellent for seeing the big picture and relationships.',
    icon: '🧠',
    color: 'from-purple-500 to-pink-500',
    layout: 'mindmap',
  },
  {
    id: 'outline',
    name: 'Outline Method',
    description: 'Hierarchical structure using headings, subheadings, and bullet points.',
    bestFor: 'Well-organized content, step-by-step processes',
    structure: ['Main Topics (I, II)', 'Subtopics (A, B)', 'Details (1, 2)', 'Examples (a, b)'],
    example: 'Great for logical, structured subjects.',
    icon: '📑',
    color: 'from-green-500 to-teal-500',
    layout: 'outline',
  },
  {
    id: 'flowchart',
    name: 'Flow Chart Notes',
    description: 'Visual flow showing processes, decisions, and outcomes with arrows.',
    bestFor: 'Processes, algorithms, cause-effect relationships',
    structure: ['Start/End nodes', 'Process boxes', 'Decision diamonds', 'Arrows & connections'],
    example: 'Ideal for understanding sequences and logic.',
    icon: '🔄',
    color: 'from-cyan-500 to-blue-500',
    layout: 'flow',
  },
  {
    id: 'boxing',
    name: 'Boxing Method',
    description: 'Information grouped in boxes by topic for clear visual separation.',
    bestFor: 'Comparing topics, separating concepts',
    structure: ['Topic Boxes', 'Grouped Information', 'Visual Separation', 'Color Coding'],
    example: 'Perfect for subjects with distinct categories.',
    icon: '📦',
    color: 'from-orange-500 to-amber-500',
    layout: 'boxing',
  },
  {
    id: 'charting',
    name: 'Charting Method',
    description: 'Table format organizing information into rows and columns for comparison.',
    bestFor: 'Comparing multiple items, facts with categories',
    structure: ['Column Headers', 'Row Categories', 'Data Cells', 'Comparison Points'],
    example: 'Best for subjects requiring comparison.',
    icon: '📊',
    color: 'from-rose-500 to-red-500',
    layout: 'charting',
  },
  {
    id: 'sentence',
    name: 'Sentence Method',
    description: 'Each new fact or topic written as a numbered sentence on a new line.',
    bestFor: 'Fast-paced lectures, detailed information',
    structure: ['Numbered Sentences', 'One idea per line', 'Sequential order', 'Quick capture'],
    example: 'Good for rapid note-taking during lectures.',
    icon: '📝',
    color: 'from-slate-500 to-gray-500',
    layout: 'sentence',
  },
  {
    id: 'zettelkasten',
    name: 'Zettelkasten',
    description: 'Interconnected atomic notes creating a web of linked knowledge.',
    bestFor: 'Research, deep learning, knowledge building',
    structure: ['Unique IDs', 'Single concept per note', 'Links to related notes', 'Tags'],
    example: 'Ideal for building a personal knowledge base.',
    icon: '🔗',
    color: 'from-violet-500 to-purple-500',
    layout: 'zettelkasten',
  },
  {
    id: 'feynman',
    name: 'Feynman Technique',
    description: 'Explain concepts in simple terms as if teaching a child.',
    bestFor: 'Deep understanding, identifying knowledge gaps',
    structure: ['Concept Name', 'Simple Explanation', 'Gaps Identified', 'Refined Explanation'],
    example: 'Best for truly mastering difficult concepts.',
    icon: '💡',
    color: 'from-yellow-500 to-orange-500',
    layout: 'feynman',
  },
  {
    id: 'sketchnote',
    name: 'Sketchnotes',
    description: 'Visual notes combining text, drawings, and symbols for memorable learning.',
    bestFor: 'Visual/creative learners, memorable notes',
    structure: ['Text + Drawings', 'Icons & Symbols', 'Visual Hierarchy', 'Color Emphasis'],
    example: 'Great for making notes memorable and engaging.',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    layout: 'sketchnote',
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

// Dashboard chart data
export const performanceData = [
  { day: 'Mon', score: 65, exams: 2 },
  { day: 'Tue', score: 72, exams: 3 },
  { day: 'Wed', score: 68, exams: 1 },
  { day: 'Thu', score: 85, exams: 4 },
  { day: 'Fri', score: 78, exams: 2 },
  { day: 'Sat', score: 82, exams: 3 },
  { day: 'Sun', score: 88, exams: 2 },
];

export const subjectPerformance = [
  { subject: 'Computer Science', score: 78, color: 'hsl(var(--primary))' },
  { subject: 'Mathematics', score: 62, color: 'hsl(var(--secondary))' },
  { subject: 'Biology', score: 85, color: 'hsl(var(--accent))' },
  { subject: 'History', score: 72, color: 'hsl(var(--warning))' },
  { subject: 'Business', score: 58, color: 'hsl(var(--success))' },
];

export const monthlyProgress = [
  { month: 'Jan', completed: 12, target: 15 },
  { month: 'Feb', completed: 18, target: 15 },
  { month: 'Mar', completed: 14, target: 15 },
  { month: 'Apr', completed: 20, target: 15 },
  { month: 'May', completed: 16, target: 15 },
  { month: 'Jun', completed: 22, target: 15 },
];
