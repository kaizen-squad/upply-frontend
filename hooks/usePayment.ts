import { useToasting } from "@/components/ui/Toast/useToasting";
import apiFetch from "@/lib/api";
import { PrestataireSelectedData } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface UsePaymentReturn {
  loading: boolean,
  proceedToPayment: (data: { application_id: string, task_id: string, prestataire_name: string }) => Promise<void>,
  liberatefunds: (deliverable_id:string) => Promise<boolean>,
  verifyPayment: (task_id:string)=>Promise<void>,
  deleteSavedApplicant: ()=> Promise<void>
}

export function usePayment<UsePaymentReturn >() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {notify} = useToasting();
  const proceedToPayment = async (data: PrestataireSelectedData) => {
  try{
      setLoading(true);
      const saveApplicant = await apiFetch<null>('/api/applications', data, 'POST');
      if(saveApplicant.success){
       notify('Candidature sauvegardée. Procédez au paiement.', 'success');
        router.push(`/client/tasks/${data.task_id}/payment`);
      }          
      else throw new Error(saveApplicant.message)
    }catch(err){
        notify(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'acceptation de la candidature!', 'error');
    }finally{
      setLoading(false);
    }
  }

  const liberatefunds = async (deliverable_id:string)=> {
      try{
      setLoading(true);
      const liberate = await apiFetch<null>(`/api/deliverables/validate/${deliverable_id}`, undefined, 'POST');
      if(liberate.success){
        router.push(`/client/dashboard`);
        notify('Votre mission est maintenant achevée', 'success'); 
        return true
      }          
      else throw new Error(liberate.message)
    }catch(err){
        notify(err instanceof Error ? err.message : 'Une erreur est survenue lors de la liberation des fonds!', 'error');
    }finally{
      setLoading(false);
    }
    return false
  }

  const verifyPayment = async (task_id:string) => {
      try{
      setLoading(true);
      const verify = await apiFetch<null>(`/api/tasks/${task_id}/payment/verify`, undefined, 'POST');
      if(verify.success){
        const deleteCookie = await apiFetch<null>('/api/applications', undefined, 'DELETE')  
        if(deleteCookie.success)  
          router.push('/client/dashboard');
          notify('Paiement effectué avec succès.', 'success')
          return true
      }          
      else throw new Error(verify.message)
    }catch(err){
        notify(err instanceof Error ? err.message : 'Erreur lors du paiement.', 'error');
    }finally{
      setLoading(false);
    }
    return false
  }

  const deleteSavedApplicant = async ()=>{
    await apiFetch('/api/applications', undefined, 'DELETE')
  }

  return{
    loading,
    proceedToPayment,
    liberatefunds,
    verifyPayment,
    deleteSavedApplicant
  }
}