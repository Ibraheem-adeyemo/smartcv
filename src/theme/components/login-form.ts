const LoginForm = {
    parts: ["formcontainer", "welcome", "button", "textContainer", "error", "notRegistered", "frame3", "frame2", "group", "label", "input", "header", "passwordEye", "i"],
    // Styles for the base style
    baseStyle: {
      formcontainer: {
            width: "580px",
            height: "350px",
            marginTop: "160px",
            marginBottom: "100px",
            borderRadius: "6px",
          
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "36px 37px",
          
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            boxSizing: "border-box",
            boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.06)",
            textAlign: "center"
          },
          
        welcome: {
            width: "137px",
            height: "32px",
          
            /* header / h4 */
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "20px",
            lineHeight: "32px",
          
            /* identical to box height, or 160% */
            textAlign: "center",
          
            /* Neutrals & Text/neutral900 */
            color: "#353f50",
          
            transform: "rotate(-0.3deg)",
          },
          
        button: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignTtems: "center",
            cursor: "pointer",
          
            width: "506px",
            height: "48px",
            left: "0px",
            top: "0px",
          
            /* Active Blues/activeBlue400 */
            background: "#0275d8",
            borderRadius: "40px",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "0",
            flexGrow: "0",
          
            color: "#ffffff",
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
            alignItems:"center"
          },
          textContainer:{
            marginTop: "35px"
          },
        error: {
            /* body / medium */
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "center",
          
          
            /* Primary Reds/primaryRed400 */
            color: "#dc4437",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "1",
            flexGrow: "0",
            margin: "0px 4px",
          },
          
        notRegistered: {
            width: "505.86px",
            height: "22px",
            marginTop: "15px",
          
            fontFamily: "Avenir",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "22px",
          
            /* identical to box height */
            textAlign: "center",
          
            color: "#354052",
          
            transform: "rotate(-0.3deg)",
          },
          
        frame3: {
            /* Auto Layout */
            display: "flex",
            flexDirection: "column",
            alignTtems: "center",
            padding: "0px",
          
            width: "506px",
            height: "103.88px",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "2",
            flexGrow: "0",
            margin: "36px 0px",
          },
          
        frame2: {
            /* Auto Layout */
            display: "flex",
            flexDirection: "column",
            alignTtems: "flex-start",
            padding: "0px",
          
            width: "506px",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "1",
            flexGrow: "0",
            margin: "10px 0px",
          },
          
        group: {
            /* Auto Layout */
            display: "flex",
            flexDirection: "column",
            alignTtems: "flex-start",
            padding: "0px",
            width: "506px",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "0",
            flexGrow: "0",
            margin: "10px 0",
          },
          
          label: {
            left: "0%",
            right: "0%",
            top: "0%",
            bottom: "0%",
          
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "16px",
          
            /* identical to box height, or 114% */
            display: "flex",
            alignTtems: "center",
          
            /* Neutrals & Text/neutral900 */
            color: "#353f50",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "0",
            flexGrow: "0",
          },
          
          input: {
            border: "none",
            outline: "none",
            padding: "10px 0",
            margin: "2px 0",
          
            width: "506px",
            left: "0px",
          
            background: "#f3f5f6",
            borderRadius: "4px",
          
            /* body / large */
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "24px",
          
            /* identical to box height, or 150% */
            display: "flex",
            alignTtems: "center",
          
            color: "#354052",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "0",
            flexGrow: "0",
            // margin: "0px 0px",
          },
          
        header: {
            color: "#354052",
            fontFamily: "Avenir",
            fontStyle: "normal",
            fontWeight: "900",
            fontSize: "26px",
            lineHeight: "36px",
            transform: "rotate(-0.3deg)",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "0",
            flexGrow: "0",
            margin: "5px 0px",
          },
          
          formLink: {
            textDecoration: "none",
            cursor: "pointer",
          
            width: "170px",
            height: "10px",
          
            fontFamily: "Averta",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "19px",
          
            color: "#0275d8",
          
            transform: "rotate(-0.3deg)",
          
            /* Inside Auto Layout */
            flex: "none",
            order: "1",
            flexGrow: "0",
            margin: "10px 0px",
          },
          
        passwordEye: {
            position: "relative",
            display: "flex",
            justifyContent: "content-position",
          },
          
          i: {
            position: "absolute",
            marginTop: "2%",
            marginLeft: "95%",
            color: "#7889a3",
          },
          
          _hover: { 
            i: {
              color: "#354052",
            },
          }
          
    },
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {},
    // The default `size` or `variant` values
    defaultProps: {},
}

export default LoginForm