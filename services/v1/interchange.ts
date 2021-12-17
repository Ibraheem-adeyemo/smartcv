import { apiUrlsv1 } from "../../constants";
import { fetchJson } from "../../lib";
import { InterchangeResponse } from "../../models";

export async function getInterchangeById(interChangeId:string) {
  try {
      const response  = await fetchJson<InterchangeResponse>(`${apiUrlsv1.interChange}/${interChangeId}`)
      return response
  } catch (error) {
      throw error
  }
}