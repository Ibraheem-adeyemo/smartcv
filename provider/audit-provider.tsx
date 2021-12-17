import { debounce } from "lodash";
import { createContext, FC } from "react";
import { useAudit, useAuthentication } from "../hooks";
import { Column, ComponentWithChildren } from "../models";

type AuditContextType = {
    columns: Column[]
}
const columns =  [
    {
        name: "Tenant",
        key: "tenant"
    }, {
        name: "Branch",
        key: "branch"
    }, {
        name: "username",
        key: "username"
    }, {
        name: "Module",
        key: "module"
    }, {
        name: "Action",
        key: "action",
    }, {
        name: "Originating IP",
        key: "originatingIp",
    }, {
        name: "Date",
        key: "date",
    }
]
export const AuditContext = createContext<AuditContextType & ReturnType<typeof useAudit>>({
    auditView: undefined,
    viewDetailsModal: false,
    searchText: "",
    toggleDetailsModal: (_state: boolean) => { },
    handleSearchItem: debounce(() => { }, 500),
    changeAuditView: () => { },
    columns:columns
})
interface AuditProviderProps extends ComponentWithChildren {
}
const AuditProvider: FC<AuditProviderProps> = (props: AuditProviderProps) => {

    return <AuditContext.Provider value={{...useAudit(), columns:columns}}>
        {props.children}
    </AuditContext.Provider>
}

export default AuditProvider