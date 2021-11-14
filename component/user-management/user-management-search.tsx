import { Flex, HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useContext } from "react";
import { SearchIcon } from "../../constants";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";

export default function UserManagementSearch(_props: any) {
    const {handleSearchItem, searchText} = useContext(UserManagementTabProviderContext)
    return (<HStack>
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
            />
            <Input borderRadius="26px" bgColor="white" placeholder="Search per bank name" value={searchText} onChange={e => (e.stopPropagation(), handleSearchItem(e.target.value))} />
        </InputGroup>
        

    </HStack>)
}