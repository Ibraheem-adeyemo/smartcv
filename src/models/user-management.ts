import { Tab } from ".";
import { UserModel } from "./auth";

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
    code: string,
}

export interface CreateTenantModel extends TenantView {
    interchangeName: string,
    bankDomain: string
}

export interface TenantTableView extends TenantView {
    active: boolean
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
    role: Role
}
export interface Role {
    id: number,
    name: string,
    permissions: string[],
    tenantCode: string
}
export interface PasswordChecker { 
    checker: string, 
    status: boolean, 
    text: string 
}
export interface userManagementTab extends Tab {

}

export interface CreateRoleModel {
    name: string,
    tenantCode: string,
    permissionIds: number[] 
}
export interface ISWAdminView {
    firstName: string,
    lastName: string,
    email: string,
    dateCreated: string,
    status: string
}

export interface ISWAdmView extends ISWAdminView, UserModel {

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
    sidebarColour: string,
    buttonColor: string
}

export interface TenantInput extends CreateTenantModel {
    color: InstitutionColor
}

export interface BankAdmin {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    tenantCode: string
}

export interface CreateTenantReponseModel {
    id: number,
    name: string,
    color: string
    code: TenantColor,
    domain: string,
    slogan: string,
    logo: string,
    location: string,
    address: string,
    branch: string,
    isActive: string

}

export interface TenantColor {
    id: number,
    headerColor: string,
    sidebarColour: string,
    buttonColor: string
}

export interface RoleModel {
    value: number,
    name: string
}

export type onCloseFunc = () => void
export interface BankModalProps {
    isOpen: boolean,
    closeModal: onCloseFunc,
    bankInfo?: TenantTableView
}