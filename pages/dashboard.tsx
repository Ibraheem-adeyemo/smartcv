import { Flex, Text } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/react"
import { NextApiRequest, NextApiResponse } from "next"
import dynamic from 'next/dynamic'
import React, { useMemo } from "react"
import { CustomFilter, DropdownSearchFilter, } from "../component/stats"
import { Authenticated } from "../component/layouts"
import { Banks, ChannelsEnum } from "../constants"
const TerminalsPerformance = dynamic(() => import('../component/stats/terminals-performance'))
const SuccessRate = dynamic(() => import('../component/stats/success-rate'))
const ServiceStatus = dynamic(() => import('../component/stats/service-status'))
const TerminalsUnderWatch = dynamic(() => import('../component/stats/terminals-under-watch'))
const TopPerforminBanks = dynamic(() => import('../component/stats/top-performing-banks'))
const TopTransactionMetric = dynamic(() => import('../component/stats/top-transaction-metric'))

const Dashboard = () => {
  const Filter = useMemo(() => DropdownSearchFilter, [])
  return (
    <Authenticated pageHeader={
      <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
        <Text variant="page-header" size="page-header">User Dashboard</Text>
        <Flex alignItems="center" gridGap="17px">
          <Filter data={

            [
              { label: "All", value: "All", selected: true },
              ...Banks.map((x, i) => ({ label: x, value: x, selected: false }))
            ]
          } label="Institution" />
          <Filter data={
            Object.keys(ChannelsEnum)
          } label="Channel" />

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
        <Flex>
          <ServiceStatus />
        </Flex>
        <Flex flexGrow={3}>
          <TerminalsUnderWatch />
        </Flex>
        <Flex flexGrow={4} width6="70%">
          <TopPerforminBanks />
        </Flex>
        <Flex flexGrow={1} width="25%">
          <TopTransactionMetric />
        </Flex>
      </Flex>
    </Authenticated>
  )
}
export default Dashboard
