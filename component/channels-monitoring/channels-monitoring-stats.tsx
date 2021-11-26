import { Flex } from "@chakra-ui/layout";
import React, { } from "react"
import _ from "lodash";
import dynamic from "next/dynamic";
import { ServiceStatus, TerminalsUnderWatch } from "../dashboard";

export default function ChannelsMonitoringStats(_props: any) {

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