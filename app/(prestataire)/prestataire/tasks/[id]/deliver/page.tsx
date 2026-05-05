'use client'
import DeliverForm from '@/components/dashboard/client/DeliverForm';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import Button from '@/components/ui/Button/Button';
import { ApplicationResponse, TaskProps } from '@/types';
import { LockKeyhole, Zap, CircleCheck } from 'lucide-react';

const page= () => {
    const {tasks:[task]} = useTasksContext<ApplicationResponse>();
  return (
    <div className='py-10'>
        <h1>Soumettre mon Livrable</h1>
        <p>Complétez les informations ci-dessous pour valider la livrables.</p>

        <div className='border-2 mt-7'>
            <h2 className='my-6 ml-5'>Récapitulatif de la tache</h2>
            <div className='md:flex justify-between items-center px-6 py-2 pb-6 lg:p-6 md:bg-gallery-gray-93'>
                <div className='w-full md:w-[60%] lg:w-max'>
                    <small className='hidden md:block'>Mission</small>
                    <p className='font-semibold '>{task?.title ?? ''}</p>
                </div>
                <div className='rounded-lg bg-gallery-gray-93 py-3 px-5 flex justify-between items-center mt-4 md:block md:bg-transparent md:p-0'>
                    <small className='text-[0.9rem] font-semibold md:text-xs'>Montant sécurisé (Escrow)</small>
                    <p className='text-alizarin-crimson-red-51 text-3xl font-black'>{task?.budget ?? ''}</p>
                </div>
            </div>
        </div>

        <div className='p-6 border-2 mt-6 bg-white-solid'>
            <DeliverForm task_id={task.id} />
        </div>
        
        <div className='border-2 bg-white-solid flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 xl:grid-rows-1 xl:grid-cols-3 gap-5 mt-5 p-5'>
            <div className='border-l-5 border-l-alizarin-crimson-red-51 rounded-sm p-3 shadow-[2px_2px_2px_0px] shadow-gray-300 flex items-center'>
                <div className='p-5 rounded-sm bg-gallery-gray-93 border border-gray-100'>
                    <div className='flex items-center gap-2'>
                        <LockKeyhole className='text-alizarin-crimson-red-51' /> 
                        <p className='font-semibold'>Fonds sécurisés</p>
                    </div> 
                    <p className='text-santa-gray mt-3'>Les fonds pour cette mission (25,000 FCFA) sont actuellement conservés en toute sécurité dans l'escrow FedaPay.</p>
                </div>
            </div>
                
            <div className='p-5 rounded-sm bg-woodsmoke-gray-8'>
                <p className='text-alizarin-crimson-red-51 font-bold'>Prochaines étapes</p>
                <div className='text-white mt-5'>
                    <p className='flex items-center gap-1'><CircleCheck width={16} />Validation de la livraison</p>  
                    <p className='flex items-center gap-1'><CircleCheck width={16} />Revue par le client.</p> 
                    <p className='flex items-center gap-1'><CircleCheck width={16} />Approbation du travail</p> 
                    <p className='flex items-center gap-1'><CircleCheck width={16} />Déblocage des fonds</p>
                </div>
            </div>

            <div className='p-5 rounded-sm bg-woodsmoke-gray-8 text-white-solid lg:col-start-1 lg:col-end-3 lg:w-[60%] lg:m-auto xl:col-start-3 xl:w-full'>
                <Zap className='stroke-2 text-white' />
                <p className='font-semibold mt-2'>Accélerez vos missions</p>
                <p className='my-3'>Boostez la visibilité de vos taches pour un recrutement 2x plus rapide.</p>
                <Button textContent='En savoir plus' className='text-alizarin-crimson-red-51 font-semibold mt-3' />
            </div>

        </div>
    </div>
  )
}

export default page