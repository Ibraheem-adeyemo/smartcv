import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { TenantAdminView, Paginate, UserManagementModal} from "../../models";
import { PaginatorProvider, PaginatorContext, UserManagementTabProviderContext } from "../../providers";
import { useToast } from "@chakra-ui/react";
import { apiUrlsv1, appTableElements, cookieKeys, cookiesTimeout, UserManagementModalNames } from "../../constants";
import { setCookie } from "../../lib";
import { AddNewBank, AddNewUser } from ".";
import AddNewRole from "./add-new-role";


const BankAdminTable:FC = () => {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
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
                ele: appTableElements.dateTime
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
            setCookie(cookieKeys.totalTenantAdmin, tenantAdmin.totalElements.toString(), cookiesTimeout.totalTenantAdminTimeout)
            setPaginationProps(tenantAdmin.totalElements )
        }
    }, [tenantAdmin])


    return (<AppTable<TenantAdminView> columns={data?.columns} rows={data.data as TenantAdminView[]} actions={data.actions} showNumbering />)

}

const TenantAdmin:FC = () => {
    const { modals } = useContext(UserManagementTabProviderContext)
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>()

    useEffect(() => {
        const modal = modals.find((x, i) => (x.name === UserManagementModalNames.addNewUser || x.name === UserManagementModalNames.addNewRole) && x.isOpen )
        setSelectedModal(modal)
    }, [modals])

    return (

        <PaginatorProvider>
            <BankAdminTable />
            {typeof selectedModal !== "undefined" && selectedModal.isOpen && selectedModal.name === UserManagementModalNames.addNewUser && <AddNewUser />}
            {typeof selectedModal !== "undefined" && selectedModal.isOpen && selectedModal.name === UserManagementModalNames.addNewRole && <AddNewRole />}
        </PaginatorProvider>
    )
}
export default TenantAdmin