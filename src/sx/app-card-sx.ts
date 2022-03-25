import { CSSObject } from "@chakra-ui/react";

interface appCardMainSXProps {
    width?: string | string[]
}
type appCardMainSXFunc = (props?: appCardMainSXProps) => CSSObject
export const appCardMainSX: appCardMainSXFunc = (props = { width: "fit-content" }) => ({
    flexDir: "column",
    bg: "brand.white",
    px: "19px",
    py: "15px",
    w: props.width,
    gap: "16px",
    borderRadius: "8px",
    overflow: "auto"
})