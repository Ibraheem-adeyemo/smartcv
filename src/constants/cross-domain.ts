import { ALLOWED_APPS } from ".";
import { AllowedApp } from "../models";
console.log({ALLOWED_APPS})
export const allowedApp = (ALLOWED_APPS ? JSON.parse(ALLOWED_APPS) : []) as AllowedApp[]