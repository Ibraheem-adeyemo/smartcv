import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import React from "react"
import { RegisterForm } from "../src/component/auth"
import { InterswitchLogo } from "../src/component/custom-component"
import { NonAuthenticated } from "../src/component/layouts"
import MissionStatement from "../src/component/mission-statement"
import { CrossDomainOnboardingProvider } from "../src/providers"
import { registerContainerDivSX, registerContainerSX } from "../src/sx"


const Register: NextPage = () => {
    return (
        <NonAuthenticated>
            <Flex sx={registerContainerSX}>
                <Flex>
                    <InterswitchLogo variant="inverted" alt="Interswitch Logo" />
                </Flex>
                <Flex sx={registerContainerDivSX}
                >
                    <MissionStatement />
                    <CrossDomainOnboardingProvider>
                        <RegisterForm />
                    </CrossDomainOnboardingProvider>
                </Flex>
            </Flex>
        </NonAuthenticated>)

}

export default Register