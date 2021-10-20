import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useMemo } from "react";
import { Icons } from "../contants/icon-constants";


type getStatsFunc<T> = () => T[]
type statsComponent<T> = (props: T) => JSX.Element

interface StatCardProps<T> {
    getStats: getStatsFunc<T & {width?: string, height?:string}>,
    topic: string,
    statsComponent: statsComponent<T>
}

export default function StatCard<T>(props: StatCardProps<T>) {
    const stats = useMemo(() => ([
        ...props.getStats()
    ]), [props.getStats])
    return (
        <Flex flexDir="column" bg="brand.white" px="19px" py="15px" width="fit-content">
            <Text variant="card-header">{props.topic}</Text>
            <Flex wrap="wrap">
                {stats.map((x, i) =>
                        <props.statsComponent key={i} {...x} />
                )}
            </Flex>
        </Flex>)
}