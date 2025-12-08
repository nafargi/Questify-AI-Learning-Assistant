import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI study assistant. How can I help you today? 📚",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("weak") || lowerQuery.includes("struggle") || lowerQuery.includes("help")) {
      return "Based on your exam history, I see you're struggling with Database Normalization (42% accuracy) and Linear Algebra Eigenvalues (35% accuracy). Your main issue with normalization is confusing 2NF and 3NF dependency rules. I recommend using the Cornell note method to break down each normal form systematically. Would you like me to create a focused study plan?";
    }
    if (lowerQuery.includes("exam") || lowerQuery.includes("test")) {
      return "Your next recommended exam should focus on Algorithms. Based on your peak performance time (7-9 PM), I suggest scheduling it for tomorrow evening. Your recursion accuracy is 55% - you understand the concept but struggle with base cases. Want me to generate practice questions for this specific weakness?";
    }
    if (lowerQuery.includes("study") || lowerQuery.includes("plan")) {
      return "Looking at your patterns: You perform best with 45-60 minute focused sessions. Your peak hours are 7-9 PM. I recommend the Pomodoro technique for your Database chapter (it's dense), and Feynman Learning for Recursion since explaining it simply will reveal your gaps. Should I set up this schedule?";
    }
    if (lowerQuery.includes("performance") || lowerQuery.includes("score")) {
      return "Your overall average is 78%. You've improved 8% this month! Strongest areas: Cell Biology (88%), Variables & Data Types (85%). Areas needing work: Differential Equations (28%), Linear Algebra (35%). The pattern I see: you rush under time pressure, losing 23% accuracy in the last 5 minutes. Try time-boxing practice!";
    }
    return "I know your complete learning history! Ask me about your weak areas, exam recommendations, study planning, performance patterns, or any course content. I can analyze your mistakes, suggest the best note-taking methods for each topic, and create personalized study plans based on when you learn best.";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-glow",
          "flex items-center justify-center transition-all duration-300 hover:scale-110",
          "animate-pulse-slow",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <Sparkles className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-96 h-[500px] rounded-2xl overflow-hidden",
          "glass border shadow-lg flex flex-col",
          "transition-all duration-300 transform",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="p-4 gradient-primary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Questify AI</h3>
              <p className="text-xs text-primary-foreground/70">Your study assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                    message.role === "user"
                      ? "gradient-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-background/50">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" className="gradient-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
