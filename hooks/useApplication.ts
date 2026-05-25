import { useToasting } from "@/components/ui/Toast/useToasting";
import apiFetch from "@/lib/api";
import { ApplicationFormType, ApplicationResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseApplicationReturn {
  application: ApplicationResponse[],
  loading: boolean,
  applyTotask: (task_id:string, applyData: ApplicationFormType) => Promise<void>,
  rejectApplication: (application_id:string) => Promise<void>,
  acceptApplication: (application_id:string) => Promise<boolean>,
  getTaskApplication: (task_id:string, role:'client'|'prestataire') => Promise<void>,
} 


export function useApplication(): UseApplicationReturn {
  const [application, setApplication] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const {notify} = useToasting();

   const applyTotask = async (task_id:string, applyData: ApplicationFormType) => {
        try{
          setLoading(true);
          const applyresponse = await apiFetch<ApplicationResponse>(`api/${task_id}/apply`, applyData, 'POST');
          
          if(applyresponse.success){
            notify('Votre candidature a été soumise avec succès.', 'success');
            setApplication([applyresponse.data].flat(3));
          }
          else notify(applyresponse.message, 'error');

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
          setApplication([response.data].flat(3));
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
            notify('La candidature a été rejetée.', 'success');
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
          const applyresponse = await apiFetch<null>(`api/application/${application_id}/accept`, {}, 'PUT');
          
          if(applyresponse.success){
            notify('La candidature a été acceptée.', 'success');
            return true;
          }
          else throw new Error(applyresponse.message) 
        }catch(err){
            notify(err instanceof Error ? err.message : 'Une erreur est survenue: Candidature non acceptée!', 'error');
        }finally{
          setLoading(false);
        }
        return false;
    }


    return {applyTotask, application, loading, rejectApplication, acceptApplication, getTaskApplication}
}
