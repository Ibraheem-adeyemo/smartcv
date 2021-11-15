import { NextApiRequest, NextApiResponse } from "next";
import { UserManagementStatsName } from "../../constants";
import { getRandomInt } from "../../lib";

export async function GetUserManagementStats(eq: NextApiRequest, res: NextApiResponse) {
    try {
        // debugger
        const data = [
            {
                name: UserManagementStatsName.createdBanks,
                totalCount: getRandomInt(3000)
            },
            {
                name: UserManagementStatsName.bankAdminUser,
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