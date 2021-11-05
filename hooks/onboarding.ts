import _ from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useLoading } from ".";
import { CURRENT_API_VERSION, links } from "../constants";
import { Tenant, defaultCallback, defaultCallbackInitiator, InstitutionColorInfo, Loading, Onboarding, Step, BankAdmin } from "../models";


export const steps: Step[] = [
    {
        name: "Create bank",
        description: "Provide bank information and validation code",
        url: links.createBank,
        key:"tenant"
    }, {
        name: "Create Super Admin",
        description: "Enter superadmin information and create user",
        url: links.createSuperAdmin,
        key: "bankAdmin"
    }, {
        name: "Institution colors",
        description: "Select the color scheme for the institution",
        url: links.institutionColors,
        key:"institutionColorInfo"
    }
]
export const initialOnboardingData: Onboarding = {state:0, tenant: {
    name:"",
    bankAddress:"",
    bankBranch:"",
    bankId:"",
    bankLocation:"",
    bankLogo:"",
    completed:false,
},
bankAdmin: {
    firstName:"",
    lastName:"",
    email:"",
    mobileNo:"",
    password:"",
    confirmPassword:"",
    access_token:"",
    completed: false
},
institutionColorInfo: {
    headerColor:"",
    sidebarColor:"",
    buttonColor:"",
    completed: false
},
url:""
}
const checkPersistedData = () => {
    const persistedData = sessionStorage.getItem("onboarding")
    if (persistedData === null || typeof persistedData === "undefined") {

        sessionStorage.setItem("onboarding", JSON.stringify(initialOnboardingData))
        return initialOnboardingData
    } else {
        return JSON.parse(persistedData)
    }
}

interface UseOnboardingReturn {
    steps:Step[],
    onboarding?: Onboarding,
    addInfo:(onboardingKey: keyof Onboarding, stepKey: keyof Tenant |  keyof BankAdmin |  keyof InstitutionColorInfo , value:any) => void,
    completeForm:(onboardingKey: keyof Onboarding) =>void,
    refresh:(onboardingKey: keyof Onboarding, state:number) => void,
    changeIsRefresh:defaultCallbackInitiator<boolean>,
    resetForm: (onboardingKey: keyof Onboarding, data: Tenant | BankAdmin | InstitutionColorInfo, state?: number) => void,
    previousState: () => void,
    loading: Loading,
    startLoading: () => void,
    stopLoading: () => void
}
export default function useOnboarding():UseOnboardingReturn {

    const {data:interchangeId, mutate, error} = useSWR<{interchange: string}, string>(`/api/${CURRENT_API_VERSION}/interchange/checkexistinginterchange`)
    const [onboarding, setOnboarding] = useState<Onboarding>(initialOnboardingData)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)
    const router = useRouter()
    const [loading, setLoading] = useLoading({isLoading:false, text:""})
    useEffect(() => {
        if(typeof interchangeId?.interchange !== "undefined") {
            // debugger
            if(interchangeId.interchange === "") {
                sessionStorage.removeItem("onboarding")
                router.push(links.registerOrganization)
            }
        }
    },[interchangeId?.interchange])

    useMemo(() => {
        // debugger
        setLoading({isLoading:true, text:"loading"})
        if (typeof window !== "undefined") {
            if(typeof isRefresh !== "undefined"){
                if(isRefresh) {
                    sessionStorage.removeItem("onboarding")
                }
            }
            setOnboarding(checkPersistedData())
        }
        setLoading({isLoading:false, text:""})
    }, [checkPersistedData, isRefresh])

    useEffect(() => {
        setLoading({isLoading:true, text:"loading"})
        if (onboarding !== null && typeof onboarding !== "undefined") {
            if (Object.keys(onboarding).length > 1) {
                sessionStorage.setItem("onboarding", JSON.stringify(onboarding))
            }
        }
        setLoading({isLoading:false, text:""})

        return () => {
            // setOnboarding(initialData)
            sessionStorage.removeItem("onboarding")
        }
    }, [onboarding])

    const changeIsRefresh = (callback:defaultCallback<boolean>|boolean) => {
        setIsRefresh(callback)
    }
    
    const startLoading =() => {
        setLoading({isLoading:true, text:"loading"})
    }
    const stopLoading =() => {
        setLoading({isLoading:false, text:""})
    }
    const addInfo =(onboardingKey: keyof Onboarding, stepKey: keyof Tenant |  keyof BankAdmin |  keyof InstitutionColorInfo , value:any) => {
        // debugger
        setOnboarding(prev => {

            const data: Onboarding = _.clone(prev)
            const returnedData: Onboarding = {
                ...data,
                [onboardingKey]: {
                    ...data[onboardingKey] as Tenant | BankAdmin | InstitutionColorInfo,
                    [stepKey]: value
                } as Tenant
            }
            return returnedData
        })
    }

    const refresh = (onboardingKey: keyof Onboarding, state:number) => {

        setOnboarding(prev => ({
            ...prev,
            state,
            [onboardingKey]: {
                ...prev[onboardingKey] as Tenant | BankAdmin | InstitutionColorInfo,
                completed: false
            }
        }))
    }
    const completeForm = (onboardingKey: keyof Onboarding) =>{

        setOnboarding(prev => (
            {
                ...prev,
                state: (prev.state as number) + 1,
                [onboardingKey]: {
                    ...prev[onboardingKey] as Tenant | BankAdmin | InstitutionColorInfo,
                    completed: true
                }
            }))
    }

    const resetForm = (onboardingKey:keyof Onboarding, data:Tenant | BankAdmin | InstitutionColorInfo, state?:number) => {
        setOnboarding(prev => (
            {
                ...prev,
                state: typeof state === "undefined"? (prev.state as number): state ,
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

    return { steps, onboarding, changeIsRefresh, addInfo, completeForm, refresh, resetForm, previousState, loading, startLoading, stopLoading }
}

