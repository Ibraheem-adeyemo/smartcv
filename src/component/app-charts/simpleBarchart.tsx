import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useSWR from 'swr';
import { apiUrlsv1 } from '../../constants';

const SimpleBarchart = () => {
    const url = `${apiUrlsv1.realTimeTransactionReport}top-transaction`
    const { data: banksRealTimeData, mutate: _mutate, error } = useSWR(url === "" ? null : url)
    return (
        <div style={{ width: '100%', backgroundColor: 'white', borderRadius:10, padding: 10 }}>
      {/* <ResponsiveContainer > */}
        <BarChart
          width={800}
          height={400}
          data={banksRealTimeData?.realtimeTransactionVolumeList
          }
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="tenantName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" barSize={20} fill="#69C6A6" />
          {/* <Bar dataKey="position" barSize={20} fill="#62C6A6" /> */}
          <Bar dataKey="value" barSize={20} fill="#096DD9" />
        </BarChart>
      {/* </ResponsiveContainer> */}
      </div>
    );
}

export default SimpleBarchart;