import { Button, Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import dynamic from 'next/dynamic'
import React, { useState } from "react"
import { staggerChildrenWithDuration, verticalPosition } from "../src/animations"
import { Dashboard as DashboardPage  } from "../src/component/dashboard"
import { AnimatedText, MotionBox, MotionFlex } from "../src/component/framer"
import { Authenticated } from "../src/component/layouts"
import { filtersToShowDefaultValue } from "../src/constants"
import { StatsProvider, StatsContext } from "../src/providers"
import { loginButtonSX } from "../src/sx"
import IssuingDashboard from '../src/component/issuing-dashboard/Dashboard'
const AppBarFilter = dynamic(() => import('../src/component/stats/app-bar-filter'), {ssr:false})

enum enumPaymentType {
    acquiring='acquiring',
    issuing='issuing'
}

const Dashboard:NextPage = () => {
    const [paymentType, setPaymentType] = useState<enumPaymentType>(enumPaymentType.acquiring)
    const TabButton = (props: {typeOfPayment: string; toggleTypeOfPayment: (t:enumPaymentType)=>void}) => {
        const { typeOfPayment, toggleTypeOfPayment } = props
        return (
            <MotionBox
                    sx={{
                        overflow: "hidden",
                        display: "inline-block"
                    }}
                    variants={staggerChildrenWithDuration}
                >
                    <MotionFlex sx={{
                        gap: "8px"
                    }}

                        initial="hide"
                        animate="show"
                        variants={verticalPosition}
                    >
                        <Button variant={typeOfPayment===enumPaymentType.acquiring?"primary-button":"outline"} sx={loginButtonSX} onClick={()=>toggleTypeOfPayment(enumPaymentType.acquiring)}>
                            Acquiring
                        </Button>
                        <Button variant={typeOfPayment===enumPaymentType.issuing?"primary-button":"outline"} sx={loginButtonSX} onClick={()=>toggleTypeOfPayment(enumPaymentType.issuing)}>
                            Issuing
                        </Button>
                    </MotionFlex>
            </MotionBox>
        )
    }

    const toggleTypeOfPayment = (name:enumPaymentType) => {
        setPaymentType(name)
    }
  return (
    <StatsProvider>
      <Authenticated pageHeader={
        <Flex w="100%" flexWrap="wrap" justifyContent="space-between" px="50px" alignItems="center">
          <AnimatedText variant="page-header" size="page-header">{
            <TabButton typeOfPayment={paymentType} toggleTypeOfPayment={toggleTypeOfPayment} />
          }</AnimatedText>
          <AppBarFilter  />
        </Flex>
      }>
        {
            paymentType === enumPaymentType.acquiring? <DashboardPage /> : <IssuingDashboard />
        }
        
      </Authenticated>
    </StatsProvider>
  )
}
export default Dashboard
