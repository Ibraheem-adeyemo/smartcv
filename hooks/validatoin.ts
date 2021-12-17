import _ from "lodash";
import { useEffect, useState } from "react";
import { formType, Validation } from "../models";


export default function useValidator<T>(compulsoryField?: (keyof T)[]) {
    const [validation, setValidation] = useState<Validation<T>>()

    const [data, setData] = useState<Record<keyof T, T[keyof T]>>();
    const [field, setField] = useState<keyof T>();
    // debugger
    useEffect(() => {
        // debugger
        if (typeof field !== "undefined") {
            if (field !== "" && typeof data !== "undefined") {
                setValidation((prev) => {
                    // debugger
                    const s = _.clone(prev) as Validation<T>
                    if (typeof s !== "undefined") {
                        s.errors[field] = ""
                        s.touched[field] = "touched"
                    }
                    else {
                        
                        return {
                            errors: {
                                [field as keyof (T | formType)]:""
                            },
                            touched: {
                                [field as keyof (T | formType)]:"touched"
                            }
                        } as Validation<T>
                    }
                    return s
                    

                })
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
                }
            }
        }
        return () => {
            // if (typeof field !== "undefined") {
            //     setField(undefined)
            // }
            // if(typeof data !== "undefined") {
                
            //     setData(undefined)
            // }
        }
    }, [data])

    const addField = (value: keyof T) => {
        setField(value)
    }

    const inputData = (value: Record<keyof T, T[keyof T]>) => {
        setData(value)
    }

    const validateAllCompulsoryFields = () => {
        if(typeof compulsoryField !== "undefined" && typeof data !== "undefined") {
            const values = compulsoryField.map((x, i) => String(data[x])) 
            return !(values.findIndex(x => x === "") > - 1)
        }
        return true
    }

    return { validation, setData, setField, addField, inputData, validateAllCompulsoryFields }

}