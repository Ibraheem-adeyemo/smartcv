import { ButtonGroup, Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserManagementSearch } from ".";
import { UserManagementModals, userManagementTabsName, UserManagementTriggerButtons } from "../../constants";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";

export default function UserManagementTabAndSearch() {
    const { tabs, handleTabSelection, handleToggleModal } = useContext(UserManagementTabProviderContext)
    const [showActionButton, setShowActionButton] = useState(false)
    const [showActionButtonText, setShowActionButtonText] = useState("")
    const showActionButtonMethod = useCallback(() => {
        switch (showActionButtonText) {
            case UserManagementTriggerButtons.addNewBank:
                handleToggleModal({...UserManagementModals[1], isOpen: !UserManagementModals[1].isOpen})
                break;
            case UserManagementTriggerButtons.addNewUser:
                handleToggleModal({...UserManagementModals[0], isOpen: !UserManagementModals[0].isOpen})
                break;
            default:
                ""
        }
    }, [showActionButtonText])
    useEffect(() => {
        setShowActionButtonText((prev) => {
            if (tabs.findIndex((x, i) => (x.name === userManagementTabsName.bank) && x.isSelected) > -1) {
                return UserManagementTriggerButtons.addNewBank
            } else if (tabs.findIndex((x, i) => (x.name === userManagementTabsName.iSWAdmin) && x.isSelected) > -1) {
                return UserManagementTriggerButtons.addNewUser
            }
            return ""

        })
        setShowActionButton(tabs.findIndex((x, i) => (x.name === userManagementTabsName.bank || x.name === userManagementTabsName.iSWAdmin) && x.isSelected) > -1)
    }, [tabs])
    return <HStack justifyContent="space-between" w="100%">
        <ButtonGroup spacing="0px">
            {tabs.map((x, i, arr) => <Button isActive={x.isSelected} key={i} px="20px" py="11px" borderTopLeftRadius={i === 0 ? "4px" : "0px"} borderBottomLeftRadius={i === 0 ? "4px" : "0px"} borderTopRightRadius={(i + 1) === arr.length ? "4px" : "0px"} borderBottomRightRadius={(i + 1) === arr.length ? "4px" : "0px"} colorScheme="blue" variant="outline" onClick={(e) => handleTabSelection(i)}>{x.name}</Button>)}
        </ButtonGroup>
        <HStack spacing="38px">
            <UserManagementSearch />
            {showActionButton && <Button variant="primary-button" px="53px" py="8px" onClick={showActionButtonMethod} >{showActionButtonText}</Button>}
        </HStack>
    </HStack>
}