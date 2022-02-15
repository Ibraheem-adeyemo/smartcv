import { Flex, Text, Menu, MenuButton, MenuItem, MenuList, Button, Input, InputGroup, InputRightElement, FormControl, FormLabel } from "@chakra-ui/react";
import React, { FC, useRef } from "react";
import { CalendarIcon, DropdownIcon } from "../../constants";

const CustomFilter:FC = () => {
    const startDateRef = useRef<HTMLInputElement>(null)
    const endDateRef = useRef<HTMLInputElement>(null)


    return (
        <Menu>
            <MenuButton as={Button} h="26px" p="12px" rightIcon={<DropdownIcon />}>
                <Text size="dropdown-text" variant="dropdown-text-header">Custom</Text>
            </MenuButton>
            <MenuList>
                <MenuItem></MenuItem>
                <MenuItem closeOnSelect={false} onClick={(e)=>e.stopPropagation()} bgColor="white" _hover={{bgColor:"white"}} isFocusable={false} as={Flex} flexDir="column" gridGap="14px" p="17px">


                    <Text size="dropdown-text" variant="dropdown-text-header">Custom Filter</Text>
                    <Flex flexDir="column" gridGap="17px">
                        <FormControl id="startDate">
                            <FormLabel>Start Date</FormLabel>
                            <InputGroup>
                                <Input placeholder="DD/MM/YYYY" borderRadius="8px" ref={startDateRef} onClick={(e) =>  {
                                    e.stopPropagation();
                                    startDateRef.current?.focus()
                                    }} />
                                <InputRightElement children={<CalendarIcon />} />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="endDate">
                            <FormLabel>End Date</FormLabel>
                            <InputGroup>
                                <Input placeholder="DD/MM/YYYY" borderRadius="8px" ref={endDateRef} onClick={(e) =>  {e.stopPropagation();
                                     endDateRef.current?.focus()}} />
                                <InputRightElement children={<CalendarIcon />} />
                            </InputGroup>
                        </FormControl>
                    </Flex>
                    <Flex gridGap="34px" mt="6px" mb="5px">
                        <Button variant="just-text">Cancel</Button>
                        <Button variant="primary-button">Apply</Button>
                    </Flex>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
export default CustomFilter