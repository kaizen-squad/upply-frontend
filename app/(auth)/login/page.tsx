'use client'

import Button from "@/components/ui/Button/Button";
import useNotificationManager from "@/components/ui/Notification/hooks/useNotificationManager";
import TextField from "@/components/ui/TextField/TextField";
import { useAuth } from "@/hooks/useAuth";
import { LoginProps, LoginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

function LoginForm() {
    const { login } = useAuth();
    const {notify} = useNotificationManager();
    
    const emailProps = {
        type: 'email',
        label: 'Email',
        placeholder: 'traveler@example.com',
        Icon: Mail
    }

    const passwordProps = {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        Icon: Lock,
    }
    const {handleSubmit, control} = useForm<LoginProps>({
        mode: 'onChange',
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = async (loginData: LoginProps)=> {
        await login(loginData);
    } 
    const onError = ()=> notify('Veuillez entrez des données valides!', 'warning');

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className='m-auto rounded-2xl mt-5 bg-white shadow-lg p-8 border-[0.5px] border-gray-200'>
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <p className='text-sm mt-4 text-gray-500'>Sign in to your account to manage your bookings</p>
        <Controller
            control={control}
            name='email'
            render={({field, fieldState: {error}})=> <TextField name="email" value={field.value} errorMessage={error?.message ?? ''} {...emailProps} onChange={field.onChange} /> }
        />
        
        <div className="mt-3">
         <Controller 
            control={control}
            name='password'
            render={({field, fieldState: {error}})=> <TextField name="password" errorMessage={error?.message ?? ''} {...passwordProps} value={field.value} onChange={field.onChange} /> }
        />
        </div>

        <Button type='submit' className='bg-foreground text-white w-full mt-6 py-1.5 rounded-lg' textContent='Sign In' />
        
    </form>
  )
}

export default LoginForm;