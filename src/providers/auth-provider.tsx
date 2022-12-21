import { createContext, FC } from "react";
import { useAuthentication } from "../hooks";
import { AuthModel, ComponentWithChildren, LoginCredentialBody, userApiAuthModel } from "../models";

export const AuthContext = createContext<ReturnType<typeof useAuthentication>>({
    userDetailError: undefined,
    userDetail: undefined,
    user: undefined as unknown as AuthModel,
    token: "",
    error:undefined,
    authMode:"",
    signIn: () => (""),
    signOut: () => (""),
    apiLogin:async (obj:userApiAuthModel)=>{},
    loginWithPassport: async (code: string) =>{},
    refreshAccessToken:async (refreshToken:string) => {},

})

interface AuthProviderProps extends ComponentWithChildren {
}

const AuthProvider:FC<AuthProviderProps> = (props: AuthProviderProps) => {

    return <AuthContext.Provider value={useAuthentication()}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider