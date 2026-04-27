import Button from '@/components/ui/Button/Button'
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { useApplication } from '@/hooks/useTasks';
import { ApplicationFormSchema, ApplicationFormType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert } from 'lucide-react'
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

const ApplicationForm:FC<{task_id:string}> = ({task_id}) => {
    const {notify} = useNotificationManager();
    const {applyTotask} = useApplication();
    const {control, handleSubmit} = useForm<ApplicationFormType>({
        mode: 'onChange',
        resolver: zodResolver(ApplicationFormSchema)
    });
    
    const onSubmit = async (data: ApplicationFormType)=> {
        await applyTotask(data);
    }

    const onError = ()=>{ 
        notify('Soumettez des données valides!', 'warning');
    }
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='border-2 p-5 bg-white'>
        <h2 className='my-2 mb-4'>POSTULER À CETTE MISSION</h2>
        
        <Controller
            name='message'
            control={control}
            render={({field, fieldState:{error}})=> 
                <Textarea
                    label='VOTRE MESSAGE DE MOTIVATION (OBLIGATOIRE)'
                    placeholder='Expliquez brièvement votre expérience pertinente...'
                    className='h-30 border-2 rounded-none p-4'
                    {...field} 
                    error={error?.message}
                />}
        />
         <Controller
            name='task_id'
            control={control}
            defaultValue={task_id}
            render={({field, fieldState:{error}})=> 
                <input type="hidden" id="task_id" value={task_id} />}
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
    </form>
  )
}

export default ApplicationForm