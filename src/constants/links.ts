import { CLIENT_ID, API_BASE_URL, CURRENT_API_VERSION } from ".";
import { apiUrlsv1Model } from "../models";

export enum links {
    index = "/",
    registerOrganization = "/register",
    dashboard = "/dashboard",
    login = "/login",
    userManagement = "/user-management",
    createBank = "/onboarding/craate-bank",
    createSuperAdmin = "/onboarding/create-super-admin",
    institutionColors = "/onboarding/institution-colors",
    onboarding = "/onboarding",
    onboardingSuccessPage = "/onboarding/success-page",
    oauthCallback = "/oauth-callback",
    notFound = "/404",
    channelsMonitoring = "/channels-monitoring",
    transactionMonitoring = "/transaction-monitoring",
    audit = "/audit",
    interchangeDisconnection = "/interchange-disconnection",
    paasLogin="/paas-login"
}

export const onboardingURL = "http://127.0.0.1:5500" /* (This is the current production url but may change in the future) */

export const apiUrlsv1: Readonly<apiUrlsv1Model> = {
    activateAccount: `/user/activate`,
    activateTenant: `/tenant/activate`,
    atmCount: `/monitor/atm/count`,
    atmCountDetails: `/monitor/atm/count/`,
    atmInService: `/monitor/atm/in-service`,
    atmInServiceDetails: `/monitor/atm/in-service/`,
    atmInSupervisor: `/monitor/atm/supervisor`,
    atmInSupervisorDetails: `/monitor/atm/supervisor/`,
    atmOutOfService: `/monitor/atm/offline`,
    atmOutOfServiceDetails: `/monitor/atm/offline/`,
    atmStats: `/monitor/atm/`,
    audit: `/audit/`,
    auditByUser: `/audit/user`,
    balanceEnquiry: `/monitor/transaction/balance/`,
    createRole: `/roles/create`,
    createTenantAdmin: `/user/tenant-admin`,
    deactivateTenant: `/tenant/deactivate`,
    getUserDetail: `/user`,
    healthCheck: `/actuator/health`,
    interChange: `/interchange/find`,
    interchangeDisconnectionStatus: `/interchange`,
    interchangeDisconnectionRequest: `/interchange/requests`,
    iswAdmin: `/user/admins/super`,
    passporProfileUrl: `/api/v1/accounts/me`,
    passportUrl: `/oauth/authorize?client_id=${CLIENT_ID}&scope=profile&response_type=code&redirect_uri=`,
    passportTokenUrl: `/oauth/token`,
    pinChange:`/monitor/transaction/pin-change/`,
    resendActivationMail: `/notification/activation/user/`,
    states: `/location/states`,
    tenant: `/tenant`,
    tenantAdmin: `/user/admins`,
    user: `/user/`,
    loginWithCredential: `/user/login`
}