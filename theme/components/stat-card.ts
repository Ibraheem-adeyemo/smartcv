const StatCard = {
    parts: ["statHolder", "statHolderTopic", "stat", "statHeader", "statName", "statValue", "statDirection", "statPercentage", "statDay", "statUnkwnown"],
    baseStyle: ({count}:{count:number}) => ({
        statHolder: {
            background: "white",
            display: "grid",
            gridTemplateColumns: `repeat(${count}, 224px)`,
            gap: "15px",
            padding: "15px",
            width: "fit-content"
        },
        statHolderTopic: {
            fontWeight: 800,
            fontSize: "16px",
            lineHeight: "24px",
            marginTop:"15px",
            gridArea:"statHolderTopic",
            gridColumn: `1 / ${count + 1}`,
            gridRow:1
        },
        stat: {
            background: "#F2F5F8",
            borderRadius: "3px",
            display: "grid",
            gridTemplateRows: "20px 65px 18px 38px 38px",
            gridTemplateColumns: "10px .7fr 1fr 1.5fr 65px",
            gridTemplateAreas: `
            ". . . . ." 
            ". statHeader statHeader statHeader statHeader" 
            ". statName statName statName statName" 
            ". statValue statValue statValue statValue" 
            ". statDirection statPercentage statDay statUnknown"`,
            width:"224px"

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
            height: "19px",
            alignSelf:"center",
        },
        statPercentage: {
            gridArea:"statPercentage",
            fontSize: "14px",
            lineHeight: "17px",
            color: "#353F50",
            alignSelf:"center",
        },
        statDay: {
            gridArea:"statDay",
            fontSize: "11px",
            lineHeight: "13px",
            color: "#7F91A8",
            alignSelf:"center",
        },
        statUnknown: {
            gridArea:"statUnknown",
            width: "19.23px",
            height: "19px",
            alignSelf:"center",
        }
    }),
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {},
    // The default `size` or `variant` values
    defaultProps: {},
}

export default StatCard