import { CSSObject } from "@chakra-ui/react";

export const onboardingContainerSX: CSSObject = {
    gap: ["10px", "10px", "15px", "20px", "20px", "20px"],
    h: "100vh",
    flexDir: "column"
}

export const onboardingContainerBodySX: CSSObject = {
    mx: ["56px", "56px", "106px", "150px", "256px", "306px"],
    gap: ["13px", "13px", "13px", "19px", "23px", "23px"],
    flexDirection: "column",
    h: "100%",
    overflow: "auto"
}

type stepsSXFunc = (state: number ) => CSSObject

export const stepsSX: stepsSXFunc = (state: number)=>({
    gap: state  > 0 ? `13px` : `100px`,
    alignItems: "center",
    justifyContent: "space-around"
})