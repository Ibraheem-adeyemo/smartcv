import { Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ComponentWithChildren } from "../../models";
import { MotionFlex } from "../framer/motion-flex";

interface OnboardingCardProps extends ComponentWithChildren {
    cardTitle: JSX.Element | JSX.Element[] | string,
    cardFooter: JSX.Element | JSX.Element[]
}
const OnboardingCard: React.FC<OnboardingCardProps> = (props: OnboardingCardProps) => {
    const cardTitle = useMemo(() => props.cardTitle, [])
    return (
        <MotionFlex sx={{
            px: "49px", py: "30px", gridGap: "25px", bgColor: "white", flexDir: "column", w: "100%"
        }}
        variants={{
            
        }}
        >
            <Flex>{cardTitle}</Flex>
            {props.children}
            <Flex>{props.cardFooter}</Flex>
        </MotionFlex>
    )
}

export default OnboardingCard