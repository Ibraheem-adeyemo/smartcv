import { Button, Flex, Text } from "@chakra-ui/react"
import React, { useState, useEffect, useContext, FC } from "react"
import { Stat } from "../stats"
import { SkeletonLoader } from ".."
import { useLoading } from "../../hooks"
import { StatsA } from "../../models"
import { StatsContext } from "../../providers"
import { AppCard } from "../app"
import { keysForArrayComponents, StatsName, upcomingFeature } from "../../constants"

interface TransactionBreakdownProps {
  width?: string | string[],
  height?: string | string[],
  showDetails?: boolean
}

interface StatsProps extends StatsA {
  comingSoon?: boolean
}


const TransactionBreakdown: FC<TransactionBreakdownProps> = ({ showDetails = false, ...props }: TransactionBreakdownProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
  const { institutions, institutionsError } = useContext(StatsContext)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
  const [stats, setStats] = useState<StatsProps[]>()

  useEffect(() => {
    // console.log("waiting")

    const getStats = (): StatsProps[] => {
      const boxSize = {
        width: props.width,
        height: props.height,
        prefix: "",
        suffix: "",
        comingSoon: false
      }
      // console.log("done waiting")
      return [{
        ...boxSize,
        headerName: StatsName.cashWithdrawal,
        totalNumber: 0.00,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
        prefix: "N"

      }, {
        ...boxSize,
        headerName: StatsName.quicktellerAirtime,
        totalNumber: 0.00,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
        prefix: "N",
        comingSoon: true
      }, {
        ...boxSize,
        headerName: StatsName.quicktellerBill,
        totalNumber: 0.00,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
        prefix: "N",
        comingSoon: true
      }, {
        ...boxSize,
        headerName: StatsName.paycodeWithdrawal,
        totalNumber: 0.00,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
        prefix: "N",
        comingSoon: true
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

      {!loading.isLoading && stats ?
        <Flex flexWrap={"wrap"} gap="15px"> {stats.map((x, i) => (
          <Button key={`${keysForArrayComponents.transactionBreakdownAppCard}-${i}`} disabled={x.comingSoon} opacity={x.comingSoon ? "0.4" : "1"} cursor={showDetails && !x.comingSoon && x.url ? 'pointer' : 'none'}
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
            }}>{upcomingFeature.stats}</Text>}
            <Stat {...x} />
          </Button>
        ))}</Flex> :
        <SkeletonLoader rows={1} columns={4} width={props.width} height={props.height} gap="30px" loaderKey={keysForArrayComponents.transactionBreakdownAppCard} />
      }
    </AppCard>
  )
}

export default TransactionBreakdown