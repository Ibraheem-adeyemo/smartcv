import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import React, { useEffect } from "react"
import { RegisterForm } from "../component/auth"
import { InterswitchLogo } from "../component/custom-component"
import { NonAuthenticated } from "../component/layouts"
import MissionStatement from "../component/mission-statement"


const Register:NextPage = () => {

    useEffect(() => {
        sessionStorage.removeItem('onboarding')
    }, [])


    return (
        <NonAuthenticated>

            <Flex flexDir="column" px="147px" gridGap="102.61px" py="34.5px">
                <Flex>
                    <InterswitchLogo variant="inverted" alt="Interswitch Logo" />
                </Flex>
                <Flex gridGap="99px">
                    <MissionStatement />
                    <RegisterForm />
                </Flex>
            </Flex>
        </NonAuthenticated>)

}

export default Register