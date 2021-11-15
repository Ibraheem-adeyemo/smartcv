import { Flex } from "@chakra-ui/layout";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { AppTable, SkeletonLoader } from "..";
import { UserManagementModalNames } from "../../constants";
import { ISWAdminView, Paginate, UserManagementModal } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";

const AddNewUser = dynamic(() => import("./add-new-user"))
function ISWAdminTable(_props: any) {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { data: iswAdmin, mutate, error } = useSWR<Paginate<ISWAdminView, string>>(`/api/get-isw-admins?page=${pageNumber}&countPerPage=${countPerPage}`)

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
        if (typeof iswAdmin !== "undefined") {
            setPaginationProps(iswAdmin.totalData)
        }
    }, [iswAdmin])



    return (<AppTable<ISWAdminView, string> columns={data?.columns} rows={data.data as ISWAdminView[]} actions={data.actions} />)

}

export default function ISWAdmin(_props: any) {
    const { modals } = useContext(UserManagementTabProviderContext)
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>()

    useEffect(() => {
        const modal = modals.find((x, i) => x.name === UserManagementModalNames.addNewUser)
        setSelectedModal(modal)
    }, [modals])

    return (

        <TableProvider>
            <>
                <ISWAdminTable />
                {typeof selectedModal !== "undefined" && selectedModal.isOpen ? <AddNewUser /> : <></>}
            </>
        </TableProvider>
    )
}