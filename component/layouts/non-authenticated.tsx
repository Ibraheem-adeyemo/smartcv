import { ImageBackground } from "../custom-component";
interface NonAuthenticatedProp {
    children: JSX.Element | JSX.Element[]
}
const NonAuthenticated = (props:NonAuthenticatedProp) => {
    return (
        <ImageBackground>
            {props.children}
        </ImageBackground>
    )
}
export default NonAuthenticated