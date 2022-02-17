import React, { FC, useCallback, useEffect, useState } from "react";
import { DonutChart } from "../app-charts";
import { StatsB } from "../../models/stats-models";
import { SkeletonCircle, Text } from '@chakra-ui/react'
import { AppCard } from "../app";

const SuccessRate: FC = () => {
    const [stats, setStats] = useState<StatsB[]>()
    const getStats = useCallback(() => {
        const boxSize = {
            width: ["261px", "261px", "261px", "261px", "261px", "261px"],
            height: ["159px", "159px", "159px", "159px", "159px", "159px"]
        }
        return [{

            ...boxSize,
            data: [11, 89],
            labels: ["failed", "success"],
            backgroundColor: ["#096DD9", "#00B97F"],
            chartTitle: "Success rate"
        }]
    }, [])
    useEffect(() => {
        setStats(getStats())
    }, [])
    return (<AppCard topic={<><Text variant="card-header" size="card-header">What is our success rate?</Text><Text fontSize="12px" fontWeight={400}>Last 7 days</Text></>}>
        <>
            {stats && stats.map((x, i) => <DonutChart key={i} {...x} />)}

            {!stats && <SkeletonCircle size="160px" />}
        </>

    </AppCard>)
}

export default SuccessRate