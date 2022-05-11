import React, { FC, useContext } from "react";
import { AuditContext } from "../../providers";
import { SearchText } from "../stats";


const AuditSearch:FC = () => {
    const { handleSearchItem, searchText, handleDaterangeSearch, dateRange } = useContext(AuditContext)
    return <SearchText placeHolder="Search by username" searchText={searchText} handleDateSearch={handleDaterangeSearch} dateRange={dateRange} handleSearchItem={handleSearchItem} />
}

export default AuditSearch