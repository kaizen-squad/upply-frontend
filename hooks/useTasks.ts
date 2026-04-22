// hooks/useTasks.ts
import { useState, useEffect } from 'react';
import apiFetch from '@/lib/api';
import type { TaskProps } from '@/types';
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';

interface UseTasksReturn {
  tasks: TaskProps[];
  loading: boolean;
  refetch: () => void;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(true);
  const {notify} = useNotificationManager();

  const fetchTasks = async () => {
    setLoading(true);
    
    try {
      const response = await apiFetch<TaskProps[]>('api/tasks');
      if(response.data)
        setTasks(response.data);
      else throw ''
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erreur lors du chargement', 'error')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, refetch: fetchTasks };
}