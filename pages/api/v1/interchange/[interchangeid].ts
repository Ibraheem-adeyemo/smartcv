import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL, CURRENT_API_VERSION } from "../../../../constants";
import { APICatch } from "../../../../lib";
import withSession, { NextironHandler } from "../../../../lib/session";
import { APIResponse, ErrorResponse, InterchangeResponse } from "../../../../models";

export default withSession<NextironHandler>(async function Interchange(req, res) {
    try {
        // debugger
        const {interchangeid} = req.query
        const url = `${API_BASE_URL}/${CURRENT_API_VERSION}/interchange/${interchangeid}`
        const response = await fetch(url)
        const data = await response.json() as APIResponse<InterchangeResponse>
        if(response.ok || response.status === 200) {
            if(+data.data.statusCondition === 1) {
                req.session.set("pass-interchange", data.data.node)
                await req.session.save()
                return res.status(200).json(data.data)
            } else throw new Error("You can't register with this id")
        }
        else {
            throw {
                data: data as ErrorResponse,
                response
            }
        }
    } catch (error:any) {
        return APICatch(error, res)
    }
}, 'pass-interchange', 60*60 )