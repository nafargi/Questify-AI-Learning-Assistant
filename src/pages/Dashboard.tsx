import React, { useState, useEffect } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Sparkle, Flame, Target, BookOpen, ArrowRight,
  Brain, Biohazard, Clock, Users, Medal, ChartLine, 
  ChartBar, ChartPie, Calendar, Target as TargetIcon,
  TrendUp, ClockClockwise, BookmarkSimple, Lightning,CaretDown,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { 
  LineChart as RechartsLineChart, 
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Line, 
  Bar, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar
} from 'recharts';

// =================== MOCK DATA GENERATORS ===================
const generatePerformanceData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    day,
    mastery: 70 + Math.random() * 25,
    focus: 40 + Math.random() * 40,
    retention: 75 + Math.random() * 20,
    speed: 60 + Math.random() * 30,
  }));
};

const generateSubjectData = () => {
  const subjects = ['Algorithms', 'Neural Networks', 'Data Structures', 'Statistics', 'Calculus', 'ML Ops'];
  return subjects.map(subject => ({
    subject,
    proficiency: Math.floor(60 + Math.random() * 40),
    timeSpent: Math.floor(5 + Math.random() * 20),
    completion: Math.floor(50 + Math.random() * 50),
    growth: Math.floor(-10 + Math.random() * 30),
  }));
};

const generateCognitiveMetrics = () => {
  return [
    { metric: 'Working Memory', value: 85, fullMark: 100 },
    { metric: 'Processing Speed', value: 72, fullMark: 100 },
    { metric: 'Pattern Recognition', value: 91, fullMark: 100 },
    { metric: 'Logical Reasoning', value: 78, fullMark: 100 },
    { metric: 'Spatial Awareness', value: 67, fullMark: 100 },
    { metric: 'Verbal Comprehension', value: 82, fullMark: 100 },
  ];
};

const generateDailyProgress = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    engagement: Math.floor(20 + Math.sin(i / 24 * Math.PI * 2) * 30 + Math.random() * 20),
    focus: Math.floor(30 + Math.cos(i / 24 * Math.PI) * 25 + Math.random() * 15),
  }));
};

const generateLearningPathData = () => {
  return [
    { name: 'Beginner', value: 25, color: '#3b82f6' },
    { name: 'Intermediate', value: 45, color: '#8b5cf6' },
    { name: 'Advanced', value: 20, color: '#10b981' },
    { name: 'Expert', value: 10, color: '#f59e0b' },
  ];
};

const generateActivityData = () => {
  const activities = [
    { type: 'Video Lecture', duration: 45, timestamp: '2 hours ago', score: 92 },
    { type: 'Interactive Quiz', duration: 15, timestamp: '3 hours ago', score: 88 },
    { type: 'Coding Challenge', duration: 60, timestamp: '5 hours ago', score: 95 },
    { type: 'Reading Material', duration: 30, timestamp: '1 day ago', score: 85 },
    { type: 'Practice Exam', duration: 90, timestamp: '2 days ago', score: 90 },
  ];
  return activities;
};

// =================== COMPONENTS ===================
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: string;
  description?: string;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendUp, 
  color, 
  description,
  isLoading = false 
}) => (
  <div className="bg-gradient-to-br from-card to-card/90 border rounded-2xl p-6 flex flex-col justify-between hover:-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", color)}>
        <Icon className="w-6 h-6" weight="fill" />
      </div>
      {trend && (
        <Badge variant="secondary" className={cn("text-xs font-bold px-2 py-1", 
          trendUp ? "text-green-600 bg-green-500/10" : "text-red-600 bg-red-500/10")}>
          {trend}
        </Badge>
      )}
    </div>
    <div>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded"></div>
        </div>
      ) : (
        <>
          <h3 className="text-3xl font-black tracking-tight mb-1">{value}</h3>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </>
      )}
    </div>
  </div>
);

const FocusCard = ({ title, subtitle, action, imageGradient, onClick, disabled = false }: any) => (
  <div 
    className={cn(
      "relative overflow-hidden rounded-3xl border bg-card p-8 group cursor-pointer transition-all duration-300 hover:-xl",
      disabled ? "opacity-60 cursor-not-allowed" : "hover:border-primary/50 hover:-translate-y-1"
    )}
    onClick={!disabled ? onClick : undefined}
  >
    <div className={cn("absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity", imageGradient)} />
    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
        {action} <ArrowRight className="transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </div>
);

