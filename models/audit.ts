export interface AuditView {
    tenant: string,
    branch: string,
    username: string,
    module: string,
    action: string,
    originatingIp:string,
    date: string | number
}