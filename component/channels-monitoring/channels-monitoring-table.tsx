import _ from "lodash";
import React, { useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { Paginate, ATMCountDetail } from "../../models";
import { TableProvider } from "../../provider";
import { TableContext } from "../../provider/table-provider";
import { useToast } from "@chakra-ui/react";
import { apiUrlsv1 } from "../../constants";


function ChannelsMonitoringTable(_props: any) {
    // console.log({pageNumber})

    const { pageNumber, countPerPage, setPaginationProps } = useContext(TableContext)
    const { data: atmCountDetail, mutate, error } = useSWR<Paginate<ATMCountDetail>>(`${apiUrlsv1.atmCountDetails}?page=${pageNumber-1}&countPerPage=${countPerPage}`)
    const toast = useToast()
    const data = useMemo(() => ({
        columns: [
            {
                name: "Terminal ID",
                key: "terminalId"
            }, {
                name: "Channel IP",
                key: "externalIP"
            }, {
                name: "Location",
                key: "location"
            }, {
                name: "State",
                key: "state"
            }, {
                name: "Last Transaction Time",
                key: "lastTranTime",
                ele:"datetime"
            }, {
                name: "Terminal Status",
                key: "terminalStatus",
                ele:"status"
            }
        ],
        actions: [
            {
                name: "Edit",
                icons: {
                    use: true
                },
                method: () => {
                    alert("Edit")
                }
            }],
        data: typeof atmCountDetail !== "undefined" && typeof error ==="undefined"? atmCountDetail?.content as ATMCountDetail[]:undefined
    }), [   atmCountDetail, error])

    useEffect(() => {
        if(typeof error !== "undefined") {
            toast({
                status:"error",
                title: typeof error.message === "undefined"? error:error.message,
                variant:"left-accent",
                isClosable:true
            })
        }
    }, [error])
    useEffect(() => {
        if(typeof atmCountDetail !== "undefined" && typeof atmCountDetail.totalElements !== "undefined") {
            setPaginationProps(atmCountDetail.totalElements )
        }
    }, [atmCountDetail])


    return (<AppTable<ATMCountDetail> columns={data?.columns} rows={data.data as ATMCountDetail[]} />)

}

export default function ChannelsMonitoring(_props: any) {
    return (

        <TableProvider>
            <ChannelsMonitoringTable />
        </TableProvider>
    )
}