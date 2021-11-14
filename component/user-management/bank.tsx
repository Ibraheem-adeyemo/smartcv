import { Flex } from "@chakra-ui/layout";
import _ from "lodash";
import React, { useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable, SkeletonLoader } from "..";
import { BankView, Paginate } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";


function BankTable(_props: any) {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { data: bankAdmin, mutate, error } = useSWR<Paginate<BankView, string>>(`/api/get-banks?page=${pageNumber}&countPerPage=${countPerPage}`)
    const data = useMemo(() => ({
        columns: [
            {
                name: "Bank Logo",
                key: "bankLogo"
            }, {
                name: "Bank name",
                key: "name"
            }, {
                name: "Bank ID",
                key: "bankId"
            }, {
                name: "Address",
                key: "address"
            }, {
                name: "Date Created",
                key: "dateCreated"
            }, {
                name: "Bank Super Admin",
                key: "babnkSuperAdmin"
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
        data: bankAdmin?.data as BankView[]
    }), [bankAdmin])

    useEffect(() => {
        if(typeof bankAdmin !== "undefined") {
            setPaginationProps(bankAdmin.totalData )
        }
    }, [bankAdmin])

    return (<AppTable<BankView, string> columns={data?.columns} rows={data.data as BankView[]} actions={data.actions} />)

}

export default function Bank(_props: any) {
    return (

        <TableProvider>
            <BankTable />
        </TableProvider>
    )
}