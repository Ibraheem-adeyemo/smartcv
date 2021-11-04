import _ from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { CURRENT_API_VERSION, links } from "../constants";
import { BankInfo, defaultCallback, defaultCallbackInitiator, InstitutionColorInfo, Loading, Onboarding, Step, SuperAdminInfo } from "../models";


export const steps: Step[] = [
    {
        name: "Create bank",
        description: "Provide bank information and validation code",
        url: links.createBank,
        key:"bankInfo"
    }, {
        name: "Create Super Admin",
        description: "Enter superadmin information and create user",
        url: links.createSuperAdmin,
        key: "superAdminInfo"
    }, {
        name: "Institution colors",
        description: "Select the color scheme for the institution",
        url: links.institutionColors,
        key:"institutionColorInfo"
    }
]
const initialData = {state:0, bankInfo: {
    bankName:"",
    bankAddress:"",
    bankBranch:"",
    bankId:"",
    bankLocation:"",
    bankLogo:"",
    completed:false,
},
superAdminInfo: {
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
    const persistedData = localStorage.getItem("onboarding")
    if (persistedData === null || typeof persistedData === "undefined") {

        sessionStorage.setItem("onboarding", JSON.stringify(initialData))
        return initialData
    } else {
        return JSON.parse(persistedData)
    }
}

interface UseOnboardingReturn {
    steps:Step[],
    onboarding?: Onboarding,
    addInfo:(onboardingKey: keyof Onboarding, stepKey: keyof BankInfo |  keyof SuperAdminInfo |  keyof InstitutionColorInfo , value:any) => void,
    completeForm:(onboardingKey: keyof Onboarding) =>void,
    refresh:(onboardingKey: keyof Onboarding, state:number) => void,
    changeIsRefresh:defaultCallbackInitiator<boolean>,
    resetForm: (onboardingKey: keyof Onboarding, data: BankInfo | SuperAdminInfo | InstitutionColorInfo, state?: number) => void,
    previousState: () => void
}
export default function useOnboarding():UseOnboardingReturn {

    const {data:interchangeId, mutate, error} = useSWR<{interchange: string}, string>(`/api/${CURRENT_API_VERSION}/interchange/checkexistinginterchange`)
    const [onboarding, setOnboarding] = useState<Onboarding>(initialData)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if(typeof interchangeId?.interchange !== "undefined") {
            if(interchangeId.interchange === "") {
                sessionStorage.removeItem("onboarding")
                router.push("/register")
            }
        }
    },[interchangeId?.interchange])

    useMemo(() => {
        // debugger

        if (typeof window !== "undefined") {
            if(typeof isRefresh !== "undefined"){
                if(isRefresh) {
                    sessionStorage.removeItem("onboarding")
                }
            }
            setOnboarding(checkPersistedData())
        }
    }, [checkPersistedData, isRefresh])

    useEffect(() => {
        // debugger
        if (onboarding !== null && typeof onboarding !== "undefined") {
            if (Object.keys(onboarding).length > 1) {
                sessionStorage.setItem("onboarding", JSON.stringify(onboarding))
            }
        }

        return () => {
            // setOnboarding(initialData)
            sessionStorage.removeItem("onboarding")
        }
    }, [onboarding])

    const changeIsRefresh = (callback:defaultCallback<boolean>|boolean) => {
        setIsRefresh(callback)
    }
    

    const addInfo =(onboardingKey: keyof Onboarding, stepKey: keyof BankInfo |  keyof SuperAdminInfo |  keyof InstitutionColorInfo , value:any) => {
        debugger
        setOnboarding(prev => {

            const data: Onboarding = _.clone(prev)
            const returnedData: Onboarding = {
                ...data,
                [onboardingKey]: {
                    ...data[onboardingKey] as BankInfo | SuperAdminInfo | InstitutionColorInfo,
                    [stepKey]: value
                } as BankInfo
            }
            return returnedData
        })
    }

    const refresh = (onboardingKey: keyof Onboarding, state:number) => {

        setOnboarding(prev => ({
            ...prev,
            state,
            [onboardingKey]: {
                ...prev[onboardingKey] as BankInfo | SuperAdminInfo | InstitutionColorInfo,
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
                    ...prev[onboardingKey] as BankInfo | SuperAdminInfo | InstitutionColorInfo,
                    completed: true
                }
            }))
    }

    const resetForm = (onboardingKey:keyof Onboarding, data:BankInfo | SuperAdminInfo | InstitutionColorInfo, state?:number) => {
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
    return { steps, onboarding, changeIsRefresh, addInfo, completeForm, refresh, resetForm, previousState }
}

