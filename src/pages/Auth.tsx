import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "email":
        if (!email) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!password) {
          newErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
          newErrors.password = "Password must be at least 8 characters";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (isSignUp && password !== confirmPassword) {
          newErrors.confirmPassword = "Passwords don't match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "name":
        if (isSignUp && !name.trim()) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const fields = isSignUp ? ["name", "email", "password", "confirmPassword"] : ["email", "password"];
    let isValid = true;

    fields.forEach(field => {
      setTouched(prev => ({ ...prev, [field]: true }));
      if (!validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);

    toast({
      title: isSignUp ? "Account created" : "Welcome back",
      description: isSignUp
        ? "Your learning journey begins now."
        : "Let's continue where you left off.",
    });

    navigate("/dashboard");
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setTouched({});
    setPassword("");
    setConfirmPassword("");
  };

  const getInputState = (field: string) => {
    if (!touched[field]) return "default";
    if (errors[field]) return "error";
    return "success";
  };

  const inputStateClasses = (field: string) => {
    const state = getInputState(field);
    switch (state) {
      case "error":
        return "border-destructive focus-visible:ring-destructive/30";
      case "success":
        return "border-success focus-visible:ring-success/30";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding & Trust */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 neural-pattern" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-float" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Quest<span className="gradient-text">ify</span>
            </span>
          </Link>

          {/* Main Message */}
          <div className="space-y-8 max-w-md">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight leading-tight">
                Learning that{" "}
                <span className="gradient-text">understands</span>{" "}
                you
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Questify analyzes how you learn, identifies your weak points,
                and adapts every exam, note, and study session to your unique needs.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm">AI-Powered Diagnosis</p>
                  <p className="text-sm text-muted-foreground">
                    Understand exactly what you don't know
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Adaptive Learning</p>
                  <p className="text-sm text-muted-foreground">
                    Content that evolves with your progress
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Private & Secure</p>
                  <p className="text-sm text-muted-foreground">
                    Your learning data belongs only to you
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground italic">
              "The only way to master something is to know exactly where you're weak."
            </p>
            <p className="text-xs text-muted-foreground/60">
              — The Philosophy Behind Questify
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Quest<span className="gradient-text">ify</span>
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {isSignUp ? "Begin your journey" : "Welcome back"}
              </h2>
              <p className="text-muted-foreground">
                {isSignUp
                  ? "Create your account to start learning with clarity"
                  : "Sign in to continue your personalized learning path"
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field (Sign Up Only) */}
              {isSignUp && (
                <div className="space-y-2 animate-slide-down">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`h-12 px-4 transition-all duration-200 ${inputStateClasses("name")}`}
                  />
                  {touched.name && errors.name && (
                    <div className="flex items-center gap-1.5 text-destructive text-sm animate-slide-down">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`h-12 px-4 pr-10 transition-all duration-200 ${inputStateClasses("email")}`}
                  />
                  {touched.email && !errors.email && email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success animate-scale-in" />
                  )}
                </div>
                {touched.email && errors.email && (
                  <div className="flex items-center gap-1.5 text-destructive text-sm animate-slide-down">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isSignUp ? "Create a secure password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
                    className={`h-12 px-4 pr-12 transition-all duration-200 ${inputStateClasses("password")}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <div className="flex items-center gap-1.5 text-destructive text-sm animate-slide-down">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.password}</span>
                  </div>
                )}
                {isSignUp && !errors.password && (
                  <p className="text-xs text-muted-foreground">
                    Use 8+ characters for a secure password
                  </p>
                )}
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {isSignUp && (
                <div className="space-y-2 animate-slide-down">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                    className={`h-12 px-4 transition-all duration-200 ${inputStateClasses("confirmPassword")}`}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="flex items-center gap-1.5 text-destructive text-sm animate-slide-down">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Forgot Password (Sign In Only) */}
              {!isSignUp && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 gradient-primary text-primary-foreground font-medium text-base shadow-glow hover:shadow-lg transition-all duration-300 group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isSignUp ? "Create account" : "Sign in"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              {/* Privacy Notice */}
              <p className="text-xs text-center text-muted-foreground leading-relaxed">
                {isSignUp ? (
                  <>
                    By creating an account, you agree to our{" "}
                    <button type="button" className="text-primary hover:underline">Terms</button>
                    {" "}and{" "}
                    <button type="button" className="text-primary hover:underline">Privacy Policy</button>.
                  </>
                ) : (
                  <>
                    Your learning data is encrypted and private.{" "}
                    <button type="button" className="text-primary hover:underline">Learn more</button>
                  </>
                )}
              </p>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground">
                  {isSignUp ? "Already have an account?" : "New to Questify?"}
                </span>
              </div>
            </div>

            {/* Toggle Mode Button */}
            <Button
              type="button"
              variant="outline"
              onClick={toggleMode}
              className="w-full h-12 font-medium text-base border hover:bg-muted/50 transition-all duration-300"
            >
              {isSignUp ? "Sign in instead" : "Create an account"}
            </Button>

            {/* Mobile Trust Badge */}
            <div className="lg:hidden flex items-center justify-center gap-2 pt-4">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Secure, private, and built for serious learners
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
