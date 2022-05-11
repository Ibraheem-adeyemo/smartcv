import { HStack } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import { MyDatePicker } from "../DatePicker";

interface SearchTextProps {
    handleDateSearch: (start:string, end:string)=>void,
}
const DateRangeSearch:FC<SearchTextProps> = (props:SearchTextProps) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDateChange = (date:string, name:string) => {
        if(name === 'start date') {
            setStartDate(date)
        } else if (name === 'end date'){
            setEndDate(date)
            if(startDate && date) {
                props.handleDateSearch(startDate, date)
            }
        }
    }
    return (
        <HStack>
            <MyDatePicker handleDateChange={handleDateChange} placeHolder="start Date" name='start date' />
            <MyDatePicker handleDateChange={handleDateChange} placeHolder="End Date" name='end date' />

        </HStack>
    )
}
export default DateRangeSearch