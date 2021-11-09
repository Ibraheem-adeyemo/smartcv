import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL, CURRENT_API_VERSION } from "../../../../constants";
import { APICatch } from "../../../../lib";
import withSession, { NextironHandler } from "../../../../lib/session";
import { Onboarding } from "../../../../models";

export default withSession<NextironHandler>(async function Tenant(req, res) {

    debugger
    try {
        const interchangeId = req.session.get("pass-interchange")
        if (typeof interchangeId !== "undefined" && interchangeId !== null) {
            const body = req.body as Onboarding

            const requestBody = JSON.stringify({
                tenant: {
                    name: body.tenant?.name,
                    code: "",
                    domain: "",
                    slogan: "",
                    logo: body.tenant.bankLogo,
                    address:body.tenant.bankAddress,
                    location:body.tenant.bankLocation,
                    branch:body.tenant.bankBranch,
                    color: {
                        headerColor: body.institutionColorInfo.headerColor,
                        sidebarColour: body.institutionColorInfo.sidebarColor,
                        buttonColor: body.institutionColorInfo.buttonColor
                    }
                },
                tenantAdmin: {
                    firstName: body.bankAdmin.firstName,
                    lastName: body.bankAdmin.lastName,
                    email: body.bankAdmin.email,
                    password: body.bankAdmin.password,
                    mobileNo: body.bankAdmin.mobileNo,
                    tenantCode: body.tenant?.bankId,
                    username: body.bankAdmin.email
                }
                // ...body.institutionColorInfo,
            })
            const url = `${API_BASE_URL}/${CURRENT_API_VERSION}/user/tenant-admin`
            const response = await fetch(url, {
                method: "post",
                headers: body.bankAdmin?.access_token !==""?{
                    Authorization: `bearer ${body.bankAdmin?.access_token}`,
                    "Content-Type": "application/json"
                }:{
                    "Content-Type": "application/json"
                },
                body: requestBody
            })
            // const response = {
            //     ok: true,
            //     status: 200,
            //     json: async () => JSON.parse(requestBody)
            // }
            const data = await response.json()
            if (response.ok || response.status === 200) {
                req.session.set("created-account", "account created")
                await req.session.save()
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