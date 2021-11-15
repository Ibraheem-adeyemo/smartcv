import { formType } from ".";

export interface Validation<T> {
    touched:Record<keyof T | keyof formType, string>,
    errors:Record<keyof T | keyof formType, string>
}