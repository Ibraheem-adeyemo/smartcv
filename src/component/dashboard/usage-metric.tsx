import React, { useState, useCallback, useEffect, useContext } from "react"
import { Stat } from "../stats"
import { SkeletonLoader } from ".."
import { Paginate, StatsA } from "../../models"
import { AppCard } from "../app"
import { Text } from '@chakra-ui/react'
import { useLoading } from "../../hooks"
import { AuthContext, StatsContext } from "../../providers"
import { apiUrlsv1, appRoles } from "../../constants"
import useSWR from "swr"

const UsageMetric:React.FC = () => {
    const { institutions, institutionsError, selectedTenantCode } = useContext(StatsContext)
    const [loading, setLoading] = useLoading({isLoading:true, text:""})
    const [stats, setStats] = useState<StatsA[]>()
    const {userDetail} = useContext(AuthContext)
    let balanceEnquiryUrl = apiUrlsv1.balanceEnquiry
    let pinChangeUrl = apiUrlsv1.pinChange

    if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
  
      if (userDetail.role.name !== appRoles.superAdmin) {
        balanceEnquiryUrl = `${apiUrlsv1.balanceEnquiry}${userDetail.tenant.code}/count`
        pinChangeUrl = `${apiUrlsv1.pinChange}${userDetail.tenant.code}/count`
      } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
        balanceEnquiryUrl = `${apiUrlsv1.balanceEnquiry}${selectedTenantCode}/count`
        pinChangeUrl = `${apiUrlsv1.pinChange}${selectedTenantCode}/count`
      }
    }
    balanceEnquiryUrl = selectedTenantCode && selectedTenantCode !== "0"?balanceEnquiryUrl:""
    pinChangeUrl = selectedTenantCode && selectedTenantCode !== "0"?pinChangeUrl:""
    const {data:balanceEnquiryCount, error: balanceEnquiryCountError} = useSWR<Paginate<any>>(!balanceEnquiryUrl?null:balanceEnquiryUrl)
    const {data:pinChangeCount, error: pinChangeCountError} = useSWR<Paginate<any>>(!pinChangeUrl?null:pinChangeUrl)


    useEffect(() => {
        // console.log("waiting")

        const getStats = () : StatsA[]  => {
            const boxSize = {
                width: ["224px", "224px", "224px", "224px", "229px", "229px"],
                height: ["159px", "159px", "159px", "159px", "159px", "189px"],
                prefix:"",
                suffix:""
            }
            // console.log("done waiting")
            return [{
                ...boxSize,
                headerName: "Balance Enquiry",
                totalNumber: balanceEnquiryCount && balanceEnquiryCount.totalElements? balanceEnquiryCount.totalElements:0,
                status: "green",
                percentage: "6.0%",
                days: "Last 7 days",

            }, {
                ...boxSize,
                headerName: "Pin Change",
                totalNumber: pinChangeCount && pinChangeCount.totalElements? pinChangeCount.totalElements:0,
                status: "green",
                percentage: "6.0%",
                days: "Last 7 days",
            }]
        }
        setStats(getStats())
        // if ((typeof institutions === "undefined" && typeof institutionsError === "undefined")) {
        //   setLoading({ isLoading: true, text: "" })
        // } else {
        //   setLoading({ isLoading: false, text: "" })
        // }
        setLoading({ isLoading: false, text: "" })
    }, [institutions, institutionsError])
    return (
        <AppCard topic={<Text variant="card-header" size="card-header">What Are our usage Metric</Text>} >
            {!loading.isLoading ?
                <>
                    {stats?.map((x, i) => <Stat key={i} {...x} />)}
                </> :
                <SkeletonLoader rows={3} columns={2} width="200px" height="10px" gap="30px" loaderKey="usage-metric-app-card" />
            }
        </AppCard>)
}

export default UsageMetric