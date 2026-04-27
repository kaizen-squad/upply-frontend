'use client'
import Button from '@/components/ui/Button/Button';
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import TextField from '@/components/ui/TextField/TextField';
import { useManageTasks } from '@/hooks/useTasks';
import { TaskFormProps, TaskFormType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandCoins } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form'

const TaskForm = () => {
    const {loading, createTask} = useManageTasks();
    const {notify} = useNotificationManager();
    const {control, handleSubmit} = useForm<TaskFormType>({
        mode:'onChange',
        resolver: zodResolver(TaskFormProps)
    });

    const onSubmit = (data:TaskFormType)=> createTask(data);
    const onError = ()=> notify('Veuillez entrez des données valides!', 'warning');

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full lg:w-max bg-white-solid py-10 px-5 md:p-10 border rounded-sm' >
        <h2>Informations de la mission</h2>
        <p className='text-santa-gray hidden lg:block'>Détaillez vos besoins pour attirer les meilleurs prestataires de la plateforme</p>

        <div className='my-8'>
            <Controller
                name='title'
                control={control}
                render={({field, fieldState:{error}})=>
                    <TextField  
                        placeholder="Ex: Développement d'une API REST"
                        label='Titre de la mission'
                        className='py-2.5 rounded-none'
                        {...field}
                        errorMessage={error?.message ?? ''}
                    /> }
            />
        </div>

        <div className='my-8'>
            <Controller
                name='description'
                control={control}
                render={({field, fieldState:{error}})=>
                    <Textarea 
                        label='Description détaillée' 
                        error={error?.message ?? ''} 
                        {...field} 
                        placeholder='Décrivez les objectifs, les livrables attendus et le contexte...' 
                        className='rounded-none min-h-35'
                    />   
                }
            />
        </div>

        <div className='flex-col gap-8 lg:flex-row flex my-5'>
            <Controller
                name='budget'
                control={control}
                render={({field, fieldState:{error}})=>
                    <TextField  
                        placeholder='0'
                        label='Budget (FCFA)'
                        className='py-2.5 rounded-none'
                        Icon={HandCoins}
                        Eposition='bottom'
                        {...field}
                        errorMessage={ error?.message ?? '' }
                    /> }
            />
            <Controller
                name='deadline'
                control={control}
                render={({field, fieldState:{error}})=>
                    <TextField  
                        placeholder=""
                        label='Date limite'
                        type='date'
                        className='py-2.5 rounded-none'
                        {...field}
                        errorMessage={error?.message ?? ''}
                    /> }
            />
        </div>

        <div className='mt-25 w-full'>
            <hr className='border-gray-200 w-full' />
            <Button
                type='submit'
                textContent='Publier la mission'
                className='bg-alizarin-crimson-red-51 text-white-solid font-medium rounded-md py-2.5 px-5 mt-5 flex justify-self-end mb-5'
            />
        </div>
    </form>
  )
}

export default TaskForm