'use client'
import Button from '@/components/ui/Button/Button';
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import TextField from '@/components/ui/TextField/TextField';
import { useTasks } from '@/hooks/useTasks';
import { TaskFormProps, TaskFormType, TaskProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandCoins } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form'

const   TaskForm:FC<{field_values?:TaskProps, isEditing?:boolean, setIsEdited?:Dispatch<SetStateAction<boolean>>}> = ({field_values, isEditing=false, setIsEdited}) => {
    const {createTask, editTask} = useTasks(undefined, true);
    const {notify} = useNotificationManager();
    const {control, handleSubmit, formState:{isValid, isSubmitting, isSubmitSuccessful}, reset} = useForm<TaskFormType>({
        mode:'onChange',
        resolver: zodResolver(TaskFormProps),
        defaultValues: {
            title: field_values?.title || '',
            description: field_values?.description || '',
            budget: field_values?.budget.toString() || '',
            deadline: field_values?.deadline || ''
        }
    });


    const onSubmit = async (data: TaskFormType) => {
        if (!isEditing) {
            const created = await createTask(data);
            if (created) reset();
        } else {
            if (!field_values) return;
            const updatedTask: TaskProps = {
                ...field_values,
                title: data.title,
                description: data.description,
                budget: Number(data.budget),
                deadline: data.deadline,
            };
            const edited = await editTask(updatedTask);
            if (edited){
                reset();
                if(setIsEdited)
                    setIsEdited(true)
            } 
        }
    };
    const onError = ()=> notify('Veuillez entrez des données valides!', 'warning');

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full bg-white-solid py-10 px-5 md:p-10 border rounded-sm' >
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

        <div className='flex-col gap-5 lg:flex-row flex my-5'>
            <Controller
                name='budget'
                control={control}
                render={({field, fieldState:{error}})=>
                    <TextField 
                        type="number" 
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
                disabled={!isValid}
                type='submit'
                textContent={isSubmitting ? 'Loading...' : 'Publier la mission'}
                className='bg-alizarin-crimson-red-51 text-white-solid font-medium rounded-md py-2.5 px-5 mt-5 flex justify-self-end mb-5'
                isLoading={isSubmitting}
            />
        </div>
    </form>
  )
}

export default TaskForm