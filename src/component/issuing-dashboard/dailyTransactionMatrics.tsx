import { Box, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { AuthContext, StatsContext } from "../../providers";
import { apiUrlsv1, appRoles, notificationMesage } from "../../constants";
import { cookieKeys, StatsName } from "../../constants";
import { useLoading, useCheckAdmin } from "../../hooks";
import { getCookie } from "../../lib";
import { StatsProps } from "../../models";
import { TextChart } from "../dashboard";

let defaultUrl = "";

type DataSuperAdmin = {
  payload: Payload[];
};
type DataBankAdmin = {
  response: Response;
};
type Response = {
  tranId: number;
  tenantCode: string;
  amount: number;
  volume: number;
  position: number;
  percentage: Percentage;
};
type Percentage = {
  percent: number;
  isIncrease: boolean;
};
type Payload = {
  tranId: number;
  amount: number;
  volume: number;
  tenantName: string;
  position: number;
};
export const DailyTransactionMatrics = () => {
  const [selectedUrl, setSelectedUrl] = useState<string>();
  const [selectedHeaderName, setSelectedHeaderName] = useState<string>();
  const [stats, setStats] = useState<StatsProps[]>([]);
  const [loading, setLoading] = useLoading({ isLoading: true, text: "" });
  const [page, setPage] = useState(0);
  const toast = useToast();
  const {
    institutions,
    institutionsError,
    selectedTenantCode,
    transactionPeriod,
    dataDuration,
    setFiltersToShow,
    startTime,
    endTime,
    countInterval,
    period,
  } = useContext(StatsContext);
  const { userDetail } = useContext(AuthContext);
  const superAdminUrl = `${apiUrlsv1.issuingVolumeAdmin}?page=${page}&size=20&dateRange=${transactionPeriod.toUpperCase()}`;
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
      defaultUrl = `${apiUrlsv1.issuingVolume}?tenantCode=${userDetail.tenant.code}&dateRange=${transactionPeriod.toUpperCase()}`;
    } else if (
      userDetail?.role.name === appRoles.superAdmin &&
      selectedTenantCode !== "0"
    ) {
      defaultUrl = `${apiUrlsv1.issuingVolume}?tenantCode=${selectedTenantCode}&dateRange=${transactionPeriod.toUpperCase()}`;
    }
  }
  const { isValidating, mutate, data, error } = useSWR(
    isSuperAdmin ? superAdminUrl : defaultUrl
  );

  const position = data?.response?.position;
  
  useEffect(() => {
    if (isValidating && !data) {
      setLoading({ isLoading: true, text: "" });
    } else {
      if (data) {
        setLoading({ isLoading: false, text: "" });
      }
    }
    if (typeof error !== "undefined") {
      if (!toast.isActive("tr-tran")) {
        toast({
          id: "tr-tran",
          status: "error",
          title: error
            ? error.message
              ? error.message
              : error
            : `${notificationMesage.Oops} ${notificationMesage.AnErrorOccurred}`,
          isClosable: true,
          variant: "left-accent",
        });
      }
    }
    const getStats = (): StatsProps[] => {
      const boxSize = {
        // width: props.width,
        // height: props.height,
        prefix: "",
        suffix: "",
        comingSoon: false,
        title: "Total Amount",
      };
      return [
        {
          ...boxSize,
          headerName: StatsName.transactionAmount,
          totalNumber: data?.response ? data?.response?.amount : 0,
          status:
            data?.response?.percentage?.isIncrease === false ? "red" : "green",
          percentage: `${data?.response ? data?.response?.percentage?.percent:0}%`,
          days: dataDuration,
          prefix: "N",
        },
        {
          ...boxSize,
          headerName: StatsName.totalTransactionVolume,
          totalNumber: data?.response ? data?.response?.volume: 0,
          status: data?.response ? data?.response?.percentage?.isIncrease === false ? "red" : "green": "",
          percentage: `${data?.response ? data?.response?.percentage?.percent:0}%`,
          days: dataDuration,
          prefix: "",
          comingSoon: false,
          title: "Total Volume",
        },
        {
          ...boxSize,
          headerName: StatsName.yourPosition,
          totalNumber: position ? position : 0,
          // status: "red",
          // percentage: "",
          days: dataDuration,
          comingSoon: false,
          suffix: position ?
            position === 2
              ? "nd"
              : position === 3
              ? "rd"
              : position === 1
              ? "st"
              : "th":"",
          title: "Compared to others",
        },
      ];
    };
    
    setStats(getStats());
  }, [
    institutions,
    institutionsError,
    isSuperAdmin,
    data,
    error
  ]);

  const cokieToken = getCookie(cookieKeys.token);
  const headerArray = [cokieToken, startTime, countInterval, endTime];

  return (
    <Box>
        <TextChart
          headTitle={`${transactionPeriod} total ATM transaction metrics`}
          stats={stats}
          loading={loading}
          setSelectedUrl={setSelectedUrl}
          setSelectedHeaderName={setSelectedHeaderName}
        />
    </Box>
  );
};
