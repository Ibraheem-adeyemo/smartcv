import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { links } from "../constants";

export default async function AuthGuard({req, res}:{ req: NextApiRequest, res: NextApiResponse }) {
    const session = await getSession({ req })

    if (!session) {
        res.setHeader("location", links.login)
        res.statusCode = 302;
        res.end();
    }

    return { props: {} }
}