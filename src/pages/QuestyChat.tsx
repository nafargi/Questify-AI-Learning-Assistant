import React, { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Plus,
  PaperPlaneRight,
  ChatCircle,
  Sparkle,
  BookOpen,
  Brain,
  Target,
  TrendUp,
  Trash,
  DotsThree,
  Clock,
  GraduationCap,
  Microphone,
  Paperclip,
  CaretRight,
  User,
  Robot
} from '@phosphor-icons/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

const suggestedPrompts = [
  {
    icon: BookOpen,
    title: "Explain Concept",
    prompt: "Can you explain the concept of photosynthesis in simple terms?",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: Brain,
    title: "Study Strategy",
    prompt: "What's the best way to study for my calculus exam next week?",
    color: "bg-violet-500/10 text-violet-500"
  },
  {
    icon: Target,
    title: "Improve Weakness",
    prompt: "I'm struggling with quadratic equations. How can I improve?",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    icon: TrendUp,
    title: "Track Progress",
    prompt: "Based on my recent exams, what topics should I focus on?",
    color: "bg-emerald-500/10 text-emerald-500"
  }
];

const initialChatHistory: ChatSession[] = [
  {
    id: '1',
    title: 'Calculus Integration Mastery',
    lastMessage: 'Thanks! That explanation really helped me understand...',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    messages: [
      { id: '1', role: 'user', content: 'Can you help me understand integration by parts?', timestamp: new Date(Date.now() - 1000 * 60 * 35) },
      { id: '2', role: 'assistant', content: 'Of course! Integration by parts is a technique based on the product rule for differentiation. The formula is:\n\n∫u dv = uv - ∫v du\n\nHere\'s how to apply it:\n\n1. **Choose u and dv**: Pick u as the function that becomes simpler when differentiated, and dv as the remaining part.\n\n2. **Apply LIATE rule**: When choosing u, prioritize in this order:\n   - Logarithmic functions\n   - Inverse trig functions\n   - Algebraic functions\n   - Trigonometric functions\n   - Exponential functions\n\nWould you like me to work through more examples with you?', timestamp: new Date(Date.now() - 1000 * 60 * 32) }
    ]
  },
  {
    id: '2',
    title: 'Physics Force Vectors',
    lastMessage: 'I\'ll try those practice problems now...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messages: []
  }
];

