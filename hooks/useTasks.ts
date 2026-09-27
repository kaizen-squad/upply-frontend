'use client'
import { useState, useEffect, useCallback } from 'react';
import apiFetch from '@/lib/api';
import type { Deliverable, Review, ReviewProps, TaskCollectionResponse, TaskFormType, TaskProps } from '@/types';
import { DeliveryFormProps } from '@/types/index';
import { useRouter } from 'next/navigation';
import { useToasting } from '@/components/ui/Toast/useToasting';

export interface UseTasksReturn<T = TaskProps> {
  /** Current task collection. */
  tasks: T[];
  /** Whether a task request or mutation is in progress. */
  loading: boolean;
  /** Reloads all tasks or the task identified by `id`. */
  refetch: (id:string | undefined) => Promise<void>;
  /** Creates a task and reports whether the request succeeded. */
  createTask: (taskData: TaskFormType) => Promise<boolean>;
  /** Submits a deliverable and reports whether the request succeeded. */
  deliverTask: (deliverData: DeliveryFormProps) => Promise<boolean>;
  /** Submits a review and reports whether the request succeeded. */
  reviewPrestataire: (reviewData:ReviewProps) => Promise<boolean>;
  /** Deletes a task and returns to the client dashboard on success. */
  deleteTask: (task_id:string)=> Promise<void>;
  /** Updates a task and reports whether the request succeeded. */
  editTask:(taskData: TaskProps) => Promise<boolean>;
  /** Loads the first review associated with a task, when present. */
  getReview: (task_id: string) => Promise<ReviewProps | undefined>
}

export const budgetCurrency = 'FCFA'

/**
 * Normalizes the task response variants accepted by the API into a list.
 *
 * @typeParam T - Task item type.
 * @param payload - A task, task array, paginated collection, or null response.
 * @returns A task array; null or an invalid collection becomes an empty array.
 */
function normalizeTaskCollection<T>(payload: T | T[] | TaskCollectionResponse<T> | null): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === 'object' && 'tasks' in payload) {
    const tasks = payload.tasks;
    return Array.isArray(tasks) ? tasks as T[] : [];
  }

  return payload && typeof payload === 'object' ? [payload as T] : [];
}

/**
 * Loads mission data and exposes task creation, editing, delivery, review, and deletion actions.
 *
 * @typeParam T - Task item type returned by the backend.
 * @param id - Optional mission identifier; omitted to request the collection.
 * @param skip - When true, skips the initial automatic request.
 * @returns Task data, loading state, and mission actions.
 */
export function useTasks<T =  TaskProps>(id:string|undefined, skip:boolean=false): UseTasksReturn<T> {
  const [tasks, setTasks] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
    const {notify} = useToasting();
  const router = useRouter();

  const fetchTasks = useCallback(async (id:string | undefined) => {
   
    try { 
      setLoading(true);

      const response = await apiFetch<T[] | T | TaskCollectionResponse<T>>(`api/tasks${id ? `/${id}` : ''}`);
      if (response.success) {
        setTasks(normalizeTaskCollection(response.data));
      } else {
        notify(response.message || 'Une erreur est survenue lors du chargement.', 'error');
      }
    } catch {
      notify('Erreur lors du chargement.', 'error')
    } finally {
      setLoading(false);
    }
  }, [notify]);

  const createTask = async (taskData:TaskFormType) => {
    try{
        setLoading(true);
        const newTask = await apiFetch<TaskProps>('api/tasks', taskData, 'POST');
        if(newTask.success){
          notify('Nouvelle tache ajoutée.', 'success');
          return true
        }else{ 
          if(newTask.message)
            notify(newTask.message,'error');
          else throw new Error(newTask.message)
        }
      }catch{
        notify('Erreur lors de la création de la tache.', 'error');
      }finally{
        setLoading(false)
      }
      return false
  }

    const deleteTask = async (task_id:string) => {
    try{
        setLoading(true);
        const deleteT = await apiFetch<TaskProps>(`api/tasks/${task_id}`, undefined, 'DELETE');
        if(deleteT.success){
          notify('Mission supprimée!', 'success');
          router.push('/client/dashboard');
        }else {
          if(deleteT.message)
            notify(deleteT.message,'error');
          else throw new Error(deleteT.message)
        }
      }catch{
        notify('Erreur lors de la suppression.', 'error');
      }finally{
        setLoading(false)
      }
  }

  const editTask = async (taskData:TaskProps) => {
    try{
        setLoading(true);
        const edit = await apiFetch<TaskProps>(`api/tasks/${taskData.id}`, taskData, 'PUT');
        if(edit.success){
          notify('La tache a été modifiée.', 'success');
          return true
        } else {
          if(edit.message)
            notify(edit.message,'error');
          else throw new Error(edit.message)
        };
      }catch{
        notify("Erreur lors de l'édition.", 'error');
      }finally{
        setLoading(false)
      }
      return false
  }

  const deliverTask = async (deliveryData:DeliveryFormProps) => {
    try{
      setLoading(true);
      const delivery = await apiFetch<Deliverable>(`api/deliverables/submit`, deliveryData, 'POST');
      if(delivery.success){
        notify('Livrable soumis! En attente de review.', 'success');
        return true
      }else {
        if(delivery.message)
          notify(delivery.message, 'error')
          else throw new Error(delivery.message)
      }
    }catch{
      notify('Livrable non soumis. Un erreur est survenue', 'error');
      return false;
    }finally{
      setLoading(false)
    }          
    return false;
  }

  const reviewPrestataire = async (reviewData:ReviewProps) => {
    try{
      setLoading(true);
        const delivery = await apiFetch<Review>(`api/tasks/${reviewData.task_id}/review`, reviewData, 'POST');
        if(delivery.success){
          notify('Commentaire soumis. Merci de choisir Upply.', 'success');
          return true;
        }else {
          if(delivery.message){
            notify(delivery.message, 'error')
          }
          else throw new Error(delivery.message)
        }
      }catch{
        notify('Un erreur est survenue lors de la soumission du commentaire', 'error');
      }finally{
        setLoading(false)
      }
      return false;
  }

  const getReview = useCallback(async (task_id: string) => {
      try{
        const review = await apiFetch<ReviewProps[]>(`api/tasks/${task_id}/review`);
        if(review.success)
          return review.data[0]
        return ;
      }catch{
        notify('Une erreur est survenue!', 'error');
      }        
      
      return ;
  }, [notify]);
  const refetch = useCallback((id: string | undefined) => fetchTasks(id), [fetchTasks]);
  useEffect(() => {
    if(skip) return;

    void Promise.resolve().then(() => fetchTasks(id));
  }, [fetchTasks, id, skip]);


  return { 
    tasks, 
    loading,
    refetch,
    createTask,
    deliverTask, 
    reviewPrestataire,
    deleteTask,
    editTask,
    getReview  
  };
}
