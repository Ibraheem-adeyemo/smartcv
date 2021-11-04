export interface APIResponse<T extends Record<keyof T, any>> {
    status: string,
    message: string,
    data: T,
    code: string
}

export interface InterchangeResponse {
    node:string,
    statusCondition: string
}

export interface ErrorResponse {
    status: string,
    message: string,
    code: string
}