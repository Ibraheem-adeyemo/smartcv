import React, { useCallback } from "react";
import { StatsC, StatsCMore } from "../models";
import { Barchart, StatCard } from "./stats";

export default function TopTransactionMetric(props: any) {

    const getStats = useCallback(() => {

        const boxSize = {
            width: ["400px", "400px", "400px", "400px", "400px", "400px"]
        }
        return [
            {
                ...boxSize,
                labels: ["Value", "Volume"],
                data: [
                    {
                        label: "Total Transction Metric",
                        data: [2450000000, 2006000],
                        borderColor: "#62C6A6",
                        backgroundColor: ["#096DD9", "#62C6A6"],
                        borderWidth: 2,
                        borderRadius: 2,
                        borderSkipped: false,
                    }
                ],
            }
        ]
    }, [])
    return <StatCard<StatsCMore> getStats={getStats} statsComponent={Barchart} topic="Total Transction Metric" />
}