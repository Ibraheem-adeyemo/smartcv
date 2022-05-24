import React, { Component } from 'react'

import {DatePicker} from 'chakra-ui-date-input'

interface MyDatePickerProps {
    handleDateChange: (date:string, name:string)=>void,
    placeHolder: string,
    name: string
}

export const MyDatePicker = (props:MyDatePickerProps) => {
    const { handleDateChange, placeHolder, name } = props
    return <DatePicker
              placeholder={placeHolder}
              name='date'
              onChange={(date) => handleDateChange(date, name)}
            />
}