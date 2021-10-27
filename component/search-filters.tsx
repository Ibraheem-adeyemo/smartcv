import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { HiChevronDown } from 'react-icons/hi'
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Input } from "@chakra-ui/input";
import { debounce } from 'lodash';
import { DropdownIcon } from "../constants";


const debouncedFetchData = debounce((query: string, cb: ResultFromSearch, data: DropdownContent[]) => {
    let re = new RegExp(`\\b${query.toLowerCase()}\\b`, 'gi');
    const result = data?.filter(x => String(x.label).toLowerCase().search(re) > -1)
    cb(result)
}, 500);
interface DropdownSearchFilterProps {
    data: DropdownContent[] | string[],
    label?:string
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
        setDropdownContent(props.data.map((x, i) => ( 
            typeof x ==="string"? {
            label:x,
            value:x,
            selected:i===0? true:false
        }:x)))
    }, [props.data])

    const ref = useRef<HTMLInputElement>(null)

    const pickItem = useCallback((selectedItem: DropdownContent) => {
       
        setDropdownContent(prev => props.data?.map(x => {
            const v = typeof x === "string"? x:x.value
            if(v === selectedItem.value){
                return { 
                    label: typeof x === "string"?x:x.label,
                    value:v,
                    selected: true 
                }
            } 
            return { 
                label: typeof x === "string"?x:x.label,
                value:v,
                selected: false 
            }
        }))
        setQuery("")

    }, [])

    return (
        <Menu onOpen={() => setTimeout(() => ref.current?.focus(), 500)}>
            <MenuButton as={Button} h="26px" rightIcon={<DropdownIcon />}>
                <Text size="dropdown-text" variant="dropdown-text-header">{props.label}: {dropdownContent?.find(x => x.selected)?.label}</Text>
            </MenuButton>
            <MenuList maxH="334px" overflowY="auto" maxW="204px">
                <MenuItem closeOnSelect={false} onClick={() => ref.current?.focus()} as={Box}>
                    <Input placeholder="search here" size="sm" ref={ref} defaultValue="" value={query} onInput={(e) =>{
                            debouncedFetchData(e.currentTarget.value, (items?: DropdownContent[]) => {
                                setDropdownContent(items)
                            }, props.data.map((x, i) => ( 
                                typeof x ==="string"? {
                                label:x,
                                value:x,
                                selected:i===0? true:false
                            }:x)) )
                        }} /></MenuItem>
                {dropdownContent?.map((x, i) => <MenuItem key={i} onClick={(e) => pickItem(x)}>
                    <Text size="dropdown-text">{x.label}</Text>
                </MenuItem>)}
            </MenuList>
        </Menu>
    )
}