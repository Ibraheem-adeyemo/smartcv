import { HStack, Button, Flex } from "@chakra-ui/react";
import React, { FC, ReactEventHandler, useCallback, useContext, useEffect, useState } from "react";
import { UserManagementSearch } from ".";
import { appear, delayChildren } from "../../animations";
import { appRoles, UserManagementModals, userManagementTabsName, UserManagementTriggerButtons } from "../../constants";
import { AuthContext, UserManagementTabProviderContext } from "../../providers";
import { MotionButton, MotionButtonGroup } from "../framer";

const UserManagementTabAndSearch: FC = () => {
    const { userDetail } = useContext(AuthContext)
    const { tabs, handleTabSelection, handleToggleModal } = useContext(UserManagementTabProviderContext)
    const [showActionButton, setShowActionButton] = useState(false)
    const [showActionButtonText, setShowActionButtonText] = useState<string[]>()
    const showActionButtonMethod = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        showActionButtonText?.forEach(txt => {
            // debugger
            const button = e.target as HTMLButtonElement
            if(button.textContent === txt)
            // debugger
            switch (txt) {
                case UserManagementTriggerButtons.addNewBank:
                    handleToggleModal({ ...UserManagementModals[1], isOpen: !UserManagementModals[1].isOpen })
                    break;
                case UserManagementTriggerButtons.addNewUser:
                    handleToggleModal({ ...UserManagementModals[0], isOpen: !UserManagementModals[0].isOpen })
                    break;
                case UserManagementTriggerButtons.addNewRole:
                    handleToggleModal({ ...UserManagementModals[2], isOpen: !UserManagementModals[2].isOpen })
                    break;
                default:
                    ""
            }
        })
    }, [showActionButtonText])
    useEffect(() => {
        setShowActionButtonText((prev) => {
            if (tabs.findIndex((x, i) => (x.name === userManagementTabsName.bank) && x.isSelected) > -1) {
                return [UserManagementTriggerButtons.addNewBank]
            } else if (tabs.findIndex((x, i) => (x.name === userManagementTabsName.iSWAdmin) && x.isSelected) > -1) {
                return [UserManagementTriggerButtons.addNewUser, UserManagementTriggerButtons.addNewRole]
            } else if(tabs.findIndex((x, i) => (x.name === userManagementTabsName.tenantAdmin) && x.isSelected) > -1) {
                return [UserManagementTriggerButtons.addNewUser]
            }
            return []

        })
        if (userDetail?.role.name === appRoles.superAdmin) {
            setShowActionButton(tabs.findIndex((x, i) => (x.name === userManagementTabsName.bank || x.name === userManagementTabsName.iSWAdmin) && x.isSelected) > -1)
        } else if (userDetail?.role.name === appRoles.bankAdmin) {
            setShowActionButton(tabs.findIndex((x, i) => x.name === userManagementTabsName.tenantAdmin && x.isSelected) > -1)
        }
    }, [tabs])
    return <HStack justifyContent="space-between" w="100%">
        <MotionButtonGroup spacing="0" animate="show" initial="hide" variants={delayChildren}>
            {tabs.map((x, i, arr) => <MotionButton animate="show" initial="hide"
                variants={appear(i)}
                sx={{
                    px: "20px",
                    py: "11px",
                    borderTopLeftRadius: i === 0 ? "4px" : "0px",
                    borderBottomLeftRadius: i === 0 ? "4px" : "0px",
                    borderTopRightRadius: (i + 1) === arr.length ? "4px" : "0px",
                    borderBottomRightRadius: (i + 1) === arr.length ? "4px" : "0px"
                }}
                isActive={x.isSelected} key={i} colorScheme="blue" variant="outline" onClick={(e) => handleTabSelection(i)}>{x.name}</MotionButton>)}
        </MotionButtonGroup>
        <HStack spacing="38px">
            <UserManagementSearch />
            <Flex sx={{
                gap:"20px"
            }}>
            {showActionButton && showActionButtonText && showActionButtonText.map((txt, i) =>
                <Button key={i} variant="primary-button" px="53px" py="8px" onClick={showActionButtonMethod} >{txt}</Button>)}</Flex>
        </HStack>
    </HStack>
}
export default UserManagementTabAndSearch