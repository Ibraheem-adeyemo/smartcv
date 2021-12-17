export interface TenantView {
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
}
export interface TenantAdminView {
    firstName: string,
    lastName: string,
    bank: string,
    email: string,
    status: string,
    accountNonExpired: string,
    accountNonLocked: string,
    createdAt: string,
    credentialsNonExpired: string,
    id: number
    isActive: string
    isFirstLogin: string
    isLocked: string,
    tenant: TenantView,
    role:Role
}

export interface Role {
    id:number,
    name:string,
    permissions: string[],
    tenantCode:string
}

export interface userManagementTab {
    name: string,
    isSelected: boolean
}

export interface ISWAdminView {
    firstName: string,
    lastName: string,
    role: string,
    email: string,
    dateCreated: string,
    status: string
}

export interface UserManagementModal {
    name: string,
    isOpen: boolean,
    triggerButton: string,
    isSubmitted: boolean
}

export interface UserManagementStat {
    name: string,
    totalCount: string
}

export interface InstitutionColor {
    headerColor: string,
    sidebarColor: string,
    buttonColor: string
}