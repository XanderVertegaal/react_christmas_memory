import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name: 'selected',
    initialState: 0 as number,
    reducers: {
        'select': (state, action: PayloadAction<number>) => action.payload,
        'deselect': state => 0
    }
})