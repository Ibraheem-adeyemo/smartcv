import { Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { FC } from "react";
import ChannelsMonitoringSearch from "../component/channels-monitoring/channels-monitoring-search.";
import { Authenticated } from "../component/layouts";
import { StatsProvider } from "../provider";

const AppBarFilter = dynamic(() => import("../component/stats/app-bar-filter"))
const ChannelsMonitoringStats = dynamic(() => import("../component/channels-monitoring/channels-monitoring-stats"))
const ChannelsMonitoringTable = dynamic(() => import("../component/channels-monitoring/channels-monitoring-table"))
const ChannelsMonitoring:FC = () => {

    return (
        <StatsProvider>
            <Authenticated pageHeader={
                <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
                    <Text variant="page-header" size="page-header">Channels Monitoring</Text>
                </Flex>
            }>
                <Flex flexDir="column" gridGap="40px">
                    <Flex flexDir="column" gridGap="33px">
                        <Flex justifyContent="space-between">
                            <AppBarFilter />
                            <ChannelsMonitoringSearch />
                        </Flex>
                        <ChannelsMonitoringStats />
                    </Flex>
                    <ChannelsMonitoringTable />
                </Flex>
            </Authenticated>
        </StatsProvider>
    )
}

export default ChannelsMonitoring