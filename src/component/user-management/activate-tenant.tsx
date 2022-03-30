import { Button, useToast } from "@chakra-ui/react"
import { FC, useCallback } from "react"
import { useSWRConfig } from "swr"
import { apiUrlsv1, notificationMesage } from "../../constants"
import { useLoading } from "../../hooks"
import { BankModalProps } from "../../models"
import { activateTenant } from "../../services/v1"
import { MotionModal } from "../framer/motion-modal"
import BankView from "./bank-view"

type reloadFunc = (status: boolean) => void
interface ActivateTenantProps extends BankModalProps {
    reload: reloadFunc
}

const ActivateTenant:FC<ActivateTenantProps> = (props: ActivateTenantProps) => {
    // debugger
    const [loading, changeLoading] = useLoading({isLoading: false, text:""})

    const toast = useToast()
    const {mutate} = useSWRConfig()
    const activate = useCallback(async () => {
        try {
            changeLoading({isLoading:true, text: "Activation..."})
            await activateTenant(props.bankInfo?.code as string)
            toast({
              status: "success",
              title: notificationMesage.AccountActivated,
              isClosable: true,
              variant: "left-accent"
            })
            mutate(apiUrlsv1.tenant)
            props.reload(true)
        } catch (error: any) {
            // debugger
            // console.log({error})
            toast({
              status: "error",
              title: typeof error !== "undefined" ? (typeof error.message !== "undefined"? error.message: error): notificationMesage.AnErrorOccurred,
              isClosable: true,
              variant: "left-accent"
            })
        }
        changeLoading({isLoading:false, text: ""})

    }, [loading])

    return (
        <BankView isOpen={props.isOpen} bankInfo={props.bankInfo} closeModal={ () => props.closeModal()} actionButton={
            
            <Button variant="primary-button" px="115px" py="8px" isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={activate}>Activate</Button>
        }  />
    )
}

export default ActivateTenant