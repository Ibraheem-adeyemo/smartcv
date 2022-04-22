import React, { useState, useEffect, useContext, FC } from "react"
import { Button, propNames, Text } from '@chakra-ui/react'
import { Stat } from "../stats"
import { SkeletonLoader } from ".."
import { Paginate, StatsA } from "../../models"
import { AppCard } from "../app"
import { AuthContext, StatsContext } from "../../providers"
import { useLoading } from "../../hooks"
import { apiUrlsv1, appRoles, keysForArrayComponents, StatsName, upcomingFeature } from "../../constants"
import useSWR from "swr"

interface TransactionMetricProps {
    width?: string | string [],
    height?: string | string [],
    showDetails?:boolean

}

interface StatsProps extends StatsA {
    comingSoon?: boolean
  }
const TransactionMetric:FC<TransactionMetricProps> = ({ showDetails=false,...props}: TransactionMetricProps) => {
    const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
    const [selectedUrl, setSelectedUrl] = useState<string>();
    const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
    const [loading, setLoading] = useLoading({isLoading:true, text:""})
    const [stats, setStats] = useState<StatsProps[]>()
    const {userDetail} = useContext(AuthContext)

    useEffect(() => {
        // console.log("waiting")

        const getStats = (): StatsProps[] => {
            const boxSize = {
                width: props.width,
                height: props.height,
                prefix:"",
                suffix:"",
                comingSoon: false,
            }
            // console.log("done waiting")
            return [{
                ...boxSize,
                headerName: StatsName.transactionAmount,
                totalNumber: 0.00,
                status: "green",
                percentage: "6.0%",
                days: "Last 7 days",
                prefix:"N"

            }, {
                ...boxSize,
                headerName: StatsName.transactionCount,
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
                comingSoon: true
            }]
        }
        setStats(getStats())
        /*
        if ((typeof institutions === "undefined" && typeof institutionsError === "undefined")) {
          setLoading({ isLoading: true, text: "" })
        } else {
          setLoading({ isLoading: false, text: "" })
        }*/
        setLoading({ isLoading: false, text: "" })
    }, [institutions, institutionsError])
    return (
        <AppCard topic={<Text variant="card-header" size="card-header">What Are our Transaction Metric</Text>} >
            {!loading.isLoading ?
                <>
                    {stats?.map((x, i) => <Button key={`${keysForArrayComponents.transactionMetricStat}-${i}`} disabled={x.comingSoon} opacity={x.comingSoon ? "0.4" : "1"} cursor={showDetails && !x.comingSoon && x.url ? 'pointer' : 'none'}
            onClick={() => {
              if (showDetails && x.url && !x.comingSoon) {
                setSelectedUrl(`${x.url}/`)
                setSelectedHeaderName(x.headerName)
              }
            }}
          >
            {x.comingSoon && <Text size="page-header" variant="page-header" sx={{
              pos: "absolute",
              zIndex: 10
            }}>{upcomingFeature.stats}</Text>}<Stat {...x} />
            </Button>
            )}
                </> :
                <SkeletonLoader rows={3} columns={3} width={props.width} height={props.height} gap="30px" loaderKey="transaction-metric-app-card" />
            }
        </AppCard>)
}

export default TransactionMetric