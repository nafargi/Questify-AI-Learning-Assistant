import { Link } from "react-router-dom";
import { ArrowRight, Brain, FileText, Target, BarChart3, Clock, Sparkles, CheckCircle2, Star, Play, Zap, Users, BookOpen, Award, ChevronRight, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Exams",
    description: "Generate personalized exams from your course materials with adaptive difficulty.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Smart Notes",
    description: "Transform materials into structured notes using Cornell, Zettelkasten, and more.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Weak Area Detection",
    description: "Identify knowledge gaps with detailed analytics and targeted recommendations.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track progress with comprehensive dashboards showing trends and insights.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Study Methods",
    description: "10+ AI-powered techniques: Pomodoro, Feynman, Spaced Repetition, and more.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Sparkles,
    title: "AI Study Assistant",
    description: "Chat with your personal AI tutor for explanations and study guidance.",
    gradient: "from-pink-500 to-rose-500",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Materials",
    description: "Drop your PDFs, slides, or documents. Our AI analyzes and extracts key concepts instantly.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Choose Method",
    description: "Select from 10+ study techniques tailored to your learning style and goals.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Master Content",
    description: "Take personalized exams, review AI notes, and watch your mastery grow.",
    icon: Award,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Medical Student",
    avatar: "SC",
    content: "Questify helped me identify my weak areas in anatomy that I didn't even know existed. My exam scores improved by 25% in just one month!",
    rating: 5,
    improvement: "+25%",
  },
  {
    name: "Marcus Johnson",
    role: "CS Major",
    avatar: "MJ",
    content: "The adaptive exams are incredible. It feels like having a personal tutor who knows exactly what I need to practice.",
    rating: 5,
    improvement: "+32%",
  },
  {
    name: "Emily Rodriguez",
    role: "Law Student",
    avatar: "ER",
    content: "The AI-generated notes using the Cornell method transformed how I study case law. I'm retaining so much more information.",
    rating: 5,
    improvement: "+28%",
  },
];

const stats = [
  { value: "50K+", label: "Active Students", icon: Users },
  { value: "2M+", label: "Exams Generated", icon: Brain },
  { value: "94%", label: "Improvement Rate", icon: TrendingUp },
  { value: "4.9/5", label: "User Rating", icon: Star },
];

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export default function Landing() {
  return (
    <Layout>
      {/* Hero Section - Full viewport with stunning visuals */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-accent/15 blur-[80px] animate-float" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Learning Platform</span>
                <Badge variant="secondary" className="ml-2 text-xs">NEW</Badge>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Study Smarter,
                <span className="block mt-2">
                  <span className="gradient-text">Not Harder</span>
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
                Transform your learning with AI that understands your weaknesses, generates personalized exams, and guides you to mastery.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-all text-lg px-8 py-7 shadow-glow group">
                  <Link to="/dashboard">
                    Start Learning Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-7 group">
                  <Link to="#demo">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex -space-x-3">
                  {["SC", "MJ", "ER", "AK", "JP"].map((initials, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold gradient-primary text-primary-foreground"
                      style={{ zIndex: 5 - i }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">50,000+ students trust Questify</span>
                </div>
              </div>
            </div>

            {/* Right - Product Preview */}
            <div className="relative animate-fade-in hidden lg:block" style={{ animationDelay: "0.4s" }}>
              <div className="relative">
                {/* Main dashboard preview */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
                  <div className="h-8 bg-muted/50 flex items-center gap-2 px-4">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                        <p className="text-2xl font-bold text-green-600">92%</p>
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                        <p className="text-2xl font-bold text-blue-600">14</p>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                        <p className="text-2xl font-bold text-purple-600">48h</p>
                        <p className="text-xs text-muted-foreground">Study Time</p>
                      </div>
                    </div>
                    
                    {/* AI Insight card */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-sm">AI Insight</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Focus on Database Normalization - you've scored below 50% on this topic.</p>
                    </div>

                    {/* Progress chart placeholder */}
                    <div className="h-32 rounded-xl bg-muted/30 flex items-end justify-around p-4 gap-2">
                      {[65, 78, 72, 85, 88, 92, 89].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 rounded-t-md gradient-primary opacity-80"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-6 -right-6 p-4 rounded-xl bg-card border shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Exam Complete!</p>
                      <p className="text-xs text-muted-foreground">Score: 95%</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-6 p-4 rounded-xl bg-card border shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">+15% Improvement</p>
                      <p className="text-xs text-muted-foreground">This week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <MousePointer className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center group">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Three Steps to <span className="gradient-text">Mastery</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your study routine with our AI-powered learning system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                <Card className="h-full hover-lift border-0 bg-gradient-to-b from-card to-muted/30 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    {/* Step number with icon */}
                    <div className="relative mx-auto mb-6">
                      <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                        <step.icon className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center font-bold text-sm">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-24 -right-4 z-10">
                    <ChevronRight className="w-8 h-8 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Excel</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools designed to maximize your learning potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group hover-lift border-0 bg-card overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                    feature.gradient
                  )}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section id="demo" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">See It In Action</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Personal <span className="gradient-text">AI Tutor</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience intelligent learning that adapts to your unique needs. Our AI analyzes your performance, identifies weak areas, and creates a personalized study path.
              </p>
              
              <div className="space-y-4">
                {[
                  "Instant weak area detection with deep explanations",
                  "10+ note-taking methods with AI generation",
                  "Adaptive exam difficulty based on performance",
                  "Real-time progress tracking and insights",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="mt-8 gradient-primary">
                <Link to="/dashboard">
                  Try It Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card p-6">
                {/* AI Chat simulation */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-4 rounded-2xl bg-primary/10 flex-1">
                      <p className="text-sm">Based on your recent exam, I noticed you're struggling with <strong>Database Normalization</strong>. Would you like me to explain the 3 Normal Forms with examples?</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="p-4 rounded-2xl bg-muted max-w-[80%]">
                      <p className="text-sm">Yes, please explain with simple examples!</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-4 rounded-2xl bg-primary/10 flex-1">
                      <p className="text-sm mb-3">Great! Let's break it down:</p>
                      <div className="space-y-2 text-sm">
                        <p><strong>1NF:</strong> Each cell contains a single value (no lists)</p>
                        <p><strong>2NF:</strong> All non-key columns depend on the entire primary key</p>
                        <p><strong>3NF:</strong> No transitive dependencies between columns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text">Students</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who transformed their learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="hover-lift border-0 bg-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-warning">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <Badge className="bg-success/20 text-success border-0">
                      {testimonial.improvement} score
                    </Badge>
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="gradient-text">Learning?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 50,000+ students who are already studying smarter with AI-powered insights.
          </p>

          <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-all text-lg px-10 py-7 shadow-glow">
            <Link to="/dashboard">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-muted-foreground">
            {["No credit card required", "Free forever plan", "Cancel anytime"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">Questify</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Questify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
