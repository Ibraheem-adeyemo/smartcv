import { useToast } from "@chakra-ui/react";
import { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { apiUrlsv1, appRoles, appTableElements } from "../../constants";
import { InterchangeDisconnectionStatus as InterchangeDisconnectionStatusModdel, Paginate } from "../../models";
import { PaginatorProvider, PaginatorContext, AuthContext, StatsContext } from "../../providers";
import { AppTable } from "../app";

const InterchangeDisconnectionStatusTable: FC = () => {
    const { token, userDetail } = useContext(AuthContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const isAdmin = userDetail && userDetail.role.name === appRoles.superAdmin
    const { selectedTenantCode } = useContext(StatsContext)
    const toast = useToast()
    let url = apiUrlsv1.interchangeDisconnectionStatus
    // debugger
    if (userDetail && (userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && (userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {

        if (userDetail.role.name !== appRoles.superAdmin) {
            url = `${apiUrlsv1.interchangeDisconnectionStatus}/${userDetail.tenant.code}`
        } else if (userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0") {
            url = `${apiUrlsv1.interchangeDisconnectionStatus}/${selectedTenantCode}`
        }
    }
    url = token && userDetail ? `${url}?page=${pageNumber - 1}&size=${countPerPage}` : ""

    const { data: connnectionRequest, mutate: _mutate, error } = useSWR<Paginate<InterchangeDisconnectionStatusModdel>>(!url ? null : url)

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
            lookUp: ["Not Active", "Active"]
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
                color: "red"
            }
        ],
        data: !connnectionRequest && !error ? undefined : (connnectionRequest && !error) ? connnectionRequest.content as InterchangeDisconnectionStatusModdel[] : []
    }), [connnectionRequest, error])

    useEffect(() => {
        if (error) {
            toast({
                status: "error",
                title: typeof error.message === "undefined" ? error : error.message,
                variant: "left-accent",
                isClosable: true
            })
        }
    }, [error])

    useEffect(() => {
        // debugger
        if (connnectionRequest && connnectionRequest.totalElements) {
            setPaginationProps(connnectionRequest.totalElements)
        } else {
            setPaginationProps(0)
        }
    }, [connnectionRequest])

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