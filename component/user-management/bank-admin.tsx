import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { TenantAdminView, Paginate, APIResponse } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";
import { useToast } from "@chakra-ui/react";
import { apiUrlsv1, cookies } from "../../constants";
import { setCookie } from "../../lib";


const BankAdminTable:FC = () => {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { data: tenantAdmin, mutate, error } = useSWR<Paginate<TenantAdminView>>(`${apiUrlsv1.tenantAdmin}?page=${pageNumber-1}&countPerPage=${countPerPage}`)
    const toast = useToast()
    const data = useMemo(() => ({
        columns: [
            {
                name: "Name",
                key: "firstName,lastName"
            }, {
                name: "Bank name",
                key: "tenant.name"
            }, {
                name: "Email",
                key: "email"
            }, {
                name: "Date Created",
                key: "createdAt",
                ele: "datetime"
            }, {
                name: "Status",
                key: "isActive",
                ele: "status"
            }
        ],
        actions: [
            {
                name: "Edit",
                icons: {
                    use: true
                },
                method: () => {
                    alert("Edit")
                }
            },
            {
                name: "Delete",
                icons: {
                    use: true,
                },
                method: () => {
                    alert("Delete")
                }
            },
            {
                name: "View",
                icons: {
                    use: true
                },
                method: () => {
                    alert("View")
                }
            },
        ],
        data: typeof tenantAdmin === "undefined" && typeof error ==="undefined"? tenantAdmin: typeof tenantAdmin !== "undefined" && typeof error ==="undefined" ? tenantAdmin?.content as TenantAdminView[]:[]
    }), [tenantAdmin, error])

    useEffect(() => {
        if(typeof error !== "undefined") {
            toast({
                status:"error",
                title: typeof error.message === "undefined"? error:error.message,
                variant:"left-accent",
                isClosable:true
            })
        }
    }, [error])
    useEffect(() => {
        if(typeof tenantAdmin !== "undefined" && typeof tenantAdmin.totalElements !== "undefined") {
            setCookie(cookies.totalTenantAdmin, tenantAdmin.totalElements.toString(), 10)
            setPaginationProps(tenantAdmin.totalElements )
        }
    }, [tenantAdmin])


    return (<AppTable<TenantAdminView> columns={data?.columns} rows={data.data as TenantAdminView[]} actions={data.actions} />)

}

const TenantAdmin:FC = () => {
    return (

        <TableProvider>
            <BankAdminTable />
        </TableProvider>
    )
}
export default TenantAdmin