import { Flex, Box, SkeletonCircle, useToast } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { FC, useContext, useEffect, useState } from "react"
import useSWR from "swr"
import { apiUrlsv1, appRoles, notificationMesage } from "../../constants"
import { IRealTimeData } from "../../models"
import { AuthContext, StatsContext } from "../../providers"
import { GrpLineChart } from "../app-charts"
import SkeletonLoader from "../skeleton-loader"
import TransactionMonitoringHeader from "./transactionHeader"


let defaultUrl = `${apiUrlsv1.realTimeTransactionReport}banks/analysis`;
const TransactionMonitoring:FC = () => {
    const { setFiltersToShow, selectedTenantCode } = useContext(StatsContext)
    const { token, userDetail } = useContext(AuthContext)
    const [page, setPage] = useState(1)
    const [thisUrl, setThisUrl] = useState(`${defaultUrl}?size=${2}`)

    const toast = useToast()

    const isSuperAdmin = userDetail?.role.name === appRoles.superAdmin && (selectedTenantCode == "0" || selectedTenantCode == "undefined")

    if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
  
        if (userDetail.role.name !== appRoles.superAdmin) {
          defaultUrl = `${apiUrlsv1.realTimeTransactionReport}transaction-metric?tenantCode=${userDetail.tenant.code}`
        } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
            defaultUrl = `${apiUrlsv1.realTimeTransactionReport}transaction-metric?tenantCode=${selectedTenantCode}`
        }
      }
      
    const { data: banksRealTimeData, isValidating , mutate: _mutate, error } = useSWR(isSuperAdmin ?thisUrl : defaultUrl)
    const realTimeData = banksRealTimeData?.realtimeTransactionVolumeResponseList

    console.log(error)
    useEffect(() => {
        setFiltersToShow({showTenantFilter: true});
        const GetNextChart = setTimeout(() => {
        setPage(page + 1)
            if(!banksRealTimeData || banksRealTimeData?.interchanges?.last) {
                setPage(1)
                setThisUrl(`${defaultUrl}?size=${2}`)
            } else {
                setPage(page + 1)
                setThisUrl(`${defaultUrl}?page=${page}&size=${2}`)
            }
        }, 60*60*10)
    
        return () => {
            clearTimeout(GetNextChart)
        }}
    ,
     [page, thisUrl]);

     if(typeof error !== 'undefined') {
        toast({
            status: "error",
            title: error? error.message?error.message : error: `${notificationMesage.Oops} ${notificationMesage.AnErrorOccurred}`,
            isClosable: true,
            variant: "left-accent"
        })
     }
     
    if(!error && (isValidating || !banksRealTimeData)) {
        return (
            <>
                <SkeletonLoader rows={1} width="100px" height="15px" columns={1} loaderKey="menu-user" />
                <SkeletonCircle size="25" />
            </>
        )
    }
    return (
        <Box>
            <TransactionMonitoringHeader />
            {
                realTimeData && realTimeData?.map((bankRealTimeData:IRealTimeData, i) => {
                    return(
                        <Flex gap="40px" mb={7} key={i}>            
                            <Box width='100%'>
                            <GrpLineChart realTime={bankRealTimeData} />
                            </Box>
                        </Flex>
                    )
                })
            }           
            
        </Box>
    )
}

export default TransactionMonitoring