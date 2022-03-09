import { RoleModel } from "../models"

export const Roles:Readonly<RoleModel[]> = [{ value:1, name: "SUPER ADMIN"}, { value:2, name:"BANK ADMIN"}, {value: 1, name: "BANK USER"}]

export const superAdmin = "SUPER_ADMIN"

export enum appRoles {
    superAdmin="SUPER_ADMIN",
    bankAdmin="BANK_ADMIN",
    bankUser="BANK_USER"
}