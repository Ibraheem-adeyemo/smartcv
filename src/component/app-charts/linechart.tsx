import React, { FC, PureComponent, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Label,
  ComposedChart,
} from "recharts";
import { Button, useDisclosure, Text, Box, Flex } from "@chakra-ui/react";
import BasicModal from "../transaction-monitoring/transactionMonitoringModal";
// import TransactionMonitoringTable from '../tables/transactionMonitoringTable';
import TransactionMonitoringTable from "../transaction-monitoring/transactions-monitoring-table";
import { IRealTimeData, Record } from "../../models";
import { formatRealTimeData } from "../../lib";
import { DataProps, IssuingBarChartProps, IssuingLineChartProps } from "../../models/issuing-dashboard";


export const GrpLineChart = (chartProps: IRealTimeData) => {
  const { responseDTOList, transactionCountResponseList } = formatRealTimeData(
    chartProps.realTime.realtimeTransactionCountResponseList
  );
  const [opState, setOpState] = useState({
    opacity: {
      uv: 1,
      pv: 1,
    },
  });

  const [lineShowObj, setLineShowObj] = useState({
    lineShow: false,
    failedCount: false,
    successCount: false,
  });
  const handleClick = (e) => {
    setLineShowObj({ ...lineShowObj, [e.value]: !lineShowObj[e.value] });
  };

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

  const { opacity } = opState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
      }}
    >
      {/* <ResponsiveContainer width="100%" height={300}> */}
      <LineChart
        width={1400}
        height={500}
        data={responseDTOList}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1" />
        <XAxis dataKey="startDate" interval={2} axisLine={true} />
        <YAxis axisLine={false} />
        <Tooltip />
        <Legend
          onMouseEnter={handleMouseEnter}
          onClick={(e) => handleClick(e)}
          onMouseLeave={handleMouseLeave}
          cursor={"pointer"}
        />
        <Line
          type="monotone"
          name="Approved"
          hide={lineShowObj.successCount}
          dataKey="successCount"
          //strokeOpacity={opacity.pv}
          stroke="#5DCC96"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          name="Users failure"
          dataKey="failedCount"
          hide={lineShowObj.failedCount}
          //strokeOpacity={opacity.uv}
          stroke="#EC9B40"
        />
        <Line
          type="monotone"
          name="System failure"
          dataKey="customerInducedFailureCount"
          hide={lineShowObj.failedCount}
          //strokeOpacity={opacity.uv}
          stroke="#DC4437"
        />
        {/* <Line type="monotone" dataKey="failedCount" hide={lineShow.failedCount} strokeOpacity={opacity.uv} stroke="red" /> */}
        <text
          x="220"
          y="40"
          dominantBaseline="hanging"
          fontSize="36"
          fontWeight="bold"
        >
          {chartProps?.realTime?.interchangeName}
        </text>
      </LineChart>
      {/* </ResponsiveContainer> */}
      <BasicModal
        title={"Transaction monitoring table"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <TransactionMonitoringTable
          transactiondata={transactionCountResponseList}
        />
      </BasicModal>
      <Button
        size="md"
        backgroundColor={"blue.400"}
        onClick={onOpen}
        color="white"
      >
        View in table
      </Button>
    </div>
  );
};

