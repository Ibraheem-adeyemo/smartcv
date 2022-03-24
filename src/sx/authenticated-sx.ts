import { CSSObject } from "@chakra-ui/react";
import { NextRouter } from "next/router";
import { MenuListItem } from "../models";

interface authenticatedSXProps {
    router: NextRouter,
    menuListItem: MenuListItem
}

type appLinkSXFunc = (props: authenticatedSXProps) => CSSObject

export const appLinkSX:appLinkSXFunc = (props: authenticatedSXProps) => ({
    bgColor: props.menuListItem.link === props.router.asPath ? "brand.light-blue" : "",
    display: "flex",
    pl: "13.9px",
    pr: "13px",
    py: "8px",
    alignItems: "center",
    borderRadius: "4px",
    cursor: "pointer",
    gap:"20px" 
})

export const appLinkTextSX =
{
    opacity: [0, 0, 0, 1, 1, 1],
    display: ["none", "none", "none", "inline-block", "inline-block", "inline-block"],
    textAlign: "left"
}

export const appLayoutSX = {
    gridTemplateRows: [
        "[row1-start] 11vh [row1-end row2-start] 9vh [row2-end row3-start] 80vh [row3-end] ",
        "[row1-start] 11vh [row1-end row2-start] 9vh [row2-end row3-start] 80vh [row3-end] ",
        "[row1-start] 11vh [row1-end row2-start] 9vh [row2-end row3-start] 80vh [row3-end] ",
        "[row1-start] 11vh [row1-end row2-start] 9vh [row2-end row3-start] 80vh [row3-end] ",
        "[row1-start] 11vh [row1-end row2-start] 11vh [row2-end row3-start] 78vh [row3-end] ",
        "[row1-start] 11vh [row1-end row2-start] 11vh [row2-end row3-start] 78vh [row3-end] "
    ],
    gridTemplateColumns: ["11vw 89vw", "11vw 89vw", "11vw 89vw", "274px auto", "356px auto", "374px auto"],
    transition: "gridTemplateColumns 0.5s",
    gridTemplateAreas: `
    "header header" 
    "sidebar pageHeader" 
    "sidebar main"`,
    backgroundColor: "white",
    position: "relative"
}

export const sidebarSX = {
    gridArea: "sidebar",
    boxShadow: "1px 0px 0px rgba(0, 0, 0, 0.15)",
    display: "flex",
    gap: "36.5px",
    pt: "48px",
    flexDir: "column",
    ml: [0, 0, 0, "40px", "40px", "40px"],
    pr: [0, 0, 0, "40px", "40px", "40px"],
    position: "relative",
    overflowX: "auto",
    transition: "width .5s",
    "&>p>a>p":{
        fontSize: ["14px", "14px", "14px", "10px", "initial", "initial"]},
    "&:hover": {
        transition: "width .5s",
        zIndex: 10,
        left: 0,
        bottom: 0,
        top: 0,
        width: ["250px", "250px", "250px", "inherit", "inherit", "inherit",],
        background: "white",
        "&>p": {
            mx: 0,
            mr: "auto",
            transition: "display .5s 1s opacity .5s 1s",
            "&>a>p": {
                opacity: 1,
                display: "inline-block",
                transition: "display .5s 1s opacity .5s 1s",
                fontSize: ["14px", "14px", "14px", "10px", "initial", "initial"],
            }
        }

    }
}

export const mainSX = {
    gridArea: "main",
    px: ["20px", "20px", "20px", "30px", "50px", "50px"],
    py: "30px",
    bgColor: "brand.main_page",
    overflowY: "auto"
}

export const interswitchLogoSx = { 
    h:"100%", 
    borderBottom: "0.5px solid #7F91A8" 
}

export const skeletonLoaderForMainSX = {
    pl: "50px",
    pr: "55px",
    py: "30px",
    w: "100%",
    h: "100%"
}