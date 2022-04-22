import { Box, Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { appear, delayChildren, verticalPosition } from "../../animations";
import { ComponentWithChildren } from "../../models";
import { MotionBox, MotionFlex } from "../framer";

interface OnboardingCardProps extends ComponentWithChildren {
    cardTitle: JSX.Element | JSX.Element[] | string,
    cardFooter: JSX.Element | JSX.Element[]
}
const OnboardingCard: React.FC<OnboardingCardProps> = (props: OnboardingCardProps) => {
    const cardTitle = useMemo(() => props.cardTitle, [])
    return (
        <MotionFlex sx={{
            px: "49px", py: "30px", gap: "25px", bgColor: "white", flexDir: "column", w: "100%"
        }}

            animate="show"
            initial="hide"
            variants={delayChildren}
            exit="hide"
        >
            <Box sx={{
                display: "inline-block",
                overflow: "hidden"
            }} ><MotionBox sx={{
                display: "indline-block"
            }}

                initial="hide"
                animate="show"
                variants={verticalPosition}
            ><Flex>{cardTitle}</Flex></MotionBox></Box>
            {props.children}
            <MotionFlex variants={appear()}>
                {props.cardFooter}
            </MotionFlex>
        </MotionFlex>
    )
}

export default OnboardingCard