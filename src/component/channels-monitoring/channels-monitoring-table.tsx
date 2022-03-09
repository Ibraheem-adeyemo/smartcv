import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { Paginate, ATMCountDetail, Column } from "../../models";
import { PaginatorProvider, PaginatorContext,channelsMonitoringContext, StatsContext, AuthContext } from "../../providers";
import { appTableElements } from "../../constants";
import { useToast } from "@chakra-ui/react";


const ChannelsMonitoringTable: React.FC = () => {
    // console.log({pageNumber})
    const {token} = useContext(AuthContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { selectedTenantCode } = useContext(StatsContext)
    const { tabs } = useContext(channelsMonitoringContext)
    // console.log({tabs})
    let url = (tabs.findIndex((x) => x.isSelected) > -1 ? tabs.find((x) => x.isSelected)?.url : "") as string
    if (typeof selectedTenantCode !== "undefined" && selectedTenantCode !== "0") {
        url += `${selectedTenantCode}`
    }
    url += `details/`
    url = token?url: ""
    const { data: atmCountDetail, mutate: _mutate, error } = useSWR<Paginate<ATMCountDetail>>(url === "" ? null : `${url}?page=${(pageNumber - 1)}&size=${countPerPage}`)
    const toast = useToast()
    const data = useMemo(() => {
        const rowData = url === "" ? [] : typeof atmCountDetail !== "undefined" && typeof error === "undefined" ? atmCountDetail?.content as ATMCountDetail[] : typeof error !== "undefined" ? [] : undefined
        return {
            columns: [
                {
                    name: "Tenant",
                    key: "tenantName"
                }, {
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
                    ele: appTableElements.dateTime
                }, {
                    name: "Terminal Status",
                    key: "terminalStatus",
                    ele: appTableElements.status,
                    lookUp: ["Not Active", "Active"]
                }
            ] as Column[],
            data: rowData
        }
    }, [atmCountDetail, error])

    useEffect(() => {
        if (typeof error !== "undefined") {
            toast({
                status: "error",
                title: typeof error.message === "undefined" ? error : error.message,
                variant: "left-accent",
                isClosable: true
            })
        }
    }, [error])
    useEffect(() => {
        if (typeof atmCountDetail !== "undefined" && typeof atmCountDetail.totalElements !== "undefined" && typeof atmCountDetail.totalPages !== "undefined" && atmCountDetail.totalPages > 1) {
            setPaginationProps(atmCountDetail.totalElements)
        }
    }, [atmCountDetail])


    return (<AppTable<ATMCountDetail> columns={data?.columns} rows={data.data as ATMCountDetail[]} showNumbering />)

}

const ChannelsMonitoring: FC = () => {
    return (

        <PaginatorProvider>
            <ChannelsMonitoringTable />
        </PaginatorProvider>
    )
}

export default ChannelsMonitoring