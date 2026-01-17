import { useState } from "react";
import { ChapterStructure } from "@/components/study/ChapterContent";
import { MOCK_CHAPTERS } from "@/data/mockChapters";

interface GenerateChapterParams {
  courseName: string;
  chapterTitle: string;
}

export function useChapter() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [chapterContent, setChapterContent] = useState<ChapterStructure | null>(null);

  const generateChapter = async (params: GenerateChapterParams) => {
    setIsGenerating(true);
    
    // Simulate AI generation time to maintain "AI Feel"
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Look up content in our robust mock registry
      const foundContent = MOCK_CHAPTERS[params.chapterTitle];
      
      if (foundContent) {
        setChapterContent(foundContent);
        return foundContent;
      }

      // Dynamic fallback for unmocked chapters to ensure the app never breaks
      const fallbackContent: ChapterStructure = {
        introduction: `This comprehensive guide explores ${params.chapterTitle} within the context of ${params.courseName}. It covers the theoretical foundations, practical applications, and emerging trends in the field... [This is a fallback for ${params.chapterTitle} while we expand the curriculum].`,
        learningObjectives: [
          `Master the core principles of ${params.chapterTitle}`,
          "Apply theoretical models to real-world scenarios",
          "Analyze performance metrics and optimization strategies"
        ],
        sections: [
          {
            title: `Foundations of ${params.chapterTitle}`,
            content: `A deep dive into the historical development and fundamental axioms of ${params.chapterTitle}. This section provides the necessary background for advanced study...`,
            subsections: [
              {
                title: "Core Mechanics",
                content: "Detailed explanation of the inner workings and processes..."
              }
            ],
            keyConcepts: ["Abstract Model", "Implementation", "Scaling"],
            exampleBox: {
              title: "Case in Point",
              content: "A detailed example demonstrating the concept in action."
            }
          }
        ],
        caseStudy: {
          title: "Industry Application",
          content: "How large-scale organizations implement these principles in production environments.",
          discussionQuestions: ["What are the primary hurdles?", "How is scalability ensured?"]
        },
        summary: `Mastery of ${params.chapterTitle} is essential for expertise in ${params.courseName}.`,
        practiceProblems: ["Solve for X...", "Explain the relationship between A and B..."]
      };

      setChapterContent(fallbackContent);
      return fallbackContent;
    } catch (error: unknown) {
      console.error('Mock generation error:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    chapterContent,
    generateChapter,
    setChapterContent,
  };
}
