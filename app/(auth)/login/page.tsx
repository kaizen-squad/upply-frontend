'use client'

import Button from "@/components/ui/Button/Button";
import useNotificationManager from "@/components/ui/Notification/hooks/useNotificationManager";
import TextField from "@/components/ui/TextField/TextField";
import { LoginProps, LoginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

function LoginForm() {
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
        
    } 
    
  return (
    <form onSubmit={handleSubmit(onSubmit, (err)=>console.log(err))} className='m-auto rounded-2xl mt-5 bg-white shadow-lg p-8 border-[0.5px] border-gray-200'>
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <p className='text-sm mt-4 text-gray-500'>Sign in to your account to manage your bookings</p>
        <Controller
            control={control}
            name='email'
            render={({field, fieldState: {error}})=> <TextField value={field.value} errorMessage={error?.message ?? ''} {...emailProps} onChange={field.onChange} /> }
        />
        
        <div>
         <Controller 
            control={control}
            name='password'
            render={({field, fieldState: {error}})=> <TextField errorMessage={error?.message ?? ''} {...passwordProps} value={field.value} onChange={field.onChange} /> }
        />
            
            <Link href={'/forgot-password'} className='w-max text-sm flex justify-self-end mt-3 text-(--sb-blue-300) cursor-pointer'>Forgot password ?</Link>
        </div>

        <Button type='submit' className='bg-foreground text-white w-full mt-4 py-1.5 rounded-lg' textContent='Sign In' />

        <div className='flex items-center gap-2 w-full mt-3 justify-center text-sm text-gray-500'>
            <hr className='w-[30%] border-gray-500 border-[1.25px]' />
            <p>or continue with</p>
            <hr className='w-[30%] border-gray-500 border-[1.25px]' />
        </div>

        <div className='flex gap-2 text-center mt-3 '>
            <button className='flex items-center justify-center gap-2 w-[49%] rounded-xl border border-gray-300 py-1.25'>
                <Image src='/Images/google-logo.svg' width={19} height={19} alt="google logo" />
                <span>Google</span> 
            </button>
            <button className='flex items-center justify-center gap-2 w-[49%] rounded-xl border border-gray-300 py-1.25'>
                <Image width={19} height={19} src='/Images/apple-logo.svg' alt="apple logo" />
                <span>Apple</span>
            </button>
        </div>
    </form>
  )
}

export default LoginForm;