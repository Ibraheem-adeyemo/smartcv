import { Button, Flex } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { StatsContext } from "../../provider/stats-provider";
import AppBarFilter from "../stats/app-bar-filter";

const InterchangeDisconnectionAppBar: FC = () => {

    const { setFiltersToShow } = useContext(StatsContext)
    setFiltersToShow({ showTodayFilter: true })
    return (
        <Flex justifyContent={"space-between"}>
            <AppBarFilter />
            <Button variant="primary-button" px="53px" py="8px"  >Request Connection</Button>
        </Flex>
    )
}

export default InterchangeDisconnectionAppBar