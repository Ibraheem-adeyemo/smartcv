import { NextPage } from "next";
import React from "react";
import { Audit as AuditComponent } from "../src/component/audit";
import { Authenticated } from "../src/component/layouts";
import { AuditProvider, StatsProvider } from "../src/providers";
const Audit: NextPage = () => {

    return (<AuditProvider>
        <Authenticated pageHeader={"Audit"}>
            <StatsProvider>
                <AuditComponent />
            </StatsProvider>
        </Authenticated>
    </AuditProvider>)
}

export default Audit