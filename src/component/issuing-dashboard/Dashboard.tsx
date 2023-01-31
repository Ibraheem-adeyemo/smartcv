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
      <Flex flexDir={{base:'column',md:'column', lg:'row'}} sx={issuingBreakdownTranBoxSx}>
        <IssuingTranValueChart />
        <IssuingTranVolumeChart />
      </Flex>
      <Flex sx={issuingBreakdownTranBoxSx} flexDir={{base:'column', lg:'row'}}>
        <FailedAndSuccessfulChart />
        <BarChartHorizontal />
      </Flex>
      <Flex width="100%" bg="white" flexDir='column' borderRadius={10}>
        <Box mb={20}>
          <DailyTransactionMatrics />
        </Box>
        <Box height={450} shadow="xl" py={30} pr={4}>
          <TransactionTypeBarChart />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
