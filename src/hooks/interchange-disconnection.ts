import { clone, map } from "lodash"
import { useEffect, useState } from "react"
import { cookieKeys, cookiesTimeout, InterchangeDisconnectionModals, interchangeDisconnectionTabs } from "../constants"
import { getCookie, setCookie } from "../lib"
import { interchangeDisconnectionTab, InterchangeReconnectionModal } from "../models"

export default function useInterchangeDisconnection() {
    const [timerLeft, setTimerLeft] = useState(0)
    const [tabs, setTabs] = useState(interchangeDisconnectionTabs as interchangeDisconnectionTab[])
    const [modals, setModals] = useState(InterchangeDisconnectionModals)
    

    const handleToggleModal = (modalInstance?: InterchangeReconnectionModal) => {

        if (typeof modalInstance !== "undefined") {
            setModals((prev) => map(prev, (x) => x.name === modalInstance.name ? ({ ...x, ...modalInstance }) : {...x, isOpen: false}))
        } else {
            setModals(InterchangeDisconnectionModals)
        }
    }
    useEffect(() => {
        const cookieTimelLeft = getCookie(cookieKeys.requestConnectionTimeout)
        if (cookieTimelLeft !== "") {
            setTimeout(() => {
                setTimerLeft(prev => prev - 1)

            }, 1000);
        } else {
            setTimerLeft(0)
        }
    }, [timerLeft])

    const modifyTab = (tab: interchangeDisconnectionTab[] | interchangeDisconnectionTab, index?: number) => {
        if ("length" in tab && tab["length"] > 0) {
            setTabs(tab as interchangeDisconnectionTab[])
        } else if (typeof index !== "undefined" && !isNaN(index)) {
            setTabs(prev => {

                const data = clone(prev)
                const selectedIndex = data.findIndex((x) => x.isSelected)
                if (selectedIndex > -1) {
                    data[selectedIndex] = { ...data[selectedIndex], isSelected: false } as interchangeDisconnectionTab;
                }
                data[index] = tab as interchangeDisconnectionTab;
                return data
            })
        }
    }


    const requestConnection = () => {
        setCookie(cookieKeys.requestConnectionTimeout, `${cookiesTimeout.requestConnectionTimeout}`, cookiesTimeout.requestConnectionTimeout)
        let timer = cookiesTimeout.requestConnectionTimeout
        const f = setInterval(() =>

            setCookie(cookieKeys.requestConnectionTimeout, `${cookiesTimeout.requestConnectionTimeout}`, cookiesTimeout.requestConnectionTimeout)
            , cookiesTimeout.requestConnectionTimeout)
    }

    return {
        tabs,
        modals,
        modifyTab,
        handleToggleModal,
    }

}