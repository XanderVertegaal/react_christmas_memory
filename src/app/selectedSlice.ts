import { createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name: 'selected',
    initialState: 0 as number,
    reducers: {
        'select': (state, action) => action.payload
    }
})