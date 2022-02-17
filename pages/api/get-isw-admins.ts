import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { Banks, Names, Roles, SECRET } from "../../src/constants";
import { getRandomInt } from "../../src/lib";
import { ISWAdminView, Paginate } from "../../models";

export default async function ISWAdmin(req:NextApiRequest, res: NextApiResponse) {
  
    try {
        // const token = await getToken({req, secret: SECRET})
        const {page, countPerPage} = req.query
        const offset = (+page - 1) * +countPerPage
        const nameRandomNumbers = _.range(0, 178).map((x,i) => getRandomInt(Names.length - 1)) 
        const data : ISWAdminView[] = _.range(0, 178).map((x,i) =>
        ({
            firstName: Names[nameRandomNumbers[i]].firstName,
            lastName: Names[nameRandomNumbers[i]].lastName,
            email: `${Names[nameRandomNumbers[i]].firstName}.${Names[nameRandomNumbers[i]].lastName}@mailinator.com`,
            role: Roles[getRandomInt(Roles.length - 1)],
            dateCreated: (new Date()).getDate().toString(),
            status: "1"
        }))
        setTimeout(()=>{}, 3000)
        const returnData:Paginate<ISWAdminView> = {
            content: _.drop(data, offset).slice(0, +countPerPage)as ISWAdminView[],
            totalElements: data.length
        }
        return res.json({
            data: returnData
        })
    } catch (error) {

    }    
}