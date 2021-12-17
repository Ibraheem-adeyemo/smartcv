import { Flex, Text, List, ListItem, Avatar } from "@chakra-ui/react"
import React, { FC, useMemo } from "react"
import { TickIcon } from "../constants"

const MissionStatement:FC = () => {
    const missionStatement = useMemo(() => [{
        missionHead: "ATM & Transaction monitoring",
        missionText: `Set-up new terminals,send downloads to disconnected terminals, realtime transaction monitoring, monitor online/offline/supervisor mode terminals`
    }, {
        missionHead: "Card operation",
        missionText: `Set-up new terminals,send downloads to disconnected terminals, realtime transaction monitoring, monitor online/offline/supervisor mode terminals`
    }, {
        missionHead: "Best in class support",
        missionText: "We are positioned as an industry expert with a dedicated request for all your needs and support"
    }], [])
    return (
        <Flex flexDir="column" gridGap="26px">
            <Text fontSize="30px" variant="card-header" color="white">
                Built to help you enhance your service delivery in the following areas
            </Text>

            <List gridGap="54px" d="flex" flexDir="column">
                {missionStatement.map((x, i) =>
                    <ListItem key={i} display="flex" gridGap="21px">
                        <Avatar bgColor="white" icon={<TickIcon boxSize="19.8px"  color="#4B4B4B" />} />
                       

                        <Flex flexDir="column"  color="white" gridGap="18px">
                            <Text color="white" variant="card-header" size="page-header">{x.missionHead}</Text>
                            <Text color="brand.inverted-muted">{x.missionText}</Text>
                        </Flex>
                    </ListItem>
                )}

            </List>
        </Flex>
    )
}

export default MissionStatement