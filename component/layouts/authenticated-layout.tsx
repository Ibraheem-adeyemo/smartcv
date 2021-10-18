import { Box } from "@chakra-ui/layout";
import { useSession } from "next-auth/client";
import { useMemo } from "react";
import { Icons } from "../../contants/icon-constants";
import { AuthenticatedLayout as AL, Header, InterswitchLogo, MainPage, PageHeader, Sidebar, SidebarLogoArea, SidebarMenu, SidebarMenuIcon, SidebarMenuName, SidebarMenus, UserAvatar, Userbox, UserFirstName } from "../custom-component";

export default function AuthenticatedLayout (props:any) {
    const menuList = useMemo(() => ([{
        icon:Icons.dashboard,
        name:"Dashboard"
    },{
        icon:Icons.terminals,
        name:"Terminals"
    },{
        icon:Icons.reporting,
        name:"Reporting"
    },{
        icon:Icons.userManagement,
        name:"user Management"
    },{
        icon:Icons.audit,
        name:"Audit"
    },{
        icon:Icons.systemSettings,
        name:"System Settings"
    } ]), [])

    const [session, loading] = useSession()
    console.log({session})
    return(<AL>
        <Header>
            <Userbox>
                <UserFirstName>
                    Hello, {session?.user?.name}
                </UserFirstName>
                <UserAvatar>
                    AM
                </UserAvatar>
            </Userbox>
            </Header>
        <Sidebar>
            <SidebarLogoArea>
                <InterswitchLogo variant="sidbar-logo" />
            </SidebarLogoArea>
            <SidebarMenus>
                {
                    menuList.map((x,i) => 
                    <SidebarMenu key={i} role="group"> 
                        <SidebarMenuIcon bgImage={`url('${x.icon}')`} _groupHover={{
                backgroundImage:"none",
                backgroundColor: "blue",
                maskImage: `url(${x.icon})`}}  />
                        <SidebarMenuName>{x.name}</SidebarMenuName>
                    </SidebarMenu>)
                }
            </SidebarMenus>
        </Sidebar>
        <PageHeader>{props.pageHeader}</PageHeader>
        <MainPage>
                {props.children}
        </MainPage>
    </AL>)
}