import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { Tenants } from "../../src/constants";
import { getRandomInt } from "../../src/lib";
import { TenantView, Paginate } from "../../models";

export default async function GetBanks(req:NextApiRequest, res: NextApiResponse) {
  
    try {
        // const token = await getToken({req, secret: SECRET})
        const {page, countPerPage} = req.query
        const offset = (+page - 1) * +countPerPage
        const bankRandomNumber = _.range(0, 178).map((x,i) => getRandomInt(Tenants.length - 1))
        const data: TenantView[] = _.range(0, 178).map((x,i) =>
        ({
            name: Banks[bankRandomNumber[i]],
            logo: "/images/"+Banks[bankRandomNumber[i]].replace(" ", "_").toLowerCase() + ".png",
            tenantCode: "7638GFTJ876",
            address: "Bank Address",
            dateCreated: (new Date()).getDate().toString(),
            bankSuperAdmin: "John Wick",
            status: "John wick"
        }))
        setTimeout(()=>{}, 3000)
        const returnData:Paginate<TenantView, string> = {
            totalData: data.length,
            data: _.drop(data, offset).slice(0, +countPerPage)
        } 
        return res.json({
            data: returnData
        })
    } catch (error) {

    }    
}