import { apiUrlsv1, cookieKeys, cookiesTimeout, Names, notificationMesage } from "../../constants"
import { getCookie, getRandomInt, setCookie } from "../../lib"
import { Onboarding } from "../../models"

export const createAccountAsync = async (onboarding: Onboarding) => {
    // debugger
    try {
        const interchangeId = getCookie(cookieKeys.interchangeId)
        if (interchangeId !== "") {
            const body = onboarding

            const requestBody = JSON.stringify({
                tenant: {
                    name: body.tenant?.name,
                    code: body.tenant?.tenantCode,
                    domain: `www.${Names[getRandomInt(Names.length)].firstName}-${Names[getRandomInt(Names.length)].lastName}.${Names[getRandomInt(Names.length)].lastName}`,
                    slogan: "",
                    logo: body.tenant.logo.split(",")[1],
                    address: body.tenant.address,
                    location: body.tenant.location,
                    branch: body.tenant.branch,
                    color: {
                        headerColor: body.institutionColorInfo.headerColor,
                        sidebarColour: body.institutionColorInfo.sidebarColor,
                        buttonColor: body.institutionColorInfo.buttonColor
                    }
                },
                tenantAdmin: {
                    firstName: body.tenantAdmin.firstName,
                    lastName: body.tenantAdmin.lastName,
                    email: body.tenantAdmin.email,
                    password: body.tenantAdmin.password,
                    mobileNo: body.tenantAdmin.mobileNo,
                    tenantCode: body.tenant?.tenantCode,
                    username: body.tenantAdmin.email
                }
                // ...body.institutionColorInfo,
            })
            const url = apiUrlsv1.createTenantAdmin
            const response = await fetch(url, {
                method: "post",
                headers: {
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
                if(typeof window !== "undefined")
                setCookie(cookieKeys.createdAccount, "done", cookiesTimeout.createdAccountTimeout)
                return data
            }
            else if(typeof data.message !== "undefined") {
                throw data.message
            } else {
                throw notificationMesage.AnErrorOccurred
            }
        } else {
            throw new Error("You need to login with your Organization ID")
        }
    } catch (error: any) {
        // debugger
        throw error
    }
}