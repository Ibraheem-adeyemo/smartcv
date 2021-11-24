import { Flex, HStack, VStack, Text } from "@chakra-ui/layout";
import { Badge } from "@chakra-ui/react";
import React, { useCallback } from "react";
import useSWR from "swr";
import { AvatarIcon, CapitolIcon, UserManagementStatsName } from "../../constants";
import { UserManagementStat } from "../../models";
import {AppCard} from "../app";

export default function UserManagementStats(_props: any) {
    // const { data: userManagementStats, mutate, error } = useSWR<UserManagementStat[]>('/api/get-user-management-stats')
    const userManagementStats = [] as UserManagementStat[]
    let error;
    const GetStateIcon = useCallback(({ statName }: { statName: string }) => {
        switch (statName) {
            case UserManagementStatsName.tenantAdminUser:

                return <AvatarIcon />
            case UserManagementStatsName.createdBanks:

                return <CapitolIcon />
            case UserManagementStatsName.iSWAdminUser:

                return <CapitolIcon />

            default:
                return <></>
        }
    }, [])
    return (
        <AppCard topic="">
            <>
            {typeof userManagementStats !== "undefined" && typeof error === "undefined" &&
                userManagementStats.map((x, i) => <Flex key={i} p="19px" bgColor="brand.muted-background" flexGrow={1} gridGap="15px">
                    <HStack justifyContent="space-between">
                        <VStack spacing="14.5px">
                            <Text>{x.name}</Text>
                            <VStack spacing="7px">
                                <Text>Total Number</Text>
                                <Text>{x.totalCount}</Text>
                            </VStack>
                        </VStack>
                        <Badge>
                            <GetStateIcon statName={x.name} />
                        </Badge>
                    </HStack>
                </Flex >)

            }</>
        </AppCard >
    )
}