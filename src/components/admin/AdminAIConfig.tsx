import { useState } from "react";
import { 
  Brain, Save, RotateCcw, Code, FileText, ClipboardList,
  MessageSquare, Lightbulb, AlertTriangle, Eye
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const promptTemplates = {
  notes: `You are an educational content generator for Questify. Generate comprehensive study notes using the {technique} method.

Context:
- Subject: {subject}
- Topic: {topic}
- User's weak areas: {weak_areas}
- Learning level: {level}

Instructions:
1. Focus on the user's identified weak areas
2. Use clear, simple language
3. Include practical examples
4. Structure according to the {technique} format
5. Highlight key concepts and definitions`,

  exams: `You are an exam question generator for Questify. Create diagnostic questions that identify knowledge gaps.

Context:
- Subject: {subject}
- Topics: {topics}
- Difficulty: {difficulty}
- Question type: {type}

Instructions:
1. Create questions that test understanding, not memorization
2. Include common misconception distractors
3. Vary cognitive levels (recall, apply, analyze)
4. Provide clear, unambiguous wording
5. Focus on concepts where users commonly struggle`,

  explanations: `You are Questy, an AI tutor on Questify. Explain concepts clearly and adapt to the learner.

Context:
- User's question: {question}
- Subject: {subject}
- User's current understanding: {understanding}
- Previous interactions: {history}

Instructions:
1. Start with what the user knows
2. Build understanding step by step
3. Use analogies and examples
4. Check for understanding
5. Connect to related concepts`,

  questy: `You are Questy, the AI learning assistant for Questify. You understand each learner's history, strengths, and weaknesses.

Personality:
- Supportive but not patronizing
- Clear and concise
- Encouraging mastery over memorization
- Honest about areas needing work

Available actions:
- Suggest targeted practice
- Explain weak concepts
- Recommend study techniques
- Create custom study plans`
};

const AdminAIConfig = () => {
  const [activeTemplate, setActiveTemplate] = useState("notes");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Behavior & Prompt Configuration</h1>
        <p className="text-slate-400">Configure AI prompts for notes, exams, explanations, and Questy responses</p>
      </div>

      {/* Warning */}
      <Card className="bg-amber-500/10 border-amber-500/20 p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-amber-200 text-sm">
            Changes to AI configuration affect all users. Test thoroughly before saving.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prompt Editor */}
        <Card className="bg-slate-900/50 border-slate-800 p-6 lg:col-span-2">
          <Tabs value={activeTemplate} onValueChange={setActiveTemplate}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-violet-400" />
                Prompt Templates
              </h3>
              <TabsList className="bg-slate-800">
                <TabsTrigger value="notes" className="data-[state=active]:bg-violet-600">
                  <FileText className="w-4 h-4 mr-1" /> Notes
                </TabsTrigger>
                <TabsTrigger value="exams" className="data-[state=active]:bg-violet-600">
                  <ClipboardList className="w-4 h-4 mr-1" /> Exams
                </TabsTrigger>
                <TabsTrigger value="explanations" className="data-[state=active]:bg-violet-600">
                  <Lightbulb className="w-4 h-4 mr-1" /> Explanations
                </TabsTrigger>
                <TabsTrigger value="questy" className="data-[state=active]:bg-violet-600">
                  <MessageSquare className="w-4 h-4 mr-1" /> Questy
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(promptTemplates).map(([key, value]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                        {key.charAt(0).toUpperCase() + key.slice(1)} Template
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        v2.4.1
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
                      <Eye className="w-4 h-4 mr-1" /> Preview
                    </Button>
                  </div>
                  <Textarea 
                    defaultValue={value}
                    className="min-h-[400px] bg-slate-800 border-slate-700 text-slate-200 font-mono text-sm"
                  />
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span>Variables:</span>
                    {["{subject}", "{topic}", "{technique}", "{level}"].map((v) => (
                      <Badge key={v} variant="outline" className="border-slate-700 text-slate-400 text-xs">
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        {/* Model Settings */}
        <div className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-400" />
              Model Settings
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300">Temperature</span>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                    {temperature[0]}
                  </Badge>
                </div>
                <Slider 
                  value={temperature}
                  onValueChange={setTemperature}
                  max={1} 
                  min={0}
                  step={0.1}
                  className="[&_[role=slider]]:bg-violet-500"
                />
                <p className="text-slate-500 text-xs mt-2">
                  Higher = more creative, Lower = more consistent
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300">Max Tokens</span>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                    {maxTokens[0]}
                  </Badge>
                </div>
                <Slider 
                  value={maxTokens}
                  onValueChange={setMaxTokens}
                  max={4096} 
                  min={256}
                  step={256}
                  className="[&_[role=slider]]:bg-violet-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Content Filtering</span>
                  <Switch className="data-[state=checked]:bg-violet-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Citation Mode</span>
                  <Switch className="data-[state=checked]:bg-violet-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Debug Logging</span>
                  <Switch className="data-[state=checked]:bg-violet-600" />
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
            <Button variant="outline" className="w-full bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAIConfig;
