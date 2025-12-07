import { useState, useCallback } from "react";
import { Upload as UploadIcon, FileText, X, Check, Loader2, ChevronRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "processing" | "done" | "error";
  progress: number;
}

interface ExtractedUnit {
  id: string;
  title: string;
  description: string;
  topics: string[];
  confidence: number;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
};

const getConfidenceColor = (confidence: number): string => {
  if (confidence < 40) return "text-destructive";
  if (confidence < 70) return "text-warning";
  return "text-success";
};

const getConfidenceMessage = (confidence: number): string => {
  if (confidence < 30) return "It's okay to start from the basics. We'll guide you step by step.";
  if (confidence < 50) return "You have some foundation. Let's build on it together.";
  if (confidence < 70) return "Good understanding! We'll help you master the details.";
  if (confidence < 90) return "You seem comfortable — we will challenge you appropriately.";
  return "Excellent confidence! Let's verify and push your limits.";
};

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [confidence, setConfidence] = useState([50]);
  const [step, setStep] = useState<"upload" | "confidence" | "units">("upload");
  const [extractedUnits, setExtractedUnits] = useState<ExtractedUnit[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (newFiles: File[]) => {
    const uploadFiles: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...uploadFiles]);

    // Simulate upload progress
    uploadFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: "processing", progress: 100 } : f
            )
          );
          // Simulate processing
          setTimeout(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === file.id ? { ...f, status: "done" } : f
              )
            );
          }, 1500);
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress } : f
            )
          );
        }
      }, 200);
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleContinueToConfidence = () => {
    if (files.length > 0 && files.every((f) => f.status === "done")) {
      setStep("confidence");
    }
  };

  const handleAnalyze = () => {
    setIsProcessing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setExtractedUnits([
        {
          id: "u1",
          title: "Introduction to Programming",
          description: "Foundational concepts including variables, data types, and basic syntax.",
          topics: ["Variables", "Data Types", "Operators", "Basic I/O"],
          confidence: 75,
        },
        {
          id: "u2",
          title: "Control Structures",
          description: "Decision making and loops in programming.",
          topics: ["If-Else", "Switch", "For Loops", "While Loops"],
          confidence: 60,
        },
        {
          id: "u3",
          title: "Functions & Methods",
          description: "Modular programming with reusable code blocks.",
          topics: ["Function Definition", "Parameters", "Return Values", "Scope"],
          confidence: 45,
        },
        {
          id: "u4",
          title: "Data Structures",
          description: "Organizing and storing data efficiently.",
          topics: ["Arrays", "Lists", "Dictionaries", "Sets"],
          confidence: 30,
        },
      ]);
      setIsProcessing(false);
      setStep("units");
    }, 2500);
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {["Upload", "Confidence", "Review"].map((label, index) => {
            const stepIndex = index;
            const currentStep = step === "upload" ? 0 : step === "confidence" ? 1 : 2;
            const isActive = stepIndex === currentStep;
            const isComplete = stepIndex < currentStep;

            return (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                      isComplete
                        ? "gradient-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary/10 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isComplete ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium hidden sm:block",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground mx-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Upload */}
        {step === "upload" && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Upload Your Materials</h1>
              <p className="text-muted-foreground">
                Drop your course materials and let AI analyze them
              </p>
            </div>

            {/* Drop Zone */}
            <Card
              className={cn(
                "border-2 border-dashed transition-all duration-300",
                isDragOver
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border hover:border-primary/50"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
            >
              <CardContent className="p-12">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all",
                      isDragOver ? "gradient-primary scale-110" : "bg-muted"
                    )}
                  >
                    <UploadIcon
                      className={cn(
                        "w-8 h-8 transition-colors",
                        isDragOver ? "text-primary-foreground" : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isDragOver ? "Drop files here" : "Drag & drop your files"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    PDF, Word, PowerPoint, or any document format
                  </p>
                  <label>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    />
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Uploaded Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                        {file.status === "uploading" && (
                          <Progress value={file.progress} className="h-1 mt-2" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === "uploading" && (
                          <span className="text-xs text-muted-foreground">
                            {Math.round(file.progress)}%
                          </span>
                        )}
                        {file.status === "processing" && (
                          <Badge variant="secondary" className="gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Processing
                          </Badge>
                        )}
                        {file.status === "done" && (
                          <Badge className="bg-success text-success-foreground">
                            <Check className="w-3 h-3 mr-1" />
                            Ready
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Continue Button */}
            <div className="flex justify-end">
              <Button
                size="lg"
                className="gradient-primary"
                disabled={files.length === 0 || !files.every((f) => f.status === "done")}
                onClick={handleContinueToConfidence}
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Confidence */}
        {step === "confidence" && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Rate Your Confidence</h1>
              <p className="text-muted-foreground">
                How well do you understand this material?
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">Not confident</span>
                    <span className="text-sm text-muted-foreground">Very confident</span>
                  </div>

                  <div className="relative">
                    <Slider
                      value={confidence}
                      onValueChange={setConfidence}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-16 text-center">
                  <div
                    className={cn(
                      "text-6xl font-bold mb-4 transition-colors",
                      getConfidenceColor(confidence[0])
                    )}
                  >
                    {confidence[0]}%
                  </div>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    {getConfidenceMessage(confidence[0])}
                  </p>
                </div>

                {/* Visual Indicator */}
                <div className="mt-8 h-2 rounded-full overflow-hidden bg-muted">
                  <div
                    className={cn(
                      "h-full transition-all duration-500 rounded-full",
                      confidence[0] < 40
                        ? "bg-destructive"
                        : confidence[0] < 70
                        ? "bg-warning"
                        : "bg-success"
                    )}
                    style={{ width: `${confidence[0]}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("upload")}>
                Back
              </Button>
              <Button
                size="lg"
                className="gradient-primary"
                onClick={handleAnalyze}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Materials
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Units */}
        {step === "units" && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Course Structure</h1>
              <p className="text-muted-foreground">
                We've extracted the following units from your materials
              </p>
            </div>

            <div className="grid gap-4">
              {extractedUnits.map((unit, index) => (
                <Card
                  key={unit.id}
                  className="hover-lift overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                            {index + 1}
                          </div>
                          <h3 className="text-lg font-semibold">{unit.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {unit.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {unit.topics.map((topic) => (
                            <Badge key={topic} variant="secondary">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={cn(
                            "text-2xl font-bold",
                            getConfidenceColor(unit.confidence)
                          )}
                        >
                          {unit.confidence}%
                        </div>
                        <p className="text-xs text-muted-foreground">confidence</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("confidence")}>
                Back
              </Button>
              <Button size="lg" className="gradient-primary" asChild>
                <a href="/exam">
                  Start Learning
                  <ChevronRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
