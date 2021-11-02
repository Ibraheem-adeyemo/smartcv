export interface Validation<T> {
    touched:Record<keyof T, string>,
    errors:Record<keyof T, string>
}