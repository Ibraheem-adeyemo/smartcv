import { PASSPORT_AUTHORIZE_URL, CLIENT_ID, SCOPE, RESPONSE_TYPE, API_BASE_URL_ALTERNATIVE, CURRENT_API_VERSION } from ".";

export enum links {
    index="/",
    registerOrganization = "/register",
    dashboard="/dashboard",
    login="/login",
    userManagement="/user-management",
    createBank="/onboarding/craate-bank",
    createSuperAdmin="/onboarding/create-super-admin",
    institutionColors="/onboarding/institution-colors",
    onboarding="/onboarding",
    onboardingSuccessPage="/onboarding/success-page",
    notFound="/404",
    channelsMonitoring="/channels-monitoring"
}

export const apiUrlsv1: Readonly<Record<string, string>> = {
    passportUrl:`${PASSPORT_AUTHORIZE_URL}?client_id=${CLIENT_ID}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}&redirect_uri=`,
    states:`${API_BASE_URL_ALTERNATIVE}/${CURRENT_API_VERSION}/location/states`,
    tenantAdmin:`/api/get-bank-admins`,
    iswAdmin:`/api/get-isw-admins`,
    tenant:`${API_BASE_URL_ALTERNATIVE}/${CURRENT_API_VERSION}/tenant`,
    atmCount: `${API_BASE_URL_ALTERNATIVE}/${CURRENT_API_VERSION}/monitor/atm/count`,
    atmInService:`${API_BASE_URL_ALTERNATIVE}/${CURRENT_API_VERSION}/monitor/atm/in-service`,
    atmOutOfService:`${API_BASE_URL_ALTERNATIVE}/${CURRENT_API_VERSION}/monitor/atm/offline`,
    atmInSupervisor:`${API_BASE_URL_ALTERNATIVE}/${CURRENT_API_VERSION}/monitor/atm/supervisor`
}