export const IssuingLineChart = (props: IssuingLineChartProps) => {

  const { lines, container, width=250, height, dataKey, stroke, data } = props;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        {/* <CartesianGrid strokeDasharray={stroke.strokeDasharray} /> */}
        <XAxis
          dataKey={dataKey}
          padding={{ left: 30, right: 30 }}
          tickLine={false}
          tickFormatter={formatTick}
        />
        <YAxis type="number" tickLine={false} width={70} unit="M" />
        <Tooltip wrapperStyle={{ width: "180px", height: "53px" }} />
        <Legend iconType="circle" stroke="red" content={<CustomLegend />} />
        {lines.map((line, i) => {
          return (
            <Line
              dot={false}
              key={i}
              name={line.name}
              type={line.type}
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={2}
              activeDot={line.activeDot}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomLegend = (props:any) => {
    const { payload } = props;
    return (
      <Flex justifyContent={'center'} px={'10px'}>
        {
          payload.map((entry:any, index:number) => (
            <Flex key={`item-${index}`} mr={5} fontSize={{base:'10px', md:'12px'}} alignItems='center'>
                <div style={{
                    width:'0.7rem',
                    height:'0.7rem',
                    backgroundColor:entry.color,
                    borderRadius:'50%',
                    display:'inline-flex',
                    marginRight:'6px'
                }}></div>{entry.value}</Flex>
          ))
        }
      </Flex>
    );
  }

export const IssuingBarChart = (props: IssuingBarChartProps) => {
  const { data, labelX, labelY } = props;
  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <BarChart
        data={data}
        barCategoryGap={1}
        margin={{
          left: 70,
          bottom: 50,
        }}
      >
        <YAxis type="number" tickLine={false} unit="M" axisLine={false} width={50}>
          <Label
            value={labelY}
            angle={-90}
            position="left"
            fontWeight={600}
            dy={-100}
            offset={40}
            fill="#364657"
          />
        </YAxis>
        <XAxis dataKey="channel" tickLine={false} axisLine={false} /*tickFormatter={formatTick}*/>
          <Label
            value={labelX}
            offset={5}
            position="bottom"
            fontWeight={600}
            //fill="#364657"
          />
        </XAxis>
        <CartesianGrid strokeDasharray="7" vertical={false} />
        <Bar dataKey="value" fill="#096DD9" barSize={70} radius={7} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const IssuingBarChartHorizontal = (props: IssuingBarChartProps) => {
  const { data, labelY, labelX } = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        barGap={20}
        margin={{
          top: 5,
          left: 70,
          bottom: 20,
        }}
      >
        <XAxis dataKey="count" type="number" tickFormatter={formatTick}>
          <Label
            value={labelX}
            offset={5}
            position="bottom"
            fontWeight={600}
            fill="#364657"
          />
        </XAxis>
        <YAxis
          dataKey="responseMessage"
          type="category"
          fontSize={14}
          tickLine={false}
          axisLine={true}
          width={30}
        >
          <Label
            value={labelY}
            angle={-90}
            offset={50}
            position="left"
            fontWeight={600}
            fill="#364657"
          />
        </YAxis>
        <CartesianGrid strokeDasharray="7" horizontal={false} />
        <Bar
          dataKey="count"
          minPointSize={5}
          fill="#096DD9"
          barSize={24}
          radius={4}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};


export const IssuingBarLineChart = (props: DataProps) => {
  const { data, barSize, distribution } = props;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
        }}
      >
        <XAxis type="category" dataKey="duration" tickFormatter={formatTick}>
          <Label fill="#364657" value={distribution} position="bottom" />
        </XAxis>
        <YAxis type="number" tick={false} />
        <Tooltip />
        <Bar dataKey="value" barSize={barSize} fill="#E0E4EB" />
        <Line dot={false} type="linear" dataKey="value" stroke="#18A0FB" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

  const formatTick = (value:string) => {
    const val = value && value.length > 3 ? value.slice(0,3):value
    return val
  }
export const IssuingLineChartSingle = (props: DataProps) => {
  const { data, tickCount, interval, type } = props;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart height={400} data={data}>
        <CartesianGrid strokeDasharray="7" vertical={false} horizontal={true} />
        <XAxis
        //   type="category"
          dataKey="duration"
        //   type="number"
          padding={{right: 10 }}
          tickLine={false}
          interval={interval}
          tickCount={tickCount}
          tickFormatter={formatTick}
        />
        <YAxis type="number" tickLine={false} unit="" />
        <Tooltip wrapperStyle={{ width: "100px", height: "20px" }} />
        <Line
          dot={false}
          type="monotone"
          dataKey="count"
          stroke="#0275D8"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};


