import { Flex } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { FC, useContext, useEffect, useMemo } from "react"
import { appRoles, filterDates } from "../../constants"
import { AuthContext, StatsContext } from "../../providers"
import { dashboardContainerSX } from "../../sx"

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
    const {userDetail} = useContext(AuthContext)
    const {toggleDate, selectedTenantCode} = useContext(StatsContext)
    let isTenantLoaded = false
    if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
      isTenantLoaded = true
    }
    useEffect(() => {
        toggleDate(filterDates.today)
    },[])
    return(
        
        <Flex sx={dashboardContainerSX} >
          <Flex>
            <TerminalsPerformance showDetails />
          </Flex>
          {/* <Flex flexGrow={1} w="25%">
            <SuccessRate />
          </Flex> */}
          <Flex >
            <ServiceStatus showDetails />
          </Flex>
          <Flex >
            <TerminalsUnderWatch showDetails />
          </Flex>
          <Flex>
            <TransactionMetric />
          </Flex>
          {isTenantLoaded &&<Flex>
            <UsageMetric />
          </Flex>}
          <Flex>
            <TransactionBreakdown />
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