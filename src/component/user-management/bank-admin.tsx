import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { TenantAdminView, Paginate, UserManagementModal} from "../../models";
import { PaginatorProvider, PaginatorContext, UserManagementTabProviderContext, AuthContext, StatsContext } from "../../providers";
import { useToast } from "@chakra-ui/react";
import { apiUrlsv1, appRoles, appTableElements, cookieKeys, cookiesTimeout, UserManagementModalNames } from "../../constants";
import { setCookie } from "../../lib";
import { AddNewBank, AddNewUser, ResendUserActivationMail } from ".";
import AddNewRole from "./add-new-role";


const BankAdminTable:FC = () => {

    const { token, userDetail } = useContext(AuthContext)
    const { selectedTenantCode } = useContext(StatsContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    
    const [selectedUser, setSelectedUser] = useState<TenantAdminView>()
    const [openModal, setOpenModal] = useState(false)
    let url = apiUrlsv1.tenantAdmin
    if (userDetail && ( userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && ( userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
        if(userDetail.role.name !== appRoles.superAdmin){
            url = `${url}/${userDetail.tenant.code}`
          } else if(userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0")  {
            url = `${url}${selectedTenantCode}`
          }
    }
    url += `?page=${pageNumber-1}&size=${countPerPage}`
    url = token && userDetail?url: ""
    const { data: tenantAdmin, mutate, error } = useSWR<Paginate<TenantAdminView>>(url === "" ? null : url)
    const toast = useToast()
    const data = useMemo(() => ({
        columns: [{
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
                key: "active",
                ele: appTableElements.status
            }
        ],
        actions: [
            {
                name: "Resend verification Mail",
                icons: {
                    use: true
                },
                method: (x: TenantAdminView) => {
                    setOpenModal(true)
                    setSelectedUser(x)
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
    return (<>
    <AppTable<TenantAdminView> columns={data?.columns} rows={data.data as TenantAdminView[]} showNumbering />
    
    <ResendUserActivationMail isLoggedIn={true} user={selectedUser} isOpen={openModal} closeModal={function (): void {
            setSelectedUser(undefined)
            setOpenModal(false)
        } } />
    </>)

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
            {selectedModal && selectedModal.isOpen && selectedModal.name === UserManagementModalNames.addNewUser && <AddNewUser />}
            {selectedModal && selectedModal.isOpen && selectedModal.name === UserManagementModalNames.addNewRole && <AddNewRole />}
        </PaginatorProvider>
    )
}
export default TenantAdmin