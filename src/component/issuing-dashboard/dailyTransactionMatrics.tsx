import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { cookieKeys, StatsName } from '../../constants'
import { useLoading } from '../../hooks'
import { getCookie } from '../../lib'
import { StatsProps } from '../../models'
import { StatsContext } from '../../providers'
import { TextChart } from '../dashboard'

export const DailyTransactionMatrics = () => {
    const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
    const [stats, setStats] = useState<StatsProps[]>([])
    const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
    const { institutions, institutionsError, selectedTenantCode, startTime, endTime, duration, countInterval, period } = useContext(StatsContext)
    
    useEffect(() => {
        const getStats = (): StatsProps[] => {
          const boxSize = {
            // width: props.width,
            // height: props.height,
            prefix: "",
            suffix: "",
            comingSoon: false,
            title: 'Total Amount'
          }
          return [{
            ...boxSize,
            headerName: StatsName.transactionAmount,
            totalNumber: 0.00,
            status: "green",
            percentage: "6.0%",
            days: dataDuration,
            prefix: "N"
    
          }, {
            ...boxSize,
            headerName: StatsName.totalTransactionVolume,
            totalNumber: 0.00,
            status: "green",
            percentage: "6.0%",
            days: dataDuration,
            prefix: "N",
            comingSoon: false,
            title: "Total Volum"
          }, {
            ...boxSize,
            headerName: StatsName.yourPosition,
            totalNumber: 5,
            status: "red",
            percentage: "",
            days: dataDuration,
            comingSoon: false,
            suffix: 'th',
            title: 'Compared to others'
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
    
    
      const cokieToken = getCookie(cookieKeys.token)
      const headerArray = [cokieToken, startTime, countInterval, duration, endTime] 
        
     const dataDuration = period > 1 ? `Last ${period} days`: 'Last 24 Hours'
  return (
    <Box>
        <TextChart stats={stats} loading={loading} setSelectedUrl={setSelectedUrl} setSelectedHeaderName={setSelectedHeaderName}  />
    </Box>
  )
}
