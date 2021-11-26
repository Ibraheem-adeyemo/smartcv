import { useToast } from "@chakra-ui/react";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { apiUrlsv1, cookies, UserManagementModalNames } from "../../constants";
import { setCookie } from "../../lib";
import { TenantView, Paginate, UserManagementModal } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";
import { UserManagementTabProviderContext } from "../../provider/user-management-tab-provider";
import { AppTable } from "../app";

const AddNewBank = dynamic(() =>import('./add-new-bank'))

function BankTable(_props: any) {
    // console.log({pageNumber})
    const toast = useToast()
    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { modals ,handleToggleModal, mutateData} = useContext(UserManagementTabProviderContext)
    const { data: tenant, mutate, error } = useSWR<Paginate<TenantView>>(`${apiUrlsv1.tenant}?page=${pageNumber-1}&size=${countPerPage}`)

    const data = useMemo(() => ({
        columns: [
            {
                name: "Bank Logo",
                key: "image",
                ele: "image"
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
            setCookie(cookies.totalTenant, tenant.totalElements.toString(), 10)
            setPaginationProps(tenant.totalElements)
        }
    }, [tenant])

    useEffect(() => {
        
        // debugger
        const selectedModal = modals.some(x => x.isSubmitted)
        if(selectedModal) {
            mutateData(() => {
                // debugger
                mutate()
                handleToggleModal()
            })
        }
    }, [modals])

    return (<AppTable<TenantView> columns={data?.columns} rows={data.data as TenantView[]} actions={data.actions} />)

}

export default function Bank(_props: any) {
    const { modals } = useContext(UserManagementTabProviderContext)
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>()

    useEffect(() => {
        const modal = modals.find((x, i) => x.name === UserManagementModalNames.addNewBank)
        setSelectedModal(modal)
    }, [modals])

    return (

        <TableProvider>
            <>
                <BankTable />
                {typeof selectedModal !== "undefined" && selectedModal.isOpen ? <AddNewBank /> : <></>}
            </>
        </TableProvider>
    )
}