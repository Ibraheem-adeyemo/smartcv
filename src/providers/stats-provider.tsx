import { createContext, FC, useContext } from "react";
import { AuthContext } from ".";
import { useFilter } from "../hooks";
import { ComponentWithChildren, setFiltersToShowProps } from "../models";

export const StatsContext = createContext<ReturnType<typeof useFilter>>({
    isToday:true,
    isThisWeek:false,
    isThisMonth: false,
    isThisYear:false,
    searchText:"",
    selectedTenantCode:"0",
    institutions:undefined,
    institutionsError:undefined,
    ShowTenant:true,
    showToday:true,
    showThisWeek:true,
    showThisMonth:true,
    showThisYear:true,
    showCustom:true,
    changeSelectedTenantCode: (tenantCode:string) => {},
    handleSearchText:(tenantCode:string) => {},
    toggleDate: (datesFilter:string) => {},
    setFiltersToShow: (filtersToShow?:setFiltersToShowProps) => {}
})
interface StatsProviderProps extends ComponentWithChildren {

}
const StatsProvider:FC<StatsProviderProps> = (props: StatsProviderProps) => {
    const {userDetail} = useContext(AuthContext)
    return (
        <StatsContext.Provider value={{...useFilter(userDetail)}}>
            {props.children}
        </StatsContext.Provider>
    )
}
export default StatsProvider