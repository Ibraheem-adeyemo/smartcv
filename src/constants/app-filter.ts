import { setFiltersToShowProps } from "../models";

export enum filterDates {
    today = 'Today',
    thisWeek = 'This week',
    thisMonth = 'This Month',
    thisYear = 'This Year'
}

export const filtersToShowDefaultValue : setFiltersToShowProps = {
    showTenantFilter: false,
    showStartDateFilter: false,
    showEndDateFilter: false,
    showCountIntervalFilter: false,
    showDurationFilter: false
}