import { clone } from "lodash"
import { useState } from "react"
import { interchangeDisconnectionTabs } from "../constants"
import { interchangeDisconnectionTab } from "../models"

export default function useInterchangeDisconnection() {

    
    const [tabs, setTabs] = useState(interchangeDisconnectionTabs as interchangeDisconnectionTab[])
    const modifyTab = (tab: interchangeDisconnectionTab[] | interchangeDisconnectionTab, index?:number) => {
        if("length" in tab && tab["length"] > 0) {
            setTabs(tab as interchangeDisconnectionTab[])
        } else if(typeof index !== "undefined" && !isNaN(index)) {
            setTabs(prev => {
                // debugger
                const data = clone(prev)
                const selectedIndex = data.findIndex((x) => x.isSelected)
                if(selectedIndex > -1) {
                    data[selectedIndex] = {... data[selectedIndex], isSelected: false} as interchangeDisconnectionTab;
                }
                data[index] = tab as interchangeDisconnectionTab;
                return data
            })
        }
    }

    return {
        tabs,
        modifyTab
    }

}