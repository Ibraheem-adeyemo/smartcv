import { Button, Flex } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { appRoles } from "../../constants";
import { AuthContext, InterchangeDisconnectionContext, StatsContext } from "../../providers";
import AppBarFilter from "../stats/app-bar-filter";

const InterchangeDisconnectionAppBar: FC = () => {
    const {userDetail} = useContext(AuthContext)
    const { setFiltersToShow } = useContext(StatsContext)
    const {} = useContext(InterchangeDisconnectionContext)
    setFiltersToShow({ showTodayFilter: true })

    return (
        <Flex justifyContent={"space-between"}>
            <AppBarFilter />
            {userDetail && userDetail.role.name !== appRoles.superAdmin && <Button variant="primary-button" px="53px" py="8px"  >Request Connection</Button>}
        </Flex>
    )
}

export default InterchangeDisconnectionAppBar