
export type defaultCallback<T> = (prev: T) => T



export type defaultCallbackInitiator<T> =(callback: defaultCallback<T> | T) => void