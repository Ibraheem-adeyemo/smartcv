import { Button, Flex, Text } from "@chakra-ui/react"
import React, { useState, useEffect, useContext, FC } from "react"
import { Stat } from "../stats"
import { SkeletonLoader } from ".."
import { useLoading } from "../../hooks"
import { ATMInService, Paginate, StatsA, TransactionBreakdownType } from "../../models"
import { AuthContext, StatsContext } from "../../providers"
import { AppCard } from "../app"
import { apiUrlsv1, appRoles, cookieKeys, keysForArrayComponents, StatsName, upcomingFeature } from "../../constants"
import { fetchg, getCookie } from "../../lib"
import useSWR from "swr"

interface TransactionBreakdownProps {
  width?: string | string[],
  height?: string | string[],
  showDetails?: boolean
}

interface StatsProps extends StatsA {
    title: string
  comingSoon?: boolean
}


const TransactionBreakdown: FC<TransactionBreakdownProps> = ({ showDetails = false, ...props }: TransactionBreakdownProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
  const { institutions, institutionsError, selectedTenantCode, startTime, endTime, duration, countInterval, period } = useContext(StatsContext)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
  const [stats, setStats] = useState<StatsProps[]>()
  const { token, userDetail } = useContext(AuthContext);

  const cokieToken = getCookie(cookieKeys.token)
  const headerArray = [cokieToken, startTime, countInterval, duration, endTime] 
  let url = apiUrlsv1.transactionDetails
  let cashWithdrawalApi = `${url}/cash-withdrawal/`
//   let quicktellerAirtimeApi = `${url}/quickteller-airtime`
  let quicktellerApi = `${url}/quickteller/`
  let payCodeWithdrwalApi = `${url}/paycode/`
//   let atmOutOfServiceurl = apiUrlsv1.atmOutOfService
//   let atmCountUrl = apiUrlsv1.atmCount
//   let atmInSupervisorUrl = apiUrlsv1.atmInSupervisor
  // debugger
  if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {

    if (userDetail.role.name !== appRoles.superAdmin) {
        cashWithdrawalApi = `${cashWithdrawalApi}${userDetail.tenant.code}`
        // quicktellerAirtimeApi = `${quicktellerAirtimeApi}/${userDetail.tenant.code}`
        quicktellerApi = `${quicktellerApi}${userDetail.tenant.code}`
        payCodeWithdrwalApi = `${payCodeWithdrwalApi}${userDetail.tenant.code}`
    } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
        cashWithdrawalApi = `${cashWithdrawalApi}${selectedTenantCode}`
        // quicktellerAirtimeApi = `${quicktellerAirtimeApi}/${selectedTenantCode}`
        quicktellerApi = `${quicktellerApi}${selectedTenantCode}`
        payCodeWithdrwalApi = `${payCodeWithdrwalApi}${selectedTenantCode}`
    } 
  }
  
  cashWithdrawalApi = token||cokieToken && userDetail ? cashWithdrawalApi : ""
//   quicktellerAirtimeApi = token||cokieToken && userDetail ? quicktellerAirtimeApi : ""
  quicktellerApi = token||cokieToken && userDetail ? quicktellerApi : ""
  payCodeWithdrwalApi = token||cokieToken && userDetail ? payCodeWithdrwalApi : "";

  const { data: cashWithdrawal, error: cashWithdrawerError } = useSWR<TransactionBreakdownType>(!cashWithdrawalApi ?  null : [cashWithdrawalApi, ...headerArray ], fetchg)
//   const { data: quicktellerAirtime, error: quicktellerAirtimeError } = useSWR<Paginate<ATMInService>>(!quicktellerAirtimeApi? null : [quicktellerAirtimeApi, ...headerArray ], fetchg)
  const { data: quicktellerBill, error: quickTellerBillError } = useSWR<TransactionBreakdownType>(!quicktellerApi ?  null : [quicktellerApi, ...headerArray ], fetchg)
  const { data: paycodeWithdrawal, error: payCodeWithdrawError } = useSWR<TransactionBreakdownType>(!payCodeWithdrwalApi? null : [payCodeWithdrwalApi, ...headerArray ], fetchg)

 const dataDuration = period > 1 ? `Last ${period} days`: 'Last 24 Hours'

  useEffect(() => {
    const getStats = (): StatsProps[] => {
      const boxSize = {
        width: props.width,
        height: props.height,
        prefix: "",
        suffix: "",
        comingSoon: false,
        title: 'Total Amount'
      }
      return [{
        ...boxSize,
        headerName: StatsName.cashWithdrawal,
        totalNumber: cashWithdrawal?.amount ? cashWithdrawal?.amount : 0.00 ,
        status: "green",
        percentage: "6.0%",
        days: dataDuration,
        prefix: "N"

      }, {
        ...boxSize,
        headerName: StatsName.quicktellerAirtime,
        totalNumber: 0.00,
        status: "green",
        percentage: "6.0%",
        days: dataDuration,
        prefix: "N",
        comingSoon: false
      }, {
        ...boxSize,
        headerName: StatsName.quicktellerBill,
        totalNumber: quicktellerBill?.amount ? quicktellerBill?.amount : 0.00,
        status: "red",
        percentage: "6.0%",
        days: dataDuration,
        prefix: "N",
        comingSoon: false
      }, {
        ...boxSize,
        headerName: StatsName.paycodeWithdrawal,
        totalNumber: paycodeWithdrawal?.amount ? paycodeWithdrawal?.amount : 0.00,
        status: "green",
        percentage: "6.0%",
        days: dataDuration,
        prefix: "N",
        comingSoon: false
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
    <AppCard topic={<Text variant="card-header" size="card-header">Transaction Breakdown</Text>} >

      {!loading.isLoading && stats ?
        <Flex flexWrap={"wrap"} gap="15px"> {stats.map((x, i) => (
          <Button key={`${keysForArrayComponents.transactionBreakdownAppCard}-${i}`} disabled={x.comingSoon} opacity={x.comingSoon ? "0.4" : "1"} cursor={showDetails && !x.comingSoon && x.url ? 'pointer' : 'none'}
            onClick={() => {
              if (showDetails && x.url && !x.comingSoon) {
                setSelectedUrl(`${x.url}/`)
                setSelectedHeaderName(x.headerName)
              }
            }}
          >
            {x.comingSoon && <Text size="page-header" variant="page-header" sx={{
              pos: "absolute",
              zIndex: 10
            }}>{upcomingFeature.stats}</Text>}
            <Stat {...x} />
          </Button>
        ))}</Flex> :
        <SkeletonLoader rows={1} columns={4} width={props.width} height={props.height} gap="30px" loaderKey={keysForArrayComponents.transactionBreakdownAppCard} />
      }
    </AppCard>
  )
}

export default TransactionBreakdown