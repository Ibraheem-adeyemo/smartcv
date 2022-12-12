import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { dashboardContainerSX, } from "../../sx";
import {
  DailyTransactionMatrics,
  FailedAndSuccesfulChart,
  IssuingAtmTransactionVolumeCount,
} from ".";
import {
  BarChartHorizontal,
  TransactionTypeBarChart,
} from "./IssuingAtmTransactionVolumeCount";

export const Dashboard = () => {
  return (
    <Flex sx={dashboardContainerSX}>
      <Flex gap="20px" width="100%">
        <FailedAndSuccesfulChart />
        <BarChartHorizontal />
      </Flex>
      <Box width={"100%"} bg="white">
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
