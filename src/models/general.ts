import { ReactNode } from "react"

export type defaultCallback<T> = (prev: T) => T



export type defaultCallbackInitiator<T> = (callback: defaultCallback<T> | T) => void

export interface State {
    id: string,
    name: string
}

export interface ComponentWithChildren {
    children: ReactNode
}

export interface Column {
    name: string,
    key: string,
    ele?: string,
    prefix?: string,
    suffix?: string,
    lookUp?: Record<string, any>
}

export interface Tab {
    name: string,
    isSelected: boolean
}


export interface apiUrlsv1Model {
    activateAccount: string,
    activateTenant: string,
    atmCount: string,
    atmCountDetails: string,
    atmInService: string,
    atmInServiceDetails: string,
    atmInSupervisor: string,
    atmInSupervisorDetails: string,
    atmOutOfService: string,
    atmOutOfServiceDetails: string,
    atmStats: string,
    audit: string,
    auditByUser: string,
    balanceEnquiry: string,
    createRole: string,
    createTenantAdmin: string,
    deactivateTenant: string,
    forwardQueue: string,
    getUserDetail: string,
    healthCheck: string,
    interChange: string,
    interchangeDisconnectionRequest: string,
    interchangeDisconnectionStatus: string,
    iswAdmin: string,
    passporProfileUrl: string,
    passportUrl: string,
    passportTokenUrl: string,
    pinChange: string,
    resendActivationMail: string,
    requestReconnection: string,
    states: string,
    tenant: string,
    tenantAdmin: string,
    transactionDetails: string,
    realTimeTransactionReport:string,
    user: string,
    loginWithCredential: string,
    issuingVolumeAdmin: string,
    issuingVolume: string,
    issuingVolumeStatus: string;
    issuingVolumeStatusAdmin: string;
    issuingVolumeChannel: string;
    issuingVolumeChannelAdmin: string
}

type performAction = <T extends Record<keyof T, T[keyof T]>>(x: T) => void
type showFunc = <T extends Record<keyof T, T[keyof T]>>(x: T) => boolean
export interface Action {
    name: string,
    method: performAction,
    bgColor?: string,
    color?: string,
    showTextOnly?: boolean,
    ele?: string,
    show?: boolean | showFunc
}


export interface setFiltersToShowProps {
    showTenantFilter?: boolean,
    showStartDateFilter?: boolean,
    showEndDateFilter?: boolean,
    showCountIntervalFilter?: boolean,
    showDurationFilter?: boolean
}