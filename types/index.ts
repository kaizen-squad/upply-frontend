import {z} from "zod";
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
  budget: z.string().regex(/^\d+$/, {error: 'Le budget doit être un nombre valide'}),
  deadline: z.string().date()
});
export type TaskFormType = z.infer<typeof TaskFormProps>;

export type ApplicationStatus = 'EN_ATTENTE' | 'ACCEPTEE' | 'REJETEE'

export interface Application {
  id: string
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

export interface TaskPropsOnPrestataire extends TaskProps {
  application_id: string
  applied_at: string | undefined
  application_status: ApplicationStatus | undefined
}
 
export  interface Deliverable {
  id: string
  task_id: string
  prestataire_id: string
  content: string
  file_path: string | null
  submitted_at: string
}

export type FileType = 'pdf' | 'png' | 'jpg' | 'zip'

export type FileUpply = {
  file_url: string,
  file_name: string,
  file_size: string,
  file_type: FileType
}

export type InfoUser = {
  name: string,
  rating_avg: number,
}

export interface DeliverableDTO {
  content: string,
  prestataire: InfoUser,
  file: FileUpply
  created_at: string
}

export const DeliveryFormSchema = z.object({
  task_id: z.string(),
  content: z.string(),
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Le fichier ne doit pas dépasser 5 Mo')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
      'Format accepté : JPG, PNG ou PDF'
    ),
});

export type DeliveryFormProps = z.infer<typeof DeliveryFormSchema>

export interface Review {
  id: string
  task_id: string
  reviewer_id: string
  reviewee_id: string
  rating: number // 1-5
  comment: string | null
}

export const ReviewSchema = z.object({
  task_id: z.string(),
  reviewee_id: z.string(),
  rating: z.number(),
  comment: z.string().optional()
})

export type ReviewProps = z.infer<typeof ReviewSchema>;

export type ApplicationCardProps = {
  mission_title:string,
  status_application:ApplicationStatus,
  applied_at: string,
  budget_mission:number
}

export type Pstatistics = {
  waiting_budget:number,
  waiting_applications: number, 
  active_missions: number
}

export type PDashboardData = {
  tasks: TaskProps[],
  applications: ApplicationCardProps[],
  statistics: Pstatistics
}

export type CStatistics = {
  opened: number,
  pending: number,
  validated: number,
  total_spent: number
}

export type CDashboardData = {
  tasks: TaskProps[],
  statistics: CStatistics
}

export type UserFull = {  
  name: string,
  email: string,
  role: string,
  phone: string,
  rating_avg: number,
  created_at: Date,
}

export interface ApplicationResponse extends Application {
  prestataire: UserFull
}