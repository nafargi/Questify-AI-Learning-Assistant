import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface PlannerTask {
  id: string;
  course_id: string | null;
  topic: string;
  description: string | null;
  task_type: string;
  priority: string;
  day: string;
  start_time: string | null;
  end_time: string | null;
  duration: number | null;
  completed: boolean;
  created_at: string;
}

export function usePlanner() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('planner_tasks')
      .select('*')
      .order('day')
      .order('start_time');

    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const createTask = async (task: {
    courseId?: string;
    topic: string;
    description?: string;
    taskType?: string;
    priority?: string;
    day: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
  }) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('planner_tasks')
      .insert([{
        user_id: user.id,
        course_id: task.courseId || null,
        topic: task.topic,
        description: task.description || null,
        task_type: task.taskType || 'review',
        priority: task.priority || 'medium',
        day: task.day,
        start_time: task.startTime || null,
        end_time: task.endTime || null,
        duration: task.duration || null,
      } as any])
      .select()
      .single();

    if (error) {
      toast.error('Failed to create task');
      throw error;
    }

    toast.success('Task added');
    await fetchTasks();
    return data;
  };

  const toggleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const { error } = await supabase
      .from('planner_tasks')
      .update({ completed: !task.completed })
      .eq('id', taskId);

    if (error) {
      toast.error('Failed to update task');
      throw error;
    }

    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('planner_tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      toast.error('Failed to delete task');
      throw error;
    }

    toast.success('Task deleted');
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    toggleComplete,
    deleteTask,
  };
}