import React, { PureComponent, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, useDisclosure } from '@chakra-ui/react';
import BasicModal from '../transaction-monitoring/transactionMonitoringModal';
// import TransactionMonitoringTable from '../tables/transactionMonitoringTable';
import TransactionMonitoringTable from '../transaction-monitoring/transactions-monitoring-table';
import { IRealTimeData, Record } from '../../models';
import { formatRealTimeData } from '../../lib';


const GrpLineChart = (chartProps: IRealTimeData) => {
    const {responseDTOList, transactionCountResponseList } = formatRealTimeData(chartProps.realTime.realtimeTransactionCountResponseList);
    console.log(responseDTOList, transactionCountResponseList)

    const [opState, setOpState] = useState({
        opacity: {
          uv: 1,
          pv: 1,
        },
      })

  const [lineShow, setLineShow] = useState({lineShow:false, failedCount:false, successCount: false})
  const handleClick = (e) => {
   
    setLineShow({...lineShow, [e.value] : !lineShow[e.value]});
  }

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = opState;

    setOpState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = opState;

    setOpState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  const handleOnClick = (e: any) => {
    console.log('legend click ====', e)
  }
    const { opacity } = opState;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <div style={{ width: '100%', backgroundColor: 'white', borderRadius:10, padding: 10 }}>
        {/* <ResponsiveContainer width="100%" height={300}> */}
          <LineChart
            width={1000}
            height={500}
            data={responseDTOList}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 " /> */}
            <XAxis dataKey="startDate" axisLine={false} />
            <YAxis axisLine={false} />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onClick={e => handleClick(e)} onMouseLeave={handleMouseLeave} cursor={'pointer'} />
            <Line type="monotone" hide={lineShow.successCount} dataKey="successCount" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="failedCount" hide={lineShow.failedCount} strokeOpacity={opacity.uv} stroke="#82ca9d" />
          </LineChart>
        {/* </ResponsiveContainer> */}
        <BasicModal title={'Transaction monitoring table'} onClose={onClose} isOpen={isOpen}>
            <TransactionMonitoringTable transactiondata={transactionCountResponseList} />
        </BasicModal>
        <Button size='md' backgroundColor={'blue.400'} onClick={onOpen} color='white'>View in table</Button>
      </div>
    );
}

export default GrpLineChart
