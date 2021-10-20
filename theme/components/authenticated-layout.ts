const AuthenticatedLayout = {
    parts: ["parent", "horinzontalMenu", "userBox", "userFirstName", "userAvatar", "pageHeader", "sideBar", "sidebarLogoArea", "sidebarMenus", "sidebarMenu", "sidebarMenuIcon", "sidebarMenuName", "main"],
    // Styles for the base style
    baseStyle: {
        parent: {
            height:"100vh",
            display: "grid",
            gridTemplateRows: "[row1-start] 89px [row1-end row2-start] 66px [row2-end row3-start] auto [row3-end] ",
            gridTemplateColumns: "274px auto",
            gridTemplateAreas: `
            "sidebar header" 
            "sidebar pageHeader" 
            "sidebar main"`,
        },
        horinzontalMenu: {
            gridArea: "header",
            borderBottom: "0.5px solid #7F91A8",
            display:"flex",
            justifyContent:"right",
            alignItems:"center",
            background: "white"

        },
        userBox:{
            paddingRight:"39px",
            display:"flex",
        },
        userFirstName: {
            paddingRight:"42px"
        },
        userAvatar:{
            background: "#33475C",
            borderRadius: "1365.5px",
            width: "32px",
            height: "32px",
            fontSize:"12px",
            color: "white",
            padding: "3%"

        },
        pageHeader: {
            gridArea:"pageHeader",
            background: "white"
        },
        sidebar: {
            gridArea: "sidebar",
            boxShadow: "1px 0px 0px rgba(0, 0, 0, 0.15)",
            background: "white"
        },
        sidebarLogoArea: {
            borderBottom: "0.5px solid #7F91A8",
            display: "flex",
            height:"89px"
        },
        sidebarMenus: {
            display: "flex",
            flexDirection: "column",
            marginLeft: "40px",
            marginTop: "48px"

        },
        sidebarMenu: {
            display: "flex",
            paddingLeft:"13.9px",
            paddingRight:"13px",
            paddingY:"7.9px",
            width:"fit-content",
            ":not(:last-child)": {
                marginBottom:"27px"
            },
            _hover: {
                background: "#EAF4FE",
                borderRadius: "4px",
                cursor:"pointer"
            }
        },
        sidebarMenuIcon: {
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
            height:"23px",
            width:"23px"
        },
        sidebarMenuName: {
            marginLeft:"20px",
            color:"#7F91A8",

        },
        main: {
            gridArea: "main",
            marginLeft: "50px",
            marginRight: "55px",
            marginY:"30px"
        }
    },
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {},
    // The default `size` or `variant` values
    defaultProps: {},
}

export default AuthenticatedLayout