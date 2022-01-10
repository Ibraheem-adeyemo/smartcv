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
        key: "originIP",
    }, {
        name: "Date",
        key: "date",
        ele: "datetime"
    }
]
export const AuditContext = createContext<AuditContextType & ReturnType<typeof useAudit>>({
    auditView: undefined,
    auditInfo:undefined,
    viewDetailsModal: false,
    searchText: "",
    toggleDetailsModal: (_state: boolean) => { },
    handleSearchItem: debounce(() => { }, 500),
    changeAuditView: () => { },
    changeAuditInfo:()=>{},
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