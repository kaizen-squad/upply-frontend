import z from 'zod/v4';

export const LoginSchema = z.object({
    email: z.email({error:'Incorrect email format!'}),
    password: z.string().min(8, '8 characters minimum.')
});

export const RegisterSchema = z.object({    
    role: z.enum(['client', 'prestataire']),
    name: z.string().min(2,{error:'Too small !'}),
    email: z.email(),
    password: z.string().min(8, {error:'8 characters minimum!'}),
    phone: z.string().regex(/^\+\d{10,15}$/, {message: 'Format attendu: +1234567890'}),
    confirmPassword: z.string()
}).refine( data => data.password === data.confirmPassword,
    {
        error: "Passwords do not match!",
        path: ['confirmPassword'],
    }
);
export enum UserRole {
    client = 'client',
    prestataire = 'prestataire'
}
export type LoginProps = z.infer<typeof LoginSchema>;
export type RegisterProps = z.infer<typeof RegisterSchema>;

export type LoginResponse = {
    access_token: string,
    refresh_token: string,
    user: {
        role: UserRole,
        id: string
    }
}