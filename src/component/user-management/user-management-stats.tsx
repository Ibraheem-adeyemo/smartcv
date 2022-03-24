import { Flex, VStack, Text, Box, Badge } from "@chakra-ui/react";
import _ from "lodash";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { apiUrlsv1, AvatarIcon, CapitolIcon, cookieKeys, StatsName } from "../../constants";
import { getCookie } from "../../lib";
import { ISWAdminView, ISWAdmView, Paginate, TenantAdminView, TenantView, UserManagementStat } from "../../models";
import { AuthContext } from "../../providers";
import { AppCard } from "../app";
import SkeletonLoader from "../skeleton-loader";

const UserManagementStats: FC = () => {
    // const { data: userManagementStats, mutate, error } = useSWR<UserManagementStat[]>('/api/get-user-management-stats')
    const  {userDetail, token} = useContext(AuthContext)
    const iswAdminUrl = token?(typeof window !== "undefined" && getCookie(cookieKeys.totalISWAdmin) !== "" ? null : apiUrlsv1.iswAdmin):null
    const tenantAdminurl = token?(typeof window !== "undefined" && getCookie(cookieKeys.totalTenantAdmin) !== "" ? null : apiUrlsv1.tenantAdmin):null
    const tenanturl= token?(typeof window !== "undefined" && getCookie(cookieKeys.totalTenant) !== "" ? null : apiUrlsv1.tenant):null
    const { data: iswAdmin, mutate: _mutateISWAdmin, error: iswAdminError } = useSWR<Paginate<ISWAdmView>>(iswAdminUrl) /* add the url to get iswadmin admin in the second null of the ternary operator */
    const { data: tenantAdmin, mutate: _mutateTenantAdmin, error: tenantAdminError } = useSWR<Paginate<TenantAdminView>>(tenantAdminurl)
    const { data: tenant, mutate: _mutateTenantView, error: tenantError } = useSWR<Paginate<TenantView>>(tenanturl)    
    const [userManagementStats, setUserManagementStats] = useState<UserManagementStat[]>([{
        name: StatsName.createdBanks,
        totalCount: getCookie(cookieKeys.totalTenant)
    }, {
        name: StatsName.tenantAdminUser,
        totalCount: getCookie(cookieKeys.totalTenantAdmin)
    }, {
        name: StatsName.iSWAdminUser,
        totalCount: getCookie(cookieKeys.totalISWAdmin)
    }])
    const isTotalCountLoaded = _.every(userManagementStats, (stat: UserManagementStat) => stat.totalCount !== "")

    const GetStateIcon = useCallback(({ statName }: { statName: string }) => {
        switch (statName) {
            case StatsName.tenantAdminUser:

                return <AvatarIcon sx={{
                    fontSize:["20px","20px","20px","20px","20px","20px"]
                }} />
            case StatsName.createdBanks:

                return <CapitolIcon fontSize="20px" />
            case StatsName.iSWAdminUser:

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
            name: StatsName.createdBanks,
            totalCount: typeof window !== "undefined" && getCookie(cookieKeys.totalTenant) !== "" ? getCookie(cookieKeys.totalTenant) : typeof tenant === "undefined" && typeof tenantError === "undefined" ? "" : typeof tenant !== "undefined" && typeof tenantError === "undefined" ? `${tenant?.totalElements}` : "0"
        }, {
            name: StatsName.tenantAdminUser,
            totalCount: typeof window !== "undefined" && getCookie(cookieKeys.totalTenantAdmin) !== "" ? getCookie(cookieKeys.totalTenantAdmin) : typeof tenantAdmin === "undefined" && typeof tenantAdminError === "undefined" ? "" : typeof tenantAdmin !== "undefined" && typeof tenantAdminError === "undefined" ? `${tenantAdmin?.totalElements}` : "0"
        }, {
            name: StatsName.iSWAdminUser,
            totalCount: typeof window !== "undefined" && getCookie(cookieKeys.totalISWAdmin) !== "" ? getCookie(cookieKeys.totalISWAdmin) : (typeof iswAdmin === "undefined" && typeof iswAdminError === "undefined") ? "" : (typeof iswAdmin !== "undefined" && typeof iswAdminError === "undefined") ? `${iswAdmin?.totalElements}` : "0"
        }])
    }, [tenant, tenantError, tenantAdmin, tenantAdminError, iswAdmin, iswAdminError])

    return (
        <AppCard topic="">
            <>
                { !isTotalCountLoaded ? <SkeletonLoader rows={3} columns={3} width="200" height="10px" gap="30px" loaderKey="total-count-loading" /> :
                    _.map(userManagementStats, (x, i) => (
                    <Flex key={i} p="19px" bgColor="brand.muted-background" flexGrow={1} gap="15px">
                        <Flex justifyContent="space-between" w="100%">
                            <VStack spacing="14.5px">
                                <Text variant="stat-header" size="stat-header">{x.name}</Text>
                                <VStack spacing="7px">
                                    <Text fontWeight="400" fontSize="13px">Total Number</Text>
                                    {(x.totalCount !== "undefined" ) && <Text fontWeight="600" fontSize="36px">{x.totalCount}</Text>}
                                </VStack>
                            </VStack>
                            <Box>
                                <Badge px="10px" bgColor="brand.primary-blue" color="white" borderRadius="5px" >
                                    <GetStateIcon statName={x.name} />
                                </Badge>
                            </Box>
                        </Flex>
                    </Flex >))
                }
            </>
        </AppCard >
    )
}

export default UserManagementStats