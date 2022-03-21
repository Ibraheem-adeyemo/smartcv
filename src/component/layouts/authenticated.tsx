import React, { FC, memo, useContext } from "react";
import { dashboardIcon, userManagementIcon, auditIcon, systemSettingsIcon, transactionMonitoringIcon, channelsMonitoringIcon, InterchangeDisconnectionIcon, AuthenticatedPage, menuNames, cookieKeys, keysForArrayComponents } from "../../constants";
import { InterswitchLogo } from "../custom-component";
import { Avatar, Button, ChakraProvider, extendTheme, Flex, Grid, GridItem, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, SkeletonCircle, Text } from "@chakra-ui/react";
import { SkeletonLoader } from "..";
import { AuthContext } from "../../providers";
import { AppLink } from "../app";
import { useRouter } from "next/router";
import { ComponentWithChildren, MenuListItem } from "../../models";
import { useIdleTimer } from 'react-idle-timer'
import { getCookie } from "../../lib";
import { MotionFlex, MotionText } from "../framer";
import colors from "../../theme/foundations/colors";
import { breakpoints } from "../../theme/breakpoints";
import { components } from "../../theme/components";
import { appLayoutSX, appLinkSX, appLinkTextSX, interswitchLogoSx, mainSX, sidebarSX } from "../../sx";
import { horizontalPositionWithOpacity } from "../../animations";

interface AuthenticatedLayoutProps extends ComponentWithChildren {
    pageHeader: string | JSX.Element
}

