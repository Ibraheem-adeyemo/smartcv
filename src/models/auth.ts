import { InstitutionColor, TenantView } from ".";

export interface AuthModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string
    access_token: string
}

export interface userApiAuthModel {
username:string
password: string
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

type scopeType = "clients" | "profile"

export interface Passport {
    access_token: string,
    token_type: string,
    refresh_token: string,
    scope: scopeType,
    firstName: string,
    lastName: string,
    emailVerified: boolean,
    firstLogin: boolean,
    mobileNo: string,
    mobileNoVerified: boolean,
    email: string,
    passportID: number | string | null,
    jti: string
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
export interface CredAuthDataModel {
    userInfo: UserModel,
    passport: Passport
}
export interface CredentialsAuthModel<T> extends TokenResponsBody {
    [x: string]: any;
    data: CredAuthDataModel
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
    active: boolean
}



export interface TokenRequestBody {
    client_id: string,
    redirect_uri?: string,
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

export interface LoginCredentialBody {
    username:string,
    password: string
}