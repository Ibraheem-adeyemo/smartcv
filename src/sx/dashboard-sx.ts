import { CSSObject } from "@chakra-ui/react";

export const dashboardContainerSX: CSSObject = {
  gap: ["30px", "30px", "30px", "30px", "30px", "30px"],
  flexWrap: "wrap",
};
export const issuingFailedSuccessContainerSx: CSSObject = {
  width: {base:'100%', lg:"50%"},
  height: "100%",
  bg: "white",
  borderRadius: "8px",
  shadow: "md",
  p: 50,
};
export const issuingFailedSuccessBoxSx: CSSObject = {
  width: "207px",
  height: "141px",
  flexDirection: "column",
  justifyContent: "center",
  background: "brand.grey.50",
  borderRadius: "4px",
};
export const issuingBreakdownTranBoxSx: CSSObject = {
  alignItems: "flex-start",
  gap: "20px",
  p: 0,
  width: "100%",
};
export const dashboardBoxSx: CSSObject = {
  width: "100%",
  flexDirection: "column",
  gap: "32px",
  alignItems: "flex-start",
};
export const chartContainerSx: CSSObject = {
  bg: "white",
  p: {base:'5px', md:'15px', lg:"30px"},
  borderRadius: "8px",
  boxShadow: "md",
  flexDirection: "column",
  gap: "30px",
  height: "100%",
};
