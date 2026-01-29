
export interface WalkthroughStep {
    id: string;
    title: string;
    description: string;
    targetId?: string; // Optional because "Welcome" and "Completion" are modals
    position?: "right" | "bottom" | "top" | "left";
}

export const walkthroughSteps: WalkthroughStep[] = [
    {
        id: "welcome",
        title: "Welcome to Questify",
        description: "Your adaptive learning journey starts here. This system tailors itself to how you learn best.",
        // No targetId -> Render as Center Modal
    },
    {
        id: "upload",
        title: "Upload Materials",
        description: "Start by adding your study materials here. We accept PDFs, Docs, and more.",
        targetId: "nav-upload",
        position: "right"
    },
    {
        id: "confidence",
        title: "Confidence Baseline",
        description: "We'll ask for your confidence levels to tailor your initial exams and study sessions.",
        targetId: "nav-upload", // Still pointing to upload as it's part of that flow
        position: "right"
    },
    {
        id: "study-room",
        title: "Study Room",
        description: "Engage with your content using active learning methods, not just passive reading.",
        targetId: "nav-study-room",
        position: "right"
    },
    {
        id: "exam-room",
        title: "Smart Exam",
        description: "Take exams that adapt to your performance. We challenge you where you need it most.",
        targetId: "nav-exam",
        position: "right"
    },
    {
        id: "weak-point",
        title: "Weak Point Analysis",
        description: "After every exam, see exactly where your understanding breaks down.",
        targetId: "nav-exam-history",
        position: "right"
    },
    {
        id: "notes",
        title: "Smart Notes",
        description: "Generate focused, AI-curated notes based on your unique learning style.",
        targetId: "nav-notes",
        position: "right"
    },
    {
        id: "planner",
        title: "Dynamic Planner",
        description: "Your study schedule automatically adjusts as your performance improves.",
        targetId: "nav-planner",
        position: "right"
    },
    {
        id: "questy-ai",
        title: "Questy AI",
        description: "Stuck? Ask Questy. It knows your progress and can explain any concept instantly.",
        targetId: "nav-questy-chat",
        position: "right"
    },
    {
        id: "completion",
        title: "You're Ready",
        description: "That's it! You can start learning at your own pace. We'll be here to guide you.",
        // No targetId -> Render as Center Modal
    }
];
