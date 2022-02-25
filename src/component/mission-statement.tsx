import { Flex, Text, List, ListItem, Avatar } from "@chakra-ui/react"
import React, { FC, memo, useMemo } from "react"
import { TickIcon } from "../constants"
import { MotionFlex } from "./framer/motion-flex"
import { MotionList, MotionListItem } from "./framer/motion-list"
import { MotionText } from "./framer/motion-text"

const MissionStatement:FC =  memo(() => {
    const missionStatement = [{
        missionHead: "ATM & Transaction monitoring",
        missionText: `Set-up new terminals,send downloads to disconnected terminals, realtime transaction monitoring, monitor online/offline/supervisor mode terminals`
    }, {
        missionHead: "Card operation",
        missionText: `Set-up new terminals,send downloads to disconnected terminals, realtime transaction monitoring, monitor online/offline/supervisor mode terminals`
    }, {
        missionHead: "Best in class support",
        missionText: "We are positioned as an industry expert with a dedicated request for all your needs and support"
    }]
    return (
        <Flex flexDir="column" gridGap="26px">
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
                    gridGap: "54px",
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
                    <MotionListItem key={i}
                        sx={{
                            gridGap: "21px",
                            display: "flex"
                        }}
                        layout
                        animate="visible"
                        initial="hidden"
                        variants={{
                            visible: { opacity: 1, x: 0, transition: {delay: i * 0.5} },
                            hidden: { opacity: 0, x: -100 }
                        }}
                    >
                        <Avatar bgColor="white" icon={<TickIcon boxSize="19.8px" color="#4B4B4B" />} />
                        <Flex flexDir="column" color="white" gridGap="18px">
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