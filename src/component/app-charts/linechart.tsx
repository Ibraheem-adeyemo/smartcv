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
import { Button, useDisclosure, Text, Box } from "@chakra-ui/react";
import BasicModal from "../transaction-monitoring/transactionMonitoringModal";
// import TransactionMonitoringTable from '../tables/transactionMonitoringTable';
import TransactionMonitoringTable from "../transaction-monitoring/transactions-monitoring-table";
import { IRealTimeData, Record } from "../../models";
import { formatRealTimeData } from "../../lib";

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

  const [lineShow, setLineShow] = useState({
    lineShow: false,
    failedCount: false,
    successCount: false,
  });
  const handleClick = (e) => {
    setLineShow({ ...lineShow, [e.value]: !lineShow[e.value] });
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
        {/* <CartesianGrid strokeDasharray="3 " /> */}
        <XAxis dataKey="startDate" axisLine={false} />
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
          hide={lineShow.successCount}
          dataKey="Approved"
          strokeOpacity={opacity.pv}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          name="USers failure"
          dataKey="failedCount"
          hide={lineShow.failedCount}
          strokeOpacity={opacity.uv}
          stroke="#82ca9d"
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

type StrokeType = {
  hasStroke: boolean;
  strokeDasharray: string;
};

type dataType = {
  name: string;
  uv: number;
  pv: number;
  amt: number;
};
type Data = {
  name: string;
  failed: number;
  Successful: number;
  amt: number;
};
type ContainerType = {
  width: string;
  height: string;
};

type LineObject = {
  type: string;
  dataKey: string;
  stroke: string;
  activeDot?: object;
};
interface IssuingLineChartProps {
  lines: LineObject[];
  width: number;
  height: number;
  dataKey: string;
  stroke: StrokeType;
  data: dataType[];
  container: ContainerType;
}

export const IssuingLineChart = (props: IssuingLineChartProps) => {

  const { lines, container, width, height, dataKey, stroke, data } = props;

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart width={width} height={height} data={data}>
        {/* <CartesianGrid strokeDasharray={stroke.strokeDasharray} /> */}
        <XAxis
          dataKey={dataKey}
          padding={{ left: 30, right: 30 }}
          tickLine={false}
        />
        <YAxis type="number" tickLine={false} unit="M" />
        <Tooltip wrapperStyle={{ width: "180px", height: "53px" }} />
        <Legend iconType="circle" />
        {lines.map((line, i) => {
          return (
            <Line
              dot={false}
              key={i}
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

const CustomXaxisText = (props: any) => {
  // const {payload } = props
//   console.log(props);
  return <Text color="red">payload.value</Text>;
};

interface IssuingBarChartProps {
  data: dataType[];
  labelY: string;
  labelX: string;
}

export const IssuingBarChart = (props: IssuingBarChartProps) => {
  const { data, labelX, labelY } = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        barCategoryGap={1}
        margin={{
          left: 70,
          bottom: 50,
        }}
      >
        <YAxis type="number" tickLine={false} unit="M" axisLine={false}>
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
        <XAxis dataKey="name" tickLine={false} axisLine={false}>
          <Label
            value={labelX}
            offset={5}
            position="bottom"
            fontWeight={600}
            fill="#364657"
          />
        </XAxis>
        <CartesianGrid strokeDasharray="7" vertical={false} />
        <Bar dataKey="uv" fill="#096DD9" barSize={70} radius={7} />
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
        <XAxis dataKey="uv" type="number">
          <Label
            value={labelX}
            offset={5}
            position="bottom"
            fontWeight={600}
            fill="#364657"
          />
        </XAxis>
        <YAxis
          dataKey="name"
          type="category"
          fontSize={14}
          tickLine={false}
          axisLine={true}
          width={70}
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
          dataKey="uv"
          minPointSize={5}
          fill="#096DD9"
          barSize={24}
          radius={4}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface DataProps {
  data: Data[];
  barSize?: number;
tickCount?: number;
  type?: "number" | "category";
  domain?: string[] | number[];
  interval?: number;
}
export const IssuingBarLineChart = (props: DataProps) => {
  const { data, barSize } = props;
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
        <XAxis type="category" dataKey="name">
          <Label fill="#364657" value="24hour distribution" position="bottom" />
        </XAxis>
        <YAxis type="number" />
        <Tooltip />
        <Bar dataKey="Successful" barSize={barSize} fill="#E0E4EB" />
        <Line dot={false} type="linear" dataKey="Successful" stroke="#18A0FB" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export const IssuingLineChartSingle = (props: DataProps) => {
  const { data, tickCount, interval, type } = props;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart height={400} data={data}>
        <CartesianGrid strokeDasharray="7" vertical={false} horizontal={true} />
        <XAxis
          type="category"
          dataKey="name"
          tickLine={false}
          interval={interval}
          tickCount={tickCount}
        />
        <YAxis type="number" tickLine={false} unit="M" />
        <Tooltip wrapperStyle={{ width: "180px", height: "53px" }} />
        <Line
          dot={false}
          type="monotone"
          dataKey="failed"
          stroke="#0275D8"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// export const IssuingLineChart = (props) => {
//     const { data } = props
// tick={<CustomXaxisText />}
//     return (
//         // <ResponsiveContainer width="100%" height="100%">
//         <LineChart width={500} height={300} data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//         </LineChart>
//     //   </ResponsiveContainer>
//     );
// }

//  default GrpLineChart

{
  /* <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer> */
}
