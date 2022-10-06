import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { IssuingAtmTransactionVolumeCount } from '.'


export const FailedAndSuccesfulChart = () => {
  return (
    <Box width={600} height='fit-content' bg='white' flexDir={'column'} borderRadius={10} shadow='xl'  p={50}>
    <Flex mb={50}>
        <Heading as="h5" size="md">Total daily transaction</Heading>
    </Flex>
    <Flex mb={100} justifyContent='space-between' color='gray.600'>
        <Box>
            <Heading as="h4" size="xs">Failed transaction</Heading>
            <Heading as="h3" size="md" color={'#E05B50'}>2,601,042.00</Heading>
            <small>Total volume:1609</small>
        </Box>
        <Box>
            <Heading as="h4" size="xs">Successful transaction</Heading>
            <Heading as="h3" size="md" color='#5DCC96'>3,601,042.00</Heading>
            <Text>Total volume:1009</Text>
        </Box>
    </Flex>
    <IssuingAtmTransactionVolumeCount />
    </Box>
  )
}