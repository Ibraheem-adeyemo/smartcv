import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { delayChildren } from "../../animations";
import { ComponentWithChildren } from "../../models";
import { MotionFlex } from "../framer";

interface AppCardProps extends ComponentWithChildren {
    topic: string | JSX.Element | JSX.Element[]
}

const AppCard: FC<AppCardProps> = (props: AppCardProps) => {
    return (
        <MotionFlex variants={delayChildren} sx={{ flexDir: "column", bg: "brand.white", px: "19px", py: "15px", w: "100%", gap: "16px", borderRadius: "8px", overflow: "auto" }}>
            <Box w="100%">{props.topic}</Box>
            <Flex gap="19px">
                {props.children}
            </Flex>
        </MotionFlex>)
}

export default AppCard