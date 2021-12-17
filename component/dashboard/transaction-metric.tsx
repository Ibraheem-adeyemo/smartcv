import React, { useState, useEffect, useContext, FC } from "react"
import { Stat } from "../stats"
import { SkeletonLoader } from ".."
import { StatsA } from "../../models"
import { AppCard } from "../app"
import { Text } from '@chakra-ui/react'
import { StatsContext } from "../../provider/stats-provider"
import { useLoading } from "../../hooks"

const TransactionMetric:FC = () => {
    const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
    const [loading, setLoading] = useLoading({isLoading:true, text:""})
    const [stats, setStats] = useState<StatsA[]>()


    useEffect(() => {
        // console.log("waiting")

        const getStats = (): StatsA[] => {
            const boxSize = {
                width: ["224px", "224px", "224px", "224px", "229px", "229px"],
                height: ["159px", "159px", "159px", "159px", "159px", "189px"],
                prefix:"",
                suffix:""
            }
            // console.log("done waiting")
            return [{
                ...boxSize,
                headerName: "Transaction Amount",
                totalNumber: 0.00,
                status: "green",
                percentage: "6.0%",
                days: "Last 7 days",
                prefix:"N"

            }, {
                ...boxSize,
                headerName: "Transaction Count",
                totalNumber: 0,
                status: "green",
                percentage: "6.0%",
                days: "Last 7 days",
            }, {
                ...boxSize,
                headerName: "Your Position",
                totalNumber: 0,
                status: "green",
                percentage: "6.0%",
                days: "Last 7 days",
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
        <AppCard topic={<Text variant="card-header" size="card-header">What Are our Transaction Metric</Text>} >
            {!loading.isLoading ?
                <>
                    {stats?.map((x, i) => <Stat key={i} {...x} />)}
                </> :
                <SkeletonLoader rows={3} columns={3} width="200px" height="10px" gridGap="30px" />
            }
        </AppCard>)
}

export default TransactionMetric