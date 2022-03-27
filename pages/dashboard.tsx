import { Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import dynamic from 'next/dynamic'
import React, { useContext, useEffect } from "react"
import { Dashboard as DashboardPage  } from "../src/component/dashboard"
import { AnimatedText } from "../src/component/framer"
import { Authenticated } from "../src/component/layouts"
import { filtersToShowDefaultValue } from "../src/constants"
import { StatsProvider, StatsContext } from "../src/providers"
const AppBarFilter = dynamic(() => import('../src/component/stats/app-bar-filter'), {ssr:false})

const Dashboard:NextPage = () => {
  return (
    <StatsProvider>
      <Authenticated pageHeader={
        <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
          <AnimatedText variant="page-header" size="page-header">User Dashboard</AnimatedText>
          <AppBarFilter  />
        </Flex>
      }>
        <DashboardPage />
      </Authenticated>
    </StatsProvider>
  )
}
export default Dashboard
