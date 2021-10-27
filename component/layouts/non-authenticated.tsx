import { ImageBackground } from "../custom-component";

export default function NonAuthenticated (props:any) {
    return (
        <ImageBackground>
            {props.children}
        </ImageBackground>
    )
}