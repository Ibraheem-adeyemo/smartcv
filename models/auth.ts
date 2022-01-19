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

export interface TokenResponsBody {
    access_token: string,
    refresh_token: string
}

export interface RefreshTokenRequestBody {
    grant_type: string,
    refresh_token: string
}