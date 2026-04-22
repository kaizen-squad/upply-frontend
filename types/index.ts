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

type TaskStatus = 'OUVERTE' | 'EN_COURS' | 'LIVREE' | 'VALIDEE'

export interface TaskProps {
  id: string
  client_id: string
  prestataire_id: string | null
  title: string
  description: string
  budget: number
  deadline: string // YYYY-MM-DD
  status: TaskStatus
}
