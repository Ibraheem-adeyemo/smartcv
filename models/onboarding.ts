export interface Tenant {
    name: string,
    bankId: string,
    bankBranch: string,
    bankLocation: string,
    bankAddress: string,
    bankLogo: string,
    completed: boolean,
}

export interface InstitutionColorInfo {
    headerColor: string,
    sidebarColor: string,
    buttonColor: string,
    completed: boolean,
}

export interface BankAdmin {
    firstName: string,
    lastName: string,
    email: string,
    mobileNo: string,
    password: string,
    confirmPassword: string,
    access_token: string,
    completed: boolean
}


export interface Onboarding {
    state: number,
    tenant: Tenant,
    bankAdmin: BankAdmin,
    institutionColorInfo: InstitutionColorInfo,
    url: string

}

export type Step = {
    name: string,
    description: string,
    url: string,
    key: string
}

export interface stepsProps {
    step: number
}

export interface PassportLoginCredentials {
    email: string,
    password: string
}