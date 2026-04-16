/**
 * HTTP Response format for all requests
 */
export interface HTTPResponse{
    success: boolean,
    data: any,
    message: string,
    status: number
}