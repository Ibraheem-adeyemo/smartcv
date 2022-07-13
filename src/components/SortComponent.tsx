import { PhoneIcon, SearchIcon, Search2Icon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import React from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import {TfiMenuAlt} from 'react-icons/tfi'

const SortComponent = () => {
  return (
    <Box border={[1, 'solid', 'black']}>
    <Flex justifyContent={'space-between'}>
        <Flex>
            <Icon as={BsFillGridFill} />
            <Icon as={TfiMenuAlt} />
            <Box>30 Products found</Box>
        </Flex>
        <Box>
        <InputGroup>
            <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
            />
            <Input type='tel' placeholder='Phone number' />
        </InputGroup>
        </Box>
        <Box>
            <Flex>
                <p>Sort by</p>
                <Select placeholder='Select option'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </Flex>
        </Box>
    </Flex>
    </Box>
  )
}

export default SortComponent