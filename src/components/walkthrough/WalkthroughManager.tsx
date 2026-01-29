import { useWalkthrough } from "./WalkthroughContext";
import { WalkthroughTooltip } from "./WalkthroughTooltip";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkle, CheckCircle, CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export function WalkthroughManager() {
    const { currentStepData, isOpen, nextStep, skipWalkthrough, isComplete } = useWalkthrough();

    if (!isOpen || isComplete || !currentStepData) return null;

    // Render centered modal for steps without a target (Welcome / Completion)
    if (!currentStepData.targetId) {
        return (
            <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="max-w-md w-full"
                >
                    <div className="bg-card border rounded-3xl shadow-2xl overflow-hidden relative">
                        {/* Background design */}
                        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
                        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />

                        <div className="p-8 relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25 mb-6 mx-auto">
                                {currentStepData.id === 'welcome' ? (
                                    <Sparkle className="w-8 h-8" weight="fill" />
                                ) : (
                                    <CheckCircle className="w-8 h-8" weight="fill" />
                                )}
                            </div>

                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-black tracking-tight">{currentStepData.title}</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {currentStepData.description}
                                </p>

                                <div className="pt-8 flex flex-col gap-3">
                                    <Button
                                        size="lg"
                                        className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                                        onClick={() => {
                                            if (currentStepData.id === 'completion') {
                                                skipWalkthrough(); // effectively close
                                            } else {
                                                nextStep();
                                            }
                                        }}
                                    >
                                        {currentStepData.id === 'welcome' ? "Let's Get Started" : "Start Learning"}
                                        <CaretRight className="ml-2 w-5 h-5" />
                                    </Button>

                                    {currentStepData.id === 'welcome' && (
                                        <Button
                                            variant="ghost"
                                            className="text-muted-foreground hover:text-foreground"
                                            onClick={skipWalkthrough}
                                        >
                                            Skip Introduction
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Otherwise, render the tooltip
    return <WalkthroughTooltip />;
}
