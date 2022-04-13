import { NextPage } from "next";
import { InterchangeDisconnection as InterchangeDisconnectionComponent } from "../src/component/interchange-disconnection";
import AuthenticatedLayout from "../src/component/layouts/authenticated";
import { InterchangeDisconnectionProvider, StatsProvider } from "../src/providers";


const InterchangeDisconnections: NextPage = () => {

    return (
        <StatsProvider>
            <InterchangeDisconnectionProvider>
                <AuthenticatedLayout pageHeader={"Interchange Disconnection"}>
                    <InterchangeDisconnectionComponent />
                </AuthenticatedLayout>
            </InterchangeDisconnectionProvider>
        </StatsProvider>)
}

export default InterchangeDisconnections