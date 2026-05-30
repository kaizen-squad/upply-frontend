'use client';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import Button from '@/components/ui/Button/Button';
import { FileInput } from '@/components/ui/FileInput/FileInput';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import { useToasting } from '@/components/ui/Toast/useToasting';
import { DeliveryFormProps, DeliveryFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const DeliverForm: FC<{ task_id: string, isdelivered:boolean }> = ({ task_id,  isdelivered}) => {
  const [success, setSuccess] = useState(false);
    const {notify} = useToasting();
  const { deliverTask } = useTasksContext();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<DeliveryFormProps>({
    resolver: zodResolver(DeliveryFormSchema),
    mode: 'onChange',
    defaultValues: {
      content: '',
      file: undefined,
      task_id: task_id,
    },
  });

  const onSubmit = async (data: DeliveryFormProps) => {
    console.log(data)
    const response = await deliverTask(data);
    setSuccess(response);
  };

  const onError = () => {
    notify('Données non valides!', 'warning');
  };

  return (
    <div>
      {(!success && !isdelivered) ? (
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit, onError)}>
          <Controller
            control={control}
            name="content"
            rules={{ required: true }}
            render={({ fieldState: { error }, field }) => (
              <Textarea
                label="Description détaillée du travail"
                placeholder="Décrivez les actions effectuées, les livrables inclus et toute note pertinente pour le client..."
                className="rounded-none h-30"
                required
                error={error?.message ?? ''}
                {...field}
              />
            )}
          />

          <div className="mt-5">
            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <FileInput
                  label="Documents ou preuves (PDF, JPG, PNG)"
                  icon={
                    <Image
                      src="/Assets/FileUpload.svg"
                      alt="upload-file"
                      width={50}
                      height={50}
                    />
                  }
                  onFileSelect={(files) => {
                    field.onChange(files?.[0] ?? undefined);
                  }}
                  className="rounded-none"
                  accept=".pdf, .jpg, .png"
                />
              )}
            />
          </div>

          <hr className="my-6 border-gray-100" />

          <div className="flex justify-end">
            <Button
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              type="submit"
              textContent={!isSubmitting ? 'Valider la livraison' : 'Loading...'}
              Icon={() =>
                  <Image
                    src="/Assets/Validation.svg"
                    alt="validation"
                    width={20}
                    height={20}
                    className="stroke-white"
                  /> 
              }
              className="text-white bg-alizarin-crimson-red-51 py-3 px-6"
            />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-center bg-white border px-5 py-7 my-5 rounded-sm">
            <Image
              src="/Assets/SuccessGreen.svg"
              alt="success-green"
              height={100}
              width={100}
              loading="eager"
              className="m-auto"
            />
            <p className="text-3xl font-bold my-7 w-[70%] m-auto">
              Travail envoyé avec succès !
            </p>
            <p className="text-scarpa-flow-gray-34 mt-6 lg:w-[45%] m-auto">
              Le client a été notifié. Une fois validé, vos fonds seront disponibles
              dans votre Ledger.
            </p>
          </div>
          <Button
            textContent="Retourner au dashboard"
            className="text-white bg-alizarin-crimson-red-51 py-3 px-6 mt-10 w-max mx-auto"
            Icon={() => (
              <Image
                src="/Assets/Validation.svg"
                alt="validation"
                width={20}
                height={20}
                className="stroke-white"
              />
            )}
            onClick={() => router.push('/prestataire/dashboard')}
          />
        </div>
      )}
    </div>
  );
};

export default DeliverForm;