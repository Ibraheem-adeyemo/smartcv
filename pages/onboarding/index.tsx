import { Flex, CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {useOnboarding} from "../../hooks";
import { OnboardingContext } from "../../provider/onboarding-provider";

export default function Onboarding(props:any) {
    const [loading, setLoading] = useState(true)
    const {onboarding, steps} = useContext(OnboardingContext)
    const router = useRouter()

    useEffect(() => {
        if((typeof onboarding === "undefined" || onboarding === null) && typeof steps !== "undefined") {
            router.push(steps[0].url)
        } else if(typeof onboarding !== "undefined" && onboarding !== null && typeof steps !== "undefined") {
            router.push( steps[onboarding?.state as number].url)
        }
        setLoading(prev => !prev)
    }, []) 
    
  return (
    <Flex height="100vh">
      {loading && <CircularProgress isIndeterminate color="blue" m="auto" size="120px" /> }
    </Flex>
  )
}