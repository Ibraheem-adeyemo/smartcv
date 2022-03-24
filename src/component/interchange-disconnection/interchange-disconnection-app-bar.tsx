import { Button, Flex } from "@chakra-ui/react";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { appRoles, InterchangeDisconnectionModals, interchangeDisconnectionTabsName, InterchangeReconnectionTriggerButtons } from "../../constants";
import { AuthContext, InterchangeDisconnectionContext, StatsContext } from "../../providers";
import AppBarFilter from "../stats/app-bar-filter";

const InterchangeDisconnectionAppBar: FC = () => {
    const { userDetail } = useContext(AuthContext)
    const { setFiltersToShow } = useContext(StatsContext)
    const [showActionButton, setShowActionButton] = useState(false)
    const [showActionButtonText, setShowActionButtonText] = useState<string[]>()
    const { tabs, handleToggleModal, } = useContext(InterchangeDisconnectionContext)
    const showActionButtonMethod = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // debugger
        showActionButtonText?.forEach(txt => {
            // debugger
            const button = e.target as HTMLButtonElement
            if (button.textContent === txt)
                // debugger
                switch (txt) {
                    case InterchangeReconnectionTriggerButtons.RequestReconnection:
                        handleToggleModal({ ...InterchangeDisconnectionModals[0], isOpen: !InterchangeDisconnectionModals[0].isOpen })
                        break;
                    default:
                        ""
                }
        })
    }, [showActionButtonText])
    useEffect(() => {
        setFiltersToShow({ showTodayFilter: true })
    }, [])
    useEffect(() => {
        setShowActionButtonText((prev) => {
            if (tabs.findIndex((x, i) => (x.name === interchangeDisconnectionTabsName.connectionRequest) && x.isSelected) > -1) {
                return [InterchangeReconnectionTriggerButtons.RequestReconnection]
            } else if (tabs.findIndex((x, i) => (x.name === interchangeDisconnectionTabsName.status) && x.isSelected) > -1) {
                return [InterchangeReconnectionTriggerButtons.RequestReconnection]
            }
            return []

        })
        if (userDetail?.role.name === appRoles.superAdmin) {
        } else if (userDetail?.role.name === appRoles.bankAdmin) {
            setShowActionButton(tabs.findIndex((x, i) => (x.name === interchangeDisconnectionTabsName.connectionRequest || x.name === interchangeDisconnectionTabsName.status) && x.isSelected) > -1)
        }
    }, [tabs])

    return (
        <Flex justifyContent={"space-between"}>
            <AppBarFilter />
            {showActionButton && showActionButtonText && showActionButtonText.map((txt, i) =>
                <Button key={i} variant="primary-button" px="53px" py="8px" onClick={showActionButtonMethod} >{txt}</Button>)}
        </Flex>
    )
}

export default InterchangeDisconnectionAppBar