import { UserManagementModal } from "../models";


export enum UserManagementModalNames {
    addNewUser="Add New User",
    addNewBank="Add New Bank",
    addNewRole="Add New Role"
}

export enum UserManagementTriggerButtons {
    addNewUser="Create User",
    addNewBank="Create Bank",
    addNewRole="Create Role"
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
    },
    {
        name: UserManagementModalNames.addNewRole,
        isOpen: false,
        triggerButton: UserManagementTriggerButtons.addNewRole,
        isSubmitted:false
    }
]