const MetricChart = ({ data, title, description, type = 'line', height = 200 }: any) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem'
              }}
            />
            <Area type="monotone" dataKey="mastery" stroke="#3b82f6" fill="url(#colorMastery)" />
            <Area type="monotone" dataKey="focus" stroke="#8b5cf6" fill="url(#colorFocus)" />
            <Area type="monotone" dataKey="retention" stroke="#10b981" fill="url(#colorRetention)" />
            <defs>
              <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        );
      case 'bar':
        return (
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="subject" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem'
              }}
            />
            <Bar dataKey="proficiency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completion" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        );
      default:
        return (
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="hour" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem'
              }}
            />
            <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="focus" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </RechartsLineChart>
        );
    }
  };

  return (
    <Card className="border rounded-2xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Select defaultValue={type}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const CognitiveRadarChart = ({ data }: any) => (
  <Card className="border rounded-2xl">
    <CardHeader>
      <CardTitle className="text-lg font-bold">Cognitive Profile</CardTitle>
      <CardDescription>Your cognitive strengths across different dimensions</CardDescription>
    </CardHeader>
    <CardContent>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9ca3af" />
            <Radar
              name="Current"
              dataKey="value"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const ProgressDistributionChart = ({ data }: any) => (
  <Card className="border rounded-2xl">
    <CardHeader>
      <CardTitle className="text-lg font-bold">Learning Distribution</CardTitle>
      <CardDescription>Breakdown of your current learning levels</CardDescription>
    </CardHeader>
    <CardContent>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RadialBarChart 
            innerRadius="10%" 
            outerRadius="80%" 
            data={data} 
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              label={{ fill: '#fff', position: 'insideStart' }}
              background
              dataKey="value"
            />
            <Legend 
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem'
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const ActivityFeed = ({ activities }: any) => (
  <Card className="border rounded-2xl ">
    <CardHeader>
      <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
      <CardDescription>Your latest learning sessions</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {activities.map((activity: any, index: number) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-accent transition-colors">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                activity.type.includes('Quiz') ? "bg-purple-500/10 text-purple-500" :
                activity.type.includes('Challenge') ? "bg-blue-500/10 text-blue-500" :
                activity.type.includes('Lecture') ? "bg-green-500/10 text-green-500" :
                "bg-orange-500/10 text-orange-500"
              )}>
                {activity.type.includes('Quiz') ? <Biohazard size={20} /> :
                 activity.type.includes('Challenge') ? <Brain size={20} /> :
                 activity.type.includes('Lecture') ? <BookOpen size={20} /> :
                 <ClockClockwise size={20} />}
              </div>
              <div>
                <h4 className="font-semibold text-sm">{activity.type}</h4>
                <p className="text-xs text-muted-foreground">{activity.duration} min • {activity.timestamp}</p>
              </div>
            </div>
            <Badge className={cn(
              "font-bold",
              activity.score >= 90 ? "bg-green-500/10 text-green-500" :
              activity.score >= 80 ? "bg-blue-500/10 text-blue-500" :
              "bg-orange-500/10 text-orange-500"
            )}>
              {activity.score}%
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
//deep
const WeekOverview = () => {
  const weekData = [
    { day: 'Mon', focus: 85, learning: 70 },
    { day: 'Tue', focus: 60, learning: 65 },
    { day: 'Wed', focus: 40, learning: 80 },
    { day: 'Thu', focus: 75, learning: 85 },
    { day: 'Fri', focus: 90, learning: 60 },
    { day: 'Sat', focus: 50, learning: 75 },
    { day: 'Sun', focus: 0, learning: 0 },
  ];

  return (
    <Card className="border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Week Overview</CardTitle>
        <CardDescription>Daily focus vs learning efficiency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {weekData.map((day, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{day.day}</span>
                <span className="text-muted-foreground">
                  Focus: {day.focus}% • Learning: {day.learning}%
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-primary/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${day.focus}%` }}
                  />
                </div>
                <div className="flex-1 h-2 bg-green-500/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${day.learning}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const QuickInsightCard = ({ title, insight, metric, trend, icon: Icon, color }: any) => (
  <div className="bg-card border rounded-xl p-4  transition-all">
    <div className="flex items-center gap-3 mb-3">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", color)}>
        <Icon size={20} weight="fill" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{insight}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-black">{metric}</span>
      <Badge className={cn("text-xs", trend >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
        {trend >= 0 ? '+' : ''}{trend}%
      </Badge>
    </div>
  </div>
);

// =================== MAIN DASHBOARD COMPONENT ===================
export default function Dashboard() {
  const [performanceData, setPerformanceData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [cognitiveData, setCognitiveData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [learningPathData, setLearningPathData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setPerformanceData(generatePerformanceData());
      setSubjectData(generateSubjectData());
      setCognitiveData(generateCognitiveMetrics());
      setDailyData(generateDailyProgress());
      setLearningPathData(generateLearningPathData());
      setActivities(generateActivityData());
      setLoading(false);
    };

    loadData();

    if (autoRefresh) {
      const interval = setInterval(() => {
        loadData();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleStartSession = (type: string) => {
    alert(`Starting ${type} session...`);
    // Implementation would connect to your backend
  };

  const insights = [
    {
      title: "Peak Performance",
      insight: "Your focus peaks between 2-4 PM",
      metric: "92%",
      trend: 8,
      icon: TrendUp,
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "Retention Rate",
      insight: "Spaced repetition is working",
      metric: "94%",
      trend: 4,
      icon: Brain,
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Speed Gain",
      insight: "Problem solving 24% faster",
      metric: "1.2x",
      trend: 24,
      icon: Biohazard,
      color: "bg-blue-500/10 text-blue-500"
    },
  ];

  return (
    <DashboardLayout title="NeuroLearning Command Center">
      <div className="max-w-7xl mx-auto pb-20 space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black tracking-tight">Welcome back.</h1>
              <Badge variant="outline" className="text-xs px-3 py-1">
                <Sparkle className="w-3 h-3 mr-1" />
                AI-Enhanced
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              Your cognitive index has increased by <span className="text-primary font-bold">+12%</span> this week.
              Neural efficiency at <span className="text-green-500 font-bold">94th percentile</span>.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              <Label className="text-sm">Auto-refresh</Label>
            </div>
            <Button className="rounded-full px-8 h-12 font-bold -lg -primary/20 hover:-primary/30 transition-all">
              <Sparkle className="mr-2" weight="fill" />
              New Learning Session
            </Button>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={Target}
            label="Mastery Score"
            value="82%"
            trend="+2.4%"
            trendUp
            color="bg-primary/10 text-primary"
            description="Overall proficiency"
            isLoading={loading}
          />
          <StatCard 
            icon={Flame}
            label="Learning Streak"
            value="12 Days"
            trend="On Fire"
            trendUp
            color="bg-orange-500/10 text-orange-500"
            description="Consistency score: 92"
            isLoading={loading}
          />
          <StatCard 
            icon={Clock}
            label="Deep Focus"
            value="4.2h"
            trend="+18m"
            trendUp
            color="bg-blue-500/10 text-blue-500"
            description="Today's focused time"
            isLoading={loading}
          />
          <StatCard 
            icon={Brain}
            label="Retention"
            value="94%"
            trend="High"
            trendUp
            color="bg-purple-500/10 text-purple-500"
            description="7-day memory retention"
            isLoading={loading}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Performance Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Trend Chart */}
            <MetricChart 
              data={performanceData}
              title="Performance Trends"
              description="Weekly mastery, focus, and retention metrics"
              type="area"
              height={300}
            />

            {/* Subject Proficiency */}
            <div className="grid md:grid-cols-2 gap-6">
              <MetricChart 
                data={subjectData}
                title="Subject Proficiency"
                description="Mastery levels across topics"
                type="bar"
                height={250}
              />
              
              <MetricChart 
                data={dailyData}
                title="Daily Engagement"
                description="24-hour learning pattern"
                type="line"
                height={250}
              />
            </div>

            {/* Quick Insights */}
            <div className="grid md:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <QuickInsightCard key={index} {...insight} />
              ))}
            </div>
          </div>

          {/* Right Column - Analytics & Activity  */}
          <div className="space-y-6">
            <CognitiveRadarChart data={cognitiveData} />
            <ProgressDistributionChart data={learningPathData} />
            {/* <ActivityFeed activities={activities} /> */}
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FocusCard
            title="Deep Study"
            subtitle="Enter flow state with adaptive learning"
            action="Begin Session"
            imageGradient="bg-gradient-to-br from-blue-500 to-cyan-500"
            onClick={() => handleStartSession('study')}
          />
          <FocusCard
            title="AI Challenge"
            subtitle="Test against AI-generated problems"
            action="Start Challenge"
            imageGradient="bg-gradient-to-br from-purple-500 to-pink-500"
            onClick={() => handleStartSession('challenge')}
          />
          <FocusCard
            title="Review Session"
            subtitle="Target weak areas with spaced repetition"
            action="Review Now"
            imageGradient="bg-gradient-to-br from-green-500 to-emerald-500"
            onClick={() => handleStartSession('review')}
          />
          <FocusCard
            title="Simulation Exam"
            subtitle="Full-length adaptive assessment"
            action="Take Exam"
            imageGradient="bg-gradient-to-br from-orange-500 to-red-500"
            onClick={() => handleStartSession('exam')}
          />
        </div>

        {/* Bottom Analytics Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          <WeekOverview />
          
          <Card className="border rounded-2xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Learning Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions based on your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectData.slice(0, 3).map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-blue-200/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center font-bold">
                        {subject.subject.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold">{subject.subject}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Proficiency: {subject.proficiency}%</span>
                          <span>Time: {subject.timeSpent}h</span>
                          <span className={cn(
                            "font-bold",
                            subject.growth >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {subject.growth >= 0 ? '+' : ''}{subject.growth}% growth
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Study
                      </Button>
                      <Button variant="outline" size="sm">
                        <TargetIcon className="w-4 h-4 mr-2" />
                        Practice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-black text-primary">42</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Topics Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-green-500">156</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Hours Logged</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-purple-500">92%</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg. Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-orange-500">1.8x</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Learning Speed</div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}