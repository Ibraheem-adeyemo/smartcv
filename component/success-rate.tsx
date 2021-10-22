import React, { useCallback, useMemo } from "react";
import { DonutChart, StatCard } from "./stats";
import { StatsB, StatsA } from "../models/stats-models";

export default function SuccessRate(props: any) {


    const getStats = useCallback(() => 
    {
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


    return (<StatCard<StatsB> getStats={getStats} topic="How are terminals performance"
        statsComponent={(statsProps: StatsB) =>
            <DonutChart {...statsProps} />}
    />)
}