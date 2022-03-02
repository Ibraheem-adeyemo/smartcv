import { Box, Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
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
            px: "49px", py: "30px", gridGap: "25px", bgColor: "white", flexDir: "column", w: "100%"
        }}

            animate="show"
            initial="hide"
            variants={{
                show: {
                    opacity: 1,
                    transition: {
                        delayChildren: 0.5
                    }
                },
                hide: {
                    opacity: 0
                }
            }}
        >
            <Box sx={{
                display: "inline-block",
                overflow: "hidden"
            }} ><MotionBox sx={{
                display: "indline-block"
            }}

                initial="hide"
                animate="show"
                variants={{
                    hide: {
                        opacity: 0,
                        y: "200%",
                    },
                    show: {
                        opacity: 1,
                        y: 0
                    }
                }}
            ><Flex>{cardTitle}</Flex></MotionBox></Box>
            {props.children}
            <MotionFlex variants={{
                show: {
                    opacity: 1,
                    transition: {
                        duration: 0.4
                    }
                },
                hide: {
                    opacity: 0
                }
            }}>
                {props.cardFooter}
            </MotionFlex>
        </MotionFlex>
    )
}

export default OnboardingCard