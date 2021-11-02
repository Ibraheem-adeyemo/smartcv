import { Onboarding, OnboardingContext } from "../../component/layouts";
import { Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useOnboarding } from "../../hooks";
import { useCallback, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { links } from "../../constants";

const CreateBank = dynamic(() => import('../../component/onboarding/create-bank'))
const CreateSuperAmin = dynamic(() => import('../../component/onboarding/create-super-admin'))
const InstitutionColors = dynamic(() => import('../../component/onboarding/institution-colors'))

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
                    router.push('./404')
                }
            } else {
                setStepNumber(index)
            }
        }
    }, [steps, step])

    useEffect(() => {
        console.log({stepNumber})
    }, [stepNumber])

    const LoadTab = useCallback(({index}: {index:number}) => {
        // debugger
        switch (`/onboarding/${step}`) {
            case links.createBank:
                return <CreateBank step={index as number} />
            case links.createSuperAdmin:
                return <CreateSuperAmin step={index as number} />
            case links.institutionColors:
                return <InstitutionColors step={index as number} />
            default:
                return <Text>No Tab was selected</Text>
        }
    }, [step, stepNumber])
    return (
        <Onboarding>{
            <LoadTab index={stepNumber as number}  />
        }</Onboarding>
    )
}

