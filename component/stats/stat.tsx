import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { StatProps } from "../../models";

export default function Stat(props: StatProps) {
  return (
    <Flex w={props.width} h={props.height} bgColor="brand.stat_card" __css={{
      ":last-child": {
        marginX: 0
      },
    }} mr="40px" mt="17px">
      <Flex mt="13px" ml="19px" mb="18px" mr="65.36" flexDir="column" h="89%" >
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
          <Flex w="100%" justifyContent="space-between">
            <Icon as={BsArrowUpCircle} fill={props.status} />
            <Text fontSize="13px">
              {props.percentage}
            </Text>
            <Text fontSize="11px" color="brand.muted">
              {props.days}
            </Text>
            <Icon as={BsArrowUpCircle} fill={"green"} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}