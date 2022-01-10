
export type defaultCallback<T> = (prev: T) => T



export type defaultCallbackInitiator<T> = (callback: defaultCallback<T> | T) => void

export interface State {
    id: string,
    name: string
}

export interface ComponentWithChildren {
    children: JSX.Element | JSX.Element[]
}

export interface Column {
    name: string,
    key: string,
    ele?:string,
    prefix?:string,
    suffix?:string
}

export interface Tab {
    name: string,
    isSelected: boolean
}


export interface apiUrlsv1Model {
    atmCount: string,
    atmCountDetails: string,
    atmInService: string,
    atmInServiceDetails:string,
    atmInSupervisor: string,
    atmInSupervisorDetails: string,
    atmOutOfService: string,
    atmOutOfServiceDetails: string,
    atmStats: string,
    audit: string,
    auditByUser:string,
    createTenantAdmin: string,
    interChange: string,
    iswAdmin: string,
    passportUrl:string,
    states: string,
    tenant: string,
    tenantAdmin: string,
}


type performAction = <T extends Record<keyof T, T[keyof T]>>(x:T) => void

export interface Action {
    name: string,
    method: performAction
}