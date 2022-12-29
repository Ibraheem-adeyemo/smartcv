import { Flex, Text, List, ListItem, Avatar } from "@chakra-ui/react"
import React, { FC, memo, useMemo } from "react"
import { keysForArrayComponents, TickIcon } from "../constants"
import { MotionFlex, MotionList, MotionListItem, MotionText } from "./framer"

// eslint-disable-next-line react/display-name
const MissionStatement: FC = memo(() => {
    const missionStatement = [{
        missionHead: "ATM & Transaction monitoring",
        missionText: `A one-stop ATM and transaction information reporting application designed to display both transactional and non-transactional ATM data across terminals from within databases repository, consolidate and dissect the data in a concise, detailed, informative and aesthetically appealing manner.`
    }, {
        missionHead: "Interchange disconnection status",
        missionText: `This will promptly alert stakeholders via both visible notifications icon on the requisite menu and triggered emails to stakeholders when there are disconnections to Interswitch network, as well as empower admins to re-initiate the connection proactively.`
    }, {
        missionHead: "Best in class support",
        missionText: "We are positioned as an industry expert with a dedicated request for all your needs and support"
    }]
    return (
        <Flex flexDir="column" gap="26px">
            <MotionFlex
                sx={{
                    overflow: "hidden",
                    display: "inline-block"
                }}
                animate="show"
                initial="hide"
                variants={{
                    show: {
                        transition: {
                            when: "beforeChildren",
                            staggerChildren: 0.5
                        }
                    },
                    hide: {
                        transition: {
                            when: "afterChildren"
                        }
                    }
                }}
            >
                <MotionText sx={{
                    fontSize: "30px",
                    color: "white"
                }} variant="card-header"
                    initial="hide"
                    animate="show"
                    variants={{
                        show: {
                            y: 0,
                            transition: { duration: 0.85 }
                        },
                        hide: {
                            y: "200%",
                            transition: { duration: 0.75 }
                        }
                    }}
                >
                    Built to help you enhance your service delivery in the following areas
                </MotionText>
            </MotionFlex>
            <MotionList
                sx={{
                    gap: "54px",
                    d: "flex",
                    flexDir: "column",
                }}
                animate="show"
                initial="hide"
                variants={{
                    show: {
                        opacity: 1,
                        transition: {
                            when: "beforeChildren",
                            staggerChildren: 0.5
                        }
                    },
                    hide: {
                        opacity: 0,
                        transition: {
                            when: "afterChildren"
                        }
                    }
                }}
            >
                {missionStatement.map((x, i) =>
                    <MotionListItem key={`${keysForArrayComponents.missionStatementMotionText}${i}`}
                        sx={{
                            gap: "21px",
                            display: "flex"
                        }}
                        layout
                        animate="visible"
                        initial="hidden"
                        variants={{
                            visible: { opacity: 1, x: 0, transition: { delay: i * 0.5 } },
                            hidden: { opacity: 0, x: -100 }
                        }}
                    >
                        <Avatar bgColor="white" icon={<TickIcon boxSize="19.8px" color="#4B4B4B" />} />
                        <Flex flexDir="column" color="white" gap="18px">
                            <Text color="white" variant="card-header" size="page-header">{x.missionHead}</Text>
                            <Text color="brand.inverted-muted">{x.missionText}</Text>
                        </Flex>
                    </MotionListItem>
                )}

            </MotionList>
        </Flex>
    )
})

export default MissionStatement