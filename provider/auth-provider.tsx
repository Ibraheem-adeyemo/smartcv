import { createContext } from "react";
import { useAuthentication } from "../hooks";

export const AuthContext = createContext<ReturnType<typeof useAuthentication>>({
    user: undefined,
    token: "",
    error:undefined,
    signIn: () => (""),
    signOut: () => (""),
    loginWithPassport: async (code: string) =>{}
})
interface AuthProviderProps {
    children: JSX.Element
}
export default function AuthProvider(props: AuthProviderProps) {

    return <AuthContext.Provider value={useAuthentication()}>
        {props.children}
    </AuthContext.Provider>
}