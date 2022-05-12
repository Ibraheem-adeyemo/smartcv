import { CLIENT_ID, API_BASE_URL, CURRENT_API_VERSION, NEXT_PUBLIC_PASSPORT_BASE_URL } from ".";
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
    activateAccount: `${API_BASE_URL}${CURRENT_API_VERSION}/user/activate`,
    activateTenant: `${API_BASE_URL}${CURRENT_API_VERSION}/tenant/activate`,
    atmCount: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/count`,
    atmCountDetails: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/count/`,
    atmInService: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/in-service`,
    atmInServiceDetails: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/in-service/`,
    atmInSupervisor: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/supervisor`,
    atmInSupervisorDetails: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/supervisor/`,
    atmOutOfService: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/offline`,
    atmOutOfServiceDetails: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/offline/`,
    atmStats: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/atm/`,
    audit: `${API_BASE_URL}${CURRENT_API_VERSION}/audit/`,
    auditByUser: `${API_BASE_URL}${CURRENT_API_VERSION}/audit/user`,
    balanceEnquiry: `${API_BASE_URL}${CURRENT_API_VERSION}/monitor/transaction/balance/`,
    createRole: `${API_BASE_URL}${CURRENT_API_VERSION}/roles/create`,
    createTenantAdmin: `${API_BASE_URL}${CURRENT_API_VERSION}/user/tenant-admin`,
    deactivateTenant: `${API_BASE_URL}${CURRENT_API_VERSION}/tenant/deactivate`,
    getUserDetail: `${API_BASE_URL}${CURRENT_API_VERSION}/user`,
    healthCheck: `${API_BASE_URL}${CURRENT_API_VERSION}/actuator/health`,
    interChange: `${API_BASE_URL}${CURRENT_API_VERSION}/interchange/find`,
    interchangeDisconnectionStatus: `${API_BASE_URL}${CURRENT_API_VERSION}/interchange`,
    interchangeDisconnectionRequest: `${API_BASE_URL}${CURRENT_API_VERSION}/interchange/requests`,
    iswAdmin: `${API_BASE_URL}${CURRENT_API_VERSION}/user/admins/super`,
    passporProfileUrl: `${NEXT_PUBLIC_PASSPORT_BASE_URL}api/v1/accounts/me`,
    passportUrl: `${NEXT_PUBLIC_PASSPORT_BASE_URL}oauth/authorize?client_id=${CLIENT_ID}&scope=profile&response_type=code&redirect_uri=`,
    passportTokenUrl: `${NEXT_PUBLIC_PASSPORT_BASE_URL}oauth/token`,
    pinChange:`${API_BASE_URL}${CURRENT_API_VERSION}/monitor/transaction/pin-change/`,
    resendActivationMail: `${API_BASE_URL}${CURRENT_API_VERSION}/notification/activation/user/`,
    requestReconnection: `${API_BASE_URL}${CURRENT_API_VERSION}/interchange/open`,
    states: `${API_BASE_URL}${CURRENT_API_VERSION}/location/states`,
    tenant: `${API_BASE_URL}${CURRENT_API_VERSION}/tenant`,
    tenantAdmin: `${API_BASE_URL}${CURRENT_API_VERSION}/user/admins`,
    user: `${API_BASE_URL}${CURRENT_API_VERSION}/user/`,
    loginWithCredential: `${API_BASE_URL}${CURRENT_API_VERSION}/user/login`
}