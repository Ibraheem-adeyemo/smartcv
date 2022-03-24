import { Tab, UserManagementModal } from ".";

export interface InterchangeDisconnectionStatus {
    node: string,
    statusCondition: string,
    tenantName: string,
    host: string,
    commandPort: number,
    tenantCode: string
}

export interface InterchangeDisconnectionRequest {
    id: string,
    tenantName: string,
    tenantCode: string,
    requester: string,
    command: string,
    interchange: string,
    verdict: string,
    datetime: null
}

export interface interchangeDisconnectionTab extends Tab {
    url: string
}
export interface InterchangeReconnectionModal extends UserManagementModal {

}

export interface InterchangeReconnectionModel {
    interchangeName: string,
    tenantCode: string,
    command: string
}