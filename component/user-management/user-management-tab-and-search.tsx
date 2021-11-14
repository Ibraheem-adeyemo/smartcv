import { ButtonGroup, Button } from "@chakra-ui/button";
import { Flex, HStack } from "@chakra-ui/layout";
import React, { useCallback, useContext, useEffect } from "react";
import { UserManagementSearch } from ".";
import { userManagementTabs, userManagementTabsname } from "../../constants";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";

export default function UserManagementTabAndSearch() {
    const { tabs, handleTabSelection } = useContext(UserManagementTabProviderContext)
    // const []

    useEffect(() => {

    }, [tabs])
    return <HStack justifyContent="space-between" w="100%">
        <ButtonGroup spacing="0px">
            {tabs.map((x, i, arr) => <Button isActive={x.isSelected} key={i} px="20px" py="11px" borderTopLeftRadius={i === 0 ? "4px" : "0px"} borderBottomLeftRadius={i === 0 ? "4px" : "0px"} borderTopRightRadius={(i + 1) === arr.length ? "4px" : "0px"} borderBottomRightRadius={(i + 1) === arr.length ? "4px" : "0px"} colorScheme="blue" variant="outline" onClick={(e) => handleTabSelection(i)}>{x.name}</Button>)}
        </ButtonGroup>
        <HStack spacing="38px">
            <UserManagementSearch />
            {tabs.findIndex((x, i) => (x.name === userManagementTabsname.bank || x.name === userManagementTabsname.iSWAdmin ) && x.isSelected) > -1? 
                    <Button variant="primary-button" px="53px" py="8px" >New Bank</Button>:<></>}
        </HStack>
    </HStack>
}