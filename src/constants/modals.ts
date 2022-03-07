import { UserManagementModal } from "../models";


export enum UserManagementModalNames {
    addNewUser="Add New User",
    addNewBank="Add New Bank"
}

export enum UserManagementTriggerButtons {
    addNewUser="Create User",
    addNewBank="Create Bank"
}

export const UserManagementModals : Readonly<UserManagementModal[]> = [
    {
        name: UserManagementModalNames.addNewUser,
        isOpen: false,
        triggerButton: UserManagementTriggerButtons.addNewUser,
        isSubmitted: false
    },
    {
        name: UserManagementModalNames.addNewBank,
        isOpen: false,
        triggerButton: UserManagementTriggerButtons.addNewBank,
        isSubmitted:false
    }
]