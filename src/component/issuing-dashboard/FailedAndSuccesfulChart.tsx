import React, { useState, useContext, useEffect } from "react";
import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { IssuingAtmTransactionVolumeCount } from ".";
import useSWR from "swr";
import { AuthContext, StatsContext } from "../../providers";
import { useLoading } from "../../hooks";
import { apiUrlsv1, appRoles, notificationMesage } from "../../constants";

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
export const FailedAndSuccesfulChart = () => {
  const { userDetail } = useContext(AuthContext);
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" });
  const [page, setPage] = useState(0);
  const toast = useToast();

  const { selectedTenantCode } = useContext(StatsContext);
  const superAdminUrl = `${apiUrlsv1.issuingVolumeStatusAdmin}?page=${page}&size=20&dateRange=DAILY`;

  const isSuperAdmin =
    userDetail?.role.name === appRoles.superAdmin &&
    (selectedTenantCode == "0" || selectedTenantCode == "undefined");
  if (
    userDetail &&
    (userDetail.role.name !== appRoles.superAdmin ||
      typeof selectedTenantCode !== "undefined") &&
    (userDetail?.role.name !== appRoles.superAdmin ||
      selectedTenantCode !== "0")
  ) {
    if (userDetail?.role.name !== appRoles.superAdmin) {
      defaultUrl = `${apiUrlsv1.issuingVolumeStatus}?tenantCode=${userDetail.tenant.code}&dateRange=DAILY`;
    } else if (
      userDetail?.role.name === appRoles.superAdmin &&
      selectedTenantCode !== "0"
    ) {
      defaultUrl = `${apiUrlsv1.issuingVolumeStatus}?tenantCode=${selectedTenantCode}&dateRange=DAILY`;
    }
  }
  const { isValidating, mutate, data, error } = useSWR(
    isSuperAdmin ? superAdminUrl : defaultUrl
  );
  const typeData = isSuperAdmin ? (data as DataSuperAdmin) : undefined;

  const totalSuccCount = typeData?.payload.reduce((acc, obj) => {
    return acc + obj.successCount;
  }, 0);
  const totalFailedCount = typeData?.payload.reduce((acc, obj) => {
    return acc + obj.failedCount;
  }, 0);
  const totalSuccVal = typeData?.payload.reduce((acc, obj) => {
    return acc + obj.successValue;
  }, 0);
  const totalFailedVal = typeData?.payload.reduce((acc, obj) => {
    return acc + obj.failedValue;
  }, 0);
  const refactoredValue = (value?: number) => {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Box
      width={600}
      height="fit-content"
      bg="white"
      flexDir={"column"}
      borderRadius={10}
      shadow="xl"
      p={50}
    >
      <Flex mb={50}>
        <Heading as="h5" size="md">
          Total daily transaction
        </Heading>
      </Flex>
      <Flex mb={100} justifyContent="space-between" color="gray.600">
        <Box>
          <Heading as="h4" size="xs">
            Failed transaction
          </Heading>
          {isSuperAdmin ? (
            <>
              <Heading as="h3" size="md" color={"#E05B50"}>
                {`N${refactoredValue(totalFailedVal)}.00M`}
              </Heading>
              <small>{`Total volume:${refactoredValue(
                totalFailedCount
              )}`}</small>
            </>
          ) : (
            <>
              <Heading as="h3" size="md" color={"#E05B50"}>
                {`N${refactoredValue(data?.response.failedValue)}.00M`}
              </Heading>
              <small>{`Total volume:${refactoredValue(
                data?.response.failedCount
              )}`}</small>
            </>
          )}
        </Box>
        <Box>
          <Heading as="h4" size="xs">
            Successful transaction
          </Heading>
          {isSuperAdmin ? (
            <>
              <Heading as="h3" size="md" color="#5DCC96">
                {`N${refactoredValue(totalSuccVal)}.00M`}
              </Heading>
              <Text>{`Total volume:${refactoredValue(totalSuccCount)}`}</Text>
            </>
          ) : (
            <>
              <Heading as="h3" size="md" color="#5DCC96">
                {`N${refactoredValue(data?.response.failedValue)}.00M`}
              </Heading>
              <Text>{`Total volume:${refactoredValue(
                data?.response.successCount
              )}`}</Text>
            </>
          )}
        </Box>
      </Flex>
      <IssuingAtmTransactionVolumeCount />
    </Box>
  );
};
