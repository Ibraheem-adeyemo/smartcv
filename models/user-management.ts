export interface TenantView {
    name: string,
    bankLogo: string,
    bankId: string,
    address: string,
    dateCreated: string,
    babnkSuperAdmin: string,
    status: string
}
export interface TenantAdminView {
    firstName: string,
    lastName: string,
    bank: string,
    email: string,
    dateCreated: string,
    status: string
}

export interface userManagementTab {
    name: string,
    isSelected:boolean
}

export interface ISWAdminView {
    firstName: string,
    lastName: string,
    role:string,
    email:string,
    dateCreated:string,
    status: string
}

export interface UserManagementModal {
    name: string,
    isOpen: boolean,
    triggerButton: string
}