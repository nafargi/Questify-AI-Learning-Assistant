import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GenerateNotesParams {
  courseId?: string;
  courseName: string;
  method: string;
  topic?: string;
}

export function useNotes() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNotes = async (params: GenerateNotesParams) => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-notes', {
        body: params,
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return { content: data.content, noteId: data.noteId };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to generate notes';
      toast.error(message);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      return [];
    }

    return data;
  };

  const deleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      toast.error('Failed to delete note');
      throw error;
    }

    toast.success('Note deleted');
  };

  return {
    isGenerating,
    generateNotes,
    fetchNotes,
    deleteNote,
  };
}