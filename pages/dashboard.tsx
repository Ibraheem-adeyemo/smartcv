import { Flex, Text } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/react"
import dynamic from 'next/dynamic'
import React, { useMemo } from "react"
import { CustomFilter, DropdownSearchFilter, } from "../component/stats"
import { Authenticated } from "../component/layouts"
import { Banks, channels, ChannelsEnum } from "../constants"
import { SkeletonLoader } from "../component"
import { StatsProvider } from "../provider"
const TerminalsPerformance = dynamic(() => import('../component/stats/terminals-performance'))
const SuccessRate = dynamic(() => import('../component/stats/success-rate'))
const ServiceStatus = dynamic(() => import('../component/stats/service-status'))
const TerminalsUnderWatch = dynamic(() => import('../component/stats/terminals-under-watch'))
const TopPerforminBanks = dynamic(() => import('../component/stats/top-performing-banks'))
const TopTransactionMetric = dynamic(() => import('../component/stats/top-transaction-metric'))
const TransactionBreakdown = dynamic(() => import('../component/stats/transaction-breakdown'))
const TransactionMetric = dynamic(() => import('../component/stats/transaction-metric'))
const UsageMetric = dynamic(() => import('../component/stats/usage-metric'))
const InstitutionFilter = dynamic(() => import('../component/stats/institution-filter'))
const ChannelFilter = dynamic(() => import('../component/stats/channel-filter'))

const Dashboard = () => {
  const Filter = useMemo(() => DropdownSearchFilter, [])
  return (
    <StatsProvider>
      <Authenticated pageHeader={
        <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
          <Text variant="page-header" size="page-header">User Dashboard</Text>
          <Flex alignItems="center" gridGap="17px">
            <InstitutionFilter />
            <ChannelFilter />
            <Tag><Text variant="dropdown-text-header" size="tag-text">Today</Text></Tag>
            <Tag><Text size="tag-text">This week</Text></Tag>
            <Tag><Text size="tag-text">This month</Text></Tag>
            <CustomFilter />
          </Flex>
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
