import { ComponentWithChildren } from "../../models";
import { ImageBackground } from "../custom-component";
interface NonAuthenticatedProp extends ComponentWithChildren {
    
}
const NonAuthenticated = (props:NonAuthenticatedProp) => {
    return (
        <ImageBackground>
            {props.children}
        </ImageBackground>
    )
}
export default NonAuthenticated