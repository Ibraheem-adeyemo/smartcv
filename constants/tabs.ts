import { links } from "."
import { Step, userManagementTab } from "../models"


export enum userManagementTabsName {
    bank='Bank',
    tenantAdmin="tenantAdmin",
    iSWAdmin="ISW Admin"
}

export const userManagementTabs: Readonly<userManagementTab[]> = [
    {
        name: userManagementTabsName.bank,
        isSelected: false
    },
    {
        name: userManagementTabsName.tenantAdmin,
        isSelected: false
    },
    {
        name: userManagementTabsName.iSWAdmin,
        isSelected: false
    }
]
export const onboardingTabs: Readonly<Step[]> = [
    {
        name: "Create bank",
        description: "Provide bank information and validation code",
        url: links.createBank,
        key: "tenant"
    }, {
        name: "Create Super Admin",
        description: "Enter superadmin information and create user",
        url: links.createSuperAdmin,
        key: "tenantAdmin"
    }, {
        name: "Institution colors",
        description: "Select the color scheme for the institution",
        url: links.institutionColors,
        key: "institutionColorInfo"
    }
]