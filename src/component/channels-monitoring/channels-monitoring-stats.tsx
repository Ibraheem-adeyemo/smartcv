import { Flex } from "@chakra-ui/react";
import React, { FC } from "react"
import _ from "lodash";
import { ServiceStatus, TerminalsUnderWatch } from "../dashboard";
import { formControlInputSX } from "../../sx";

const ChannelsMonitoringStats:FC = () => {

  return (
    <Flex gap="20px" flexWrap="wrap">
      <Flex sx={formControlInputSX}>
        <ServiceStatus width={"100%"} />
      </Flex>
      <Flex flexGrow={3}>
        <TerminalsUnderWatch />
      </Flex>
    </Flex>
  )
}

export default  ChannelsMonitoringStats