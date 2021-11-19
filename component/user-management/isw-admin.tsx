import { useToast } from "@chakra-ui/react";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { apiUrls, UserManagementModalNames } from "../../constants";
import { ISWAdminView, Paginate, UserManagementModal } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";
import { AppTable } from "../app";

const AddNewUser = dynamic(() => import("./add-new-user"))
function ISWAdminTable(_props: any) {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { data: iswAdmin, mutate, error } = useSWR<Paginate<ISWAdminView>>(`${apiUrls.iswAdmin}?page=${pageNumber}&countPerPage=${countPerPage}`)
    const toast = useToast()
    
    const { modals ,handleToggleModal, mutateData} = useContext(UserManagementTabProviderContext)
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
        data: typeof iswAdmin !== "undefined" && typeof error ==="undefined"? iswAdmin?.data as ISWAdminView[]:[]
    }), [iswAdmin, error])

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
        if(typeof iswAdmin !== "undefined" && typeof iswAdmin.totalData !== "undefined") {
            setPaginationProps(iswAdmin.totalData )
        }
    }, [iswAdmin])

    

    useEffect(() => {
        
        debugger
        const selectedModal = modals.some(x => x.isSubmitted)
        if(selectedModal) {
            mutateData(() => {
                debugger
                mutate()
                handleToggleModal()
            })
        }
    }, [modals])



    return (<AppTable<ISWAdminView> columns={data?.columns} rows={data.data as ISWAdminView[]} actions={data.actions} />)

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