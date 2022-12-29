import React from 'react';
import StoreForwardQueueSetupTable from './Store-forward-queue-table'

export const StoreForwardQueue = () => {
    let timeNow: string|Date = new Date()
    const dummy = [
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 400
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 200
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 400
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 100
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 400
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 200
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 400
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 100
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 400
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 200
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 400
        },
        {
            // id: 1,
            time: timeNow,
            bank: 'Heritage Bank',
            cummulativeNoOfTransactions: 100
        }
    ]
  return (
    <>
        <StoreForwardQueueSetupTable transactiondata={dummy} />
    </>
  )
}
