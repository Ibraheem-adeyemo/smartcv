import dynamic from "next/dynamic"
import { FC, useContext } from "react"
import { interchangeDisconnectionTabsName } from "../../constants/tabs"
import { InterchangeDisconnectionContext } from "../../provider/interchange-disconnection-provider"

const InterchangeDisconnectionStatusTable = dynamic(() => import("./interchange-disconnection-status-table"))
const InterchangeConnectionRequestTable = dynamic(() => import("./interchange-connection-request-table"))

const InterchangeDisconnectionTable: FC = () => {
    const { tabs } = useContext(InterchangeDisconnectionContext)
    return <>
        {tabs.map(x => {
            if (x.isSelected) {
                if (x.name === interchangeDisconnectionTabsName.status) {
                    return <InterchangeDisconnectionStatusTable />
                } else if (x.name === interchangeDisconnectionTabsName.connectionRequest) {
                    return <InterchangeConnectionRequestTable />
                }
            }
            return <></>

        })}
    </>
}

export default InterchangeDisconnectionTable