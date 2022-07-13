import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice"

const reducers = {
    authReducer
}

const store = configureStore({
    reducer:reducers,
    devTools: true
})

export default store;