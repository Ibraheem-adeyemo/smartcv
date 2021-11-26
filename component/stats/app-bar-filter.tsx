import { Flex, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { InstitutionFilter, ChannelFilter, CustomFilter } from ".";

export default function AppBarFilter(_props: any) {
    return (
        <Flex alignItems="center" gridGap="17px">
            <InstitutionFilter />
            <ChannelFilter />
            <Tag><Text variant="dropdown-text-header" size="tag-text">Today</Text></Tag>
            <Tag><Text size="tag-text">This week</Text></Tag>
            <Tag><Text size="tag-text">This month</Text></Tag>
            <CustomFilter />
        </Flex>
    )
}