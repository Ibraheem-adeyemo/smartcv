import { setFiltersToShowProps } from "../models";

export enum filterDates {
    today = 'Today',
    thisWeek = 'This week',
    thisMonth = 'This Month',
    thisYear = 'This Year'
}

export const filtersToShowDefaultValue : setFiltersToShowProps = {
    showTenantFilter: false,
    showTodayFilter: false,
    showThisWeekFilter: false,
    showThisMonthFilter: false,
    showThisYearFilter: false,
    showCustomFilter: false
}