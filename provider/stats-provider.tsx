import { createContext, FC } from "react";
import { useFilter } from "../hooks";
import { ComponentWithChildren } from "../models";

export const StatsContext = createContext<ReturnType<typeof useFilter>>({
    searchText:"",
    selectedTenantCode:"0",
    institutions:undefined,
    institutionsError:undefined,
    changeSelectedTenantCode: (tenantCode:string) => {},
    handleSearchText:(tenantCode:string) => {}
})
interface StatsProviderProps extends ComponentWithChildren {

}
const StatsProvider:FC<StatsProviderProps> = (props: StatsProviderProps) => {
    return (
        <StatsContext.Provider value={{...useFilter()}}>
            {props.children}
        </StatsContext.Provider>
    )
}
export default StatsProvider