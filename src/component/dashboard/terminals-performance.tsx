import {Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast} from '@chakra-ui/react'
import React, { FC, useContext, useEffect, useState } from "react"
import { StatsA } from "../../models/stats-models";
import useSWR from "swr";
import { apiUrlsv1, appRoles, keysForArrayComponents, StatsName, UserManagementModalNames } from "../../constants";
import { useLoading } from "../../hooks";
import _, { sumBy } from "lodash";
import { ATMCount, Paginate } from "../../models";
import { AuthContext, PaginatorProvider, StatsContext } from "../../providers"
import { AppCard } from "../app";
import { SkeletonLoader } from "..";
import { Stat } from "../stats";
import { ChannelsMonitoringTableSetup } from '../channels-monitoring';

interface TerminalsPerformanceProps {
  showDetails?:boolean,
  width?: string [] | string,
  height?: string[] | string
}

const TerminalsPerformance:FC<TerminalsPerformanceProps> = ({ showDetails = false ,...props}: TerminalsPerformanceProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
  const {token, userDetail} = useContext(AuthContext)
  const { selectedTenantCode, institutions, institutionsError } = useContext(StatsContext)
  let url = apiUrlsv1.atmCount
  // debugger
  if (userDetail && ( userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && ( userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
    
    if(userDetail.role.name !== appRoles.superAdmin){
      url = `${apiUrlsv1.atmCount}/${userDetail.tenant.code}`
    } else if(userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0")  {
      url = `${apiUrlsv1.atmCount}/${selectedTenantCode}`
    }
  }
  url = token && userDetail? url:""
  const { data: totalATMCount, mutate: _mutate, error: totalATMCountError } = useSWR<Paginate<ATMCount>>(token?url:null)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "Loading" })
  const [stats, setStats] = useState<StatsA[]>()
  const toast = useToast()

  useEffect(() => {
    // console.log("waiting")
    const getStats = (): StatsA[] => {
      const boxSize = {
        width: props.width,
        height: props.height,
        prefix: "",
        suffix: ""
      }
      
      //const atmCountValue = totalATMCount && totalATMCount.count ? 
      const atmCountValue = totalATMCount && totalATMCount.content ? sumBy(totalATMCount?.content, (atm) => atm.count) : 0
      const atmLowCashValue = 0
    
      return [{
        ...boxSize,
        headerName: StatsName.atmCount,
        totalNumber: atmCountValue,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
        url: apiUrlsv1.atmCount
      }, {
        ...boxSize,
        headerName: StatsName.atmLowCashLevel,
        totalNumber: atmLowCashValue,
        status: "green",
        percentage: "6.0%",
        days: "Last 7 days",
        url:""
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
    // debugger
    if ((typeof totalATMCount === "undefined" && typeof totalATMCountError === "undefined")) {
      setLoading({ isLoading: true, text: "" })
    } else {
      setLoading({ isLoading: false, text: "" })
    }
  }, [totalATMCount, totalATMCountError])
  return (
    <>
    <AppCard topic={<Text variant="card-header" size="card-header">How are terminals performance</Text>} >
      {!loading.isLoading && stats ?
        <>{stats.map((x, i) => <Button  key={`${keysForArrayComponents.terminalsPerformance}-${i}`} cursor={showDetails? 'pointer': 'none'} onClick={()=> {
          if(showDetails){
            setSelectedUrl(`${x.url}/`)
            setSelectedHeaderName(x.headerName)
          }}}><Stat {...x} /></Button>)}</> :
        <SkeletonLoader rows={1} columns={2} width={props.width} height={props.height} loaderKey='terminal-performance-app-card' />
      }
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
export default  TerminalsPerformance