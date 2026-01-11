import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Material {
  id: string;
  name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  status: string;
  confidence: number | null;
  extracted_units: any;
  created_at: string;
}

export function useMaterials() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchMaterials = async () => {
    if (!user) {
      setMaterials([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching materials:', error);
    } else {
      setMaterials(data || []);
    }
    setLoading(false);
  };

  const uploadMaterial = async (file: File) => {
    if (!user) return null;

    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create material record
      const { data, error: insertError } = await supabase
        .from('materials')
        .insert({
          user_id: user.id,
          name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          status: 'processing',
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast.success('Material uploaded');
      await fetchMaterials();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to upload material';
      toast.error(message);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const analyzeMaterial = async (materialId: string, fileName: string, confidence: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('analyze-material', {
        body: { materialId, fileName, confidence },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      await fetchMaterials();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to analyze material';
      toast.error(message);
      throw error;
    }
  };

  const deleteMaterial = async (materialId: string, filePath: string) => {
    try {
      // Delete from storage
      await supabase.storage.from('materials').remove([filePath]);

      // Delete record
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', materialId);

      if (error) throw error;

      toast.success('Material deleted');
      await fetchMaterials();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete material';
      toast.error(message);
      throw error;
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [user]);

  return {
    materials,
    loading,
    uploading,
    fetchMaterials,
    uploadMaterial,
    analyzeMaterial,
    deleteMaterial,
  };
}