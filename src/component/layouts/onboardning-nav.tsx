import { Flex, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import { links } from "../../constants";
import { CrossDomainOnboardingContext } from "../../providers";
import { onboardingNavContainerSX } from "../../sx";
import { AppLink } from "../app";
import { InterswitchLogo } from "../custom-component";

const OnboardingNav:React.FC = () => {
    const {isOnCrossDomain} = useContext(CrossDomainOnboardingContext)
    return (
        <Flex sx={onboardingNavContainerSX}>
            <AppLink href={isOnCrossDomain? links.registerOrganization :links.index}>
                <InterswitchLogo />
            </AppLink>
        </Flex>
    )
}

export default OnboardingNav