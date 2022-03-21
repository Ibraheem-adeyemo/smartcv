import { Text } from "@chakra-ui/react"
import React, { useState, useEffect, useContext, FC } from "react"
import { Stat } from "../stats"
import { SkeletonLoader } from ".."
import { useLoading } from "../../hooks"
import { StatsA } from "../../models"
import { StatsContext } from "../../providers"
import { AppCard } from "../app"
import { StatsName } from "../../constants"

const TransactionBreakdown:FC = () => {
  const { institutions, institutionsError } = useContext(StatsContext)
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
      headerName: StatsName.cashWithdrawal,
      totalNumber: 0.00,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
      prefix:"N"

    }, {
      ...boxSize,
      headerName: StatsName.quicktellerAirtime,
      totalNumber: 0.00,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
      prefix:"N"
    }, {
      ...boxSize,
      headerName: StatsName.quicktellerBill,
      totalNumber: 0.00,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
      prefix:"N"
    }, {
      ...boxSize,
      headerName: StatsName.paycodeWithdrawal,
      totalNumber: 0.00,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days",
      prefix:"N"
    }]
  }
      setStats(getStats())
      // if ((typeof institutions === "undefined" && typeof institutionsError === "undefined")) {
      //   setLoading({ isLoading: true, text: "" })
      // } else {
      //   setLoading({ isLoading: false, text: "" })
      // }
      setLoading({ isLoading: false, text: "" })
  }, [institutions, institutionsError])
  return (
    <AppCard topic={<Text variant="card-header" size="card-header">Transaction Breakdown</Text>} >
      {!loading.isLoading ?
        <>{stats?.map((x, i) =><Stat key={i} {...x} />)}
        </> :
        <SkeletonLoader rows={3} columns={4} width="200px" height="10px" gap="30px" loaderKey="transaction-breakdown-app-card" />
      }
    </AppCard>)
}

export default TransactionBreakdown