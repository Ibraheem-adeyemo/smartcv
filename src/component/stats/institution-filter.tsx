import { useToast } from "@chakra-ui/react"
import _, { map } from "lodash"
import React, { FC, useContext, useEffect, useState } from "react"
import { SearchFilter } from "."
import { SkeletonLoader } from ".."
import { superAdmin } from "../../constants"
import {  TenantView } from "../../models"
import { AuthContext, StatsContext } from "../../providers"

const InstitutionFilter:FC = () => {
    const {selectedTenantCode, institutions, institutionsError, changeSelectedTenantCode} = useContext(StatsContext)
    const toast = useToast()
    const [tenants, setTenant] = useState<TenantView[]>()
    const {userDetail} = useContext(AuthContext)
    useEffect(() => {
        // debugger
        if(userDetail?.role.name === superAdmin) {
            setTenant(institutions)
        } else if(userDetail) {
            
            setTenant([userDetail.tenant])
        }
    }, [institutions, userDetail])
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
            { typeof tenants !== "undefined" &&
                <SearchFilter
                    data={ tenants.length > 1?

                        [
                            { label: "All", value: "0", selected: selectedTenantCode === "0" },
                            ...map(tenants, (x, i) => ({ label: x.name, value: x.code, selected: x.code === selectedTenantCode }))
                        ]:[...map(tenants, (x, i) => ({ label: x.name, value: x.code, selected: x.code === selectedTenantCode }))]
                    } label="Institution" onSelected={(e) => changeSelectedTenantCode(e.value)} selected />
            }
            {
                typeof tenants === "undefined" && typeof institutionsError === "undefined" && <SkeletonLoader rows={1} columns={1} width="100px" height="20px" />
            }
        </>
    )
}
export default InstitutionFilter