import { apiUrlsv1 } from "../../constants"
import { fetchJson, getCookie } from "../../lib"
import { BankAdmin, tenantAdmin, UserModel } from "../../models"

export const  createBankAdmin = async (bankAdmin: tenantAdmin) => {
    try {
        if(bankAdmin) {
            const data = {
                username: bankAdmin.email,
                email: bankAdmin.email,
                tenantCode: (bankAdmin as any).tenantCode,
                mobileNo: bankAdmin.mobileNo,
                firstName: bankAdmin.firstName,
                lastName: bankAdmin.lastName,
                password: bankAdmin.password
             }
            const token = getCookie("token")
            const s = await fetchJson<UserModel>(apiUrlsv1.user, {
                headers: {
                    "Authorization": `bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(data),
            })
        }
    } catch (error) {
        throw error
    }
}

