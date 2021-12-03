import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { Paginate, ATMCountDetail, AuditView } from "../../models";
import { PaginatorProvider } from "../../provider";
import { PaginatorContext } from "../../provider/paginator-provider";
import { useToast } from "@chakra-ui/react";
import { apiUrlsv1 } from "../../constants";


const  AuditTable:React.FC = () => {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { data: auditView, mutate: _mutate, error } = useSWR<Paginate<AuditView>>(`${apiUrlsv1.atmCountDetails}?page=${pageNumber-1}&countPerPage=${countPerPage}`)
    const toast = useToast()
    const data = useMemo(() => ({
        columns: [
            {
                name: "Tenant",
                key: "terminalId"
            }, {
                name: "Branch",
                key: "externalIP"
            }, {
                name: "username",
                key: "location"
            }, {
                name: "Module",
                key: "state"
            }, {
                name: "Action",
                key: "lastTranTime",
            }, {
                name: "Originating IP",
                key: "terminalStatus",
            }, {
                name: "Date",
                key: "terminalStatus",
            }
        ],
        actions: [
            {
                name: "view",
                icons: {
                    use: true
                },
                method: () => {
                    alert("Edit")
                }
            }],
        data: typeof auditView !== "undefined" && typeof error ==="undefined"? auditView?.content as AuditView[]:undefined
    }), [auditView, error])

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
        if(typeof auditView !== "undefined" && typeof auditView.totalElements !== "undefined") {
            setPaginationProps(auditView.totalElements )
        }
    }, [auditView])


    return (<AppTable<AuditView> columns={data?.columns} rows={data.data as AuditView[]} actions={data.actions} />)

}

const Audit:FC =() => {
    return (

        <PaginatorProvider>
            <AuditTable />
        </PaginatorProvider>
    )
}

export default Audit