type ATMtypes = ""

export interface ATM {
    type: string,
    tenantCode: string,
    tenantName: string,
    count: number
}
export interface ATMCount extends ATM {

}

export interface ATMInService extends ATM {

}

export interface ATMInSupervisor extends ATM {

}