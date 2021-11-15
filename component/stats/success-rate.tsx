import React, { useCallback, useMemo, useState } from "react";
import { DonutChart } from ".";
import { StatsB, StatsA } from "../../models/stats-models";
import { Text } from '@chakra-ui/react'
import { SkeletonLoader } from "..";
import { AppCard } from "../app";
export default function SuccessRate(props: any) {
    const [stats, setStats] = useState<StatsB[]>()
    const [loading, setLoading] = useState(true)
    const getStats = useCallback(() => {
        const boxSize = {
            width: ["261px", "261px", "261px", "261px", "261px", "261px"],
            height: ["159px", "159px", "159px", "159px", "159px", "159px"]
        }
        setLoading((prev) => !prev)
        return [{

            ...boxSize,
            data: [11, 89],
            labels: ["failed", "success"],
            backgroundColor: ["#096DD9", "#00B97F"],
            chartTitle: "Success rate"
        }]
    }, [])
    useMemo(() => {
        setTimeout(() => {

            setStats(getStats())
        }, 10000);
    }, [])
    const Skeleton = useCallback(() => <SkeletonLoader rows={2} columns={1} width="100%" height="80px" />, [])
    return (<AppCard topic={<><Text variant="card-header" size="card-header">How are terminals performance?</Text><Text fontSize="12px" fontWeight={400}>Last 7 days</Text></>}>
        {
            !loading ?
                stats?.map((x, i) => <DonutChart key={i} {...x} />) : <Skeleton />
        }
    </AppCard>)
}