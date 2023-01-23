import { Flex, Box } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import { InstitutionFilter, CustomFilter, SearchFilter, SelectedSearchFilter  } from ".";
import { delayChildren } from "../../animations";
import { filterDates, selectionModeValues } from "../../constants";
import { StatsContext } from "../../providers";
import { AppCalendar } from "../app";
import { MotionFlex } from "../framer";

const AppBarFilter: FC = () => {
    const { ShowTenant, showStartDate, showEndDate, showCountInterval, showDuration, startTime, endTime, countInterval, durationList, getSelectedEndDate, getSelectedEndTime, getSelectedStartDate, onSelectedCountInterval } = useContext(StatsContext)

    const intervals = ['Daily', 'Weekly', 'Monthly', 'Yearly']
    
    return (
        <MotionFlex alignItems="center" gap="17px" justifyContent='space-between'
            animate="show"
            initial="hide"
            variants={delayChildren}
            width='100%'
        >
            {ShowTenant && <InstitutionFilter />}
            {/* {showStartDate && <AppCalendar label="Start Date" selectedDate={startTime.split(" ")[0]} selectedTime={startTime.split(" ")[1]} selectionMode={selectionModeValues.pickDateTime} getSelectedDate={getSelectedStartDate} />}
            {showEndDate && <AppCalendar label="End Date" selectedDate={endTime.split(" ")[0]} selectedTime={endTime.split(" ")[1]} selectionMode={selectionModeValues.pickDateTime} getSelectedDate={getSelectedEndDate} />} */}

            {/* <AppCalendar label="End Date ==2" selectionMode={selectionModeValues.pickDateTime} getSelectedDate={({ date, time }) => {
                        // setEndTime(`${date} ${time}`)
                    }} />  */}
            {/* {showCountInterval && <SelectedSearchFilter setEndTime={getSelectedEndTime} curEndDateTime={startTime} />}
            {showCountInterval && <SearchFilter
                data={[
                    { label: "Hour", value: "hour", selected: countInterval == "hour" },
                    { label: "Minute", value: "minute", selected: countInterval == "minute" },
                ]
                } label="Interval" onSelected={onSelectedCountInterval} selected />} */}
            {/* {showDuration && <SearchFilter
                data={durationList}
                label="Duration" onSelected={onSelectedDuration} selected />} */}
            {showDuration && <SearchFilter
                data={[
                    { label: filterDates.today, value: 'Today', selected: countInterval == intervals[0], interval: intervals[0] },
                    { label: filterDates.thisWeek, value: 'Week', selected: countInterval == intervals[1], interval: intervals[1] },
                    { label: filterDates.thisMonth, value: 'Month', selected: countInterval == intervals[2], interval: intervals[2] },
                    { label: filterDates.thisYear, value: 'Year', selected: countInterval == intervals[3], interval: intervals[3] },
                ]}
                label="" onSelected={onSelectedCountInterval} showSearchInput={false} countInterval={countInterval} selected />}
        </MotionFlex>
    )
}
export default AppBarFilter