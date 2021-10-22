import { Link } from "@chakra-ui/layout";
import { VisuallyHiddenInput, Image } from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import { AppProps } from "next/app";
import React, { ComponentProps, ComponentPropsWithoutRef, useMemo } from "react";
import { Images, links } from "../constants";
import { ActionButton, FormContainer, FormError, NotRegistered, Welcome } from "./custom-component";


interface LoginFormProps extends ComponentPropsWithoutRef<any> {
    loginDetails:{
        csrf:string,
        session:any,
        redirectUri:string
    }
}

export default function LoginForm (props:LoginFormProps){
    const loginDetails= useMemo(() => ({
        ...props.loginDetails,
    }), [props.loginDetails])
    return(
    <FormContainer method="POST" onSubmit={((e:React.FormEvent<HTMLFormElement>) => 
        (e.preventDefault(), signIn("pass", { callbackUrl: loginDetails.redirectUri }))
        )}>
        <Welcome>Welcome</Welcome>
        <Image src={Images.handShake} width="110px" height="110px" alt="hand shake" />
        <VisuallyHiddenInput defaultValue={loginDetails.csrf} name="csrfToken" />
        <ActionButton className="button" type="submit">
            Already on boarded? Login
        </ActionButton>
        <FormError />
        {/* <p className="error">{error}</p> */}
        <NotRegistered>
            Not on boarded yet?{" "}
            <Link href={links.registerOrganization}>Register</Link>
        </NotRegistered>
    </FormContainer>)
}