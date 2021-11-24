import { toast, useToast } from "@chakra-ui/react"
import { useToken } from "@chakra-ui/system"
import _ from "lodash"
import React, { useContext, useEffect, useMemo } from "react"
import useSWR from "swr"
import { DropdownSearchFilter as Filter } from "."
import { SkeletonLoader } from ".."
import { apiUrlsv1, Banks } from "../../constants"
import { TenantView } from "../../models"
import { StatsContext } from "../../provider/stats-provider"

export default function (_props: any) {
    const {selectedTenantCode, institutions, institutionsError, changeSelectedTenantCode} = useContext(StatsContext)
    const toast = useToast()
    useEffect(() => {
        if (typeof institutionsError !== "undefined") {
            toast({
                title: institutionsError,
                status: "error",
                isClosable: true,
                variant: "left-accent"
            })
        }
    }, [institutionsError])

    return (
        <>
            { typeof institutions !== "undefined" &&
                <Filter
                    data={

                        [
                            { label: "All", value: "0", selected: selectedTenantCode === "0" },
                            ..._.map(institutions, (x, i) => ({ label: x.name, value: x.code, selected: x.code === selectedTenantCode }))
                        ]
                    } label="Institution" onSelected={(e) => changeSelectedTenantCode(e.value)} />
            }
            {
                typeof institutions === "undefined" && typeof institutionsError === "undefined" && <SkeletonLoader rows={1} columns={1} width="100px" height="30px" />
            }
        </>
    )
}