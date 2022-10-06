import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react"
import { Stat } from "../stats"
import { StatsA } from "../../models/stats-models";
import { SkeletonLoader } from "..";
import { AppCard } from "../app";
import useSWR from "swr";
import { apiUrlsv1, appRoles, cookieKeys, keysForArrayComponents, StatsName, UserManagementModalNames } from "../../constants";
import { Paginate, ATMInService, ATMCount, ATMInSupervisor } from "../../models";
import { useLoading } from "../../hooks";
import _, { sumBy } from "lodash";
import { AuthContext, PaginatorProvider, StatsContext } from "../../providers";
import { ChannelsMonitoringTableSetup } from "../channels-monitoring";
import { GiComputing } from "react-icons/gi";
import { getCookie } from "../../lib";

interface ServiceStatusProps {
  title?: string,
  width?: string | string[],
  height?: string | string[],
  showDetails?:boolean,
  page: string
  dataDuration: string
}

interface  StatsProps extends StatsA {
  commingSoon: boolean,
  page: string[]
}
const ServiceStatus: FC<ServiceStatusProps> = ({ width = 'fit-content', showDetails=false, ...props }: ServiceStatusProps) => {
  // debugger
  const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
  const { token, userDetail } = useContext(AuthContext)
  const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
  const cokieToken = getCookie(cookieKeys.token)
  
  let atmInServiceurl = apiUrlsv1.atmInService
  let atmOutOfServiceurl = apiUrlsv1.atmOutOfService
  let atmCountUrl = apiUrlsv1.atmCount
  let atmInSupervisorUrl = apiUrlsv1.atmInSupervisor
  // debugger
  if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {

    if (userDetail.role.name !== appRoles.superAdmin) {
      atmInServiceurl = `${apiUrlsv1.atmInService}/${userDetail.tenant.code}`
      atmOutOfServiceurl = `${apiUrlsv1.atmOutOfService}/${userDetail.tenant.code}`
      atmCountUrl = `${apiUrlsv1.atmCount}/${userDetail.tenant.code}`
      atmInSupervisorUrl = `${apiUrlsv1.atmInSupervisor}/${userDetail.tenant.code}`
    } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
      atmInServiceurl = `${apiUrlsv1.atmInService}/${selectedTenantCode}`
      atmOutOfServiceurl = `${apiUrlsv1.atmOutOfService}/${selectedTenantCode}`
      atmCountUrl = `${apiUrlsv1.atmCount}/${selectedTenantCode}`
      atmInSupervisorUrl = `${apiUrlsv1.atmInSupervisor}/${selectedTenantCode}`
    }
  }
  atmInServiceurl = token||cokieToken && userDetail ? atmInServiceurl : ""
  atmOutOfServiceurl = token||cokieToken && userDetail ? atmOutOfServiceurl : ""

  const { data: totalATMInService, mutate: _totalATMInServiceMutate, error: totalATMInServiceError } = useSWR<Paginate<ATMInService>>(!atmInServiceurl ?  null : atmInServiceurl)
  const { data: totalATMOutOfService, mutate: _totalATMOutOfServiceMutate, error: totalATMOutOfServiceError } = useSWR<Paginate<ATMInService>>(!atmOutOfServiceurl? null : atmOutOfServiceurl)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
  const [stats, setStats] = useState<StatsProps[]>()
  const toast = useToast()

  const { data: totalATMCount, mutate: _mutate, error: totalATMCountError } = useSWR<Paginate<ATMCount>>(token||cokieToken ? atmCountUrl:null)

  atmInSupervisorUrl = token && userDetail ? atmInSupervisorUrl : ""
  const { data: atmInSupervisor, error: atmInSupervisorError } = useSWR<Paginate<ATMInSupervisor>>(atmInSupervisorUrl ? atmInSupervisorUrl : null)

  
  const atmCountValue = totalATMCount && totalATMCount.content ? sumBy(totalATMCount?.content, (atm) => atm.count) : 0
  const atmLowCashValue = 0
  
  useEffect(() => {
    setLoading({ isLoading: true, text: "" })
    const getStats = (): StatsProps[] => {

      const boxSize = {
        width,
        height: props.height,
        prefix: "",
        suffix: "",
        commingSoon: false,
        title: 'Total Count'
      }

      return [{

        ...boxSize,
        headerName: "ATM In-service",
        totalNumber: totalATMInService && totalATMInService.content ? sumBy(totalATMInService?.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: props.dataDuration,
        url: apiUrlsv1.atmInService,
        commingSoon: false,
        page: ['dashboard', 'chanel-monitoring']
      }, {
        ...boxSize,
        headerName: "ATM Out-of-service",
        totalNumber: totalATMOutOfService && totalATMOutOfService.content ? sumBy(totalATMOutOfService?.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: props.dataDuration, //"Last 7 days",
        url: apiUrlsv1.atmOutOfService,
        page: ['dashboard', 'chanel-monitoring']
      },{
        ...boxSize,
        headerName: StatsName.atmCount,
        totalNumber: atmCountValue,
        status: "green",
        percentage: "6.0%",
        days: props.dataDuration, //"Last 7 days",
        url: apiUrlsv1.atmCount,
        page: ['chanel-monitoring']
      },{
        ...boxSize,
        headerName: StatsName.atmInSupervisor,
        totalNumber: atmInSupervisor && typeof atmInSupervisor.content !== "undefined" ? sumBy(atmInSupervisor.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: props.dataDuration, //"Last 7 days",
        url: apiUrlsv1.atmInSupervisor,
        page:['dashboard', 'chanel-monitoring']
      }]
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
    // debugger
    if (totalATMInService || totalATMOutOfService || totalATMInService === null || totalATMOutOfService === null ) {
      setLoading({ isLoading: false, text: "" })
    }
    else if ((!totalATMInService || !totalATMOutOfService) && !totalATMInServiceError && !totalATMOutOfServiceError) {
      setLoading({ isLoading: true, text: "" })
    } else {
      setLoading({ isLoading: false, text: "" })
    }
  }, [totalATMInService, totalATMOutOfService, totalATMInServiceError, totalATMOutOfServiceError])

  return (
    <>
      <AppCard topic={<Text variant="card-header" size="card-header"> {typeof props.title !== "undefined" && props.title !== "" ? props.title : "Our various ATM status metrics"}</Text>}>
        {!loading.isLoading && stats? stats.map((x, i) => {
          return x.page.indexOf(props.page) > -1 ? <Button disabled={x.commingSoon?true:!x.url?true:false} opacity={x.commingSoon? 0.7:""} position={"relative"} key={`${keysForArrayComponents.serviceStatusAppCard}-${i}`} cursor={ !x.commingSoon && showDetails? 'pointer': 'none'} onClick={()=> {
            if(showDetails && !x.commingSoon){
              setSelectedUrl(`${x.url}/`)
              setSelectedHeaderName(x.headerName)
            }}}>
              {<Flex position="absolute" right={0} top={0} bottom={0} left={0}  ></Flex>}
                <Stat {...x} />
              </Button>:null
        }):<SkeletonLoader rows={1} columns={2} width={width} height={props.height} loaderKey={keysForArrayComponents.serviceStatusAppCard} />}
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