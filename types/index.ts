import z from "zod";
import { AuthDataResponse, RefreshTokenResponse } from "./auth";


// Type utilitaire pour les réponses
export type DataType = AuthDataResponse | RefreshTokenResponse;

/**
 * HTTP Response format for all requests.
 */
export interface HTTPResponse<T>{
    success: boolean,
    data: T,
    message: string,
    status: number
}

export type TaskStatus = 'OUVERTE' | 'EN_COURS' | 'LIVREE' | 'VALIDEE'

export interface TaskProps {
  id: string
  client_id: string
  prestataire_id: string | null
  title: string
  description: string
  budget: number
  deadline: string // YYYY-MM-DD
  status: TaskStatus
  created_at?: string
}

export const TaskFormProps = z.object({
    title: z.string().min(3, {error: 'Entrez un nom convenable!'}),
    description: z.string().min(10, {error: 'Une description est nécessaire!'}),
    budget: z.string().regex(/^\d+$/, 'Le budget est obligatoire'),
    deadline: z.string().date()
});
export type TaskFormType = z.infer<typeof TaskFormProps>;

export type ApplicationStatus = 'EN_ATTENTE' | 'ACCEPTEE' | 'REJETEE'

export interface Application {
  id?: string
  task_id: string
  prestataire_id: string
  message: string
  status: ApplicationStatus
  created_at: string
}

export const ApplicationFormSchema = z.object({
    message: z.string().min(20, 'Soyez bon vendeur de vous même!'),
    task_id: z.string()
});

export type ApplicationFormType = z.infer<typeof ApplicationFormSchema>

interface ApplicationResponse extends TaskProps{
  applied_at: string
  application_status: string
}