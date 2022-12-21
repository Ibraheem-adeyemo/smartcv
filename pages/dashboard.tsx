import { Box, Button, Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import dynamic from 'next/dynamic'
import React, { useState } from "react"
import { staggerChildrenWithDuration, verticalPosition } from "../src/animations"
import { Dashboard as DashboardPage  } from "../src/component/dashboard"
import { AnimatedText, MotionBox, MotionFlex } from "../src/component/framer"
import { Authenticated } from "../src/component/layouts"
import { filtersToShowDefaultValue } from "../src/constants"
import { StatsProvider, StatsContext } from "../src/providers"
import { loginButtonSM } from "../src/sx"
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

        const activeBoard = {
            borderBottom: '2px solid #0275D8',
            color: '#0275D8'}
        
        return (
            <MotionBox
                    sx={{
                        overflow: "hidden",
                        display: "inline-block",
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
                        <Box bg='none' cursor={'pointer'} fontSize='16px' mr='50px' style={typeOfPayment===enumPaymentType.acquiring? activeBoard:{}} onClick={()=>toggleTypeOfPayment(enumPaymentType.acquiring)}>
                            Acquiring
                        </Box>
                        <Box bg='none' cursor={'pointer'} fontSize='16px' style={typeOfPayment===enumPaymentType.issuing? activeBoard:{}} onClick={()=>toggleTypeOfPayment(enumPaymentType.issuing)}>
                            Issuing
                        </Box>
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
        </Flex>
      }>
        <Box position={'relative'} zIndex={999}mb={100}>
        <Flex position='fixed' height={100} width={'80%'}>
        <AppBarFilter />
        </Flex>
        </Box>

        {          
          paymentType === enumPaymentType.acquiring? <DashboardPage /> : <IssuingDashboard />
        }
      </Authenticated>
    </StatsProvider>
  )
}
export default Dashboard
