import Icon from "@chakra-ui/icon";
import { Box, Flex, Grid, GridItem, Link as ChakraLink, Text } from "@chakra-ui/layout";
import { useSession } from "next-auth/client";
import React, { useMemo } from "react";
import { dashboardIcon, terminalsIcon, reportingIcon, userManagementIcon, auditIcon, systemSettingsIcon, links } from "../../constants";
import { InterswitchLogo } from "../custom-component";
import NextLink from 'next/link'
export default function AuthenticatedLayout(props: any) {
    const menuList = useMemo(() => ([{
        icon: dashboardIcon,
        name: "Dashboard",
        link: links.dasboard
    }, {
        icon: terminalsIcon,
        name: "Terminals"
    }, {
        icon: reportingIcon,
        name: "Reporting"
    }, {
        icon: userManagementIcon,
        name: "user Management",
        link: links.userManagement
    }, {
        icon: auditIcon,
        name: "Audit"
    }, {
        icon: systemSettingsIcon,
        name: "System Settings"
    }]), [])

    const [session, loading] = useSession()
    console.log({ session })
    return (<Grid
        h={"100vh"}
        templateRows={"[row1-start] 89px [row1-end row2-start] 66px [row2-end row3-start] auto [row3-end] "}
        templateColumns={["274px auto", "274px auto", "274px auto", "274px auto", "274px auto", "374px auto"]}
        templateAreas={`
            "header header" 
            "sidebar pageHeader" 
            "sidebar main"`
        }
        backgroundColor="white"
        >
        <GridItem
            gridArea="header"
            borderBottom="0.5px solid #7F91A8"
            display="flex"
            justifyContent="space-between"
        >

            
            <Flex
                borderBottom="0.5px solid #7F91A8"
                h="89px">
                <InterswitchLogo variant="sidbar-logo" />
            </Flex>
            <Flex>
                <Text>
                    Hello, {session?.user?.name}
                </Text>
            </Flex>
        </GridItem>
        <GridItem
            gridArea="sidebar"
            boxShadow="1px 0px 0px rgba(0, 0, 0, 0.15)"
            display="flex"
            flexDir="column"
                ml="40px"
                overflowX="auto"
        >
                    
                {
                    menuList.map((x, i) =>
                    <NextLink href={x.link?x.link:"/"}>
                        <ChakraLink  href={x.link?x.link:"/"} key={i} role="group"
                        display="flex" 
                        pl="13.9px"
                        pr="13px"
                        py="8px"
                        my="10px"
                        w="fit-content"
                        alignItems="center"
                        borderRadius="4px"
                        __css={{
                            ":not(:last-child)":{
                                mb:"27px"
                            }
                        }}
                        _hover = {{
                            background: "#EAF4FE",
                            cursor:"pointer"
                        }}
                            fontSize={["16px", "16px", "16px", "16px", "16px", "20px"]}
                        >
                            <Icon as={x.icon} _groupHover={{
                                color:"#EAF4FE"
                            }}
                                h="23px"
                                w="23px"
                            />
                            <Text px="20px" color="brand.muted">{x.name}</Text>
                        </ChakraLink></NextLink>)
                }
        </GridItem>
        <GridItem>{props.pageHeader}</GridItem>
        <GridItem 
            gridArea = "main"
            pl="50px"
            pr="55px"
            py="30px"
            bgColor="brand.main_page"
            overflow="auto"
            >
            {props.children}
        </GridItem>
    </Grid>)
}