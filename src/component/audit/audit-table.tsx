import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { Paginate, ATMCountDetail, AuditView, Action } from "../../models";
import { PaginatorProvider, PaginatorContext, AuditContext } from "../../providers";
import { useToast } from "@chakra-ui/react";
import { apiUrlsv1 } from "../../constants";


const AuditTable:FC = () => {

    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { searchText, changeAuditView, columns, toggleDetailsModal, changeAuditInfo} = useContext(AuditContext)
    let url = `${apiUrlsv1.audit}?page=${pageNumber-1}&size=${countPerPage}`
    
    if(searchText !== "") {
        url =`${apiUrlsv1.auditByUser}/${searchText}?page=${pageNumber-1}&size=${countPerPage}` 
    }
    
    const { data: auditView, mutate: _mutate, error } = useSWR<Paginate<AuditView>>(url)
    const toast = useToast()
    const data = useMemo(() => ({
        columns,
        actions: [
            {
                name: "view",
                icons: {
                    use: true
                },
                method: (x: AuditView) => {
                    toggleDetailsModal(true)
                    changeAuditInfo(x)
                }
            }],
        data: typeof auditView !== "undefined" && typeof error ==="undefined"? auditView?.content as AuditView[]:typeof error !=="undefined"?[]:undefined
    }), [auditView, error])

    useEffect(() => {
        if(typeof auditView?.content !== "undefined") {
            changeAuditView(auditView.content)
        }
        if(typeof error !== "undefined") {
            toast({
                status:"error",
                title: typeof error.message === "undefined"? error:error.message,
                variant:"left-accent",
                isClosable:true
            })
        }
        if(typeof auditView !== "undefined" && typeof auditView.totalElements !== "undefined") {
            setPaginationProps(auditView.totalElements )
        }
    }, [auditView, error])

    return (<AppTable<AuditView> columns={data?.columns} rows={data.data as AuditView[]} actions={data.actions as  Action[]} showNumbering />)

}

const Audit:FC =() => {
    return (

        <PaginatorProvider>
            <AuditTable />
        </PaginatorProvider>
    )
}

export default Audit