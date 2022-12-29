import { Button, Flex, Stack } from "@chakra-ui/react";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import AppBarFilter from "../stats/app-bar-filter";

const TransactionMonitoringHeader = () => {
    return(
        <Stack direction={'row'} mb={5}>
            <Button size='md'>
            Today
            </Button>
            <Button size='md'>
            This Week
            </Button>
            <Button size='md'>
            This Month
            </Button>
            <Button size='md'>
            View in table
            </Button>
        </Stack>        
    )
}

export default TransactionMonitoringHeader