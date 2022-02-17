import { Tab } from ".";

export interface InterchangeDisconnectionStatus {
    timee: string,
    status:string,
    tenant:string
}

export interface InterchangeDisconnectionRequest {
    dateSent:string,
    tenant:string,
    disconnectionTime:string,
    requester: string,
    status: string
}


export interface interchangeDisconnectionTab extends Tab {
    url: string
}