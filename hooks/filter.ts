import { useState } from "react";
import useSWR from "swr";
import { apiUrlsv1, filterDates, filtersToShowDefaultValue } from "../constants";
import { setFiltersToShowProps, TenantView } from "../models";

export default function useFilter() {
    const [selectedTenantCode, setSelectedTenantCode] = useState("0")
    const [isToday, setIsToday] = useState(false)
    const [isThisWeek, setIsThisWeek] = useState(false)
    const [isThisMonth, setIsThisMonth] = useState(false)
    const [isThisYear, setIsThisYear] = useState(false)
    const [ShowTenant, setShowTenant] = useState(true)
    const [showToday, setShowToday] = useState(true)
    const [showThisWeek, setShowThisWeek] = useState(true)
    const [showThisMonth, setShowThisMonth] = useState(true)
    const [showThisYear, setShowThisYear] = useState(true)
    const [showCustom, setShowCustom] = useState(true)
    const apiUrl = typeof window !== "undefined" ? apiUrlsv1.tenant : null
    const { data: institutions, mutate, error: institutionsError } = useSWR<TenantView[]>(apiUrl)
    const [searchText, setSearchText] = useState("")

    const handleSearchText = (searchText: string) => {
        setSearchText(searchText)
    }

    const changeSelectedTenantCode = (tenantCode: string) => {
        // debugger
        setSelectedTenantCode(tenantCode)
    }

    const setFiltersToShow = ( filtersToshow: setFiltersToShowProps = filtersToShowDefaultValue) => {
        setShowTenant(filtersToshow.showTenantFilter as boolean)
        setShowToday(filtersToshow.showTodayFilter as boolean)
        setShowThisWeek(filtersToshow?.showThisWeekFilter as boolean)
        setShowThisMonth(filtersToshow.showThisMonthFilter as boolean)
        setShowThisYear(filtersToshow.showThisYearFilter as boolean)
        setShowCustom(filtersToshow.showCustomFilter as boolean)
    }

    const toggleDate = (datesFilter: string) => {
        switch (datesFilter) {
            case filterDates.today:
                setIsToday(true)
                setIsThisWeek(false)
                setIsThisMonth(false)
                setIsThisYear(false)
                break;
            case filterDates.thisWeek:
                setIsToday(false)
                setIsThisWeek(true)
                setIsThisMonth(false)
                setIsThisYear(false)
                break;
            case filterDates.thisMonth:
                setIsToday(false)
                setIsThisWeek(false)
                setIsThisMonth(true)
                setIsThisYear(false)
                break;
            case filterDates.thisYear:
                setIsToday(false)
                setIsThisWeek(false)
                setIsThisMonth(false)
                setIsThisYear(true)
                break;
            default:
                setIsToday(false)
                setIsThisWeek(false)
                setIsThisMonth(false)
                setIsThisYear(false)
        }
    }

    return {
        isToday,
        isThisWeek,
        isThisMonth,
        isThisYear,
        searchText,
        selectedTenantCode,
        institutions,
        institutionsError,
        ShowTenant,
        showToday,
        showThisWeek,
        showThisMonth,
        showThisYear,
        showCustom,
        changeSelectedTenantCode,
        handleSearchText,
        toggleDate,
        setFiltersToShow
    }
} 