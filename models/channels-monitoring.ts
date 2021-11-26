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

export interface ATMCountDetail {
    tenantName: string,
    tenantCode: string,
    terminalId: string,
    terminalStatus: string,
    externalIP: string,
    internalPort: string,
    location: string,
    state: string,
    lastTranTime: string
}