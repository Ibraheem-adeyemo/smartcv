import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StatsCMore } from "../../models";
import { Barchart } from ".";
import { Flex, Text } from "@chakra-ui/layout";
import DropdownSearchFilter from "./search-filters";
import { Months } from "../../constants";
import { SkeletonLoader } from "..";
import { AppCard } from "../app";

export default function TopTransactionMetric(props: any) {
    const Filter = useMemo(() => DropdownSearchFilter, [])

    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<StatsCMore[]>()
    const getStats = useCallback(() => {

        const boxSize = {
            width: ["400px", "400px", "400px", "100%", "100%", "100%"],
            heigt:"100%"
        }
        setLoading(prev => !prev)
        return [
            {
                labels: ["Value", "Volume"],
                data: [
                    {
                        label: "Value",
                        data: [2450000000],
                        borderColor: "white",
                        backgroundColor: "#096DD9",
                        borderWidth: 2,
                        borderRadius: 2,
                        borderSkipped: false,
                    },
                    {
                        label: "Volume",
                        data: [2006000],
                        borderColor: "white",
                        backgroundColor: "#62C6A6",
                        borderWidth: 2,
                        borderRadius: 2,
                        borderSkipped: false,
                    }
                ],
            }
        ]
    },[])
    useEffect(() => {
        // console.log("waiting")
        setTimeout(() => {
            setStats(getStats())

        }, 10000);
    }, [getStats])
    const Skeleton = useCallback(() => <SkeletonLoader rows={3} columns={1} width="200px" height="50px" />, [])
    return <AppCard topic={
        <Flex>
            <Text variant="card-header" size="card-header">Total Transction Metric</Text>
            <Flex>
                <Filter label="Month" data={Object.keys(Months).filter(x => isNaN(+x))} />
            </Flex>
        </Flex>}

    >
        {!loading? stats?.map((x,i) =>  <Barchart key={i} {...x} />):<Skeleton />
        
    }
    </AppCard>
}