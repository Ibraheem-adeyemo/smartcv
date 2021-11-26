import { useState } from "react";
import useSWR from "swr";
import { apiUrlsv1 } from "../constants";
import { TenantView } from "../models";

export default function useFilter () {
    const [selectedTenantCode, setSelectedTenantCode] = useState("0")
    const apiUrl = typeof window !== "undefined" ? apiUrlsv1.tenant : null
    const { data: institutions, mutate, error:institutionsError } = useSWR<TenantView[]>(apiUrl)
    const [searchText, setSearchText] = useState("")

    const handleSearchText = (searchText:string) =>  {
        setSearchText(searchText)
    } 
    const changeSelectedTenantCode = (tenantCode:string) => {
        // debugger
        setSelectedTenantCode(tenantCode)
    }

    return {
        searchText,
        selectedTenantCode,
        institutions,
        institutionsError,
        changeSelectedTenantCode,
        handleSearchText
    }
} 