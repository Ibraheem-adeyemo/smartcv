export enum cookieKeys {
    token = "token",
    email = "email",
    tokenExpiresIn = "token-expires-in",
    tokenDurationDate = "token-duration-date",
    interchangeId = "interchange-id",
    redirectUrl = "redirectUrl",
    createdAccount = "created-account",
    totalTenant = "total-tenant",
    totalTenantAdmin = "total-tenant-admin",
    totalISWAdmin = "total-isw-admin",
    requestConnectionTimeout = "request-connection-timout",
    refreshToken = "refresh-token"
}

export enum cookiesTimeout {
    timeoutCookie = -60,
    requestConnectionTimeout = 30,
    interchangeIdTimeout = 15,
    totalTenantAdminTimeout = 10,
    totalTenantTimeout = 10,
    totalISWAdminTimeout = 10,
    tokenTimeout = 600000,
    emailTimeout = 600000,
    tokenDurationDateTimeout = 60,
    tokenExpiresInTimeout = 60,
    redirectUrlTimeout = 10,
    createdAccountTimeout = 5,
    refreshTokenTimeout = 600000
}
export enum sessionStorageKeys {
    fromAnotherOrigin = "from-another-origin",
    fromAnotherOriginSetDate = "from-another-origin-set-date",
    fromAnotherOriginTimeout = "from-another-origin-timeout",
    onboarding = 'onboarding',
    interchangeIdTimeout=15,
    interchangeIdSetDate="interchange-id-set-date",
    interchangeId="interchange-id",
}

export enum sessionStorageTimeout {
    fromAnotherOriginTimeout = 15,
    interchangeIdTimeout=15,
}

export const a = "co"
export const b = "ok"
export const c = "ie"