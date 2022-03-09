import { Text, useToast } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react"
import { Stat } from "../stats"
import { StatsA } from "../../models/stats-models";
import { SkeletonLoader } from "..";
import { AppCard } from "../app";
import useSWR from "swr";
import { apiUrlsv1 } from "../../constants";
import { Paginate, ATMInService } from "../../models";
import { useLoading } from "../../hooks";
import _, { sumBy } from "lodash";
import { AuthContext, StatsContext } from "../../providers";

interface ServiceStatusProps {
  title?: string
}

const ServiceStatus:FC<ServiceStatusProps> = (props: ServiceStatusProps) => {
  const {token} = useContext(AuthContext)
  const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
  let atmInServiceurl = apiUrlsv1.atmInService
  let atmOutOfServiceurl = apiUrlsv1.atmOutOfService
  if (typeof selectedTenantCode !== "undefined" && selectedTenantCode !== "0") {
    atmInServiceurl += `/${selectedTenantCode}`
    atmOutOfServiceurl += `/${selectedTenantCode}`
  }
  atmInServiceurl = token? atmInServiceurl:""
  atmOutOfServiceurl = token? apiUrlsv1.atmOutOfService:""

  const { data: totalATMInService, mutate: _totalATMInServiceMutate, error: totalATMInServiceError } = useSWR<Paginate<ATMInService>>(atmInServiceurl? atmInServiceurl:null)
  const { data: totalATMOutOfService, mutate: _totalATMOutOfServiceMutate, error: totalATMOutOfServiceError } = useSWR<Paginate<ATMInService>>(atmOutOfServiceurl?atmOutOfServiceurl:null)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
  const [stats, setStats] = useState<StatsA[]>()
  const toast = useToast()


  useEffect(() => {
    // console.log("waiting")

    const getStats = (): StatsA[] => {

      const boxSize = {
        width: ["224px", "224px", "224px", "224px", "224px", "222px"],
        height: ["159px", "159px", "159px", "159px", "159px", "189px"],
        prefix: "",
        suffix: ""
      }
      return [{

        ...boxSize,
        headerName: "ATM In Service",
        totalNumber: typeof totalATMInService !== "undefined" && typeof totalATMInService.content !== "undefined" ? sumBy(totalATMInService?.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days"
      }, {
        ...boxSize,
        headerName: "ATM Out Service",
        totalNumber: typeof totalATMOutOfService !== "undefined" && typeof totalATMOutOfService.content !== "undefined" ? sumBy(totalATMOutOfService?.content, (atm) => atm.count) : 0,
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
    <AppCard topic={<Text variant="card-header" size="card-header"> {typeof props.title !== "undefined" && props.title !== "" ? props.title : "What is our service"}</Text>}>
      {!loading.isLoading ?
        <>
          {stats?.map((x, i) => <Stat key={i} {...x} />)}
        </> :
        <SkeletonLoader rows={1} columns={2} width="200px" height="200px" />
      }
    </AppCard>
  )
}

export default ServiceStatus