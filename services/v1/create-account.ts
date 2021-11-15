import { API_BASE_URL_ALTERNATIVE, CURRENT_API_VERSION, Names } from "../../constants"
import { getCookie, getRandomInt, setCookie } from "../../lib"
import { Onboarding } from "../../models"

export const createAccountAsync = async (onboarding: Onboarding) => {
    // debugger
    try {
        const interchangeId = getCookie("interchangeId")
        if (interchangeId !== "") {
            const body = onboarding

            const requestBody = JSON.stringify({
                tenant: {
                    name: body.tenant?.name,
                    code: body.tenant?.bankId,
                    domain: `www.${Names[getRandomInt(Names.length)].firstName}-${Names[getRandomInt(Names.length)].lastName}.${Names[getRandomInt(Names.length)].lastName}`,
                    slogan: "",
                    logo: body.tenant.bankLogo.split(",")[1],
                    address: body.tenant.bankAddress,
                    location: body.tenant.bankLocation,
                    branch: body.tenant.bankBranch,
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
            const url = `${API_BASE_URL_ALTERNATIVE}/${CURRENT_API_VERSION}/user/tenant-admin`
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
                setCookie("created-account", "done", 5)
                return data
            }
            else if(typeof data.message !== "undefined") {
                throw data.message
            } else {
                throw "An error occurred"
            }
        } else {
            throw new Error("You need to login with your Organization ID")
        }
    } catch (error: any) {
        // debugger
        throw error
    }
}