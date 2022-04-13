import { forwardRef, Input } from "@chakra-ui/react"
import PhoneInput from 'react-phone-number-input'

export const MobileNoInput = forwardRef((props, ref) => {
    return <Input as={PhoneInput} defaultCountry="NG" {...props} ref={ref} />
})