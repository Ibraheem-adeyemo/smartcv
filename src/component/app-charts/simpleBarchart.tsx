import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useSWR from 'swr';
import { apiUrlsv1 } from '../../constants';

type DataKeyType = {
    dataKeyName: string
    dataKeyBarSize: number
    dataKeyFillColor:string
}

type DataKeyProps = DataKeyType[]

interface SimpleBarchartProps {
    data:any, 
    dataKey?:DataKeyProps
}

const dataKeys = [
    {
        dataKeyName: 'count',
        dataKeyBarSize: 20,
        dataKeyFillColor:'#69C6A6'
    },
    {
        dataKeyName: 'value',
        dataKeyBarSize: 20,
        dataKeyFillColor:'#096DD9'
    }
]

export const SimpleBarchart = (props:SimpleBarchartProps) => {
    const {data} = props

    return (
        <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          //width={400}
          height={200}
          data={data?.slice(0,5)}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="tenantName" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* {
            data.length > 0 && data.slice(0,5).map(item => {
                return (
                <React.Fragment key={item.dataKeyName}>
                    <Bar dataKey={item.dataKeyName} barSize={item.dataKeyBarSize} fill={item.dataKeyFillColor} />
                </React.Fragment>
                )
            })
          } */}
          <Bar dataKey="count" barSize={20} fill="#69C6A6" />
          {/* <Bar dataKey="position" barSize={20} fill="#62C6A6" /> */}
          <Bar dataKey="value" barSize={20} fill="#096DD9" />
        </BarChart>
        </ResponsiveContainer>
    );
}

export const TotalTransactionBarChart = ({data}:any) => {
    return (
        // <ResponsiveContainer width="100%" height="100%">
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />

            <YAxis dataKey='volume' />
            <YAxis dataKey='value' />
            {/* <XAxis dataKey="value" /> */}
            <Bar dataKey="value"  fill="#62C6A6" />
            <Bar dataKey="volume" fill="#096DD9" />
          </BarChart>
        // </ResponsiveContainer>
      );
    }