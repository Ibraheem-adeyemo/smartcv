import React, { FC, useContext } from "react";
import { UserManagementTabProviderContext } from "../../providers";
import { SearchText } from "../stats";


const UserManagementSearch:FC = () => {
    const { handleSearchItem, searchText } = useContext(UserManagementTabProviderContext)
    return <SearchText placeHolder="" searchText={searchText} handleSearchItem={handleSearchItem} />
}

export default UserManagementSearch