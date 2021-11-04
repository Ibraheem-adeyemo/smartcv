import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL, CURRENT_API_VERSION } from "../../../../constants";
import { APICatch } from "../../../../lib";
import withSession, { NextironHandler } from "../../../../lib/session";
import { Onboarding } from "../../../../models";

export default withSession<NextironHandler>(async function Tenant(req, res) {


    try {
        const interchangeId = req.session.get("pass-interchange")
        if (typeof interchangeId !== "undefined" && interchangeId !== null) {
            const body = req.body as Onboarding

            const requestBody = {
                name: body.bankInfo?.bankName,
                code: "",
                domain: "",
                slogan: "",
                color: body.institutionColorInfo?.headerColor,
                bannkAdmin: {
                    ...body.superAdminInfo,
                    tenantcoe: body.bankInfo?.bankId
                }
                // ...body.institutionColorInfo,
            }
            const url = `${API_BASE_URL}/${CURRENT_API_VERSION}/tenant`
            const response = await fetch(url, {
                method: "post",
                headers: {
                    Authorization: `bearer ${body.superAdminInfo?.access_token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            const data = await response.json()
            if (response.ok || response.status === 200) {
                return res.status(200).json({
                    message: "saved successfully"
                })
            } else {
                throw {
                    data,
                    response
                }
            }
        } else {
            throw new Error("You need to login with your Organization ID")
        }

    } catch (error: any) {
        return APICatch(error, res)
    }


}, 'pass-interchange', 60 * 60)