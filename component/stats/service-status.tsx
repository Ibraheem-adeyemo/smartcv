import { Text, useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Stat } from "."
import { StatsA } from "../../models/stats-models";
import { SkeletonLoader } from "..";
import { AppCard } from "../app";
import useSWR from "swr";
import { apiUrlsv1 } from "../../constants";
import { Paginate, ATMCount, ATMInService } from "../../models";
import { useLoading } from "../../hooks";
import _ from "lodash";
import { StatsContext } from "../../provider/stats-provider";


export default function ServiceStatus(props: any) {
  const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
  let atmInServiceurl = apiUrlsv1.atmInService
  let atmOutOfServiceurl = apiUrlsv1.atmOutOfService
  if (typeof selectedTenantCode !== "undefined" && selectedTenantCode !== "0") {
    atmInServiceurl += `/${selectedTenantCode}`
    atmOutOfServiceurl += `/${selectedTenantCode}`
  }
  const { data: totalATMInService, mutate: totalATMInServiceMutate, error: totalATMInServiceError } = useSWR<Paginate<ATMInService>>(atmInServiceurl)
  const { data: totalATMOutOfService, mutate: totalATMOutOfServiceMutate, error: totalATMOutOfServiceError } = useSWR<Paginate<ATMInService>>(atmOutOfServiceurl)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
  const [stats, setStats] = useState<StatsA[]>()
  const toast = useToast()


  useEffect(() => {
    // console.log("waiting")

    const getStats = () : StatsA[] => {

      const boxSize = {
        width: ["224px", "224px", "224px", "224px", "224px", "222px"],
        height: ["159px", "159px", "159px", "159px", "159px", "189px"],
        prefix:"",
        suffix:""
      }
      return [{

        ...boxSize,
        headerName: "ATM In Service",
        totalNumber: typeof totalATMInService !== "undefined" && typeof totalATMInService.content !== "undefined" ? _.sumBy(totalATMInService?.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days"
      }, {
        ...boxSize,
        headerName: "ATM Out Service",
        totalNumber: typeof totalATMOutOfService !== "undefined" && typeof totalATMOutOfService.content !== "undefined" ? _.sumBy(totalATMOutOfService?.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days"
      },]
    }
    setStats(getStats())
    if (typeof totalATMInServiceError !== "undefined") {
      toast({
        status: "error",
        title: totalATMInServiceError,
        variant: "left-accent",
        isClosable: true
      })
    }
    if (typeof totalATMOutOfServiceError !== "undefined") {
      toast({
        status: "error",
        title: totalATMOutOfServiceError,
        variant: "left-accent",
        isClosable: true
      })
    }

    if ((typeof institutions === "undefined" && typeof institutionsError === "undefined") || (typeof totalATMInService === "undefined" && typeof totalATMInServiceError === "undefined") || (typeof totalATMOutOfService === "undefined" && typeof totalATMOutOfServiceError === "undefined")) {
      setLoading({ isLoading: true, text: "" })
    } else {
      setLoading({ isLoading: false, text: "" })
    }
  }, [totalATMInService, totalATMOutOfService, totalATMInServiceError, totalATMOutOfServiceError, institutions, institutionsError])

  return (
    <AppCard topic={<Text variant="card-header" size="card-header">What is our service</Text>} statsComponent={Stat}>
      {!loading.isLoading ?
        <>
          {stats?.map((x, i) => <Stat key={i} {...x} />)}
        </> :
        <SkeletonLoader rows={1} columns={2} width="200px" height="200px" />
      }
    </AppCard>
  )
}