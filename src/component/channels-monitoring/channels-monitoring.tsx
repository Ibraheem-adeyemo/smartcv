import { Flex } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { FC, useContext, useEffect } from "react"
import { ChannelsMonitoringSearch, ChannelsMonitoringTabs } from "."
import { filtersToShowDefaultValue } from "../../constants"
import { StatsContext } from "../../providers"

const ChannelsMonitoringStats = dynamic(() => import("./channels-monitoring-stats"), { ssr: false })
const ChannelsMonitoringTable = dynamic(() => import("./channels-monitoring-table"), { ssr: false })
const ChanngelsMonitoring:FC = () => {
    const { setFiltersToShow } = useContext(StatsContext)
    useEffect(() => {
        setFiltersToShow({showTenantFilter: true})
    }, [])
    return (
        <Flex flexDir="column" gap="40px">
            <Flex flexDir="column" gap="33px">
                <ChannelsMonitoringSearch />
                <ChannelsMonitoringStats />
            </Flex>
            <ChannelsMonitoringTabs />
            <AnimatePresence>
                <ChannelsMonitoringTable />
            </AnimatePresence>
        </Flex>
    )
}

export default ChanngelsMonitoring