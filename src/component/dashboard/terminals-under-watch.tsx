import React, { FC, useContext, useEffect, useState } from "react"
import { Stat } from "../stats"
import { StatsA } from "../../models/stats-models";
import { SkeletonLoader } from "..";
import { AppCard } from "../app";
import { useLoading } from "../../hooks";
import { apiUrlsv1, appRoles, keysForArrayComponents, StatsName, upcomingFeature, UserManagementModalNames } from "../../constants";
import useSWR from "swr";
import { ATMInSupervisor, Paginate } from "../../models";
import { AuthContext, PaginatorProvider, StatsContext } from "../../providers";
import { useToast, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button } from "@chakra-ui/react";
import _, { sumBy } from "lodash";
import { ChannelsMonitoringTableSetup } from "../channels-monitoring";

interface TerminalsUnderWatchProps {
  title?: string,
  showDetails?: boolean,
  width?: string | string[],
  height?: string | string []
}

interface StatsProps extends StatsA {
  comingSoon?: boolean
}

const TerminalsUnderWatch: FC<TerminalsUnderWatchProps> = ({ showDetails = false, ...props }: TerminalsUnderWatchProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
  const { token, userDetail } = useContext(AuthContext)
  const { selectedTenantCode, institutions, institutionsError, dataDuration } = useContext(StatsContext)
  let atmInSupervisorUrl = apiUrlsv1.atmInSupervisor
  if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {

    if (userDetail.role.name !== appRoles.superAdmin) {
      atmInSupervisorUrl = `${apiUrlsv1.atmInSupervisor}/${userDetail.tenant.code}`
    } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
      atmInSupervisorUrl = `${apiUrlsv1.atmInSupervisor}/${selectedTenantCode}`
    }
  }
  atmInSupervisorUrl = token && userDetail ? atmInSupervisorUrl : ""
  const { data: atmInSupervisor, mutate: _mutate, error: atmInSupervisorError } = useSWR<Paginate<ATMInSupervisor>>(atmInSupervisorUrl ? atmInSupervisorUrl : null)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
  const [stats, setStats] = useState<StatsProps[]>()
  const toast = useToast()

  useEffect(() => {
    const getStats = () => {

      const boxSize = {
        width: props.width,
        height: props.height,
        prefix: "",
        suffix: "",
        comingSoon:false
      }
      return [{
        ...boxSize,
        headerName: StatsName.atmInSupervisor,
        totalNumber: atmInSupervisor && typeof atmInSupervisor.content !== "undefined" ? sumBy(atmInSupervisor.content, (atm) => atm.count) : 0,
        status: "green",
        percentage: "6.0%",
        days: dataDuration,
        url: apiUrlsv1.atmInSupervisor
      }, {
        ...boxSize,
        headerName: StatsName.atmInCashJam,
        totalNumber: 0,
        status: "green",
        percentage: "6.0%",
        days: dataDuration,
        url: ""
      }, {
        ...boxSize,
        headerName: StatsName.atmCassetteErrors,
        totalNumber: 0,
        status: "red",
        percentage: "6.0%",
        days: dataDuration,
        url: "",
        comingSoon: true
      }]
    }
    setStats(getStats())
    if (typeof atmInSupervisorError !== "undefined") {
      toast({
        status: "error",
        title: atmInSupervisorError,
        variant: "left-accent",
        isClosable: true
      })
    }


    if ((typeof atmInSupervisor === "undefined" && typeof atmInSupervisorError === "undefined")) {
      setLoading({ isLoading: true, text: "" })
    } else {
      setLoading({ isLoading: false, text: "" })
    }
  }, [atmInSupervisor, atmInSupervisorError])
  return (
    <>
      <AppCard topic={<Text variant="card-header" size="card-header">{typeof props.title !== "undefined" && props.title !== "" ? props.title : "What Terminals are under watch"}</Text>}>

        {!loading.isLoading ?
          <>
            {stats?.map((x, i) =>(
              <Button key={`${keysForArrayComponents.terminalsUnderWatchAppCard}-${i}`} disabled={x.comingSoon} opacity={x.comingSoon? "0.4":"1"} cursor={showDetails && !x.comingSoon && x.url? 'pointer': 'none'} onClick={()=> {
                if(showDetails && x.url && !x.comingSoon) {
                  setSelectedUrl(`${x.url}/`)
                  setSelectedHeaderName(x.headerName)
              }}} >
                {x.comingSoon && <Text size="page-header" variant="page-header" sx={{
                        pos: "absolute",
                        zIndex: 10
                    }}>{upcomingFeature.stats}</Text>}
                <Stat {...x} /></Button>))}
          </> :
          <SkeletonLoader rows={1} columns={3} width={props.width} height={props.height} gap="30px" loaderKey={keysForArrayComponents.terminalsUnderWatchAppCard} />
        }
      </AppCard>

      {showDetails && selectedHeaderName && selectedUrl && <Modal scrollBehavior="inside" size="xl" onClose={() => {
        setSelectedUrl(undefined)
        setSelectedHeaderName(undefined) 
        }} isOpen={selectedUrl ? true : false} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="white" px="18px">
          <ModalHeader>{selectedHeaderName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PaginatorProvider>
              <ChannelsMonitoringTableSetup url={selectedUrl} />
            </PaginatorProvider>
          </ModalBody>
        </ModalContent>
      </Modal>}
    </>
  )
}
export default TerminalsUnderWatch