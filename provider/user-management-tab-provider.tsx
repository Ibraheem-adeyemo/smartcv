import { debounce } from "lodash"
import { createContext, useState } from "react"
import { userManagementTabs } from "../constants"

export const UserManagementTabProviderContext = createContext({
    searchText:"",
    tabs: userManagementTabs,
    handleTabSelection: (index:number) => {},
    handleSearchItem: debounce((searchText:string) => {}, 500)
})

interface UserManagementTabProviderProps {
    children: JSX.Element
}
export default function UserManagementTabProvider (props:UserManagementTabProviderProps) {

    const [tabs, setTabs] = useState(userManagementTabs)
    const [searchText, setSearchText] = useState("")

    const handleTabSelection = (index:number) => {
        setTabs(prev => prev.map((x, i) => i === index?{...x, isSelected: true}: {...x, isSelected:false}))
    }

    const handleSearchItem = debounce((searchText:string) => {
        setSearchText(searchText)
    }, 500)

    return (
        <UserManagementTabProviderContext.Provider value={{searchText, tabs, handleTabSelection, handleSearchItem}}>
            {props.children}
        </UserManagementTabProviderContext.Provider>
    )
}