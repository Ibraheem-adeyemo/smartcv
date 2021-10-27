import { Box, Flex, Text } from "@chakra-ui/layout";
import { Props } from "framer-motion/types/types";
import React, { useMemo, useState } from "react";


type getStatsFunc = () => unknown[]
type statsComponent = (props: any) => JSX.Element

interface StatCardProps extends Props {
    topic: string|JSX.Element
}

export default function StatCard(props: StatCardProps) {
    return (
        <Flex flexDir="column" bg="brand.white" px="19px" py="15px" w="100%">
            <Box w="100%">{props.topic}</Box>
            <Flex gridGap="19px">
                {props.children}
            </Flex>
        </Flex>)
}