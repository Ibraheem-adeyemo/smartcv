import { apiUrlsv1 } from "../../constants";
import { fetchJson, getCookie } from "../../lib";
import { CreateRoleModel } from "../../models";

export const create = async(role: CreateRoleModel) => {
    try {
        if(role) {
            const token = getCookie("token")
            const s = await fetchJson<CreateRoleModel>(apiUrlsv1.createRole, {
                headers: {
                    "Authorization": `bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(role),
            })
        }
    } catch (error) {
        throw error
    }
}