import { NextPage } from "next";
import { InterchangeDisconnectionAppBar, InterchangeDisconnectionTabs, InterchangeDisconnectionTable } from "../src/component/interchange-disconnection";
import AuthenticatedLayout from "../src/component/layouts/authenticated";
import InterchangeDisconnectionProvider from "../src/provider/interchange-disconnection-provider";


const InterchangeDisconnection: NextPage = () => {

    return <InterchangeDisconnectionProvider>
        <AuthenticatedLayout pageHeader={"Interchange Disconnection"}>
            <InterchangeDisconnectionAppBar />
            <InterchangeDisconnectionTabs />
            <InterchangeDisconnectionTable />
        </AuthenticatedLayout>
    </InterchangeDisconnectionProvider>
}

export default InterchangeDisconnection