const QuestyChat = () => {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(initialChatHistory);
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const createNewChat = () => {
    setActiveChat(null);
    setMessages([]);
  };

  const selectChat = (chat: ChatSession) => {
    setActiveChat(chat);
    setMessages(chat.messages);
  };

  const deleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(c => c.id !== chatId));
    if (activeChat?.id === chatId) createNewChat();
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('exam')) return `Based on your recent exam performance, I've analyzed your patterns:\n\n**Your Strengths:**\n- Algebra (87% accuracy)\n- Biology Concepts\n\n**Areas to Focus:**\n- Calculus (62% accuracy)\n- Physics force diagrams\n\nWould you like me to set up a study plan?`;
    if (lowerMessage.includes('study')) return `I recommend a 45-minute deep focus session using the Pomodoro technique for your weak concepts. Should I start the timer?`;
    return `I am processing your inquiry using your uploaded material and performance metrics. \n\nBased on your history, I recommend focusing on the fundamental principles before diving into specific formulas. What part of the concept feels most confusing right now?`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };

      const updatedMessages = [...newMessages, aiResponse];
      setMessages(updatedMessages);
      setIsTyping(false);

      if (activeChat) {
        setChatHistory(prev => prev.map(c =>
          c.id === activeChat.id ? { ...c, messages: updatedMessages, lastMessage: inputValue, timestamp: new Date() } : c
        ));
      } else {
        const newChat: ChatSession = {
          id: Date.now().toString(),
          title: inputValue.slice(0, 30),
          lastMessage: inputValue,
          timestamp: new Date(),
          messages: updatedMessages
        };
        setChatHistory(prev => [newChat, ...prev]);
        setActiveChat(newChat);
      }
    }, 1500);
  };

  return (
    <DashboardLayout title="Questy AI Partner">
      <div className="flex h-[calc(100vh-120px)] gap-6 p-4">

        {/* --- SIDEBAR: CHAT HISTORY --- */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-4">
          <Button
            onClick={createNewChat}
            className="w-full h-11 bg-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-lg shadow-primary/20 font-bold gap-2"
          >
            <Plus className="w-4 h-4" weight="bold" />
            New Session
          </Button>

          <Card className="flex-1 rounded-xl border-none shadow-sm flex flex-col overflow-hidden">
            <CardHeader className="p-3 border-b bg-muted/30">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent Synapses</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1 w-full">
              <div className="p-2 space-y-1 w-[19.7rem]">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => selectChat(chat)}
                    className={cn(
                      "group  p-2.5 rounded-xl cursor-pointer transition-all duration-200 relative",
                      activeChat?.id === chat.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="font-bold text-sm truncate pr-6">{chat.title}</p>
                      <button
                        onClick={(e) => deleteChat(chat.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                      >
                        <Trash className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground truncate opacity-70">{chat.lastMessage}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* --- MAIN: CHAT INTERFACE --- */}
        <Card className="flex-1 flex flex-col rounded-xl border-none relative  glass-card">
          <AnimatePresence mode="wait">
            {messages.length === 0 && !activeChat ? (
              /* --- Welcome Screen --- */
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-inner">
                  <Robot className="w-8 h-8 text-primary" weight="fill" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">How can I help you study today?</h2>
                <p className="text-muted-foreground max-w-sm mb-12">
                  I'm your AI study partner, trained on your materials and performance data.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
                  {suggestedPrompts.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(item.prompt)}
                      className="group flex  gap-x-4 align-items-center p-4 rounded-2xl border bg-card/50 text-left transition-all hover:border-primary hover:bg-primary/5 hover:shadow-sm"
                    >
                      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110", item.color)}>
                        <item.icon className="w-4.5 h-4.5" weight="bold" />
                      </div>
                      <div>
                                 <p className="font-bold text-sm mb-1">{item.title}</p>
                                   <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                                  {item.prompt}
                                </p>
                      </div>
                      
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* --- Message Stream --- */
              <ScrollArea className="flex-1 p-2 lg:p-10">
                <div className="space-y-4 max-w-3xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex flex-shrink-0 items-center justify-center shadow-sm self-end mb-2">
                          <Robot className="w-5 h-5 text-primary" weight="fill" />
                        </div>
                      )}

                      <div className={cn(
                        "max-w-[80%] p-4 rounded-2xl relative shadow-sm",
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted/50 border text-foreground rounded-bl-none'
                      )}>
                        <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                        <span className="text-[10px] opacity-40 mt-3 block font-bold uppercase tracking-widest">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {message.role === 'user' && (
                        <div className="w-9 h-9 rounded-xl bg-muted flex flex-shrink-0 items-center justify-center shadow-sm self-end mb-2">
                          <User className="w-5 h-5 text-muted-foreground" weight="bold" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-4 justify-start">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
                        <Robot className="w-6 h-6 text-primary animate-pulse" />
                      </div>
                      <div className="bg-muted px-6 py-4 rounded-3xl flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
            )}
          </AnimatePresence>

          {/* --- INPUT BAR --- */}
          <div className="p-6 bg-background/50 backdrop-blur-md border-t">
            <div className="max-w-3xl mx-auto relative">
              <div className="flex flex-col bg-muted/30 border rounded-2xl focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all overflow-hidden">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything about your study materials..."
                  className="border-none focus-visible:ring-0 h-12 px-5 text-sm bg-transparent"
                />

                <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-t">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground">
                      <Microphone className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="h-10 px-6 rounded-full font-bold gap-2 group transition-all active:scale-95 shadow-md shadow-primary/20"
                  >
                    Send
                    <PaperPlaneRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" weight="bold" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default QuestyChat;
