import { NextPage } from "next";
import { InterchangeDisconnectionAppBar, InterchangeDisconnectionTabs, InterchangeDisconnectionTable } from "../component/interchange-disconnection";
import AuthenticatedLayout from "../component/layouts/authenticated";
import InterchangeDisconnectionProvider from "../provider/interchange-disconnection-provider";


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