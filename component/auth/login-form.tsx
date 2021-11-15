import { Flex, Link } from "@chakra-ui/layout";
import NextLink from 'next/link'
import { VisuallyHiddenInput, Image, Text, Button } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { ComponentProps, ComponentPropsWithoutRef, useContext, useMemo, useState } from "react";
import { Images, links } from "../../constants";
import { AuthContext } from "../../provider/auth-provider";
import { setCookie } from "../../lib";

interface LoginFormProps extends ComponentPropsWithoutRef<any> {
    loginDetails: {
        redirectUri: string
    }
}

export default function LoginForm(props: LoginFormProps) {
    const { user, signIn, signOut } = useContext(AuthContext)

    useMemo(() => {
        // debugger
        if (typeof window !== "undefined") {
            setCookie("token", "", -60)
        }
    }, [])

    return (
        <form method="POST" onSubmit={(e: React.FormEvent<HTMLFormElement>) => (
            e.preventDefault(),
            signIn()
        )} >
            <Flex flexDir="column" gridGap="20px" px="66px" bg="white" borderRadius="6px" alignItems="center" w="633px" py="42.34px">
                <Text variant="card-header" size="page-header" >Welcome{user === null || typeof user === "undefined" ? `` : ` ${user?.firstName}`}</Text>
                <Image src={Images.handShake} boxSize="167px" alt="hand shake" />
                <Flex flexDir="column" gridGap="8px">
                    <Button type="submit" variant="primary-button" w="100%" px="131.5px" py="12px">
                        {user === null || typeof user === "undefined" ? `Already on boarded? Login` : `Login as ${user?.email}`}
                    </Button>
                    {(user !== null && typeof user !== "undefined") && <Button variant="just-text" onClick={() => {
                        signOut()
                    }}>Or Sign in with another Account</Button>}
                </Flex>
                {/* <p className="error">{error}</p> */}
                <Flex flexWrap="wrap" gridGap="1px">
                    <Text> Not on boarded yet?</Text>
                    <NextLink href={links.registerOrganization}><Link href={links.registerOrganization}>Register</Link></NextLink>
                </Flex>
            </Flex>
        </form>)
}