import { useState, useCallback } from "react";
import { Upload as UploadIcon, FileText, X, Check, CircleNotch, CaretRight, Sparkle } from "@phosphor-icons/react";
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
    <Layout >
      <div className="container py-6 max-w-5xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
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
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      isComplete
                        ? "bg-primary text-primary-foreground"
                        : isActive
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isComplete ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={cn("text-sm font-medium hidden sm:block", isActive ? "text-foreground" : "text-muted-foreground")}>
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <div className="h-[2px] w-8 bg-muted mx-4" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Upload */}
        {step === "upload" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">Upload Materials</h1>
              <p className="text-muted-foreground mt-2">Questy will analyze your documents to build a personalized study plan</p>
            </div>

            {/* Drop Zone */}
            <Card
              className={cn(
                "border-2 border-dashed transition-all duration-300 rounded-xl",
                isDragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-muted hover:border-primary/50"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
            >
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  <div className={cn(
                    "w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-colors",
                    isDragOver ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    <UploadIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {isDragOver ? "Drop files here" : "Drag & drop files to upload"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-8">
                    Support for PDF, DOCX, PPTX, and TXT files
                  </p>
                  <label>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    />
                    <Button variant="outline" className="cursor-pointer rounded-full px-8 h-12" asChild>
                      <span>Choose Files</span>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 px-2">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  Uploaded Documents
                </h4>
                {files.map((file) => (
                  <Card key={file.id} className="rounded-lg border-none shadow-sm overflow-hidden group">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        {file.status === "uploading" && (
                          <Progress value={file.progress} className="h-1.5 mt-2" />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {file.status === "processing" && (
                          <Badge variant="secondary" className="gap-2 rounded-full py-1">
                            <CircleNotch className="w-3 h-3 animate-spin" />
                            Processing
                          </Badge>
                        )}
                        {file.status === "done" && (
                          <Badge className="bg-success/10 text-success border-none rounded-full py-1">
                            <Check className="w-3 h-3 mr-1" />
                            Ready
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border  mt-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="hidden md:block">
                <p className="text-sm font-bold">{files.length} files selected</p>
                <p className="text-xs text-muted-foreground">All files will be analyzed by Questy AI</p>
              </div>
              <Button
                size="lg"
                className="w-full md:w-auto rounded-full px-12 h-12 font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95"
                disabled={files.length === 0 || !files.every((f) => f.status === "done")}
                onClick={handleContinueToConfidence}
              >
                Analyze Content
                <CaretRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Confidence */}
        {step === "confidence" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">Sync Baseline</h1>
              <p className="text-muted-foreground mt-2">How confident are you with these materials?</p>
            </div>

            <Card className="rounded-xl  border-primary/10 overflow-hidden glass-card">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="max-w-md mx-auto space-y-12">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                    <Slider
                      value={confidence}
                      onValueChange={setConfidence}
                      max={100}
                      step={1}
                      className="[&_[role=slider]]:w-8 [&_[role=slider]]:h-8"
                    />
                  </div>

                  <div className="relative inline-block">
                    <div className={cn(
                      "text-8xl font-black mb-4 transition-colors",
                      getConfidenceColor(confidence[0])
                    )}>
                      {confidence[0]}%
                    </div>
                    <p className="text-lg font-bold text-muted-foreground min-h-[3rem]">
                      {getConfidenceMessage(confidence[0])}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between gap-4 pt-12">
              <Button variant="ghost" className="rounded-full px-8" onClick={() => setStep("upload")}>
                Back to Upload
              </Button>
              <Button
                size="lg"
                className="rounded-full px-12 h-14 font-bold shadow-xl shadow-primary/20"
                onClick={handleAnalyze}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <CircleNotch className="mr-2 w-5 h-5 animate-spin" />
                    Analyzing Content
                  </>
                ) : (
                  <>
                    Start Neural Analysis
                    <Sparkle className="ml-2 w-5 h-5" weight="fill" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Units */}
        {step === "units" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
              <p className="text-muted-foreground mt-2">We've identified the following study units from your documents</p>
            </div>

            <div className="grid gap-4">
              {extractedUnits.map((unit, index) => (
                <Card key={unit.id} className="rounded-xl border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold">{unit.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                          {unit.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {unit.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="rounded-full px-3 py-1">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-2xl min-w-[120px] text-center">
                        <p className={cn("text-2xl font-black", getConfidenceColor(unit.confidence))}>
                          {unit.confidence}%
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Accuracy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between gap-4 pt-12">
              <Button variant="ghost" className="rounded-full px-8" onClick={() => setStep("confidence")}>
                Go Back
              </Button>
              <Button className="rounded-full px-12 h-14 font-bold shadow-xl shadow-primary/20 group" asChild>
                <a href="/exam">
                  Begin Study Protocol
                  <CaretRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
