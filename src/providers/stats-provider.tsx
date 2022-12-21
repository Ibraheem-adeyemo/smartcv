import { createContext, FC, useContext } from "react";
import { AuthContext } from ".";
import { useFilter } from "../hooks";
import {
  ComponentWithChildren,
  DropdownContent,
  setFiltersToShowProps,
} from "../models";
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth =
  `${today.getMonth() + 1}`.length === 1
    ? `0${today.getMonth() + 1}`
    : `${today.getMonth() + 1}`;
const yesterdayDate =
  `${today.getDate() - 1}`.length === 1
    ? `0${today.getDate() - 1}`
    : `${today.getDate() - 1}`;
const thisDate =
  `${today.getDate()}`.length === 1
    ? `0${today.getDate()}`
    : `${today.getDate()}`;
const thisHour =
  `${today.getHours() + 1}`.length === 1
    ? `0${today.getHours() + 1}`
    : `${today.getHours() + 1}`;
const thisMinutes =
  `${today.getMinutes() + 1}`.length === 1
    ? `0${today.getMinutes() + 1}`
    : `${today.getMinutes() + 1}`;

export const StatsContext = createContext<ReturnType<typeof useFilter>>({
  searchText: "",
  selectedTenantCode: "0",
  institutions: undefined,
  institutionsError: undefined,
  ShowTenant: true,
  showCountInterval: false,
  showDuration: false,
  showEndDate: false,
  showStartDate: false,
  startTime: `${thisYear}-${thisMonth}-${yesterdayDate} ${thisHour}:${thisMinutes}:00.000`,
  endTime: `${thisYear}-${thisMonth}-${thisDate} 00:00:00.000`,
  dataDuration: '',
  countInterval: "hour",
  durationList: [],
  transactionPeriod: '',
  period: 0,
  changeSelectedTenantCode: (tenantCode: string) => {},
  handleSearchText: (tenantCode: string) => {},
  setFiltersToShow: (filtersToShow?: setFiltersToShowProps) => {},
  getSelectedStartDate: ({ date, time }: { date: string; time: string }) => {},
  getSelectedEndDate: ({ date, time }: { date: string; time: string }) => {},
  getSelectedEndTime: (time: Date) => {},
  onSelectedCountInterval: (e: DropdownContent) => {},
//   onSelectedDuration: (e: DropdownContent) => {},
});
interface StatsProviderProps extends ComponentWithChildren {}

const StatsProvider: FC<StatsProviderProps> = (props: StatsProviderProps) => {
  const { userDetail } = useContext(AuthContext);
  return (
    <StatsContext.Provider value={{ ...useFilter(userDetail) }}>
      {props.children}
    </StatsContext.Provider>
  );
};
export default StatsProvider;
