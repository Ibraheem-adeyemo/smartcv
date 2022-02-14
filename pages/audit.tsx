import { Button, Flex, HStack } from "@chakra-ui/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import AuditExport from "../component/audit/audit-export";
import AuditSearch from "../component/audit/audit-search";
import { Authenticated } from "../component/layouts";
import AuditProvider from "../provider/audit-provider";
const AuditTable = dynamic(() => import("../component/audit/audit-table"), {ssr:false})
const AuditDetail = dynamic(() => import("../component/audit/audit-detail"), {ssr:false})
const Audit: NextPage = () => {

    return <AuditProvider>
        <Authenticated pageHeader={"Audit"}>
            <Flex flexDir="column" gridGap="24px">
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