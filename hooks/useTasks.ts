// hooks/useTasks.ts
import { useState, useEffect } from 'react';
import apiFetch from '@/lib/api';
import type { ApplicationFormType, HTTPResponse, TaskFormType, TaskProps } from '@/types';
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';
import { Application } from '../types/index';

interface UseTasksReturn {
  tasks: TaskProps[];
  loading: boolean;
  refetch: (id:string | undefined) => Promise<void>;
}

export function useTasks(id:string|undefined, skip:boolean=false): UseTasksReturn {
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
      else{
         throw new Error(response.message) 
    }
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erreur lors du chargement.', 'error')
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(skip) return;

    fetchTasks(id);
  }, []);

  return { tasks, loading, refetch: (id:string | undefined)=> fetchTasks(id) };
}

interface UseManageTaskReturn {
  tasks: TaskProps[];
  loading: boolean;
  createTask: (task:TaskFormType)=> void,
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
            else throw new Error(newTask.message ?? 'Une erreur est survenue!');

        }catch(err){
            notify(err instanceof Error ? err.message : 'Erreur lors de la création de la tache.', 'error');
        }finally{
            setLoading(false)
        }
    }

    return {tasks, loading, createTask}
}

interface UseApplicationReturn {
  application: Application[],
  loading: boolean,
  applyTotask: (applyData: ApplicationFormType) => Promise<void>,
} 

export function useApplication(): UseApplicationReturn {
  const [application, setApplication] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const {notify} = useNotificationManager();

   const applyTotask = async (applyData: ApplicationFormType) => {
        try{
          setLoading(true);
          const applyresponse = await apiFetch<Application>(`api/tasks/${applyData.task_id}/apply`);
          
          if(Number(applyresponse.status) === 201 && applyresponse.success)
            notify('Votre candidature a été soumise avec succès.', 'success');
         throw new Error(applyresponse.message) 
        }catch(err){
            notify(err instanceof Error ? err.message : 'Une erreur est survenue: Candidature non soumise!', 'error');
        }finally{
          setLoading(false);
        }
    }

    const getApplication = async ()=>{
      
    }

    return {applyTotask, application, loading}
}