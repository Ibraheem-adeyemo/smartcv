import { toast, useToast } from "@chakra-ui/react"
import { useToken } from "@chakra-ui/system"
import _ from "lodash"
import React, { useEffect, useMemo } from "react"
import useSWR from "swr"
import { DropdownSearchFilter } from "."
import { SkeletonLoader } from ".."
import { apiUrls, Banks } from "../../constants"
import { TenantView } from "../../models"

export default function (_props: any) {
    const apiUrl = typeof window !== "undefined" ? apiUrls.tenant : null
    const { data: institutions, mutate, error } = useSWR<TenantView[]>(apiUrl)
    const Filter = useMemo(() => DropdownSearchFilter, [])
    const toast = useToast()
    useEffect(() => {
        if (typeof error !== "undefined") {
            toast({
                title: error,
                status: "error",
                isClosable: true,
                variant: "left-accent"
            })
        }
    }, [error])

    return (
        <>
            { typeof institutions !== "undefined" &&
                <Filter
                    data={

                        [
                            { label: "All", value: "All", selected: true },
                            ..._.map(institutions, (x, i) => ({ label: x.name, value: x.name, selected: false }))
                        ]
                    } label="Institution" />
            }
            {
                typeof institutions === "undefined" && typeof error === "undefined" && <SkeletonLoader rows={1} columns={1} width="100px" height="30px" />
            }
        </>
    )
}