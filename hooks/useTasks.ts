// hooks/useTasks.ts
import { useState, useEffect } from 'react';
import apiFetch from '@/lib/api';
import type { HTTPResponse, TaskFormType, TaskProps } from '@/types';
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

interface UseManageTaskReturn {
  tasks: TaskProps[];
  loading: boolean;
  createTask: (task:TaskFormType)=> void
}

export function useManageTasks(): UseManageTaskReturn {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [loading, setLoading] = useState(true);
    const {notify} = useNotificationManager();

    const createTask = async (taskData:TaskFormType) => {
        try{
            setLoading(true);
            const newTask = await apiFetch<object>('api/tasks', taskData, 'POST');
            if(newTask.success)
                notify('Nouvelle tache ajoutée.', 'success');
            else notify(newTask.message ?? 'Une erreur est survenue!', 'error');

        }catch(err){
            notify(err instanceof Error ? err.message : 'Erreur lors de la création de la tache.', 'error');
        }finally{
            setLoading(false)
        }
    }

    return {tasks, loading, createTask}
}