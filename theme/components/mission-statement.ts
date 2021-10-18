const MissionStatement = {
    
    parts: ["missionStatement", "logoContainer", "textContainer", "topBanner", "bulletContainer", "bulletHeader", "bulletMessage", "messageContainer", ],
    // Styles for the base style
    baseStyle: {
        missionStatement: {
            
        },
        logoContainer: {
            marginTop: "25px"
          },
          
          textContainer: {
            marginTop: "35px"
          },
          
          topBanner: {
            width: "462px",
            height: "115px",
          
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: 800,
            fontSize: "30px",
            lineHeight: "36px",
            letterSpacing: "0.01em",
          
            color: "#ffffff",
          },
          bulletContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            margin: "40px 0",
          },
          bulletHeader: {
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: 800,
            fontSize: "22px",
            lineHeight: "26px",
          
            color: "#ffffff",
          
            /* Inside Auto Layout */
            flex: "none",
            order: 0,
            flexGrow: 0,
            marginBottom: "10px",
          },
          
          bulletMessage: {
           
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "19px",
            letterSpacing: "0.01em",
          
            color: "#cecccc",
          
            /* Inside Auto Layout */
            flex: "none",
            order: 1,
            flexGrow: 0,
            margin: "8px 0px"
          },
          
          messageContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            width: "428px",
          
            top: "0px",
          
            /* Inside Auto Layout */
            flex: "none",
            order: 1,
            flexGrow: 0,
            margin: "0px 21px"
          }
    },
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {},
    // The default `size` or `variant` values
    defaultProps: {},
}

export default MissionStatement