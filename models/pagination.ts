export interface Paginate<T extends Record<keyof T, K>, K> {
    totalData: number,
    data: T[]
}