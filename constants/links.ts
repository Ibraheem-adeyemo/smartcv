import { PASSPORT_AUTHORIZE_URL, CLIENT_ID, REDIRECT_URI, SCOPE, RESPONSE_TYPE } from ".";

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
    notFound="/404"
}

export const apiUrls = {
    passportUrl:`${PASSPORT_AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`
}