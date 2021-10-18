const StatCard = {
    part: ["stat", "statHeader", "statName", "statValue", "statDirection", "statPercentage", "statDay", "statUnkwnown"],
    baseStyle: {
        stat: {
            background: "#F2F5F8",
            borderRadius: "3px",
            display: "grid",
            gridTemplateRows: "2fr 1fr 1fr 1fr",
            gridTemplateColumns: "ifr 1fr 2fr 1fr",
            gridTemplateAreas: `
            "statHeader statHeader statHeader statHeader" 
            "statName statName statName statName" 
            "statValue statValue statValue statValue" 
            "statDirection statPercentage statDay statUnkwnown"`

        },
        statHeader: {
            gridArea:"statHeader",
            fontWeight: 800,
            fontSize: "16px",
            lineHeight: "24px",
            color:"#364657"
        },
        statName: {
            gridArea:"statName",
            fontSize: "13px",
            lineHeight: "16px",
            color: "#353F50"
        },
        statValue: {
            gridArea:"statValue",
            fontWeight: 800,
            fontSize: "30px",
            lineHeight: "36px",
            color:"#364657"
        },
        statDirection: {
            gridArea:"statDirection",
            width: "19.23px",
            height: "19px"
        },
        statPercentage: {
            gridArea:"statPercentage",
            fontSize: "14px",
            lineHeight: "17px",
            color: "#353F50"
        },
        statDay: {
            gridArea:"statDay",
            fontSize: "11px",
            lineHeight: "13px",
            color: "#7F91A8"
        },
        statUnkwnown: {
            gridArea:"statUnkwnown"
        }
    },
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {},
    // The default `size` or `variant` values
    defaultProps: {},
}

export default StatCard