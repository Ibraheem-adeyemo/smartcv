import _ from "lodash"
import { debounce, Function } from "lodash"
import { ClassAttributes, createContext, Props, useState } from "react"
import { UserManagementModals, userManagementTabs } from "../constants"
import { ComponentWithChildren, UserManagementModal } from "../models"

export const UserManagementTabProviderContext = createContext({
    searchText: "",
    tabs: userManagementTabs,
    modals: UserManagementModals,
    handleTabSelection: (index: number) => { },
    handleSearchItem: debounce((searchText: string) => { }, 500),
    handleToggleModal: (modalInstance?: UserManagementModal) => { },
    mutateData:(callBack: () => void) => {""}
})

interface UserManagementTabProviderProps extends ComponentWithChildren  {
    
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

    const mutateData = (callBack: () => void) => {
        callBack()
    }

    const handleToggleModal = (modalInstance?: UserManagementModal) => {
        // debugger
        if(typeof  modalInstance !== "undefined") {
            setModals((prev) => _.map(prev, (x) => x.name === modalInstance.name?({...x, ...modalInstance}): x))
        } else {
            setModals(UserManagementModals)
        }
    }
    return (
        <UserManagementTabProviderContext.Provider value={{ searchText, tabs, modals, handleTabSelection, handleSearchItem, handleToggleModal, mutateData }}>
            {props.children}
        </UserManagementTabProviderContext.Provider>
    )
}