import { Flex } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { FC, useContext, useEffect, useMemo } from "react"
import { appRoles, filterDates } from "../../constants"
import { AuthContext, StatsContext } from "../../providers"
import { dashboardContainerSX } from "../../sx"

const TerminalsPerformance = dynamic(() => import('./terminals-performance'), { ssr: false })
const SuccessRate = dynamic(() => import('./success-rate'), { ssr: false })
const ServiceStatus = dynamic(() => import('./service-status'), { ssr: false })
const TerminalsUnderWatch = dynamic(() => import('./terminals-under-watch'), { ssr: false })
const TopPerforminBanks = dynamic(() => import('./top-performing-banks'), { ssr: false })
const TopTransactionMetric = dynamic(() => import('./top-transaction-metric'), { ssr: false })
const TransactionBreakdown = dynamic(() => import('./transaction-breakdown'), { ssr: false })
const TransactionMetric = dynamic(() => import('./transaction-metric'), { ssr: false })
const UsageMetric = dynamic(() => import('./usage-metric'), { ssr: false })
const Dashboard: FC = () => {
  const { userDetail } = useContext(AuthContext)
  const { selectedTenantCode, setFiltersToShow } = useContext(StatsContext)
  let isTenantLoaded = false
  if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
    isTenantLoaded = true
  }
  useEffect(() => {
    setFiltersToShow({ showTenantFilter: true, showCountIntervalFilter: true, showDurationFilter: true, showEndDateFilter: true, showStartDateFilter: true })
  }, [])
  return (

    <Flex sx={dashboardContainerSX} >
      <Flex>
        <TerminalsPerformance showDetails
          width={["224px", "224px", "224px", "224px", "300px", "400px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]} />
      </Flex>
      <Flex>
        <SuccessRate
          width={["261px", "261px", "261px", "261px", "350px", "390px"]}
          height={["159px", "159px", "159px", "159px", "159px", "159px"]} />
      </Flex>
      <Flex >
        <ServiceStatus
          showDetails
          width={["200px", "200px", "200px", "220px", "220px", "250px"]}
          height={["224px", "224px", "224px", "224px", "229px", "229px"]} />
      </Flex>
      <Flex >
        <TerminalsUnderWatch
          showDetails
          width={["224px", "224px", "224px", "224px", "229px", "229px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]} />
      </Flex>
      <Flex>
        <TransactionMetric
          width={["224px", "224px", "224px", "224px", "229px", "229px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]} />
      </Flex>
      <Flex>
        <UsageMetric
          width={["224px", "224px", "224px", "224px", "229px", "229px"]}
          height={["159px", "159px", "159px", "159px", "159px", "189px"]} />
      </Flex>
      <Flex>
        <TransactionBreakdown
          width={["224px", "224px", "224px", "230px", "250px", "320px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]} />
      </Flex>

      {/* <Flex flexGrow={4} width6="70%">
            <TopPerforminBanks />
          </Flex> */}
      {/* <Flex flexGrow={1} width="25%">
            <TopTransactionMetric />
          </Flex> */}
    </Flex>
  )
}

export default Dashboard