import { CSSObject } from "@chakra-ui/react"

interface statsContainerSXFuncProps {
    height?: string | string[]
    width?: string | string[]
}
type statsContainerSXFunc = (props: statsContainerSXFuncProps) => CSSObject
export const statsContainerSX: statsContainerSXFunc = (props: statsContainerSXFuncProps) => ({
    flexGrow: 1,
    h: props.height,
    w: props.width,
    bgColor: "brand.stat_card"
})

export const statsContainerBodySX: CSSObject = {
    mt: "13px",
    ml: "19px",
    mb: "18px",
    mr: "65.36",
    gap: "16px",
    flexDir: "column",
    h: "89%"
}

export const statsTotalNumberTextSX: CSSObject = {
    fontWeight: "400",
    fontSize: ["13px", "13px", "13px", "13px", "13px", "13px"]
}

export const statsTotalNumberValueSX: CSSObject = {
    fontWeight: "800",
    fontSize: ["36px","36px","36px","36px","36px","36px"]
}