
export type defaultCallback<T> = (prev: T) => T



export type defaultCallbackInitiator<T> =(callback: defaultCallback<T> | T) => void

export interface State {
    id: string,
    name: string
}