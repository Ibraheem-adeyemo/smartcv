import React, { PureComponent, useState } from "react";
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
  console.log("issuing dashbo", props);

  const { lines, container, width, height, dataKey, stroke, data } = props;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={width} height={height} data={data}>
        {/* <CartesianGrid strokeDasharray={stroke.strokeDasharray} /> */}
        <XAxis
          dataKey={dataKey}
          padding={{ left: 30, right: 30 }}
          tickLine={false}
        />
        <YAxis
          type="number"
          domain={[0, 100]}
          tickLine={false}
          unit="M"
        />
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
  console.log(props);
  return <Text color="red">payload.value</Text>;
};

interface IssuingBarChartProps {
  data: dataType[];
}

export const IssuingBarChart = (props: IssuingBarChartProps) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="80%" height="100%">
      <BarChart width={150} height={40} data={data} barCategoryGap={1}>
        <YAxis
          type="number"
          domain={[0, 1000]}
          tickLine={false}
          unit="m"
          axisLine={false}
        />
        <XAxis dataKey={"name"} tickLine={false} axisLine={false} height={60} />
        <CartesianGrid strokeDasharray="7" vertical={false} />
        <Bar dataKey="uv" fill="#096DD9" barSize={70} radius={7} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const IssuingBarChartHorizontal = (props: IssuingBarChartProps) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        data={data}
        layout="vertical"
        barGap={2}
        margin={{
          top: 5,
          right: 30,
          left: 35,
          bottom: 5,
        }}
      >
        <XAxis tickLine={false} unit="m" name="Hello" />
        <YAxis
          dataKey={"name"}
          type={"category"}
          name="Hello"
          tickLine={false}
          axisLine={false}
        />
        <CartesianGrid strokeDasharray="7" horizontal={false} />
        <Bar dataKey="uv" fill="#096DD9" barSize={20} radius={7} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// export const IssuingLineChart = (props) => {
//     const { data } = props
//     // console.log('issuing dashbo', props)
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
