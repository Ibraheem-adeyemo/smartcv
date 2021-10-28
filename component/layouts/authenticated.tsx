import Icon from "@chakra-ui/icon";
import { Box, Flex, Grid, GridItem, Link as ChakraLink, Text } from "@chakra-ui/layout";
import { signOut, useSession } from "next-auth/client";
import React, { ComponentProps, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { dashboardIcon, terminalsIcon, reportingIcon, userManagementIcon, auditIcon, systemSettingsIcon, links, DropdownIcon } from "../../constants";
import { InterswitchLogo } from "../custom-component";
import NextLink from 'next/link'
import { AppProps } from "next/app";
import { As, Avatar, Button, ComponentWithAs, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { SkeletonLoader } from "..";

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
    const menuList: MenuListItem[] = useMemo(() => ([{
        icon: dashboardIcon,
        name: "Dashboard",
        link: links.dasboard
    }, {
        icon: terminalsIcon,
        name: "Terminals",
        link: "/"
    }, {
        icon: reportingIcon,
        name: "Reporting",
        link: ""
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
    }]), [])

    const [session, loadingSession] = useSession()
    const [loading, setLoading] = useState(true)
    // console.log({ session })

    const MenuLists = useCallback(() => {
        return <>
            {!loading ? menuList.map((x, i) => <NextLink key={i} href={x.link ? x.link : "/"}>
                <ChakraLink href={x.link ? x.link : "/"} d="flex" gridGap="20px" role="group"
                    display="flex"
                    pl="13.9px"
                    pr="13px"
                    py="8px"
                    w="fit-content"
                    alignItems="center"
                    borderRadius="4px"
                    _hover={{
                        background: "brand.muted-blue",
                        cursor: "pointer"
                    }}
                    fontSize={["16px", "16px", "16px", "16px", "16px", "20px"]}
                >
                    <Icon as={x.icon} _groupHover={{
                        color: "#EAF4FE"
                    }}
                        h="23px"
                        w="23px"
                    />
                    <Text color="brand.muted">{x.name}</Text>
                </ChakraLink></NextLink>) : <SkeletonLoader itemRange={[0, 1]} skeletonRange={[0, 5]} height="50px" width="60%" gridGap="40px" />}
        </>
    }, [loading])

    useMemo(() => {
        setTimeout(() => {
            setLoading((prev) => !prev)
        }, 10000)
    }, [])

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
            <Flex alignItems="center" pr="39px">
                <Menu>
                    <MenuButton as={Button} variant="just-text">
                        <Flex gridGap="42px" alignItems="center">
                            <Text size="dropdown-text" variant="dropdown-text-header"> Hello, {session?.user?.name}</Text>

                            <Avatar name={session?.user?.name === null ? "" : session?.user?.name} src="" />
                        </Flex>
                    </MenuButton>
                    <MenuList d="flex" gridGap="1px" flexDir="column" px="18px" pt="22px">
                        <MenuItem as={Flex} gridGap="11px" alignItems="center">
                            <Avatar name={session?.user?.name === null ? "" : session?.user?.name} src="" />
                            <Flex flexDir="column" gridGap="1px">
                                <Text size="dropdown-text" variant="dropdown-text-header"> Hello, {session?.user?.name}</Text>
                                <Text variant="small-uted-tex"> {session?.user?.email}</Text>

                            </Flex>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem>
                            <Text size="dropdown-tes">Prifle and Oreferences</Text>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => signOut()}>
                            <Text size="dropdown-tes">Signout</Text>
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
            <MenuLists />
        </GridItem>
        <GridItem d="flex" w="100%" alignItems="center">{props.pageHeader}</GridItem>
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
    </Grid>)
}