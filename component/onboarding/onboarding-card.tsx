import { Flex } from "@chakra-ui/layout";
import React, { useMemo } from "react";

interface OnboardingCardProps{
    cardTitle: JSX.Element | JSX.Element[] | string,
    cardFooter: JSX.Element | JSX.Element[],
    children: JSX.Element
}

export default function OnboardingCard(props:OnboardingCardProps) {
    const cardTitle = useMemo(() =>  props.cardTitle,[])
    return(
         <Flex px="49px" py="30px" gridGap="25px" bgColor="white" flexDir="column" w="100%" >
             <Flex>{cardTitle}</Flex>
             {props.children}
             <Flex>{props.cardFooter}</Flex>
        </Flex>
    )
}