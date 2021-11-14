import { Text } from "@chakra-ui/layout";
import React, { useCallback, useMemo, useState } from "react"
import { Stat, StatCard } from "."
import { StatsA } from "../../models/stats-models";
import { SkeletonLoader } from "..";

export default function TerminalsPerformance(props: any) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<StatsA[]>()


  const getStats = useCallback(() => {
    const boxSize = {
      width: ["224px", "224px", "224px", "224px", "229px", "229px"],
      height: ["159px", "159px", "159px", "159px", "159px", "189px"]
    }
    // console.log("done waiting")

    setLoading(prev => !prev)
    return [{
      ...boxSize,
      headerName: "ATM Count",
      totalNumber: 1200,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",

    }, {
      ...boxSize,
      headerName: "ATM Dispensing",
      totalNumber: 800,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
    }, {
      ...boxSize,
      headerName: "Not Dispensing",
      totalNumber: 120,
      status: "red",
      percentage: "6.0%",
      days: "Last 7 days"
    },]
  }, [])

  useMemo(() => {
    // console.log("waiting")
    setTimeout(() => {
      setStats(getStats())

    }, 10000);
  }, [getStats])
  const Skeleton = useCallback( () => <SkeletonLoader rows={3} columns={3} width="200px" height="50px" />,[])
  return (
    <StatCard topic={<Text variant="card-header" size="card-header">How are terminals performance</Text>} >  
        {!loading ? stats?.map((x, i) =>
          <Stat key={i} {...x} />
        ) :
        <Skeleton />
        }
    </StatCard>)
}