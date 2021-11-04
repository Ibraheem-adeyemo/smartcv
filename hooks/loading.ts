import { useEffect, useMemo, useState } from "react";
import { defaultCallback, defaultCallbackInitiator, Loading } from "../models";
type  UseLoadingReturn = [Loading, defaultCallbackInitiator<Loading>]
export default function useLoading(initialData?: Loading) : UseLoadingReturn {

    const [loading, setLoading] = useState<Loading>({isLoading:false, text:""})

    useMemo(() => {

        setLoading(prev => ({
            ...prev,
            isLoading: typeof initialData !== "undefined"? initialData.isLoading:false,
            text: typeof initialData !== "undefined"? initialData.text:""
        }))
    },[])

    const changeOnboarding = (callback:defaultCallback<Loading> | Loading) => {
        // debugger
        setLoading(callback)
    }
    return [loading, changeOnboarding]
}