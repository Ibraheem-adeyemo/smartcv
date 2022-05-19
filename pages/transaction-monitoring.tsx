import { NextPage } from "next"
import { Authenticated } from "../src/component/layouts"
import { TransactionMonitoring } from "../src/component/transaction-monitoring"

const TransactionsMonitoring:NextPage = () => {
    return (
        <Authenticated pageHeader="Transaction Monitoring">
           <TransactionMonitoring />
        </Authenticated>
    )
}
export default TransactionsMonitoring