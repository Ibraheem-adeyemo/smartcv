import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC, useContext, useEffect } from "react";
import { AuditExport, AuditSearch } from ".";
import { appear, staggerChildren } from "../../animations";
import { appRoles } from "../../constants";
import { AuthContext, StatsContext } from "../../providers";
import { MotionFlex } from "../framer";
import AppBarFilter from "../stats/app-bar-filter";

const AuditTable = dynamic(() => import("./audit-table"), { ssr: false })
const AuditDetail = dynamic(() => import("./audit-detail"), { ssr: false })
const Audit: FC = () => {
    const { setFiltersToShow } = useContext(StatsContext)
    const {userDetail} = useContext(AuthContext)
    useEffect(() => {
        setFiltersToShow({ showTenantFilter: true })
    }, [])

    return (
        <>
            <MotionFlex flexDir="column" gap="24px" variants={staggerChildren}>
                <MotionFlex justifyContent="space-between" initial="hide" animate="show" variants={appear(0)} >
                    { userDetail && userDetail.role.name === appRoles.superAdmin && <AuditSearch />}
                    <Flex gap="20px">
                        <AppBarFilter />
                        <AuditExport />
                    </Flex>
                </MotionFlex>
                <AuditTable />
            </MotionFlex>
            <AuditDetail />
        </>
    )
}

export default Audit