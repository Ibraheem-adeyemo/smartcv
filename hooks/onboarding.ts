import { useCallback, useEffect, useMemo, useState } from "react";
import { links } from "../constants";
import { BankInfo, ChangeIsRefresh, ChangeOnboarding, isRefreshCallback, Onboarding, onboardingCallback, Step } from "../models";


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
    completed: false
},
institutionColorInfo: {
    completed: false
},
url:""
}
const checkPersistedData = () => {
    const persistedData = localStorage.getItem("onboarding")
    if (persistedData === null || typeof persistedData === "undefined") {

        localStorage.setItem("onboarding", JSON.stringify(initialData))
        return initialData
    } else {
        return JSON.parse(persistedData)
    }
}


export default function useOnboarding():{
    steps:Step[],
    onboarding?: Onboarding,
    changeOnboarding?:ChangeOnboarding
    changeIsRefresh?:ChangeIsRefresh
} {

    const [onboarding, setOnboarding] = useState<Onboarding>(initialData)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)


    useMemo(() => {
        // debugger
        if (typeof window !== "undefined") {
            if(typeof isRefresh !== "undefined"){
                if(isRefresh) {
                    localStorage.removeItem("onboarding")
                }
            }
            setOnboarding(checkPersistedData())
        }
    }, [checkPersistedData, isRefresh])

    useEffect(() => {
        // debugger
        if (onboarding !== null && typeof onboarding !== "undefined") {
            if (Object.keys(onboarding).length > 1) {
                localStorage.setItem("onboarding", JSON.stringify(onboarding))
            }
        }

        return () => {
            // setOnboarding(initialData)
            localStorage.removeItem("onboarding")
        }
    }, [onboarding])

    const changeOnboarding = (callback:onboardingCallback) => {
        // debugger
        setOnboarding(callback)
    }

    const changeIsRefresh = (callback:isRefreshCallback) => {
        setIsRefresh(callback)
    }
    return { steps, onboarding, changeOnboarding, changeIsRefresh }
}