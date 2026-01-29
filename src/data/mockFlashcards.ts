export interface Flashcard {
    id: string;
    question: string;
    answer: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    box: 1 | 2 | 3 | 4 | 5; // For Leitner
    nextReview?: Date; // For Spaced Repetition
    lastReview?: Date;
}

export const MOCK_FLASHCARDS: Flashcard[] = [
    {
        id: '1',
        question: "What is the difference between 'let' and 'var' in JavaScript?",
        answer: "'let' is block-scoped, while 'var' is function-scoped. 'let' also does not allow re-declaration in the same scope, whereas 'var' does.",
        topic: "JavaScript",
        difficulty: 'Easy',
        box: 1
    },
    {
        id: '2',
        question: "Explain the concept of 'Hoisting'.",
        answer: "Hoisting is JavaScript's default behavior of moving declarations to the top. Variables defined with var are hoisted and initialized with undefined. let and const are hoisted but remain in the Temporal Dead Zone.",
        topic: "JavaScript",
        difficulty: 'Medium',
        box: 2
    },
    {
        id: '3',
        question: "What is a Closure?",
        answer: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).",
        topic: "JavaScript",
        difficulty: 'Hard',
        box: 3
    },
    {
        id: '4',
        question: "What does ACID stand for in databases?",
        answer: "Atomicity, Consistency, Isolation, Durability.",
        topic: "Databases",
        difficulty: 'Medium',
        box: 1
    },
    {
        id: '5',
        question: "Explain 3NF (Third Normal Form).",
        answer: "A table is in 3NF if it is in 2NF and has no transitive dependencies (non-key attributes depend only on the primary key).",
        topic: "Databases",
        difficulty: 'Hard',
        box: 1
    }
];
