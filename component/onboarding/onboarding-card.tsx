import { Flex } from "@chakra-ui/layout";
import { Props } from "framer-motion/types/types";
import { AppProps } from "next/app";
import React, { ComponentProps, ReactNode, useCallback, useMemo } from "react";

interface OnboardingCardProps{
    cardTitle: JSX.Element | JSX.Element[],
    cardFooter: JSX.Element | JSX.Element[],
    children: JSX.Element
}

export default function OnboardingCard(props:OnboardingCardProps) {
    const cardTitle = useMemo(() =>  props.cardTitle,[])
    const cardFooter = useMemo(() =>  props.cardFooter,[])
    return(
         <Flex px="49px" py="30px" gridGap="25px" bgColor="white" flexDir="column" >
             <Flex>{cardTitle}</Flex>
             {props.children}
             <Flex>{cardFooter}</Flex>
        </Flex>
    )
}