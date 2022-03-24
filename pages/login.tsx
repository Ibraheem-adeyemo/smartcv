import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import React, { } from "react"
import { LoginForm } from "../src/component/auth"
import { InterswitchLogo } from "../src/component/custom-component"
import { NonAuthenticated } from "../src/component/layouts"
import MissionStatement from "../src/component/mission-statement"
import { loginContainerDivSX, loginContainerSX } from "../src/sx"


const Login: NextPage = () => {



    return (

        <NonAuthenticated>
            <Flex sx={loginContainerSX}>
                <Flex>
                    <InterswitchLogo variant="inverted" alt="Interswitch Logo" />
                </Flex>
                <Flex sx={loginContainerDivSX}
                >
                    <MissionStatement />
                    <LoginForm />
                </Flex>
            </Flex>
        </NonAuthenticated>)

}

export default Login