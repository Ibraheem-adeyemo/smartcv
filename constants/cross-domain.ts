import { ALLOWED_APPS } from ".";
import { AllowedApp } from "../models";

export const allowedApp = (ALLOWED_APPS ? JSON.parse(ALLOWED_APPS) : []) as AllowedApp[]