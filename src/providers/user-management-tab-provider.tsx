import { map } from "lodash"
import { debounce } from "lodash"
import { createContext, FC, useState } from "react"
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
const UserManagementTabProvider:FC<UserManagementTabProviderProps> = (props: UserManagementTabProviderProps) => {

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
      
        if(typeof  modalInstance !== "undefined") {
            setModals((prev) => map(prev, (x) => x.name === modalInstance.name?({...x, ...modalInstance}): x))
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
export default UserManagementTabProvider