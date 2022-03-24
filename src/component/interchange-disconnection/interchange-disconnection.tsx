import { Flex } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { FC } from "react"

const InterchangeDisconnectionAppBar = dynamic(() => import("./interchange-disconnection-app-bar"), {ssr: false})
const InterchangeDisconnectionTabs = dynamic(() => import("./interchange-disconnection-tabs"), {ssr: false})
const InterchangeDisconnectionTable = dynamic(() => import("./interchange-disconnection-table"), {ssr: false})
const InterchangeDisconnection:FC = () => {
    return (
        <Flex sx={{
            flexDir:"column",
            gap: "20px"
        }}>
            <InterchangeDisconnectionAppBar />
            <InterchangeDisconnectionTabs />
            <InterchangeDisconnectionTable />
        </Flex>
    )
}

export default InterchangeDisconnection