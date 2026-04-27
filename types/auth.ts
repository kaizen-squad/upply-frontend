import z from 'zod/v4';

/**
 * Login form fields schema with zod validation.
 */
export const LoginSchema = z.object({
    email: z.email({error:'Incorrect email format!'}),
    password: z.string().min(8, '8 characters minimum.')
});
 
/**
 * Register form fields schema with zod validation.
 */
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

/**
 * User role, whether client or prestataire.
 */
export type Role = 'client' | 'prestataire'

/**
 * Login field type.
 */
export type LoginProps = z.infer<typeof LoginSchema>;

/**
 * Register field type
 */
export type RegisterProps = z.infer<typeof RegisterSchema>;

/**
 * User type used to save his information accross the app.
 */
export type User = {
    name: string,
    role: Role,
    id: string
}

/**
 * Expected Auth Response format. 
 */
export type AuthDataResponse = {
    access_token: string,
    refresh_token: string,
    user: User
}

export type RefreshTokenResponse = {
    access_token: string
}
