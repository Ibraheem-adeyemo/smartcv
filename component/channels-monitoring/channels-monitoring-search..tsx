import React, { FC, useContext } from "react";
import { StatsContext } from "../../provider/stats-provider";
import { SearchText } from "../stats";

const ChannelsMonitoringSearch:FC = () => {
    const { searchText, handleSearchText } = useContext(StatsContext)
    return (

        <SearchText searchText={searchText} handleSearchItem={handleSearchText} />
    )
}

export default ChannelsMonitoringSearch