import { Flex } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { FC, useContext, useEffect, useMemo } from "react"
import { filterDates } from "../../constants"
import { StatsContext } from "../../provider/stats-provider"

const TerminalsPerformance = dynamic(() => import('./terminals-performance'))
const SuccessRate = dynamic(() => import('./success-rate'))
const ServiceStatus = dynamic(() => import('./service-status'))
const TerminalsUnderWatch = dynamic(() => import('./terminals-under-watch'))
const TopPerforminBanks = dynamic(() => import('./top-performing-banks'))
const TopTransactionMetric = dynamic(() => import('./top-transaction-metric'))
const TransactionBreakdown = dynamic(() => import('./transaction-breakdown'))
const TransactionMetric = dynamic(() => import('./transaction-metric'))
const UsageMetric = dynamic(() => import('./usage-metric'))
const Dashboard:FC = () => {
    const {toggleDate} = useContext(StatsContext)
    useEffect(() => {
        toggleDate(filterDates.today)
    },[])
    return(
        
        <Flex gridGap="30px" flexWrap="wrap">
          <Flex flexGrow={3}>
            <TerminalsPerformance />
          </Flex>
          <Flex flexGrow={1} w="25%">
            <SuccessRate />
          </Flex>
          <Flex flexGrow={1} w="35%">
            <ServiceStatus />
          </Flex>
          <Flex flexGrow={3} >
            <TerminalsUnderWatch />
          </Flex>
          <Flex flexGrow={3}>
            <TransactionMetric />
          </Flex>
          <Flex flexGrow={1}>
            <UsageMetric />
          </Flex>
          <Flex flexGrow={1}>
            <TransactionBreakdown />
          </Flex>

          <Flex flexGrow={4} width6="70%">
            <TopPerforminBanks />
          </Flex>
          <Flex flexGrow={1} width="25%">
            <TopTransactionMetric />
          </Flex>
        </Flex>
    )
}

export default Dashboard