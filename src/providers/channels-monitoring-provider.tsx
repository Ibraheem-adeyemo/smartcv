import { clone } from "lodash";
import { createContext, FC, useEffect, useState } from "react";
import { channelsMonitoringTabs } from "../constants";
import { channelsMonitoringTab, ComponentWithChildren } from "../models";

export const channelsMonitoringContext = createContext({
    tabs: channelsMonitoringTabs  as channelsMonitoringTab[],
    modifyTab: (tab: channelsMonitoringTab[] | channelsMonitoringTab, index?:number) => {}
})

const ChannelsMonitoringProvider:FC<ComponentWithChildren> = (props: ComponentWithChildren) => {
  
    const [tabs, setTabs] = useState(channelsMonitoringTabs as channelsMonitoringTab[])
    const modifyTab = (tab: channelsMonitoringTab[] | channelsMonitoringTab, index?:number) => {
        if("length" in tab && tab["length"] > 0) {
            setTabs(tab as channelsMonitoringTab[])

        } else if(typeof index !== "undefined" && !isNaN(index)) {
            setTabs(prev => {
              
                const data = clone(prev)
                const selectedIndex = data.findIndex((x) => x.isSelected)
                if(selectedIndex > -1) {
                    data[selectedIndex] = {... data[selectedIndex], isSelected: false} as channelsMonitoringTab;
                }
                data[index] = tab as channelsMonitoringTab;
                return data
            })
        }
    }

    // useEffect(() => {
         // console.log({tabs})
    // }, [tabs])

    return <channelsMonitoringContext.Provider value={{tabs, modifyTab}}>
        {props.children}
    </channelsMonitoringContext.Provider>
}

export default ChannelsMonitoringProvider