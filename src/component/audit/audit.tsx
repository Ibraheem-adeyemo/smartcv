import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { AuditExport, AuditSearch } from ".";

const AuditTable = dynamic(() => import("./audit-table"), { ssr: false })
const AuditDetail = dynamic(() => import("./audit-detail"), { ssr: false })
const Audit: FC = () => {
    return (
        <>
            <Flex flexDir="column" gap="24px">
                <Flex justifyContent="space-between">
                    <AuditSearch />
                    <AuditExport />
                </Flex>
                <AuditTable />
            </Flex>
            <AuditDetail />
        </>
    )
}

export default Audit