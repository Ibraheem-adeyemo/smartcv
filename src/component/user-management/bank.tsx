import { useToast } from "@chakra-ui/react";
import _ from "lodash";
import dynamic from "next/dynamic";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { BankView, DeactivateTenant } from ".";
import { apiUrlsv1, appTableElements, cookieKeys, cookiesTimeout, UserManagementModalNames, userManagementTabsAdmin, UserManagementTriggerButtons } from "../../constants";
import { setCookie } from "../../lib";
import { TenantView, Paginate, UserManagementModal, Column, Action, TenantTableView } from "../../models";
import { PaginatorProvider, PaginatorContext, UserManagementTabProviderContext, AuthContext } from "../../providers";
import { AppTable } from "../app";
import ActivateAccount from "../auth/activate-account";
import ActivateTenant from "./activate-tenant";
import AddNewBankAdmin from "./add-new-bank-admin";

const AddNewBank = dynamic(() => import('./add-new-bank'), { ssr: false })

const BankTable: FC = () => {
    const toast = useToast()
    const { token } = useContext(AuthContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { modals, handleToggleModal, mutateData } = useContext(UserManagementTabProviderContext)
    const { mutate } = useSWRConfig()
    const url = token ? `${apiUrlsv1.tenant}?page=${pageNumber - 1}&size=${countPerPage}` : null
    const { data: tenant, mutate: _mutate, error } = useSWR<Paginate<TenantTableView>>(url)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const [selectedBank, setSelectedBank] = useState<TenantTableView>()
    function shouldReload(status = false) {
        if(status) {
            mutate(url)
            setIsOpen((prev) => !isOpen)
            setSelectedOption("")
        }
    }
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
                name: "Status",
                key: "active",
                ele: appTableElements.status,
                lookUp: ["Not Active", "Active"]
            }
        ] as Column[],
        actions: [
            {
                name: UserManagementTriggerButtons.activateTenant,
                show: (x: TenantTableView) => { 
                    // debugger
                    return !x.active
                },
                method: (x: TenantTableView) => {
                    // debugger
                    setSelectedBank(x)
                    setSelectedOption(UserManagementTriggerButtons.activateTenant)
                }
            },
            {
                name: UserManagementTriggerButtons.deactivateTenant,
                show: (x: TenantTableView) => { 
                    // debugger
                    return x.active
                },
                method: (x: TenantTableView) => {
                    // debugger
                    setSelectedBank(x)
                    setSelectedOption(UserManagementTriggerButtons.deactivateTenant)
                }
            },
            {
                name: UserManagementTriggerButtons.viewBank,
                method: (x: TenantTableView) => {
                    // debugger
                    setSelectedBank(x)
                    setSelectedOption(UserManagementTriggerButtons.viewBank)
                }
            }
        ] as Action[],
        data: typeof tenant === "undefined" && typeof error === "undefined" ? tenant : (typeof tenant !== "undefined" && typeof error === "undefined") ? tenant.content as TenantView[] : []
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


        const selectedModal = modals.some(x => x.isSubmitted)
        if (selectedModal) {
            mutateData(() => {

                mutate(`${apiUrlsv1.tenant}?page=${pageNumber - 1}&size=${countPerPage}`)
                handleToggleModal()
            })
        }
    }, [modals])

    useEffect(() => {
        // debugger
        if(selectedOption) {
            setIsOpen(true)
        } else setIsOpen(false)

    }, [selectedOption])

    return (
        <>
            <AppTable<TenantTableView> columns={data?.columns} rows={data.data as TenantTableView[]} actions={data.actions} showNumbering />
            {selectedOption && selectedOption === UserManagementTriggerButtons.viewBank && isOpen && <BankView isOpen={isOpen} closeModal={() => {
                setIsOpen((prev) => !isOpen)
                setSelectedOption("")
                }} bankInfo={selectedBank} />}

                {selectedOption && selectedOption === UserManagementTriggerButtons.activateTenant && isOpen && <ActivateTenant reload={(status) => shouldReload(status)} isOpen={isOpen} closeModal={ () =>{
                setIsOpen((prev) => !isOpen)
                setSelectedOption("")
                }} bankInfo={selectedBank} />}

                {selectedOption && selectedOption === UserManagementTriggerButtons.deactivateTenant && isOpen && <DeactivateTenant reload={(status) => shouldReload(status)} isOpen={isOpen} closeModal={ () =>{
                setIsOpen((prev) => !isOpen)
                setSelectedOption("")
                }} bankInfo={selectedBank} />}

        </>
    )

}

const Bank: FC = () => {
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