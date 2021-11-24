import React, { useCallback, useEffect, useState } from "react";
import { StatsCMore } from "../../models";
import { Barchart } from ".";
import { Flex, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { DropdownIcon } from "../../constants";
import { SkeletonLoader } from "..";
import { AppCard } from "../app";

export default function TopPerforminBanks(props: any) {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<StatsCMore[]>()

    const getStats = useCallback(() => {

        const boxSize = {
            width: ["224px", "224px", "224px", "100%", "100%", "100%"]
        }
        setLoading(prev => !prev)
        return [
            {
                ...boxSize,
                labels: ['Zenith', "FCMB", "First", "GTCO", "Access"],
                data: [
                    {
                        label: 'Value',
                        data: [2000000000, 1600000000, 203000000, 15600000, 13500000],
                        borderColor: "white",
                        backgroundColor: "#096DD9",
                        borderWidth: 2,
                        borderRadius: 0,
                        borderSkipped: false,
                    },
                    {
                        label: 'volume',
                        data: [206000000, 199600000, 10600000, 9600000, 7600000],
                        borderColor: "white",
                        backgroundColor: "#62C6A6",
                        borderWidth: 2,
                        borderRadius: 0,
                        borderSkipped: false,
                    }
                ],
            }
        ]
    }, [])
    useEffect(() => {
        // console.log("waiting")
        setTimeout(() => {
            setStats(getStats())

        }, 10000);
    }, [getStats])
    return <AppCard topic={
        <Flex justifyContent="space-between" textAlign="center">
            <Flex flexDir="column" justifySelf="flex-start">
                <Text variant="card-header" size="card-header">What are the top performing 5 banks</Text>
                <Text variant="small-muted-text" textAlign="left">By Transaction Volume and Value</Text>
            </Flex>
            <Flex gridGap="17px" h="26px" alignSelf="center">
                <Tag><Text size="tag-text">week</Text></Tag>
                <Tag><Text size="tag-text">month</Text></Tag>
                <Tag><Text size="tag-text">Custom</Text><DropdownIcon /></Tag>
            </Flex>

        </Flex>}>
        {!loading ?
            <>
                {stats?.map((x, i) => <Barchart key={i} {...x} />)}
            </> : <SkeletonLoader rows={3} columns={1} width="100%" height="50px" />}
    </AppCard>
}