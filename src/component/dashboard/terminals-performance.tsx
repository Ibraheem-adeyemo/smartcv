import {Text, useToast} from '@chakra-ui/react'
import React, { FC, useContext, useEffect, useState } from "react"
import { StatsA } from "../../models/stats-models";
import useSWR from "swr";
import { apiUrlsv1, StatsName } from "../../constants";
import { useLoading } from "../../hooks";
import _, { sumBy } from "lodash";
import { ATMCount, Paginate } from "../../models";
import { AuthContext, StatsContext } from "../../providers"
import { AppCard } from "../app";
import { SkeletonLoader } from "..";
import { Stat } from "../stats";

const TerminalsPerformance:FC = () => {
  const {token} = useContext(AuthContext)
  const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
  let url = apiUrlsv1.atmCount
  if (typeof selectedTenantCode !== "undefined" && selectedTenantCode !== "0") {
    url += `/${selectedTenantCode}`
  }
  url = token? url:""
  const { data: totalATMCount, mutate: _mutate, error: totalATMCountError } = useSWR<Paginate<ATMCount>>(token?url:null)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "Loading" })
  const [stats, setStats] = useState<StatsA[]>()
  const toast = useToast()


  useEffect(() => {
    // console.log("waiting")
    const getStats = (): StatsA[] => {
      const boxSize = {
        width: ["224px", "224px", "224px", "224px", "229px", "229px"],
        height: ["159px", "159px", "159px", "159px", "159px", "189px"],
        prefix: "",
        suffix: ""
      }
      const atmCountValue = typeof totalATMCount !== "undefined" && typeof totalATMCount.content !== "undefined" ? sumBy(totalATMCount?.content, (atm) => atm.count) : 0
      const atmLowCashValue = 0
      return [{
        ...boxSize,
        headerName: StatsName.atmCount,
        totalNumber: atmCountValue,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",

      }, {
        ...boxSize,
        headerName: StatsName.atmLowCashLevel,
        totalNumber: atmLowCashValue,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
      }]
    }

    setStats(getStats())
    if (typeof totalATMCountError !== "undefined") {
      toast({
        status: "error",
        title: totalATMCountError,
        variant: "left-accent",
        isClosable: true
      })
    }

    if ((typeof institutions === "undefined" && typeof institutionsError === "undefined") || (typeof totalATMCount === "undefined" && typeof totalATMCountError === "undefined")) {
      setLoading({ isLoading: true, text: "" })
    } else {
      setLoading({ isLoading: false, text: "" })
    }
  }, [totalATMCount, totalATMCountError, institutions, institutionsError])
  return (
    <AppCard topic={<Text variant="card-header" size="card-header">How are terminals performance</Text>} >
      {!loading.isLoading ?
        <>{stats?.map((x, i) => <Stat key={i} {...x} />)}</> :
        <SkeletonLoader rows={3} columns={2} width="400px" height="10px" gap="30px" />
      }
    </AppCard>
  )
}
export default  TerminalsPerformance