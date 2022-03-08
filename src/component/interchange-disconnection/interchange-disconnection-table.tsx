import dynamic from "next/dynamic"
import { FC, Fragment, useContext } from "react"
import { interchangeDisconnectionTabsName } from "../../constants/tabs"
import { InterchangeDisconnectionContext } from "../../providers"

const InterchangeDisconnectionStatusTable = dynamic(() => import("./interchange-disconnection-status-table"), {ssr:false})
const InterchangeConnectionRequestTable = dynamic(() => import("./interchange-connection-request-table"), {ssr:false})

const InterchangeDisconnectionTable: FC = () => {
    const { tabs } = useContext(InterchangeDisconnectionContext)
    return <>
        {tabs.map((x, i) => {
            if (x.isSelected) {
                if (x.name === interchangeDisconnectionTabsName.status) {
                    return <InterchangeDisconnectionStatusTable key={i} />
                } else if (x.name === interchangeDisconnectionTabsName.connectionRequest) {
                    return <InterchangeConnectionRequestTable key={i} />
                }
            }
            return <Fragment  key={i}></Fragment>

        })}
    </>
}

export default InterchangeDisconnectionTable