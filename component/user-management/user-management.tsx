import { VStack } from "@chakra-ui/layout";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { FC, useCallback, useContext, useEffect } from "react";
import { UserManagementStats } from ".";
import { userManagementTabsName } from "../../constants";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";
import UserManagementTabAndSearch from "./user-management-tab-and-search";

const Bank = dynamic(() => import("./bank"))
const BankAdmin = dynamic(() => import("./bank-admin"))
const ISWAdmin = dynamic(() => import("./isw-admin"))

const UserManagement:FC = () => {
    const { tabs, handleTabSelection, handleToggleModal, modals } = useContext(UserManagementTabProviderContext)
    useEffect(() => {
        handleTabSelection(0)
    }, [])
    const SelectedTable = useCallback(() => {
        const selectedIndex = _.findIndex(tabs, (x, i) => x.isSelected)
        // debugger
        if (selectedIndex > -1) {
            switch (tabs[selectedIndex].name) {
                case userManagementTabsName.bank:
                    return <Bank />
                case userManagementTabsName.tenantAdmin:
                    return <BankAdmin />
                case userManagementTabsName.iSWAdmin:
                    return <ISWAdmin />
                default:
                    return <></>
            }
        }
        return <></>
    }, [tabs])
    useEffect(() => {
        
        const checkOpenTab = _.some(modals, (x) => x.isOpen)
        if (checkOpenTab) {
            handleToggleModal()
        }
    }, [tabs])
    return (
        <VStack spacing="21px">
            <UserManagementStats />
            <VStack spacing="36px" w="100%">
                <UserManagementTabAndSearch />
                <SelectedTable />
            </VStack>
        </VStack>
    )
}

export default UserManagement