import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useContext } from "react";
import { SearchIcon } from "../../constants";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";
import { SearchText } from "../stats";


export default function UserManagementSearch(_props: any) {
    const { handleSearchItem, searchText } = useContext(UserManagementTabProviderContext)
    return <SearchText searchText={searchText} handleSearchItem={handleSearchItem} />
}