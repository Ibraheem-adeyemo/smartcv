import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import { ChannelsMonitoring as ChannelsMonitoringComponent } from "../src/component/channels-monitoring";
import { Authenticated } from "../src/component/layouts";
import { filtersToShowDefaultValue } from "../src/constants";
import { ChannelsMonitoringProvider, StatsProvider } from "../src/providers";
import { StatsContext } from "../src/providers";
const ChannelsMonitoring: NextPage = () => {
    return (
        <ChannelsMonitoringProvider>
            <StatsProvider>
                <Authenticated pageHeader={
                    <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
                        <Text variant="page-header" size="page-header">Channels Monitoring</Text>
                    </Flex>
                }>
                    <ChannelsMonitoringComponent />
                </Authenticated>
            </StatsProvider>
        </ChannelsMonitoringProvider>
    )
}

export default ChannelsMonitoring