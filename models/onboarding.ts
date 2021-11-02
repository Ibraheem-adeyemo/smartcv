export  interface BankInfo{
    bankName: string,
    bankId:string,
    bankBranch:string,
    bankLocation:string,
    bankAddress:string,
    bankLogo:string,
    completed:boolean,
}

export  interface InstitutionColorInfo{
    completed:boolean,
}

export  interface SuperAdminInfo {
    firstName: string,
    lastName: string,
    emailAddress:string,
    phoneNumber:string,
    password:string,
    completed:boolean
}


export interface Onboarding {
    state?:number,
    bankInfo?: BankInfo,
    superAdminInfo?: SuperAdminInfo,
    institutionColorInfo?: InstitutionColorInfo,
    url:string

}

export type Step = {
    name: string,
    description: string,
    url: string,
    key: string
}

export type onboardingCallback = (prev:Onboarding) => Onboarding

export type isRefreshCallback = (prev:boolean) => boolean

export type ChangeOnboarding = (callback: onboardingCallback) => void

export type ChangeIsRefresh = (callback: isRefreshCallback) => void

export interface stepsProps {
    step: number
}

export interface PassportLoginCredentials {
    email: string,
    password: string
}