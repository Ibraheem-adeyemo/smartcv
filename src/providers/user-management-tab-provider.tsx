import { map } from "lodash"
import { debounce } from "lodash"
import { createContext, FC, useContext, useEffect, useState } from "react"
import { superAdmin, UserManagementModals, userManagementTabsAdmin, userManagementTabsSuperAdmin } from "../constants"
import { ComponentWithChildren, UserManagementModal } from "../models"
import { AuthContext } from "./auth-provider"

export const UserManagementTabProviderContext = createContext({
    searchText: "",
    tabs: userManagementTabsAdmin,
    modals: UserManagementModals,
    handleTabSelection: (index: number) => { },
    handleSearchItem: debounce((searchText: string) => { }, 500),
    handleToggleModal: (modalInstance?: UserManagementModal) => { },
    mutateData: (callBack: () => void) => { "" }
})

interface UserManagementTabProviderProps extends ComponentWithChildren {

}
const UserManagementTabProvider: FC<UserManagementTabProviderProps> = (props: UserManagementTabProviderProps) => {

    const [tabs, setTabs] = useState(userManagementTabsAdmin)
    const [searchText, setSearchText] = useState("")
    const [modals, setModals] = useState(UserManagementModals)
    const { userDetail } = useContext(AuthContext)
    useEffect(() => {
        if (userDetail && userDetail.role.name === superAdmin) {
            setTabs(userManagementTabsSuperAdmin)
        }
    }, [userDetail])
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

        if (typeof modalInstance !== "undefined") {
            setModals((prev) => map(prev, (x) => x.name === modalInstance.name ? ({ ...x, ...modalInstance }) : {...x, isOpen: false}))
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