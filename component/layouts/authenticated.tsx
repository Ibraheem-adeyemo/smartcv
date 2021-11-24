import Icon from "@chakra-ui/icon";
import { Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dashboardIcon, userManagementIcon, auditIcon, systemSettingsIcon, links, transactionMonitoringIcon, channelsMonitoringIcon } from "../../constants";
import { InterswitchLogo } from "../custom-component";
import { As, Avatar, Button, ComponentWithAs, Menu, MenuButton, MenuDivider, MenuItem, MenuList, SkeletonCircle } from "@chakra-ui/react";
import { SkeletonLoader } from "..";
import { AuthContext } from "../../provider/auth-provider";
import { AppLink } from "../app";
import { useRouter } from "next/router";

interface AuthenticatedLayout {
    pageHeader: string | JSX.Element,
    children?: ReactNode
}
interface MenuListItem {
    icon: ComponentWithAs<As<any>, object>,
    name: string,
    link: string
}
export default function AuthenticatedLayout(props: AuthenticatedLayout) {
    const { user, signOut, error } = useContext(AuthContext)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    // console.log({ session })

    const MenuLists = useCallback(() => {
        
    const menuList: MenuListItem[] = [{
        icon: dashboardIcon,
        name: "Dashboard",
        link: links.dashboard
    }, {
        icon: transactionMonitoringIcon,
        name: "Transaction Monitoring",
        link: "/"
    }, {
        icon: channelsMonitoringIcon,
        name: "Channels Monitoring",
        link: links.channelsMonitoring
    }, {
        icon: userManagementIcon,
        name: "user Management",
        link: links.userManagement
    }, {
        icon: auditIcon,
        name: "Audit",
        link: ""
    }, {
        icon: systemSettingsIcon,
        name: "System Settings",
        link: ""
    }]
        return <>
            {menuList.map((x, i) =>
                <AppLink key={i} href={x.link ? x.link : "/"} d="flex" gridGap="20px" role="group"
                    display="flex"
                    pl="13.9px"
                    pr="13px"
                    py="8px"
                    w="fit-content"
                    alignItems="center"
                    borderRadius="4px"
                    cursor="pointer"
                    _active={{
                        outline: "none"
                    }}
                    _focus={{
                        outline: "none"
                    }}
                    bgColor={x.link === router.asPath ? "brand.light-blue" : ""}
                    _hover={{
                        bgColor: "brand.light-blue",
                        cursor: "pointer"
                    }}
                    fontSize={["16px", "16px", "16px", "16px", "16px", "20px"]}
                >
                    <Icon as={x.icon} _groupHover={{
                        color: "brand.primary-blue"
                    }}
                        color={x.link === router.asPath ? "brand.primary-blue" : ""}
                        h="23px"
                        w="23px"
                    />
                    <Text color="brand.muted">{x.name}</Text>
                </AppLink>)}
        </>
    }, [])

    useEffect(() => {
        // setTimeout(() => {
        //     setLoading((prev) => !prev)
        // }, 1000)
    }, [])

    return (
        <Grid
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
                <Flex alignItems="center" pr="39px">
                    <Menu>
                        <MenuButton as={Button} variant="just-text">
                            <Flex gridGap="42px" alignItems="center">

                                {typeof user === "undefined" && typeof error === "undefined" && <> <SkeletonLoader rows={1} width="100px" height="15px" columns={1} /> <SkeletonCircle size="25" /></>}
                                {typeof user !== "undefined" && typeof error === "undefined" &&
                                    <><Text size="dropdown-text" variant="dropdown-text-header"> Hello, {user?.firstName}</Text>

                                        <Avatar name={user?.firstName === null ? "" : `${user?.firstName} ${user?.lastName}`} src="" /> </>
                                }

                            </Flex>
                        </MenuButton>
                        <MenuList d="flex" gridGap="1px" flexDir="column" px="18px" pt="22px">
                            <MenuItem as={Flex} gridGap="11px" alignItems="center">

                                {typeof user === "undefined" && typeof error === "undefined" && <SkeletonCircle size="25" />}
                                {typeof user !== "undefined" && typeof error === "undefined" && <Avatar name={user?.firstName === null ? "" : `${user?.firstName} ${user?.lastName}`} src="" />}
                                <Flex flexDir="column" gridGap="1px">
                                    {typeof user !== "undefined" && typeof error === "undefined" &&
                                        <>
                                            <Text size="dropdown-text" variant="dropdown-text-header"> Hello, {user?.firstName}</Text>
                                            <Text variant="small-uted-tex"> {user?.email}</Text>
                                        </>
                                    }

                                    {typeof user === "undefined" && typeof error === "undefined" && <SkeletonLoader rows={2} width="100px" height="15px" columns={1} />}

                                </Flex>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem>
                                {typeof user === "undefined" && typeof error === "undefined" && <SkeletonLoader rows={1} width="100px" height="15px" columns={1} />}

                                {typeof user !== "undefined" && typeof error === "undefined" && <Text size="dropdown-tes">Profile and Preferences</Text>}
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => signOut()}>
                                {typeof user === "undefined" && typeof error === "undefined" && <SkeletonLoader rows={1} width="100px" height="15px" columns={1} />}
                                {typeof user !== "undefined" && typeof error === "undefined" && <Text size="dropdown-tes">Signout</Text>}
                            </MenuItem>
                            <MenuDivider />
                        </MenuList>
                    </Menu>
                </Flex>
            </GridItem>
            <GridItem
                gridArea="sidebar"
                boxShadow="1px 0px 0px rgba(0, 0, 0, 0.15)"
                display="flex"
                gridGap="36.5px"
                pt="48px"
                flexDir="column"
                ml="40px"
                overflowX="auto"
            >
                {typeof user === "undefined" && typeof error === "undefined" && <SkeletonLoader rows={5} width="300px" columns={1} />}
                {typeof user !== "undefined" && typeof error === "undefined" && <MenuLists />}
            </GridItem>
            {typeof user === "undefined" && typeof error === "undefined" && <GridItem d="flex" w="100%" alignItems="center" px="50px">  <SkeletonLoader rows={1} width="200px" height="20px" columns={1} /></GridItem>}
            {typeof user !== "undefined" && typeof error === "undefined" &&
                <GridItem d="flex" w="100%" alignItems="center"> {props.pageHeader}</GridItem>
            }


            {typeof user === "undefined" && typeof error === "undefined" && <Flex w="100%" h="100%"
                pl="50px"
                pr="55px"
                py="30px"> <SkeletonLoader rows={1} height="100%" width="100%" columns={1} /></Flex>}
            {typeof user !== "undefined" && typeof error === "undefined" &&
                <GridItem
                    gridArea="main"
                    pl="50px"
                    pr="55px"
                    py="30px"
                    bgColor="brand.main_page"
                    overflowY="auto"
                >
                    {props.children}

                </GridItem>
            }
        </Grid>)
}