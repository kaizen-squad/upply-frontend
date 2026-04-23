// hooks/useTasks.ts
import { useState, useEffect } from 'react';
import apiFetch from '@/lib/api';
import type { TaskProps } from '@/types';
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';

interface UseTasksReturn {
  tasks: TaskProps[];
  loading: boolean;
  refetch: (id:string | undefined) => Promise<void>;
}

export function useTasks(id:string|undefined): UseTasksReturn {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(true);
  const {notify} = useNotificationManager();

  const fetchTasks = async (id:string | undefined) => {
    setLoading(true);
    
    try {
      const response = await apiFetch<TaskProps[] | TaskProps>(`api/tasks${id ? `/${id}` : ''}`);
      if(response.data){
        const data:TaskProps[] = Array(1).fill(response.data).flat(Infinity)
        setTasks(data);
      }
        
      else throw ''
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erreur lors du chargement', 'error')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(id);
  }, []);

  return { tasks, loading, refetch: (id:string | undefined)=> fetchTasks(id) };
}