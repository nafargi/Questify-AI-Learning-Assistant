import { useState } from "react";
import {
  BookOpen, Plus, PencilSimple, Trash, Eye, EyeSlash,
  TrendUp, Users, Clock, Star
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const techniques = [
  {
    id: 1, name: "Cornell Method", enabled: true,
    description: "Divide notes into cues, notes, and summary sections",
    usage: 34567, effectiveness: 87, avgTime: "25 min",
    category: "Note-taking"
  },
  {
    id: 2, name: "Feynman Technique", enabled: true,
    description: "Explain concepts in simple terms to identify gaps",
    usage: 28934, effectiveness: 92, avgTime: "30 min",
    category: "Understanding"
  },
  {
    id: 3, name: "Pomodoro", enabled: true,
    description: "Work in focused 25-minute intervals with breaks",
    usage: 45678, effectiveness: 85, avgTime: "120 min",
    category: "Time Management"
  },
  {
    id: 4, name: "Mind Mapping", enabled: true,
    description: "Visual representation of connected ideas",
    usage: 21345, effectiveness: 78, avgTime: "20 min",
    category: "Note-taking"
  },
  {
    id: 5, name: "Spaced Repetition", enabled: true,
    description: "Review material at increasing intervals",
    usage: 38912, effectiveness: 94, avgTime: "15 min",
    category: "Retention"
  },
  {
    id: 6, name: "Active Recall", enabled: true,
    description: "Test yourself without looking at notes",
    usage: 32456, effectiveness: 91, avgTime: "20 min",
    category: "Retention"
  },
  {
    id: 7, name: "Zettelkasten", enabled: false,
    description: "Interconnected note cards for knowledge building",
    usage: 5678, effectiveness: 89, avgTime: "35 min",
    category: "Note-taking"
  },
];

const AdminTechniques = () => {
  const [techniqueList, setTechniqueList] = useState(techniques);

  const toggleTechnique = (id: number) => {
    setTechniqueList(techniqueList.map(t =>
      t.id === id ? { ...t, enabled: !t.enabled } : t
    ));
  };

  const topTechniques = [...techniqueList]
    .sort((a, b) => b.effectiveness - a.effectiveness)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Teaching Techniques Management</h1>
          <p className="text-slate-400">Configure and monitor study techniques across the platform</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Technique
        </Button>
      </div>

      {/* Top Performing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topTechniques.map((technique, i) => (
          <Card key={technique.id} className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-violet-500/20 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-violet-400" />
                </div>
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                  #{i + 1} Most Effective
                </Badge>
              </div>
              <span className="text-2xl font-bold text-emerald-400">{technique.effectiveness}%</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-1">{technique.name}</h4>
            <p className="text-slate-400 text-sm">{technique.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1 text-slate-400">
                <Users className="w-4 h-4" />
                {technique.usage.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-4 h-4" />
                {technique.avgTime}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* All Techniques */}
      <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            All Techniques
          </h3>
        </div>
        <div className="divide-y divide-slate-800">
          {techniqueList.map((technique) => (
            <div
              key={technique.id}
              className={`p-6 hover:bg-slate-800/30 transition-all ${!technique.enabled && "opacity-60"}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-medium text-white">{technique.name}</h4>
                    <Badge variant="outline" className="border-slate-600 text-slate-400">
                      {technique.category}
                    </Badge>
                    {!technique.enabled && (
                      <Badge className="bg-slate-700 text-slate-400">Disabled</Badge>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{technique.description}</p>
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Usage</p>
                      <p className="text-slate-200 font-medium">{technique.usage.toLocaleString()} sessions</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Effectiveness</p>
                      <div className="flex items-center gap-2">
                        <Progress value={technique.effectiveness} className="w-24 h-2 bg-slate-800" />
                        <span className="text-slate-200 font-medium">{technique.effectiveness}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Avg. Duration</p>
                      <p className="text-slate-200 font-medium">{technique.avgTime}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={technique.enabled}
                    onCheckedChange={() => toggleTechnique(technique.id)}
                    className="data-[state=checked]:bg-violet-600"
                  />
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                    <PencilSimple className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg transition-all">
                    <Trash className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminTechniques;
