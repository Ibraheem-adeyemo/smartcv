import { FC, useContext, useMemo } from "react";
import useSWR from "swr";
import { apiUrlsv1, appTableElements } from "../../constants";
import { InterchangeDisconnectionStatus as InterchangeDisconnectionStatusModdel, Paginate } from "../../models";
import { PaginatorProvider, PaginatorContext } from "../../providers";
import { AppTable } from "../app";

const InterchangeDisconnectionStatusTable:FC = () => {
    
    const { pageNumber, countPerPage } = useContext(PaginatorContext)
    const { data: connnectionRequest, mutate:_mutate, error } = useSWR<Paginate<InterchangeDisconnectionStatusModdel>>(`${apiUrlsv1.interchangeDisconnectionStatus}?page=${pageNumber-1}&size=${countPerPage}`)

    const data = useMemo(() => ({
        columns: [{
                name: "Bank",
                key: "tenantName"
            }, {
                name: "Bank Id",
                key: "tenantCode"
            }, {
                name: "Host",
                key: "host"
            }, {
                name: "Node",
                key: "node"
            }, {
                name: "Command Port",
                key: "commandPort"
            }, {
                name: "Status",
                key: "statusCondition",
                ele: appTableElements.status,
                lookUp:["Not Active", "Active"]
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