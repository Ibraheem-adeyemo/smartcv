import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signUp } from '../../services';
import { setCookie } from '../../lib';
import { UserSignupPayload } from '../../models';

export interface logingState {
    isLoging: boolean,
    isnotAuthenticated: boolean,
    userId: string,
    access_token: string,    
    isLoading: boolean
}

export interface UserLoginPayload {
    email: string,
    password: string,
    isAdmin: boolean,
    isSuperAdmin: boolean,
}

const initialState: logingState = {
    isLoging: false,
    isnotAuthenticated: true,
    userId: '',
    access_token: '',
    isLoading: false
}

export const logUserIn = createAsyncThunk('auth/userLogin', async (userObj:UserLoginPayload, thunkApi ) => {
    const response = await login(userObj.email, userObj.password);
    return response.data
});

export const signupAUser = createAsyncThunk('auth/userSignup', async (userObj:UserSignupPayload, thunkApi ) => {
    const response = await signUp(userObj);
    return response.data
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userSignedUp: (state, action) => {
            state.isLoging = true;
            state.access_token = action.payload.access_token;
            state.isnotAuthenticated = false;
            state.userId = action.payload.userId;
        },
        logUserIn: (state, action) => {
            state.isLoging = true;
            state.access_token = action.payload.access_token;
            state.isnotAuthenticated = false;
            state.userId = action.payload.userId;
        },
        logUserOut: (state, action) => {
            state.isLoging = false;
            state.access_token = '';
            state.isnotAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logUserIn.fulfilled, (state, action) => {
            setCookie('access_token', action.payload.access_token, 5000 )
            state.isLoging = true;
            state.isnotAuthenticated = false;
            state.userId = action.payload.userId;
            state.isLoading = false;
        });
        builder.addCase(logUserIn.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(logUserIn.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
})