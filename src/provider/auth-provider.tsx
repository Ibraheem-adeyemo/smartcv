import { createContext, FC } from "react";
import { useAuthentication } from "../hooks";
import { ComponentWithChildren } from "../models";

export const AuthContext = createContext<ReturnType<typeof useAuthentication>>({
    userDetail: undefined,
    user: undefined,
    token: "",
    error:undefined,
    signIn: () => (""),
    signOut: () => (""),
    loginWithPassport: async (code: string) =>{},
    refreshAccessToken:async (refreshToken:string) => {}
})
interface AuthProviderProps extends ComponentWithChildren {
}
const AuthProvider:FC<AuthProviderProps> = (props: AuthProviderProps) => {

    return <AuthContext.Provider value={useAuthentication()}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider