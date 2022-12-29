export type Record = {
    date: string,
    MSSType: string,
    transactionType: string,
    pan: string,
    amount: number,
    refCode: string,
    stan: string
}
export interface TransactionMonitoringTableProps  {
    records: Record[]
}

export type RealTimeObject = {
    customerInducedFailureCount:number
    endDate:string
    failedCount:number
    startDate:string|number
    successCount:number
    transactionDetailsResponseDTOList:TransactionPropObject[]
}

export type formatedRealtimeObject = {
    responseDTOList:RealTimeObject[]
    transactionCountResponseList:TransactionPropObject[]
}
type realtimeTransactionCount = {
    interchangeName: string
    realtimeTransactionCountResponseList: RealTimeObject[],
}

export interface IRealTimeData {   
    tenantCode: string
    realTime:realtimeTransactionCount
}

export type TransactionPropObject = {
    refCode: string,
    responseCode: string,
    tranType: string,
    dateTime:Date,
    amount: number,
    pan: null | string|number,
    stan: null | string|number
}
export type ForwardQueuePropObject = {
    cummulativeNoOfTransactions: number,
    bank: string,
    time:string|Date
}
export type TransactionPropType = {
    customerInducedFailureCount:number
    endDate: Date
    failedCount:number
    startDate:number|Date
    successCount:number
    transactionDetailsResponseDTOList:TransactionPropObject[]
}

export type TransactionProps = {
    transactiondata: TransactionPropType
}