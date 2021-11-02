import _ from "lodash";
import { useEffect, useState } from "react";
import { Validation } from "../models";


export default function useValidator<T>() {
    const [validation, setValidation] = useState<Validation<T>>()

    const [data, setData] = useState<T>();
    const [field, setField] = useState<keyof T>();
    // debugger
    useEffect(() => {
        // debugger
        if (typeof field !== "undefined") {
            if (field !== "" && typeof data !== "undefined") {
                if (String(data[field as keyof T]) as string === "") {
                    setValidation((prev) => {
                        // debugger
                        const s = _.clone(prev) as Validation<T>
                        if (typeof s !== "undefined") {

                            s.errors[field as keyof T] = "This field canot be empty" as any
                            s.touched[field as keyof T] = "touched" as any

                            return s
                        } else {
                            return {
                                errors: {
                                    [field as keyof T]: "This field canot be empty" as any
                                },
                                touched: {
                                    [field as keyof T]: "touched" as any
                                }
                            } as Validation<T>
                        }
                    })
                } else if (String(data[field as keyof T]) as string !== "") {
                    setValidation((prev) => {
                        const s = _.clone(prev) as Validation<T>
                        if (typeof s !== "undefined") {
                            s.errors[field as keyof T] = "" as any
                            s.touched[field as keyof T] = "touched" as any
                        }

                        return s

                    })
                    // setData(undefined)
                    // setField(undefined)
                }
            }
        }
        return () => {
            if (typeof field !== "undefined") {
                setField(undefined)
            }
            if(typeof data !== "undefined") {
                
                setData(undefined)
            }
        }
    }, [data])

    return { validation, setData, setField }

}