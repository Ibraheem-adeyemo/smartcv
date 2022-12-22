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
import { data, data2, data3, data4 } from '.'

let defaultUrlVolChannel = ""

import {dataMonth, dataYear } from "../../dummyData/data";
import { StatsContext } from "../../providers";


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
    const { transactionPeriod } = useContext(StatsContext)
  return (
    <Flex width="50%" sx={chartContainerSx}>
      <Text variant="chart-header">`${transactionPeriod}` transaction volume</Text>
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
