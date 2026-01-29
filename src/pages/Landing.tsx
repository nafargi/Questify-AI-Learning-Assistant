import { Link } from "react-router-dom";
import {
  ArrowRight, Brain, Target, BookOpen, ChatCircle, Calendar,
  CheckCircle, TrendUp, Warning, Student, GraduationCap,
  Lightning, Shapes, ChartPieSlice, Lock, Check, Sparkle
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// --- Components ---

const Section = ({
  children,
  className,
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string
}) => (
  <section id={id} className={cn("py-24 md:py-32 px-6 relative", className)}>
    {children}
  </section>
);

const SectionHeader = ({
  label,
  title,
  description,
  centered = false
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
  centered?: boolean;
}) => (
  <div className={cn("mb-16 max-w-4xl", centered && "mx-auto text-center")}>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-block mb-4"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80 border-b border-primary/20 pb-1">
        {label}
      </span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] mb-6"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn("text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl", centered && "mx-auto")}
      >
        {description}
      </motion.p>
    )}
  </div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  children
}: {
  icon: any;
  title: string;
  children: React.ReactNode
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-card border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
  >
    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-6">
      <Icon className="w-6 h-6" weight="fill" />
    </div>
    <h3 className="text-xl font-bold mb-4 tracking-tight">{title}</h3>
    <div className="text-muted-foreground leading-relaxed flex-1">
      {children}
    </div>
  </motion.div>
);

const StepItem = ({ number, title, text }: { number: string; title: string; text: string }) => (
  <div className="flex gap-6 items-start group">
    <div className="text-4xl font-black text-muted/40 group-hover:text-primary/20 transition-colors leading-none select-none">
      {number}
    </div>
    <div className="space-y-2">
      <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
        {text}
      </p>
    </div>
  </div>
);

