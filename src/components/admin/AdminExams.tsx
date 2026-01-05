import { useState } from "react";
import { 
  ClipboardList, Settings, Sliders, Clock, Target,
  CheckCircle, XCircle, BarChart2, Save, Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const questionTypes = [
  { id: "mcq", name: "Multiple Choice", enabled: true, description: "Standard A/B/C/D format" },
  { id: "tf", name: "True/False", enabled: true, description: "Binary answer questions" },
  { id: "short", name: "Short Answer", enabled: true, description: "Brief text responses" },
  { id: "essay", name: "Essay", enabled: true, description: "Long-form written answers" },
  { id: "matching", name: "Matching", enabled: false, description: "Pair related items" },
  { id: "fill", name: "Fill in the Blank", enabled: true, description: "Complete the sentence" },
];

const difficultyLevels = [
  { level: "Easy", color: "bg-emerald-500", weight: 30 },
  { level: "Medium", color: "bg-amber-500", weight: 45 },
  { level: "Hard", color: "bg-red-500", weight: 25 },
];

const examStats = [
  { label: "Total Exams Generated", value: "142,567", change: "+23.1%" },
  { label: "Avg. Completion Rate", value: "87.3%", change: "+2.4%" },
  { label: "Avg. Score", value: "72.8%", change: "+5.1%" },
  { label: "Diagnostic Accuracy", value: "94.2%", change: "+1.8%" },
];

const AdminExams = () => {
  const [types, setTypes] = useState(questionTypes);
  const [timeThreshold, setTimeThreshold] = useState([30]);
  const [adaptiveEnabled, setAdaptiveEnabled] = useState(true);

  const toggleType = (id: string) => {
    setTypes(types.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Exam System Control</h1>
        <p className="text-slate-400">Configure question types, difficulty scaling, and adaptive exam rules</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {examStats.map((stat) => (
          <Card key={stat.label} className="bg-slate-900/50 border-slate-800 p-5">
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <span className="text-emerald-400 text-sm">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question Types */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-violet-400" />
              Question Types
            </h3>
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-1" /> Add Type
            </Button>
          </div>
          <div className="space-y-3">
            {types.map((type) => (
              <div 
                key={type.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    type.enabled ? "bg-violet-500/20" : "bg-slate-700"
                  }`}>
                    {type.enabled 
                      ? <CheckCircle className="w-5 h-5 text-violet-400" />
                      : <XCircle className="w-5 h-5 text-slate-500" />
                    }
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium">{type.name}</p>
                    <p className="text-slate-500 text-sm">{type.description}</p>
                  </div>
                </div>
                <Switch 
                  checked={type.enabled}
                  onCheckedChange={() => toggleType(type.id)}
                  className="data-[state=checked]:bg-violet-600"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Difficulty Scaling */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-violet-400" />
            Difficulty Distribution
          </h3>
          <div className="mb-8">
            <div className="flex h-6 rounded-full overflow-hidden">
              {difficultyLevels.map((level, i) => (
                <div 
                  key={i}
                  className={`${level.color} flex items-center justify-center text-xs font-medium text-white`}
                  style={{ width: `${level.weight}%` }}
                >
                  {level.weight}%
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {difficultyLevels.map((level) => (
              <div key={level.level}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${level.color}`} />
                    <span className="text-slate-300">{level.level}</span>
                  </div>
                  <span className="text-slate-400">{level.weight}%</span>
                </div>
                <Slider 
                  defaultValue={[level.weight]} 
                  max={100} 
                  step={5}
                  className="[&_[role=slider]]:bg-violet-500"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Timing Thresholds */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-violet-400" />
            Time-Based Weakness Detection
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">Quick Answer Threshold</span>
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                  {timeThreshold[0]} seconds
                </Badge>
              </div>
              <Slider 
                value={timeThreshold}
                onValueChange={setTimeThreshold}
                max={60} 
                min={5}
                step={5}
                className="[&_[role=slider]]:bg-violet-500"
              />
              <p className="text-slate-500 text-sm mt-2">
                Answers faster than this may indicate guessing
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">Hesitation Detection</span>
                <Switch className="data-[state=checked]:bg-violet-600" defaultChecked />
              </div>
              <p className="text-slate-500 text-sm">
                Flag questions where users spend excessive time before answering
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">Answer Change Tracking</span>
                <Switch className="data-[state=checked]:bg-violet-600" defaultChecked />
              </div>
              <p className="text-slate-500 text-sm">
                Track when users change their answers to detect uncertainty
              </p>
            </div>
          </div>
        </Card>

        {/* Adaptive Rules */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-400" />
              Adaptive Exam Rules
            </h3>
            <Switch 
              checked={adaptiveEnabled}
              onCheckedChange={setAdaptiveEnabled}
              className="data-[state=checked]:bg-violet-600"
            />
          </div>
          <div className={`space-y-4 ${!adaptiveEnabled && "opacity-50 pointer-events-none"}`}>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <p className="text-slate-300 font-medium mb-1">Difficulty Adjustment</p>
              <p className="text-slate-500 text-sm">
                Automatically adjust question difficulty based on user performance
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <p className="text-slate-300 font-medium mb-1">Topic Focus</p>
              <p className="text-slate-500 text-sm">
                Increase questions on weak topics, reduce on mastered ones
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <p className="text-slate-300 font-medium mb-1">Confidence Calibration</p>
              <p className="text-slate-500 text-sm">
                Compare user's stated confidence with actual performance
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <p className="text-slate-300 font-medium mb-1">Diagnostic Mode</p>
              <p className="text-slate-500 text-sm">
                Focus on identification over scoring for initial assessments
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8">
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default AdminExams;
