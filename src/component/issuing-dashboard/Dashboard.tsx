import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { dashboardContainerSX, issuingBreakdownTranBoxSx } from "../../sx";
import { DailyTransactionMatrics, FailedAndSuccessfulChart } from ".";
import {
  BarChartHorizontal,
  TransactionTypeBarChart,
  IssuingTranValueChart,
  IssuingTranVolumeChart,
} from "./IssuingAtmTransactionVolumeCount";

export const Dashboard = () => {
  return (
    <Flex sx={dashboardContainerSX}>
      <Flex sx={issuingBreakdownTranBoxSx}>
        <IssuingTranValueChart />
        <IssuingTranVolumeChart />
      </Flex>
      <Flex sx={issuingBreakdownTranBoxSx}>
        <FailedAndSuccessfulChart />
        <BarChartHorizontal />
      </Flex>
      <Box width="100%" bg="white">
        <Box mb={20}>
          <DailyTransactionMatrics />
        </Box>
        <Box height={600} shadow="xl" padding={30} borderRadius={10}>
          <TransactionTypeBarChart />
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;
