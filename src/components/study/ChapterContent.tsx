import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BookOpen, Lightbulb, AlertCircle, CheckCircle2, Quote, Code, ListOrdered, GraduationCap, ArrowRight, Target, Brain, HelpCircle, Clock, Sparkles } from "lucide-react";

export interface ChapterSection {
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
  keyConcepts?: string[];
  exampleBox?: { title: string; content: string };
}

export interface ChapterStructure {
  introduction: string;
  learningObjectives: string[];
  sections: ChapterSection[];
  caseStudy?: {
    title: string;
    content: string;
    discussionQuestions: string[];
  };
  summary: string;
  practiceProblems: string[];
}

interface ChapterContentProps {
  title: string;
  courseName?: string;
  readingProgress?: number;
  content?: ChapterStructure;
  isLoading?: boolean;
}

export function ChapterContent({ title, courseName, readingProgress = 0, content, isLoading }: ChapterContentProps) {
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse p-4">
        <div className="h-10 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="space-y-4 pt-8">
          <div className="h-8 bg-muted rounded w-1/2" />
          <div className="h-32 bg-muted rounded w-full" />
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none pb-20">
      {/* Chapter Header */}
      <div className="mb-12 pb-8 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            <GraduationCap className="w-4 h-4 mr-2" />
            {courseName || "Academic Course"}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm">Chapter Draft</Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-base">Comprehensive Study Material</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="text-base">~45-60 min read</span>
          </div>
          {readingProgress > 0 && (
            <div className="flex items-center gap-3 bg-muted/50 px-4 py-1.5 rounded-full border border-border/50">
              <span className="text-sm font-bold text-primary">{readingProgress}% Read</span>
              <Progress value={readingProgress} className="w-24 h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Learning Objectives */}
      {content.learningObjectives && content.learningObjectives.length > 0 && (
        <Card className="mb-12 border-l-4 border-l-primary bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">After completing this chapter, you will be able to:</p>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-none p-0 m-0">
              {content.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Introduction */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-1 bg-primary rounded-full" />
          <h2 className="text-3xl font-bold m-0 text-foreground tracking-tight">Introduction</h2>
        </div>
        <div className="text-foreground/90 leading-relaxed text-xl first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
          {content.introduction}
        </div>
      </section>

      {/* Main Sections */}
      {content.sections.map((section, idx) => (
        <section key={idx} className="mb-16 scroll-mt-20">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-black text-primary/20 tabular-nums">{(idx + 1).toString().padStart(2, '0')}</span>
            <h2 className="text-3xl font-extrabold m-0 text-foreground tracking-tight border-b-2 border-primary/10 pb-2 w-full">
              {section.title}
            </h2>
          </div>

          <div className="text-foreground/90 leading-relaxed space-y-6 text-lg whitespace-pre-wrap">
            {section.content}
          </div>

          {/* Subsections */}
          {section.subsections && section.subsections.length > 0 && (
            <div className="mt-10 space-y-10 pl-6 border-l-2 border-border/50">
              {section.subsections.map((sub, sIdx) => (
                <div key={sIdx} className="scroll-mt-20">
                  <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <span className="text-primary/40 text-sm font-mono">{(idx + 1)}.{sIdx + 1}</span>
                    {sub.title}
                  </h3>
                  <div className="text-foreground/85 leading-relaxed text-lg whitespace-pre-wrap">
                    {sub.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Key Concepts & Example Boxes within section */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 not-prose">
            {section.keyConcepts && section.keyConcepts.length > 0 && (
              <div className="p-6 rounded-2xl bg-muted/40 border border-border shadow-sm">
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  Key Terminology
                </h4>
                <div className="flex flex-wrap gap-2">
                  {section.keyConcepts.map((concept, cIdx) => (
                    <Badge key={cIdx} variant="secondary" className="bg-background border-border/50 hover:bg-muted transition-colors">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {section.exampleBox && (
              <Card className="border-2 border-success/20 bg-success/5 shadow-sm">
                <CardHeader className="py-4">
                  <CardTitle className="text-base flex items-center gap-2 text-success-foreground">
                    <Sparkles className="w-4 h-4 text-success" />
                    {section.exampleBox.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-0 pb-4 text-sm leading-relaxed text-foreground/80">
                  {section.exampleBox.content}
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      ))}

      {/* Case Study */}
      {content.caseStudy && (
        <section className="mb-16">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl p-8 border border-indigo-500/20 shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-foreground flex items-center gap-3">
              <span className="p-2 rounded-xl bg-indigo-500 text-white">
                <Brain className="w-6 h-6" />
              </span>
              Detailed Case Study: {content.caseStudy.title}
            </h2>
            <div className="text-foreground/90 leading-relaxed text-lg mb-8 whitespace-pre-wrap">
              {content.caseStudy.content}
            </div>

            {content.caseStudy.discussionQuestions && content.caseStudy.discussionQuestions.length > 0 && (
              <div className="bg-background/60 p-6 rounded-2xl border border-indigo-500/10">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Critical Thinking Questions
                </h4>
                <ul className="space-y-3 m-0 p-0 list-none">
                  {content.caseStudy.discussionQuestions.map((q, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/80 font-medium italic">
                      <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-indigo-500" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Summary */}
      <section className="mb-16 bg-muted/20 rounded-3xl p-10 border border-border">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Chapter Summary</h2>
        <div className="text-foreground/90 leading-relaxed text-lg italic">
          "{content.summary}"
        </div>
      </section>

      {/* Practice Problems */}
      {content.practiceProblems && content.practiceProblems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
            <ListOrdered className="w-7 h-7 text-primary" />
            Theoretical & Applied Problems
          </h2>
          <div className="grid gap-4">
            {content.practiceProblems.map((problem, i) => (
              <Card key={i} className="hover:border-primary/30 transition-colors bg-background/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary border border-primary/20">
                      {i + 1}
                    </span>
                    <p className="text-foreground/90 text-lg m-0 font-medium leading-normal">{problem}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

