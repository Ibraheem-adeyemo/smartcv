import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLoading } from ".";
import { cookieKeys, cookiesTimeout, links, onboardingTabs, sessionStorageKeys } from "../constants";
import { getCookie, setCookie } from "../lib";
import { Tenant, defaultCallback, defaultCallbackInitiator, InstitutionColorInfo, Loading, Onboarding, Step, tenantAdmin } from "../models";


export const initialOnboardingData: Onboarding = {
    state: 0, tenant: {
        name: "",
        address: "",
        branch: "",
        tenantCode: "",
        location: "",
        logo: "",
        completed: false,
    },
    tenantAdmin: {
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        password: "",
        confirmPassword: "",
        access_token: "",
        completed: false
    },
    institutionColorInfo: {
        headerColor: "",
        sidebarColor: "",
        buttonColor: "",
        completed: false
    },
    url: ""
}
const checkPersistedData = () => {
    const persistedData = sessionStorage.getItem(sessionStorageKeys.onboarding)
    if (persistedData === null || typeof persistedData === "undefined") {

        sessionStorage.setItem(sessionStorageKeys.onboarding, JSON.stringify(initialOnboardingData))
        return initialOnboardingData
    } else {
        return JSON.parse(persistedData)
    }
}

interface UseOnboardingReturn {
    steps: Step[],
    onboarding?: Onboarding,
    addInfo: (onboardingKey: keyof Onboarding, stepKey: keyof Tenant | keyof tenantAdmin | keyof InstitutionColorInfo, value: any) => void,
    completeForm: (onboardingKey: keyof Onboarding) => void,
    refresh: (onboardingKey: keyof Onboarding, state: number) => void,
    changeIsRefresh: defaultCallbackInitiator<boolean>,
    resetForm: (onboardingKey: keyof Onboarding, data: Tenant | tenantAdmin | InstitutionColorInfo, state?: number) => void,
    previousState: () => void,
    loading: Loading,
    startLoading: () => void,
    stopLoading: () => void
}
export default function useOnboarding(): UseOnboardingReturn {

    const [onboarding, setOnboarding] = useState<Onboarding>(initialOnboardingData)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)
    const router = useRouter()
    const [loading, setLoading] = useLoading({ isLoading: false, text: "" })

    useEffect(() => {
        // debugger
        if (typeof window !== "undefined") {
            setCookie(cookieKeys.token, "", cookiesTimeout.timeoutCookie)
        }
        setLoading({ isLoading: true, text: "loading" })
        if (typeof window !== "undefined") {
            if (typeof isRefresh !== "undefined") {
                if (isRefresh) {
                    sessionStorage.removeItem(sessionStorageKeys.onboarding)
                }
            }
            setOnboarding(checkPersistedData())
        }
        setLoading({ isLoading: false, text: "" })
    }, [checkPersistedData, isRefresh])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const interchangeId = getCookie(cookieKeys.interchangeId) === "" ? window.sessionStorage.getItem(sessionStorageKeys.interchangeId) : getCookie(cookieKeys.interchangeId)
            if (!interchangeId) {
                sessionStorage.removeItem(sessionStorageKeys.onboarding)
                router.push(links.registerOrganization)
            }
        }
        setLoading({ isLoading: true, text: "loading" })
        if (onboarding !== null && typeof onboarding !== "undefined") {
            if (Object.keys(onboarding).length > 1) {
                sessionStorage.setItem(sessionStorageKeys.onboarding, JSON.stringify(onboarding))
            }
        }
        setLoading({ isLoading: false, text: "" })

        return () => {
            // setOnboarding(initialData)
            sessionStorage.removeItem(sessionStorageKeys.onboarding)
        }
    }, [onboarding])

    const changeIsRefresh = (callback: defaultCallback<boolean> | boolean) => {
        setIsRefresh(callback)
    }

    const startLoading = () => {
        setLoading({ isLoading: true, text: "loading" })
    }
    const stopLoading = () => {
        setLoading({ isLoading: false, text: "" })
    }
    const addInfo = (onboardingKey: keyof Onboarding, stepKey: keyof Tenant | keyof tenantAdmin | keyof InstitutionColorInfo, value: any) => {
        // debugger
        setOnboarding(prev => {

            const data: Onboarding = _.clone(prev)
            const returnedData: Onboarding = {
                ...data,
                [onboardingKey]: {
                    ...data[onboardingKey] as Tenant | tenantAdmin | InstitutionColorInfo,
                    [stepKey]: value
                } as Tenant
            }
            return returnedData
        })
    }

    const refresh = (onboardingKey: keyof Onboarding, state: number) => {

        setOnboarding(prev => ({
            ...prev,
            state,
            [onboardingKey]: {
                ...prev[onboardingKey] as Tenant | tenantAdmin | InstitutionColorInfo,
                completed: false
            }
        }))
    }
    const completeForm = (onboardingKey: keyof Onboarding) => {

        setOnboarding(prev => (
            {
                ...prev,
                state: (prev.state as number) + 1,
                [onboardingKey]: {
                    ...prev[onboardingKey] as Tenant | tenantAdmin | InstitutionColorInfo,
                    completed: true
                }
            }))
    }

    const resetForm = (onboardingKey: keyof Onboarding, data: Tenant | tenantAdmin | InstitutionColorInfo, state?: number) => {
        setOnboarding(prev => (
            {
                ...prev,
                state: typeof state === "undefined" ? (prev.state as number) : state,
                [onboardingKey]: {
                    ...data
                }
            }))
    }

    const previousState = () => {
        setOnboarding(prev => (
            {
                ...prev,
                state: (prev.state as number) - 1
            }))
    }

    return { steps: _.clone(onboardingTabs) as Step[], onboarding, changeIsRefresh, addInfo, completeForm, refresh, resetForm, previousState, loading, startLoading, stopLoading }
}

