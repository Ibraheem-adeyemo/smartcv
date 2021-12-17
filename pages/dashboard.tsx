import { Flex, Text } from "@chakra-ui/layout"
import { NextPage } from "next"
import dynamic from 'next/dynamic'
import React from "react"
import { Authenticated } from "../component/layouts"
import { StatsProvider } from "../provider"
const TerminalsPerformance = dynamic(() => import('../component/dashboard/terminals-performance'))
const SuccessRate = dynamic(() => import('../component/dashboard/success-rate'))
const ServiceStatus = dynamic(() => import('../component/dashboard/service-status'))
const TerminalsUnderWatch = dynamic(() => import('../component/dashboard/terminals-under-watch'))
const TopPerforminBanks = dynamic(() => import('../component/dashboard/top-performing-banks'))
const TopTransactionMetric = dynamic(() => import('../component/dashboard/top-transaction-metric'))
const TransactionBreakdown = dynamic(() => import('../component/dashboard/transaction-breakdown'))
const TransactionMetric = dynamic(() => import('../component/dashboard/transaction-metric'))
const UsageMetric = dynamic(() => import('../component/dashboard/usage-metric'))
const AppBarFilter = dynamic(() => import('../component/stats/app-bar-filter'))

const Dashboard:NextPage = () => {
  return (
    <StatsProvider>
      <Authenticated pageHeader={
        <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
          <Text variant="page-header" size="page-header">User Dashboard</Text>
          <AppBarFilter />
        </Flex>
      }>
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
      </Authenticated>
    </StatsProvider>
  )
}
export default Dashboard
