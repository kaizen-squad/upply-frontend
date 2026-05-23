import { useToasting } from "@/components/ui/Toast/useToasting";
import apiFetch from "@/lib/api";
import { ApplicationFormType, ApplicationResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseApplicationReturn {
  application: ApplicationResponse[],
  loading: boolean,
  applyTotask: (applyData: ApplicationFormType) => Promise<void>,
  rejectApplication: (application_id:string) => Promise<void>,
  acceptApplication: (application_id:string) => Promise<void>,
  getTaskApplication: (task_id:string, role:'client'|'prestataire') => Promise<void>,
} 


export function useApplication(): UseApplicationReturn {
  const [application, setApplication] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const {notify} = useToasting();
  const router = useRouter();

   const applyTotask = async (applyData: ApplicationFormType) => {
        try{
          setLoading(true);
          const applyresponse = await apiFetch<ApplicationResponse>(`api/applications/apply`, applyData, 'POST');
          
          if(applyresponse.success){
            notify('Votre candidature a été soumise avec succès.', 'success');
            setApplication([applyresponse.data]);
          }
          else throw new Error(applyresponse.message) 
        }catch(err){
            notify(err instanceof Error ? err.message : 'Une erreur est survenue: Candidature non soumise!', 'error');
        }finally{
          setLoading(false);
        }
    }

    const getTaskApplication = async (task_id:string, role:'client'|'prestataire'): Promise<void> => {
      try{
        setLoading(true);
        const response = await apiFetch<ApplicationResponse[]>(`api/tasks/${task_id}/applications${role === 'prestataire' ? '/me':''}`);
        if(response.success)
          setApplication(response.data);
        else
          notify(response.message, 'error');
      }catch(err){
        notify(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement de vos candidatures!', 'error');
      }finally{
        setLoading(false);
      }
    }
    const rejectApplication = async (application_id:string) => {
      try{
          setLoading(true);
          const applyresponse = await apiFetch<null>(`api/applications/reject`, {id:application_id}, 'DELETE');
          
          if(applyresponse.success)
            notify('Votre candidature a été retirée.', 'success');
          else throw new Error(applyresponse.message) 
        }catch(err){
            notify(err instanceof Error ? err.message : 'Une erreur est survenue: Candidature non retirée!', 'error');
        }finally{
          setLoading(false);
        }
    }

    const acceptApplication = async (application_id:string) => {
      try{
          setLoading(true);
          const applyresponse = await apiFetch<null>(`api/applications/accept`, {id:application_id}, 'PUT');
          
          if(applyresponse.success)
            notify('Votre candidature a été acceptée.', 'success');
          else throw new Error(applyresponse.message) 
        }catch(err){
            notify(err instanceof Error ? err.message : 'Une erreur est survenue: Candidature non acceptée!', 'error');
        }finally{
          setLoading(false);
        }
    }


    return {applyTotask, application, loading, rejectApplication, acceptApplication, getTaskApplication}
}
