import { toast, useToast } from "@chakra-ui/toast"
import { CURRENT_API_VERSION, methods, notificationMesage } from "../../constants"
import { fetchJson } from "../../lib"
import { BankAdmin, InstitutionColorInfo, Onboarding, Tenant } from "../../models"

export const createAccountAsync = async(onboarding: Onboarding) => {
    // debugger
    try {
        const url = `/api/${CURRENT_API_VERSION}/user/tenant-admin`
        const response = await  fetchJson<Onboarding, keyof BankAdmin | keyof Tenant | keyof InstitutionColorInfo | string | number | unknown>(url, {
            method:methods.post,
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(onboarding)
        })
        // debugger
        return response
    } catch (error:any) {
        // debugger
        throw error
    }
}