export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_insights: {
        Row: {
          action: string | null
          actionable: boolean | null
          created_at: string
          description: string
          dismissed: boolean | null
          id: string
          insight_type: string
          priority: string | null
          title: string
          user_id: string
        }
        Insert: {
          action?: string | null
          actionable?: boolean | null
          created_at?: string
          description: string
          dismissed?: boolean | null
          id?: string
          insight_type: string
          priority?: string | null
          title: string
          user_id: string
        }
        Update: {
          action?: string | null
          actionable?: boolean | null
          created_at?: string
          description?: string
          dismissed?: boolean | null
          id?: string
          insight_type?: string
          priority?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          progress: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          progress?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          progress?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      exam_questions: {
        Row: {
          correct_answer: string
          created_at: string
          difficulty: Database["public"]["Enums"]["difficulty_level"] | null
          exam_id: string
          explanation: string | null
          id: string
          is_correct: boolean | null
          is_flagged: boolean | null
          options: Json | null
          order_index: number | null
          question: string
          question_type: Database["public"]["Enums"]["question_type"] | null
          time_spent: number | null
          user_answer: string | null
          user_id: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          exam_id: string
          explanation?: string | null
          id?: string
          is_correct?: boolean | null
          is_flagged?: boolean | null
          options?: Json | null
          order_index?: number | null
          question: string
          question_type?: Database["public"]["Enums"]["question_type"] | null
          time_spent?: number | null
          user_answer?: string | null
          user_id: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          exam_id?: string
          explanation?: string | null
          id?: string
          is_correct?: boolean | null
          is_flagged?: boolean | null
          options?: Json | null
          order_index?: number | null
          question?: string
          question_type?: Database["public"]["Enums"]["question_type"] | null
          time_spent?: number | null
          user_answer?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          completed_at: string | null
          correct_answers: number | null
          course_id: string | null
          created_at: string
          difficulty: number | null
          id: string
          question_count: number | null
          question_types: string[] | null
          score: number | null
          started_at: string | null
          time_limit: number | null
          time_taken: number | null
          title: string | null
          total_questions: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          correct_answers?: number | null
          course_id?: string | null
          created_at?: string
          difficulty?: number | null
          id?: string
          question_count?: number | null
          question_types?: string[] | null
          score?: number | null
          started_at?: string | null
          time_limit?: number | null
          time_taken?: number | null
          title?: string | null
          total_questions?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          correct_answers?: number | null
          course_id?: string | null
          created_at?: string
          difficulty?: number | null
          id?: string
          question_count?: number | null
          question_types?: string[] | null
          score?: number | null
          started_at?: string | null
          time_limit?: number | null
          time_taken?: number | null
          title?: string | null
          total_questions?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          back: string
          course_id: string | null
          created_at: string
          difficulty: Database["public"]["Enums"]["difficulty_level"] | null
          front: string
          id: string
          last_reviewed: string | null
          mastered: boolean | null
          times_reviewed: number | null
          unit_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          back: string
          course_id?: string | null
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          front: string
          id?: string
          last_reviewed?: string | null
          mastered?: boolean | null
          times_reviewed?: number | null
          unit_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          back?: string
          course_id?: string | null
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          front?: string
          id?: string
          last_reviewed?: string | null
          mastered?: boolean | null
          times_reviewed?: number | null
          unit_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcards_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          confidence: number | null
          course_id: string | null
          created_at: string
          extracted_units: Json | null
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          confidence?: number | null
          course_id?: string | null
          created_at?: string
          extracted_units?: Json | null
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          confidence?: number | null
          course_id?: string | null
          created_at?: string
          extracted_units?: Json | null
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: Json
          course_id: string | null
          created_at: string
          id: string
          is_ai_generated: boolean | null
          method: string
          title: string
          unit_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: Json
          course_id?: string | null
          created_at?: string
          id?: string
          is_ai_generated?: boolean | null
          method?: string
          title: string
          unit_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          course_id?: string | null
          created_at?: string
          id?: string
          is_ai_generated?: boolean | null
          method?: string
          title?: string
          unit_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      planner_tasks: {
        Row: {
          completed: boolean | null
          course_id: string | null
          created_at: string
          day: string
          description: string | null
          duration: number | null
          end_time: string | null
          id: string
          priority: Database["public"]["Enums"]["task_priority"] | null
          start_time: string | null
          task_type: Database["public"]["Enums"]["study_type"] | null
          topic: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string
          day: string
          description?: string | null
          duration?: number | null
          end_time?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["task_priority"] | null
          start_time?: string | null
          task_type?: Database["public"]["Enums"]["study_type"] | null
          topic: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          course_id?: string | null
          created_at?: string
          day?: string
          description?: string | null
          duration?: number | null
          end_time?: string | null
          id?: string
          priority?: Database["public"]["Enums"]["task_priority"] | null
          start_time?: string | null
          task_type?: Database["public"]["Enums"]["study_type"] | null
          topic?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "planner_tasks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          average_score: number | null
          created_at: string
          current_streak: number | null
          email: string | null
          exams_completed: number | null
          full_name: string | null
          id: string
          longest_streak: number | null
          total_study_time: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          average_score?: number | null
          created_at?: string
          current_streak?: number | null
          email?: string | null
          exams_completed?: number | null
          full_name?: string | null
          id?: string
          longest_streak?: number | null
          total_study_time?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          average_score?: number | null
          created_at?: string
          current_streak?: number | null
          email?: string | null
          exams_completed?: number | null
          full_name?: string | null
          id?: string
          longest_streak?: number | null
          total_study_time?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          course_id: string | null
          created_at: string
          duration: number
          ended_at: string | null
          id: string
          performance: number | null
          session_type: Database["public"]["Enums"]["study_type"]
          started_at: string
          user_id: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          duration: number
          ended_at?: string | null
          id?: string
          performance?: number | null
          session_type: Database["public"]["Enums"]["study_type"]
          started_at?: string
          user_id: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          duration?: number
          ended_at?: string | null
          id?: string
          performance?: number | null
          session_type?: Database["public"]["Enums"]["study_type"]
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          mastery: number | null
          order_index: number | null
          title: string
          topics: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          mastery?: number | null
          order_index?: number | null
          title: string
          topics?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          mastery?: number | null
          order_index?: number | null
          title?: string
          topics?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          last_course_id: string | null
          notifications_enabled: boolean | null
          preferred_note_method: string | null
          recent_courses: string[] | null
          sidebar_collapsed: boolean | null
          theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_course_id?: string | null
          notifications_enabled?: boolean | null
          preferred_note_method?: string | null
          recent_courses?: string[] | null
          sidebar_collapsed?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_course_id?: string | null
          notifications_enabled?: boolean | null
          preferred_note_method?: string | null
          recent_courses?: string[] | null
          sidebar_collapsed?: boolean | null
          theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_last_course_id_fkey"
            columns: ["last_course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weak_areas: {
        Row: {
          accuracy: number | null
          course_id: string | null
          created_at: string
          how_to_fix: string | null
          id: string
          mistake_pattern: string | null
          recommendation: string | null
          suggested_methods: string[] | null
          topic: string
          updated_at: string
          user_id: string
          why_struggling: string | null
        }
        Insert: {
          accuracy?: number | null
          course_id?: string | null
          created_at?: string
          how_to_fix?: string | null
          id?: string
          mistake_pattern?: string | null
          recommendation?: string | null
          suggested_methods?: string[] | null
          topic: string
          updated_at?: string
          user_id: string
          why_struggling?: string | null
        }
        Update: {
          accuracy?: number | null
          course_id?: string | null
          created_at?: string
          how_to_fix?: string | null
          id?: string
          mistake_pattern?: string | null
          recommendation?: string | null
          suggested_methods?: string[] | null
          topic?: string
          updated_at?: string
          user_id?: string
          why_struggling?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "weak_areas_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      difficulty_level: "easy" | "medium" | "hard"
      question_type:
        | "mcq"
        | "true-false"
        | "fill-blank"
        | "matching"
        | "short-answer"
        | "coding"
        | "debugging"
        | "essay"
        | "ordering"
        | "diagram"
        | "case-study"
        | "calculation"
      study_type: "exam" | "flashcards" | "notes" | "review"
      task_priority: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      difficulty_level: ["easy", "medium", "hard"],
      question_type: [
        "mcq",
        "true-false",
        "fill-blank",
        "matching",
        "short-answer",
        "coding",
        "debugging",
        "essay",
        "ordering",
        "diagram",
        "case-study",
        "calculation",
      ],
      study_type: ["exam", "flashcards", "notes", "review"],
      task_priority: ["low", "medium", "high"],
    },
  },
} as const
