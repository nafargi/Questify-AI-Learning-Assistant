import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Send, 
  MessageSquare, 
  Sparkles, 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp,
  Trash2,
  MoreHorizontal,
  Clock,
  GraduationCap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    title: "Explain a concept",
    prompt: "Can you explain the concept of photosynthesis in simple terms?",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Brain,
    title: "Study strategy",
    prompt: "What's the best way to study for my calculus exam next week?",
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: Target,
    title: "Improve weakness",
    prompt: "I'm struggling with quadratic equations. How can I improve?",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: TrendingUp,
    title: "Track progress",
    prompt: "Based on my recent exams, what topics should I focus on?",
    color: "from-green-500 to-emerald-500"
  }
];

const initialChatHistory: ChatSession[] = [
  {
    id: '1',
    title: 'Calculus Integration Help',
    lastMessage: 'Thanks! That explanation really helped me understand...',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    messages: [
      { id: '1', role: 'user', content: 'Can you help me understand integration by parts?', timestamp: new Date(Date.now() - 1000 * 60 * 35) },
      { id: '2', role: 'assistant', content: 'Of course! Integration by parts is a technique based on the product rule for differentiation. The formula is:\n\n∫u dv = uv - ∫v du\n\nHere\'s how to apply it:\n\n1. **Choose u and dv**: Pick u as the function that becomes simpler when differentiated, and dv as the remaining part.\n\n2. **Apply LIATE rule**: When choosing u, prioritize in this order:\n   - Logarithmic functions\n   - Inverse trig functions\n   - Algebraic functions\n   - Trigonometric functions\n   - Exponential functions\n\n3. **Example**: ∫x·e^x dx\n   - Let u = x (algebraic) → du = dx\n   - Let dv = e^x dx → v = e^x\n   - Apply formula: x·e^x - ∫e^x dx = x·e^x - e^x + C\n\nWould you like me to work through more examples with you?', timestamp: new Date(Date.now() - 1000 * 60 * 32) },
      { id: '3', role: 'user', content: 'Thanks! That explanation really helped me understand the concept better.', timestamp: new Date(Date.now() - 1000 * 60 * 30) }
    ]
  },
  {
    id: '2',
    title: 'Physics Problem Solving',
    lastMessage: 'I\'ll try those practice problems now...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messages: [
      { id: '1', role: 'user', content: 'I keep getting Newton\'s second law problems wrong. What am I missing?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 - 1000 * 60 * 5) },
      { id: '2', role: 'assistant', content: 'Let me help you master Newton\'s Second Law! Based on your exam history, I notice you often miss the direction component. Here\'s a structured approach:\n\n**Common Mistakes & Fixes:**\n\n1. **Forgetting to draw free-body diagrams** - Always start by identifying ALL forces acting on the object\n\n2. **Sign convention errors** - Choose a consistent positive direction and stick to it\n\n3. **Not breaking forces into components** - For angled forces, use F_x = F·cos(θ) and F_y = F·sin(θ)\n\n**Step-by-Step Method:**\n1. Draw the object and all forces\n2. Choose coordinate system\n3. Write ΣF = ma for each direction\n4. Solve the system of equations\n\nBased on your uploaded Physics material, try problems 3.5-3.8 in Chapter 4. They specifically target force decomposition.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { id: '3', role: 'user', content: 'I\'ll try those practice problems now and come back if I get stuck!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) }
    ]
  },
  {
    id: '3',
    title: 'Essay Writing Tips',
    lastMessage: 'That structure is perfect for my essay!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messages: []
  },
  {
    id: '4',
    title: 'Chemistry Balancing Equations',
    lastMessage: 'Now I understand the oxidation numbers...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    messages: []
  }
];

const QuestyChat = () => {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(initialChatHistory);
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
    if (activeChat?.id === chatId) {
      createNewChat();
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return `Based on your recent exam performance, I've analyzed your patterns:\n\n**Your Strengths:**\n- Problem-solving in Algebra (87% accuracy)\n- Conceptual understanding in Biology\n\n**Areas to Focus:**\n- Calculus derivatives (62% accuracy)\n- Physics force diagrams\n\n**Personalized Recommendations:**\n1. Use the **Feynman Technique** for calculus - explain derivatives to yourself as if teaching someone else\n2. Try **Active Problem Cycling** for physics - I've identified 5 practice problems from your material that target your weak areas\n3. Schedule a 25-minute **Pomodoro session** focusing on force decomposition\n\nWould you like me to set up a study plan or explain any concept in detail?`;
    }
    
    if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      return `I'd love to help you optimize your study approach! Based on your learning patterns and uploaded materials:\n\n**Your Peak Focus Times:** 9-11 AM and 4-6 PM\n**Best Study Method for You:** Interleaved Micro-Study (based on your retention rates)\n\n**Recommended Study Plan:**\n\n📚 **Morning Session (45 min)**\n- 15 min: Review weak areas from last exam\n- 20 min: New concept introduction\n- 10 min: Quick recall quiz\n\n🧠 **Afternoon Session (30 min)**\n- Active problem solving\n- Spaced repetition flashcards\n\n**Available Study Techniques:**\n1. Pomodoro Technique 🍅\n2. Feynman Learning Loops\n3. Concept Chunking\n4. Question-First Learning\n\nWhich technique would you like to try, or should I explain any of these in more detail?`;
    }
    
    if (lowerMessage.includes('weak') || lowerMessage.includes('struggle') || lowerMessage.includes('help')) {
      return `I've analyzed your performance data and identified key areas for improvement:\n\n**Detailed Weakness Analysis:**\n\n🔴 **Critical: Quadratic Equations (45% accuracy)**\n- *Why you're struggling:* You're trying to memorize formulas without understanding the underlying logic of factoring\n- *Root cause:* Missing foundational concept of completing the square\n- *Fix:* Start with Chapter 3.2 of your Algebra material - focus on visual representation of parabolas\n\n🟡 **Moderate: Thermodynamics (68% accuracy)**\n- *Pattern detected:* You confuse heat capacity and specific heat\n- *Recommended approach:* Use Cornell Notes to create a comparison chart\n\n**Immediate Action Steps:**\n1. I've prepared 3 practice problems targeting quadratic factoring\n2. Review the mind map I generated from your Chemistry chapter\n3. Take a 10-question diagnostic quiz on thermodynamics\n\nWant me to start with any of these, or would you prefer a different approach?`;
    }
    
    if (lowerMessage.includes('explain') || lowerMessage.includes('concept') || lowerMessage.includes('understand')) {
      return `I'd be happy to explain! Let me break this down using the **Feynman Technique** - explaining complex ideas in simple terms.\n\n**Core Concept Breakdown:**\n\nImagine you're explaining this to a younger sibling...\n\n📖 **Simple Explanation:**\nThink of it like building with LEGO blocks. Each small piece connects to form something bigger and more complex.\n\n🔬 **Technical Details:**\nNow let's add the precise terminology and formulas that you'll need for exams.\n\n💡 **Key Insights from Your Material:**\nBased on Chapter 4 of your uploaded textbook, the most important points are:\n1. Foundation concept\n2. Application method\n3. Common variations\n\n✅ **Quick Check:**\nCan you explain this back to me in your own words? This helps solidify your understanding.\n\n**Related Topics in Your Material:**\n- Section 4.2: Advanced applications\n- Section 4.3: Practice problems\n\nWould you like me to quiz you on this concept or move to related topics?`;
    }
    
    return `Thanks for your question! As your personalized AI study assistant, I have access to:\n\n📚 **Your Uploaded Materials:**\n- Mathematics (Calculus, Algebra)\n- Physics (Mechanics, Thermodynamics)\n- Biology (Cell Biology, Genetics)\n\n📊 **Your Performance Data:**\n- Recent exam scores and patterns\n- Identified weak areas\n- Learning style preferences\n\n**How I Can Help:**\n1. **Explain concepts** from your specific materials\n2. **Create study plans** based on your schedule and goals\n3. **Identify patterns** in your mistakes\n4. **Generate practice questions** targeting weak areas\n5. **Recommend study techniques** that match your learning style\n\nWhat would you like to focus on today? You can ask me about:\n- Specific topics from your courses\n- Study strategies and time management\n- Exam preparation tips\n- Understanding your weak areas`;
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

    // Simulate AI response
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

      // Update or create chat session
      if (activeChat) {
        setChatHistory(prev => prev.map(c => 
          c.id === activeChat.id 
            ? { ...c, messages: updatedMessages, lastMessage: inputValue, timestamp: new Date() }
            : c
        ));
      } else {
        const newChat: ChatSession = {
          id: Date.now().toString(),
          title: inputValue.slice(0, 30) + (inputValue.length > 30 ? '...' : ''),
          lastMessage: inputValue,
          timestamp: new Date(),
          messages: updatedMessages
        };
        setChatHistory(prev => [newChat, ...prev]);
        setActiveChat(newChat);
      }
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <DashboardLayout title="Questy AI">
      <div className="flex h-[calc(100vh-120px)] gap-4">
        {/* Chat History Sidebar */}
        <div className="w-72 flex-shrink-0 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 flex flex-col">
          {/* New Chat Button */}
          <div className="p-4 border-b border-border/50">
            <Button 
              onClick={createNewChat}
              className="w-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-primary-foreground gap-2"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </Button>
          </div>

          {/* Chat History List */}
          <ScrollArea className="flex-1 px-2">
            <div className="py-2 space-y-1">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recent Conversations
              </p>
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => selectChat(chat)}
                  className={`group relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    activeChat?.id === chat.id 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeChat?.id === chat.id 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {chat.lastMessage}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTime(chat.timestamp)}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={(e) => deleteChat(chat.id, e as any)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Upgrade Banner */}
          <div className="p-4 border-t border-border/50">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Questy Pro</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Unlimited AI conversations & advanced analytics
              </p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50">
          {messages.length === 0 && !activeChat ? (
            /* Welcome Screen */
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Welcome to Questy AI
              </h2>
              <p className="text-muted-foreground text-center max-w-md mb-8">
                Your personalized AI study assistant that knows your materials, 
                understands your weaknesses, and helps you excel.
              </p>

              {/* Suggested Prompts */}
              <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
                {suggestedPrompts.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(item.prompt)}
                    className="group p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200 text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.prompt}
                    </p>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>5 courses uploaded</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>12 exams completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span>AI ready to help</span>
                </div>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6 max-w-3xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 border border-border/50'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">JS</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-muted/50 border border-border/50 p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border/50">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Questy anything about your studies..."
                    className="pr-12 py-6 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 rounded-lg"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Questy AI uses your uploaded materials and exam history to provide personalized assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QuestyChat;
