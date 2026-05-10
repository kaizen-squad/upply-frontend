+'use client'
import { useState, useEffect, useCallback } from 'react';
import apiFetch from '@/lib/api';
import type { ApplicationFormType, ApplicationResponse, CDashboardData, Deliverable, PDashboardData, Review, ReviewProps, TaskFormType, TaskProps } from '@/types';
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';
import { Application, DeliveryFormProps } from '@/types/index';
import { buildFormData } from '@/lib/utils';

export interface UseTasksReturn<T = ApplicationResponse | TaskProps> {
  tasks: T[];
  loading: boolean;
  refetch: (id:string | undefined) => Promise<void>;
  createTask: (taskData: TaskFormType) => Promise<void>;
  deliverTask: (deliverData: DeliveryFormProps) => Promise<boolean>;
  reviewPrestataire: (reviewData:ReviewProps) => Promise<void>
}

export const budgetCurrency = 'FCFA'

export function useTasks<T = ApplicationResponse | TaskProps>(id:string|undefined, skip:boolean=false): UseTasksReturn<T> {
  const [tasks, setTasks] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const {notify} = useNotificationManager();


  const fetchTasks = async (id:string | undefined) => {
   
    try { 
      setLoading(true);

      const response = await apiFetch<T[]>(`api/tasks${id ? `/${id}` : ''}`);
      if(response.data){
        const data:T[] = Array(1).fill(response.data).flat(Infinity)
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
        const data = buildFormData(taskData);
        const newTask = await apiFetch<object>('api/tasks', data, 'POST');
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
      const delivery = await apiFetch<Deliverable>(`api/tasks/${deliveryData.task_id}/deliver`, deliveryData, 'POST');
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

  const reviewPrestataire = async (reviewData:ReviewProps) => {
    try{
      setLoading(true);
        const delivery = await apiFetch<Review>(`api/tasks/${reviewData.task_id}/review`, reviewData, 'POST');
        if(delivery.success && delivery.status === 201){
          notify('Commentaire soumis. Merci de choisir Upply.', 'success');
        }else throw new Error(delivery.message)
      }catch(err){
        notify(err instanceof Error ? err.message : 'Un erreur est survenue lors de la soumission du commentaire', 'error');
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
    reviewPrestataire
  };
}


interface UseApplicationReturn {
  application: Application[],
  loading: boolean,
  applyTotask: (applyData: ApplicationFormType) => Promise<void>,
  deleteApplication: (application_id:string) => Promise<void>
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
          else throw new Error(applyresponse.message) 
        }catch(err){
            notify(err instanceof Error ? err.message : 'Une erreur est survenue: Candidature non soumise!', 'error');
        }finally{
          setLoading(false);
        }
    }

    const getApplication = async ()=>{
      
    }

    const deleteApplication = async (application_id:string) => {
      try{
          setLoading(true);
          const applyresponse = await apiFetch<null>(`api/applications/cancel`, {id:application_id}, 'DELETE');
          
          if(applyresponse.success)
            notify('Votre candidature a été retirée.', 'success');
          else throw new Error(applyresponse.message) 
        }catch(err){
            notify(err instanceof Error ? err.message : 'Une erreur est survenue: Candidature non retirée!', 'error');
        }finally{
          setLoading(false);
        }
    }

    return {applyTotask, application, loading, deleteApplication}
}


export interface UseDashboardReturn<T = CDashboardData | PDashboardData| undefined> {
  loading: boolean
  dashboardData: T | undefined
  loadDashboard: () => void,
  error: string | null
}

export function useDashboard<T = CDashboardData | PDashboardData | undefined>(
  role: 'client' | 'prestataire' = 'client'
): UseDashboardReturn<T> {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotificationManager();

  const loadDashboard = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFetch<T>(`api/dashboard/${role}`);
      
      if (response.success) {
        setDashboardData(response.data);
      } else {
        throw new Error(response.message || 'Erreur de chargement');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement';
      setError(message);
      notify(message, 'error');
    } finally {
      setLoading(false);
    }
  }, [role, loading, notify]);

  return {
    loadDashboard,
    loading,
    dashboardData,
    error,
  };
}