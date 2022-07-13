import { Box, Flex, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { productData } from '../store/dummyData'
import ProductComponent from './ProductComponent'
import SortComponent from './SortComponent'

const Mainbody1 = () => {
  return (
    <>
        <Box>
            <Box>
            </Box>
            <VStack justifyContent={'center'} paddingTop={50}>
                <Box width={'65%'}>
                    <SortComponent />
                </Box>
                {/* <Flex overflow={'scroll'}
                sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}> */}
                  <SimpleGrid columns={3} spacing={1}>
                    {
                      productData.map((product, i) => {
                        return (
                            <React.Fragment key={i}>
                                <ProductComponent product={product} />
                            </React.Fragment>
                        )
                      })  
                    }
                    </SimpleGrid>
                </VStack>
            {/* </Flex> */}
        </Box>
    </>
  )
}

export default Mainbody1