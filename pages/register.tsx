import { Flex } from "@chakra-ui/layout"
import React, { } from "react"
import { RegisterForm } from "../component/auth"
import { InterswitchLogo } from "../component/custom-component"
import { NonAuthenticated } from "../component/layouts"
import MissionStatement from "../component/mission-statement"


const Register = (props: any) => {



    return (
        <NonAuthenticated>

            <Flex flexDir="column" px={["147px","147px","147px","147px","247px"]} gridGap="102.61px" py="34.5px">
                <Flex>
                    <InterswitchLogo variant="inverted" alt="Interswitch Logo" />
                </Flex>
                <Flex gridGap="45px">
                    <MissionStatement />
                    <RegisterForm />
                </Flex>
            </Flex>
        </NonAuthenticated>)

}

export default Register