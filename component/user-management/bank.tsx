import { useToast } from "@chakra-ui/react";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { apiUrlsv1, appTableElements, cookieKeys, cookiesTimeout, UserManagementModalNames } from "../../constants";
import { setCookie } from "../../lib";
import { TenantView, Paginate, UserManagementModal } from "../../models";
import { PaginatorProvider } from "../../provider";
import { PaginatorContext } from "../../provider/paginator-provider";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";
import { AppTable } from "../app";

const AddNewBank = dynamic(() =>import('./add-new-bank'))

const BankTable:FC = () => {
    // console.log({pageNumber})
    const toast = useToast()
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { modals ,handleToggleModal, mutateData} = useContext(UserManagementTabProviderContext)
    const {mutate} = useSWRConfig()
    const { data: tenant, mutate:_mutate, error } = useSWR<Paginate<TenantView>>(`${apiUrlsv1.tenant}?page=${pageNumber-1}&size=${countPerPage}`)

    const data = useMemo(() => ({
        columns: [
            {
                name: "Bank Logo",
                key: "image",
                ele: appTableElements.image
            }, {
                name: "Bank name",
                key: "name"
            }, {
                name: "Bank ID",
                key: "code"
            }, {
                name: "Address",
                key: "address"
            }, {
                name: "Date Created",
                key: "dateCreated"
            }, {
                name: "Bank Super Admin",
                key: "bankSuperAdmin"
            }, {
                name: "Status",
                key: "isActive",
                ele: appTableElements.status
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
        data: typeof tenant === "undefined" && typeof error === "undefined" ? tenant: (typeof tenant !== "undefined" && typeof error === "undefined" )?  tenant as unknown as TenantView[]:[]
    }), [tenant, error])

    useEffect(() => {
        if (typeof error !== "undefined") {
            toast({
                status: "error",
                title: typeof error.message === "undefined" ? error : error.message,
                variant: "left-accent",
                isClosable: true
            })
        }
    }, [error])

    useEffect(() => {
        if (typeof tenant !== "undefined" && typeof tenant.totalElements !== "undefined") {
            setCookie(cookieKeys.totalTenant, tenant.totalElements.toString(), cookiesTimeout.totalTenantTimeout)
            setPaginationProps(tenant.totalElements)
        }
    }, [tenant])

    useEffect(() => {
        
        // debugger
        const selectedModal = modals.some(x => x.isSubmitted)
        if(selectedModal) {
            mutateData(() => {
                // debugger
                mutate(`${apiUrlsv1.tenant}?page=${pageNumber-1}&size=${countPerPage}`)
                handleToggleModal()
            })
        }
    }, [modals])

    return (<AppTable<TenantView> columns={data?.columns} rows={data.data as TenantView[]} actions={data.actions} showNumbering />)

}

const Bank:FC = () => {
    const { modals } = useContext(UserManagementTabProviderContext)
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>()

    useEffect(() => {
        const modal = modals.find((x, i) => x.name === UserManagementModalNames.addNewBank)
        setSelectedModal(modal)
    }, [modals])

    return (

        <PaginatorProvider>
            <>
                <BankTable />
                {typeof selectedModal !== "undefined" && selectedModal.isOpen ? <AddNewBank /> : <></>}
            </>
        </PaginatorProvider>
    )
}
export default Bank