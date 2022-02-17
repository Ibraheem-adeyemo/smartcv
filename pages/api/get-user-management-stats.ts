import { NextApiRequest, NextApiResponse } from "next";
import { UserManagementStatsName } from "../../src/constants";
import { getRandomInt } from "../../src/lib";

export async function GetUserManagementStats(eq: NextApiRequest, res: NextApiResponse) {
    try {
      
        const data = [
            {
                name: UserManagementStatsName.createdBanks,
                totalCount: getRandomInt(3000)
            },
            {
                name: UserManagementStatsName.tenantAdminUser,
                totalCount: getRandomInt(3000)
            },
            {
                name: UserManagementStatsName.iSWAdminUser,
                totalCount: getRandomInt(3000)
            }
        ]
        return res.json({
            data
        })
    } catch (error : any) {

        return res.status(400).send({
            message:error.message
        })
    }
}