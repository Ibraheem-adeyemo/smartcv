import { API_BASE_URL, API_BASE_URL_ALTERNATIVE, CURRENT_API_VERSION } from "../../constants";
import { fetchJson } from "../../lib";
import { InterchangeResponse } from "../../models";

export async function getInterchangeById(interChangeId:string) {
  try {
      const response  = await fetchJson<InterchangeResponse>(`${API_BASE_URL_ALTERNATIVE}/${CURRENT_API_VERSION}/interchange/${interChangeId}`)
      return response
  } catch (error) {
      throw error
  }
}