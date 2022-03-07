import { apiUrlsv1, notificationMesage } from "../../constants"
import { TenantInput } from "../../models"

export const createTenantAsync = async (tenant: TenantInput) => {
  
    try {
        if (tenant) {
            const requestBody = JSON.stringify( tenant)
            const url = apiUrlsv1.tenant
            const response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestBody
            })
            // const response = {
            //     ok: true,
            //     status: 200,
            //     json: async () => JSON.parse(requestBody)
            // }
            const data = await response.json()
            if (response.ok || response.status === 200) {
                if(typeof window !== "undefined")
                return data
            }
            else if(typeof data.message !== "undefined") {
                throw data.message
            } else {
                throw notificationMesage.AnErrorOccurred
            }
        } else {
            throw new Error("You need to login with your Organization ID")
        }
    } catch (error: any) {
      
        throw error
    }
}