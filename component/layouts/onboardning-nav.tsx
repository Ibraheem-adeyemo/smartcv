import { Flex, Link } from "@chakra-ui/react";
import React from "react";
import { links } from "../../constants";
import { InterswitchLogo } from "../custom-component";

const OnboardingNav:React.FC = () => {
    return (
        <Flex justifyContent="space-between" h="89px" w="100%" bg="white" pl="42px" pt="26.67" pb="23.67" pos="relative">
            <Link href={links.index}>
                <InterswitchLogo />
            </Link>
        </Flex>
    )
}

export default OnboardingNav