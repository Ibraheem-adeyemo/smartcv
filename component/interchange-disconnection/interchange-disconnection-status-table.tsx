import { useToast } from "@chakra-ui/react";
import { FC, useContext, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";
import { apiUrlsv1, appTableElements } from "../../constants";
import { InterchangeDisconnectionRequest, InterchangeDisconnectionStatus, Paginate, TenantView } from "../../models";
import { PaginatorProvider } from "../../provider";
import { PaginatorContext } from "../../provider/paginator-provider";
import { AppTable } from "../app";

const StatusTable:FC = () => {
    
    const toast = useToast()
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const {mutate} = useSWRConfig()
    const { data: connnectionRequest, mutate:_mutate, error } = useSWR<Paginate<InterchangeDisconnectionStatus>>(`${apiUrlsv1.interchangeDisconnectionRequest}?page=${pageNumber-1}&size=${countPerPage}`)

    const data = useMemo(() => ({
        columns: [{
                name: "Date Sent",
                key: "dateSent"
            }, {
                name: "Bank",
                key: "tenantName"
            }, {
                name: "Disconnection Time",
                key: "disconnectionTime."
            }, {
                name: "Requested User",
                key: "requestedUser"
            }, {
                name: "Status",
                key: "status",
                ele: appTableElements.status,
                lookUp:["Accepted", "Rejected"]
            }
        ],
        actions: [
            {
                name: "Accept",
                icons: {
                    use: true
                },
                method: () => {
                    alert("Accepted")
                },
                color: "green"
            },
            {
                name: "Rejected",
                icons: {
                    use: true
                },
                method: () => {
                    alert("Accepted")
                },
                color:"red"
            }
        ],
        data: typeof connnectionRequest === "undefined" && typeof error === "undefined" ? undefined: (typeof connnectionRequest !== "undefined" && typeof error === "undefined" )?  connnectionRequest.content as InterchangeDisconnectionStatus[]:[]
    }), [connnectionRequest, error])
    return (<AppTable<InterchangeDisconnectionStatus> columns={data?.columns} rows={data.data as InterchangeDisconnectionStatus[]} showNumbering />)
}

const Status: FC = () => {
    return (

        <PaginatorProvider>
            <StatusTable />
        </PaginatorProvider>
    )
}

export default Status