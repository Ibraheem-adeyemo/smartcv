import { TenantView } from ".";

export interface AuthModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string
    access_token: string
}

interface Tenant {
    id: number,
    name: string,
    color: string,
    code: string,
    domain: string,
    slogan: string,
    image: string,
    location: string,
    address: string,
    branch: string,
    isActive: string
}

interface Permission {
    id: number,
    name: string,
    description: string,
    iswSuperAdmin: boolean

}

interface Role {
    id: number,
    name: string,
    permissions: Permission[],
    tenantCode: string

}
export interface UserModel {
    createdAt: string,
    updatedAt: string,
    id: number,
    username: string,
    email: string,
    isActive: string,
    isLocked: string,
    isFirstLogin: string,
    credentialsNonExpired: string,
    accountNonExpired: string,
    accountNonLocked: string,
    tenant: TenantView,
    role: Role,
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