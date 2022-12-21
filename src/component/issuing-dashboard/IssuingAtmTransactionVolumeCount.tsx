import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Flex, HStack, Tag } from "@chakra-ui/react";
import useSWR from "swr";
import { AuthContext, StatsContext } from "../../providers";
import { apiUrlsv1, appRoles, notificationMesage } from "../../constants";
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
  return (
    <Flex height="100%" width="60%" sx={chartContainerSx}>
      <Text variant="chart-header">
        Daily breakdown of issuing transaction value
      </Text>
      <IssuingBarLineChart data={data} />
    </Flex>
  );
};

export const IssuingTranVolumeChart = () => {
  return (
    <Flex width="40%" sx={chartContainerSx}>
      <HStack justifyContent="space-between">
        <Text variant="chart-header">Daily count of Issued cards</Text>
        <Tag>
          Total: <strong>930</strong>
        </Tag>
      </HStack>
      <IssuingLineChartSingle data={data} />
    </Flex>
  );
};
