import { Flex } from "@chakra-ui/layout"
import { NextPage } from "next"
import React, { } from "react"
import { LoginForm } from "../component/auth"
import { InterswitchLogo } from "../component/custom-component"
import { NonAuthenticated } from "../component/layouts"
import MissionStatement from "../component/mission-statement"


const Login:NextPage = () => {



    return (
        <NonAuthenticated>

            <Flex flexDir="column" px="147px" gridGap="102.61px" py="34.5px">
                <Flex>
                    <InterswitchLogo variant="inverted" alt="Interswitch Logo" />
                </Flex>
                <Flex gridGap="99px">
                    <MissionStatement />
                    <LoginForm />
                </Flex>
            </Flex>
        </NonAuthenticated>)

}

export default Login