import { Tab } from ".";

type ATMtypes = ""

export interface ATM {
    type: string,
    tenantCode: string,
    tenantName: string,
    count: number
}

export interface TransactionBreakdownType {
    amount:number
    tenantCode:string
    tranId:number
    volume:number
}

export interface ATMStats extends ATM {

}

export interface ATMCount extends ATM {

}

export interface ATMInService extends ATM {

}

export interface ATMInSupervisor extends ATM {

}

export interface channelsMonitoringTab extends Tab {
    url: string
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