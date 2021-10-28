export  interface BankInfo{
    bankName: string,
    bankId:string,
    bankBranch:string,
    bankLocation:string,
    bankAddress:string,
    bankLogo:string
}


export interface Onboarding {
    state?:number,
    bankInfo?: BankInfo
}