import { Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { appear, delayChildren } from "../../animations";
import { shortenNumber } from "../../lib";
import { StatProps } from "../../models";
import { statsContainerBodySX, statsContainerSX, statsTotalNumberTextSX, statsTotalNumberValueSX } from "../../sx";
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
    <MotionFlex sx={statsContainerSX(props)} animate="show" initial="hide" variants={appear()}>
      <MotionFlex sx={statsContainerBodySX} animate="show" initial="hide" variants={delayChildren}>
         <AnimatedText variant="stat-header" size="stat-header" >
          {props.headerName}
        </AnimatedText>
        <Flex mt="auto" flexDir="column">
          <Flex color="#353F50" flexDir="column">
            <AnimatedText sx={statsTotalNumberTextSX}>
              Total Number
            </AnimatedText>
            <AnimatedText sx={statsTotalNumberValueSX}>
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