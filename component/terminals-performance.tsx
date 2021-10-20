import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useCallback } from "react"
import { StatCard } from "."
import { Icons } from "../contants/icon-constants";
import { StatsA } from "../models/stats-models";
import { BsArrowUpCircle } from "react-icons/bs";


export default function TerminalsPerformance(props: any) {


  const getStats = useCallback(() => (
    [{
      headerName: "ATM Count",
      totalNumber: 1200,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days"
    }, {
      headerName: "ATM Dispensing",
      totalNumber: 800,
      status: "green",
      percentage: "6.0%",
      days: "Last 7 days"
    }, {
      headerName: "Not Dispensing",
      totalNumber: 120,
      status: "red",
      percentage: "6.0%",
      days: "Last 7 days"
    },]
  ), [])
  const stat = (x: StatsA) => (
    <Flex w="224px" h="159px" bgColor="brand.stat_card" __css={{
      ":last-child": {
        marginX:0
      },
      ":first-child": {
        marginX:0
      },
    }} mx="17px">
      <Flex mt="13px" ml="19px" mb="18px" mr="65.36" flexDir="column" >
        <Text variant="stat-header" >
          {x.headerName}
        </Text>
        <Flex mt="auto" flexDir="column">
        <Flex color="#353F50" flexDir="column">
          <Text fontWeight="400" fontSize="13px">
            Total Number
          </Text>
          <Text fontWeight="800" fontSize="36px">
            {x.totalNumber}
          </Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between">
          <Icon as={BsArrowUpCircle} fill={x.status} />
          <Text fontSize="13px">
            {x.percentage}
          </Text>
          <Text fontSize="11px" color="brand.muted">
            {x.days}
          </Text>
          <Icon as={BsArrowUpCircle} fill={"green"} />
        </Flex>
        
        </Flex>
      </Flex>
    </Flex>)

  return (<StatCard<StatsA> getStats={getStats} topic="How are terminals performance" statsComponent={stat} />)
}