import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";
import { COOKIE_PASSWORD } from "../constants";

export type NextIronRequest = NextApiRequest & {session: Session}
type ServerSideContext = GetServerSidePropsContext & {req: NextIronRequest}
export type NextironHandler = (res: NextIronRequest, req: NextApiResponse) => void | Promise<any>
export type ServerSideHandler = (context: ServerSideContext) => ReturnType<GetServerSideProps>;

export default function withSession <T  extends NextironHandler | ServerSideHandler>(handeler:T, cookieName?: string, maxAge?:number) {
    return withIronSession(handeler, {
        password: COOKIE_PASSWORD,
        cookieName: typeof cookieName === "undefined"?"PAAS":cookieName,
        cookieOptions: {
            secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
            maxAge: typeof maxAge === "undefined"? 60*60:maxAge
        }
    })
}