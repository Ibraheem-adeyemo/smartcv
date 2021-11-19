export interface Paginate<T extends Record<keyof T, T[keyof T]>> {
    totalData: number,
    data: T[]
}