import { Box, Flex } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { delayChildren } from "../../animations";
import { ComponentWithChildren } from "../../models";
import { appCardMainSX } from "../../sx";
import { MotionFlex } from "../framer";

interface AppCardProps extends ComponentWithChildren {
    topic: ReactNode,
    width?: string | string[]
}

const AppCard: FC<AppCardProps> = (props: AppCardProps) => {
    return (
        <MotionFlex variants={delayChildren} sx={appCardMainSX({ width: props.width })}>
            <Box w="100%">{props.topic}</Box>
            <Flex gap="19px">
                {props.children}
            </Flex>
        </MotionFlex>)
}

export default AppCard