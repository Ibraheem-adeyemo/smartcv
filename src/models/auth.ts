import { InstitutionColor, TenantView } from ".";

export interface AuthModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string
    access_token: string
}

interface Tenant {
    name: string,
    image: string,
    logo: string,
    tenantCode: string,
    address: string,
    dateCreated: string,
    bankSuperAdmin: string,
    status: string,
    location: string,
    branch: string,
    code: string
    color: InstitutionColor
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
    tenant: Tenant,
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
    refresh_token: string,
    email: string
}

export interface RefreshTokenRequestBody {
    grant_type: string,
    refresh_token: string
}