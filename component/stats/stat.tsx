import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { StatProps } from "../../models";

export default function Stat(props: StatProps) {
  return (
    <Flex flexGrow={1} h={props.height} bgColor="brand.stat_card">
      <Flex mt="13px" ml="19px" mb="18px" mr="65.36" gridGap="16px" flexDir="column" h="89%" >
        <Text variant="stat-header" size="stat-header" >
          {props.headerName}
        </Text>
        <Flex mt="auto" flexDir="column">
          <Flex color="#353F50" flexDir="column">
            <Text fontWeight="400" fontSize="13px">
              Total Number
            </Text>
            <Text fontWeight="800" fontSize="36px">
              {props.totalNumber}
            </Text>
          </Flex>
          <Flex w="100%" justifyContent="flex-start" gridGap="6.4px" >
            <Icon as={BsArrowUpCircle} fill={props.status} flexGrow={1} />
            <Text fontSize="13px" flexGrow={2}>
              {props.percentage}
            </Text>
            <Text fontSize="11px" color="brand.muted" flexGrow={3}>
              {props.days}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}