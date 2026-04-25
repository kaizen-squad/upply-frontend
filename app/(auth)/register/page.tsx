'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { RegisterProps, RegisterSchema } from '@/types/auth';
import SelectField from '@/components/ui/SelectField/SelectField';
import TextField from '@/components/ui/TextField/TextField';
import { Lock, Mail, Phone, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import useNotificationManager from '@/components/ui/Notification/hooks/useNotificationManager';


function RegisterForm() {
  const {handleSubmit, control} = useForm<RegisterProps>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
    defaultValues: { role: 'client' }
  });
  const {notify}= useNotificationManager();
  const {register} = useAuth();
  
  const onSubmit = async (registerData:RegisterProps)=>{
      await register(registerData);
  }
  const onError = ()=> notify('Veuillez entrez des données valides!', 'warning');

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='m-auto rounded-2xl mt-5 bg-white shadow-lg p-8 border-[0.5px] border-gray-200'>
        <div className='flex items-center justify-between'>
          <h1 className="font-bold text-2xl">Create Account</h1>
          <Controller 
              control={control}
              name='role'
              render={({field})=> <SelectField {...field} options={['Client', 'Prestataire']} name='role' />  }
          />
        </div> 
        <p className="py-3">Join Upply now!</p>

        <div className='flex gap-5 items-center my-2'>
            <Controller 
              control={control}
              name='name'
              render={({field, fieldState:{error}})=> <TextField name='name' value={field.value} onChange={field.onChange} errorMessage={field.value && error?.message} label="Name" Icon={User} placeholder="John" />}
            />

            <Controller 
              control={control}
              name='phone'
              render={({field, fieldState: {error}})=> <TextField name='phone' value={field.value}
                onChange={field.onChange} type='text' errorMessage={field.value && error?.message} label="Phone" placeholder="+1 234567890" Icon={Phone}/>}
              />
        </div>

        <div>
          <Controller 
              control={control}
              name='email'
              render={({field, fieldState: {error}})=> <TextField name='email' value={field.value}
                onChange={field.onChange} type='email' errorMessage={field.value && error?.message} label="Email" placeholder="traveler@example.com" Icon={Mail}/>}
              />

        </div>
        
        <div className='my-2'>
          <Controller 
              control={control}
              name='password'
              render={({field, fieldState: {error}})=> <TextField name='password' value={field.value}
                onChange={field.onChange} type='password' errorMessage={field.value && error?.message} label="Password" placeholder="Create a password" Icon={Lock}/>}
          />
        </div>
        
        <div className='my-2'>
            <Controller 
              control={control}
              name='confirmPassword'
              render={({field, fieldState: {error}})=> <TextField name='confirmPassword' value={field.value}
                onChange={field.onChange} type='password' errorMessage={field.value && error?.message} label="Confirm Password" placeholder="Re-enter your password" Icon={Lock}/>}
            />
        </div>
        

        <div className='mt-3 pl-2'>
            <input type="checkbox" id='agree' required className='scale-120' />
            <label htmlFor="agree" className="text-sm text-gray-600 ml-2">I agree to the <span className="text-(--sb-blue-300) cursor-pointer">Terms of Service</span> and <span className="text-(--sb-blue-300) cursor-pointer">Privacy Policy</span></label>
        </div>

        <button type="submit" className='bg-background cursor-pointer text-white w-full mt-4 py-1.5 rounded-lg font-semibold hover:opacity-80 hover:scale-97 duration-200'>Create Account</button>
    </form>
  )
}

export default RegisterForm