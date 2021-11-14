export interface BankView {
    name: string,
    bankLogo: string,
    bankId: string,
    address: string,
    dateCreated: string,
    babnkSuperAdmin: string,
    status: string
}
export interface BankAdminView {
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