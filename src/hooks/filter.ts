import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import {
  apiUrlsv1,
  appRoles,
  filterDates,
  filtersToShowDefaultValue,
  hours,
  minutes,
} from "../constants";
import {
  DropdownContent,
  Paginate,
  setFiltersToShowProps,
  TenantView,
  UserModel,
} from "../models";

import { getCurrentTime } from "../lib";

export default function useFilter(user?: UserModel) {
  const [selectedTenantCode, setSelectedTenantCode] = useState("0");
  const [ShowTenant, setShowTenant] = useState(true);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showCountInterval, setShowCountInterval] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  // debugger
  const apiUrl =
    typeof window !== "undefined" &&
    user &&
    user.role.name === appRoles.superAdmin
      ? apiUrlsv1.tenant
      : null;

  const {
    data: institutions,
    mutate,
    error: institutionsError,
  } = useSWR<Paginate<TenantView>>(apiUrl);
  const [searchText, setSearchText] = useState("");

//   enum PeriodEnum { 'Day' }

//   const selectedInterval = ;
  const [countInterval, setCountInterval] = useState("Today");
  const dateFrom = countInterval === 'Today'? 1: countInterval === 'Week'? 7 : 365
  const today = new Date();
  const thisYear = today.getFullYear();
  const [ transactionPeriod, setTransactionPeriod] = useState("Daily")
  const thisMonth =
    `${today.getMonth() + 1}`.length === 1
      ? `0${today.getMonth() + 1}`
      : `${today.getMonth() + 1}`;
  const sampEndDate = (() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - dateFrom)
  })()
  const yesterdayDate =
    `${today.getDate() - 1}`.length === 1
      ? `0${today.getDate() - 1}`
      : `${today.getDate() - 1}`;
  const thisDate =
    `${today.getDate()}`.length === 1
      ? `0${today.getDate()}`
      : `${today.getDate()}`;
//   const selectedDuration = 24;
  const completeEndDate = `${thisYear}-${thisMonth}-${thisDate}`;
  const completeEndTime = `${getCurrentTime()}`;
  const [startTime, setStartTime] = useState(
    `${sampEndDate.getFullYear()}-${sampEndDate.getMonth()+1}-${sampEndDate.getDate()} ${getCurrentTime()}`
  );
  const [endTime, setEndTime] = useState(
    `${completeEndDate} ${completeEndTime}`  
  );
  const [period, SetPeriod] = useState(1);
//   const [duration, setDuration] = useState(selectedDuration);
const [dataDuration, setdataDuration] = useState(period > 1 ? `Last ${period} days` : "Last 24 Hours")

useEffect(() => {
    setStartTime(
    `${sampEndDate.getFullYear()}-${sampEndDate.getMonth()+1}-${sampEndDate.getDate()} ${getCurrentTime()}`
  )
}, [dateFrom])

useEffect(() => {
    setdataDuration(period > 1 ? `Last ${period} days` : "Last 24 Hours");
}, [period])
  
  const [durationList, setDurationList] = useState(
    hours.map((x, i) => ({
      label: x,
      value: x,
      selected: i === 2,
    }))
  );
  const handleSearchText = (searchText: string) => {
    setSearchText(searchText);
  };

  const changeSelectedTenantCode = (tenantCode: string) => {
    setSelectedTenantCode(tenantCode);
  };

  const setFiltersToShow = useCallback(
    (filtersToshow: setFiltersToShowProps = filtersToShowDefaultValue) => {
      // debugger
      setShowTenant(filtersToshow.showTenantFilter as boolean);
      setShowStartDate(filtersToshow.showStartDateFilter as boolean);
      setShowEndDate(filtersToshow.showEndDateFilter as boolean);
      setShowCountInterval(filtersToshow.showCountIntervalFilter as boolean);
      setShowDuration(filtersToshow.showDurationFilter as boolean);
    },
    []
  );
  const getSelectedStartDate = useCallback(
    ({ date, time }: { date: string; time: string }) => {
      setStartTime(`${date} ${time}`);
    },
    []
  );
  const getSelectedEndDate = useCallback(
    ({ date, time }: { date: string; time: string }) => {
      setEndTime(`${date} ${time}`);
    },
    []
  );

  const onSelectedCountInterval = useCallback((e: DropdownContent) => {
    setTransactionPeriod(e.interval?e.interval:'')
    setCountInterval(e.value);
  }, []);
//   const onSelectedDuration = useCallback((e: DropdownContent) => {
//     setDuration(e.value);
//   }, []);

  const getSelectedEndTime = useCallback((tim: Date) => {
    const completeEndDate = `${tim.getFullYear()}-${
      tim.getMonth() + 1
    }-${tim.getDate()}`;
    setEndTime(`${completeEndDate} ${getCurrentTime(tim)}`);
  }, []);

  useEffect(() => {
    const dayDifference =
      new Date(endTime).valueOf() - new Date(startTime).valueOf();
    SetPeriod(Math.round(dayDifference / 1000 / 60 / 60 / 24));
  }, [startTime, endTime]);
  useEffect(() => {
    // debugger
    if (countInterval) {
      switch (countInterval) {
        case "hour":
          setDurationList(
            hours.map((x, i) => ({
              label: x,
              value: x,
              selected: i === 2,
            }))
          );
          break;
        case "minute":
          setDurationList(
            minutes.map((x, i) => ({
              label: x,
              value: x,
              selected: i === 2,
            }))
          );
          break;
      }
    }
  }, [countInterval, endTime]);

  return {
    searchText,
    selectedTenantCode,
    institutions: institutions
      ? institutions.content
      : user && user?.role.name !== appRoles.superAdmin
      ? [user.tenant]
      : undefined,
    institutionsError,
    ShowTenant,
    showStartDate,
    showCountInterval,
    showEndDate,
    showDuration,
    startTime,
    endTime,
    dataDuration,
    transactionPeriod,
    countInterval,
    durationList,
    period,
    changeSelectedTenantCode,
    handleSearchText,
    setFiltersToShow,
    getSelectedStartDate,
    getSelectedEndTime,
    getSelectedEndDate,
    onSelectedCountInterval,
    // onSelectedDuration,
  };
}
