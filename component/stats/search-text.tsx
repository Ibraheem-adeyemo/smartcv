import { HStack, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { SearchIcon } from "../../constants";

interface SearchTextProps {
    searchText:string,
    handleSearchItem: (searchText:string) => void,
    placeHolder:string
}
const SearchText:FC<SearchTextProps> = (props:SearchTextProps) => {
    const [text, setText] = useState("")
    return (
        <HStack>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon />}
                />
                <Input borderRadius="26px" bgColor="white" placeholder={props.placeHolder} value={text} onChange={e => {
                    e.stopPropagation();
                    setText(e.target.value); 
                    props.handleSearchItem(e.target.value)}} />
            </InputGroup>
        </HStack>
    )
}
export default SearchText