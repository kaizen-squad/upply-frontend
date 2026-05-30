'use client'
import { useState, useEffect } from 'react';
import apiFetch from '@/lib/api';
import type { Deliverable, Review, ReviewProps, TaskFormType, TaskProps } from '@/types';
import { DeliveryFormProps } from '@/types/index';
import { useRouter } from 'next/navigation';
import { useToasting } from '@/components/ui/Toast/useToasting';

export interface UseTasksReturn<T = TaskProps> {
  tasks: T[];
  loading: boolean;
  refetch: (id:string | undefined) => Promise<void>;
  createTask: (taskData: TaskFormType) => Promise<boolean>;
  deliverTask: (deliverData: DeliveryFormProps) => Promise<boolean>;
  reviewPrestataire: (reviewData:ReviewProps) => Promise<boolean>;
  deleteTask: (task_id:string)=> Promise<void>;
  editTask:(taskData: TaskProps) => Promise<boolean>;
}

export const budgetCurrency = 'FCFA'

export function useTasks<T =  TaskProps>(id:string|undefined, skip:boolean=false): UseTasksReturn<T> {
  const [tasks, setTasks] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
    const {notify} = useToasting();
  const router = useRouter()

  const fetchTasks = async (id:string | undefined) => {
   
    try { 
      setLoading(true);

      const response = await apiFetch<T[]>(`api/tasks${id ? `/${id}` : ''}`);
      if(response.data){
        const data:T[] = Array(1).fill(response.data).flat(Infinity)
        setTasks(data);
      }
      else{ 
          if(response.message)
            notify(response.message,'error');
          else throw ''
      }
    } catch (err) {
      notify('Erreur lors du chargement.', 'error')
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData:TaskFormType) => {
    try{
        setLoading(true);
        const newTask = await apiFetch<TaskProps>('api/tasks', taskData, 'POST');
        console.debug('createTask response', newTask);
        if(newTask.success){
          notify('Nouvelle tache ajoutée.', 'success');
          return true
        }else{ 
          if(newTask.message)
            notify(newTask.message,'error');
          else throw ''
        }
      }catch(err){
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
        console.debug('delete response', deleteT);
        if(deleteT.success){
          notify('Mission supprimée!', 'success');
          router.push('/client/dashboard');
        }else {
          if(deleteT.message)
            notify(deleteT.message,'error');
          else throw ''
        }
      }catch(err){
        notify('Erreur lors de la suppression.', 'error');
      }finally{
        setLoading(false)
      }
  }

  const editTask = async (taskData:TaskProps) => {
    try{
        setLoading(true);
        const edit = await apiFetch<TaskProps>(`api/tasks/${taskData.id}`, taskData, 'PUT');
        console.debug('Edit response', edit);
        if(edit.success){
          notify('La tache a été modifiée.', 'success');
          return true
        } else {
          if(edit.message)
            notify(edit.message,'error');
          else throw ''
        };
      }catch(err){
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
        console.log(delivery.message)
        if(delivery.message)
          notify(delivery.message, 'error')
        else throw ''
      }
    }catch(err){
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
        if(delivery.success && delivery.status === 201){
          notify('Commentaire soumis. Merci de choisir Upply.', 'success');
          return true;
        }else {
          if(delivery.message){
            notify(delivery.message, 'error')
          }else throw ''
        }
      }catch(err){
        notify('Un erreur est survenue lors de la soumission du commentaire', 'error');
      }finally{
        setLoading(false)
      }
      return false;
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
    reviewPrestataire,
    deleteTask,
    editTask  
  };
}
