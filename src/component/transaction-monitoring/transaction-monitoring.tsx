import { Flex, Box, SkeletonCircle } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { FC, useContext, useEffect, useState } from "react"
import useSWR from "swr"
import { apiUrlsv1 } from "../../constants"
import { IRealTimeData } from "../../models"
import { StatsContext } from "../../providers"
import { LineChart } from "../app-charts"
import SkeletonLoader from "../skeleton-loader"
import TransactionMonitoringHeader from "./transactionHeader"


let defaultUrl = `${apiUrlsv1.realTimeTransactionReport}banks/analysis`;
const TransactionMonitoring:FC = () => {
    const { setFiltersToShow } = useContext(StatsContext)
    const [page, setPage] = useState(1)
    const [thisUrl, setThisUrl] = useState('')
      
    const { data: banksRealTimeData, isValidating , mutate: _mutate, error } = useSWR(!thisUrl ? null : thisUrl)
    const realTimeData = banksRealTimeData?.realtimeTransactionVolumeResponseList

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
        }, 60*60*3)
    
        return () => {
            clearTimeout(GetNextChart)
        }},
     [page, thisUrl]);
     
    if(isValidating || !banksRealTimeData) {
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
                            <Box width='70%'>
                            <LineChart realTime={bankRealTimeData} />
                            </Box>
                        </Flex>
                    )
                })
            }           
            
        </Box>
    )
}

export default TransactionMonitoring