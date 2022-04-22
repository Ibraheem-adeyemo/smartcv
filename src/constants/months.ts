import { range } from "lodash"

export enum MonthsEnum {
    January=0,
    Februrary=1,
    March=2,
    April=3,
    May=4,
    June=5,
    July=6,
    August=7,
    September=8,
    October=9,
    November=10,
    December=11
}

export const months: Readonly<string[]> = ["January", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export const days: Readonly<string[]> = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
export const hours: Readonly<string[]> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", ...range(10, 24).map(x => x.toString())]
export const minutes: Readonly<string[]> = [...hours, ...range(25, 60).map(x => x.toString())]
export const seconds: Readonly<string[]> = [...hours, ...range(25, 60).map(x => x.toString())]


export enum selectionModeValues {
    pickDate = "pick-date",
    pickDateTime = "pick-date-time"
}