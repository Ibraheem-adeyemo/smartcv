import { FC, useState } from "react"

type selectionModeType = "pick-date" | "pick-date-time"
type getSelectedDateFunc = () =>({date: string, time: string})
interface AppCalendarProps {
    selectedDate: string,
    selectionMode: selectionModeType
    getSelectedDate: getSelectedDateFunc
}

/**
 * 
 * @param {string} date - yyyy-mm-dd
 */
function getCalenderDate (date: string) {
    const sDate = new Date(date)
    const cArray: number[][] = []
    const ld = new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0)
    for(let i = 1; i <= ld.getDate(); i++) {
        const f = new Date(sDate.getFullYear(), sDate.getMonth() + 1, i)
        const day = f.getDay();
        if(i === 1) {
            cArray[0][day] = f.getDate()
            continue;
        }
        cArray.length
    }
}

const AppCalendar:FC<AppCalendarProps> = (props:AppCalendarProps) => {
    const [selectedDate, setSelectedDate] = useState(props.selectedDate)
    return (<></>)
}

export default AppCalendar