import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { InterchangeDisconnectionAppBar, InterchangeDisconnectionTabs, InterchangeDisconnectionTable } from "../src/component/interchange-disconnection";
import AuthenticatedLayout from "../src/component/layouts/authenticated";
import { InterchangeDisconnectionProvider, StatsProvider } from "../src/providers";


const InterchangeDisconnection: NextPage = () => {

    return (
        <StatsProvider>
            <InterchangeDisconnectionProvider>
                <AuthenticatedLayout pageHeader={"Interchange Disconnection"}>
                    <Flex sx={{
                        flexDir:"column",
                        gap: "20px"
                    }}>
                        <InterchangeDisconnectionAppBar />
                        <InterchangeDisconnectionTabs />
                        <InterchangeDisconnectionTable />
                    </Flex>
                </AuthenticatedLayout>
            </InterchangeDisconnectionProvider>
        </StatsProvider>)
}

export default InterchangeDisconnection