// --- Main Page ---

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 pb-20 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border text-xs font-bold uppercase tracking-widest text-primary/80">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Questify Educational Platform
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-foreground">
              Don't just study. <br />
              <span className="text-primary italic">Engineer your mind.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              The first adaptive system designed for mastery, not memorization.
              We utilize performance-based gradients to architect your path to academic excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Button asChild size="lg" className="h-14 px-8 rounded-full text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              <Link to="/auth">Begin Your Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full text-base font-medium border-2 hover:bg-muted/50 transition-colors">
              <Link to="#philosophy">Read the Manifesto</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground/60 font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle weight="fill" /> Scientific Pedagogy
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle weight="fill" /> Private & Secure
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle weight="fill" /> University Standard
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <Section id="philosophy" className="bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="The Core Issue"
            title="The Illusion of Competence."
            description="Most studying is passive. You read, you highlight, you re-read. You feel like you know it. But when the exam comes, the information isn't there."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-xl border bg-background/50">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600 mb-2">
                <Warning size={20} weight="fill" />
              </div>
              <h4 className="text-lg font-bold">Feedback Void</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You don't know what you don't know until you get graded. That is too late.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-background/50">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 mb-2">
                <ChartPieSlice size={20} weight="fill" />
              </div>
              <h4 className="text-lg font-bold">Inefficient Volume</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Studying everything equally is a waste of time. You need to focus on the 20% you struggle with.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border bg-background/50">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 mb-2">
                <Lock size={20} weight="fill" />
              </div>
              <h4 className="text-lg font-bold">Static Testing</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Standard practice exams don't adapt. They check memory, not cognitive flexibility.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. SYSTEM OVERVIEW */}
      <Section className="border-y">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="The Methodology"
                title="The Questify Loop."
                description="A continuous cycle of assessment, analysis, and adaptation. We replace linear studying with a dynamic feedback loop."
              />
              <div className="space-y-8">
                <StepItem
                  number="01"
                  title="Ingest"
                  text="Upload your learning materials. Our engine parses conceptual structures, not just keywords."
                />
                <StepItem
                  number="02"
                  title="Calibrate"
                  text="Establish your baseline confidence. The system learns your psychological profile along with your academic one."
                />
                <StepItem
                  number="03"
                  title="Challenge"
                  text="Take adaptive exams that probe the edges of your understanding, finding the breaking points."
                />
                <StepItem
                  number="04"
                  title="Analyze & Adapt"
                  text="Receive concept-level diagnostics. Your study plan automatically reconfigures to target weak points."
                />
              </div>
            </div>

            <div className="relative aspect-square md:aspect-[4/5] bg-card rounded-2xl border shadow-2xl overflow-hidden p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-5)_0%,transparent_70%)] opacity-20" />
              {/* Abstract Flow Visualization */}
              <div className="relative w-full max-w-sm space-y-4">
                <div className="p-4 rounded-xl border bg-background shadow-sm flex items-center justify-between">
                  <span className="font-bold text-sm">Input</span>
                  <ArrowRight className="text-muted-foreground" />
                </div>
                <div className="h-16 w-0.5 bg-border mx-auto" />
                <div className="p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 text-center space-y-2">
                  <Brain className="w-8 h-8 text-primary mx-auto" weight="duotone" />
                  <div className="font-bold">Processing...</div>
                </div>
                <div className="h-16 w-0.5 bg-border mx-auto" />
                <div className="p-4 rounded-xl border bg-background shadow-sm flex items-center justify-between">
                  <span className="font-bold text-sm">Personalized Output</span>
                  <CheckCircle className="text-green-500" weight="fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. PERSONALIZATION AT THE CORE */}
      <Section className="border-b">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Confidence Engine"
            title="Intelligence that feels human."
            description="We don't just measure right or wrong. We measure certainty. This adds a third dimension to your learning profile."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={TrendUp} title="Adaptive difficulty">
              As your confidence grows, Questify introduces deeper complexity, ensuring you are always in the optimal challenge zone.
            </FeatureCard>
            <FeatureCard icon={Shapes} title="Dynamic Paths">
              The syllabus rearranges itself daily based on yesterday's performance. No two students follow the same line.
            </FeatureCard>
            <FeatureCard icon={ChartPieSlice} title="Gap Detection">
              We find the invisible holes in your knowledge base—the things you think you know, but don't.
            </FeatureCard>
            <FeatureCard icon={Lightning} title="Velocity Tracking">
              We monitor how fast you learn specific concepts to predict exam readiness with high precision.
            </FeatureCard>
          </div>
        </div>
      </Section>

      {/* 5. STUDY ROOM */}
      <Section className="bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              {/* Abstract Study Representation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-full flex items-center justify-center font-bold">1</div>
                  <span className="font-bold">Active Recall</span>
                </div>
                <div className="bg-card border p-6 rounded-2xl flex flex-col items-center text-center space-y-3 mt-8">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center font-bold">2</div>
                  <span className="font-bold">Spaced Repetition</span>
                </div>
                <div className="bg-card border p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-full flex items-center justify-center font-bold">3</div>
                  <span className="font-bold">Feynman Technique</span>
                </div>
                <div className="bg-card border p-6 rounded-2xl flex flex-col items-center text-center space-y-3 mt-8">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center font-bold">4</div>
                  <span className="font-bold">Interleaving</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionHeader
                label="The Study Room"
                title="Cognitive Protocols."
                description="Reading is not studying. Questify forces you to engage. Choose from scientifically validated methods that guarantee retention."
              />
              <ul className="space-y-6">
                <StepItem
                  number="A"
                  title="Active Recall"
                  text="The system prompts you to retrieve information from memory, strengthening neural pathways."
                />
                <StepItem
                  number="B"
                  title="The Feynman Loop"
                  text="Teach the concept back to our AI. If you can't explain it simply, you don't understand it."
                />
                <StepItem
                  number="C"
                  title="Blurting Method"
                  text="Rapid-fire dump of specific topic knowledge, assessed instantly for completeness."
                />
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. SMART EXAMS */}
      <Section>
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeader
            centered
            label="Evaluation"
            title="Assessment that teaches."
            description="Our exams are not just measuring sticks. They are learning events. Each question is crafted to test the flexibility of your understanding."
          />

          <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
            <div className="border-l-2 border-primary pl-6 space-y-2">
              <h4 className="font-bold text-lg">Adaptive Complexity</h4>
              <p className="text-muted-foreground text-sm">Questions get harder as you get them right, finding your true ceiling.</p>
            </div>
            <div className="border-l-2 border-primary pl-6 space-y-2">
              <h4 className="font-bold text-lg">Format Fluidity</h4>
              <p className="text-muted-foreground text-sm">Switch between Multiple Choice, Short Answer, and Code on the fly.</p>
            </div>
            <div className="border-l-2 border-primary pl-6 space-y-2">
              <h4 className="font-bold text-lg">Time Pressure Analysis</h4>
              <p className="text-muted-foreground text-sm">We measure hesitation. A correct answer that took too long is a weak point.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. WEAK POINT ANALYSIS */}
      <Section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Diagnosis"
                title={<span className="text-background">Surgical Precision.</span>}
                description="After every session, we provide a forensic breakdown of your performance. We don't just say 'C+'. We simulate a professor explaining exactly why you failed."
              />
              <div className="space-y-6 text-background/80">
                <p className="text-lg">
                  <strong className="text-primary-foreground">The Concept Map:</strong> visualize how your weak understanding of "Topic A" is dragging down "Topic B".
                </p>
                <p className="text-lg">
                  <strong className="text-primary-foreground">Actionable Rectification:</strong> Immediate, specific tasks to fix the error. Not "study more", but "Review page 42 and practice equation X".
                </p>
              </div>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                  <span className="font-mono opacity-70">METRIC_ID_01</span>
                  <span className="text-red-400 font-bold">CRITICAL FAILURE</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[30%] bg-red-500" />
                </div>
                <p className="text-sm leading-relaxed opacity-80">
                  Analysis: You correctly identified the <span className="text-white font-bold">symptom</span>, but failed to diagnose the <span className="text-white font-bold">root cause</span>. This indicates a memorization dependence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. NOTES & 9. AI */}
      <Section>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div className="bg-card border p-12 rounded-3xl">
            <BookOpen className="w-10 h-10 text-primary mb-6" weight="fill" />
            <h3 className="text-3xl font-bold mb-4">Living Notes.</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Static notes die in notebooks. Questify notes are dynamic. They evolve. As your understanding changes, the system suggests edits, additions, and links between concepts.
            </p>
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2"><Check className="text-primary" /> Cornell Structure</li>
              <li className="flex items-center gap-2"><Check className="text-primary" /> Auto-linking</li>
            </ul>
          </div>

          <div className="bg-card border p-12 rounded-3xl">
            <Lightning className="w-10 h-10 text-primary mb-6" weight="fill" />
            <h3 className="text-3xl font-bold mb-4">Socratic AI.</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              It doesn't give you the answer. It asks the right question. Questy AI is trained to guide you to the solution, enforcing true neural connection generation.
            </p>
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2"><Check className="text-primary" /> Context Aware</li>
              <li className="flex items-center gap-2"><Check className="text-primary" /> Patience Engine</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 10. PLANNER */}
      <Section className="border-y">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeader
            centered
            label="Logistics"
            title="It plans. You execute."
            description="Decision fatigue kills progress. Questify handles the 'what' and 'when', so you can focus entirely on the 'how'."
          />
          <div className="inline-flex flex-col md:flex-row gap-8 items-center justify-center mt-12 opacity-80">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black">Daily</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Micro-goals</span>
            </div>
            <div className="h-px w-12 md:w-px md:h-12 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black">Weekly</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Review cycles</span>
            </div>
            <div className="h-px w-12 md:w-px md:h-12 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black">Monthly</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Mastery milestones</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 11. WHO IS THIS FOR */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Who belongs here?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Student className="w-8 h-8 text-primary shrink-0" weight="fill" />
              <div>
                <h4 className="font-bold text-lg">The Academic Elite</h4>
                <p className="text-sm text-muted-foreground">Medical, Law, and Engineering students who cannot afford gaps in their knowledge.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <GraduationCap className="w-8 h-8 text-primary shrink-0" weight="fill" />
              <div>
                <h4 className="font-bold text-lg">Lifelong Scholars</h4>
                <p className="text-sm text-muted-foreground">Professionals who understand that in the information age, learning rate is the only competitive advantage.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 12. TRUST & 13. CTA */}
      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-widest opacity-50">Our Promise</h2>
            <p className="text-2xl md:text-3xl font-medium leading-relaxed">
              "We do not promise it will be easy. We promise it will be effective. Questify is built for those who respect the difficulty of true learning."
            </p>
          </div>

          <div className="pt-12">
            <Button asChild size="lg" className="h-16 px-12 text-lg rounded-full shadow-2xl">
              <Link to="/auth">Enter the System</Link>
            </Button>
            <p className="mt-8 text-sm text-muted-foreground">
              No credit card required for diagnostics.
            </p>
          </div>
        </div>
      </Section>

      <footer className="py-12 px-6 border-t text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded-md" />
          <span className="font-bold text-foreground">Questify</span>
        </div>
        <p>© 2026 Questify Intelligence Systems. Designed for Mastery.</p>
      </footer>
    </div>
  );
}
