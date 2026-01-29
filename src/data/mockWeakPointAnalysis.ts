// Mock data for weak point analysis - realistic, medium-length content
export const mockWeakPointAnalysis = {
    summary: {
        weakAreasCount: 3,
        primaryIssue: "conceptual",
        tone: "Three conceptual gaps were detected during this exam. Your understanding of core principles needs strengthening in specific areas."
    },

    questionAnalyses: [
        {
            questionId: "q1",
            questionNumber: 3,
            conceptTested: "Database Normalization - 3NF",
            difficulty: "medium",
            timeSpent: 180,
            expectedTime: 120,

            userAnswer: "A table is in 3NF if it has no transitive dependencies",
            correctAnswer: "A table is in 3NF if it's in 2NF and has no transitive dependencies",
            isCorrect: false,

            weakPointType: "partial",
            mentalStepMissed: "You identified the key characteristic of 3NF but missed the prerequisite condition. Normalization forms build on each other sequentially.",
            explanation: "Your answer shows you understand what 3NF prevents (transitive dependencies), but normalization is hierarchical. A table must satisfy 2NF before it can be considered for 3NF. This suggests you're learning the forms in isolation rather than as a progression.",

            conceptMap: {
                studentKnows: [
                    "Transitive dependencies definition",
                    "Purpose of normalization"
                ],
                unstable: [
                    "Normalization hierarchy",
                    "2NF requirements"
                ],
                missing: [
                    "Sequential relationship between normal forms",
                    "Prerequisites for each normalization level"
                ],
                prerequisites: [
                    "1NF fundamentals",
                    "Functional dependencies"
                ]
            },

            nextActions: [
                {
                    id: "action1",
                    label: "Study normalization progression",
                    type: "study",
                    targetConcept: "Normal Forms Hierarchy"
                },
                {
                    id: "action2",
                    label: "Practice 2NF → 3NF conversions",
                    type: "practice",
                    targetConcept: "Normalization Steps"
                },
                {
                    id: "action3",
                    label: "Create dependency diagram",
                    type: "notes",
                    targetConcept: "Functional Dependencies"
                }
            ]
        },
        {
            questionId: "q2",
            questionNumber: 7,
            conceptTested: "SQL JOIN Operations",
            difficulty: "hard",
            timeSpent: 95,
            expectedTime: 150,

            userAnswer: "INNER JOIN returns all rows from both tables",
            correctAnswer: "INNER JOIN returns only rows with matching values in both tables",
            isCorrect: false,

            weakPointType: "time-pressure",
            mentalStepMissed: "Under time pressure, you confused INNER JOIN with CROSS JOIN behavior. The rushed response skipped the critical 'matching' condition.",
            explanation: "You answered quickly (95s vs expected 150s), suggesting you felt confident but didn't pause to verify. This is a classic time-pressure error where familiarity with the term led to an incomplete definition. Your brain filled in 'all rows' instead of 'matching rows'.",

            conceptMap: {
                studentKnows: [
                    "JOIN syntax",
                    "Basic JOIN concept"
                ],
                unstable: [
                    "INNER JOIN vs CROSS JOIN",
                    "Matching condition importance"
                ],
                missing: [
                    "Precise JOIN type distinctions",
                    "Result set composition rules"
                ],
                prerequisites: [
                    "Set theory basics",
                    "Cartesian product concept"
                ]
            },

            nextActions: [
                {
                    id: "action4",
                    label: "Compare all JOIN types side-by-side",
                    type: "study",
                    targetConcept: "JOIN Operations"
                },
                {
                    id: "action5",
                    label: "Practice with visual JOIN diagrams",
                    type: "practice",
                    targetConcept: "JOIN Visualization"
                },
                {
                    id: "action6",
                    label: "Take untimed JOIN quiz",
                    type: "exam",
                    targetConcept: "SQL JOINs"
                }
            ]
        },
        {
            questionId: "q3",
            questionNumber: 12,
            conceptTested: "ACID Properties - Isolation",
            difficulty: "medium",
            timeSpent: 140,
            expectedTime: 120,

            userAnswer: "Isolation ensures transactions don't interfere with each other",
            correctAnswer: "Isolation ensures concurrent transactions execute as if they were serial, preventing intermediate state visibility",
            isCorrect: false,

            weakPointType: "conceptual",
            mentalStepMissed: "You grasped the general idea but missed the precise mechanism. Isolation isn't just about 'not interfering' - it's about creating the illusion of serial execution.",
            explanation: "Your answer is directionally correct but lacks the critical detail that makes isolation meaningful. The key insight is that isolation creates serializability - concurrent transactions must produce the same result as if they ran one after another. This prevents dirty reads, phantom reads, and other concurrency issues.",

            conceptMap: {
                studentKnows: [
                    "ACID acronym",
                    "General purpose of isolation"
                ],
                unstable: [
                    "Serializability concept",
                    "Concurrency control mechanisms"
                ],
                missing: [
                    "Isolation levels (Read Uncommitted, etc.)",
                    "Specific anomalies prevented",
                    "Implementation techniques (locks, MVCC)"
                ],
                prerequisites: [
                    "Transaction basics",
                    "Concurrent execution concepts"
                ]
            },

            nextActions: [
                {
                    id: "action7",
                    label: "Study isolation levels in depth",
                    type: "study",
                    targetConcept: "Transaction Isolation"
                },
                {
                    id: "action8",
                    label: "Explore concurrency anomalies",
                    type: "study",
                    targetConcept: "Dirty Reads & Phantom Reads"
                },
                {
                    id: "action9",
                    label: "Generate ACID properties exam",
                    type: "exam",
                    targetConcept: "ACID Properties"
                }
            ]
        }
    ],

    patterns: {
        repeatedConcepts: ["Database fundamentals", "Precise definitions"],
        timeRelatedWeaknesses: true,
        difficultyMismatch: "You perform well on easy questions but struggle with medium-complexity definitions that require precision",
        confidenceGap: "You answer quickly on familiar topics but miss critical details, suggesting overconfidence in partial knowledge"
    },

    learningPath: [
        {
            order: 1,
            action: "Review database normalization as a sequential process",
            reason: "Your primary gap is understanding how normal forms build on each other. Start with 1NF → 2NF → 3NF progression.",
            linkedWeaknesses: ["Normalization hierarchy", "Prerequisites"]
        },
        {
            order: 2,
            action: "Practice defining concepts with precision under no time pressure",
            reason: "Time pressure is causing you to skip critical details. Build accuracy first, then speed.",
            linkedWeaknesses: ["JOIN definitions", "ACID properties"]
        },
        {
            order: 3,
            action: "Create comparison charts for similar concepts",
            reason: "You confuse related concepts (INNER vs CROSS JOIN). Visual comparisons will strengthen distinctions.",
            linkedWeaknesses: ["JOIN types", "Isolation levels"]
        },
        {
            order: 4,
            action: "Take a focused exam on database fundamentals",
            reason: "Test your improved understanding with questions that require precise, complete definitions.",
            linkedWeaknesses: ["All detected gaps"]
        }
    ]
} as const;

export type WeakPointAnalysis = typeof mockWeakPointAnalysis;
export type QuestionAnalysis = typeof mockWeakPointAnalysis.questionAnalyses[0];
export type LearningStep = typeof mockWeakPointAnalysis.learningPath[0];
export type WeakPointActionItem = QuestionAnalysis["nextActions"][0];

