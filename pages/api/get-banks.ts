import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { Banks, SECRET } from "../../constants";
import { getRandomInt } from "../../lib";
import { BankAdmin, BankAdminView, BankView, Paginate } from "../../models";

export default async function GetUsers(req:NextApiRequest, res: NextApiResponse) {
    // debugger
    try {
        // const token = await getToken({req, secret: SECRET})
        const {page, countPerPage} = req.query
        const offset = (+page - 1) * +countPerPage
        const data: BankView[] = _.range(0, 178).map((x,i) =>
        ({
            name: Banks[getRandomInt(Banks.length - 1)],
            bankLogo: "logo",
            bankId: "7638GFTJ876",
            address: "Bank Address",
            dateCreated: (new Date()).getDate().toString(),
            babnkSuperAdmin: "John Wick",
            status: "John wick"
        }))
        setTimeout(()=>{}, 3000)
        const returnData:Paginate<BankView, string> = {
            totalData: data.length,
            data: _.drop(data, offset).slice(0, +countPerPage)
        } 
        return res.json({
            data: returnData
        })
    } catch (error) {

    }    
}