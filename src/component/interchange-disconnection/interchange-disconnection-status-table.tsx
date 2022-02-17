import { useToast } from "@chakra-ui/react";
import { FC, useContext, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";
import { apiUrlsv1, appTableElements } from "../../constants";
import { InterchangeDisconnectionRequest, InterchangeDisconnectionStatus as InterchangeDisconnectionStatusModdel, Paginate, TenantView } from "../../models";
import { PaginatorProvider } from "../../provider";
import { PaginatorContext } from "../../provider/paginator-provider";
import { AppTable } from "../app";

const InterchangeDisconnectionStatusTable:FC = () => {
    
    const { pageNumber, countPerPage } = useContext(PaginatorContext)
    const { data: connnectionRequest, mutate:_mutate, error } = useSWR<Paginate<InterchangeDisconnectionStatusModdel>>(`${apiUrlsv1.interchangeDisconnectionRequest}?page=${pageNumber-1}&size=${countPerPage}`)

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
        data: typeof connnectionRequest === "undefined" && typeof error === "undefined" ? undefined: (typeof connnectionRequest !== "undefined" && typeof error === "undefined" )?  connnectionRequest.content as InterchangeDisconnectionStatusModdel[]:[]
    }), [connnectionRequest, error])
    return (<AppTable<InterchangeDisconnectionStatusModdel> columns={data?.columns} rows={data.data as InterchangeDisconnectionStatusModdel[]} showNumbering />)
}

const InterchangeDisconnectionStatus: FC = () => {
    return (
        <PaginatorProvider>
            <InterchangeDisconnectionStatusTable />
        </PaginatorProvider>
    )
}

export default InterchangeDisconnectionStatus