import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react"
import { Stat } from "../stats"
import { StatsA } from "../../models/stats-models";
import { SkeletonLoader } from "..";
import { AppCard } from "../app";
import useSWR from "swr";
import { apiUrlsv1, appRoles, keysForArrayComponents, UserManagementModalNames } from "../../constants";
import { Paginate, ATMInService } from "../../models";
import { useLoading } from "../../hooks";
import _, { sumBy } from "lodash";
import { AuthContext, PaginatorProvider, StatsContext } from "../../providers";
import { ChannelsMonitoringTableSetup } from "../channels-monitoring";

interface ServiceStatusProps {
  title?: string,
  width?: string | string[],
  showDetails?:boolean
}

const ServiceStatus: FC<ServiceStatusProps> = ({ width = 'fit-content', showDetails=false, ...props }: ServiceStatusProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
  const { token, userDetail } = useContext(AuthContext)
  const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
  
  let atmInServiceurl = apiUrlsv1.atmInService
  let atmOutOfServiceurl = apiUrlsv1.atmOutOfService
  // debugger
  if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {

    if (userDetail.role.name !== appRoles.superAdmin) {
      atmInServiceurl = `${apiUrlsv1.atmInService}/${userDetail.tenant.code}`
      atmOutOfServiceurl = `${apiUrlsv1.atmOutOfService}/${userDetail.tenant.code}`
    } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
      atmInServiceurl = `${apiUrlsv1.atmInService}/${selectedTenantCode}`
      atmOutOfServiceurl = `${apiUrlsv1.atmOutOfService}/${selectedTenantCode}`
    }
  }
  atmInServiceurl = token && userDetail ? atmInServiceurl : ""
  atmOutOfServiceurl = token && userDetail ? atmOutOfServiceurl : ""

  const { data: totalATMInService, mutate: _totalATMInServiceMutate, error: totalATMInServiceError } = useSWR<Paginate<ATMInService>>(atmInServiceurl ? atmInServiceurl : null)
  const { data: totalATMOutOfService, mutate: _totalATMOutOfServiceMutate, error: totalATMOutOfServiceError } = useSWR<Paginate<ATMInService>>(atmOutOfServiceurl ? atmOutOfServiceurl : null)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
  const [stats, setStats] = useState<StatsA[]>()
  const toast = useToast()


  useEffect(() => {
    // console.log("waiting")

    const getStats = (): StatsA[] => {

      const boxSize = {
        width: ["224px", "224px", "224px", "224px", "229px", "229px"],
        height: ["200px", "200px", "200px", "200px", "200px", "200px"],
        prefix: "",
        suffix: ""
      }
      return [{

        ...boxSize,
        headerName: "ATM In Service",
        totalNumber: totalATMInService && totalATMInService.content ? sumBy(totalATMInService?.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
        url: apiUrlsv1.atmInService
      }, {
        ...boxSize,
        headerName: "ATM Out Service",
        totalNumber: totalATMOutOfService && totalATMOutOfService.content ? sumBy(totalATMOutOfService?.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
        url: apiUrlsv1.atmOutOfService
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
    if (totalATMInService === null || totalATMOutOfService === null) {
      setLoading({ isLoading: false, text: "" })
    }
    else if ((!totalATMInService && !totalATMInServiceError) || (!totalATMOutOfService && !totalATMOutOfServiceError)) {
      setLoading({ isLoading: true, text: "" })
    } else {
      setLoading({ isLoading: false, text: "" })
    }
  }, [totalATMInService, totalATMOutOfService, totalATMInServiceError, totalATMOutOfServiceError])

  return (
    <>
      <AppCard width={width} topic={<Text variant="card-header" size="card-header"> {typeof props.title !== "undefined" && props.title !== "" ? props.title : "What is our service"}</Text>}>
        {!loading.isLoading && stats && stats.map((x, i) => <Button key={`${keysForArrayComponents.serviceStatusAppCard}-${i}`} cursor={showDetails? 'pointer': 'none'} onClick={()=> {
          if(showDetails){
            setSelectedUrl(`${x.url}/`)
            setSelectedHeaderName(x.headerName)
          }}}><Stat {...x} /></Button>)}
        {loading.isLoading && !stats && <SkeletonLoader rows={1} columns={2} width="200px" height="200px" loaderKey={keysForArrayComponents.serviceStatusAppCard} />}
      </AppCard>

      {showDetails && selectedHeaderName && selectedUrl && <Modal scrollBehavior="inside" size="fit-content" onClose={() => {
        setSelectedUrl(undefined)
        setSelectedHeaderName(undefined)
        } } isOpen={selectedUrl?true:false} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="white" px="18px" w="fit-content">
          <ModalHeader>{selectedHeaderName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PaginatorProvider>
                <ChannelsMonitoringTableSetup url={selectedUrl} />
            </PaginatorProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    }
    </>
  )
}

export default ServiceStatus