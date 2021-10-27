import React, { useCallback, useMemo, useState } from "react";
import { DonutChart, StatCard } from "./stats";
import { StatsB, StatsA } from "../models/stats-models";
import { Text } from '@chakra-ui/react'
import { SkeletonLoader } from ".";
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
    const Skeleton = useCallback(() => <SkeletonLoader skeletonRange={[0, 2]} itemRange={[0, 1]} width="100%" height="80px" />, [])
    return (<StatCard topic={<><Text variant="card-header" size="card-header">How are terminals performance?</Text><Text fontSize="12px" fontWeight={400}>Last 7 days</Text></>}>
        {
            !loading ?
                stats?.map((x, i) => <DonutChart key={i} {...x} />) : <Skeleton />
        }
    </StatCard>)
}