import { Flex } from "@chakra-ui/layout";
import _ from "lodash";
import React, { useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable, SkeletonLoader } from "..";
import { BankAdminView, Paginate } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";


function BankAdminTable(_props: any) {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { data: bankAdmin, mutate, error } = useSWR<Paginate<BankAdminView, string>>(`/api/get-bank-admins?page=${pageNumber}&countPerPage=${countPerPage}`)
    const data = useMemo(() => ({
        columns: [
            {
                name: "Name",
                key: "firstName,lastName"
            }, {
                name: "Bank name",
                key: "bank"
            }, {
                name: "Email",
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
        data: bankAdmin?.data as BankAdminView[]
    }), [bankAdmin])

    useEffect(() => {
        if(typeof bankAdmin !== "undefined") {
            setPaginationProps(bankAdmin.totalData )
        }
    }, [bankAdmin])

    return (<AppTable<BankAdminView, string> columns={data?.columns} rows={data.data as BankAdminView[]} actions={data.actions} />)

}

export default function BankAdmin(_props: any) {
    return (

        <TableProvider>
            <BankAdminTable />
        </TableProvider>
    )
}