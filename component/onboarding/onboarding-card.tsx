import { Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ComponentWithChildren } from "../../models";

interface OnboardingCardProps extends ComponentWithChildren {
    cardTitle: JSX.Element | JSX.Element[] | string,
    cardFooter: JSX.Element | JSX.Element[]
}
const  OnboardingCard:React.FC<OnboardingCardProps> = (props:OnboardingCardProps) => {
    const cardTitle = useMemo(() =>  props.cardTitle,[])
    return(
         <Flex px="49px" py="30px" gridGap="25px" bgColor="white" flexDir="column" w="100%" >
             <Flex>{cardTitle}</Flex>
             {props.children}
             <Flex>{props.cardFooter}</Flex>
        </Flex>
    )
}

export default  OnboardingCard