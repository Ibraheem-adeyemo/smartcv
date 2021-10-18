import { ImageBackground } from "../custom-component";

export default function ImageBackgrounds (props:any) {
    return (<ImageBackground>
        {props.children}
    </ImageBackground>)
}