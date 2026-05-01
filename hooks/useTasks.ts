// hooks/useTasks.ts
import { useState, useEffect } from 'react';
import apiFetch from '@/lib/api';
import type { ApplicationFormType, Deliverable, TaskFormType, TaskProps } from '@/types';
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';
import { Application, DeliveryFormProps } from '../types/index';

interface UseTasksReturn {
  tasks: TaskProps[];
  loading: boolean;
  refetch: (id:string | undefined) => Promise<void>;
  createTask: (taskData: TaskFormType)=> Promise<void>;
  deliverTask: (deliverData: DeliveryFormProps)=> Promise<boolean>;
}

export const budgetCurrency = 'FCFA'

export function useTasks(id:string|undefined, skip:boolean=false): UseTasksReturn {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(true);
  const {notify} = useNotificationManager();

  const fetchTasks = async (id:string | undefined) => {
   
    try { 
      setLoading(true);
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

  const createTask = async (taskData:TaskFormType) => {
    try{
        setLoading(true);
        const newTask = await apiFetch<object>('api/tasks', taskData, 'POST');
        if(newTask.success)
            notify('Nouvelle tache ajoutée.', 'success');
          else throw new Error(newTask.message);
      }catch(err){
        notify(err instanceof Error ? err.message : 'Erreur lors de la création de la tache.', 'error');
      }finally{
        setLoading(false)
      }
  }

  const deliverTask = async (deliveryData:DeliveryFormProps) => {
    try{
      setLoading(true);
      const delivery = await apiFetch<Deliverable>(`api/tasks/${deliveryData.task_id}/deliver`, deliverTask, 'POST');
      if(delivery.success && delivery.status === 201){
        notify('Livrable soumis! En attente de review.', 'success');
        return true
      }else throw new Error(delivery.message)
    }catch(err){
      notify(err instanceof Error ? err.message : 'Livrable non soumis. Un erreur est survenue', 'error');
      return false;
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(skip) return;

    fetchTasks(id);
  }, []);

  return { 
    tasks, 
    loading,
    refetch: (id:string | undefined)=> fetchTasks(id), 
    createTask,
    deliverTask, 
  };
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
          const applyresponse = await apiFetch<Application>(`api/tasks/${applyData.task_id}/apply`, applyData, 'POST');
          
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
