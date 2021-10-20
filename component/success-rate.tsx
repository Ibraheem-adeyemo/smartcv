import React, { useCallback, useMemo } from "react";
import { DonutChart, StatCard } from ".";
import { StatsB, StatsA } from "../models/stats-models";

export default function SuccessRate (props:any) {


    const getStats = useCallback(() => ( 
        [{
            data:[11, 89],
            labels:[ "failed", "success"],
            backgroundColor:["#FF5257", "#00B97F"],
            chartTitle:"Success rate",
            width:"261px", 
            height:"159"
        }]
      ), [])
    
    const stat = (props:StatsB) => {
        return (<DonutChart {...props}  />)
    }


    return (<StatCard<StatsB> getStats = {getStats} topic="How are terminals performance" statsComponent={stat} />)
}