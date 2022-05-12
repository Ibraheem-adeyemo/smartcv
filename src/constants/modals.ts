import { InterchangeReconnectionModal, UserManagementModal } from "../models";


export enum UserManagementModalNames {
    addNewUser = "Add New User",
    addNewBank = "Add New Bank",
    addNewRole = "Interchange Reconnection",
    viewBank = "view Bank",

}

export enum InterchangeReconnectionModalNames {
    interchangeReconnection = "Request Reconnection"
}

export enum UserManagementTriggerButtons {
    addNewUser = "Create User",
    addNewBank = "Create Bank",
    addNewBankAdmin = "Create UserbySuperAdmin",
    addNewRole = "Create Role",
    viewBank = "View",
    activateTenant = "Activate Bank",
    deactivateTenant = "Deactivate Bank"
}

export enum InterchangeReconnectionTriggerButtons {
    RequestReconnection = "Interchange Reconnection",
}

export const UserManagementModals: Readonly<UserManagementModal[]> = [
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
        isSubmitted: false
    },
    {
        name: UserManagementModalNames.addNewRole,
        isOpen: false,
        triggerButton: UserManagementTriggerButtons.addNewRole,
        isSubmitted: false
    }
]

export const InterchangeDisconnectionModals: Readonly<InterchangeReconnectionModal[]> = [
    {
        name: InterchangeReconnectionModalNames.interchangeReconnection,
        isOpen: false,
        triggerButton: InterchangeReconnectionTriggerButtons.RequestReconnection,
        isSubmitted: false
    }
]