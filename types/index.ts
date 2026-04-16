import { AuthDataResponse, RefreshTokenResponse } from "./auth";
/**
 * HTTP Response format for all requests
 */

// Type utilitaire pour les réponses
export type DataType = AuthDataResponse | RefreshTokenResponse;

export interface HTTPResponse<T>{
    success: boolean,
    data: T,
    message: string,
    status: number
}