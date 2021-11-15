import { useEffect, useMemo, useState } from "react"
import { formType } from "../models"

export default function useForm<T extends Record<keyof T, any>>(initialModel: T) {

    const [form, setForm] = useState<T & formType>()
    const [refresh, setRefresh] = useState(true)
    useMemo(() => {
        if (refresh) {
            setForm({ ...initialModel, completed: false, postUrl: "" })
            setRefresh(false)
        }


    }, [refresh])

    useEffect(() => {
        console.log({ form })
    }, [form])
    const formOnChange = (value: Record<keyof T & formType, any>) => {
        // debugger
        setForm((prev) => ({
            ...prev as T & formType,
            ...value
        }))
    }

    const refreshForm = () => {
        setRefresh(prev => !prev)
    }

    return { form, formOnChange, refreshForm }
}