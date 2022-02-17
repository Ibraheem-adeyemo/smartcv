import { Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { shortenNumber } from "../../lib";
import { StatProps } from "../../models";

const Stat:FC<StatProps> = (props: StatProps) => {
  let val = props.prefix === "N" && props.totalNumber === 0 ?`${props.totalNumber}.00`:`${props.totalNumber}`
  if(val.length > 5){
     const shortenedVal = shortenNumber(props.totalNumber)
     if(shortenedVal.fractionAmount !== Number.MAX_VALUE) {
       val = `${shortenedVal.fractionAmount}${shortenedVal.abbrev}`
     }
  }
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
              {props.prefix}{val}{props.suffix}
            </Text>
          </Flex>
          {/* <Flex w="100%" justifyContent="flex-start" gridGap="6.4px" >
            <Icon as={BsArrowUpCircle} fill={props.status} flexGrow={1} />
            <Text fontSize="13px" flexGrow={2}>
              {props.percentage}
            </Text>
            <Text fontSize="11px" color="brand.muted" flexGrow={3}>
              {props.days}
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Stat