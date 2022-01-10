import { Flex } from "@chakra-ui/react";
import React, { FC } from "react"
import _ from "lodash";
import { ServiceStatus, TerminalsUnderWatch } from "../dashboard";

const ChannelsMonitoringStats:FC = () => {

  return (
    <Flex gridGap="20px" flexWrap="wrap">
      <Flex flexGrow={1} width="35%">
        <ServiceStatus />
      </Flex>
      <Flex flexGrow={3}>
        <TerminalsUnderWatch />
      </Flex>
    </Flex>
  )
}

export default  ChannelsMonitoringStats