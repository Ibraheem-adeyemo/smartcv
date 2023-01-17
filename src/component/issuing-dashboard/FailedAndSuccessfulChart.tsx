import React, { useState, useContext, useEffect } from "react";
import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import {
  issuingFailedSuccessBoxSx,
  issuingFailedSuccessContainerSx,
} from "../../sx";
// import { IssuingAtmTransactionVolumeCount } from ".";
import useSWR from "swr";
import { AuthContext, StatsContext } from "../../providers";
import { useLoading } from "../../hooks";
import { apiUrlsv1, appRoles, notificationMesage } from "../../constants";
import { sumBy } from "lodash";
import { getUrlForSuperadminORBankAdmin, numberWithCommas } from "../../lib";
import { IssuingAtmTransactionVolumeCount } from "./IssuingAtmTransactionVolumeCount";

type DataSuperAdmin = {
  payload: Payload[];
};
type Payload = {
  failedCount: number;
  successCount: number;
  successValue: number;
  failedValue: number;
  tenantName: string;
};

let defaultUrl = "";
export const FailedAndSuccessfulChart = () => {
  const { userDetail } = useContext(AuthContext);
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" });
  const [page, setPage] = useState(0);
  const toast = useToast();
  const { selectedTenantCode, transactionPeriod } = useContext(StatsContext);

  const changedTransactionPeriod = transactionPeriod == 'Monthly'?'Yearly': transactionPeriod

//   let transactionCountVolumeUrl = getUrlForSuperadminORBankAdmin(apiUrlsv1.issuingVolumeStatus, selectedTenantCode )

    const isSuperAdmin = userDetail?.role.name === appRoles.superAdmin

    let transactionCountVolumeUrl = `${apiUrlsv1.issuingVolumeStatus}/volume/status`
    transactionCountVolumeUrl = isSuperAdmin && (selectedTenantCode == '0'|| typeof selectedTenantCode === 'undefined')? `${transactionCountVolumeUrl}?dateRange=${changedTransactionPeriod.toUpperCase()}`:`${transactionCountVolumeUrl}/${selectedTenantCode}?dateRange=${changedTransactionPeriod.toUpperCase()}`


  const { isValidating, mutate, data, error } = useSWR(
    userDetail && userDetail?.role.name ? transactionCountVolumeUrl : ''
  );

  const failedValue = data?.response?.failedValue;
  const successValue = data?.response?.successValue
  const failedCount = data?.response?.failedCount;
  const successCount = data?.response?.successCount

  const totalFailedTransaction = data && data?.response ? numberWithCommas(failedValue) :0.00;
  const totalSuccessfulTransaction = data && data?.response?.successValue > 0 ? numberWithCommas(successValue):0.00;

  const failedTransactionVolume = data && data?.response?.failedCount > 0 ? numberWithCommas(failedCount):0;
  const successfulTransactionVolume = data && data?.response?.successCount > 0 ? numberWithCommas(successCount):0;

   
  return (
    <Box sx={issuingFailedSuccessContainerSx}>
      <Flex mb={50}>
        <Text variant="chart-header">Total {changedTransactionPeriod} transaction</Text>
      </Flex>
      <Flex mb={100} justifyContent="space-between" color="gray.600">
        <Flex sx={issuingFailedSuccessBoxSx}>
          <Box m="auto">
            <Heading as="h4" size="xs">
              Failed transaction
            </Heading>
              <>
                <Heading as="h3" size="md" color={"#E05B50"}>
                  N{failedValue > 0? totalFailedTransaction: `0.00`}
                </Heading>
                <small>{`Total volume:${failedCount > 0 ?failedTransactionVolume:0}`}</small>
              </>
          </Box>
        </Flex>
        <Flex sx={issuingFailedSuccessBoxSx}>
          <Box m="auto">
            <Heading as="h4" size="xs">
              Successful transaction
            </Heading>            
              <>
                <Heading as="h3" size="md" color="#5DCC96">
                  N{successValue > 0? totalSuccessfulTransaction:`0.00`}
                </Heading>
                <Text>{`Total volume:${successCount >0 ? successfulTransactionVolume: 0}`}</Text>
              </>
          </Box>
        </Flex>
      </Flex>
      <IssuingAtmTransactionVolumeCount data={data?.response?.transactionDetails.slice(0,24)} />
    </Box>
  );
};
