import { useToast } from "@chakra-ui/react";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { apiUrlsv1, appRoles, appTableElements, cookieKeys, cookiesTimeout, UserManagementModalNames } from "../../constants";
import { setCookie } from "../../lib";
import { Action, ISWAdmView, Paginate, TenantAdminView, UserManagementModal } from "../../models";
import { PaginatorProvider, PaginatorContext, UserManagementTabProviderContext, AuthContext } from "../../providers";
import { AppTable } from "../app";
import AddNewRole from "./add-new-role";
import ResendUserActivationMail from "./resend-user-activation-mail";

const AddNewUser = dynamic(() => import("./add-new-user"), { ssr: false })
const ISWAdminTable: FC = () => {
    const { token, userDetail } = useContext(AuthContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { mutate } = useSWRConfig()
    const url = userDetail && userDetail.role.name === appRoles.superAdmin && token ? `${apiUrlsv1.iswAdmin}?page=${pageNumber - 1}&countPerPage=${countPerPage}` : null
    const { data: iswAdmin, mutate: _mutate, error } = useSWR<Paginate<ISWAdmView>>(url)
    const toast = useToast()
    const [selectedUser, setSelectedUser] = useState<ISWAdmView>()
    const [openModal, setOpenModal] = useState(false)
    const { modals, handleToggleModal, mutateData } = useContext(UserManagementTabProviderContext)
    const data = useMemo(() => {
        const isIswAdminIsLoading = typeof iswAdmin === "undefined" && typeof error === "undefined"
        const isIswAdminIsLoaded = typeof iswAdmin !== "undefined" && typeof error === "undefined"
        return {
            columns: [{

                name: "Role",
                key: "role.name"
            }, {
                name: "Email Address",
                key: "email"
            }, {
                name: "Date Created",
                key: "createdAt",
                ele: appTableElements.dateTime
            }, {
                name: "Status",
                key: "status",
                ele: appTableElements.status
            }
            ],
            actions: [
                {
                    name: "Resend Activation Mail",
                    method: (x: ISWAdmView) => {
                        setOpenModal(true)
                        setSelectedUser(x)
                    }
                },
            ] as Action[],
            data: isIswAdminIsLoading ? undefined : isIswAdminIsLoaded ? iswAdmin.content : []
        }
    }, [iswAdmin, error])

    useEffect(() => {
        if (error) {
            toast({
                status: "error",
                title: typeof error.message === "undefined" ? error : error.message,
                variant: "left-accent",
                isClosable: true
            })
        }
    }, [error])

    useEffect(() => {
        if (iswAdmin && iswAdmin.totalElements) {
            setCookie(cookieKeys.totalISWAdmin, iswAdmin.totalElements.toString(), cookiesTimeout.totalISWAdminTimeout)
            setPaginationProps(iswAdmin.totalElements)
        }
    }, [iswAdmin])



    useEffect(() => {


        const selectedModal = modals.some(x => x.isSubmitted)
        if (selectedModal) {
            mutateData(() => {

                mutate(`${apiUrlsv1.iswAdmin}?page=${pageNumber - 1}&countPerPage=${countPerPage}`)
                handleToggleModal()
            })
        }
    }, [modals])



    return (<>
        <AppTable<ISWAdmView> columns={data?.columns} rows={data.data as ISWAdmView[]} actions={data.actions} showNumbering />
        <ResendUserActivationMail isLoggedIn={true} user={selectedUser as unknown as TenantAdminView} isOpen={openModal} closeModal={function (): void {
            setSelectedUser(undefined)
            setOpenModal(false)
        } } />
    </>)

}

const ISWAdmin: FC = () => {
    const { modals } = useContext(UserManagementTabProviderContext)
    const [selectedModal, setSelectedModal] = useState<UserManagementModal>()
    // debugger
    const isAddNewUserIsSelected = typeof selectedModal !== "undefined" && selectedModal.isOpen && selectedModal.name === UserManagementModalNames.addNewUser
    const isAddNewRoleIsSelected = typeof selectedModal !== "undefined" && selectedModal.isOpen && selectedModal.name === UserManagementModalNames.addNewRole

    useEffect(() => {
        const modal = modals.find((x, i) => (x.name === UserManagementModalNames.addNewUser || x.name === UserManagementModalNames.addNewRole) && x.isOpen)
        // debugger
        setSelectedModal(modal)
    }, [modals])

    return (

        <PaginatorProvider>
            <ISWAdminTable />
            {isAddNewUserIsSelected && <AddNewUser />}
            {isAddNewRoleIsSelected && <AddNewRole />}
        </PaginatorProvider>
    )
}
export default ISWAdmin