import { NextPage } from "next";
import AuthenticatedLayout from "../component/layouts/authenticated";
import InterchangeDisconnectionProvider from "../provider/interchange-disconnection-provider";

const InterchangeDisconnection: NextPage = () => {


    return <InterchangeDisconnectionProvider>
        <AuthenticatedLayout pageHeader={"Interchange Disconnection"}>

        </AuthenticatedLayout>
    </InterchangeDisconnectionProvider>
}

export default InterchangeDisconnection