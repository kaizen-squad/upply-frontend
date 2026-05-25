'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { RegisterProps, RegisterSchema } from '@/types/auth';
import SelectField from '@/components/ui/SelectField/SelectField';
import TextField from '@/components/ui/TextField/TextField';
import { Lock, Mail, Phone, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button/Button';
import Spinner from '@/components/ui/Spinner/Spinner';
import { useToasting } from '@/components/ui/Toast/useToasting';


function RegisterForm() {
  const {handleSubmit, control} = useForm<RegisterProps>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema) as any,
    defaultValues: { role: 'Client' as RegisterProps['role'], rating_avg: 1.11 },
  });
    const {notify} = useToasting();
  const {register, loading} = useAuth();
  
  const onSubmit = async (registerData:RegisterProps)=>{
      await register(registerData);
  }
  const onError = (data:any)=> {
    console.log(data)
    notify('Veuillez entrez des données valides!', 'warning')};

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='m-auto rounded-2xl mt-5 bg-white shadow-lg p-8 border-[0.5px] border-gray-200 opacity'>
        <div className='flex flex-col gap-3 xs:flex-row items-center justify-between'>
          <p className="font-bold text-2xl">Create Account</p>
          <Controller 
              control={control}
              name='role'
              render={({field})=> <SelectField {...field} options={['Client', 'Prestataire']} name='role' />  }
          />
        </div> 
        <p className="my-3 xs:font-semibold text-xl">Join Upply now!</p>

        <div className='flex flex-col xs:flex-row gap-3 items-center my-2'>
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
              name='password_confirmation'
              render={({field, fieldState: {error}})=> <TextField name='password_confirmation' value={field.value}
                onChange={field.onChange} type='password' errorMessage={field.value && error?.message} label="Confirm Password" placeholder="Re-enter your password" Icon={Lock}/>}
            />
        </div>
        

        <div className='mt-3 pl-2'>
            <input type="checkbox" id='agree' required className='scale-120' />
            <label htmlFor="agree" className="text-sm text-gray-600 ml-2">I agree to the <span className="text-(--sb-blue-300) cursor-pointer">Terms of Service</span> and <span className="text-(--sb-blue-300) cursor-pointer">Privacy Policy</span></label>
        </div>

        <Button 
            type='submit' 
            className='bg-foreground text-white w-full mt-6 rounded-lg py-3' 
            textContent={loading ? 'Loading...' : 'Create account'} 
            Icon={loading ? ()=><Spinner size={8} /> : undefined }
        />

    </form>
  )
}

export default RegisterForm