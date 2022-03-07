import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import AuditExport from "../src/component/audit/audit-export";
import AuditSearch from "../src/component/audit/audit-search";
import { Authenticated } from "../src/component/layouts";
import AuditProvider from "../src/providers/audit-provider";
const AuditTable = dynamic(() => import("../src/component/audit/audit-table"), {ssr:false})
const AuditDetail = dynamic(() => import("../src/component/audit/audit-detail"), {ssr:false})
const Audit: NextPage = () => {

    return <AuditProvider>
        <Authenticated pageHeader={"Audit"}>
            <Flex flexDir="column" gap="24px">
                <Flex justifyContent="space-between">
                    <AuditSearch />
                    <AuditExport />
                </Flex>
                <AuditTable />
            </Flex>
            <AuditDetail />
        </Authenticated>
    </AuditProvider>
}

export default Audit