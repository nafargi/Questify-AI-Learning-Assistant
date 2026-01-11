import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Course {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  color: string;
  progress: number;
  created_at: string;
}

interface Unit {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  topics: string[];
  mastery: number;
}

export function useCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    if (!user) {
      setCourses([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
    } else {
      setCourses(data || []);
    }
    setLoading(false);
  };

  const createCourse = async (course: {
    name: string;
    description?: string;
    icon?: string;
    color?: string;
  }) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('courses')
      .insert({
        user_id: user.id,
        name: course.name,
        description: course.description,
        icon: course.icon || '📚',
        color: course.color || 'primary',
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to create course');
      throw error;
    }

    toast.success('Course created');
    await fetchCourses();
    return data;
  };

  const fetchUnits = async (courseId: string): Promise<Unit[]> => {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');

    if (error) {
      console.error('Error fetching units:', error);
      return [];
    }

    return data || [];
  };

  const createUnit = async (unit: {
    courseId: string;
    title: string;
    description?: string;
    topics?: string[];
  }) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('units')
      .insert({
        user_id: user.id,
        course_id: unit.courseId,
        title: unit.title,
        description: unit.description,
        topics: unit.topics || [],
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to create unit');
      throw error;
    }

    return data;
  };

  const deleteCourse = async (courseId: string) => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (error) {
      toast.error('Failed to delete course');
      throw error;
    }

    toast.success('Course deleted');
    await fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, [user]);

  return {
    courses,
    loading,
    fetchCourses,
    createCourse,
    fetchUnits,
    createUnit,
    deleteCourse,
  };
}