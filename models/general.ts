
export type defaultCallback<T> = (prev: T) => T



export type defaultCallbackInitiator<T> = (callback: defaultCallback<T> | T) => void

export interface State {
    id: string,
    name: string
}

export interface ComponentWithChildren {
    children: JSX.Element | JSX.Element[]
}

export interface Column {
    name: string,
    key: string
}