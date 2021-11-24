import { createContext } from "react";
import { useDashboard } from "../hooks";
import { ComponentWithChildren } from "../models";

export const StatsContext = createContext<ReturnType<typeof useDashboard>>({
    selectedTenantCode:"0",
    institutions:undefined,
    institutionsError:undefined,
    changeSelectedTenantCode: (tenantCode:string) => {}
})
interface StatsProviderProps extends ComponentWithChildren {

}
export default function StatsProvider(props: StatsProviderProps) {
    return (
        <StatsContext.Provider value={{...useDashboard()}}>
            {props.children}
        </StatsContext.Provider>
    )
}