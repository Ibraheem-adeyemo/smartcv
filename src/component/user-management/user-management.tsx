import { VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { FC, useCallback, useContext, useEffect } from "react";
import { UserManagementStats } from ".";
import { superAdmin, userManagementTabsName } from "../../constants";
import { AuthContext } from "../../providers/auth-provider";
import { UserManagementTabProviderContext } from "../../providers/user-management-tab-provider";
import UserManagementTabAndSearch from "./user-management-tab-and-search";

const Bank = dynamic(() => import("./bank"), { ssr: false })
const BankAdmin = dynamic(() => import("./bank-admin"), { ssr: false })
const ISWAdmin = dynamic(() => import("./isw-admin"), { ssr: false })

const UserManagement: FC = () => {
    const { tabs, handleTabSelection, handleToggleModal, modals } = useContext(UserManagementTabProviderContext)
    const {userDetail} = useContext(AuthContext)
    useEffect(() => {
        handleTabSelection(0)
    }, [])
    const SelectedTable = useCallback(() => {
        const selectedIndex = _.findIndex(tabs, (x, i) => x.isSelected)

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
            { userDetail?.role.name === superAdmin && <UserManagementStats />}
            <VStack spacing="36px" w="100%">
                <UserManagementTabAndSearch />
                <AnimatePresence>
                    <SelectedTable />
                </AnimatePresence>
            </VStack>
        </VStack>
    )
}

export default UserManagement