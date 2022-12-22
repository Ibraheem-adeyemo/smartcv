import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Flex, HStack, Tag } from "@chakra-ui/react";
import {
  IssuingLineChart,
  IssuingBarChart,
  IssuingBarChartHorizontal,
  IssuingBarLineChart,
  IssuingLineChartSingle,
} from "../app-charts";
import { chartContainerSx } from "../../sx";
import { data, dataMonth, dataYear } from "../../dummyData/data";

let defaultUrlVolChannel = "";

const data2 = [
  {
    name: "Balance Enquiry",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Cash Withdrawer",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Quickteller airtime",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Quickteller funds transfer",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Pin change",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Quickteller bills payment",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];
const data3 = [
  {
    name: "Invalid transaction",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Insufficient funds",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Insufficient funds",
    uv: 2050,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Insufficient funds",
    uv: 2240,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Insufficient funds",
    uv: 3030,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Insufficient funds",
    uv: 4100,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Insufficient funds",
    uv: 3100,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Insufficient funds",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Insufficient funds",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Issuer or switch inoperative",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Issuer or switch inoperative",
    uv: 1898,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Issuer or switch inoperative",
    uv: 1790,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Quickteller bills payment",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Quickteller bills payment",
    uv: 2320,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Quickteller bills payment",
    uv: 3390,
    pv: 3800,
    amt: 2500,
  },
];

const containerType = {
  width: "100%",
  height: "100%",
};

const dashStroke = {
  hasStroke: true,
  strokeDasharray: "3 3",
};
export const IssuingAtmTransactionVolumeCount = () => {
  const lines = [
    {
      type: "monotone",
      dataKey: "Successful",
      stroke: "#C6F8DF",
      activeDot: { r: 8 },
    },
    {
      type: "monotone",
      dataKey: "failed",
      stroke: "#DC4437",
      activeDot: { r: 8 },
    },
  ];
  return (
    <>
      <IssuingLineChart
        lines={lines}
        width={500}
        height={300}
        dataKey="name"
        data={data}
        container={containerType}
        stroke={dashStroke}
      />
    </>
  );
};

export const TransactionTypeBarChart = () => {
  return (
    <>
      <IssuingBarChart
        labelY="Volume of each transaction types issuing"
        labelX="Daily total ATM transaction metrics"
        data={data2}
      />
    </>
  );
};

export const BarChartHorizontal = () => {
  const isData = false;
  const isDataYear = false;
  return (
    <Flex width="50%" sx={chartContainerSx}>
      {isData ? (
        <Text variant="chart-header">Daily transaction volume</Text>
      ) : isDataYear ? (
        <Text variant="chart-header">Monthly transaction volume</Text>
      ) : (
        <Text variant="chart-header">Weekly transaction volume</Text>
      )}
      <IssuingBarChartHorizontal
        labelX="Transaction volume"
        labelY="Top 15 transaction response codes"
        data={data3}
      />
    </Flex>
  );
};

export const IssuingTranValueChart = () => {
  const isData = false;
  const isDataYear = false;
  return (
    <Flex height="100%" width="60%" sx={chartContainerSx}>
      {isData ? (
        <Text variant="chart-header">
          Daily breakdown of issuing transaction value
        </Text>
      ) : isDataYear ? (
        <Text variant="chart-header">
          Monthly breakdown of issuing transaction value
        </Text>
      ) : (
        <Text variant="chart-header">
          Weekly breakdown of issuing transaction value
        </Text>
      )}

      <IssuingBarLineChart
        barSize={isData || isDataYear ? 20 : 63}
        data={isData ? data : isDataYear ? dataYear : dataMonth}
      />
    </Flex>
  );
};

export const IssuingTranVolumeChart = () => {
  const isData = false;
  const isDataYear = false;
  const newDataMonth = dataMonth.map((result) => result.name.split("/")[0]);
  console.log(newDataMonth);
  return (
    <Flex width="40%" sx={chartContainerSx}>
      <HStack justifyContent="space-between">
        {isData ? (
          <Text variant="chart-header">Daily count of Issued cards</Text>
        ) : isDataYear ? (
          <Text variant="chart-header">Monthly count of Issued cards</Text>
        ) : (
          <Text variant="chart-header">Weekly count of Issued cards</Text>
        )}
        <Tag>
          Total: <strong>930</strong>
        </Tag>
      </HStack>
      <IssuingLineChartSingle
        data={isData ? data : isDataYear ? dataYear : dataMonth}
        tickCount={isData ? 24 : isDataYear ? 6 : 7}
        type={isData ? "number" : "category"}
        interval={isDataYear || isData ? 1 : 0}
      />
    </Flex>
  );
};
