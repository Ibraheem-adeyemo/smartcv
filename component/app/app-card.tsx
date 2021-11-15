import { Box, Flex } from "@chakra-ui/layout";
import { Props } from "framer-motion/types/types";
import React, {  } from "react";

interface AppCardProps extends Props {
    topic: string|JSX.Element
}

export default function AppCard(props: AppCardProps) {
    return (
        <Flex flexDir="column" bg="brand.white" px="19px" py="15px" w="100%">
            <Box w="100%">{props.topic}</Box>
            <Flex gridGap="19px">
                {props.children}
            </Flex>
        </Flex>)
}