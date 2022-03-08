import { HStack, Button } from "@chakra-ui/react";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { UserManagementSearch } from ".";
import { UserManagementModals, userManagementTabsName, UserManagementTriggerButtons } from "../../constants";
import { UserManagementTabProviderContext } from "../../providers";
import { MotionButton, MotionButtonGroup } from "../framer";

const UserManagementTabAndSearch: FC = () => {
    const { tabs, handleTabSelection, handleToggleModal } = useContext(UserManagementTabProviderContext)
    const [showActionButton, setShowActionButton] = useState(false)
    const [showActionButtonText, setShowActionButtonText] = useState("")
    const showActionButtonMethod = useCallback(() => {
        switch (showActionButtonText) {
            case UserManagementTriggerButtons.addNewBank:
                handleToggleModal({ ...UserManagementModals[1], isOpen: !UserManagementModals[1].isOpen })
                break;
            case UserManagementTriggerButtons.addNewUser:
                handleToggleModal({ ...UserManagementModals[0], isOpen: !UserManagementModals[0].isOpen })
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
        <MotionButtonGroup spacing="0" animate="show" initial="hide" variants={{
            hide: {
                opacity: 0

            },
            show: {
                opacity: 1,
                transition: {
                    delayChildren: 0.5,
                    duration: 0.4
                }
            }
        }}>
            {tabs.map((x, i, arr) => <MotionButton animate="show" initial="hide" 
                variants={{
                    show: {
                        opacity: 1,
                        transition: {
                            duration: 0.4,
                            delay: 0.3 * i
                        }
                    },
                    hide: {
                        opacity: 0
                    }
                }}
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
            {showActionButton && <Button

                variant="primary-button" px="53px" py="8px" onClick={showActionButtonMethod} >{showActionButtonText}</Button>}
        </HStack>
    </HStack>
}
export default UserManagementTabAndSearch