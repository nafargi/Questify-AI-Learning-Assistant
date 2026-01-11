-- Fix function search path mutable warning
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create storage bucket for materials
INSERT INTO storage.buckets (id, name, public)
VALUES ('materials', 'materials', false);

-- RLS policies for materials bucket
CREATE POLICY "Users can upload own materials"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'materials' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view own materials"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'materials' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own materials"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'materials' AND
  auth.uid()::text = (storage.foldername(name))[1]
);