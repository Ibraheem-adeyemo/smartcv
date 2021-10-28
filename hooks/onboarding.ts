import { useEffect, useMemo, useState } from "react";
import { links } from "../constants";
import { BankInfo, Onboarding } from "../models";

const steps = [
    {
        name: "Create bank",
        description: "Provide bank information and validation code",
        url: links.createBank
    }, {
        name: "Create Super Admin",
        description: "Enter superadmin information and create user",
        url: links.createSuperAdmin
    }, {
        name: "Institution colors",
        description: "Select the color scheme for the institution",
        url: links.institutionColors
    }
]
const checkPersistedData = () => {
    const persistedData = localStorage.getItem("onboarding")
    if (persistedData === null || typeof persistedData === "undefined") {
        const obj = {
            state: 0
        }
        localStorage.setItem("onboarding", JSON.stringify(obj))
        return obj
    } else {
        return JSON.parse(persistedData)
    }
}
export default function useOnboarding() {
    const [onboarding, setOnboarding] = useState<Onboarding>({state:0, bankInfo: {
        bankName:"",
        bankAddress:"",
        bankBranch:"",
        bankId:"",
        bankLocation:"",
        bankLogo:""
    }})

    useMemo(() => {
        if(typeof window !== "undefined")
        setOnboarding(checkPersistedData())
    }, [checkPersistedData])

    useEffect(() => {
        if (onboarding !== null && typeof onboarding !== "undefined") {
            if (Object.keys(onboarding).length > 1) {
                localStorage.setItem("onboarding", JSON.stringify(onboarding))
            }
        }

        return () => {
            localStorage.removeItem("onboarding")
        }
    }, [onboarding])

    return { steps, onboarding, setOnboarding }
}