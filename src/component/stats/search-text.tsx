import { HStack, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import { SearchIcon, selectionModeValues } from "../../constants";
import { StatsContext } from "../../providers";
import { AppCalendar } from "../app";
import { MyDatePicker } from "../DatePicker";

interface SearchTextProps {
    searchText:string,
    handleSearchItem: (searchText:string) => void,
    placeHolder:string,
    handleDateSearch: (start:string, end:string)=>void,
    dateRange: string[]
}
const SearchText:FC<SearchTextProps> = (props:SearchTextProps) => {
    const [text, setText] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const {getSelectedStartDate, showStartDate, showEndDate} = useContext(StatsContext)

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
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon />}
                />
                <Input borderRadius="26px" bgColor="white" placeholder={props.placeHolder} value={text} onChange={e => {
                    e.stopPropagation();
                    setText(e.target.value); 
                    props.handleSearchItem(e.target.value)}} />
            </InputGroup>
            <MyDatePicker handleDateChange={handleDateChange} placeHolder="start Date" name='start date' />
            <MyDatePicker handleDateChange={handleDateChange} placeHolder="End Date" name='end date' />

        </HStack>
    )
}
export default SearchText