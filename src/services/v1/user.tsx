import { apiUrlsv1 } from "../../constants"
import { fetchJson, getCookie } from "../../lib"
import { BankAdmin, UserModel } from "../../models"

export const  createBankAdmin = async (bankAdmin: BankAdmin) => {
    try {
        if(bankAdmin) {
            const token = getCookie("token")
            const s = await fetchJson<UserModel>(apiUrlsv1.user, {
                headers: {
                    "Authorization": `bearer ${token}`
                },
                method: "post",
                body: JSON.stringify(bankAdmin),
            })
        }
    } catch (error) {
        throw error
    }
}

