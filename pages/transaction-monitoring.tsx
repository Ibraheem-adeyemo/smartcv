import { NextPage } from "next"
import { Authenticated } from "../component/layouts"

const TransactionsMonitoring:NextPage = () => {
    return (
        <Authenticated pageHeader="Transaction Monitoring">
           <> Transaction Monitoring</>
        </Authenticated>
    )
}
export default TransactionsMonitoring