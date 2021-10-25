import { Flex, Text } from "@chakra-ui/layout"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import React from "react"
import { DropdownSearchFilter, ServiceStatus, SuccessRate, TerminalsPerformance, TerminalsUnderWatch, TopPerforminBanks, TopTransactionMetric } from "../component"
import { AuthenticatedLayout } from "../component/layouts"
import { Banks, links } from "../constants"
import { AuthGuard } from "../lib"

const Dashboard = () => {
  return (
    <AuthenticatedLayout pageHeader={ 
      <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
        <Text variant="page-header" size="page-header">User Dashboard</Text>
        <Flex alignItems="center">
        <DropdownSearchFilter data={

          [
            { label: "All", value: "All", selected: true },
            ...Banks.map((x, i) => ({ label: x, value: x, selected: false }))
          ]
        } />
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
    </AuthenticatedLayout>
  )
}

// checks for exixsting coookie session to redirect to the correct page
export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  return AuthGuard({ req, res })

}
export default Dashboard