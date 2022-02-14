import { Flex } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { FC, useContext, useEffect, useMemo } from "react"
import { filterDates } from "../../constants"
import { StatsContext } from "../../provider/stats-provider"

const TerminalsPerformance = dynamic(() => import('./terminals-performance'), {ssr:false})
const SuccessRate = dynamic(() => import('./success-rate'), {ssr:false})
const ServiceStatus = dynamic(() => import('./service-status'), {ssr:false})
const TerminalsUnderWatch = dynamic(() => import('./terminals-under-watch'), {ssr:false})
const TopPerforminBanks = dynamic(() => import('./top-performing-banks'), {ssr:false})
const TopTransactionMetric = dynamic(() => import('./top-transaction-metric'), {ssr:false})
const TransactionBreakdown = dynamic(() => import('./transaction-breakdown'), {ssr:false})
const TransactionMetric = dynamic(() => import('./transaction-metric'), {ssr:false})
const UsageMetric = dynamic(() => import('./usage-metric'), {ssr:false})
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