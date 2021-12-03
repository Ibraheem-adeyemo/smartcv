import { useToast } from "@chakra-ui/react"
import _ from "lodash"
import React, { FC, useContext, useEffect } from "react"
import { SearchFilter } from "."
import { SkeletonLoader } from ".."
import { StatsContext } from "../../provider/stats-provider"

const InstitutionFilter:FC = () => {
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
                <SearchFilter
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
export default InstitutionFilter