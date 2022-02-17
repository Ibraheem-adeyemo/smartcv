export interface AuditView {
    id: number,
    requestId: string,
    username: string,
    tenantCode: string,
    originIP: string,
    tenant: string,
    user: string,
    module: string,
    action: string,
    className: string,
    method: string,
    arguments: string,
    response: string,
    executionTime: number,
    date: string,
    uri:string
}

