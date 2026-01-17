import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Crown,
  Sparkles,
  Zap,
  ArrowLeft,
  CreditCard,
  Shield,
  Clock,
  Star,
  Infinity,
  Brain,
  BookOpen,
  BarChart3,
  Users,
  FileText,
  Headphones,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ElementType;
  color: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for getting started with Questify",
    icon: Zap,
    color: "from-slate-500 to-gray-500",
    features: [
      "10 exams per month",
      "5 courses maximum",
      "Basic question types",
      "Standard AI insights",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    period: "month",
    description: "Unlock the full power of AI-driven learning",
    icon: Crown,
    color: "from-primary to-secondary",
    popular: true,
    features: [
      "Unlimited exams",
      "Unlimited courses",
      "All 12 question types",
      "Advanced AI analytics",
      "Deep weak point analysis",
      "Priority support",
      "Export to PDF",
      "Custom study plans",
      "Exam history & re-exam",
      "All 10 study techniques",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: 24.99,
    period: "month",
    description: "For study groups and educational institutions",
    icon: Users,
    color: "from-accent to-teal-400",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared course library",
      "Team analytics dashboard",
      "Admin controls",
      "Collaborative study rooms",
      "Dedicated support",
    ],
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Medical Student",
    content: "Questify Pro helped me score 95% on my anatomy finals. The deep weak point analysis is a game-changer!",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Computer Science Major",
    content: "The AI-powered study techniques saved me hours of ineffective studying. Worth every penny!",
    avatar: "MJ",
  },
];

export default function Billing() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleUpgrade = (planId: string) => {
    if (planId === "free") {
      toast.info("You are already on the Free plan");
      return;
    }
    setSelectedPlan(planId);
    setShowPaymentForm(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowPaymentForm(false);
    toast.success("🎉 Welcome to Questify Pro! Your account has been upgraded.", {
      description: "You now have access to all premium features.",
    });
  };

  const yearlyDiscount = 0.2; // 20% off

  return (
    <DashboardLayout title="Billing & Plans">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/settings"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Settings
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 gradient-primary">Special Offer: 20% off yearly plans</Badge>
          <h1 className="text-4xl font-bold mb-4">Choose Your Learning Path</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock your full potential with Questify Pro. Get unlimited exams, advanced AI insights, and personalized study plans.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-4 p-1.5 rounded-2xl bg-muted">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-medium transition-all",
                billingPeriod === "monthly"
                  ? "gradient-primary text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                billingPeriod === "yearly"
                  ? "gradient-primary text-white shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <Badge variant="secondary" className="text-xs bg-success/20 text-success">
                Save 20%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => {
            const price = billingPeriod === "yearly"
              ? (plan.price * 12 * (1 - yearlyDiscount))
              : plan.price;

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative overflow-hidden transition-all duration-300 hover:-translate-y-2",
                  plan.popular && "border-primary shadow-xl shadow-primary/10 scale-105"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="gradient-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br",
                      plan.color
                    )}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">
                        ${billingPeriod === "yearly" ? price.toFixed(0) : price.toFixed(2)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-muted-foreground">
                          /{billingPeriod === "yearly" ? "year" : "month"}
                        </span>
                      )}
                    </div>
                    {billingPeriod === "yearly" && plan.price > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="line-through">${(plan.price * 12).toFixed(0)}</span>
                        <span className="text-success ml-2">Save ${(plan.price * 12 * yearlyDiscount).toFixed(0)}</span>
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={cn(
                      "w-full",
                      plan.popular ? "gradient-primary" : ""
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {plan.id === "free" ? "Current Plan" : "Upgrade Now"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>Complete your payment to unlock all features</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Questify Pro</p>
                    <p className="text-sm text-muted-foreground">
                      {billingPeriod === "yearly" ? "Annual" : "Monthly"} subscription
                    </p>
                  </div>
                  <p className="text-2xl font-bold">
                    ${billingPeriod === "yearly"
                      ? (9.99 * 12 * (1 - yearlyDiscount)).toFixed(0)
                      : "9.99"}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVC</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Name on Card</Label>
                    <Input placeholder="John Doe" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPaymentForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 gradient-primary"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Comparison */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Why Upgrade to Pro?</CardTitle>
            <CardDescription className="text-center">
              See the powerful features that help students achieve their goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Infinity,
                  title: "Unlimited Exams",
                  description: "Take as many practice exams as you need. No limits, no restrictions.",
                },
                {
                  icon: Brain,
                  title: "Deep AI Analysis",
                  description: "Get comprehensive weak point analysis with explanations of why you struggle.",
                },
                {
                  icon: BookOpen,
                  title: "All Study Techniques",
                  description: "Access all 10 AI-powered study methods: Pomodoro, Feynman, and more.",
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description: "Track your progress with detailed charts and performance insights.",
                },
                {
                  icon: FileText,
                  title: "Exam History",
                  description: "Review past exams, analyze mistakes, and re-take to improve your score.",
                },
                {
                  icon: Headphones,
                  title: "Priority Support",
                  description: "Get fast, dedicated support whenever you need help.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Loved by Students Worldwide</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-lg mb-4">{testimonial.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period.",
              },
              {
                q: "Is there a student discount?",
                a: "Yes! Students with a valid .edu email get an additional 30% off. Contact our support team to apply the discount.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely.",
              },
              {
                q: "Can I switch between monthly and yearly billing?",
                a: "Absolutely! You can switch your billing cycle at any time from your account settings.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-4 rounded-xl bg-muted/30">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16 p-12 rounded-3xl gradient-primary text-white">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join thousands of students who are already achieving their academic goals with Questify Pro.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-primary font-semibold"
            onClick={() => handleUpgrade("pro")}
          >
            Get Started with Pro
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
