import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL, CURRENT_API_VERSION } from "../../../../constants";
import { APICatch } from "../../../../lib";
import withSession, { NextironHandler } from "../../../../lib/session";
import { APIResponse, ErrorResponse, InterchangeResponse } from "../../../../models";

export default withSession<NextironHandler>(async function CheckExistinInterchange(req, res) {
    try {
        // debugger
        const interchange = req.session.get('pass-interchange')
        if(typeof interchange === "undefined" || interchange === "") {
            return res.json({interchange:""})
        }
        return  res.json({interchange})
    } catch (error:any) {
        return APICatch(error, res)
    }
}, 'pass-interchange', 60*60 )