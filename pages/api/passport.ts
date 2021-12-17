import { NextApiRequest, NextApiResponse } from "next";

export default async function PassportLogin(req: NextApiRequest, res: NextApiResponse) {
    res.json({
        firstName:"John",
        lastName:"Wick",
    })
}