import { Flex } from "@chakra-ui/react";
import React, { FC, useContext, useMemo } from "react";
import { filterDates } from "../../constants";
import { StatsContext } from "../../providers/stats-provider";
import { SearchText } from "../stats";
import AppBarFilter from "../stats/app-bar-filter";

const ChannelsMonitoringSearch: FC = () => {
    const { searchText, handleSearchText, toggleDate } = useContext(StatsContext)
    useMemo(() => {
        toggleDate(filterDates.today)
    },[])
    return (
        <Flex justifyContent="space-between" sx={{
            flexWrap: "wrap",
            gap: "20px"
        }} >
            <AppBarFilter />

            <SearchText placeHolder="" searchText={searchText} handleSearchItem={handleSearchText} />
        </Flex>

    )
}

export default ChannelsMonitoringSearch