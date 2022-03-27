import { Flex } from "@chakra-ui/react";
import React, { FC } from "react"
import _ from "lodash";
import { ServiceStatus, TerminalsUnderWatch } from "../dashboard";
import { formControlInputSX } from "../../sx";

const ChannelsMonitoringStats:FC = () => {

  return (
    <Flex gap="20px" flexWrap="wrap">
      <Flex sx={formControlInputSX}>
        <ServiceStatus
          width={["200px", "200px", "200px", "220px", "220px", "250px"]}
          height={["224px", "224px", "224px", "224px", "229px", "229px"]} />
      </Flex>
      <Flex flexGrow={3}>
        <TerminalsUnderWatch
          width={["224px", "224px", "224px", "224px", "229px", "229px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]} />
      </Flex>
    </Flex>
  )
}

export default  ChannelsMonitoringStats