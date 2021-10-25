import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { HiChevronDown } from 'react-icons/hi'
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Input } from "@chakra-ui/input";
import {debounce}  from 'lodash';


const debouncedFetchData = debounce((query: string, cb: ResultFromSearch, data: DropdownContent[]) => {
    let re = new RegExp(`\\b${query.toLowerCase()}\\b`, 'gi');
    const result = data?.filter(x => String(x.label).toLowerCase().search(re) > -1 )
    if(result.findIndex((x, i) => x.value === "All")> -1) {
        cb(result)
    } else {
        cb([{label:"All", value:"All", selected:false}, ...result])
    }
}, 500);
interface DropdownSearchFilterProps {
    data: DropdownContent[]
}
interface DropdownContent {
    label: any,
    value: any,
    selected: boolean
}
type ResultFromSearch = (items?: DropdownContent[]) => void
export default function DropdownSearchFilter(props: DropdownSearchFilterProps) {
    const [dropdownContent, setDropdownContent] = useState<DropdownContent[]>()
    const [query, setQuery] = useState<string>()
    useMemo(() => {
        setDropdownContent(props.data)
    }, [props.data])

    const ref = useRef<HTMLInputElement>(null)

    const pickItem = useCallback((selectedItem: DropdownContent) => {
       
        setDropdownContent(prev => props.data?.map(x => (x.value === selectedItem.value ? { ...x, selected: true } : { ...x, selected: false })))
        setQuery("")
        
    }, [])

    return (
        <Menu onOpen={() =>{
         ref.current?.focus()}}>
            <MenuButton as={Button} h="26px" rightIcon={<HiChevronDown />}>
              <Text fontSize="14px">Institution: {dropdownContent?.find(x => x.selected)?.label}</Text>
            </MenuButton>
            <MenuList  maxH="334px" overflowY="auto" maxW="204px">
                <MenuItem closeOnSelect={false} onClick={()=> ref.current?.focus()} as={Box}>
                    <Input placeholder="search here" size="sm" ref={ref} defaultValue="" value={query} onInput={(e) => 
                    debouncedFetchData(e.currentTarget.value, (items?: DropdownContent[]) => {
                        setDropdownContent(items)
                }, props.data)} /></MenuItem>
                {dropdownContent?.map((x, i) => <MenuItem key={i} onClick={(e) => pickItem(x)}><Text fontSize="14px">{x.label}</Text></MenuItem>)}
            </MenuList>
        </Menu>
    )
}