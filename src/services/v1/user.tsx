import { apiUrlsv1 } from "../../constants"
import { fetchJson, getCookie } from "../../lib"
import { BankAdmin, UserModel } from "../../models"

export const  createBankAdmin = async (bankAdmin: BankAdmin) => {
    try {
        if(bankAdmin) {
            bankAdmin.username = bankAdmin.email
            const token = getCookie("token")
            const s = await fetchJson<UserModel>(apiUrlsv1.user, {
                headers: {
                    "Authorization": `bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(bankAdmin),
            })
        }
    } catch (error) {
        throw error
    }
}

