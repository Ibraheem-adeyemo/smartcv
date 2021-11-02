import { useEffect, useMemo, useState } from "react"

type formType = {
    completed?: boolean,
    postUrl?: string
}

export default function useForm<T extends Record<keyof T, any>>(initialModel: T) {

    const [form, setForm] = useState<T & formType>()

    useMemo(() => setForm(initialModel) ,[])

    return {
        form,
        setForm
    }
}