import { Flex, Tag, Text } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import { InstitutionFilter, CustomFilter, SearchFilter, SelectedSearchFilter  } from ".";
import { delayChildren } from "../../animations";
import { filterDates, selectionModeValues } from "../../constants";
import { StatsContext } from "../../providers";
import { AppCalendar } from "../app";
import { MotionFlex } from "../framer";

const AppBarFilter: FC = () => {
    const { ShowTenant, showStartDate, showEndDate, showCountInterval, showDuration, startTime, endTime, countInterval, durationList, getSelectedEndDate, getSelectedEndTime, getSelectedStartDate, onSelectedCountInterval, onSelectedDuration } = useContext(StatsContext)
    
    return (
        <MotionFlex alignItems="center" gap="17px" sx={{
            flexWrap: "wrap"
        }}
            animate="show"
            initial="hide"
            variants={delayChildren}
        >
            {ShowTenant && <InstitutionFilter />}
            {showStartDate && <AppCalendar label="Start Date" selectedDate={startTime.split(" ")[0]} selectedTime={startTime.split(" ")[1]} selectionMode={selectionModeValues.pickDateTime} getSelectedDate={getSelectedStartDate} />}
            {showEndDate && <AppCalendar label="End Date" selectedDate={endTime.split(" ")[0]} selectedTime={endTime.split(" ")[1]} selectionMode={selectionModeValues.pickDateTime} getSelectedDate={getSelectedEndDate} />}

            {/* <AppCalendar label="End Date" selectionMode={selectionModeValues.pickDateTime} getSelectedDate={({ date, time }) => {
                        // console.log({ date, time })
                        setEndTime(`${date} ${time}`)
                    }} /> */}
            {showCountInterval && <SelectedSearchFilter setEndTime={getSelectedEndTime} curEndDateTime={startTime} />}
            {/* {showCountInterval && <SearchFilter
                data={[
                    { label: "Hour", value: "hour", selected: countInterval == "hour" },
                    { label: "Minute", value: "minute", selected: countInterval == "minute" },
                ]
                } label="Interval" onSelected={onSelectedCountInterval} selected />}
            {showDuration && <SearchFilter
                data={durationList}
                label="Duration" onSelected={onSelectedDuration} selected />} */}
        </MotionFlex>
    )
}
export default AppBarFilter