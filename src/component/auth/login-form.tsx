
import { Text, Button } from "@chakra-ui/react";
import React, { FC, useContext, useEffect } from "react";
import { cookieKeys, cookiesTimeout, Images, links } from "../../constants";
import { AuthContext } from "../../providers";
import { setCookie } from "../../lib";
import { MotionBox, MotionFlex, MotionImage } from '../framer';
import { AppLink } from '../app';
import { appear, staggerChildren, staggerChildrenWithDuration, verticalPosition } from "../../animations";
import { loginButtonSX, loginFormContainerSX, registerDivSX } from "../../sx";
import { useLoading } from "../../hooks";

const LoginForm: FC = () => {
    const { user, userDetail, signIn, signOut } = useContext(AuthContext)
    const [loading, setLoading] = useLoading({isLoading: false, text: ""})
    useEffect(() => {

        if (typeof window !== "undefined") {
            setCookie(cookieKeys.token, "", cookiesTimeout.timeoutCookie)
        }
    }, [])

    return (
        <form method="POST" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading({isLoading: true, text: "Redirecting..."})
            signIn()
        }} >
            
            <MotionFlex sx={loginFormContainerSX}
                initial="hide"
                animate="show"
                variants={staggerChildrenWithDuration}
            >
                <MotionBox
                    sx={{
                        overflow: "hidden",
                        display: "inline-block"
                    }}

                    animate="show"
                    initial="hide"
                    variants={staggerChildren}
                >
                    <MotionBox
                        sx={{
                            display: "inline-block"
                        }}
                        initial="hide"
                        animate="show"
                        variants={verticalPosition}
                    >
                        <Text variant="card-header" size="page-header" >Welcome {!userDetail ? `` : ` ${user?.firstName}`}</Text>
                    </MotionBox>
                </MotionBox>
                <MotionImage src={Images.handShake} sx={{
                    boxSize: "167px"
                }} variants={appear()} alt="hand shake" />

                <MotionBox
                    sx={{
                        overflow: "hidden",
                        display: "inline-block"
                    }}
                    variants={staggerChildrenWithDuration}
                >
                    <MotionFlex sx={{
                        flexDir: "column",
                        gap: "8px"
                    }}

                        initial="hide"
                        animate="show"
                        variants={verticalPosition}
                    >
                        <Button type="submit" variant="primary-button" loadingText={loading.text} isLoading={loading.isLoading} sx={loginButtonSX}>
                            {!userDetail ? `Already on boarded? Login` : `Login as ${userDetail.email}`}
                        </Button>
                        {userDetail && <Button variant="just-text" onClick={() => {

                            signOut()
                        }}>Or Sign in with another Account</Button>}
                    </MotionFlex>
                </MotionBox>
                <MotionBox
                    sx={{
                        overflow: "hidden",
                        display: "inline-block"
                    }}
                    variants={staggerChildrenWithDuration}
                >
                    <MotionFlex sx={registerDivSX}

                        initial="hide"
                        animate="show"
                        variants={verticalPosition}
                    >
                        <Text> Not on boarded yet?</Text>
                        <AppLink href={links.registerOrganization} color="brand.primary-blue" >Register</AppLink>
                    </MotionFlex>
                </MotionBox>
            </MotionFlex>
        </form>)
}

export default LoginForm