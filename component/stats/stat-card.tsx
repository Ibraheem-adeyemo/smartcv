import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useMemo } from "react";


type getStatsFunc<T> = () => T[]
type statsComponent<T> = (props: T) => JSX.Element

interface StatCardProps<T> {
    getStats: getStatsFunc<T & {width?: string|string[], height?:string|string[]}>,
    topic: string,
    statsComponent: statsComponent<T>
}

export default function StatCard<T>(props: StatCardProps<T>) {
    const stats = useMemo(() => ([
        ...props.getStats()
    ]), [props.getStats])
    return (
        <Flex flexDir="column" bg="brand.white" px="19px" py="15px" w="100%">
            <Text variant="card-header" size="card-header">{props.topic}</Text>
            <Flex >
                {stats.map((x, i) =>
                        <props.statsComponent key={i} {...x} />
                )}
            </Flex>
        </Flex>)
}