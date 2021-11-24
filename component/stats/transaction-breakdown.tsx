import { Text } from "@chakra-ui/react"
import React, { useState, useCallback, useEffect, useContext } from "react"
import { Stat } from "."
import { SkeletonLoader } from ".."
import { useLoading } from "../../hooks"
import { StatsA } from "../../models"
import { StatsContext } from "../../provider/stats-provider"
import { AppCard } from "../app"

export default function TransactionBreakdown(_props: any) {
  const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
  const [loading, setLoading] = useLoading({isLoading:true, text:""})
  const [stats, setStats] = useState<StatsA[]>()

  useEffect(() => {
    // console.log("waiting")
    
  const getStats = () : StatsA[]  => {
    const boxSize = {
      width: ["224px", "224px", "224px", "224px", "229px", "229px"],
      height: ["159px", "159px", "159px", "159px", "159px", "189px"],
      prefix:"",
      suffix:""
    }
    // console.log("done waiting")
    return [{
      ...boxSize,
      headerName: "Cash Withdrawal",
      totalNumber: 0.00,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
      prefix:"N"

    }, {
      ...boxSize,
      headerName: "Quickteller Airtime",
      totalNumber: 0.00,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
      prefix:"N"
    }, {
      ...boxSize,
      headerName: "Quickteller Bills",
      totalNumber: 0.00,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
      prefix:"N"
    }, {
      ...boxSize,
      headerName: "Paycode withdrawal",
      totalNumber: 0.00,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
      prefix:"N"
    }]
  }
      setStats(getStats())
      if ((typeof institutions === "undefined" && typeof institutionsError === "undefined")) {
        setLoading({ isLoading: true, text: "" })
      } else {
        setLoading({ isLoading: false, text: "" })
      }
  }, [institutions, institutionsError])
  return (
    <AppCard topic={<Text variant="card-header" size="card-header">Transaction Breakdown</Text>} >
      {!loading.isLoading ?
        <>{stats?.map((x, i) =><Stat key={i} {...x} />)}
        </> :
        <SkeletonLoader rows={1} columns={4} width="200px" height="200px" />
      }
    </AppCard>)
}