import { useState } from "react";
import {
  ArrowCounterClockwise,
  Check,
  X,
  CaretLeft,
  CaretRight,
  Shuffle,
  ChartBar,
  Sparkle,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { flashcards as mockFlashcards, courses } from "@/data/mockData";

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState(mockFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [unknownCards, setUnknownCards] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(false);

  const currentCard = flashcards[currentIndex];
  const progress = ((knownCards.length + unknownCards.length) / flashcards.length) * 100;
  const masteryRate = knownCards.length / (knownCards.length + unknownCards.length) * 100 || 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    setKnownCards((prev) => [...prev, currentCard.id]);
    nextCard();
  };

  const handleDontKnow = () => {
    setUnknownCards((prev) => [...prev, currentCard.id]);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIndex < flashcards.length - 1) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 200);
    } else {
      setShowStats(true);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
    setShowStats(false);
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
    setShowStats(false);
  };

  const getCourseInfo = (courseId: string) => {
    return courses.find((c) => c.id === courseId);
  };

  if (showStats) {
    return (
      <Layout>
        <div className="min-h-screen p-6 lg:p-12 max-w-2xl mx-auto flex items-center">
          <Card className="w-full rounded-3xl border-none shadow-2xl overflow-hidden animate-fade-in glass-card">
            <CardHeader className="text-center p-12 bg-primary/5 border-b">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                <ChartBar className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">Study Session Complete!</CardTitle>
              <CardDescription>You've reviewed all the flashcards in this deck</CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12 space-y-10">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{flashcards.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total</p>
                </div>
                <div className="p-4 rounded-2xl bg-success/10 text-success text-center">
                  <p className="text-2xl font-bold">{knownCards.length}</p>
                  <p className="text-xs mt-1">Mastered</p>
                </div>
                <div className="p-4 rounded-2xl bg-destructive/10 text-destructive text-center">
                  <p className="text-2xl font-bold">{unknownCards.length}</p>
                  <p className="text-xs mt-1">Need Review</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold">Mastery Rate</span>
                  <span className="text-2xl font-bold text-primary">{Math.round(masteryRate)}%</span>
                </div>
                <Progress value={masteryRate} className="h-3 rounded-full" />
              </div>

              <div className="flex gap-4">
                <Button onClick={restartSession} className="flex-1 rounded-full h-12 font-bold shadow-lg shadow-primary/20">
                  <ArrowCounterClockwise className="mr-2 w-4 h-4" />
                  Restart Session
                </Button>
                <Button onClick={shuffleCards} variant="outline" className="flex-1 rounded-full h-12 font-bold">
                  <Shuffle className="mr-2 w-4 h-4" />
                  Shuffle & Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
            <p className="text-muted-foreground mt-1">Reviewing {currentIndex + 1} of {flashcards.length} cards</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={shuffleCards} className="rounded-full px-4">
              <Shuffle className="mr-2 w-4 h-4" />
              Shuffle
            </Button>
            <Button variant="outline" size="sm" onClick={restartSession} className="rounded-full px-4 text-muted-foreground">
              <ArrowCounterClockwise className="mr-2 w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* ProgressBar */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Overall Progress</span>
            <div className="flex gap-4">
              <span className="text-success">{knownCards.length} Mastered</span>
              <span className="text-destructive">{unknownCards.length} Review</span>
            </div>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>

        {/* Card and Controls */}
        <div className="space-y-12">
          {/* Card Wrapper with Perspective */}
          <div className="relative aspect-[16/10] md:aspect-[21/9] perspective-1000 group">
            <div
              onClick={handleFlip}
              className={cn(
                "relative w-full h-full transition-all duration-500 cursor-pointer preserve-3d",
                isFlipped && "rotate-y-180"
              )}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front Side */}
              <Card className="absolute inset-0 backface-hidden rounded-3xl border shadow-xl flex flex-col overflow-hidden bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Badge variant="secondary" className="rounded-full border-none">
                    {getCourseInfo(currentCard.courseId)?.name}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full border-none",
                      currentCard.difficulty === 'easy' ? "bg-success/10 text-success" :
                        currentCard.difficulty === 'medium' ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                    )}
                  >
                    {currentCard.difficulty}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center p-8 md:p-16 text-center">
                  <h2 className="text-2xl md:text-4xl font-bold leading-tight">{currentCard.front}</h2>
                </CardContent>
                <div className="p-4 text-center text-xs font-bold text-muted-foreground bg-muted/30 border-t">
                  Click card to reveal answer
                </div>
              </Card>

              {/* Back Side */}
              <Card
                className="absolute inset-0 rounded-3xl border-2 border-primary shadow-2xl flex flex-col overflow-hidden bg-primary/5 backface-hidden"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <CardHeader className="pb-2">
                  <Badge className="w-fit rounded-full">ANSWER</Badge>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center p-8 md:p-16 text-center">
                  <h2 className="text-xl md:text-3xl font-medium leading-relaxed">{currentCard.back}</h2>
                </CardContent>
                <div className="p-4 text-center text-xs font-bold text-primary bg-primary/10 border-t">
                  Click to see question
                </div>
              </Card>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Button
              variant="ghost"
              onClick={previousCard}
              disabled={currentIndex === 0}
              className="rounded-full px-6 text-muted-foreground order-2 md:order-1"
            >
              <CaretLeft className="mr-2 w-4 h-4" />
              Previous
            </Button>

            <div className="flex gap-4 order-1 md:order-2 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={handleDontKnow}
                className="flex-1 md:flex-none h-14 rounded-2xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white font-bold px-10 transition-colors"
                disabled={!isFlipped}
              >
                <X className="mr-2 w-5 h-5" />
                Doubtful
              </Button>
              <Button
                onClick={handleKnow}
                className="flex-1 md:flex-none h-14 rounded-2xl bg-success text-success-foreground hover:bg-success/90 font-bold px-10 shadow-lg shadow-success/20 transition-all active:scale-95"
                disabled={!isFlipped}
              >
                <Check className="mr-2 w-5 h-5" />
                Know it!
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={nextCard}
              className="rounded-full px-6 text-muted-foreground order-3"
            >
              Skip
              <CaretRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Quick Navigator */}
          <div className="pt-8 border-t flex flex-wrap justify-center gap-2">
            {flashcards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsFlipped(false);
                }}
                className={cn(
                  "w-8 h-8 rounded-lg text-[10px] font-bold transition-all border",
                  currentIndex === idx ? "bg-primary text-primary-foreground border-primary scale-110 shadow-md" :
                    knownCards.includes(card.id) ? "bg-success/10 text-success border-success/20" :
                      unknownCards.includes(card.id) ? "bg-destructive/10 text-destructive border-destructive/20" :
                        "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
