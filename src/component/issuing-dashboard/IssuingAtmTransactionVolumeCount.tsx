import { Box } from '@chakra-ui/react';
import React from 'react'
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
