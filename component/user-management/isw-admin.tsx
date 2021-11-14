import { Flex } from "@chakra-ui/layout";
import _ from "lodash";
import React, { useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable, SkeletonLoader } from "..";
import { BankAdminView, ISWAdminView, Paginate } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";


function ISWAdminTable(_props: any) {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { data: iswAdmin, mutate, error } = useSWR<Paginate<ISWAdminView, string>>(`/api/get-bank-admins?page=${pageNumber}&countPerPage=${countPerPage}`)
    const data = useMemo(() => ({
        columns: [
            {
                name: "Name",
                key: "firstName,lastName"
            }, {
                name: "Role",
                key: "role"
            }, {
                name: "Email Address",
                key: "email"
            }, {
                name: "Date Created",
                key: "dateCreated"
            }, {
                name: "Status",
                key: "status"
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
        data: iswAdmin?.data as ISWAdminView[]
    }), [iswAdmin])

    useEffect(() => {
        if(typeof iswAdmin !== "undefined") {
            setPaginationProps(iswAdmin.totalData )
        }
    }, [iswAdmin])

    return (<AppTable<ISWAdminView, string> columns={data?.columns} rows={data.data as ISWAdminView[]} actions={data.actions} />)

}

export default function ISWAdmin(_props: any) {
    return (

        <TableProvider>
            <ISWAdminTable />
        </TableProvider>
    )
}