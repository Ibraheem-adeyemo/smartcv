import { Onboarding } from "../../component/layouts";
import { Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cookieKeys, links, sessionStorageKeys } from "../../constants";
import { getCookie } from "../../lib";
import { OnboardingProvider } from "../../provider";
import { OnboardingContext } from "../../provider/onboarding-provider";
import CrossDomainOnboardingProvider from "../../provider/cross-domain-onboarding-provider";

const CreateBank = dynamic(() => import('../../component/onboarding/create-bank'))
const CreateSuperAmin = dynamic(() => import('../../component/onboarding/create-super-admin'))
const InstitutionColors = dynamic(() => import('../../component/onboarding/institution-colors'))


interface LoadTabProps {
    step: string | string[],
    state: number
}

const LoadTab: FC<LoadTabProps> = (props: LoadTabProps) => {
    // debugger
    switch (`/onboarding/${props.step}`) {
        case links.createBank:
            return <CreateBank step={props.state as number} />
        case links.createSuperAdmin:
            return <CreateSuperAmin step={props.state as number} />
        case links.institutionColors:
            return <InstitutionColors step={props.state as number} />
        default:
            return <Text>No Tab was selected</Text>
    }
}
export default function Step1(props: any) {
    const router = useRouter()
    const { step } = router.query
    const { steps } = useContext(OnboardingContext)
    const [stepNumber, setStepNumber] = useState<number>()
    // debugger
    useEffect(() => {
        // debbuger
        if (typeof steps !== "undefined" && typeof step !== "undefined") {
            const index = steps.findIndex((x, i) => x.url === `/onboarding/${step}`)
            if (index < 0) {
                if (typeof window !== "undefined") {
                    router.push(links.notFound)
                }
            } else {
                setStepNumber(index)
            }
        }
    }, [steps, step])

    useEffect(() => {
        // console.log({stepNumber})
        debugger
        if (typeof window !== "undefined") {
            debugger
            const interchange1 = getCookie(cookieKeys.interchangeId)
            const interchange2 = window.sessionStorage.getItem(sessionStorageKeys.interchangeId)
            if (!interchange1 && !interchange2)
                router.push(links.registerOrganization)
        }
    }, [])
    return (
        <>
            {typeof window !== "undefined" &&
                <CrossDomainOnboardingProvider>
                    <OnboardingProvider>
                        <Onboarding>
                            <>{typeof stepNumber !== "undefined" && typeof step !== "undefined" && <LoadTab state={stepNumber} step={step} />}</>
                        </Onboarding>
                    </OnboardingProvider>
                </CrossDomainOnboardingProvider>
            }
        </>
    )
}

