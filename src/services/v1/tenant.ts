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
                throw new Error(notificationMesage.AnErrorOccurred)
            }
        } else {
            throw new Error("You need to login with your Organization ID")
        }
    } catch (error: any) {
      
        throw error
    }
}