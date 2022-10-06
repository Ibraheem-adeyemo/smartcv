import { Button, useToast } from "@chakra-ui/react"
import { FC, useCallback } from "react"
import { useSWRConfig } from "swr"
import { apiUrlsv1, notificationMesage } from "../../constants"
import { useLoading } from "../../hooks"
import { BankModalProps } from "../../models"
import { deactivateTenant } from "../../services/v1"
import { MotionModal } from "../framer/motion-modal"
import BankView from "./bank-view"

type reloadFunc = (status: boolean) => void
interface DactivateTenantProps extends BankModalProps {
    reload: reloadFunc
}

const DeactivateTenant:FC<DactivateTenantProps> = (props: DactivateTenantProps) => {
    // debugger
    const [loading, changeLoading] = useLoading({isLoading: false, text:""})

    const toast = useToast()
    const {mutate} = useSWRConfig()
    const activate = useCallback(async () => {
        try {
            changeLoading({isLoading:true, text: "Activation..."})
            await deactivateTenant(props.bankInfo?.code as string)
            toast({
              status: "success",
              title: notificationMesage.TenantDeactivated,
              isClosable: true,
              variant: "left-accent"
            })
            mutate(apiUrlsv1.tenant)
            props.reload(true)
        } catch (error: any) {
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
            
            <Button variant="primary-button" px="115px" py="8px" isLoading={loading?.isLoading} loadingText={loading && loading.text? "loading" : loading.text} onClick={activate}>Deactivate</Button>
        }  />
    )
}

export default DeactivateTenant