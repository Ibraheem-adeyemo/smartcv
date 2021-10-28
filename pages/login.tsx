import { Image } from "@chakra-ui/image"
import { Flex } from "@chakra-ui/layout"
import { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { getCsrfToken, getSession } from "next-auth/client"
import React, { } from "react"
import { LoginForm } from "../component/auth"
import Container from "../component/container"
import { InterswitchLogo } from "../component/custom-component"
import { NonAuthenticated } from "../component/layouts"
import MissionStatement from "../component/mission-statement"
import { Images, REDIRECT_URI } from "../constants"


const Login = (props: any) => {



    return (
        <NonAuthenticated>

            <Flex flexDir="column" px={["147px","147px","147px","147px","247px"]} gridGap="102.61px" py="34.5px">
                <Flex>
                    <InterswitchLogo variant="inverted" alt="Interswitch Logo" />
                </Flex>
                <Flex gridGap="45px">
                    <MissionStatement />
                    <LoginForm loginDetails={{
                        redirectUri: REDIRECT_URI
                    }} />
                </Flex>
            </Flex>
        </NonAuthenticated>)

}

export default Login