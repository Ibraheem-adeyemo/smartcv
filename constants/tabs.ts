import { links } from "."
import { Step, userManagementTab } from "../models"


export enum userManagementTabsName {
    bank='Bank',
    bankAdmin="BankAdmin",
    iSWAdmin="ISW Admin"
}

export const userManagementTabs: userManagementTab[] = [
    {
        name: userManagementTabsName.bank,
        isSelected: false
    },
    {
        name: userManagementTabsName.bankAdmin,
        isSelected: false
    },
    {
        name: userManagementTabsName.iSWAdmin,
        isSelected: false
    }
]
export const onboardingTabs: Step[] = [
    {
        name: "Create bank",
        description: "Provide bank information and validation code",
        url: links.createBank,
        key: "tenant"
    }, {
        name: "Create Super Admin",
        description: "Enter superadmin information and create user",
        url: links.createSuperAdmin,
        key: "bankAdmin"
    }, {
        name: "Institution colors",
        description: "Select the color scheme for the institution",
        url: links.institutionColors,
        key: "institutionColorInfo"
    }
]