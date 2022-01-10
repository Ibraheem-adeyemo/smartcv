import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { ComponentWithChildren } from "../../models";

interface AppCardProps extends ComponentWithChildren  {
    topic: string|JSX.Element
}

const AppCard: FC<AppCardProps> = (props: AppCardProps) => {
    return (
        <Flex flexDir="column" bg="brand.white" px="19px" py="15px" w="100%" gridGap="16px" borderRadius="8px" >
            <Box w="100%">{props.topic}</Box>
            <Flex gridGap="19px">
                {props.children}
            </Flex>
        </Flex>)
}

export default AppCard