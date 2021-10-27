import { Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React from "react";
import { Images } from "../../constants";
import { InterswitchLogo } from "../custom-component";
interface OnboardingProps {
    children: JSX.Element
}
export default function Onboarding(props:OnboardingProps) {
    return(
        <Flex h="100vh">
            <Flex justifyContent ="space-between" h="89px" w="100%" bg="white">
                <InterswitchLogo />
            </Flex>
            {props.children}
        </Flex>
    )
}