import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { apiUrlsv1, appRoles, cookieKeys, filterDates } from "../../constants";
import { fetchg, getCookie } from "../../lib";
import { TransactionBreakdownType } from "../../models";
import { AuthContext, StatsContext } from "../../providers";
import { dashboardContainerSX } from "../../sx";
import { SimpleBarchart } from "../app-charts";

const TerminalsPerformance = dynamic(() => import("./terminals-performance"), {
  ssr: false,
});
const SuccessRate = dynamic(() => import("./success-rate"), { ssr: false });
const ServiceStatus = dynamic(() => import("./service-status"), { ssr: false });
const TerminalsUnderWatch = dynamic(() => import("./terminals-under-watch"), {
  ssr: false,
});
const TopPerforminBanks = dynamic(() => import("./top-performing-banks"), {
  ssr: false,
});
const TopTransactionMetric = dynamic(() => import("./top-transaction-metric"), {
  ssr: false,
});
const TransactionBreakdown = dynamic(() => import("./transaction-breakdown"), {
  ssr: false,
});
const TransactionMetric = dynamic(() => import("./transaction-metric"), {
  ssr: false,
});
const UsageMetric = dynamic(() => import("./usage-metric"), { ssr: false });
// const SimpleBarchart = dynamic(() => import('../app-charts/simpleBarchart'), { ssr: false })
const Dashboard: FC = () => {
  const { userDetail } = useContext(AuthContext);
  const {
    selectedTenantCode,
    setFiltersToShow,
    period,
    startTime,
    countInterval,
    duration,
    endTime,
  } = useContext(StatsContext);

  const cokieToken = getCookie(cookieKeys.token);
  const headerArray = [cokieToken, startTime, countInterval, duration, endTime];

  let topFailureApi = `${apiUrlsv1.realTimeTransactionReport}failure-analysis`;

  let isTenantLoaded = false;
  if (
    userDetail &&
    (userDetail.role.name !== appRoles.superAdmin ||
      typeof selectedTenantCode !== "undefined") &&
    (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")
  ) {
    isTenantLoaded = true;
    topFailureApi = `${topFailureApi}/${userDetail.tenant.code}`;
  }
  const { data: topFailureResons, error: cashWithdrawerError } =
    useSWR<TransactionBreakdownType>(
      !topFailureApi ? null : [topFailureApi + "/16", ...headerArray],
      fetchg
    );

  console.log(topFailureResons);
  const dataDuration = period > 1 ? `Last ${period} days` : "Last 24 Hours";

  useEffect(() => {
    setFiltersToShow({
      showTenantFilter: true,
      showCountIntervalFilter: true,
      showDurationFilter: true,
      showEndDateFilter: true,
      showStartDateFilter: true,
    });
  }, []);
  return (
    <Flex sx={dashboardContainerSX}>
      <Flex>
        <TerminalsPerformance
          showDetails
          dataDuration={dataDuration}
          width={["224px", "224px", "224px", "224px", "300px", "400px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]}
        />
      </Flex>
      <Flex>
        <SuccessRate
          title="What is our success rate?"
          period={dataDuration}
          colorsArr={["#096DD9", "#00B97F"]}
          dataItmsArr={[11, 89]}
          labelsArr={["failed", "success"]}
          comingSoon={true}
          width={["261px", "261px", "261px", "261px", "350px", "390px"]}
          height={["159px", "159px", "159px", "159px", "159px", "159px"]}
        />
      </Flex>
      <Flex>
        <ServiceStatus
          showDetails
          dataDuration={dataDuration}
          width={["200px", "200px", "200px", "220px", "220px", "250px"]}
          height={["224px", "224px", "224px", "224px", "229px", "229px"]}
          page="dashboard"
        />
      </Flex>
      {/* <Flex >
        <TerminalsUnderWatch
          showDetails
          width={["224px", "224px", "224px", "224px", "229px", "229px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]} />
      </Flex> */}
      <Flex>
        <TransactionMetric
          dataDuration={dataDuration}
          width={["224px", "224px", "224px", "224px", "229px", "229px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]}
        />
      </Flex>
      <Flex>
        <UsageMetric
          dataDuration={dataDuration}
          width={["224px", "224px", "224px", "224px", "229px", "229px"]}
          height={["159px", "159px", "159px", "159px", "159px", "189px"]}
        />
      </Flex>
      <Flex>
        <TransactionBreakdown
          width={["224px", "224px", "224px", "230px", "250px", "320px"]}
          height={["200px", "200px", "200px", "200px", "200px", "200px"]}
        />
      </Flex>

      <Flex>
        <TopPerforminBanks
        // dataDuration={dataDuration}
        />
      </Flex>

      <Flex>
        <SuccessRate
          title="ATM Failure reasons analysis"
          period={dataDuration}
          colorsArr={["#1A4983", "#0275D8"]}
          dataItmsArr={[11, 89]}
          labelsArr={["Card Jam", "Cash Jam"]}
          comingSoon={false}
          width={["261px", "261px", "261px", "261px", "350px", "390px"]}
          height={["159px", "159px", "159px", "159px", "159px", "159px"]}
        />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
