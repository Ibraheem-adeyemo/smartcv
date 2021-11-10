import { Flex, Link } from "@chakra-ui/layout";
import NextLink from 'next/link'
import { VisuallyHiddenInput, Image, Text, Button } from "@chakra-ui/react";
import { Session } from "next-auth";
import { getCsrfToken, getSession, session, signIn, signOut, useSession } from "next-auth/client";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { ComponentProps, ComponentPropsWithoutRef, useMemo, useState } from "react";
import { Images, links } from "../../constants";


interface LoginFormProps extends ComponentPropsWithoutRef<any> {
    loginDetails: {
        redirectUri: string
    }
}

export default function LoginForm(props: LoginFormProps) {
    const [session, setSession] = useState<Session>()
    const [csrf, setCsrf] = useState<string>()
    const [redirectUri, setRedirectUri] = useState<string>()
    const router = useRouter()
    const [loading, setLoadin] = useState(true)
    useMemo(() => {
        getSession().then(val => {
            // debugger
            if (val !== null) {

                setSession(val)
                // router.push('/dashboard')
            }
        })
        getCsrfToken().then(val => {
            // debugger
            if (val !== null) {
                setCsrf(val)
            }
        })
        // debugger
        setRedirectUri(props.loginDetails.redirectUri)
    }, [props.loginDetails.redirectUri])

    return (
        <form method="POST" onSubmit={((e: React.FormEvent<HTMLFormElement>) => (
            e.preventDefault(),

            signIn("pass", { callbackUrl: redirectUri }))
        )}>
            <Flex flexDir="column" gridGap="20px" px="66px" bg="white" borderRadius="6px" alignItems="center" w="633px" py="42.34px">
                <Text variant="card-header" size="page-header" >Welcome{session === null || typeof session === "undefined" ? `` : ` ${session?.user?.name}`}</Text>
                <Image src={Images.handShake} boxSize="167px" alt="hand shake" />
                <VisuallyHiddenInput defaultValue={csrf === null || typeof csrf === "undefined" ? "" : csrf} onChange={() => {

                }} name="csrfToken" />
                <Flex flexDir="column" gridGap="8px">
                    <Button type="submit" variant="primary-button" w="100%" px="131.5px" py="12px">
                        {session === null || typeof session === "undefined" ? `Already on boarded? Login` : `Login as ${session?.user?.email}`}
                    </Button>
                    {(session !== null && typeof session !== "undefined") && <Button variant="just-text" onClick={() => {
                        signOut()
                    }}>Or Sign in with another Account</Button>}
                </Flex>
                {/* <p className="error">{error}</p> */}
                <Flex flexWrap="wrap" gridGap="1px">
                    <Text> Not on boarded yet?</Text>
                    <NextLink  href={links.registerOrganization}><Link href={links.registerOrganization}>Register</Link></NextLink>
                </Flex>
            </Flex>
        </form>)
}