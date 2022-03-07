import { Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { shortenNumber } from "../../lib";
import { StatProps } from "../../models";
import { AnimatedText, MotionFlex } from "../framer";

const Stat:FC<StatProps> = (props: StatProps) => {
  let val = props.prefix === "N" && props.totalNumber === 0 ?`${props.totalNumber}.00`:`${props.totalNumber}`
  if(val.length > 5){
     const shortenedVal = shortenNumber(props.totalNumber)
     if(shortenedVal.fractionAmount !== Number.MAX_VALUE) {
       val = `${shortenedVal.fractionAmount}${shortenedVal.abbrev}`
     }
  }
  return (
    <MotionFlex flexGrow={1} h={props.height} bgColor="brand.stat_card" animate="show" initial="hide" variants={{
      show: {
        opacity: 1,
        transition: {
          duration: 0.4
        }
      },
      hide: {
        opacity: 0,
      }
    }}>
      <MotionFlex mt="13px" ml="19px" mb="18px" mr="65.36" gap="16px" flexDir="column" h="89%" animate="show" initial="hide" variants={{
      show: {
        opacity: 1,
        transition: {
          duration: 0.4,
          delayChildren: 0.4
        }
      },
      hide: {
        opacity: 0,
      }
    }}>
         <AnimatedText variant="stat-header" size="stat-header" >
          {props.headerName}
        </AnimatedText>
        <Flex mt="auto" flexDir="column">
          <Flex color="#353F50" flexDir="column">
            <AnimatedText fontWeight="400" fontSize="13px">
              Total Number
            </AnimatedText>
            <AnimatedText fontWeight="800" fontSize="36px">
              {props.prefix}{val}{props.suffix}
            </AnimatedText>
          </Flex>
          {/* <Flex w="100%" justifyContent="flex-start" gap="6.4px" >
            <Icon as={BsArrowUpCircle} fill={props.status} flexGrow={1} />
            <Text fontSize="13px" flexGrow={2}>
              {props.percentage}
            </Text>
            <Text fontSize="11px" color="brand.muted" flexGrow={3}>
              {props.days}
            </Text>
          </Flex> */}
        </Flex>
      </MotionFlex>
    </MotionFlex>
  )
}

export default Stat