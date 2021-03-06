import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name: 'selected',
    initialState: [] as number[],
    reducers: {
        'select': (state, action: PayloadAction<number>) => {
            state.push(action.payload)
            return state
        },
        'deselect': state => []
    }
})