const Layout: FC<AuthenticatedLayoutProps> = (props: AuthenticatedLayoutProps) => {
    const { user, signOut, error, refreshAccessToken } = useContext(AuthContext)
    const router = useRouter()
    const handleOnIdle = (event: any) => {
        // console.log('user is idle', event)
        // console.log('last active', getLastActiveTime())
    }
    const isUserLoading = typeof user === "undefined" && typeof error === "undefined"
    const isUserLoaded = typeof user !== "undefined" && typeof error === "undefined"
    const handleOnActive = () => {
        if (typeof window !== "undefined") {
            const timeLeft = (new Date()).getTime() - (+getCookie(cookieKeys.tokenDurationDate) * 1000 * 60 * 60)
            if (timeLeft > (+getCookie(cookieKeys.tokenExpiresIn) - 5)) {
                refreshAccessToken(getCookie(cookieKeys.refreshToken))
            }
        }
    }

    const handleOnAction = () => {
        const timeLeft = (new Date()).getTime() - (+getCookie(cookieKeys.tokenDurationDate) * 1000 * 60 * 60)
        if (timeLeft > (+getCookie(cookieKeys.tokenExpiresIn) - 5)) {
            refreshAccessToken(getCookie(cookieKeys.refreshToken))
        }
    }

    const { getLastActiveTime } = useIdleTimer({
        timeout: typeof window !== "undefined" ? (new Date()).getTime() - (+getCookie(cookieKeys.tokenDurationDate) * 1000 * 60 * 60) : 1000 * 60 * 20,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
    })
    // console.log({ session })

    const MenuLists = memo(() => {

        const menuList: MenuListItem[] = [{
            icon: dashboardIcon,
            name: menuNames.dashboard,
            link: AuthenticatedPage[0]
        }, {
            icon: transactionMonitoringIcon,
            name: menuNames.transactionMonitoring,
            link: AuthenticatedPage[1]
        }, {
            icon: channelsMonitoringIcon,
            name: menuNames.channelsMonitoring,
            link: AuthenticatedPage[2]
        }, {
            icon: InterchangeDisconnectionIcon,
            name: menuNames.interchangeDisconnection,
            link: AuthenticatedPage[3]
        }, {
            icon: userManagementIcon,
            name: menuNames.userManagement,
            link: AuthenticatedPage[4]
        }, {
            icon: auditIcon,
            name: menuNames.audit,
            link: AuthenticatedPage[5]
        }, {
            icon: systemSettingsIcon,
            name: menuNames.systemSettings,
            link: ""
        }]
        return <>
            {menuList.map((x, i) =>
                <MotionText color="brand.muted" animate="show" initial="hide"
                    sx={{
                        mx: ["auto", "auto", "auto", 0, 0, 0]
                    }}
                    key={`${keysForArrayComponents}${i}`}
                    variants={horizontalPositionWithOpacity(i)}>
                    <AppLink href={x.link ? x.link : "/"}role="group"
                        _active={{
                            outline: "none"
                        }}
                        _focus={{
                            outline: "none"
                        }}
                        _hover={{
                            bgColor: "brand.accent-color",
                            cursor: "pointer"
                        }}
                        sx={appLinkSX({menuListItem:x, router})}
                    >
                        <Icon as={x.icon} _groupHover={{
                            color: "brand.primary-blue"
                        }}
                            color={x.link === router.asPath ? "brand.primary-blue" : ""}
                            h="23px"
                            w="23px"
                        />
                        <Text sx={appLinkTextSX} >{x.name}</Text>
                    </AppLink>
                </MotionText>)}
        </>
    })


    return (
        <Grid
            sx={appLayoutSX}
        >
            <GridItem
                gridArea="header"
                borderBottom="0.5px solid #7F91A8"
                display="flex"
                justifyContent="space-between"
            >
                <Flex sx={interswitchLogoSx}>
                    <InterswitchLogo variant="sidbar-logo" />
                </Flex>
                <Flex alignItems="center" pr="39px">
                    <Menu>
                        <MenuButton as={Button} variant="just-text">
                            <Flex gap="42px" alignItems="center">

                                {isUserLoading && <>
                                    <SkeletonLoader rows={1} width="100px" height="15px" columns={1} loaderKey="menu-user" />
                                    <SkeletonCircle size="25" />
                                </>}
                                {isUserLoaded && <MotionFlex gap="12px" >
                                    <Text size="dropdown-text" variant="dropdown-text-header" sx={{
                                        my: "auto"
                                    }} > Hello, {user?.firstName}</Text>
                                    <Avatar name={user?.firstName === null ? "" : `${user?.firstName} ${user?.lastName}`} src="" />
                                </MotionFlex>
                                }

                            </Flex>
                        </MenuButton>
                        <MenuList d="flex" gap="1px" flexDir="column" px="18px" pt="22px">
                            <MenuItem as={Flex} gap="11px" alignItems="center">

                                {isUserLoading && <SkeletonCircle size="25" />}
                                {isUserLoaded && <Avatar name={user?.firstName === null ? "" : `${user?.firstName} ${user?.lastName}`} src="" />}
                                <Flex flexDir="column" gap="1px">
                                    {isUserLoaded &&
                                        <>
                                            <Text size="dropdown-text" variant="dropdown-text-header"> Hello, {user?.firstName}</Text>
                                            <Text variant="small-uted-tex"> {user?.email}</Text>
                                        </>
                                    }

                                    {!user && !error && <SkeletonLoader rows={2} width="100px" height="15px" columns={1} loaderKey="menu-email" />}

                                </Flex>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem>
                                {isUserLoading && <SkeletonLoader rows={1} width="100px" height="15px" columns={1} loaderKey="profile-and-preferences" />}

                                {isUserLoaded && <Text size="dropdown-tes">Profile and Preferences</Text>}
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => signOut()}>
                                {!user && typeof error === "undefined" && <SkeletonLoader rows={1} width="100px" height="15px" columns={1} loaderKey="sign-out" />}
                                {isUserLoaded && <Text size="dropdown-tes">Signout</Text>}
                            </MenuItem>
                            <MenuDivider />
                        </MenuList>
                    </Menu>
                </Flex>
            </GridItem>
            <GridItem
                sx={sidebarSX}
                
            >
                {isUserLoading && <SkeletonLoader rows={5} width="300px" columns={1} loaderKey="loader-list" />}
                {isUserLoaded && <MenuLists />}
            </GridItem>
            {isUserLoading && <GridItem d="flex" w="100%" alignItems="center" px="50px">  <SkeletonLoader rows={1} width="200px" height="20px" columns={1} loaderKey="page-header" /></GridItem>}
            {isUserLoaded &&
                <GridItem d="flex" w="100%" alignItems="center"> {typeof props.pageHeader === "string" ? <Text sx={{ 
                    px:["20px","20px","20px","30px","50px","50px"]
                }} variant="page-header">{props.pageHeader}</Text> : props.pageHeader}</GridItem>
            }


            {isUserLoading && <Flex sx = {{
                 pl:"50px",
                 pr:"55px",
                 py:"30px",
                 w:"100%", 
                 h:"100%"
            }}
               > <SkeletonLoader rows={1} height="100%" width="100%" columns={1} loaderKey="main" /></Flex>}
            { isUserLoaded &&
                <GridItem
                    sx={mainSX}
                >
                    {props.children}

                </GridItem>
            }
        </Grid>)
}

const AuthenticatedLayout:FC<AuthenticatedLayoutProps> = (props: AuthenticatedLayoutProps) => {
    const {userDetail}  = useContext(AuthContext)
    const tenantHasColor = userDetail && userDetail.tenant && userDetail.tenant.color
    const bgSidebarColor = tenantHasColor? userDetail.tenant.color.sidebarColor: colors.brand["bg-sidebar-color"];
    const bgMenuColor =  tenantHasColor? userDetail.tenant.color.headerColor: colors.brand["bg-horizontal-nav-color"];
    const bgButtonColor =  tenantHasColor? userDetail.tenant.color: "";
    const {LoginForm, ...newComponent} = components
    const reBrandColors = {
        brand: {
            "bg-sidebar-color": bgSidebarColor,
            "bg-horizontal-nav-color": bgMenuColor,
            "bg-button-color": bgButtonColor
        }
    }

    const overrides = {

        colors: {
            ...colors,
            ...reBrandColors
        },
        fonts: {
          body: "avertastd-regularuploadedfile"
        },
        components: newComponent,
        breakpoints
    }

    const theme = extendTheme(overrides)

    return <ChakraProvider theme={theme}>
        <Layout pageHeader={props.pageHeader} >
            {props.children}
        </Layout>
    </ChakraProvider>
}

export default AuthenticatedLayout

