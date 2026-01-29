import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { walkthroughSteps } from "@/data/walkthroughSteps";

interface WalkthroughContextType {
    currentStepIndex: number;
    isOpen: boolean;
    isComplete: boolean;
    nextStep: () => void;
    skipWalkthrough: () => void;
    resetWalkthrough: () => void;
    currentStepData: typeof walkthroughSteps[0] | null;
}

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined);

export function WalkthroughProvider({ children }: { children: React.ReactNode }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Load state from local storage on mount
    useEffect(() => {
        const hasSeenWalkthrough = localStorage.getItem("questy-walkthrough-seen");
        if (!hasSeenWalkthrough) {
            // Delay slightly to allow app to hydrate/render
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setIsComplete(true);
        }
    }, []);

    const nextStep = useCallback(() => {
        if (currentStepIndex < walkthroughSteps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            // Finished
            setIsComplete(true);
            setIsOpen(false);
            localStorage.setItem("questy-walkthrough-seen", "true");
        }
    }, [currentStepIndex]);

    const skipWalkthrough = useCallback(() => {
        setIsOpen(false);
        setIsComplete(true);
        localStorage.setItem("questy-walkthrough-seen", "true");
    }, []);

    const resetWalkthrough = useCallback(() => {
        setCurrentStepIndex(0);
        setIsOpen(true);
        setIsComplete(false);
        localStorage.removeItem("questy-walkthrough-seen");
    }, []);

    const value = {
        currentStepIndex,
        isOpen,
        isComplete,
        nextStep,
        skipWalkthrough,
        resetWalkthrough,
        currentStepData: isOpen ? walkthroughSteps[currentStepIndex] : null,
    };

    return (
        <WalkthroughContext.Provider value={value}>
            {children}
        </WalkthroughContext.Provider>
    );
}

export const useWalkthrough = () => {
    const context = useContext(WalkthroughContext);
    if (context === undefined) {
        throw new Error("useWalkthrough must be used within a WalkthroughProvider");
    }
    return context;
};
