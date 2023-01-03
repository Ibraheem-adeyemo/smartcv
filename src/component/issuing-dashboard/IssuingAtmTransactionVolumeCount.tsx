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
import { AuthContext, StatsContext } from "../../providers";
import { getUrlForSuperadminORBankAdmin } from "../../lib";
import { apiUrlsv1, appRoles } from "../../constants";
import useSWR from "swr";
import { IssuingFaileSuccessProps } from "../../models/issuing-dashboard";
import { data2 } from ".";
import { sumBy } from "lodash";

const containerType = {
  width: "100%",
  height: "100%",
};

const dashStroke = {
  hasStroke: true,
  strokeDasharray: "3 3",
};

export const IssuingAtmTransactionVolumeCount = ({data}:IssuingFaileSuccessProps) => {
  const lines = [
    {
      type: "monotone",
      dataKey: "successValue",
      stroke: "#C6F8DF",
      activeDot: { r: 8 },
    },
    {
      type: "monotone",
      dataKey: "failedValue",
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
        dataKey="duration"
        data={data}
        container={containerType}
        stroke={dashStroke}
      />
    </>
  );
};

export const TransactionTypeBarChart = () => {
    const { userDetail } = useContext(AuthContext);
    const { transactionPeriod, selectedTenantCode } = useContext(StatsContext);

    const isSuperAdmin = userDetail?.role.name === appRoles.superAdmin

    let transactionCountVolumeUrl = getUrlForSuperadminORBankAdmin(apiUrlsv1.issuingVolumeStatus, selectedTenantCode )

    transactionCountVolumeUrl = `${transactionCountVolumeUrl}/volume/channel`
    transactionCountVolumeUrl = isSuperAdmin && (selectedTenantCode == '0'|| typeof selectedTenantCode === 'undefined')? `${transactionCountVolumeUrl}?dateRange=${transactionPeriod.toUpperCase()}&page=${0}&size=${20}` :`${transactionCountVolumeUrl}?tenantCode=${selectedTenantCode}&dateRange=${transactionPeriod.toUpperCase()}`
    const { isValidating, mutate, data, error } = useSWR(
        userDetail && userDetail?.role.name ? transactionCountVolumeUrl : ''
      );

  return (
    <>
      <IssuingBarChart
        labelY="Volume of each transaction types issuing"
        labelX={`${transactionPeriod} total ATM transaction metrics`}
        data={data?.response[0]}
      />
    </>
  );
};

export const BarChartHorizontal = () => {
    const { userDetail } = useContext(AuthContext);
    const { transactionPeriod, selectedTenantCode } = useContext(StatsContext)
    const tenantTopFailuredResons = apiUrlsv1.issuingFailedReasonsTenant
    let transactionCountVolumeUrl = getUrlForSuperadminORBankAdmin(apiUrlsv1.issuingVolumeStatus, selectedTenantCode )
    const isSuperAdmin = userDetail?.role.name === appRoles.superAdmin

    transactionCountVolumeUrl = `${transactionCountVolumeUrl}/failed-transaction`
    transactionCountVolumeUrl = isSuperAdmin && (selectedTenantCode == '0'|| typeof selectedTenantCode === 'undefined')? `${transactionCountVolumeUrl}?dateRange=${transactionPeriod.toUpperCase()}&page=${0}&size=${20}`:`${tenantTopFailuredResons}?tenantCode=${selectedTenantCode}&dateRange=${transactionPeriod.toUpperCase()}`
    const { isValidating, mutate, data, error } = useSWR(
        userDetail && userDetail?.role.name ? transactionCountVolumeUrl : ''
      );
      
  return (
    <Flex width="50%" sx={chartContainerSx}>
      <Text variant="chart-header">{transactionPeriod} transaction failure reasons</Text>
      <IssuingBarChartHorizontal
        labelX="Transaction volume"
        labelY="Top 15 transaction response codes"
        data={data?.response}
      />
    </Flex>
  );
};

export const IssuingTranValueChart = () => {
    const { userDetail } = useContext(AuthContext);
    const { transactionPeriod, selectedTenantCode } = useContext(StatsContext)
    let transactionCountVolumeUrl = getUrlForSuperadminORBankAdmin(apiUrlsv1.issuingVolumeStatus, selectedTenantCode )

    const isSuperAdmin = userDetail?.role.name === appRoles.superAdmin

    transactionCountVolumeUrl = `${transactionCountVolumeUrl}/volume`
    transactionCountVolumeUrl = isSuperAdmin && (selectedTenantCode == '0'|| typeof selectedTenantCode === 'undefined')? `${transactionCountVolumeUrl}?dateRange=${transactionPeriod.toUpperCase()}&page=${0}&size=${20}`:`${transactionCountVolumeUrl}?tenantCode=${selectedTenantCode}&dateRange=${transactionPeriod.toUpperCase()}`

    // transactionCountVolumeUrl = `${transactionCountVolumeUrl}/volume?dateRange=${transactionPeriod.toUpperCase()}&page=${0}&size=${20}`
    const { isValidating, mutate, data, error } = useSWR(
        userDetail && userDetail?.role.name ? transactionCountVolumeUrl : ''
      );

  return (
    <Flex height="100%" width="50%" sx={chartContainerSx}>
      <Text variant="chart-header">
          {transactionPeriod} breakdown of issuing transaction value
        </Text>

      <IssuingBarLineChart
        barSize={20}
        data={data?.response?.transactionDetails}
      />
    </Flex>
  );
};

export const IssuingTranVolumeChart = () => {
    const { userDetail } = useContext(AuthContext);
    const { transactionPeriod, selectedTenantCode } = useContext(StatsContext)
    let transactionCountVolumeUrl = getUrlForSuperadminORBankAdmin(apiUrlsv1.issuingVolumeStatus, selectedTenantCode );

    const isSuperAdmin = userDetail?.role.name === appRoles.superAdmin

    transactionCountVolumeUrl = `${transactionCountVolumeUrl}/volume`
    transactionCountVolumeUrl = isSuperAdmin && (selectedTenantCode == '0'|| typeof selectedTenantCode === 'undefined')? `${transactionCountVolumeUrl}?dateRange=${transactionPeriod.toUpperCase()}&page=${0}&size=${20}`:`${transactionCountVolumeUrl}?tenantCode=${selectedTenantCode}&dateRange=${transactionPeriod.toUpperCase()}`

    // transactionCountVolumeUrl = `${transactionCountVolumeUrl}/volume?dateRange=${transactionPeriod.toUpperCase()}&page=${0}&size=${20}`
    const { isValidating, mutate, data, error } = useSWR(
        userDetail && userDetail?.role.name ? transactionCountVolumeUrl : ''
      );

      const totalFailedTransaction = data && data?.response?.transactionDetails.length > 0 ? sumBy(data?.response?.transactionDetails,(count:any) => count?.count):0

  return (
    <Flex width="50%" sx={chartContainerSx}>
      <HStack justifyContent="space-between">
      <Text variant="chart-header">{transactionPeriod} count of Issued cards</Text>
        <Tag>
          Total: <strong>{totalFailedTransaction}</strong>
        </Tag>
      </HStack>
      <IssuingLineChartSingle
        data={data?.response?.transactionDetails}
        tickCount={6}
        type="number"
        interval={0}
      />
    </Flex>
  );
};
