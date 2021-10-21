import { Button, Link, Image, Input, VisuallyHiddenInput, Box, Text } from "@chakra-ui/react"
import { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { getCsrfToken, getSession, signIn } from "next-auth/client"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { LoginForm } from "../component"
import Container from "../component/container"
import { ImageBackground } from "../component/layouts"
import MissionStatement from "../component/mission-statement"
import { LOGIN_URL, REDIRECT_URI } from "../contants/env-constants"
import { Images } from "../contants/image-constants"
import { links } from "../contants/links"


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