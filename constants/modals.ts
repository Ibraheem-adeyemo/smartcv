import { UserManagementModal } from "../models";


export enum UserManagementModalNames {
    addNewUser="Add New User",
    addNewBank="Add New User"
}

export enum UserManagementTriggerButtons {
    addNewUser="Create User",
    addNewBank="Create Bank"
}

export const UserManagementModals : UserManagementModal[] = [
    {
        name: UserManagementModalNames.addNewUser,
        isOpen: false,
        triggerButton: UserManagementTriggerButtons.addNewUser
    },
    {
        name: UserManagementModalNames.addNewBank,
        isOpen: false,
        triggerButton: UserManagementTriggerButtons.addNewBank
    }
]