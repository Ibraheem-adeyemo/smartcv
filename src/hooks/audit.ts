import { useToast } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useState } from "react";
import { formatTime } from "../lib";
import { AuditView } from "../models";

export default function useAudit() {
    const [viewDetailsModal, setViewDetailsModal] = useState(false)
    const [auditView, setauditView] = useState<AuditView[]>()
    const [searchText, setSearchText] = useState("")
    const [auditInfo, setAuditInfo] = useState<AuditView>()
    const [dateRange, setDateRange] = useState<string[]>([])
    
    const toggleDetailsModal = (state: boolean) => {
        setViewDetailsModal(state)
    }

    const toast = useToast();

    const changeAuditView = (audit: AuditView[]) => {
        setauditView(audit)
    }

    const changeAuditInfo = (audit: AuditView) => {
        setAuditInfo(audit)
    }
    
    const handleSearchItem = debounce((searchText: string) => {
        setSearchText(searchText)
    }, 500)

    const handleDaterangeSearch = debounce((start:string, end:string) => {
        console.log(end)
        const formatedStart = formatTime(start);
        const formatedEnd = formatTime(end)
        if(formatedStart && formatedEnd) {
            setDateRange([formatedStart, formatedEnd])
        } else {
            toast({
                title: 'Kindly select the date less than or equal to the current date',
                status: "error",
                variant: "left-accent",
                isClosable: true
              })
        }
        
    }, 50)

    return {auditView, auditInfo, viewDetailsModal, searchText, toggleDetailsModal, handleDaterangeSearch, dateRange, handleSearchItem, changeAuditView, changeAuditInfo}
}