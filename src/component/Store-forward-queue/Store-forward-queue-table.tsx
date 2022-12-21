import _ from "lodash";
import React, { FC, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { AppTable } from "../app";
import { Paginate, ATMCountDetail, Column, TransactionMonitoringTableProps, Record, ForwardQueuePropObject, RealTimeObject } from "../../models";
import { PaginatorProvider, PaginatorContext,channelsMonitoringContext, StatsContext, AuthContext } from "../../providers";
import { TiWarning } from 'react-icons/ti'
import { apiUrlsv1, appRoles, appTableElements, cookieKeys } from "../../constants";
import { Flex, Icon, useToast } from "@chakra-ui/react";
import { getCookie } from "../../lib";


export const StoreForwardQueueSetup: FC<{records: ForwardQueuePropObject[]|[]}> = (props: {records: ForwardQueuePropObject[]|[]}) => {
    const {token, userDetail} = useContext(AuthContext)
    const { pageNumber, countPerPage, setPaginationProps } = useContext(PaginatorContext)
    const { selectedTenantCode } = useContext(StatsContext)
    
    const cokieToken = getCookie(cookieKeys.token)
    
    let url = apiUrlsv1.forwardQueue
    url = cokieToken && userDetail?`${url}?page=${(pageNumber - 1)}&size=${countPerPage}`: "";

    if (userDetail && ( userDetail.role.name !== appRoles.superAdmin || typeof selectedTenantCode !== "undefined") && ( userDetail.role.name !== appRoles.superAdmin || selectedTenantCode !== "0")) {
        if(userDetail.role.name !== appRoles.superAdmin){
            url = `${apiUrlsv1.forwardQueue}/tenant/${userDetail.tenant.code}`
          } else if(userDetail.role.name === appRoles.superAdmin && selectedTenantCode !== "0")  {
            url = `${apiUrlsv1.forwardQueue}/tenant/${selectedTenantCode}`
          }
    }

    const { data: pendingTransations, isValidating , mutate: _mutate, error } = useSWR(!url ? null : url)

    const transactionMonitoringData = pendingTransations?.payload
    const toast = useToast()
    const data = useMemo(() => {
        return {
            columns: [
                {
                    name: "Time",
                    key: 'timeNow',
                    ele: appTableElements.dateTime
                }, {
                    name: "Bank",
                    key: "node"
                }, {
                    name: "Cumulative no of transactions",
                    key: "cumulativeNoOfTransactions",
                    ele: (x:number)=>{
                        if(x>= 250) {
                            return(
                                <Flex color='#DC4437' ml={3} alignItems='center'>
                                    <Icon as={TiWarning} />
                                    <h1>Warning</h1>
                                </Flex>
                            )
                        }else {
                            return <></>
                        }
                        
                    }//`${<h1>Warning</h1>}`
                }
            ] as Column[],
            data:transactionMonitoringData
        }
    }, [transactionMonitoringData])

    // useEffect(() => {
    //     if (typeof error !== "undefined") {
    //         toast({
    //             status: "error",
    //             title: typeof error.message === "undefined" ? error : error.message,
    //             variant: "left-accent",
    //             isClosable: true
    //         })
    //     }
    // }, [error])
    useEffect(() => {
        // debugger
        // if (typeof atmCountDetail !== "undefined" && typeof atmCountDetail.totalElements !== "undefined" && typeof atmCountDetail.totalPages !== "undefined" && atmCountDetail.totalPages > 1) {
            setPaginationProps(transactionMonitoringData?.length)
        // } else {
        //     setPaginationProps(0)
        // }
    }, [transactionMonitoringData])


    return (<AppTable<ForwardQueuePropObject> columns={data?.columns} rows={data.data as ForwardQueuePropObject[]|[]} showNumbering />)

}

const StoreForwardQueueSetupTable = ({transactiondata}:{transactiondata:ForwardQueuePropObject[]}) => {
    
    return (
        <PaginatorProvider>
            <StoreForwardQueueSetup records={transactiondata} />
        </PaginatorProvider>
    )
}

export default StoreForwardQueueSetupTable