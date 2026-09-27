import { useToasting } from "@/components/ui/Toast/useToasting";
import apiFetch from "@/lib/api";
import { useApplicationsStore } from "@/hooks/store";
import { ApplicationFormType, ApplicationResponse } from "@/types";
import { useCallback, useState } from "react";

interface UseApplicationReturn {
  /** Applications currently held in the shared store. */
  application: ApplicationResponse[],
  /** Whether an application request is in progress. */
  loading: boolean,
  /** Submits a candidature for a task. */
  applyTotask: (task_id:string, applyData: ApplicationFormType) => Promise<void>,
  /** Rejects an application and updates the shared application state. */
  rejectApplication: (application_id:string) => Promise<void>,
  /** Accepts an application, updates shared state, and reports success. */
  acceptApplication: (application_id:string) => Promise<boolean>,
  /** Loads applications for a task in the context of the supplied role. */
  getTaskApplication: (task_id:string, role:'client'|'prestataire') => Promise<void>,
}


/**
 * Loads and mutates the application's shared mission-candidature state.
 *
 * Successful accept/reject actions update the Zustand store so subscribed UI refreshes
 * immediately; request failures are reported through notifications.
 *
 * @returns Current candidatures, loading state, and application actions.
 */
export function useApplication(): UseApplicationReturn {
  const application = useApplicationsStore((state) => state.applications);
  const setApplication = useApplicationsStore((state) => state.setApplications);
  const updateTaskStatus = useApplicationsStore((state) => state.updateApplicationStatus);
  const [loading, setLoading] = useState(true);
  const {notify} = useToasting();

   const applyTotask = async (task_id:string, applyData: ApplicationFormType) => {
        try{
          setLoading(true);
          const applyresponse = await apiFetch<ApplicationResponse>(`api/tasks/${task_id}/apply`, applyData, 'POST');
          
          if(applyresponse.success){
            notify('Votre candidature a été soumise avec succès.', 'success');
            setApplication(Array.isArray(applyresponse.data) ? applyresponse.data : [applyresponse.data]);
          }
          else notify(applyresponse.message, 'error');

        }catch{
            notify('Une erreur est survenue: Candidature non soumise!', 'error');
        }finally{
          setLoading(false);
        }
    }

    const getTaskApplication = useCallback(async (task_id:string, role:'client'|'prestataire'): Promise<void> => {
      try{
        setLoading(true);
        const response = await apiFetch<ApplicationResponse[]>(`api/tasks/${task_id}/applications${role === 'prestataire' ? '/me':''}`);
        if(response.success)
          setApplication(Array.isArray(response.data) ? response.data : [response.data]);
        else{
          if(response.status === 404){
            setApplication([]);
          }else{
            notify(response.message, 'error');  
          }
        }
          
      }catch{
        notify('Une erreur est survenue lors du chargement de vos candidatures!', 'error');
      }finally{
        setLoading(false);
      }
    }, [notify, setApplication]);
    const rejectApplication = async (application_id:string) => {
      try{
          setLoading(true);
          const applyresponse = await apiFetch<null>(`api/application/${application_id}/reject`, undefined, 'PUT');
          
          if(applyresponse.success){
            notify('La candidature a été rejetée.', 'success');
            updateTaskStatus(application_id, 'REJETEE');
          }
          else { 
          if(applyresponse.message)
            notify(applyresponse.message,'error');
          else throw new Error(applyresponse.message)
          }
        }catch{
            notify('Une erreur est survenue: Candidature non retirée!', 'error');
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
            updateTaskStatus(application_id, 'ACCEPTEE');
            return true;
          }
          else { 
            if(applyresponse.message)
              notify(applyresponse.message,'error');
          else throw new Error(applyresponse.message)
          }
        }catch{
            notify('Une erreur est survenue: Candidature non acceptée!', 'error');
        }finally{
          setLoading(false);
        }
        return false;
    };

    return {applyTotask, application, loading, rejectApplication, acceptApplication, getTaskApplication}
}
