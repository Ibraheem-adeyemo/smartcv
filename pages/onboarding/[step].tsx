import { Onboarding } from "../../component/layouts";
import { Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useOnboarding } from "../../hooks";
import { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { links } from "../../constants";

const CreateBank = dynamic(() => import('../../component/onboarding/create-bank'))
const CreateSuperAmin = dynamic(() => import('../../component/onboarding/create-super-admin'))
const InstitutionColors = dynamic(() => import('../../component/onboarding/institution-colors'))

export default function Step1(props: any) {
    const router = useRouter()
    const { steps } = useOnboarding()
    const { step } = router.query
    // debugger
    useEffect(() => {
        if (typeof step !== "undefined") {
            if (steps.findIndex((x, i) => x.url === `/onboarding/${step}`) < 0) {
                if (typeof window !== "undefined") {
                    router.push('./404')
                }
            }
        }
    }, [steps])
    const LoadTab = useCallback(() => {
        switch (`/onboarding/${step}`) {
            case links.createBank:
                return <CreateBank />
            case links.createSuperAdmin:
                return <CreateSuperAmin />
            case links.institutionColors:
                return <InstitutionColors />
            default:
                return <Text>No Tab was selected</Text>
        }
    }, [step])
    return (
        <Onboarding>{
            <LoadTab />
        }</Onboarding>
    )
}

