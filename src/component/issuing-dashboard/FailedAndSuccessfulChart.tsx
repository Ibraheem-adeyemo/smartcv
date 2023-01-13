import React, { useState, useContext, useEffect } from "react";
import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import {
  issuingFailedSuccessBoxSx,
  issuingFailedSuccessContainerSx,
} from "../../sx";
import { IssuingAtmTransactionVolumeCount } from ".";
import useSWR from "swr";
import { AuthContext, StatsContext } from "../../providers";
import { useLoading } from "../../hooks";
import { apiUrlsv1, appRoles, notificationMesage } from "../../constants";
import { sumBy } from "lodash";
import { getUrlForSuperadminORBankAdmin, numberWithCommas } from "../../lib";

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


  let transactionCountVolumeUrl = getUrlForSuperadminORBankAdmin(apiUrlsv1.issuingVolumeStatus, selectedTenantCode )
//   const superAdminUrl = `${apiUrlsv1.issuingVolumeStatusAdmin}?page=${page}&size=20&dateRange=${transactionPeriod.toUpperCase()}`;
    // transactionCountVolumeUrl = `${transactionCountVolumeUrl}/volume/status?page=${page}&size=20&dateRange=${transactionPeriod.toUpperCase()}`
    const isSuperAdmin = userDetail?.role.name === appRoles.superAdmin

    transactionCountVolumeUrl = `${transactionCountVolumeUrl}/volume/status`
    transactionCountVolumeUrl = isSuperAdmin && (selectedTenantCode == '0'|| typeof selectedTenantCode === 'undefined')? `${transactionCountVolumeUrl}?dateRange=${transactionPeriod.toUpperCase()}&page=${0}&size=${20}`:`${transactionCountVolumeUrl}?tenantCode=${selectedTenantCode}&dateRange=${transactionPeriod.toUpperCase()}`


  const { isValidating, mutate, data, error } = useSWR(
    userDetail && userDetail?.role.name ? transactionCountVolumeUrl : ''
  );

  const totalFailedTransaction = data && data?.response ? numberWithCommas(data?.response?.failedValue) :0.00;
  const totalSuccessfulTransaction = data && data?.response?.successValue > 0 ? numberWithCommas(data?.response?.successValue):0.00;

  const failedTransactionVolume = data && data?.response?.failedCount > 0 ? numberWithCommas(data?.response?.failedCount):0;
  const successfulTransactionVolume = data && data?.response?.successCount > 0 ? numberWithCommas(data?.response?.successCount):0;

   
  return (
    <Box sx={issuingFailedSuccessContainerSx}>
      <Flex mb={50}>
        <Text variant="chart-header">Total {transactionPeriod} transaction</Text>
      </Flex>
      <Flex mb={100} justifyContent="space-between" color="gray.600">
        <Flex sx={issuingFailedSuccessBoxSx}>
          <Box m="auto">
            <Heading as="h4" size="xs">
              Failed transaction
            </Heading>
              <>
                <Heading as="h3" size="md" color={"#E05B50"}>
                  N{totalFailedTransaction > 0? totalFailedTransaction: `0.00`}
                </Heading>
                <small>{`Total volume:${failedTransactionVolume}`}</small>
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
                  N{totalSuccessfulTransaction > 0? totalSuccessfulTransaction:`0.00`}
                </Heading>
                <Text>{`Total volume:${successfulTransactionVolume}`}</Text>
              </>
          </Box>
        </Flex>
      </Flex>
      <IssuingAtmTransactionVolumeCount data={data?.response?.transactionDetails.slice(0,24)} />
    </Box>
  );
};
