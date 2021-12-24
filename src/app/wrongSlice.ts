import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const wrongSlice = createSlice({
    name: 'wrongSlice',
    initialState: [] as number[],
    reducers: {
        'addWrong': (state, action: PayloadAction<number>) => {
            state.push(action.payload)
            return state
        },
        'clearWrong': state => [] 
    }
})