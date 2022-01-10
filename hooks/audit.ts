import { debounce } from "lodash";
import { useState } from "react";
import { AuditView } from "../models";

export default function useAudit() {
    const [viewDetailsModal, setViewDetailsModal] = useState(false)
    const [auditView, setauditView] = useState<AuditView[]>()
    const [searchText, setSearchText] = useState("")
    const [auditInfo, setAuditInfo] = useState<AuditView>()
    
    const toggleDetailsModal = (state: boolean) => {
        setViewDetailsModal(state)
    }

    const changeAuditView = (audit: AuditView[]) => {
        setauditView(audit)
    }

    const changeAuditInfo = (audit: AuditView) => {
        setAuditInfo(audit)
    }
    
    const handleSearchItem = debounce((searchText: string) => {
        setSearchText(searchText)
    }, 500)

    return {auditView, auditInfo, viewDetailsModal, searchText, toggleDetailsModal, handleSearchItem, changeAuditView, changeAuditInfo}
}