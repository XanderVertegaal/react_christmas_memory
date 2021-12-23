import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const foundSlice = createSlice({
    name: 'foundPairs',
    initialState: [] as number[],
    reducers: {
        'addFound': (state, action: PayloadAction<number>) => {
            state.push(action.payload)
            return state
        },
        'emptyFound': state => []
    }
})