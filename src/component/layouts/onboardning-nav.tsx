import { Flex, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import { links } from "../../constants";
import { CrossDomainOnboardingContext } from "../../provider/cross-domain-onboarding-provider";
import { AppLink } from "../app";
import { InterswitchLogo } from "../custom-component";

const OnboardingNav:React.FC = () => {
    const {isOnCrossDomain} = useContext(CrossDomainOnboardingContext)
    return (
        <Flex justifyContent="space-between" h="89px" w="100%" bg="white" pl="42px" pt="26.67" pb="23.67" pos="relative">
            <AppLink href={isOnCrossDomain? links.registerOrganization :links.index}>
                <InterswitchLogo />
            </AppLink>
        </Flex>
    )
}

export default OnboardingNav