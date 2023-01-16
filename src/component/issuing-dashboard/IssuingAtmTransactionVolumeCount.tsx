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
import { getUrlForSuperadminORBankAdmin, numberWithCommas } from "../../lib";
import { apiUrlsv1, appRoles, keysForArrayComponents } from "../../constants";
import useSWR from "swr";
import { IssuingFaileSuccessProps } from "../../models/issuing-dashboard";
import { data2 } from ".";
import { sumBy } from "lodash";
import SkeletonLoader from "../skeleton-loader";

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
      stroke: "#5DCC96",
      activeDot: { r: 8 },
      name: "Successful transactions"
    },
    {
      type: "monotone",
      dataKey: "failedValue",
      stroke: "#DC4437",
      activeDot: { r: 8 },
      name: "Failed transactions"
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
    <Flex width={{base:'100%', lg:"50%"}} sx={chartContainerSx}>
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

      

      if(isValidating || !data?.response?.transactionDetails && !error ) {
        return (
            <SkeletonLoader
              rows={1}
              columns={6}
              width={'2rem'}
              height={'30rem'}
              gap="10px"
              loaderKey={keysForArrayComponents.transactionBreakdownAppCard}
            />
          )
      }  

  return (
    <Flex height="100%" width={{base:'100%', md:'100%', lg:"60%"}} sx={chartContainerSx}>
      <Text variant="chart-header">
          {transactionPeriod} breakdown of issuing transaction value
        </Text>

      <IssuingBarLineChart
        barSize={20}
        data={data?.response?.transactionDetails.slice(0,24)}
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
    <Flex width={{base:'100%',md:'100%', lg:"40%"}} sx={chartContainerSx}>
      <HStack justifyContent="space-between">
      <Text variant="chart-header">{transactionPeriod} count of active cards</Text>
        <Tag>
          Total: <strong>{numberWithCommas(totalFailedTransaction)}</strong>
        </Tag>
      </HStack>
      <IssuingLineChartSingle
        data={data?.response?.transactionDetails.slice(0,24)}
        tickCount={6}
        type="number"
        interval={1}
      />
    </Flex>
  );
};
