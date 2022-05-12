import { apiUrlsv1 } from "../../constants";
import { fetchJson, getCookie } from "../../lib";
import { APIResponse, InterchangeApiResponse, InterchangeReconection, InterchangeResponse } from "../../models";

export async function getInterchangeById(interChangeId:string) {
  try {
      const response  = await fetchJson<InterchangeResponse>(`${apiUrlsv1.interChange}/${interChangeId}`)
      return response
  } catch (error) {
      throw error
  }
}

export const  openReconnection = async (role: InterchangeReconection):Promise<InterchangeApiResponse> => {
  let option = {
      interchangeName : role?.interchangeName,
      tenantCode : role?.tenantCode,
      command : "open"
  }
  try {
        const token = getCookie("token")
        const response = await fetchJson<InterchangeApiResponse>(apiUrlsv1.requestReconnection, {
            headers: {
                "Authorization": `bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(option),
        })

        return response
  } catch (error) {
      throw error
  }
}