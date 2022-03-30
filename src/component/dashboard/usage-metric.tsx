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
    height?: string | string []
}

const UsageMetric: React.FC<usageMetricsProps> = (props: usageMetricsProps) => {
    const { institutions, institutionsError, selectedTenantCode } = useContext(StatsContext)
    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = `${today.getMonth() + 1}`.length === 1 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`
    const yesterdayDate = `${today.getDate() - 1}`.length === 1 ? `0${today.getDate() - 1}` : `${today.getDate() - 1}`
    const thisDate = `${today.getDate()}`.length === 1 ? `0${today.getDate()}` : `${today.getDate()}`
    const selectedDuration = 24
    const selectedInterval = "hour"
    const [startTime, setStartTime] = useState(`${thisYear}-${thisMonth}-${yesterdayDate} 00:00:00.000`)
    const [endTime, setEndTime] = useState(`${thisYear}-${thisMonth}-${thisDate} 00:00:00.000`)
    const [duration, setDuration] = useState(selectedDuration)
    const [countInterval, setCountInterval] = useState(selectedInterval)
    const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
    const [stats, setStats] = useState<StatsA[]>()
    const [durationList, setDurationList] = useState(hours.map((x, i) => ({
        label: x,
        value: x,
        selected: i === 2
    })))
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
        // console.log("waiting")

        const getStats = () => {
            const boxSize = {
                width: props.width,
                height: props.height,
                prefix: "",
                suffix: ""
            }
            // console.log("done waiting")
            return [{
                ...boxSize,
                headerName: "Balance Enquiry",
                totalNumber: balanceEnquiryCount && balanceEnquiryCount.totalElements ? balanceEnquiryCount.totalElements : 0,
                status: "green",
                percentage: "6.0%",
                days: "Last 7 days",

            }, {
                ...boxSize,
                headerName: "Pin Change",
                totalNumber: pinChangeCount && pinChangeCount.totalElements ? pinChangeCount.totalElements : 0,
                status: "green",
                percentage: "6.0%",
                days: "Last 7 days",
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
        if (countInterval) {
            switch (countInterval) {
                case "hour":
                    setDurationList(hours.map((x, i) => ({
                        label: x,
                        value: x,
                        selected: i === 2
                    })))
                    break
                case "minute":
                    setDurationList(minutes.map((x, i) => ({
                        label: x,
                        value: x,
                        selected: i === 2
                    })))
                    break
            }
        }
    }, [countInterval])


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
            <Flex gap={"10px"} flexDir={"column"}>
                <Text variant="card-header" size="card-header">What Are our usage Metric</Text>
                <Flex gap="17px">
                    <AppCalendar label="Start Date" selectedDate={startTime.split(" ")[0]} selectedTime={startTime.split(" ")[1]} selectionMode={selectionModeValues.pickDateTime} getSelectedDate={({ date, time }) => {
                        // console.log({ date, time })
                        setStartTime(`${date} ${time}`)
                    }} />

                    {/* <AppCalendar label="End Date" selectionMode={selectionModeValues.pickDateTime} getSelectedDate={({ date, time }) => {
                        // console.log({ date, time })
                        setEndTime(`${date} ${time}`)
                    }} /> */}
                </Flex>
                <Flex gap="17px">
                    <SearchFilter
                        data={[
                            { label: "Hour", value: "hour", selected: countInterval == "hour" },
                            { label: "Minute", value: "minute", selected: countInterval == "minute" },
                        ]
                        } label="Interval" onSelected={(e) => {
                            // console.log({ e })
                            setCountInterval(e.value)
                        }} selected />
                    <SearchFilter
                        data={durationList}
                        label="Duration" onSelected={(e) => {
                            // console.log({ e })
                            setDuration(e.value)
                        }} selected />
                </Flex>
            </Flex>
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