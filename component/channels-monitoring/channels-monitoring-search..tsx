import React, { useContext } from "react";
import { StatsContext } from "../../provider/stats-provider";
import { SearchText } from "../stats";

export default function ChannelsMonitoringSearch(_props: any) {
    const { searchText, handleSearchText } = useContext(StatsContext)
    return (

        <SearchText searchText={searchText} handleSearchItem={handleSearchText} />
    )
}