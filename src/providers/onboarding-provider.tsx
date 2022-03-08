import { createContext, FC } from "react"
import { onboardingTabs } from "../constants"
import { useOnboarding } from "../hooks"
import { ComponentWithChildren, Step } from "../models"

export const OnboardingContext = createContext<ReturnType<typeof useOnboarding>>(
    {
        steps: onboardingTabs as Step[],
        changeIsRefresh: () => (""),
        addInfo: () => (""),
        refresh: () => (""),
        completeForm: () => (""),
        resetForm: () => (""),
        previousState: () => (""),
        loading: { isLoading: false, text: "" },
        startLoading: () => (""),
        stopLoading: () => ("")
    })
const OnboardingProvider: FC<ComponentWithChildren> = (props: ComponentWithChildren) => {
    return <OnboardingContext.Provider value={{...useOnboarding()}}>
        {props.children}
    </OnboardingContext.Provider>
}

export default OnboardingProvider