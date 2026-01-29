import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useWalkthrough } from "./WalkthroughContext";
import { createPortal } from "react-dom";
import { X, CaretRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function WalkthroughTooltip() {
    const { currentStepData, nextStep, skipWalkthrough } = useWalkthrough();
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    // If there's no target ID, we don't render this tooltip (the Manager will handle the modal)
    if (!currentStepData?.targetId) return null;

    useEffect(() => {
        const updatePosition = () => {
            const target = document.getElementById(currentStepData.targetId as string);
            if (target) {
                const rect = target.getBoundingClientRect();
                setTargetRect(rect);

                // Calculate position based on preference (defaulting to right for sidebar)
                // Adding a small offset/gap
                const gap = 16;

                // Position specifically for the sidebar items which are on the left
                // We want the tooltip to be to the right of the item
                setPosition({
                    top: rect.top + (rect.height / 2) - 60, // approximate centering vertically
                    left: rect.right + gap
                });

                setIsVisible(true);

                // Scroll into view if needed
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                setIsVisible(false);
            }
        };

        updatePosition();

        // Update on resize
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [currentStepData]);

    // Highlight effect overlay using 4 divs for a perfect rectangular cutout
    const HighlightOverlay = () => {
        if (!targetRect) return null;

        return (
            <div className="fixed inset-0 z-50 pointer-events-none transition-all duration-500">
                {/* Top */}
                <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-[1px] transition-all duration-500"
                    style={{ height: targetRect.top }} />
                {/* Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-[1px] transition-all duration-500"
                    style={{ top: targetRect.bottom }} />
                {/* Left */}
                <div className="absolute left-0 bg-black/50 backdrop-blur-[1px] transition-all duration-500"
                    style={{ top: targetRect.top, height: targetRect.height, width: targetRect.left }} />
                {/* Right */}
                <div className="absolute right-0 bg-black/50 backdrop-blur-[1px] transition-all duration-500"
                    style={{ top: targetRect.top, height: targetRect.height, left: targetRect.right }} />

                {/* Glow effect ring around the target */}
                <div
                    className="absolute rounded-lg border-2 border-primary shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse"
                    style={{
                        top: targetRect.top - 4,
                        left: targetRect.left - 4,
                        width: targetRect.width + 8,
                        height: targetRect.height + 8,
                    }}
                />

                {/* Floating "Beacon" particle near the target to draw attention */}
                <div
                    className="absolute w-3 h-3 bg-primary rounded-full animate-ping"
                    style={{
                        top: targetRect.top - 1, // varied position
                        left: targetRect.right + 4,
                    }}
                />
            </div>
        );
    };

    return createPortal(
        <>
            {isVisible && <HighlightOverlay />}
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed z-[60] w-[280px]" // Reduced from 320px
                        style={{
                            top: position.top,
                            left: position.left,
                        }}
                    >
                        {/* The Tooltip Card */}
                        <div className="bg-card/95 backdrop-blur-xl text-card-foreground p-4 rounded-xl shadow-2xl border border-primary/20 relative overflow-hidden ring-1 ring-white/10">
                            {/* Decorative Background Elem */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                            <div className="relative">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-base leading-tight text-primary">
                                        {currentStepData.title}
                                    </h3>
                                    <button
                                        onClick={skipWalkthrough}
                                        className="text-muted-foreground/50 hover:text-foreground transition-colors -mr-1 -mt-1 p-1"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <p className="text-sm text-muted-foreground leading-normal mb-4 font-medium">
                                    {currentStepData.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1 items-center">
                                        <div className="h-1 w-1 rounded-full bg-primary/50" />
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                            Step {currentStepData.id === 'welcome' ? 1 : '...'}
                                        </span>
                                    </div>

                                    <Button
                                        onClick={nextStep}
                                        size="sm"
                                        className="h-7 rounded-lg px-4 text-xs font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95"
                                    >
                                        Next
                                        <CaretRight className="ml-1 w-3 h-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* Arrow pointing left to the sidebar */}
                            <div className="absolute top-[50%] -left-1.5 w-3 h-3 bg-card border-l border-b border-primary/20 transform rotate-45 -translate-y-1/2" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>,
        document.body
    );
}
