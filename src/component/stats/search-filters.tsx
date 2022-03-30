import { } from "@chakra-ui/button";
import { Box, Text, Menu, MenuButton, MenuList, MenuItem, Input, Button } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import _, { debounce, find } from 'lodash';
import { DropdownIcon } from "../../constants";
import { AnimatedText } from "../framer";


const debouncedFetchData = debounce((query: string, cb: ResultFromSearch, data: DropdownContent[]) => {
    let re = new RegExp(`\\b${query.toLowerCase()}\\b`, 'gi');
    const result = data?.filter(x => String(x.label).toLowerCase().search(re) > -1)
    cb(result)
}, 500);
interface DropdownSearchFilterProps {
    data: DropdownContent[],
    label?: string,
    selected?: boolean,
    onSelected?: (selectedItem: DropdownContent) => void
}
interface DropdownContent {
    label: any,
    value: any,
    selected: boolean
}
type ResultFromSearch = (items?: DropdownContent[]) => void
const DropdownSearchFilter: FC<DropdownSearchFilterProps> = ({ selected = false, ...props }: DropdownSearchFilterProps) => {
    const [dropdownContent, setDropdownContent] = useState<DropdownContent[]>()
    const [query, setQuery] = useState<string>()
    useEffect(() => {

        setDropdownContent(props.data.map((x, i) => {
            // debugger
            const selected = i === 0 ? true : false
            return typeof x === "string" ? {
                label: x,
                value: x,
                selected
            } : x
        }))
    }, [props.data])

    useEffect(() => {
        // console.log({dropdownContent})
    }, [dropdownContent])

    const pickItem = useCallback((selectedItem: DropdownContent) => {

        setDropdownContent(prev => props.data?.map(x => {
            const v = typeof x === "string" ? x : x.value
            if (v === selectedItem.value) {
                return {
                    label: typeof x === "string" ? x : x.label,
                    value: v,
                    selected: true
                }
            }
            return {
                label: typeof x === "string" ? x : x.label,
                value: v,
                selected: false
            }
        }))
        setQuery("")

    }, [])

    useEffect(() => {
        if (typeof dropdownContent !== "undefined" && dropdownContent.length > 0) {

            const selectedItem = find(dropdownContent, (content) => content.selected)
            if (typeof selectedItem !== "undefined") {
                if (typeof props.onSelected !== "undefined") {

                    props.onSelected(selectedItem)
                }
            }
        }
    }, [dropdownContent])
    return (
        <Menu >
            <MenuButton as={Button} h="26px" p="12px" rightIcon={<DropdownIcon />} borderWidth={selected ? '1px' : '0px'} borderStyle={selected ? 'bold' : ''} borderColor={selected ? 'var(--chakra-colors-brand-primary-blue)' : ''}  >
                <AnimatedText size="dropdown-text" variant="dropdown-text-header" color={selected ? 'brand.primary-blue' : ''}>{props.label}: {dropdownContent?.find(x => x.selected)?.label}</AnimatedText>
            </MenuButton>
            <MenuList maxH="334px" overflowY="auto" maxW="204px">
                <MenuItem closeOnSelect={false} as={Box}>
                    <Input placeholder="search here" size="sm" onFocus={(e) => {
                        e.stopPropagation()
                        const a = e.target as HTMLInputElement
                        a.focus()
                    }}
                        onClick={((e) => {
                            e.stopPropagation()
                            const a = e.target as HTMLInputElement
                            a.focus()
                        })}
                        defaultValue="" value={query} onInput={(e) => {
                            debouncedFetchData(e.currentTarget.value, (items?: DropdownContent[]) => {
                                setDropdownContent(items)
                            }, props.data.map((x, i) => {
                                // debugger
                                return typeof x === "string" ? {
                                    label: x,
                                    value: x,
                                    selected: i === 0 ? true : false
                                } : x
                            }))
                        }} /></MenuItem>
                {dropdownContent?.map((x, i) => <MenuItem key={`add-new-list-${x.value}-${i}`} onClick={(e) => pickItem(x)}>
                    <AnimatedText size="dropdown-text">{x.label}</AnimatedText>
                </MenuItem>)}
            </MenuList>
        </Menu>
    )
}

export default DropdownSearchFilter