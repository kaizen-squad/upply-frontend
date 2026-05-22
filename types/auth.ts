import z, { minLength } from 'zod/v4';

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
    role: z.preprocess((val:string)=> val.toLowerCase(), z.enum(['client', 'prestataire'])),
    name: z.string().min(2,{error:'Too small !'}),
    email: z.email(),
    password: z.string().min(8, {error:'8 characters minimum!'}),
    phone: z.string().min(10, {message: 'Ex: 1234567890'}),
    password_confirmation: z.string(),
    rating_avg: z.number().optional()
}).refine( data => data.password === data.password_confirmation,
    {
        error: "Passwords do not match!",
        path: ['password_confirmation'],
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
    accessToken?: string,
    refreshToken: string,
    user: User
}

export type RefreshTokenResponse = {
    accessToken: string
}
