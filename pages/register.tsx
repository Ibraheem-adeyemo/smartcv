import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import React from "react"
import { RegisterForm } from "../src/component/auth"
import { InterswitchLogo } from "../src/component/custom-component"
import { NonAuthenticated } from "../src/component/layouts"
import MissionStatement from "../src/component/mission-statement"
import { CrossDomainOnboardingProvider } from "../src/providers"


const Register: NextPage = () => {
    return (
        <NonAuthenticated>
            <Flex sx={{
                flexDir: "column",
                px: ["80px", "80px", "80px", "100px", "147px", "147px", ], 
                gridGap: ["30px", "30px", "30px", "30px", "102.61px", "102.61px"],
                py: "34.5px"
            }}>
                <Flex>
                    <InterswitchLogo variant="inverted" alt="Interswitch Logo" />
                </Flex>
                <Flex sx={{
                    gridGap: ["30px", "30px", "30px", "50px", "99px", "99px"],
                    flexDir: ["column","column","column","column","row","row",]
                }}
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