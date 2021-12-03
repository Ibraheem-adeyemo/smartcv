import { range } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { AuditView } from "../../models";

export default async function GettenantAdmins(req:NextApiRequest, res: NextApiResponse) {
    // debugger
    try {
        const audit:AuditView[] = range(8).map((x, i) => ({
            
        }))
    }
    catch(ex) {

    }
}