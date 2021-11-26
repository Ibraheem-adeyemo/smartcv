import { InputGroup, InputLeftElement, Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import React from "react";
import { SearchIcon } from "../../constants";

interface SearchTextProps {
    searchText:string,
    handleSearchItem: (searchText:string) => void
}
export default function SearchText(props:SearchTextProps) {
    
    return (
        <HStack>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon />}
                />
                <Input borderRadius="26px" bgColor="white" placeholder="Search per bank name" value={props.searchText} onChange={e => (e.stopPropagation(), props.handleSearchItem(e.target.value))} />
            </InputGroup>
        </HStack>
    )
}