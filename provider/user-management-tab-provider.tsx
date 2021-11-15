import { debounce } from "lodash"
import { createContext, useState } from "react"
import { UserManagementModals, userManagementTabs } from "../constants"
import { UserManagementModal } from "../models"

export const UserManagementTabProviderContext = createContext({
    searchText: "",
    tabs: userManagementTabs,
    modals: UserManagementModals,
    handleTabSelection: (index: number) => { },
    handleSearchItem: debounce((searchText: string) => { }, 500),
    handleToggleModal: (modalname: string) => {}
})

interface UserManagementTabProviderProps {
    children: JSX.Element
}
export default function UserManagementTabProvider(props: UserManagementTabProviderProps) {

    const [tabs, setTabs] = useState(userManagementTabs)
    const [searchText, setSearchText] = useState("")
    const [modals, setModals] = useState(UserManagementModals)

    const handleTabSelection = (index: number) => {
        setTabs(prev => prev.map((x, i) => i === index ? { ...x, isSelected: true } : { ...x, isSelected: false }))
    }

    const handleSearchItem = debounce((searchText: string) => {
        setSearchText(searchText)
    }, 500)

    const handleToggleModal = (modalName: string) => {
        setModals(prev => prev.map((x, i) => (
            {
                ...x,
                isOpen: x.name === modalName ? !x.isOpen : false
            }
        )))
    }
    return (
        <UserManagementTabProviderContext.Provider value={{ searchText, tabs, modals, handleTabSelection, handleSearchItem, handleToggleModal }}>
            {props.children}
        </UserManagementTabProviderContext.Provider>
    )
}