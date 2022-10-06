import React, { useState, useCallback, useEffect, useContext } from "react"
import { SearchFilter, Stat } from "../stats"
import { SkeletonLoader } from ".."
import { Paginate, StatsA } from "../../models"
import { AppCalendar, AppCard } from "../app"
import { Flex, Text } from '@chakra-ui/react'
import { useLoading } from "../../hooks"
import { AuthContext, StatsContext } from "../../providers"
import { apiUrlsv1, appRoles, hours, keysForArrayComponents, minutes, selectionModeValues } from "../../constants"
import useSWR, { useSWRConfig } from "swr"
import { fetchJson } from "../../lib"

interface usageMetricsProps {
    width?: string | string [],
    height?: string | string [],
    dataDuration: string
}

const UsageMetric: React.FC<usageMetricsProps> = (props: usageMetricsProps) => {
    const { institutions, institutionsError, selectedTenantCode, startTime, endTime, countInterval, duration } = useContext(StatsContext)
    const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
    const [stats, setStats] = useState<StatsA[]>()
    const { userDetail, token } = useContext(AuthContext)
    let balanceEnquiryUrl = apiUrlsv1.balanceEnquiry
    let pinChangeUrl = apiUrlsv1.pinChange
    // debugger
    if (userDetail && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode) && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {

        if (userDetail.role.name !== appRoles.superAdmin) {
            balanceEnquiryUrl = `${apiUrlsv1.balanceEnquiry}${userDetail.tenant.code}/count`
            pinChangeUrl = `${apiUrlsv1.pinChange}${userDetail.tenant.code}/count`
        } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
            balanceEnquiryUrl = `${apiUrlsv1.balanceEnquiry}${selectedTenantCode}/count`
            pinChangeUrl = `${apiUrlsv1.pinChange}${selectedTenantCode}/count`
        }
    }
    balanceEnquiryUrl = selectedTenantCode && selectedTenantCode !== "0" ? balanceEnquiryUrl : null as never as string
    pinChangeUrl = selectedTenantCode && selectedTenantCode !== "0" ? pinChangeUrl : null as never as string
    // debugger
    const {mutate} = useSWRConfig()
    const { data: balanceEnquiryCount, error: balanceEnquiryCountError } = useSWR<Paginate<any>>(balanceEnquiryUrl, fetchg)
    const { data: pinChangeCount, error: pinChangeCountError } = useSWR<Paginate<any>>(pinChangeUrl, fetchg)


    async function fetchg<T>(url: string) {
        const result = await fetchJson<T>(url, {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`,
                "TRAN-MON-START-DATETIME": startTime.split(".").length > 1 ? startTime.split(".")[0] +"."+ startTime.split(".")[1]  : startTime + '.000',
                "TRAN-MON-INTERVAL": countInterval,
                "TRAN-MON-DURATION": duration
            }
        })
        return result
    }


    async function fetchh<T>(url: string) {
        return await fetchJson<T>(url, {
            method: "GET",
            headers: {
                Authorization: `bearer ${token}`,
                "TRAN-MON-START-DATETIME": startTime.split(".").length > 1 ? startTime.split(".")[0] +"."+ startTime.split(".")[1]  : startTime + '.000',
                "TRAN-MON-END-DATETIME": endTime.split(".").length > 1 ? endTime.split(".")[0] +"."+ endTime.split(".")[1]  : endTime + '.000'
            }
        })
    }
    useEffect(() => {

        const getStats = () => {
            const boxSize = {
                width: props.width,
                height: props.height,
                prefix: "",
                suffix: "",
                title: "Total Amount"
            }
            return [{
                ...boxSize,
                headerName: "Balance Enquiry",
                totalNumber: balanceEnquiryCount && balanceEnquiryCount.totalElements ? balanceEnquiryCount.totalElements : 0,
                status: "green",
                percentage: "6.0%",
                days: props.dataDuration,

            }, {
                ...boxSize,
                headerName: "Pin Change",
                totalNumber: pinChangeCount && pinChangeCount.totalElements ? pinChangeCount.totalElements : 0,
                status: "green",
                percentage: "6.0%",
                days: props.dataDuration,
            }]
        }
        setStats(getStats())
        // debugger
        if ( selectedTenantCode && selectedTenantCode !== "0" && (!balanceEnquiryCount || !pinChangeCount) && !balanceEnquiryCountError && !pinChangeCountError) {
          setLoading({ isLoading: true, text: "" })
        } else {
          setLoading({ isLoading: false, text: "" })
        }
        // setLoading({ isLoading: false, text: "" })
    }, [balanceEnquiryCount, pinChangeCount, pinChangeCountError, balanceEnquiryCountError])


    useEffect(() => {
        // debugger
        if(selectedTenantCode !== "0" && startTime && countInterval && duration) {
            
            mutate(pinChangeUrl)
            mutate(balanceEnquiryUrl)
            // setLoading({ isLoading: true, text: "" })
        }
    }, [selectedTenantCode, startTime, countInterval, duration])

    return (
        <AppCard topic={
                <Text variant="card-header" size="card-header">What Are our usage Metric</Text>
        } >
            {!loading.isLoading ?
                <>
                    {stats && stats.map((x, i) => <Stat key={`${keysForArrayComponents.usageMetricAppCard}-${i}`} {...x} />)}
                </> :
                <SkeletonLoader rows={1} columns={2} width={props.width} height={props.height} gap="17px" loaderKey={keysForArrayComponents.usageMetricAppCard} />
            }
        </AppCard>)
}

export default UsageMetric