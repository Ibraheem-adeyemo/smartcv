import { Box } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import useSWR from 'swr';
import { apiUrlsv1, appRoles, cookieKeys } from '../../constants';
import { useLoading } from '../../hooks';
import { getCookie } from '../../lib';
import { Paginate, StatsProps } from '../../models';
import { IssuingTransactionMetrics } from '../../models/issuing-dashboard';
import { AuthContext, StatsContext } from '../../providers';
import { IssuingLineChart, IssuingBarChart, IssuingBarChartHorizontal } from '../app-charts'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 0,
  },
];

const data2 = [
    {
      name: 'Balance Enquiry',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Cash Withdrawer',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Quickteller airtime',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Quickteller funds transfer',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Pin change',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Quickteller bills payment',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    }
  ];

const containerType = {
    width: '100%',
    height: '100%'
}

const dashStroke = {
    hasStroke: true,
    strokeDasharray:"3 3"
}

export const IssuingAtmTransactionVolumeCount = () => {
    
    const lines = [
        {
            type: 'monotone',
            dataKey: 'pv',
            stroke: '#C6F8DF',
            activeDot: { r: 8 }
        },
        {
            type: 'monotone',
            dataKey: 'uv',
            stroke: '#DC4437'
        },
    ]
  return (
    <>
        <IssuingLineChart lines={lines} width={500} height={300} dataKey='name' data={data} container={containerType} stroke={dashStroke} />
    </>
  )
}

export const TransactionTypeBarChart = () => {
    const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
  const { institutions, institutionsError, selectedTenantCode, getSelectedStartDate, getSelectedEndDate, startTime, endTime,  duration, countInterval, period } = useContext(StatsContext)
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" })
  const [stats, setStats] = useState<StatsProps[]>()
  const { token, userDetail } = useContext(AuthContext);

  const cokieToken = getCookie(cookieKeys.token)

  const getDateOnly = (date:string) => {
    return date.split(' ')[0]
  }

  let issuingTransactionMetricsUrl = `${apiUrlsv1.issuingTransactionMetrics}/volume?startDate=${getDateOnly(startTime)}&endDate=${getDateOnly(endTime)}&dateRange=${'daily'}`

    if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {

        if (userDetail.role.name !== appRoles.superAdmin) {
           issuingTransactionMetricsUrl = `${apiUrlsv1.issuingTransactionMetrics}/tenant/volume?startDate=${getDateOnly(startTime)}&endDate=${getDateOnly(endTime)}&tenantCode=${userDetail.role.tenantCode}&dateRange=${'daily'}`
        } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
            issuingTransactionMetricsUrl = `${apiUrlsv1.issuingTransactionMetrics}/tenant/volume?startDate=${getDateOnly(startTime)}&endDate=${getDateOnly(endTime)}&tenantCode=${selectedTenantCode}&dateRange=${'daily'}`
        } 
      }

      const { data: issuingTransactionMetricsData, error: issuingTransactionMetricsError } = useSWR<Paginate<IssuingTransactionMetrics>>(issuingTransactionMetricsUrl)

      console.log(issuingTransactionMetricsData, issuingTransactionMetricsError)
    return (
        <>
            <IssuingBarChart data={data2} />
        </>
    )
}

export const BarChartHorizontal = () => {
    return (
        <Box bg='white' width='40%'ml={10} pl={5}>
            <IssuingBarChartHorizontal data={data2} />
         </Box>
    )
}
