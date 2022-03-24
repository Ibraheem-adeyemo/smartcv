import { NextPage } from "next";
import React from "react";
import { Audit as AuditComponent } from "../src/component/audit";
import { Authenticated } from "../src/component/layouts";
import { AuditProvider } from "../src/providers";
const Audit: NextPage = () => {

    return (<AuditProvider>
        <Authenticated pageHeader={"Audit"}>
            <AuditComponent />
        </Authenticated>
    </AuditProvider>)
}

export default Audit