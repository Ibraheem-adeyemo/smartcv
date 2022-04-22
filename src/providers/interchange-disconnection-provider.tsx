import { createContext, FC } from "react";
import { InterchangeDisconnectionModals, interchangeDisconnectionTabs } from "../constants";
import { useInterchangeDisconnection } from "../hooks";
import { ComponentWithChildren, interchangeDisconnectionTab } from "../models";

export const InterchangeDisconnectionContext = createContext<ReturnType<typeof useInterchangeDisconnection>>({
    tabs: interchangeDisconnectionTabs as interchangeDisconnectionTab[],
    modals:InterchangeDisconnectionModals,
    modifyTab: () => {},
    handleToggleModal: () => {}
})

interface InterchangeDisconnectionTProviderProps extends ComponentWithChildren  {
    
}

const InterchangeDisconnectionProvider:FC<InterchangeDisconnectionTProviderProps> = (props: InterchangeDisconnectionTProviderProps) => {

    return <InterchangeDisconnectionContext.Provider value={useInterchangeDisconnection()}>
        {props.children}
    </InterchangeDisconnectionContext.Provider>
}

export default InterchangeDisconnectionProvider