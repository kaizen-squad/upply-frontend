import { useToasting } from "@/components/ui/Toast/useToasting";
import apiFetch from "@/lib/api";
import { PrestataireSelectedData } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export interface UsePaymentReturn {
  loading: boolean,
  proceedToPayment: (data: { application_id: string, task_id: string, prestataire_name: string }) => Promise<void>,
  liberatefunds: (deliverable_id:string) => Promise<boolean>,
  verifyPayment: (task_id:string, transaction_id:string)=>Promise<void>,
  deleteSavedApplicant: ()=> Promise<void>
}

export function usePayment() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {notify} = useToasting();
  const proceedToPayment = useCallback(async (data: PrestataireSelectedData) => {
  try{
      setLoading(true);
      const saveApplicant = await apiFetch<null>('/api/applications', data, 'POST');
      if(saveApplicant.success){
       notify('Candidature sauvegardée. Procédez au paiement.', 'success');
        router.push(`/client/tasks/${data.task_id}/payment`);
      }          
      else { 
          if(saveApplicant.message)
            notify(saveApplicant.message,'error');
          else throw new Error(saveApplicant.message)
        }
    }catch{
        notify('Une erreur est survenue lors de l\'acceptation de la candidature!', 'error');
    }finally{
      setLoading(false);
    }
  }, [router, notify]);

  const liberatefunds = useCallback(async (deliverable_id:string)=> {
      try{
      setLoading(true);
      const liberate = await apiFetch<null>(`api/deliverables/validate/${deliverable_id}`, undefined, 'POST');
      if(liberate.success){
        router.push(`/client/dashboard`);
        notify('Votre mission est maintenant achevée', 'success'); 
        return true
      }          
      else{ 
          const error = 'Une erreur est survenue lors de la liberation des fonds!';
          notify(error,'error'); 
      }
    }catch{
        notify('Une erreur est survenue lors de la liberation des fonds!', 'error');
    }finally{
      setLoading(false);
    }
    return false
  }, [router, notify]);

  const verifyPayment = useCallback(async (task_id:string, transaction_id:string) => {
      try{
      setLoading(true);
      const verify = await apiFetch<null>(`api/tasks/${task_id}/payment/verify`, {transaction_id:transaction_id}, 'POST');
      if(verify.success){
        const deleteCookie = await apiFetch<null>('/api/applications', undefined, 'DELETE')  
        if(deleteCookie.success){
          router.push('/client/dashboard');
          notify('Paiement effectué avec succès.', 'success')
          return true;
        }
      }          
      else{ 
          if(verify.message)
            notify(verify.message,'error');
          else throw new Error(verify.message)

      }
    }catch{
        notify('Erreur lors du paiement.', 'error');
    }finally{
      setLoading(false);
    }
    return false
  }, [router, notify]);

  const deleteSavedApplicant = useCallback(async ()=>{
    await apiFetch('/api/applications', undefined, 'DELETE')
  }, []);

  return{
    loading,
    proceedToPayment,
    liberatefunds,
    verifyPayment,
    deleteSavedApplicant
  }
}
