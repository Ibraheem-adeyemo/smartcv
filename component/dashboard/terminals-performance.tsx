import React, { FC, useContext, useEffect, useState } from "react"
import { StatsA } from "../../models/stats-models";
import useSWR from "swr";
import { apiUrlsv1 } from "../../constants";
import { useLoading } from "../../hooks";
import _ from "lodash";
import { ATMCount, Paginate } from "../../models";
import { useToast } from "@chakra-ui/react";
import { StatsContext } from "../../provider/stats-provider";
import { AppCard } from "../app";
import { SkeletonLoader } from "..";
import {Text} from '@chakra-ui/react'
import { Stat } from "../stats";

const TerminalsPerformance:FC = () => {
  const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
  let url = apiUrlsv1.atmCount
  if (typeof selectedTenantCode !== "undefined" && selectedTenantCode !== "0") {
    url += `/${selectedTenantCode}`
  }
  const { data: totalATMCount, mutate: _mutate, error: totalATMCountError } = useSWR<Paginate<ATMCount>>(url)
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
      const atmCountValue = typeof totalATMCount !== "undefined" && typeof totalATMCount.content !== "undefined" ? _.sumBy(totalATMCount?.content, (atm) => atm.count) : 0
      const atmLowCashValue = 0
      return [{
        ...boxSize,
        headerName: "ATM Count",
        totalNumber: atmCountValue,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",

      }, {
        ...boxSize,
        headerName: "ATM Low Cash Level",
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
        <SkeletonLoader rows={3} columns={2} width="400px" height="10px" gridGap="30px" />
      }
    </AppCard>
  )
}
export default  TerminalsPerformance