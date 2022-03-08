import { useToast } from "@chakra-ui/react";
import { FC, useContext, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";
import { apiUrlsv1, appTableElements } from "../../constants";
import { Column, InterchangeDisconnectionRequest, Paginate, TenantView } from "../../models";
import { PaginatorProvider, PaginatorContext } from "../../providers";
import { AppTable } from "../app";

const InterchangeConnectionRequestTable: FC = () => {

    const { pageNumber, countPerPage } = useContext(PaginatorContext)
    
    const { data: connnectionRequest, mutate: _mutate, error } = useSWR<Paginate<InterchangeDisconnectionRequest>>(`${apiUrlsv1.interchangeDisconnectionRequest}?page=${pageNumber - 1}&size=${countPerPage}`)

    const data = useMemo(() => ({
        columns: [{
            name: "Date Sent",
            key: "datetime"
        }, {
            name: "Bank",
            key: "tenantName"
        }, {
            name: "Bank Id",
            key: "tenantCode."
        }, {
            name: "Interchange",
            key: "interchange."
        }, {
            name: "Requested User",
            key: "requester"
        }, {
            name: "Verdict",
            key: "verdict"
        }] as Column[],
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
                color: "red"
            }
        ],
        data: connnectionRequest && error ? undefined : (connnectionRequest && error) ? connnectionRequest.content as InterchangeDisconnectionRequest[] : []
    }), [connnectionRequest, error])
    return (<AppTable<InterchangeDisconnectionRequest> columns={data?.columns} rows={data.data as InterchangeDisconnectionRequest[]} showNumbering />)
}

const InterchangeConnectionRequest: FC = () => {
    return (
        <PaginatorProvider>
            <InterchangeConnectionRequestTable />
        </PaginatorProvider>
    )
}

export default InterchangeConnectionRequest