import { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { getCsrfToken, getSession } from "next-auth/client"
import React, {  } from "react"
import { LoginForm } from "../component"
import Container from "../component/container"
import { ImageBackground } from "../component/layouts"
import MissionStatement from "../component/mission-statement"
import { REDIRECT_URI } from "../constants"


const Login = ({ session, csrf }: { session: Session | null, csrf: string }) => {



    return (
        <ImageBackground>
            <Container>
                <MissionStatement />
                <LoginForm loginDetails={{
                    csrf,
                    session,
                    redirectUri: REDIRECT_URI
                }} />
            </Container>
        </ImageBackground>)

}

// checks for exixsting coookie session to redirect to the correct page
export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {

    const csrf = await getCsrfToken({ req })
    const session = await getSession({ req })

    return { props: { session, csrf } }

}
export default Login