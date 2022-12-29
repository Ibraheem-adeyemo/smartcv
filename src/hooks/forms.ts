import { useCallback, useEffect, useState } from "react"
import { formType } from "../models"

export default function useForm<T extends Record< keyof T, T[keyof T]>>(initialModel: T) {

    const [form, setForm] = useState<T & formType>()
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        if (refresh) {
            setForm({ ...initialModel, completed: false, postUrl: "" })
            setRefresh(false)
        }


    }, [refresh])

    const formOnChange = useCallback((value: Record<keyof T & formType, any>) => {
      
        setForm((prev) => ({
            ...prev as T & formType,
            ...value
        }))
    }, [])

    const refreshForm = useCallback(() => {
        setRefresh(prev => !prev)
    }, [])

    return { form, formOnChange, refreshForm }
}