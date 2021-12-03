import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { Banks, Names } from "../../constants";
import { getRandomInt } from "../../lib";
import { TenantAdminView, Paginate } from "../../models";

export default async function GettenantAdmins(req:NextApiRequest, res: NextApiResponse) {
    // debugger
    try {
        // const token = await getToken({req, secret: SECRET})
        const {page, countPerPage} = req.query
        const offset = (+page - 1) * +countPerPage
        const nameRandomNumbers = _.range(0, 178).map((x,i) => getRandomInt(Names.length - 1)) 
        const data : TenantAdminView[] = _.range(0, 178).map((x,i) =>
        ({
            firstName: Names[nameRandomNumbers[i]].firstName,
            lastName: Names[nameRandomNumbers[i]].lastName,
            email: `${Names[nameRandomNumbers[i]].firstName}.${Names[nameRandomNumbers[i]].lastName}@mailinator.com`,
            bank: Banks[getRandomInt(Banks.length - 1)],
            dateCreated: (new Date()).getDate().toString(),
            status: getRandomInt(1)
        }))
        setTimeout(()=>{}, 3000)
        const returnData:Paginate<TenantAdminView, string> = {
            totalData: data.length,
            data: _.drop(data, offset).slice(0, +countPerPage)
        } 
        return res.json({
            data: returnData
        })
    } catch (error) {

    }    
}