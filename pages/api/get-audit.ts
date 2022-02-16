import { range } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { branches, modules, Names, Tenants } from "../../constants";
import { getRandomInt } from "../../lib";
import { AuditView } from "../../models";

export default async function GettenantAdmins(req:NextApiRequest, res: NextApiResponse) {
  
    try {
        const randNum = getRandomInt(Number.length)
        const audit:AuditView[] = range(8).map((x, i) => ({
            module:modules[getRandomInt(modules.length)],
            tenant: Tenants[getRandomInt(Tenants.length)],
            branch: branches[getRandomInt(branches.length)],
            username: `${Names[randNum].firstName} ${Names[randNum].lastName}`,
            action: "Update",
            originatingIp:"123.456.789",
            date: 1638571697979

        }))

        return res.json({
            message:"",
            status:"Ok",
            data:{
                content: audit,
                totalElements:audit.length
            }
        })
    }
    catch(ex:any) {
        return res.status(500).json({
            message: ex,
            status:"error",
            data:null
        })
    }
}