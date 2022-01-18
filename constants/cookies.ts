export enum cookieKeys {
    token = "token",
    interchangeId = "interchangeId",
    redirectUrl = "redirectUrl",
    createdAccount = "created-account",
    totalTenant = "total-tenant",
    totalTenantAdmin = "total-tenant-admin",
    totalISWAdmin = "total-isw-admin",
    requestConnectionTimeout = "request-connection-timout"
}

export enum cookiesTimeout {
    timeoutCookie = -60,
    requestConnectionTimeout = 30,
    interchangeIdTimeout = 15,
    totalTenantAdminTimeout = 10,
    totalTenantTimeout = 10,
    totalISWAdminTimeout = 10,
    tokenTimeout = 60,
    redirectUrlTimeout = 10,
    createdAccountTimeout = 5
}