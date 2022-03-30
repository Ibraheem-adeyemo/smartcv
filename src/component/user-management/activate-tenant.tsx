import { Button } from "@chakra-ui/react"
import { FC, useCallback } from "react"
import { useLoading } from "../../hooks"
import { BankModalProps } from "../../models"
import { MotionModal } from "../framer/motion-modal"
import BankView from "./bank-view"

interface ActivateTenantProps extends BankModalProps {
    
}

const ActivateTenant:FC<ActivateTenantProps> = (props: ActivateTenantProps) => {
    debugger
    const [loading, changeLoading] = useLoading({isLoading: false, text:""})

    const activate = useCallback(() => {
        try {
            changeLoading({isLoading:true, text: "Activation..."})
        } catch (error) {
            
        }

    }, [loading])

    return (
        <BankView isOpen={props.isOpen} bankInfo={props.bankInfo} closeModal={ () => props.closeModal()} actionButton={
            
            <Button variant="primary-button" px="115px" py="8px" isLoading={loading?.isLoading} loadingText={typeof loading?.text === "undefined" ? "loading" : loading.text} onClick={activate}>Activate</Button>
        }  />
    )
}

export default ActivateTenant