import dynamic from "next/dynamic"
import { FC, Fragment, useContext, useEffect, useState } from "react"
import { InterchangeReconnectionModalNames } from "../../constants"
import { interchangeDisconnectionTabsName } from "../../constants/tabs"
import { InterchangeReconnectionModal } from "../../models"
import { InterchangeDisconnectionContext } from "../../providers"

const InterchangeDisconnectionStatusTable = dynamic(() => import("./interchange-disconnection-status-table"), { ssr: false })
const InterchangeConnectionRequestTable = dynamic(() => import("./interchange-connection-request-table"), { ssr: false })
const InterchangeReconnectionRequest = dynamic(() => import("./interchange-reconnection-request"), { ssr: false })

const InterchangeDisconnectionTable: FC = () => {
    const { tabs, modals } = useContext(InterchangeDisconnectionContext)
    const [selectedModal, setSelectedModal] = useState<InterchangeReconnectionModal>()

    useEffect(() => {
        const modal = modals.find((x, i) => (x.name === InterchangeReconnectionModalNames.interchangeReconnection) && x.isOpen)
        // debugger
        setSelectedModal(modal)
    }, [modals])

    return (<>
        {tabs.map((x, i) => {
            if (x.isSelected) {
                if (x.name === interchangeDisconnectionTabsName.status) {
                    return (<><InterchangeDisconnectionStatusTable key={i} />

                        {selectedModal && selectedModal.isOpen && selectedModal.name === InterchangeReconnectionModalNames.interchangeReconnection && <InterchangeReconnectionRequest />}
                    </>)
                } else if (x.name === interchangeDisconnectionTabsName.connectionRequest) {
                    return <> <InterchangeConnectionRequestTable key={i} />

                        {selectedModal && selectedModal.isOpen && selectedModal.name === InterchangeReconnectionModalNames.interchangeReconnection && <InterchangeReconnectionRequest />}
                    </>
                }
            }
            return <Fragment key={i}></Fragment>

        })}
    </>)
}

export default InterchangeDisconnectionTable