import { apiUrlsv1, notificationMesage } from "../../constants"
import { fetchJson, getCookie } from "../../lib"
import { CreateTenantReponseModel, TenantInput } from "../../models"

export const createTenantAsync = async (tenant: TenantInput) => {
  
    try {
        if (tenant) {
            const token = getCookie("token")
            const data = await fetchJson<CreateTenantReponseModel>(apiUrlsv1.tenant, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                },
                body: JSON.stringify( tenant)
            })
            // const response = {
            //     ok: true,
            //     status: 200,
            //     json: async () => JSON.parse(requestBody)
            // }
            if(typeof window !== "undefined"){
                return data
            } else {
                throw new Error(`${notificationMesage.Oops} ${notificationMesage.AnErrorOccurred}`)
            }
        } else {
            throw new Error("You need to login with your Organization ID")
        }
    } catch (error: any) {
      
        throw error
    }
}

export const activateTenant =async (tenantId: string) => {
    // debugger
    try {
        if (tenantId) {
            const token = getCookie("token")
            const data = await fetchJson<any>(`${apiUrlsv1.activateTenant}/${tenantId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                }
            })
            // debugger
            // const response = {
            //     ok: true,
            //     status: 200,
            //     json: async () => JSON.parse(requestBody)
            // }
        } else {
            throw new Error("You need to select a tenant")
        }
    } catch (error) {
        console.error({error})
        const a  = error
        // debugger
        throw error
    }
}

export const deactivateTenant =async (tenantId: string) => {
    // debugger
    try {
        if (tenantId) {
            const token = getCookie("token")
            const data = await fetchJson<any>(`${apiUrlsv1.deactivateTenant}/${tenantId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                }
            })
            // debugger
            // const response = {
            //     ok: true,
            //     status: 200,
            //     json: async () => JSON.parse(requestBody)
            // }
        } else {
            throw new Error("You need to select a tenant")
        }
    } catch (error) {
        console.error({error})
        const a  = error
        // debugger
        throw error
    }
}