import { createContext, FC } from "react";
import { interchangeDisconnectionTabs } from "../constants";
import { useInterchangeDisconnection } from "../hooks";
import { ComponentWithChildren, interchangeDisconnectionTab } from "../models";

const InterchangeDisconnectionTContext = createContext<ReturnType<typeof useInterchangeDisconnection>>({
    tabs: interchangeDisconnectionTabs as interchangeDisconnectionTab[],
    modifyTab: () => {}
})

interface InterchangeDisconnectionTProviderProps extends ComponentWithChildren  {
    
}

const InterchangeDisconnectionProvider:FC<InterchangeDisconnectionTProviderProps> = (props: InterchangeDisconnectionTProviderProps) => {

    return <InterchangeDisconnectionTContext.Provider value={useInterchangeDisconnection()}>
        {props.children}
    </InterchangeDisconnectionTContext.Provider>
}

export default InterchangeDisconnectionProvider