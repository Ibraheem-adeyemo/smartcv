import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { Paginate, AuditView, Action } from "../../models";
import { PaginatorProvider, PaginatorContext, AuditContext, AuthContext, StatsContext } from "../../providers";
import { useToast } from "@chakra-ui/react";
import { apiUrlsv1, appRoles } from "../../constants";


const AuditTable:FC = () => {

    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { token, userDetail } = useContext(AuthContext)
    const { searchText, changeAuditView, dateRange, columns, toggleDetailsModal, changeAuditInfo} = useContext(AuditContext)
    let url = `${apiUrlsv1.audit}?page=${pageNumber-1}&size=${countPerPage}`
    const {selectedTenantCode} = useContext(StatsContext)
    if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
  
      if (userDetail.role.name !== appRoles.superAdmin) {
        url = `${apiUrlsv1.audit}code/${userDetail.tenant.code}?page=${pageNumber-1}&size=${countPerPage}`
      } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
        url = `${apiUrlsv1.audit}code/${selectedTenantCode}?page=${pageNumber-1}&size=${countPerPage}`
      }
    }
    else if(searchText !== "") {
        url =`${apiUrlsv1.auditByUser}/${searchText}?page=${pageNumber-1}&size=${countPerPage}` 
    } else if(dateRange.length > 1 && dateRange[1] !== '') {
        if (userDetail?.role?.name === appRoles.superAdmin) {
            url = `${apiUrlsv1.audit}search?pageNumber=${pageNumber-1}&pageSize=${countPerPage}&start=${dateRange[0]}&end=${dateRange[1]}`
        } else if (userDetail?.role?.name !== appRoles.superAdmin) {
            url = `${apiUrlsv1.audit}code/range/${selectedTenantCode}/${userDetail?.username}?pageNumber=${pageNumber-1}&pageSize=${countPerPage}&start=${dateRange[0]}&end=${dateRange[1]}`
        }
    }
    
    const { data: auditView, mutate: _mutate, error } = useSWR<Paginate<AuditView>>(token? url : null)
    const toast = useToast()
    const data = useMemo(() => ({
        columns,
        actions: [
            {
                name: "view",
                method: (x: AuditView) => {
                    toggleDetailsModal(true)
                    changeAuditInfo(x)
                },
                show: true
            }] as Action[],
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