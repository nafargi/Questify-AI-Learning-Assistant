import { useState } from "react";
import {
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="min-h-screen p-6 lg:p-8 max-w-2xl mx-auto flex items-center">
          <Card className="w-full animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Session Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-muted">
                  <div className="text-3xl font-bold">{flashcards.length}</div>
                  <p className="text-sm text-muted-foreground">Total Cards</p>
                </div>
                <div className="p-4 rounded-xl bg-success/10">
                  <div className="text-3xl font-bold text-success">{knownCards.length}</div>
                  <p className="text-sm text-muted-foreground">Knew It</p>
                </div>
                <div className="p-4 rounded-xl bg-destructive/10">
                  <div className="text-3xl font-bold text-destructive">{unknownCards.length}</div>
                  <p className="text-sm text-muted-foreground">Need Review</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mastery Rate</span>
                  <span className="font-medium">{Math.round(masteryRate)}%</span>
                </div>
                <Progress value={masteryRate} className="h-3" />
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={restartSession} className="gradient-primary">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Study Again
                </Button>
                <Button onClick={shuffleCards} variant="outline">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Shuffle & Restart
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Dashboard
                  </a>
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
      <div className="min-h-screen p-6 lg:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Flashcards</h1>
            <p className="text-muted-foreground">
              Card {currentIndex + 1} of {flashcards.length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={shuffleCards}>
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={restartSession}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span>
              <span className="text-success">{knownCards.length} known</span>
              {" • "}
              <span className="text-destructive">{unknownCards.length} review</span>
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div className="mb-8 perspective-1000">
          <div
            onClick={handleFlip}
            className={cn(
              "relative w-full aspect-[3/2] cursor-pointer transition-transform duration-500 transform-style-preserve-3d",
              isFlipped && "rotate-y-180"
            )}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <Card
              className={cn(
                "absolute inset-0 backface-hidden flex flex-col",
                isFlipped && "invisible"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {getCourseInfo(currentCard.courseId)?.icon}{" "}
                    {getCourseInfo(currentCard.courseId)?.name}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      currentCard.difficulty === "easy"
                        ? "border-success text-success"
                        : currentCard.difficulty === "medium"
                        ? "border-warning text-warning"
                        : "border-destructive text-destructive"
                    )}
                  >
                    {currentCard.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-8">
                <p className="text-xl text-center font-medium">{currentCard.front}</p>
              </CardContent>
              <div className="p-4 text-center text-sm text-muted-foreground border-t">
                Click to reveal answer
              </div>
            </Card>

            {/* Back */}
            <Card
              className={cn(
                "absolute inset-0 flex flex-col gradient-primary text-primary-foreground",
                !isFlipped && "invisible"
              )}
              style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            >
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit bg-primary-foreground/20 text-primary-foreground">
                  Answer
                </Badge>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-8">
                <p className="text-lg text-center">{currentCard.back}</p>
              </CardContent>
              <div className="p-4 text-center text-sm text-primary-foreground/70 border-t border-primary-foreground/20">
                Click to flip back
              </div>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousCard}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleDontKnow}
            >
              <X className="w-5 h-5 mr-2" />
              Don't Know
            </Button>
            <Button
              size="lg"
              className="bg-success hover:bg-success/90 text-success-foreground"
              onClick={handleKnow}
            >
              <Check className="w-5 h-5 mr-2" />
              Know It
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={nextCard}
            disabled={currentIndex === flashcards.length - 1}
          >
            Skip
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Card Navigator */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {flashcards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsFlipped(false);
                }}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-medium transition-all",
                  currentIndex === index
                    ? "gradient-primary text-primary-foreground"
                    : knownCards.includes(card.id)
                    ? "bg-success/10 text-success border border-success/20"
                    : unknownCards.includes(card.id)
                    ? "bg-destructive/10 text-destructive border border-destructive/20"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
