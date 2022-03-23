import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { delayChildren } from "../../animations";
import { ComponentWithChildren } from "../../models";
import { appCardMainSX } from "../../sx";
import { MotionFlex } from "../framer";

interface AppCardProps extends ComponentWithChildren {
    topic: string | JSX.Element | JSX.Element[]
}

const AppCard: FC<AppCardProps> = (props: AppCardProps) => {
    return (
        <MotionFlex variants={delayChildren} sx={appCardMainSX}>
            <Box w="100%">{props.topic}</Box>
            <Flex gap="19px">
                {props.children}
            </Flex>
        </MotionFlex>)
}

export default AppCard