import { Link } from "react-router-dom";
import { ArrowRight, Brain, Target, BarChart3, Sparkles, CheckCircle2, BookOpen, MessageSquare, Calendar, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const features = [
  {
    icon: Target,
    title: "Smart Exam Engine",
    description: "Fully customizable exams with difficulty-aware questions. Time-based weakness detection focuses on diagnosis, not just scores.",
    details: ["Adaptive difficulty", "Time tracking", "Concept mapping"],
  },
  {
    icon: Brain,
    title: "Weakness Intelligence",
    description: "Laser-focused breakdown of weak concepts. One-click actions to exam or study any topic instantly.",
    details: ["Gap analysis", "Targeted practice", "Progress tracking"],
  },
  {
    icon: BookOpen,
    title: "Notes That Actually Teach",
    description: "Notes generated using proven learning techniques. Built specifically around your weak areas, not generic summaries.",
    details: ["Cornell, Zettelkasten", "Concept-based", "Active recall"],
  },
  {
    icon: Zap,
    title: "Study Room",
    description: "Multiple study techniques including Pomodoro, Feynman, and more. Designed for deep focus and retention.",
    details: ["Guided sessions", "Multi-technique", "Focus mode"],
  },
  {
    icon: MessageSquare,
    title: "Questy AI Tutor",
    description: "AI that understands your history, confidence, and progress. A contextual academic mentor, not a generic chat.",
    details: ["Context-aware", "Progress-linked", "Personalized"],
  },
  {
    icon: Calendar,
    title: "Adaptive Planner",
    description: "Study plans based on performance. Automatically adjusts as you improve and identifies what needs attention.",
    details: ["Auto-scheduling", "Performance-based", "Smart reminders"],
  },
];

const testimonials = [
  {
    name: "Sara M.",
    role: "University Student, Biology",
    content: "I never realized exactly what I didn't know until Questify tested me. Now I focus only on what matters, and my scores have improved dramatically.",
    avatar: "SM",
  },
  {
    name: "James L.",
    role: "Medical School, Year 2",
    content: "The weakness detection is incredible. It showed me I was spending 60% of my time on topics I already knew. Complete game changer.",
    avatar: "JL",
  },
  {
    name: "Priya K.",
    role: "Computer Science Major",
    content: "The AI-generated notes using Cornell method transformed how I study algorithms. I'm retaining so much more and actually understanding the concepts.",
    avatar: "PK",
  },
  {
    name: "David R.",
    role: "Law Student, Final Year",
    content: "Study Room with Pomodoro and Feynman techniques helped me prepare for bar exam. The structured approach made complex cases manageable.",
    avatar: "DR",
  },
];

const process = [
  {
    step: "01",
    title: "Upload",
    description: "Drop your study materials — PDFs, slides, notes.",
  },
  {
    step: "02",
    title: "Assess",
    description: "Set your confidence. Take an adaptive exam.",
  },
  {
    step: "03",
    title: "Diagnose",
    description: "AI detects weak points using accuracy + time.",
  },
  {
    step: "04",
    title: "Master",
    description: "Dive into targeted exams, notes, and techniques.",
  },
];

export default function Landing() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/50 text-sm text-muted-foreground mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            AI-Orchestrated Learning Intelligence
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Questify doesn't teach.</span>
            <br />
            <span className="text-muted-foreground">It diagnoses why you don't understand.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Upload your material. Set your confidence. Take an adaptive exam. 
            <span className="text-foreground"> Questify detects your weak points </span>
            using accuracy and time — then adapts everything around you.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="h-12 px-8 text-base font-medium">
              <Link to="/dashboard">
                Start Learning with Clarity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-12 px-8 text-base text-muted-foreground hover:text-foreground">
              <Link to="#how-it-works">
                See how it works
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Trust line */}
          <p className="text-sm text-muted-foreground mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Trusted by 50,000+ students at top universities
          </p>
        </div>
      </section>

      {/* How It Works - Process */}
      <section id="how-it-works" className="py-24 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              From confusion to clarity in four steps
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {process.map((item, index) => (
              <div key={item.step} className="relative group">
                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
                )}
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-border bg-card text-sm font-semibold text-foreground mb-4 group-hover:border-primary group-hover:text-primary transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-muted/30 border-y border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Why Questify</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                An AI-orchestrated learning system, not a chatbot
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Most study tools give you flashcards and hope for the best. Questify is different. 
                It builds a complete understanding of what you know, what you don't, and exactly 
                what you need to do next.
              </p>
              
              <div className="space-y-4">
                {[
                  "Detects weak points using accuracy + response time",
                  "Generates targeted exams on specific concepts",
                  "Creates notes using proven learning techniques",
                  "Adapts study plans based on your actual progress",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual representation */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                {/* Mock AI insight */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Weakness Detected</p>
                    <p className="text-xs text-muted-foreground">Based on your last 3 exams</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                    <span className="text-sm font-medium">Database Normalization</span>
                    <span className="text-xs text-destructive font-medium">42% accuracy</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/10">
                    <span className="text-sm font-medium">SQL Joins</span>
                    <span className="text-xs text-warning font-medium">58% accuracy</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/10">
                    <span className="text-sm font-medium">Entity Relationships</span>
                    <span className="text-xs text-success font-medium">91% accuracy</span>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  Focus on Database Normalization
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Built for how learning actually works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border border-border/60 bg-card hover:border-border hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.details.map((detail) => (
                    <span key={detail} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30 border-y border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Students who found their weak points
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-xl border border-border/60 bg-card"
              >
                <p className="text-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            Stop studying blindly.
            <br />
            <span className="text-muted-foreground">Start learning with clarity.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Questify understands what you don't know — and builds everything around getting you there.
          </p>
          <Button asChild size="lg" className="h-12 px-10 text-base font-medium">
            <Link to="/dashboard">
              Begin Your Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-8 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Questify. Built for students who want to understand, not just memorize.
          </p>
        </div>
      </section>
    </Layout>
  );
}
