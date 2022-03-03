import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { ChannelsMonitoringTabs } from "../src/component/channels-monitoring";
import ChannelsMonitoringSearch from "../src/component/channels-monitoring/channels-monitoring-search.";
import { Authenticated } from "../src/component/layouts";
import { filtersToShowDefaultValue } from "../src/constants";
import { ChannelsMonitoringProvider, StatsProvider } from "../src/providers";
import { StatsContext } from "../src/providers/stats-provider";

const AppBarFilter = dynamic(() => import("../src/component/stats/app-bar-filter"), { ssr: false })
const ChannelsMonitoringStats = dynamic(() => import("../src/component/channels-monitoring/channels-monitoring-stats"), { ssr: false })
const ChannelsMonitoringTable = dynamic(() => import("../src/component/channels-monitoring/channels-monitoring-table"), { ssr: false })
const ChannelsMonitoring: NextPage = () => {
    const { setFiltersToShow } = useContext(StatsContext)
    setFiltersToShow(filtersToShowDefaultValue)
    return (
        <ChannelsMonitoringProvider>
            <StatsProvider>
                <Authenticated pageHeader={
                    <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
                        <Text variant="page-header" size="page-header">Channels Monitoring</Text>
                    </Flex>
                }>
                    <Flex flexDir="column" gridGap="40px">
                        <Flex flexDir="column" gridGap="33px">
                            <ChannelsMonitoringSearch />
                            <ChannelsMonitoringStats />
                        </Flex>
                        <ChannelsMonitoringTabs />
                        <ChannelsMonitoringTable />
                    </Flex>
                </Authenticated>
            </StatsProvider>
        </ChannelsMonitoringProvider>
    )
}

export default ChannelsMonitoring