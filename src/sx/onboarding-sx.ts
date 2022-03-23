import { CSSObject } from "@chakra-ui/react";

export const onboardingContainerSX: CSSObject = {
    gap: ["59px", "59px", "59px", "59px", "59px"],
    h: "100vh",
    flexDir: "column"
}

export const onboardingContainerBodySX: CSSObject = {
    mx: ["306px", "306px", "306px", "306px", "306px", "306px"],
    gap: ["33px", "33px", "33px", "33px", "33px", "33px"],
    flexDirection: "column",
    h: "100%"
}

type stepsSXFunc = (state: number ) => CSSObject

export const stepsSX: stepsSXFunc = (state: number)=>({
    gap: state  > 0 ? `13px` : `100px`,
    alignItems: "center",
    justifyContent: "space-around"
})