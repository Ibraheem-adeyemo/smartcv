import { useToast } from "@chakra-ui/react";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { apiUrlsv1, appTableElements, cookieKeys, cookiesTimeout, UserManagementModalNames } from "../../constants";
import { setCookie } from "../../lib";
import { ISWAdminView, Paginate, UserManagementModal } from "../../models";
import { PaginatorProvider, PaginatorContext, UserManagementTabProviderContext, AuthContext } from "../../providers";
import { AppTable } from "../app";
import AddNewRole from "./add-new-role";

const AddNewUser = dynamic(() => import("./add-new-user"), {ssr:false})
const ISWAdminTable:FC = () => {
    // console.log({pageNumber})
    const {token} = useContext(AuthContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const {mutate} = useSWRConfig()
    const url = token? `url ${apiUrlsv1.iswAdmin}?page=${pageNumber-1}&countPerPage=${countPerPage}`:null
    const { data: iswAdmin, mutate:_mutate, error } = useSWR<Paginate<ISWAdminView>>(null)
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
                key: "status",
                ele:appTableElements.status
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
        data: typeof iswAdmin === "undefined" && typeof error === "undefined"? iswAdmin: typeof iswAdmin !== "undefined" && typeof error ==="undefined"? iswAdmin?.content as ISWAdminView[]:[]
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
        if(typeof iswAdmin !== "undefined" && typeof iswAdmin.totalElements !== "undefined") {
            setCookie(cookieKeys.totalISWAdmin, iswAdmin.totalElements.toString(), cookiesTimeout.totalISWAdminTimeout)
            setPaginationProps(iswAdmin.totalElements )
        }
    }, [iswAdmin])

    

    useEffect(() => {
        
      
        const selectedModal = modals.some(x => x.isSubmitted)
        if(selectedModal) {
            mutateData(() => {
              
                mutate(`${apiUrlsv1.iswAdmin}?page=${pageNumber-1}&countPerPage=${countPerPage}`)
                handleToggleModal()
            })
        }
    }, [modals])



    return (<AppTable<ISWAdminView> columns={data?.columns} rows={data.data as ISWAdminView[]} actions={data.actions} showNumbering />)

}

const ISWAdmin:FC = () => {
    const { modals } = useContext(UserManagementTabProviderContext)
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>()

    useEffect(() => {
        const modal = modals.find((x, i) => (x.name === UserManagementModalNames.addNewUser || x.name === UserManagementModalNames.addNewRole) && x.isOpen )
        // debugger
        setSelectedModal(modal)
    }, [modals])

    return (

        <PaginatorProvider>
            <>
                <ISWAdminTable />
            {typeof selectedModal !== "undefined" && selectedModal.isOpen && selectedModal.name === UserManagementModalNames.addNewUser && <AddNewUser />}
            {typeof selectedModal !== "undefined" && selectedModal.isOpen && selectedModal.name === UserManagementModalNames.addNewRole && <AddNewRole />}
            </>
        </PaginatorProvider>
    )
}
export default ISWAdmin