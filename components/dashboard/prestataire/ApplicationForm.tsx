import Button from '@/components/ui/Button/Button'
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { useUserStore } from '@/hooks/store';
import { useApplication } from '@/hooks/useTasks';
import { formatFrenchDateIntl } from '@/lib/utils';
import {  ApplicationFormSchema, ApplicationFormType, TaskProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert } from 'lucide-react'
import Image from 'next/image';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApplicationStatus } from '../../../types/index';

const ApplicationForm:FC<{task: TaskProps}> = ({task}) => {
    const {notify} = useNotificationManager();
    const {applyTotask} = useApplication();
    const {user} = useUserStore();
    const {control, handleSubmit} = useForm<ApplicationFormType>({
        mode: 'onChange',
        resolver: zodResolver(ApplicationFormSchema)
    });
    
    const onSubmit = async (data: ApplicationFormType)=> {
        await applyTotask(data);
    }

    const onError = ()=>{
        notify('Considérez vos qualités personnelles, votre expérience et vos réalisations!', 'warning');
    }

    const applicationRangeBarColor: {EN_ATTENTE:string, ACCEPTEE: string, REJETEE:string} = {
        EN_ATTENTE: '',
        ACCEPTEE: '',
        REJETEE: ''
    }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='border border-gray-200 md:border-2 p-5 bg-white'>
        <h2 className='my-2 mb-4'>POSTULER À CETTE MISSION</h2>
        
        { 
            (user?.id && !(task.prestataire_id === user?.id)) && 
            <div>
                <Controller
                    name='message'
                    control={control}
                    render={({field, fieldState:{error}})=> 
                        <Textarea
                            label='VOTRE MESSAGE DE MOTIVATION (OBLIGATOIRE)'
                            placeholder='Expliquez brièvement votre expérience pertinente...'
                            className='h-30 border border-gray-200 bg-gallery-gray-93 border-none md:bg-white md:border-2 rounded-none p-4'
                            {...field} 
                            error={error?.message}
                        />}
                />  
                <Controller
                    name='task_id'
                    control={control}
                    defaultValue={task.id}
                    render={()=> 
                        <input type="hidden" id="task_id" value={task.id} />}
                />
                

                <div className='flex gap-2 items-center py-2 px-5 border-l-5 border-l-scarpa-flow-gray-34 my-3 bg-gallery-gray-93 text-scarpa-flow-gray-34'>
                    <CircleAlert width={50}/>
                    <small className='text-[0.85rem]'>En postulant, vous vous engagez à être disponible pour la plage horaire définie. Les annulations tardives impactent votre score de fiabilité.</small>
                </div>

                <Button
                    type='submit'
                    textContent='Envoyer ma candidature'
                    className='w-full bg-alizarin-crimson-red-51 py-3.5 text-white font-bold rounded-sm shadow-[5px_5px_1px_0] shadow-gallery-gray-93 mt-5'
                />
            </div> 
        }

        {
            !(user?.id && task.prestataire_id === user?.id) &&
            <div className='text-center border-2 rounded-sm shadow-2xs py-6 px-3 bg-athens-gray-96'>
                <Image
                    src={'/Assets/Success_Check.svg'}
                    alt={'success'}
                    width={50}
                    height={50}
                    className='w-max m-auto'
                />
                <p className='font-bold mt-3'>Candidature envoyée</p>
                <p className='text-scarpa-flow-gray-34 mt-2'>Vous avez postulé à cette mission le {formatFrenchDateIntl(task.created_at)}</p>

                <hr className='mt-7 mb-5 border-gray-300' />

                <div>
                    <div className='flex items-center justify-between'>
                        <small>STATUT DE l'EXAMEN</small>
                        <small>{task.status.replace('_', ' ')}</small>
                    </div>
                    <div className='border h-2 mt-1' style={{background: applicationRangeBarColor[task.status]}}></div>
                </div>
            </div>
        }
        
    </form>
  )
}

export default ApplicationForm