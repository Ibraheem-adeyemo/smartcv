import { Flex, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import dynamic from 'next/dynamic'
import React, { useContext } from "react"
import { DashboardPage } from "../src/component/dashboard"
import { Authenticated } from "../src/component/layouts"
import { filtersToShowDefaultValue } from "../src/constants"
import { StatsProvider } from "../src/providers"
import { StatsContext } from "../src/providers/stats-provider"
const AppBarFilter = dynamic(() => import('../src/component/stats/app-bar-filter'), {ssr:false})

const Dashboard:NextPage = () => {
  const {setFiltersToShow} = useContext(StatsContext)
  setFiltersToShow(filtersToShowDefaultValue)
  return (
    <StatsProvider>
      <Authenticated pageHeader={
        <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
          <Text variant="page-header" size="page-header">User Dashboard</Text>
          <AppBarFilter />
        </Flex>
      }>
        <DashboardPage />
      </Authenticated>
    </StatsProvider>
  )
}
export default Dashboard
