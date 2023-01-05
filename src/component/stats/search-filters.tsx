import { } from "@chakra-ui/button";
import { Box, Flex, Menu, MenuButton, MenuList, MenuItem, Input, Button } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import _, { debounce, find } from 'lodash';
import { DropdownIcon } from "../../constants";
import { AnimatedText } from "../framer";
import { addHoursToDate } from "../../lib";
import { DropdownContent, DropdownSearchFilterProps, ResultFromSearch, SelectedSearchProps } from "../../models";

interface TimeFilterType {
    filterBy: string,
    options: number[]
}

const debouncedFetchData = debounce((query: string, cb: ResultFromSearch, data: DropdownContent[]) => {
    let re = new RegExp(`\\b${query.toLowerCase()}\\b`, 'gi');
    const result = data?.filter(x => String(x.label).toLowerCase().search(re) > -1)
    cb(result)
}, 500);

export const SelectedSearchFilter: FC<SelectedSearchProps> = ( props: SelectedSearchProps ) => {
    const { setEndTime, curEndDateTime } = props

    const timeFilterOptions: TimeFilterType[] = [
        {
            filterBy: 'hours',
            options: [1,2,5,10,24]
        },
        {
            filterBy: 'minutes',
            options: [2,5,10,30,45]
        }
    ];
    const handleSetEndTime = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, filterby:string) => {
        let endTime:Date = new Date();
        if((e.target as HTMLSelectElement).value) {
            if(filterby === 'hours' || filterby === 'minutes') {

                endTime = addHoursToDate(new Date(curEndDateTime), parseInt((e.target as HTMLSelectElement).value), filterby )
            }
        } else {
            return
        }        
        setEndTime(endTime)
    }
    return (
        <Menu>
        <MenuButton as={Button} h="26px" p="12px" borderStyle='bold' borderColor='var(--chakra-colors-brand-primary-blue)' borderWidth='1px' color='brand.primary-blue' rightIcon={<DropdownIcon />}>
            Interval 
        </MenuButton>
        <MenuList>
            {
                timeFilterOptions.map((optns, i) => {
                    return (
                        <Flex  key={i} m={1}>
                            <Menu>
                                <MenuButton as={Button} h="26px" p="12px" borderStyle='bold' borderColor='var(--chakra-colors-brand-primary-blue)' color='brand.primary-blue' rightIcon={<DropdownIcon />}>
                                    {optns.filterBy}
                                </MenuButton>
                                <MenuList>
                                    {
                                        optns.options.map((itm, i)=> {
                                            return (<MenuItem onClick={e => handleSetEndTime(e, optns.filterBy)} value={itm} key={i}> <AnimatedText size="dropdown-text">{itm}</AnimatedText></MenuItem>)
                                        })
                                    }
                                </MenuList>
                            </Menu>
                        </Flex>
                                                
                    )
                })
            }
        </MenuList>
        </Menu>
    )
}

const DropdownSearchFilter: FC<DropdownSearchFilterProps> = ({ selected = false, ...props }: DropdownSearchFilterProps) => {
    const { showSearchInput, countInterval } = props;

    const [dropdownContent, setDropdownContent] = useState<DropdownContent[]>()
    const [query, setQuery] = useState<string>()
    const [selectedPeriod, setSelectedPeriod] = useState<DropdownContent | string | undefined>(countInterval)
    useEffect(() => {

        // setSelectedPeriod(props.data[0])
        setDropdownContent(props.data.map((x, i) => {
            // debugger
            // i === 0 ? : ''

            const selected = i === 0 ? true : false

            return typeof x === "string" ? {
                label: x,
                value: x,
                interval:x,
                selected
            } : x
        }))
    }, [props.data])

    const pickItem = useCallback((selectedItem: DropdownContent) => {
        setSelectedPeriod(selectedItem)
        setDropdownContent(prev => props.data?.map(x => {
            const v = typeof x === "string" ? x : x.value
            if (v === selectedItem.value) {
                return {
                    label: typeof x === "string" ? x : x.label,
                    value: v,
                    interval: typeof x === "string" ? x : x.interval,
                    selected: true
                }
            }
            return {
                label: typeof x === "string" ? x : x.label,
                value: v,
                interval: typeof x === "string" ? x : x.interval,
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
            <MenuButton as={Button} h="36px" p="12px" rightIcon={<DropdownIcon />} borderWidth={selected ? '1px' : '0px'} borderStyle={selected ? 'bold' : ''} borderColor={selected ? 'var(--chakra-colors-brand-primary-blue)' : ''}  >
                <AnimatedText variant="dropdown-text-header" color={selected ? 'brand.primary-blue' : ''}>{props.label ?`${props.label}:`:null} {typeof selectedPeriod !== 'undefined' ? typeof selectedPeriod === 'string'? selectedPeriod : selectedPeriod?.label : ''}</AnimatedText>
            </MenuButton>
            <MenuList maxH="334px" overflowY="auto" maxW="204px">
                {showSearchInput && <MenuItem closeOnSelect={false} as={Box}>
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
                                    interval:x,
                                    selected: i === 0 ? true : false
                                } : x
                            }))
                        }} /></MenuItem>}
                {dropdownContent?.map((x, i) => <MenuItem key={`add-new-list-${x.value}-${i}`} onClick={(e) =>{
                    pickItem(x)
                }}>
                    <AnimatedText size="dropdown-text">{x.label}</AnimatedText>
                </MenuItem>)}
            </MenuList>
        </Menu>
    )
}

export default DropdownSearchFilter