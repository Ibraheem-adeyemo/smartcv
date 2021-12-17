import { debounce } from "lodash";
import { useState } from "react";
import { AuditView } from "../models";

export default function useAudit() {
    const [viewDetailsModal, setViewDetailsModal] = useState(false)
    const [auditView, setauditView] = useState<AuditView[]>()
    const [searchText, setSearchText] = useState("")
    
    const toggleDetailsModal = (state: boolean) => {
        setViewDetailsModal(state)
    }

    const changeAuditView = (audit: AuditView[]) => {
        setauditView(audit)
    }
    
    const handleSearchItem = debounce((searchText: string) => {
        setSearchText(searchText)
    }, 500)

    return {auditView, viewDetailsModal, searchText, toggleDetailsModal, handleSearchItem, changeAuditView}
}