import { useState } from "react";
import useSWR from "swr";
import { apiUrlsv1 } from "../constants";
import { TenantView } from "../models";

export default function useChannelsMonitoring () {
    const [selectedTenantCode, setSelectedTenantCode] = useState("0")
    const apiUrl = typeof window !== "undefined" ? apiUrlsv1.tenant : null
    const { data: institutions, mutate, error:institutionsError } = useSWR<TenantView[]>(apiUrl)

    const changeSelectedTenantCode = (tenantCode:string) => {
      
        setSelectedTenantCode(tenantCode)
    }

    return {
        selectedTenantCode,
        institutions,
        institutionsError,
        changeSelectedTenantCode
    }
} 