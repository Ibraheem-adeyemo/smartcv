import { Flex, VStack, Text, Box } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import _ from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { apiUrlsv1, AvatarIcon, CapitolIcon, cookieKeys, UserManagementStatsName } from "../../constants";
import { getCookie } from "../../lib";
import { ISWAdminView, Paginate, TenantAdminView, TenantView, UserManagementStat } from "../../models";
import { AppCard } from "../app";
import SkeletonLoader from "../skeleton-loader";

const UserManagementStats:FC = () => {
    // const { data: userManagementStats, mutate, error } = useSWR<UserManagementStat[]>('/api/get-user-management-stats')

    const { data: iswAdmin, mutate: _mutateISWAdmin, error: iswAdminError } = useSWR<Paginate<ISWAdminView>>(typeof document !== "undefined" && getCookie(cookieKeys.totalISWAdmin) !== "" ? null : apiUrlsv1.iswAdmin)
    const { data: tenantAdmin, mutate: _mutateTenantAdmin, error: tenantAdminError } = useSWR<Paginate<TenantAdminView>>(typeof document !== "undefined" && getCookie(cookieKeys.totalTenantAdmin) !== "" ? null : apiUrlsv1.tenantAdmin)
    const { data: tenant, mutate: _mutateTenantView, error: tenantError } = useSWR<TenantView[]>(typeof document !== "undefined" && getCookie(cookieKeys.totalTenant) !== "" ? null : apiUrlsv1.tenant)
    const [userManagementStats, setUserManagementStats] = useState<UserManagementStat[]>([{
        name: UserManagementStatsName.createdBanks,
        totalCount: getCookie(cookieKeys.totalTenant)
    }, {
        name: UserManagementStatsName.tenantAdminUser,
        totalCount: getCookie(cookieKeys.totalTenantAdmin)
    }, {
        name: UserManagementStatsName.iSWAdminUser,
        totalCount: getCookie(cookieKeys.totalISWAdmin)
    }])


    const GetStateIcon = useCallback(({ statName }: { statName: string }) => {
        switch (statName) {
            case UserManagementStatsName.tenantAdminUser:

                return <AvatarIcon fontSize="20px" />
            case UserManagementStatsName.createdBanks:

                return <CapitolIcon fontSize="20px" />
            case UserManagementStatsName.iSWAdminUser:

                return <CapitolIcon fontSize="20px" />

            default:
                return <></>
        }
    }, [])

    useEffect(() => {
        // console.log({tenant, tenantError, tenantAdmin, tenantAdminError, iswAdmin, iswAdminError})
        // console.log({tenantV:getCookie(cookieKeys.totalTenant) !== "" ? getCookie(cookieKeys.totalTenant) : typeof tenant === "undefined" && typeof tenantError === "undefined" ? "" : typeof tenant !== "undefined" && typeof tenantError === "undefined" ? `${tenant?.length}` : "0"})
        // console.log({tenantAdminV:getCookie(cookieKeys.totalTenantAdmin) !== "" ? getCookie(cookieKeys.totalTenantAdmin) : typeof tenantAdmin === "undefined" && typeof tenantAdminError === "undefined" ? "" : typeof tenantAdmin !== "undefined" && typeof tenantAdminError === "undefined" ? `${tenantAdmin?.totalElements}` : "0"})
        // console.log({iswAdminV:getCookie(cookieKeys.totalISWAdmin) !== "" ? getCookie(cookieKeys.totalISWAdmin) : (typeof iswAdmin === "undefined" && typeof iswAdminError === "undefined") ? "" : (typeof iswAdmin !== "undefined" && typeof iswAdminError === "undefined") ? `${iswAdmin?.totalElements}` : "0"})
        setUserManagementStats([{
            name: UserManagementStatsName.createdBanks,
            totalCount: typeof document !== "undefined" && getCookie(cookieKeys.totalTenant) !== "" ? getCookie(cookieKeys.totalTenant) : typeof tenant === "undefined" && typeof tenantError === "undefined" ? "" : typeof tenant !== "undefined" && typeof tenantError === "undefined" ? `${tenant?.length}` : "0"
        }, {
            name: UserManagementStatsName.tenantAdminUser,
            totalCount: typeof document !== "undefined" && getCookie(cookieKeys.totalTenantAdmin) !== "" ? getCookie(cookieKeys.totalTenantAdmin) : typeof tenantAdmin === "undefined" && typeof tenantAdminError === "undefined" ? "" : typeof tenantAdmin !== "undefined" && typeof tenantAdminError === "undefined" ? `${tenantAdmin?.totalElements}` : "0"
        }, {
            name: UserManagementStatsName.iSWAdminUser,
            totalCount: typeof document !== "undefined" && getCookie(cookieKeys.totalISWAdmin) !== "" ? getCookie(cookieKeys.totalISWAdmin) : (typeof iswAdmin === "undefined" && typeof iswAdminError === "undefined") ? "" : (typeof iswAdmin !== "undefined" && typeof iswAdminError === "undefined") ? `${iswAdmin?.totalElements}` : "0"
        }])
    }, [tenant, tenantError, tenantAdmin, tenantAdminError, iswAdmin, iswAdminError])

    return (
        <AppCard topic="">
            <>
                {_.some(userManagementStats, (stat: UserManagementStat) => stat.totalCount === "") ? <SkeletonLoader rows={3} columns={3} width="200" height="10px" gridGap="30px" /> :
                    _.map(userManagementStats, (x, i) => <Flex key={i} p="19px" bgColor="brand.muted-background" flexGrow={1} gridGap="15px">
                        <Flex justifyContent="space-between" w="100%">
                            <VStack spacing="14.5px">
                                <Text variant="stat-header" size="stat-header">{x.name}</Text>
                                <VStack spacing="7px">
                                    <Text fontWeight="400" fontSize="13px">Total Number</Text>
                                    <Text fontWeight="600" fontSize="36px">{x.totalCount}</Text>
                                </VStack>
                            </VStack>
                            <Box>
                                <Badge px="10px" bgColor="brand.primary-blue" color="white" borderRadius="5px" >
                                    <GetStateIcon statName={x.name} />
                                </Badge>
                            </Box>
                        </Flex>
                    </Flex >)

                }
            </>
        </AppCard >
    )
}

export default UserManagementStats