import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { Banks, Names, Roles, SECRET } from "../../constants";
import { getRandomInt } from "../../lib";
import { ISWAdminView, Paginate } from "../../models";

export default async function ISWAdmin(req:NextApiRequest, res: NextApiResponse) {
    // debugger
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
            status: "John wick"
        }))
        setTimeout(()=>{}, 3000)
        const returnData:Paginate<ISWAdminView, string> = {
            totalData: data.length,
            data: _.drop(data, offset).slice(0, +countPerPage)
        } 
        return res.json({
            data: returnData
        })
    } catch (error) {

    }    
}