import React, { FC, useContext } from "react";
import { AuditContext } from "../../provider/audit-provider";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";
import { SearchText } from "../stats";


const AuditSearch:FC = () => {
    const { handleSearchItem, searchText } = useContext(AuditContext)
    return <SearchText placeHolder="Search by username" searchText={searchText} handleSearchItem={handleSearchItem} />
}

export default AuditSearch