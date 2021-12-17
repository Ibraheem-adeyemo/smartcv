export interface AuthModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string
    access_token: string
}

export interface TokenRequestBody {
    client_id: string,
    redirect_uri: string,
    grant_type: string,
    code: string
}