import Button from '@/components/ui/Button/Button'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { formatFrenchDateIntl } from '@/lib/utils';
import {  ApplicationFormSchema, ApplicationFormType, TaskProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert } from 'lucide-react'
import Image from 'next/image';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToasting } from '@/components/ui/Toast/useToasting';
import { useApplication } from '@/hooks/useApplication';

const ApplicationForm:FC<{task: TaskProps}> = ({task}) => {
    const {notify} = useToasting();
    const {applyTotask, application:[application], getTaskApplication} = useApplication();
    const router = useRouter();

    const {control, handleSubmit, formState:{isValid, isSubmitting}} = useForm<ApplicationFormType>({
        mode: 'onChange',
        resolver: zodResolver(ApplicationFormSchema),
    });
    
    const onSubmit = async (data: ApplicationFormType)=> {
        await applyTotask(task.id, data);
    }

    const onError = ()=>{
        notify('Considérez vos qualités personnelles, votre expérience et vos réalisations!', 'warning');
    }

    const applicationRangeBarColor: {EN_ATTENTE:string, ACCEPTEE: string, REJETEE:string} = {
        EN_ATTENTE: 'linear-gradient(to right, var(--alizarin-crimson-red-51) 33%, #fff 1%)',
        ACCEPTEE: 'linear-gradient(to right, var(--orange-alert) 100%, #fff 1%)',
        REJETEE: ''
    }

    useEffect(()=>{
        getTaskApplication(task.id,'prestataire');
    },[])

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='border border-gray-200 md:border-2 p-5 bg-white'>
        <h2 className='my-2 mb-4'>POSTULER À CETTE MISSION</h2>
        
        { 
            !application && 
            <div>
                <Controller
                    name='message'
                    control={control}
                    render={({field, fieldState:{error}})=> 
                        <Textarea
                            label='VOTRE MESSAGE DE MOTIVATION (OBLIGATOIRE)'
                            placeholder='Expliquez brièvement votre expérience pertinente...'
                            className='h-30 border border-gray-200 bg-gray-100 border-none md:border-2 rounded-none p-4'
                            {...field} 
                            error={error?.message}
                        />}
                />  

                <div className='flex gap-2 items-center py-2 px-5 border-l-5 border-l-scarpa-flow-gray-34 my-3 bg-gallery-gray-93 text-scarpa-flow-gray-34'>
                    <CircleAlert width={50}/>
                    <small className='text-[0.85rem]'>En postulant, vous vous engagez à être disponible pour la plage horaire définie. Les annulations tardives impactent votre score de fiabilité.</small>
                </div>

                <Button
                    disabled={!isValid}
                    type='submit'
                    textContent='Envoyer ma candidature'
                    className='w-full bg-alizarin-crimson-red-51 py-3.5 text-white font-bold rounded-sm shadow-[5px_5px_1px_0] shadow-gallery-gray-93 mt-5'
                    isLoading={isSubmitting}
                />
            </div> 
        }

        {
           application &&
           <div>
                <div className='text-center border-2 rounded-sm shadow-2xs mt-10 py-6 px-3 bg-athens-gray-96'>
                    <Image
                        src={'/Assets/Success_Check.svg'}
                        alt={'success'}
                        width={50}
                        height={50}
                        className='w-max m-auto'
                    />
                    <p className='font-bold mt-3'>Candidature envoyée</p>
                    <p className='text-scarpa-flow-gray-34 mt-2'>Vous avez postulé à cette mission le {formatFrenchDateIntl(application.created_at)}</p>

                    <hr className='mt-7 mb-5 border-gray-300' />

                    <div>
                        <div className='flex items-center justify-between'>
                            <small>STATUT DE l'EXAMEN</small>
                            <small>{application.status.replace('_', ' ')}</small>
                        </div>
                        <div className='border h-2 mt-1' style={{background: applicationRangeBarColor[application.status]}}></div>
                    </div>
                </div>
                {/* {
                    application.status === 'EN_ATTENTE' && 
                    <Button
                        textContent="Retirer ma candidature"
                        className='w-full bg-alizarin-crimson-red-51 py-3.5 text-white font-bold rounded-sm shadow-[5px_5px_1px_0] shadow-gallery-gray-93 mt-10'
                        onClick={()=>}
                    />
                } */}
                {
                    application.status === 'ACCEPTEE' && 
                    <Button
                        textContent="Livrer le travail"
                        className='w-full bg-alizarin-crimson-red-51 py-3.5 text-white font-bold rounded-sm shadow-[5px_5px_1px_0] shadow-gallery-gray-93 mt-10'
                        onClick={()=>router.push(`/prestataire/tasks/${task.id}/deliver`)}
                    />
                }
           </div>
        }
    </form>
  )
}

export default ApplicationForm