import { createContext, FC } from "react"
import useCrossDomainOnboarding from "../hooks/cross-domain-onboarding"
import { ComponentWithChildren } from "../models"

export const CrossDomainOnboardingContext = createContext<ReturnType<typeof useCrossDomainOnboarding>>({
    isOnCrossDomain: false,
    cantVew: false,
    removeData: () => { },
    setInterChangeIdData: (interChangeId: string) => { },
    getSelectedApp: () => { },
    sendCreatedAccount: (data) => { }
})

const CrossDomainOnboardingProvider: FC<ComponentWithChildren> = (props: ComponentWithChildren) => {
    return (
        <CrossDomainOnboardingContext.Provider value={{ ...useCrossDomainOnboarding() }}>
            {props.children}
        </CrossDomainOnboardingContext.Provider>
    )
}

export default CrossDomainOnboardingProvider